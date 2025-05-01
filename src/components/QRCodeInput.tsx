import { throttle } from "@solid-primitives/scheduled";

interface QRCodeInputProps {
  value: string;
  setValue: (value: string) => void;
}

export function QRCodeInput(props: QRCodeInputProps) {

  const throttledSetValue = throttle(props.setValue, 75);

  return (
    <div class="w-full md:max-w-xl mx-auto">
      <label for="qr-input" class="sr-only">
        Digite aqui
      </label>
      <textarea
        id="qr-input"
        rows={1}
        value={props.value}
        onInput={(e: InputEvent) =>
          throttledSetValue((e.target as HTMLTextAreaElement).value)
        }
        placeholder="Digite o texto ou URL..."
        class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white"
      />
    </div>
  );
}
