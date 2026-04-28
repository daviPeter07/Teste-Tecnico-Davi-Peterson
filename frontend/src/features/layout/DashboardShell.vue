<template>
  <VApp>
    <AppSidebar :items="SIDEBAR_ITEMS" :rail="false" />

    <VMain>
      <VContainer fluid class="dashboard-container">
        <RouterView />
      </VContainer>
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppSidebar from "../../components/layout/AppSidebar.vue";
import { SIDEBAR_ITEMS } from "../../constants/navigation";
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  padding: 24px;
}
</style>
