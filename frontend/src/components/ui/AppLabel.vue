<script setup lang="ts">
import type { Component } from "vue";

type Props = {
  text: string;
  icon?: Component;
  muted?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  muted: false,
});
</script>

<template>
  <div
    class="mb-1 flex items-center gap-2 text-sm font-medium"
    :class="props.muted ? 'text-zinc-500' : 'text-zinc-700'"
  >
    <component
      :is="props.icon"
      v-if="props.icon"
      :size="15"
      class="text-zinc-500"
    />
    <span>{{ props.text }}</span>
  </div>
</template>
