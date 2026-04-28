<script setup lang="ts">
import { useAttrs } from "vue";
import AppLabel from "@/components/ui/AppLabel.vue";

type Props = {
  modelValue?: unknown;
  search?: string;
  items?: unknown[];
  itemTitle?: string;
  itemValue?: string;
  label?: string;
  placeholder?: string;
  errorMessages?: string | string[];
  hideNoData?: boolean;
  clearable?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  search: "",
  items: () => [],
  itemTitle: "title",
  itemValue: "value",
  label: "",
  placeholder: "",
  errorMessages: "",
  hideNoData: false,
  clearable: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: unknown];
  "update:search": [value: string];
}>();

const attrs = useAttrs();
</script>

<template>
  <div>
    <AppLabel v-if="props.label" :text="props.label" class="mb-2" />
    <VAutocomplete
      :model-value="props.modelValue"
      :search="props.search"
      :items="props.items"
      :item-title="props.itemTitle"
      :item-value="props.itemValue"
      :placeholder="props.placeholder"
      :error-messages="props.errorMessages"
      :hide-no-data="props.hideNoData"
      :clearable="props.clearable"
      variant="outlined"
      density="comfortable"
      color="deep-orange"
      class="auth-input"
      v-bind="attrs"
      @update:model-value="emit('update:modelValue', $event)"
      @update:search="emit('update:search', $event)"
    />
  </div>
</template>