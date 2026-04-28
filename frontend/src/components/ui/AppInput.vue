<script setup lang="ts">
type Props = {
  modelValue?: unknown;
  placeholder?: string;
  type?: string;
  autocomplete?: string;
  errorMessages?: string | string[];
  min?: string | number;
  step?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: "",
  type: "text",
  autocomplete: "off",
  errorMessages: "",
  min: undefined,
  step: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: unknown];
}>();
</script>

<template>
  <VTextField
    :model-value="props.modelValue"
    :placeholder="props.placeholder"
    :type="props.type"
    :autocomplete="props.autocomplete"
    :error-messages="props.errorMessages"
    :min="props.min"
    :step="props.step"
    variant="outlined"
    density="comfortable"
    color="deep-orange"
    class="auth-input"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template #append-inner>
      <slot name="append-inner" />
    </template>
    <template #prepend-inner>
      <slot name="prepend-inner" />
    </template>
  </VTextField>
</template>
