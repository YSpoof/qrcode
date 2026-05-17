<script lang="ts">
  import { goto } from "$app/navigation";
  import { qrHelper } from "$lib/helpers/qr";
  import { migration } from "$lib/utils/migration";

  let isLoading = $state(false);

  const handleBackup = async () => {
    isLoading = true;
    try {
      await migration.backup();
    } finally {
      isLoading = false;
    }
  };

  const handleRestore = async () => {
    if (!confirm("Restaurar um backup irá sobrescrever os dados atuais, tem certeza?")) {
      return;
    }

    const restoreInput = document.createElement("input");
    restoreInput.type = "file";
    restoreInput.accept = "application/json";
    restoreInput.className = "hidden";
    restoreInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }

      isLoading = true;
      try {
        await migration.restore(file);
        await goto("/history/");
      } finally {
        isLoading = false;
      }
    };
    restoreInput.click();
  };

  const handleClearAll = async () => {
    if (!confirm("Remover todos os QR Codes? Esta ação não pode ser desfeita.")) {
      return;
    }

    isLoading = true;
    try {
      const result = await qrHelper.removeAllQrs();
      if (result) {
        await goto("/history/");
      } else {
        alert("Ocorreu um erro ao tentar remover os QR Codes.");
      }
    } finally {
      isLoading = false;
    }
  };
</script>

<section class="space-y-6">
  <div class="space-y-2">
    <p class="max-w-2xl text-base-content/70 text-pretty">
      Faça backup dos seus QR Codes, restaure usando um arquivo de backup ou limpe toda a sua
      coleção para começar do zero.
    </p>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div class="card bg-base-200 shadow-lg">
      <div class="card-body gap-4">
        <div>
          <h2 class="card-title">Backup & restauração</h2>
          <p class="text-sm text-base-content/70 text-pretty">
            Salve seus QR Codes em um único arquivo ou restaure um backup quando precisar recuperar
            seus dados.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <button
            class="btn btn-primary"
            onclick={handleBackup}
            disabled={isLoading}>
            {#if isLoading}
              Gerando backup...
            {:else}
              Fazer backup
            {/if}
          </button>

          <button
            class="btn btn-secondary"
            onclick={handleRestore}
            disabled={isLoading}>
            Restaurar backup
          </button>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-lg border border-error/20">
      <div class="card-body gap-4">
        <div>
          <h2 class="card-title text-error">Limpar QR Codes</h2>
          <p class="text-sm text-base-content/70 text-pretty">
            Esta ação apaga permanentemente todos os QR Codes armazenados, tenha um backup antes de
            prosseguir.
          </p>
        </div>

        <button
          class="btn btn-error"
          onclick={handleClearAll}
          disabled={isLoading}>
          {#if isLoading}
            Processando...
          {:else}
            Remover todos os QR Codes
          {/if}
        </button>
      </div>
    </div>
  </div>
</section>
