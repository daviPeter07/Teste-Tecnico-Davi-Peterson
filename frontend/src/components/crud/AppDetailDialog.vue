<script setup lang="ts">
import AppButton from "@/components/ui/AppButton.vue";

type Props = {
  modelValue: boolean;
  title: string;
  subtitle?: string;
  closeLabel?: string;
  maxWidth?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  subtitle: "Confira os detalhes do registro.",
  closeLabel: "Fechar",
  maxWidth: 720,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const onClose = () => emit("update:modelValue", false);
</script>

<template>
  <VDialog
    :model-value="props.modelValue"
    :max-width="props.maxWidth"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <VCard class="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(24,24,27,0.14)]">
      <div class="h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-300" />

      <div class="border-b border-zinc-200 bg-zinc-50/80 px-6 py-5">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600">
          Detalhes
        </p>
        <VCardTitle class="px-0 pt-1 text-2xl font-semibold text-zinc-900">
          {{ props.title }}
        </VCardTitle>
        <VCardSubtitle class="px-0 text-zinc-600">
          {{ props.subtitle }}
        </VCardSubtitle>
      </div>

      <VCardText class="px-6 py-6">
        <slot />
      </VCardText>

      <VCardActions class="border-t border-zinc-200 bg-zinc-50/70 px-6 py-4">
        <VSpacer />
        <AppButton variant="primary" @click="onClose">
          {{ props.closeLabel }}
        </AppButton>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
