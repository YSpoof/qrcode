interface QRCodeDisplayProps {
  imageBase64: string;
  onCopy: () => void;
}

export function QRCodeDisplay(props: QRCodeDisplayProps) {
  return (
    <div class="relative group">
      {props.imageBase64 ? (
        <div class="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-xl">
          <img
            src={props.imageBase64}
            alt="QR Code"
            class="w-56 h-56 md:w-72 md:h-72 object-contain cursor-pointer pixelated"
            title="Clique para copiar."
          />
          <div
            class="cursor-pointer absolute inset-0 flex items-center justify-center hover:bg-black/50 transition-all rounded-lg"
            onClick={props.onCopy}>
            <span class="opacity-0 group-hover:opacity-100 bg-black bg-opacity-70 text-white text-sm py-1 px-3 rounded-full transition-all duration-300">
              Clique para copiar.
            </span>
          </div>
        </div>
      ) : (
        <div class="w-56 h-56 md:w-80 md:h-80 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
          <p class="text-slate-500 dark:text-slate-400 text-center px-4">
            O QRCode aparecerá aqui.
          </p>
        </div>
      )}
    </div>
  );
}
