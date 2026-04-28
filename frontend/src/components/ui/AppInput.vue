<script setup lang="ts">
import AppLabel from "@/components/ui/AppLabel.vue";

type Props = {
  modelValue?: unknown;
  placeholder?: string;
  label?: string;
  type?: string;
  autocomplete?: string;
  inputmode?: string;
  errorMessages?: string | string[];
  min?: string | number;
  step?: string | number;
  prefix?: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: "",
  label: "",
  type: "text",
  autocomplete: "off",
  inputmode: undefined,
  errorMessages: "",
  min: undefined,
  step: undefined,
  prefix: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: unknown];
}>();
</script>

<template>
  <div>
    <AppLabel v-if="props.label" :text="props.label" class="mb-2" />
    <VTextField
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      :type="props.type"
      :autocomplete="props.autocomplete"
      :inputmode="props.inputmode"
      :error-messages="props.errorMessages"
      :min="props.min"
      :step="props.step"
      :prefix="props.prefix"
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
  </div>
</template>
