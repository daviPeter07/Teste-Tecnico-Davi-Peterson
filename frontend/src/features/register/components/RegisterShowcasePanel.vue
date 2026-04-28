<script setup lang="ts">
import { BadgeCheck, UserRoundPlus } from "lucide-vue-next";
</script>

<template>
  <aside
    class="relative hidden h-full overflow-hidden rounded-2xl bg-zinc-950 p-8 text-white md:flex md:flex-col md:justify-between"
  >
    <div
      class="absolute -left-14 -top-16 h-56 w-56 rounded-full bg-orange-500/30 blur-3xl"
    />
    <div
      class="absolute -bottom-20 -right-14 h-56 w-56 rounded-full bg-orange-600/20 blur-3xl"
    />

    <div class="relative">
      <p
        class="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400"
      >
        SYSTOCK
      </p>
      <h2 class="mt-6 text-3xl font-semibold leading-tight">
        Crie sua conta e
        <span class="text-orange-400">comece rápido</span>
      </h2>
      <p class="mt-4 max-w-xs text-sm text-zinc-300">
        Organize sua base de usuários e produtos com um fluxo de cadastro
        simples e validação robusta.
      </p>
    </div>

    <div class="relative space-y-3">
      <div class="flex items-center gap-2 text-sm text-zinc-200">
        <UserRoundPlus :size="16" class="text-orange-400" />
        Cadastro rápido
      </div>
      <div class="flex items-center gap-2 text-sm text-zinc-200">
        <BadgeCheck :size="16" class="text-orange-400" />
        Dados validados no frontend e backend
      </div>
    </div>
  </aside>
</template>
