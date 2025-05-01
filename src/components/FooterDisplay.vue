<script setup lang="ts">
  const currentYear = new Date().getFullYear();
</script>
<template>
  <footer
    class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
    <aside>
      <p class="text-slate-600 dark:text-slate-400">
        © {{ currentYear }} -
        <a
          href="https://lzart.com.br"
          class="text-indigo-600 dark:text-indigo-400 hover:underline"
          target="_blank">
          Desenvolvido por LZArt
        </a>
      </p>
    </aside>
  </footer>
</template>
