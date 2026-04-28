<script setup lang="ts">
type Props = {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "default" | "large";
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "default",
  block: false,
  loading: false,
  disabled: false,
  type: "button",
  icon: false,
});

const colorByVariant = {
  primary: "deep-orange",
  secondary: "secondary",
  danger: "error",
  ghost: "secondary",
} as const;

const classByVariant = {
  primary:
    "!rounded-xl !px-5 !py-2 !bg-orange-500 !text-white hover:!bg-orange-600",
  secondary: "!rounded-xl !px-4 !py-2",
  danger: "!rounded-xl !px-4 !py-2",
  ghost: "!rounded-xl !px-3 !py-2",
} as const;

const vuetifyVariantByType = {
  primary: "flat",
  secondary: "outlined",
  danger: "outlined",
  ghost: "text",
} as const;

const sizeMap = {
  small: "small",
  default: "default",
  large: "large",
} as const;
</script>

<template>
  <VBtn
    :type="props.type"
    :block="props.block"
    :loading="props.loading"
    :disabled="props.disabled"
    :icon="props.icon"
    :variant="vuetifyVariantByType[props.variant]"
    :color="colorByVariant[props.variant]"
    :size="sizeMap[props.size]"
    :class="classByVariant[props.variant]"
  >
    <slot />
  </VBtn>
</template>
