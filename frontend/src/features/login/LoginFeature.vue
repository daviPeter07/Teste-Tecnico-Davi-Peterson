<script setup lang="ts">
import LoginFormCard from "@/features/login/components/LoginFormCard.vue";
import LoginShowcasePanel from "@/features/login/components/LoginShowcasePanel.vue";
</script>

<template>
  <section class="grid gap-5 md:grid-cols-[1fr_1.1fr]">
    <LoginShowcasePanel />
    <LoginFormCard />
  </section>
</template>
