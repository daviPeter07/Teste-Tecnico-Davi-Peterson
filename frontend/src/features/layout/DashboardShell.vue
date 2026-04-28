<template>
  <VApp>
    <AppSidebar :items="SIDEBAR_ITEMS" :rail="false" />

    <VAppBar color="white" elevation="1" density="comfortable">
      <VAppBarTitle class="text-base font-semibold">Painel Administrativo</VAppBarTitle>
      <div class="mr-4 text-sm text-slate-600">
        {{ authStore.user?.name ?? "Usuário" }}
      </div>
      <VBtn variant="text" prepend-icon="mdi-logout" :loading="isLoggingOut" @click="handleLogout">
        Sair
      </VBtn>
    </VAppBar>

    <VMain class="bg-slate-100">
      <VContainer fluid class="dashboard-container">
        <RouterView />
      </VContainer>
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import AppSidebar from "../../components/layout/AppSidebar.vue";
import { SIDEBAR_ITEMS } from "../../constants/navigation";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const isLoggingOut = ref(false);

async function handleLogout(): Promise<void> {
  isLoggingOut.value = true;

  try {
    await authStore.logout();
    await router.push({ name: "login" });
  } finally {
    isLoggingOut.value = false;
  }
}
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  padding: 24px;
}
</style>
