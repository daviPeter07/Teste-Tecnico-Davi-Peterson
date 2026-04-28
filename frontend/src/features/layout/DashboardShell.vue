<script setup lang="ts">
import AppSidebar from "@/components/layout/AppSidebar.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen bg-zinc-100">
    <div class="mx-auto flex min-h-screen w-full max-w-[1500px]">
      <AppSidebar />

      <div class="flex min-h-screen flex-1 flex-col">
        <header
          class="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4"
        >
          <div>
            <p class="text-sm text-zinc-500">Painel administrativo</p>
            <h2 class="text-lg font-semibold text-zinc-900">Systock</h2>
          </div>

          <div class="text-right">
            <p class="text-sm font-medium text-zinc-900">
              {{ authStore.user?.name ?? "Visitante" }}
            </p>
            <p class="text-xs text-zinc-500">
              {{ authStore.user?.email ?? "Sem sessao" }}
            </p>
          </div>
        </header>

        <main class="flex-1 p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
