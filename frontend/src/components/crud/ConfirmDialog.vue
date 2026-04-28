<script setup lang="ts">
import AppButton from "@/components/ui/AppButton.vue";

type Props = {
  modelValue: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  title: "Confirmar ação",
  description: "Tem certeza que deseja continuar?",
  confirmLabel: "Confirmar",
  cancelLabel: "Cancelar",
  loading: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirm: [];
}>();

const onClose = () => emit("update:modelValue", false);
const onConfirm = () => emit("confirm");
</script>

<template>
  <VDialog
    :model-value="props.modelValue"
    max-width="440"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <VCard class="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(24,24,27,0.12)]">
      <div class="h-1 bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300" />
      <div class="px-6 py-5">
        <VCardTitle class="px-0 text-2xl font-semibold text-zinc-900">
          {{ props.title }}
        </VCardTitle>
        <VCardText class="px-0 pt-2 text-sm leading-6 text-zinc-600">
          {{ props.description }}
        </VCardText>
      </div>
      <VCardActions class="border-t border-zinc-200 bg-zinc-50/70 px-6 py-4">
        <VSpacer />
        <AppButton variant="secondary" @click="onClose">{{
          props.cancelLabel
        }}</AppButton>
        <AppButton
          variant="primary"
          :loading="props.loading"
          @click="onConfirm"
        >
          {{ props.confirmLabel }}
        </AppButton>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
