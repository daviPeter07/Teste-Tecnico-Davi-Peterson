<script setup lang="ts">
import { computed } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import AppInput from "@/components/ui/AppInput.vue";
import { createProductSchema } from "@/schemas/products/product.schema";
import type { CreateProductPayload, Product } from "@/types/product";
import type { User } from "@/types/user";

type UserOption = {
  title: string;
  value: number;
};

type Props = {
  initialProduct?: Product | null;
  users: User[];
};

const props = withDefaults(defineProps<Props>(), {
  initialProduct: null,
});

const emit = defineEmits<{
  submit: [payload: CreateProductPayload];
}>();

const isEditMode = computed(() => Boolean(props.initialProduct));

const userOptions = computed<UserOption[]>(() => {
  return props.users.map((user) => ({
    title: user.name,
    value: user.id,
  }));
});

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(createProductSchema),
  initialValues: {
    user_id: props.initialProduct?.user_id ?? undefined,
    name: props.initialProduct?.name ?? "",
    description: props.initialProduct?.description ?? "",
    price: props.initialProduct?.price ?? 0,
  },
});

const [userId] = defineField("user_id");
const [name] = defineField("name");
const [description] = defineField("description");
const [price] = defineField("price");

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
});

defineExpose({ onSubmit, isEditMode });
</script>

<template>
  <form class="grid gap-4 md:grid-cols-2" @submit.prevent="onSubmit">
    <VSelect
      v-model="userId"
      label="Usuário"
      variant="outlined"
      color="deep-orange"
      class="auth-input"
      :items="userOptions"
      item-title="title"
      item-value="value"
      :error-messages="errors.user_id"
    />
    <AppInput
      v-model="name"
      placeholder="Nome"
      :error-messages="errors.name"
    />
    <AppInput
      v-model.number="price"
      placeholder="Preço"
      type="number"
      min="0"
      step="0.01"
      :error-messages="errors.price"
    />
    <VTextarea
      v-model="description"
      :label="isEditMode ? 'Descrição (opcional)' : 'Descrição'"
      rows="3"
      variant="outlined"
      color="deep-orange"
      class="auth-input md:col-span-2"
      :error-messages="errors.description"
    />
  </form>
</template>
