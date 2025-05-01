<script setup lang="ts">
  defineProps<{
    imageBase64: string;
  }>();

  const emit = defineEmits<{
    copy: [];
  }>();

  const onCopyClick = () => {
    emit("copy");
  };
</script>
<template>
  <div class="relative group">
    <div
      v-if="imageBase64"
      class="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-xl tooltip">
      <img
        @click="onCopyClick"
        :src="imageBase64"
        alt="QR Code"
        class="w-64 h-64 md:w-72 md:h-72 object-contain cursor-pointer"
        title="Clique para copiar." />
      <div class="tooltip-content">
        <div class="animate-pulse text-purple-400 text-lg font-black">
          Clique para copiar
        </div>
      </div>
    </div>
    <div
      v-else
      class="w-72 h-72 md:w-80 md:h-80 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
      <p class="text-slate-500 dark:text-slate-400 text-center px-4">
        O QRCode aparecerá aqui.
      </p>
    </div>
  </div>
</template>
