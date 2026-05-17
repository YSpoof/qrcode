<script lang="ts">
  import QrCardRenderer from "$lib/components/QrCardRenderer.svelte";
  import { qrHelper } from "$lib/helpers/qr";
  import { toastStore } from "$lib/stores/toast.svelte";
  import type { Qr } from "$lib/types";
  import { downloadDataUrl } from "$lib/utils/download";
  import vibrate from "$lib/utils/vibrate";

  const maxDate = new Date().toISOString().split("T")[0];
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toISOString()
    .split("T")[0];

  const parseLocalDateBoundary = (date: string, boundary: "start" | "end") => {
    const [year, month, day] = date.split("-").map(Number);
    if (!year || !month || !day) return null;

    if (boundary === "start") {
      return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    return new Date(year, month - 1, day, 23, 59, 59, 999);
  };

  const qrs = qrHelper.getAllQrs;
  const filters = $state({ startDate: lastMonth, endDate: maxDate });
  const filteredQrsPromise = $derived.by((): Promise<Qr[]> => {
    $qrs;

    const startDate = filters.startDate
      ? (parseLocalDateBoundary(filters.startDate, "start") ?? undefined)
      : undefined;
    const endDate = filters.endDate
      ? (parseLocalDateBoundary(filters.endDate, "end") ?? undefined)
      : undefined;

    return qrHelper.getQrsByDateRange(startDate, endDate);
  });

  const handleRemove = async (id: number) => {
    const result = await qrHelper.removeQr(id);
    if (result) {
      vibrate.medium();
      toastStore.showToast("QR Code removido.");
    } else {
      vibrate.error();
      toastStore.showToast("Erro ao remover QR Code.", "error");
    }
  };

  const handleCopy = async (imageB64: string) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": await fetch(imageB64).then((res) => res.blob()) }),
      ]);
      vibrate.light();
      toastStore.showToast("QR Code copiado para a área de transferência.");
    } catch (error) {
      vibrate.error();
      toastStore.showToast("Não foi possível copiar o QR Code.", "error");
    }
  };

  const handleDownload = async (imageB64: string) => {
    await downloadDataUrl(`qrcode-${Date.now()}.png`, imageB64);
    vibrate.medium();
    toastStore.showToast("Download iniciado.", "info");
  };

  const clearFilters = () => {
    filters.startDate = "";
    filters.endDate = "";
    vibrate.light();
    toastStore.showToast("Filtros limpos.", "info");
  };
</script>

<div class="space-y-4">
  <section class="card card-compact bg-base-100 shadow-lg p-4">
    <div class="card-body p-0 gap-4">
      <h2 class="card-title">Filtrar histórico</h2>
      <!-- TODO: justify between the inputs -->
      <div class="flex flex-row justify-between gap-4 items-end">
        <div class="flex-1">
          <label
            for="filter-start"
            class="label">
            <span class="label-text">Data inicial</span>
          </label>
          <input
            id="filter-start"
            type="date"
            class="input input-bordered"
            max={maxDate}
            bind:value={filters.startDate} />
        </div>

        <div class="flex-1">
          <label
            for="filter-end"
            class="label">
            <span class="label-text">Data final</span>
          </label>
          <input
            id="filter-end"
            type="date"
            class="input input-bordered"
            max={maxDate}
            bind:value={filters.endDate} />
        </div>
      </div>

      <button
        class="btn btn-outline btn-secondary w-full"
        onclick={clearFilters}>
        Limpar filtros
      </button>
    </div>
  </section>

  {#if !$qrs?.length}
    <div class="alert alert-info shadow-lg">
      <div>
        <span>Nenhum QRCode salvo.</span>
      </div>
    </div>
  {:else}
    <svelte:boundary>
      {#snippet pending()}
        <div class="alert alert-info shadow-lg">
          <div>
            <span>Carregando histórico...</span>
          </div>
        </div>
      {/snippet}

      {@const filteredQrs = await filteredQrsPromise}
      {#if !filteredQrs.length}
        <div class="alert alert-warning shadow-lg">
          <div>
            <span>Nenhum QR Code corresponde aos filtros selecionados.</span>
          </div>
        </div>
      {:else}
        <QrCardRenderer
          qrs={filteredQrs}
          onRemove={handleRemove}
          onCopy={handleCopy}
          onDownload={handleDownload} />
      {/if}
    </svelte:boundary>
  {/if}
</div>
