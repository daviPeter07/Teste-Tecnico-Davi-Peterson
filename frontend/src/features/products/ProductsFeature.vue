<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import AppDetailDialog from "@/components/crud/AppDetailDialog.vue";
import AppFormDialog from "@/components/crud/AppFormDialog.vue";
import ConfirmDialog from "@/components/crud/ConfirmDialog.vue";
import DataTableShell from "@/components/crud/DataTableShell.vue";
import EmptyState from "@/components/crud/EmptyState.vue";
import LoadingState from "@/components/crud/LoadingState.vue";
import { useApiError } from "@/composables/useApiError";
import ProductForm from "@/features/products/components/ProductForm.vue";
import ProductsTable from "@/features/products/components/ProductsTable.vue";
import {
  createProductRequest,
  deleteProductRequest,
  listProductsRequest,
  updateProductRequest,
} from "@/services/products";
import { listUsersRequest } from "@/services/users";
import type { CreateProductPayload, Product } from "@/types/product";
import type { User } from "@/types/user";
import { formatCurrency } from "@/utils/number";
import { formatDateTime } from "@/utils/date";
import { usePaginatedTable } from "@/composables/usePaginatedTable";

const products = ref<Product[]>([]);
const users = ref<User[]>([]);
const selectedSort = ref("recentes");

const isLoading = ref(true);
const isFormLoading = ref(false);
const isDeleteLoading = ref(false);
const requestError = ref("");

const selectedProduct = ref<Product | null>(null);
const isFormOpen = ref(false);
const isConfirmOpen = ref(false);
const isViewOpen = ref(false);
const productFormRef = ref<InstanceType<typeof ProductForm> | null>(null);

const { getApiErrorMessage } = useApiError();
const {
  page,
  perPage,
  search,
  debouncedSearch,
  queryParams,
  setPage,
  setSearch,
} = usePaginatedTable({
  initialPerPage: 10,
});

const totalPages = ref(1);

const isEditMode = computed(() => Boolean(selectedProduct.value));

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
  try {
    const response = await listUsersRequest({ page: 1, per_page: 200 });
    users.value = response.data ?? [];
  } catch {
    users.value = [];
  }
};

const fetchProducts = async () => {
  isLoading.value = true;
  requestError.value = "";

  try {
    const response = await listProductsRequest({
      ...queryParams.value,
      ...sortParams.value,
    });
    products.value = response.data ?? [];
    totalPages.value = response.meta?.last_page ?? 1;
  } catch (error) {
    requestError.value = getApiErrorMessage(
      error,
      "Não foi possível carregar produtos.",
    );
  } finally {
    isLoading.value = false;
  }
};

const openCreateDialog = () => {
  selectedProduct.value = null;
  isFormOpen.value = true;
};

const openEditDialog = (product: Product) => {
  selectedProduct.value = product;
  isFormOpen.value = true;
};

const openViewDialog = (product: Product) => {
  selectedProduct.value = product;
  isViewOpen.value = true;
};

const openDeleteDialog = (product: Product) => {
  selectedProduct.value = product;
  isConfirmOpen.value = true;
};

const onConfirmDialogChange = (value: boolean) => {
  isConfirmOpen.value = value;

  if (!value) {
    isDeleteLoading.value = false;
  }
};

const submitForm = async (payload: CreateProductPayload) => {
  isFormLoading.value = true;
  requestError.value = "";

  try {
    if (selectedProduct.value) {
      await updateProductRequest(selectedProduct.value.id, payload);
    } else {
      await createProductRequest(payload);
    }

    isFormOpen.value = false;
    await fetchProducts();
  } catch (error) {
    requestError.value = getApiErrorMessage(
      error,
      "Não foi possível salvar o produto.",
    );
  } finally {
    isFormLoading.value = false;
  }
};

const confirmDelete = async () => {
  if (!selectedProduct.value) {
    return;
  }

  isDeleteLoading.value = true;

  try {
    await deleteProductRequest(selectedProduct.value.id);
    isConfirmOpen.value = false;
    await fetchProducts();
  } catch (error) {
    requestError.value = getApiErrorMessage(
      error,
      "Não foi possível excluir o produto.",
    );
  } finally {
    isDeleteLoading.value = false;
  }
};

const onDialogSave = () => {
  productFormRef.value?.onSubmit();
};

const onSearchChange = (value: string) => {
  setSearch(value);
};

onMounted(async () => {
  await Promise.all([fetchUsers(), fetchProducts()]);
});

watch([page, perPage, debouncedSearch, selectedSort], async () => {
  await fetchProducts();
});

watch(selectedSort, () => {
  setPage(1);
});
</script>

