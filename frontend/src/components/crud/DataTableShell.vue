<template>
  <VCard rounded="xl" elevation="1">
    <VCardTitle class="d-flex flex-wrap items-center justify-between gap-3">
      <span class="text-h6">{{ title }}</span>

      <div class="d-flex items-center gap-2">
        <VTextField
          :model-value="search"
          label="Pesquisar"
          density="comfortable"
          hide-details
          prepend-inner-icon="mdi-magnify"
          @update:model-value="emit('update:search', String($event ?? ''))"
        />

        <slot name="filters" />
        <slot name="actions" />
      </div>
    </VCardTitle>

    <VCardText>
      <slot />
    </VCardText>

    <VCardActions class="justify-end">
      <VPagination
        :length="Math.max(lastPage, 1)"
        :model-value="currentPage"
        @update:model-value="emit('update:page', Number($event))"
      />
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  search: string;
  currentPage: number;
  lastPage: number;
}>();

const emit = defineEmits<{
  (event: "update:search", value: string): void;
  (event: "update:page", value: number): void;
}>();
</script>
