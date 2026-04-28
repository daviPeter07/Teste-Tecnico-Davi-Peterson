<script setup lang="ts">
import RegisterFormCard from "@/features/register/components/RegisterFormCard.vue";
import RegisterShowcasePanel from "@/features/register/components/RegisterShowcasePanel.vue";
</script>

<template>
  <section class="grid gap-5 md:grid-cols-[1fr_1.1fr]">
    <RegisterShowcasePanel />
    <RegisterFormCard />
  </section>
</template>
