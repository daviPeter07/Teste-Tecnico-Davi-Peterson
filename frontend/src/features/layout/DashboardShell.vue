<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { LogOut } from "lucide-vue-next";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const onLogout = async () => {
  await authStore.logout();
  await router.push({ name: "login" });
};

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchMe();
    } catch {
      authStore.clearSession();
      await router.push({ name: "login" });
    }
  }
});
</script>

<template>
  <div class="min-h-screen bg-zinc-100">
    <div class="flex min-h-screen w-full">
      <AppSidebar />

      <div class="flex min-h-screen flex-1 flex-col">
        <header
          class="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4"
        >
          <div>
            <h2 class="text-lg font-semibold text-zinc-900">Dashboard</h2>
          </div>

          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-sm font-medium text-zinc-900">
                {{ authStore.user?.name ?? "Visitante" }}
              </p>
              <p class="text-xs text-zinc-500">
                {{ authStore.user?.email ?? "Sem sessão" }}
              </p>
            </div>

            <VBtn
              variant="outlined"
              color="deep-orange"
              size="small"
              prepend-icon=""
              @click="onLogout"
            >
              <LogOut :size="16" class="mr-2" />
              Sair
            </VBtn>
          </div>
        </header>

        <main class="flex-1 p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
