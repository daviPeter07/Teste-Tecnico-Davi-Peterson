<template>
  <DataTableShell
    title="Produtos"
    :search="search"
    :current-page="page"
    :last-page="1"
    @update:search="search = $event"
    @update:page="page = $event"
  >
    <VAlert type="info" variant="tonal">
      Base reutilizável pronta. Próxima fase implementa CRUD completo de produtos.
    </VAlert>
  </DataTableShell>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTableShell from "../components/crud/DataTableShell.vue";

const search = ref("");
const page = ref(1);
</script>