<template>
  <DataTableShell
    title="Produtos"
    subtitle="Gerencie os produtos cadastrados com busca, filtros e paginação."
    search-placeholder="Buscar por nome ou descrição"
    add-label="Novo produto"
    :search-value="search"
    @update:search-value="onSearchChange"
    @add="openCreateDialog"
  >
    <template #filters>
      <VSelect
        v-model="selectedSort"
        label="Ordenar"
        variant="outlined"
        density="comfortable"
        color="deep-orange"
        class="auth-input w-full lg:w-64"
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

      <LoadingState v-if="isLoading" message="Carregando produtos..." />
      <EmptyState
        v-else-if="!products.length"
        description="Nenhum produto encontrado para os filtros atuais."
      />
      <ProductsTable
        v-else
        :products="products"
        @view="openViewDialog"
        @edit="openEditDialog"
        @remove="openDeleteDialog"
      />
    </template>

    <template #pagination>
      <div class="flex items-center justify-end gap-3 max-sm:justify-center">
        <VPagination
          :length="totalPages"
          :model-value="page"
          :total-visible="7"
          @update:model-value="page = $event"
        />
      </div>
    </template>
  </DataTableShell>

  <AppFormDialog
    :model-value="isFormOpen"
    :title="isEditMode ? 'Editar produto' : 'Novo produto'"
    subtitle="Preencha os dados e confirme para salvar."
    :save-label="isEditMode ? 'Salvar alterações' : 'Criar produto'"
    :loading="isFormLoading"
    @update:model-value="isFormOpen = $event"
    @save="onDialogSave"
  >
    <ProductForm
      ref="productFormRef"
      :initial-product="selectedProduct"
      :users="users"
      @submit="submitForm"
    />
  </AppFormDialog>

  <ConfirmDialog
    :model-value="isConfirmOpen"
    title="Excluir produto"
    :description="`Tem certeza que deseja excluir ${selectedProduct?.name ?? 'este produto'}? Essa ação não pode ser desfeita.`"
    confirm-label="Excluir"
    :loading="isDeleteLoading"
    @update:model-value="onConfirmDialogChange"
    @confirm="confirmDelete"
  />

  <AppDetailDialog
    :model-value="isViewOpen"
    title="Detalhes do produto"
    subtitle="Informações do cadastro e do usuário associado."
    :max-width="860"
    @update:model-value="isViewOpen = $event"
  >
    <div class="grid gap-3 md:grid-cols-2">
      <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p class="text-xs uppercase tracking-[0.16em] text-zinc-500">ID</p>
        <p class="mt-1 text-sm font-semibold text-zinc-900">
          {{ selectedProduct?.id }}
        </p>
      </div>
      <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p class="text-xs uppercase tracking-[0.16em] text-zinc-500">Preço</p>
        <p class="mt-1 text-sm font-semibold text-zinc-900">
          {{ formatCurrency(selectedProduct?.price) }}
        </p>
      </div>
      <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p class="text-xs uppercase tracking-[0.16em] text-zinc-500">Nome</p>
        <p class="mt-1 text-sm font-semibold text-zinc-900">
          {{ selectedProduct?.name }}
        </p>
      </div>
      <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p class="text-xs uppercase tracking-[0.16em] text-zinc-500">Usuário</p>
        <p class="mt-1 text-sm font-semibold text-zinc-900">
          {{ selectedProduct?.user?.name || "-" }}
        </p>
        <p class="mt-1 text-xs text-zinc-500">
          {{ selectedProduct?.user?.email || "-" }}
        </p>
      </div>
      <div
        class="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 md:col-span-2"
      >
        <p class="text-xs uppercase tracking-[0.16em] text-zinc-500">
          Auditoria
        </p>
        <div class="mt-3 grid gap-3 md:grid-cols-2">
          <div class="rounded-xl bg-white px-3 py-2">
            <p class="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              Criado em
            </p>
            <p class="mt-1 text-sm font-semibold text-zinc-900">
              {{
                selectedProduct?.created_at
                  ? formatDateTime(selectedProduct.created_at)
                  : "-"
              }}
            </p>
          </div>
          <div class="rounded-xl bg-white px-3 py-2">
            <p class="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              Atualizado em
            </p>
            <p class="mt-1 text-sm font-semibold text-zinc-900">
              {{
                selectedProduct?.updated_at
                  ? formatDateTime(selectedProduct.updated_at)
                  : "-"
              }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 md:col-span-2"
      >
        <p class="text-xs uppercase tracking-[0.16em] text-zinc-500">
          Descrição
        </p>
        <p
          class="mt-3 max-w-3xl text-sm leading-6 text-zinc-900 whitespace-pre-line"
        >
          {{ selectedProduct?.description || "-" }}
        </p>
      </div>
    </div>
  </AppDetailDialog>
</template>
