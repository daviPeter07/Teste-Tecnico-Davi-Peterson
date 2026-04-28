<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { LogOut } from "lucide-vue-next";
import { dashboardNavigation } from "@/constants/navigation";
import AppButton from "@/components/ui/AppButton.vue";
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
          class="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-4 md:px-6"
        >
          <div>
            <h2 class="text-lg font-semibold text-zinc-900">Dashboard</h2>
          </div>

          <div class="flex w-full gap-2 md:hidden">
            <RouterLink
              v-for="item in dashboardNavigation"
              :key="item.to"
              :to="item.to"
              class="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700"
              active-class="border-orange-500 text-orange-600"
            >
              {{ item.label }}
            </RouterLink>
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

            <AppButton
              variant="secondary"
              size="small"
              @click="onLogout"
            >
              <LogOut :size="16" class="mr-2" />
              Sair
            </AppButton>
          </div>
        </header>

        <main class="flex-1 p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
