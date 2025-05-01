import QRCode from "qrcode";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { Footer } from "./components/Footer";
import { Title } from "./components/Title";
import { QRCodeInput } from "./components/QRCodeInput";
import { QRCodeDisplay } from "./components/QRCodeDisplay";
import { Controls } from "./components/Controls";

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  (window as any).deferredPrompt = e;
});

export default function Home() {
  const [qrState, setQrState] = createStore({
    data: "",
    imageBase64: "",
    ecLevel: "M" as "L" | "M" | "H",
    qrSize: 500
  });

  const generateQrCode = async (data: string) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(data, {
        errorCorrectionLevel: qrState.ecLevel,
        width: qrState.qrSize,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrState("imageBase64", qrCodeDataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Falha ao gerar o QR code.");
    }
  };

  const downloadQrCode = () => {
    const link = document.createElement("a");
    link.href = qrState.imageBase64;
    link.download = "QRCode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyQrCode = async () => {
    try {
      // Convert the data URL to a Blob
      const response = await fetch(qrState.imageBase64);
      const blob = await response.blob();

      // Create a ClipboardItem with the proper image type
      const item = new ClipboardItem({ "image/png": blob });

      // Write the image to the clipboard
      await navigator.clipboard.write([item]);

      alert("QRCode copiado!");
    } catch (error) {
      console.error("Error copying QR code:", error);
      alert("Falha ao copiar o QRCode.");
    }
  };

  createEffect(() => {
    if (qrState.data) {
      generateQrCode(qrState.data);
    }
  });

  return (
    <div class="flex flex-col items-center p-4">
      <div class="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 space-y-8">
        <Title />
        <QRCodeInput 
          value={qrState.data} 
          setValue={(value) => setQrState("data", value)} 
        />

        <div class="flex flex-col md:flex-row items-center justify-center gap-8">
          <QRCodeDisplay imageBase64={qrState.imageBase64} onCopy={copyQrCode} />
          <Controls
            imageBase64={qrState.imageBase64}
            onCopy={copyQrCode}
            onDownload={downloadQrCode}
            ecLevel={qrState.ecLevel}
            setEcLevel={(level) => {
              setQrState("ecLevel", level);
              if (qrState.data) {
                generateQrCode(qrState.data);
              }
            }}
            qrSize={qrState.qrSize}
            setQrSize={(size) => {
              setQrState("qrSize", size);
              if (qrState.data) {
                generateQrCode(qrState.data);
              }
            }}
          />
        </div>
      <Footer />
      </div>
    </div>
  );
}
