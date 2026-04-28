<script setup lang="ts">
import { Inbox } from "lucide-vue-next";

type Props = {
  title?: string;
  description?: string;
};

withDefaults(defineProps<Props>(), {
  title: "Nenhum registro encontrado",
  description: "Ajuste os filtros ou crie um novo registro.",
});
</script>

<template>
  <div
    class="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center"
  >
    <Inbox :size="26" class="mx-auto text-zinc-500" />
    <h3 class="mt-3 text-base font-semibold text-zinc-900">{{ title }}</h3>
    <p class="mt-1 text-sm text-zinc-600">{{ description }}</p>
  </div>
</template>
