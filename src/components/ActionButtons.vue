<script setup lang="ts">
  defineProps<{
    imageBase64: string;
  }>();

  const emit = defineEmits<{
    copy: [];
    download: [];
  }>();

  const onCopyClick = () => {
    emit("copy");
  };

  const onDownloadClick = () => {
    emit("download");
  };
</script>
<template>
  <div class="flex flex-col space-y-4 w-full md:w-auto">
    <button
      @click="onCopyClick"
      :disabled="!imageBase64"
      :class="`btn
        ${
          imageBase64
            ? 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'
            : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
        }`">
      <img
        src="../assets/copyIcon.svg"
        alt="Icone de cópia"
        width="20"
        height="20" />
      Copiar
    </button>

    <button
      @click="onDownloadClick"
      :disabled="!imageBase64"
      :class="`btn
        ${
          imageBase64
            ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
            : 'bg-slate-400 cursor-not-allowed'
        }`">
      <img
        src="../assets/downloadIcon.svg"
        alt="Icone de Download"
        width="20"
        height="20" />
      Baixar
    </button>
  </div>
</template>
