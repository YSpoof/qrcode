<script lang="ts">
  import { qrTypeNameMap, type Qr } from "$lib/types";
  import { flip } from "svelte/animate";
  import { cubicInOut } from "svelte/easing";
  import { fade } from "svelte/transition";

  interface Props {
    onRemove: (id: number) => void;
    onCopy: (imageB64: string) => void;
    onDownload?: (imageB64: string) => void;
    qrs: Qr[];
  }

  let { qrs, onRemove, onCopy, onDownload }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
  {#each qrs as qr (qr.id)}
    <div
      animate:flip={{ duration: 250, easing: cubicInOut }}
      transition:fade
      class="card bg-base-100 shadow-xl mx-auto">
      <figure class="p-4">
        <img
          src={qr.imageB64}
          alt="QRCode"
          class="w-full h-auto object-contain" />
      </figure>
      <div class="card-body gap-3">
        <div>
          <h2 class="card-title">{qr.content}</h2>
          <p class="wrap-break-word">{qrTypeNameMap[qr.type]}</p>
          <p class="text-sm text-base-content/70 mt-2">
            Criado em {new Date(qr.createdAt).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
        </div>
        <div class="card-actions flex flex-col gap-2 sm:flex-row justify-end">
          <button
            class="btn btn-outline btn-sm w-full sm:w-auto"
            onclick={() => onDownload?.(qr.imageB64)}>
            Baixar
          </button>
          <button
            class="btn btn-primary btn-sm w-full sm:w-auto"
            onclick={() => onCopy(qr.imageB64)}>
            Copiar
          </button>
          <button
            class="btn btn-error btn-sm w-full sm:w-auto"
            onclick={() => onRemove(qr.id)}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>
