<script setup lang="ts">
const value = defineModel({ default: '', type: String })
</script>
<template>
  <div class="w-full max-w-xl mx-auto">
    <label for="qr-input" class="sr-only"> Digite aqui </label>
    <input
      id="qr-input"
      type="text"
      v-model="value"
      placeholder="Digite o texto ou URL..."
      class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white"
    />
  </div>
</template>
