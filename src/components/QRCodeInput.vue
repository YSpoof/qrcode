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
    <textarea
      id="qr-input"
      v-model="value"
      placeholder="Cole aqui sua URL ou digite qualquer texto..."
      class="textarea textarea-bordered w-full min-h-32 resize-none focus:textarea-primary"
      rows="4" />
  </div>
</template>
