import {
  VsCopy,
  VsDesktopDownload,
  VsSave,
  VsWorkspaceTrusted,
  VsWorkspaceUnknown,
  VsWorkspaceUntrusted,
} from "solid-icons/vs";

interface ControlsProps {
  imageBase64: string;
  onCopy: () => void;
  onDownload: () => void;
  ecLevel?: "L" | "M" | "H";
  setEcLevel?: (level: "L" | "M" | "H") => void;
  qrSize?: number;
  setQrSize?: (size: number) => void;
}

export function Controls(props: ControlsProps) {
  const installApp = async () => {
    const deferredPrompt = (window as any).deferredPrompt;
    if (!deferredPrompt) {
      alert("Instalação não suportada neste dispositivo.");
      return;
    }
    deferredPrompt.prompt();
  };
  return (
    <div class="flex flex-col space-y-4 h-full justify-between max-w-full">
      {/* QR Code Settings */}
      {props.setEcLevel && (
        <div>
          <label class="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nível de redundância:
          </label>
          <div class="flex flex-wrap md:flex-nowrap justify-between gap-4">
            <button
              onClick={() => props.setEcLevel?.("L")}
              class={`cursor-pointer disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                props.ecLevel === "L"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                  : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 active:bg-indigo-100"
              }`}>
              <VsWorkspaceUntrusted size={20} />
              BAIXA
            </button>
            <button
              onClick={() => props.setEcLevel?.("M")}
              class={`cursor-pointer disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                props.ecLevel === "M"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                  : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 active:bg-indigo-100"
              }`}>
              <VsWorkspaceUnknown size={20} />
              MÉDIA
            </button>
            <button
              onClick={() => props.setEcLevel?.("H")}
              class={`cursor-pointer disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                props.ecLevel === "H"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                  : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 active:bg-indigo-100"
              }`}>
              <VsWorkspaceTrusted size={20} />
              ALTA
            </button>
          </div>
        </div>
      )}

      {props.setQrSize && (
        <div class="my-2">
          <label class="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tamanho: {props.qrSize}px
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={props.qrSize}
            onInput={(e) => props.setQrSize?.(parseInt(e.currentTarget.value))}
            class="w-full"
          />
        </div>
      )}

      <div class="w-full flex flex-col justify-between md:flex-row gap-4 mt-2">
        <button
          onClick={props.onCopy}
          disabled={!props.imageBase64}
          class={`cursor-pointer disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
          ${
            props.imageBase64
              ? "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 active:bg-indigo-100"
              : "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed"
          }`}>
          <VsCopy size={20} />
          COPIAR
        </button>

        <button
          onClick={props.onDownload}
          disabled={!props.imageBase64}
          class={`cursor-pointer disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200
          ${
            props.imageBase64
              ? "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
              : "bg-slate-400 cursor-not-allowed"
          }`}>
          <VsSave size={20} />
          BAIXAR
        </button>
        <button
          id="install-button"
          class="cursor-pointer disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-white transition-all duration-200 bg-cyan-600"
          onClick={installApp}>
          <VsDesktopDownload size={20} />
          INSTALAR
        </button>
      </div>
    </div>
  );
}
