<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import AppFormDialog from "@/components/crud/AppFormDialog.vue";
import ConfirmDialog from "@/components/crud/ConfirmDialog.vue";
import DataTableShell from "@/components/crud/DataTableShell.vue";
import EmptyState from "@/components/crud/EmptyState.vue";
import LoadingState from "@/components/crud/LoadingState.vue";
import { useApiError } from "@/composables/useApiError";
import { usePaginatedTable } from "@/composables/usePaginatedTable";
import UserForm from "@/features/users/components/UserForm.vue";
import UsersTable from "@/features/users/components/UsersTable.vue";
import {
  createUserRequest,
  deleteUserRequest,
  listUsersRequest,
  updateUserRequest,
} from "@/services/users";
import type { CreateUserPayload, User } from "@/types/user";

const users = ref<User[]>([]);
const totalPages = ref(1);
const isLoading = ref(false);
const isFormLoading = ref(false);
const isDeleteLoading = ref(false);
const requestError = ref("");

const selectedUser = ref<User | null>(null);
const isFormOpen = ref(false);
const isConfirmOpen = ref(false);
const userFormRef = ref<InstanceType<typeof UserForm> | null>(null);

const { getApiErrorMessage } = useApiError();
const { page, perPage, search, queryParams, setPage, setSearch } = usePaginatedTable({
  initialPerPage: 10,
});

const isEditMode = computed(() => Boolean(selectedUser.value));

const fetchUsers = async () => {
  isLoading.value = true;
  requestError.value = "";

  try {
    const response = await listUsersRequest(queryParams.value);
    users.value = response.data ?? [];
    totalPages.value = response.meta?.last_page ?? 1;
  } catch (error) {
    requestError.value = getApiErrorMessage(error, "Não foi possível carregar usuários.");
  } finally {
    isLoading.value = false;
  }
};

const openCreateDialog = () => {
  selectedUser.value = null;
  isFormOpen.value = true;
};

const openEditDialog = (user: User) => {
  selectedUser.value = user;
  isFormOpen.value = true;
};

const openDeleteDialog = (user: User) => {
  selectedUser.value = user;
  isConfirmOpen.value = true;
};

const submitForm = async (payload: CreateUserPayload) => {
  isFormLoading.value = true;
  requestError.value = "";

  try {
    if (selectedUser.value) {
      await updateUserRequest(selectedUser.value.id, payload);
    } else {
      await createUserRequest(payload);
    }

    isFormOpen.value = false;
    await fetchUsers();
  } catch (error) {
    requestError.value = getApiErrorMessage(error, "Não foi possível salvar o usuário.");
  } finally {
    isFormLoading.value = false;
  }
};

const confirmDelete = async () => {
  if (!selectedUser.value) {
    return;
  }

  isDeleteLoading.value = true;

  try {
    await deleteUserRequest(selectedUser.value.id);
    isConfirmOpen.value = false;
    await fetchUsers();
  } catch (error) {
    requestError.value = getApiErrorMessage(error, "Não foi possível excluir o usuário.");
  } finally {
    isDeleteLoading.value = false;
  }
};

const onDialogSave = () => {
  userFormRef.value?.onSubmit();
};

onMounted(async () => {
  await fetchUsers();
});

watch([page, perPage, search], async () => {
  await fetchUsers();
});
</script>

<template>
  <DataTableShell
    title="Usuários"
    subtitle="Gerencie os usuários cadastrados com busca e paginação."
    search-placeholder="Buscar por nome, e-mail ou CPF"
    add-label="Novo usuário"
    :search-value="search"
    @update:search-value="setSearch"
    @add="openCreateDialog"
  >
    <template #content>
      <VAlert v-if="requestError" type="error" variant="tonal" class="mb-4">
        {{ requestError }}
      </VAlert>

      <LoadingState v-if="isLoading" message="Carregando usuários..." />
      <EmptyState v-else-if="!users.length" description="Nenhum usuário encontrado para os filtros atuais." />
      <UsersTable v-else :users="users" @edit="openEditDialog" @remove="openDeleteDialog" />
    </template>

    <template #pagination>
      <div class="flex justify-end">
        <VPagination :length="totalPages" :model-value="page" :total-visible="7" @update:model-value="setPage" />
      </div>
    </template>
  </DataTableShell>

  <AppFormDialog
    :model-value="isFormOpen"
    :title="isEditMode ? 'Editar usuário' : 'Novo usuário'"
    subtitle="Preencha os dados e confirme para salvar."
    :save-label="isEditMode ? 'Salvar alterações' : 'Criar usuário'"
    :loading="isFormLoading"
    @update:model-value="isFormOpen = $event"
    @save="onDialogSave"
  >
    <UserForm ref="userFormRef" :initial-user="selectedUser" @submit="submitForm" />
  </AppFormDialog>

  <ConfirmDialog
    :model-value="isConfirmOpen"
    title="Excluir usuário"
    description="Essa ação não pode ser desfeita."
    confirm-label="Excluir"
    :loading="isDeleteLoading"
    @update:model-value="isConfirmOpen = $event"
    @confirm="confirmDelete"
  />
</template>
