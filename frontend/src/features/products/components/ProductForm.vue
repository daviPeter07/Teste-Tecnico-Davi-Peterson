<script setup lang="ts">
import { computed, ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import AppAutocomplete from "@/components/ui/AppAutocomplete.vue";
import AppInput from "@/components/ui/AppInput.vue";
import AppTextarea from "@/components/ui/AppTextarea.vue";
import { createProductSchema } from "@/schemas/products/product.schema";
import type { CreateProductPayload, Product } from "@/types/product";
import type { User } from "@/types/user";
import { parseCurrency } from "@/utils/number";

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
const userSearch = ref("");

const priceInput = computed({
  get: () =>
    price.value === undefined || price.value === null
      ? ""
      : String(price.value),
  set: (value: string) => {
    price.value = parseCurrency(value);
  },
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
});

defineExpose({ onSubmit, isEditMode });
</script>

<template>
  <form class="grid gap-4 md:grid-cols-2" @submit.prevent="onSubmit">
    <div class="md:col-span-2">
      <AppAutocomplete
        v-model="userId"
        v-model:search="userSearch"
        label="Usuário"
        placeholder="Pesquise ou selecione um usuário"
        :items="userOptions"
        item-title="title"
        item-value="value"
        hide-no-data
        :error-messages="errors.user_id"
      />
    </div>
    <div>
      <AppInput
        v-model="name"
        label="Nome do produto"
        placeholder="Digite o nome do produto"
        :error-messages="errors.name"
      />
    </div>
    <div>
      <AppInput
        v-model="priceInput"
        label="Preço"
        placeholder="Digite o preço do produto"
        prefix="R$"
        :error-messages="errors.price"
      />
    </div>
    <div class="md:col-span-2">
      <AppTextarea
        v-model="description"
        :label="isEditMode ? 'Descrição do produto (opcional)' : 'Descrição do produto'"
        placeholder="Digite a descrição do produto"
        :error-messages="errors.description"
      />
    </div>
  </form>
</template>
