<script setup lang="ts">
import { ref } from "vue";
import AppFormDialog from "@/components/crud/AppFormDialog.vue";
import ConfirmDialog from "@/components/crud/ConfirmDialog.vue";
import DataTableShell from "@/components/crud/DataTableShell.vue";
import EmptyState from "@/components/crud/EmptyState.vue";

const search = ref("");
const isFormOpen = ref(false);
const isConfirmOpen = ref(false);

const openForm = () => {
  isFormOpen.value = true;
};
</script>

<template>
  <DataTableShell
    title="Usuários"
    subtitle="Padrão visual compartilhado para CRUD de usuários e produtos."
    search-placeholder="Buscar por nome, e-mail ou CPF"
    add-label="Novo usuário"
    :search-value="search"
    @update:search-value="search = $event"
    @add="openForm"
  >
    <template #filters>
      <VSelect
        label="Status"
        variant="outlined"
        density="comfortable"
        color="deep-orange"
        class="auth-input w-full lg:w-48"
        :items="['Todos', 'Ativos', 'Inativos']"
        model-value="Todos"
      />
    </template>

    <template #content>
      <EmptyState
        description="Nenhum usuário carregado ainda. A integração entra na próxima fase."
      />
    </template>

    <template #pagination>
      <div class="flex justify-end">
        <VPagination :length="1" :total-visible="5" :model-value="1" />
      </div>
    </template>
  </DataTableShell>

  <AppFormDialog
    :model-value="isFormOpen"
    title="Novo usuário"
    subtitle="Diálogo base reutilizável para create e edit."
    @update:model-value="isFormOpen = $event"
    @save="isFormOpen = false"
  >
    <div class="grid gap-4 md:grid-cols-2">
      <VTextField
        label="Nome"
        variant="outlined"
        color="deep-orange"
        class="auth-input"
      />
      <VTextField
        label="CPF"
        variant="outlined"
        color="deep-orange"
        class="auth-input"
      />
      <VTextField
        label="E-mail"
        variant="outlined"
        color="deep-orange"
        class="auth-input md:col-span-2"
      />
    </div>
  </AppFormDialog>

  <ConfirmDialog
    :model-value="isConfirmOpen"
    title="Excluir usuário"
    description="Essa ação não pode ser desfeita."
    @update:model-value="isConfirmOpen = $event"
    @confirm="isConfirmOpen = false"
  />
</template>
