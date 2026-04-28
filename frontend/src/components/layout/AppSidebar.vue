<script setup lang="ts">
import { dashboardNavigation } from "@/constants/navigation";
</script>

<template>
  <aside
    class="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 px-4 py-6 text-white md:flex"
  >
    <div class="mb-8 px-2">
      <h1 class="text-3xl font-black tracking-tight text-orange-500">
        SYSTOCK
      </h1>
      <p class="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
        Painel administrativo
      </p>
    </div>

    <nav class="flex flex-1 flex-col gap-2">
      <RouterLink
        v-for="item in dashboardNavigation"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
        active-class="border-orange-500/40 bg-orange-500/10 text-orange-300"
      >
        <component :is="item.icon" :size="18" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
