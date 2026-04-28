<script setup lang="ts">
import { Plus, Search } from "lucide-vue-next";

type Props = {
  title?: string;
  subtitle?: string;
  searchValue?: string;
  searchPlaceholder?: string;
  addLabel?: string;
  disableAdd?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  subtitle: "Gerencie os registros com busca, filtros e paginação.",
  searchValue: "",
  searchPlaceholder: "Buscar...",
  addLabel: "Novo",
  disableAdd: false,
});

const emit = defineEmits<{
  add: [];
  "update:searchValue": [value: string];
}>();

const onSearchInput = (value: string) => emit("update:searchValue", value);
const onAdd = () => emit("add");
</script>

<template>
  <section class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
    <header
      class="flex flex-col gap-4 border-b border-zinc-200 pb-4 lg:flex-row lg:items-end lg:justify-between"
    >
      <div>
        <h1 class="mt-1 text-2xl font-bold text-zinc-950">{{ props.title }}</h1>
        <p class="mt-1 text-sm text-zinc-600">{{ props.subtitle }}</p>
      </div>

      <VBtn
        color="deep-orange"
        class="!bg-orange-500 !text-white hover:!bg-orange-600"
        :disabled="props.disableAdd"
        @click="onAdd"
      >
        <Plus :size="16" class="mr-2" />
        {{ props.addLabel }}
      </VBtn>
    </header>

    <div class="mt-4 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
      <VTextField
        :model-value="props.searchValue"
        variant="outlined"
        density="comfortable"
        color="deep-orange"
        class="auth-input"
        :placeholder="props.searchPlaceholder"
        @update:model-value="onSearchInput($event ?? '')"
      >
        <template #prepend-inner>
          <Search :size="16" class="text-zinc-500" />
        </template>
      </VTextField>

      <div class="flex items-center justify-end gap-2">
        <slot name="filters" />
      </div>
    </div>

    <div class="mt-4">
      <slot name="content" />
    </div>

    <footer class="mt-4">
      <slot name="pagination" />
    </footer>
  </section>
</template>
