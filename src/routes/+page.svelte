<script lang="ts">
  import { qrHelper } from "$lib/helpers/qr";
  import { toastStore } from "$lib/stores/toast.svelte";
  import type { Qr } from "$lib/types";
  import type { WorkerResponseMessage } from "$lib/types";
  import { downloadDataUrl } from "$lib/utils/download";
  import vibrate from "$lib/utils/vibrate";
  import { onDestroy, onMount } from "svelte";

  let worker: Worker;

  const appState = $state({
    errored: false,
    unsuported: false,
    ecLevel: "M" as "L" | "M" | "H",
    content: "",
    imageB64: "",
    type: "string" as Qr["type"],
    size: 500,
  });

  let installEvent: any = null;

  const saveBtnDisabled = $derived(!appState.content || !appState.imageB64);

  const saveQrCode = async () => {
    const result = await qrHelper.addQr({
      content: appState.content,
      imageB64: appState.imageB64,
      type: appState.type,
      createdAt: new Date(),
    });

    if (result != null) {
      vibrate.success();
      toastStore.showToast("QR Code salvo com sucesso.");
      appState.content = "";
      appState.imageB64 = "";
    } else {
      vibrate.error();
      toastStore.showToast("Falha ao salvar o QR Code.", "error");
    }
  };

  const copyQrCode = async () => {
    if (!appState.imageB64) return;

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": await fetch(appState.imageB64).then((res) => res.blob()),
        }),
      ]);
      vibrate.light();
      toastStore.showToast("QR Code copiado para a área de transferência.");
    } catch (error) {
      vibrate.error();
      toastStore.showToast("Não foi possível copiar o QR Code.", "error");
    }
  };

  const downloadQrCode = async () => {
    if (!appState.imageB64) return;
    await downloadDataUrl(`qrcode-${Date.now()}.png`, appState.imageB64);
    vibrate.medium();
    toastStore.showToast("Download iniciado.", "info");
  };

  const handleWorkerMessage = ({ data }: MessageEvent<WorkerResponseMessage>) => {
    switch (data.type) {
      case "error":
        appState.errored = true;
        toastStore.showToast("Erro ao gerar o QR Code.", "error");
        break;
      case "result":
        appState.imageB64 = data.result;
        appState.errored = false;
        break;
    }
  };

  globalThis.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installEvent = event;
  });

  $effect(() => {
    if (appState.content) {
      worker.postMessage({
        content: appState.content,
        redundancy: appState.ecLevel,
        size: appState.size,
        type: appState.type,
      });
    } else {
      appState.imageB64 = "";
    }
  });

  onMount(() => {
    if (typeof Worker === "undefined") {
      appState.unsuported = true;
      return;
    }
    worker = new Worker(new URL("$lib/workers/generator.worker.ts", import.meta.url), {
      type: "module",
    });
    worker.onmessage = handleWorkerMessage;
  });

  onDestroy(() => {
    if (worker) {
      worker.terminate();
    }
  });
</script>

{#if appState.unsuported}
  <div class="alert alert-error shadow-lg">
    <div>
      <span>Seu navegador não suporta Web Workers.</span>
    </div>
  </div>
{:else}
  <div class="space-y-6 mb-6 pb-6 md:max-w-96 mx-auto">
    <div class="card card-body bg-base-100 shadow-lg">
      <div class="form-control w-full">
        <label
          for="qr-input"
          class="label">
          <span class="label-text">Texto ou URL</span>
        </label>
        <textarea
          id="qr-input"
          class="textarea textarea-bordered w-full"
          placeholder="Digite algo para o QR Code"
          bind:value={appState.content}
          rows="5"></textarea>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="form-control">
          <label
            for="qr-level"
            class="label">
            <span class="label-text">Nível de redundância</span>
          </label>
          <select
            id="qr-level"
            class="select select-bordered w-full"
            bind:value={appState.ecLevel}>
            <option value="L">Baixo</option>
            <option value="M">Médio</option>
            <option value="H">Alto</option>
          </select>
        </div>

        <div class="form-control">
          <label
            for="qr-type"
            class="label">
            <span class="label-text">Tipo</span>
          </label>
          <select
            id="qr-type"
            class="select select-bordered w-full"
            bind:value={appState.type}>
            <option value="string">Texto</option>
          </select>
        </div>

        <div class="form-control sm:col-span-2">
          <label
            for="qr-size"
            class="label">
            <span class="label-text">Tamanho: {appState.size} px</span>
          </label>
          <input
            id="qr-size"
            type="range"
            min="100"
            max="1000"
            step="100"
            class="range range-primary w-full"
            bind:value={appState.size} />
        </div>
      </div>

      <div class="flex flex-col gap-3 md:flex-row justify-between">
        <button
          class="btn btn-primary flex-1 py-1"
          onclick={saveQrCode}
          disabled={saveBtnDisabled}>
          Salvar
        </button>
        <button
          class="btn btn-secondary flex-1 py-1"
          onclick={downloadQrCode}
          disabled={!appState.imageB64}>
          Baixar
        </button>
        <button
          class="btn btn-outline flex-1 py-1"
          onclick={copyQrCode}
          disabled={!appState.imageB64}>
          Copiar
        </button>
        <button
          id="install-btn"
          data-tip="Clique para instalar"
          class="btn btn-accent flex-1 py-1 tooltip"
          onclick={() => installEvent?.prompt()}>
          App
        </button>
      </div>
    </div>

    {#if appState.imageB64}
      <div class="card card-compact bg-base-100 shadow-lg border border-base-300">
        <figure class="p-4">
          <div class="mx-auto w-64 h-64 sm:w-72 sm:h-72">
            <img
              src={appState.imageB64}
              alt="Generated QR Code"
              class="w-full h-full object-contain [image-rendering:pixelated]" />
          </div>
        </figure>
      </div>
    {/if}

    {#if appState.errored}
      <div class="alert alert-error shadow-lg">
        <div>
          <span>Ocorreu um erro ao gerar o QR code.</span>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  @media (display-mode: standalone) {
    #install-btn {
      display: none;
    }
  }
</style>
