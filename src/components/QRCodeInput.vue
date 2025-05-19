<script setup lang="ts">
  const value = defineModel({ default: "", type: String });
</script>
<template>
  <div class="w-full max-w-xl mx-auto">
    <label
      for="qr-input"
      class="sr-only">
      Digite aqui
    </label>
    <input
      id="qr-input"
      type="text"
      v-model="value"
      placeholder="Digite o texto ou URL..."
      class="input w-full dark:bg-slate-700 dark:text-white" />
  </div>
</template>
