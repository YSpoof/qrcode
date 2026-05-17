/// <reference lib="webworker" />
import type { WorkerRequestMessage, WorkerResponseMessage } from "$lib/types";
import QRCode from "qrcode";

const blobToDataUrl = async (blob: Blob): Promise<string> => {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return `data:${blob.type};base64,${btoa(binary)}`;
};

const generateQrCode = async (data: WorkerRequestMessage): Promise<string> => {
  try {
    const canvas = new OffscreenCanvas(data.size, data.size);
    await QRCode.toCanvas(canvas, data.content, {
      errorCorrectionLevel: data.redundancy,
      width: data.size,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      margin: 1,
    });

    const blob = await canvas.convertToBlob({ type: "image/png", quality: 1 });
    return await blobToDataUrl(blob);
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};

self.addEventListener("message", async (event: MessageEvent<WorkerRequestMessage>) => {
  const data = event.data;
  try {
    const qrCodeDataUrl = await generateQrCode(data);
    postResult(qrCodeDataUrl);
  } catch (error: any) {
    postError(error.message);
  }
});

const postResult = (result: string) => {
  self.postMessage({
    type: "result",
    result,
  } satisfies WorkerResponseMessage);
};

const postError = (message: string) => {
  self.postMessage({
    type: "error",
    result: message,
  } satisfies WorkerResponseMessage);
};
