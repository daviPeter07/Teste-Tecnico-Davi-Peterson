<script setup lang="ts">
import AppLabel from "@/components/ui/AppLabel.vue";

type Props = {
  modelValue?: unknown;
  label?: string;
  placeholder?: string;
  rows?: string | number;
  errorMessages?: string | string[];
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: "",
  placeholder: "",
  rows: 4,
  errorMessages: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: unknown];
}>();
</script>

<template>
  <div>
    <AppLabel v-if="props.label" :text="props.label" class="mb-2" />
    <VTextarea
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      :rows="props.rows"
      :error-messages="props.errorMessages"
      variant="outlined"
      density="comfortable"
      color="deep-orange"
      class="auth-textarea"
      auto-grow
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>
