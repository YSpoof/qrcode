<script lang="ts">
  import "./layout.css";
  import { beforeNavigate, onNavigate } from "$app/navigation";
  import { page, updated } from "$app/state";
  import Dock from "$lib/components/Dock.svelte";
  import ToastRenderer from "$lib/components/ToastRenderer.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import RefreshIcon from "~icons/mdi/refresh";
  import vibrate from "$lib/utils/vibrate";

  let { children } = $props();

  let showUpdateNotice = $state(false);

  beforeNavigate(async ({ type, to, willUnload }) => {
    if (type === "leave") return;
    vibrate.light();
    if (updated.current && !willUnload && to?.url) {
      globalThis.location.href = to.url.href;
    }
  });

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  $effect(() => {
    if (updated.current) {
      showUpdateNotice = true;
    }
  });

  onMount(() => {
    updated.check();
  });
</script>

<svelte:head>
  <title>{page.data.title ? `${page.data.title} | QREncode` : "QREncode"}</title>
</svelte:head>

<main class="container px-4 py-4 mx-auto max-w-6xl mb-16 pb-2">
  {@render children()}
  <Dock />
</main>

<ToastRenderer />

{#if showUpdateNotice}
  <div
    transition:fade={{ duration: 200 }}
    role="alert"
    class="alert alert-vertical sm:alert-horizontal fixed bottom-16 left-1/2 -translate-x-1/2 z-50 shadow-lg"
  >
    <RefreshIcon class="text-2xl" />
    <div>
      <h3 class="font-bold">O App foi atualizado</h3>
      <div class="text-xs">Por favor, reabra o aplicativo.</div>
    </div>
    <button
      class="btn btn-sm btn-primary"
      onclick={() => {
        globalThis.location.reload();
      }}>Entendido</button
    >
  </div>
{/if}
