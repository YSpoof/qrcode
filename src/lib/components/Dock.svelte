<script lang="ts">
  import { page } from "$app/state";
  import CogIcon from "~icons/mdi/cog-outline";
  import QrCodePlusIcon from "~icons/mdi/qrcode-plus";
  import GridIcon from "~icons/mdi/view-grid-outline";
  const currentPath = $derived(page.url.pathname);
</script>

<div class="dock">
  <a
    href="/"
    class:dock-active={currentPath === "/"}>
    <QrCodePlusIcon class="text-2xl" />
    <span class="dock-label mb-2">Gerar</span>
  </a>

  <a
    href="/history/"
    class:dock-active={currentPath === "/history/"}>
    <GridIcon class="text-2xl" />
    <span class="dock-label mb-2">Histórico</span>
  </a>
  <a
    href="/settings/"
    class:dock-active={currentPath === "/settings/"}>
    <CogIcon class="text-2xl" />
    <span class="dock-label mb-2">Configurações</span>
  </a>
</div>
