<template>
  <VNavigationDrawer :rail="rail" permanent>
    <VList nav density="comfortable">
      <VListItem
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        :title="item.label"
        rounded="lg"
      >
        <template #prepend>
          <component :is="item.icon" class="h-4 w-4" />
        </template>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import type { SidebarItem } from "../../types/navigation";

defineProps<{
  items: SidebarItem[];
  rail?: boolean;
}>();
</script>
