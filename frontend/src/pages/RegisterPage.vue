<script setup lang="ts">
import RegisterFeature from "@/features/register/RegisterFeature.vue";
</script>

<template>
  <section
    class="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-10 md:px-8"
  >
    <header class="mb-6">
      <p class="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
        SYSTOCK
      </p>
      <h2 class="mt-2 text-2xl font-bold text-zinc-950">Painel administrativo</h2>
    </header>

    <RegisterFeature class="w-full" />
  </section>
</template>
