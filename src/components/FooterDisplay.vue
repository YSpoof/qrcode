<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
<template>
  <footer class="w-full py-6 px-4 text-center text-sm bg-white dark:bg-slate-800">
    <div class="max-w-4xl mx-auto">
      <p class="text-slate-600 dark:text-slate-400">
        © {{ currentYear }} -
        <a
          href="https://lzart.com.br"
          class="text-indigo-600 dark:text-indigo-400 hover:underline"
          target="_blank"
        >
          Desenvolvido por LZArt
        </a>
      </p>
    </div>
  </footer>
</template>
