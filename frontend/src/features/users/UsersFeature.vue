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
import type { UpdateUserSchemaOutput } from "@/schemas/users/user.schema";
import type { CreateUserPayload, User } from "@/types/user";
import { formatCpf } from "@/utils/cpf";

const users = ref<User[]>([]);
const totalPages = ref(1);
const isLoading = ref(false);
const isFormLoading = ref(false);
const isDeleteLoading = ref(false);
const requestError = ref("");
const selectedSort = ref("recentes");

const selectedUser = ref<User | null>(null);
const isFormOpen = ref(false);
const isConfirmOpen = ref(false);
const isViewOpen = ref(false);
const userFormRef = ref<InstanceType<typeof UserForm> | null>(null);

const { getApiErrorMessage } = useApiError();
const { page, perPage, search, queryParams, setPage, setSearch } =
  usePaginatedTable({
    initialPerPage: 10,
  });

const isEditMode = computed(() => Boolean(selectedUser.value));

const sortParams = computed(() => {
  switch (selectedSort.value) {
    case "antigos":
      return { sort_by: "created_at", sort_dir: "asc" };
    case "az":
      return { sort_by: "name", sort_dir: "asc" };
    case "za":
      return { sort_by: "name", sort_dir: "desc" };
    default:
      return { sort_by: "created_at", sort_dir: "desc" };
  }
});

const fetchUsers = async () => {
  isLoading.value = true;
  requestError.value = "";

  try {
    const response = await listUsersRequest({
      ...queryParams.value,
      ...sortParams.value,
    });
    users.value = response.data ?? [];
    totalPages.value = response.meta?.last_page ?? 1;
  } catch (error) {
    requestError.value = getApiErrorMessage(
      error,
      "Não foi possível carregar usuários.",
    );
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

const openViewDialog = (user: User) => {
  selectedUser.value = user;
  isViewOpen.value = true;
};

const openDeleteDialog = (user: User) => {
  selectedUser.value = user;
  isConfirmOpen.value = true;
};

const onConfirmDialogChange = (value: boolean) => {
  isConfirmOpen.value = value;

  if (!value) {
    isDeleteLoading.value = false;
  }
};

const submitForm = async (
  payload: CreateUserPayload | UpdateUserSchemaOutput,
) => {
  isFormLoading.value = true;
  requestError.value = "";

  try {
    if (selectedUser.value) {
      await updateUserRequest(selectedUser.value.id, payload);
    } else {
      await createUserRequest(payload as CreateUserPayload);
    }

    isFormOpen.value = false;
    await fetchUsers();
  } catch (error) {
    requestError.value = getApiErrorMessage(
      error,
      "Não foi possível salvar o usuário.",
    );
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
    requestError.value = getApiErrorMessage(
      error,
      "Não foi possível excluir o usuário.",
    );
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

watch([page, perPage, search, selectedSort], async () => {
  await fetchUsers();
});

watch(selectedSort, () => {
  setPage(1);
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
    <template #filters>
      <VSelect
        v-model="selectedSort"
        label="Ordenar"
        variant="outlined"
        density="comfortable"
        color="deep-orange"
        class="auth-input w-full lg:w-56"
        :items="[
          { title: 'Mais recentes', value: 'recentes' },
          { title: 'Mais antigos', value: 'antigos' },
          { title: 'Nome (A-Z)', value: 'az' },
          { title: 'Nome (Z-A)', value: 'za' },
        ]"
      />
    </template>

    <template #content>
      <VAlert v-if="requestError" type="error" variant="tonal" class="mb-4">
        {{ requestError }}
      </VAlert>

      <LoadingState v-if="isLoading" message="Carregando usuários..." />
      <EmptyState
        v-else-if="!users.length"
        description="Nenhum usuário encontrado para os filtros atuais."
      />
      <UsersTable
        v-else
        :users="users"
        @view="openViewDialog"
        @edit="openEditDialog"
        @remove="openDeleteDialog"
      />
    </template>

    <template #pagination>
      <div class="flex justify-end max-sm:justify-center">
        <VPagination
          :length="totalPages"
          :model-value="page"
          :total-visible="7"
          @update:model-value="setPage"
        />
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
    <UserForm
      ref="userFormRef"
      :initial-user="selectedUser"
      @submit="submitForm"
    />
  </AppFormDialog>

  <ConfirmDialog
    :model-value="isConfirmOpen"
    title="Excluir usuário"
    :description="`Tem certeza que deseja excluir ${selectedUser?.name ?? 'este usuário'}? Essa ação não pode ser desfeita.`"
    confirm-label="Excluir"
    :loading="isDeleteLoading"
    @update:model-value="onConfirmDialogChange"
    @confirm="confirmDelete"
  />

  <VDialog
    :model-value="isViewOpen"
    max-width="560"
    @update:model-value="isViewOpen = $event"
  >
    <VCard class="rounded-2xl border border-zinc-200">
      <VCardTitle class="text-lg font-semibold text-zinc-900"
        >Detalhes do usuário</VCardTitle
      >
      <VCardText>
        <div class="grid gap-3">
          <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <p class="text-xs uppercase tracking-[0.16em] text-zinc-500">
              Nome
            </p>
            <p class="mt-1 font-medium text-zinc-900">
              {{ selectedUser?.name }}
            </p>
          </div>
          <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <p class="text-xs uppercase tracking-[0.16em] text-zinc-500">
              E-mail
            </p>
            <p class="mt-1 font-medium text-zinc-900">
              {{ selectedUser?.email }}
            </p>
          </div>
          <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <p class="text-xs uppercase tracking-[0.16em] text-zinc-500">CPF</p>
            <p class="mt-1 font-medium text-zinc-900">
              {{ selectedUser?.cpf ? formatCpf(selectedUser.cpf) : "-" }}
            </p>
          </div>
        </div>
      </VCardText>
      <VCardActions class="px-6 pb-5">
        <VSpacer />
        <VBtn variant="outlined" color="secondary" @click="isViewOpen = false"
          >Fechar</VBtn
        >
      </VCardActions>
    </VCard>
  </VDialog>
</template>
