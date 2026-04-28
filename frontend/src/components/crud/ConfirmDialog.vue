<script setup lang="ts">
type Props = {
  modelValue: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  title: "Confirmar acao",
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
    <VCard class="rounded-2xl border border-zinc-200">
      <VCardTitle class="text-lg font-semibold text-zinc-900">{{
        props.title
      }}</VCardTitle>
      <VCardText class="text-sm text-zinc-600">{{
        props.description
      }}</VCardText>
      <VCardActions class="px-6 pb-6">
        <VSpacer />
        <VBtn variant="outlined" color="secondary" @click="onClose">{{
          props.cancelLabel
        }}</VBtn>
        <VBtn
          color="deep-orange"
          class="!bg-orange-500 !text-white hover:!bg-orange-600"
          :loading="props.loading"
          @click="onConfirm"
        >
          {{ props.confirmLabel }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
