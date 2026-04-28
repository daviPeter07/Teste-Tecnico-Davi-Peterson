<script setup lang="ts">
import { computed } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import AppInput from "@/components/ui/AppInput.vue";
import {
  createUserSchema,
  updateUserSchema,
} from "@/schemas/users/user.schema";
import type { UpdateUserSchemaOutput } from "@/schemas/users/user.schema";
import type { CreateUserPayload, User } from "@/types/user";
import { formatCpf, onlyDigits } from "@/utils/cpf";

type Props = {
  initialUser?: User | null;
};

const props = withDefaults(defineProps<Props>(), {
  initialUser: null,
});

const emit = defineEmits<{
  submit: [payload: CreateUserPayload | UpdateUserSchemaOutput];
}>();

const isEditMode = computed(() => Boolean(props.initialUser));
const validationSchema = computed(() =>
  toTypedSchema(isEditMode.value ? updateUserSchema : createUserSchema),
);

const { errors, defineField, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    name: props.initialUser?.name ?? "",
    cpf: props.initialUser?.cpf ?? "",
    email: props.initialUser?.email ?? "",
    password: "",
  },
});

const [name] = defineField("name");
const [cpf] = defineField("cpf");
const [email] = defineField("email");
const [password] = defineField("password");

const cpfMasked = computed({
  get: () => formatCpf(cpf.value ?? ""),
  set: (value: string) => {
    cpf.value = onlyDigits(value).slice(0, 11);
  },
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
});

defineExpose({ onSubmit, isEditMode });
</script>

<template>
  <form class="grid gap-4 md:grid-cols-2" @submit.prevent="onSubmit">
    <AppInput v-model="name" placeholder="Nome" :error-messages="errors.name" />
    <AppInput
      v-model="cpfMasked"
      placeholder="000.000.000-00"
      :error-messages="errors.cpf"
    />
    <AppInput
      v-model="email"
      placeholder="E-mail"
      :error-messages="errors.email"
      class="md:col-span-2"
    />
    <AppInput
      v-model="password"
      :placeholder="isEditMode ? 'Nova senha' : 'Senha'"
      type="password"
      class="md:col-span-2"
      :error-messages="errors.password"
    />
  </form>
</template>
