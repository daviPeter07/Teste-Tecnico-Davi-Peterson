<script setup lang="ts">
import AppButton from "@/components/ui/AppButton.vue";

type Props = {
  modelValue: boolean;
  title: string;
  subtitle?: string;
  saveLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  subtitle: "Preencha os campos abaixo.",
  saveLabel: "Salvar",
  cancelLabel: "Cancelar",
  loading: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  save: [];
}>();

const onClose = () => emit("update:modelValue", false);
const onSave = () => emit("save");
</script>

<template>
  <VDialog
    :model-value="props.modelValue"
    max-width="720"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <VCard class="rounded-2xl border border-zinc-200">
      <VCardTitle class="pt-6 text-xl font-semibold text-zinc-900">{{
        props.title
      }}</VCardTitle>
      <VCardSubtitle class="text-zinc-600">{{ props.subtitle }}</VCardSubtitle>

      <VCardText class="pt-4">
        <slot />
      </VCardText>

      <VCardActions class="px-6 pb-6">
        <VSpacer />
        <AppButton variant="secondary" @click="onClose">{{
          props.cancelLabel
        }}</AppButton>
        <AppButton
          variant="primary"
          :loading="props.loading"
          @click="onSave"
        >
          {{ props.saveLabel }}
        </AppButton>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
