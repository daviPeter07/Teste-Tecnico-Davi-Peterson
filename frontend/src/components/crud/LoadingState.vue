<script setup lang="ts">
type Props = {
  message?: string;
};

withDefaults(defineProps<Props>(), {
  message: "Carregando dados...",
});
</script>

<template>
  <div class="rounded-xl border border-zinc-200 bg-white px-6 py-10">
    <div class="mx-auto max-w-sm text-center">
      <VProgressCircular
        indeterminate
        color="deep-orange"
        :size="34"
        :width="3"
      />
      <p class="mt-3 text-sm text-zinc-600">{{ message }}</p>
    </div>
  </div>
</template>
