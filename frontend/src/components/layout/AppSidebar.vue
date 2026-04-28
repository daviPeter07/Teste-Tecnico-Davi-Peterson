<template>
  <VNavigationDrawer :rail="rail" permanent>
    <VList nav density="comfortable">
      <VListItem
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.label"
        rounded="lg"
      />
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
