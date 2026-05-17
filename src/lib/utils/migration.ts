import { db } from "$lib/services/db";
import { toastStore } from "$lib/stores/toast.svelte";

const backup = async () => {
  const dbData = await db.qrs.toArray();
  const data = JSON.stringify(dbData);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `qrs_${new Date().toISOString()}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

const restore = async (file: File) => {
  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const data = JSON.parse(event.target?.result as string);
      if (Array.isArray(data)) {
        await db.qrs.clear();
        await db.qrs.bulkAdd(data);
        toastStore.showToast("Dados restaurados com sucesso!");
      } else {
        toastStore.showToast("Formato de arquivo de backup inválido.", "error");
      }
    } catch (error) {
      toastStore.showToast("Erro ao restaurar dados: " + error, "error");
    }
  };
  reader.readAsText(file);
};

export const migration = {
  backup,
  restore,
};
