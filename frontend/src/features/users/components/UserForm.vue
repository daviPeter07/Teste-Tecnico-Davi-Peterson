<script setup lang="ts">
import { computed } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { createUserSchema } from "@/schemas/users/user.schema";
import type { CreateUserPayload, User } from "@/types/user";

type Props = {
  initialUser?: User | null;
};

const props = withDefaults(defineProps<Props>(), {
  initialUser: null,
});

const emit = defineEmits<{
  submit: [payload: CreateUserPayload];
}>();

const isEditMode = computed(() => Boolean(props.initialUser));

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(createUserSchema),
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

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
});

defineExpose({ onSubmit, isEditMode });
</script>

<template>
  <form class="grid gap-4 md:grid-cols-2" @submit.prevent="onSubmit">
    <VTextField v-model="name" label="Nome" variant="outlined" color="deep-orange" class="auth-input" :error-messages="errors.name" />
    <VTextField v-model="cpf" label="CPF" variant="outlined" color="deep-orange" class="auth-input" :error-messages="errors.cpf" />
    <VTextField v-model="email" label="E-mail" variant="outlined" color="deep-orange" class="auth-input md:col-span-2" :error-messages="errors.email" />
    <VTextField
      v-model="password"
      :label="isEditMode ? 'Nova senha' : 'Senha'"
      type="password"
      variant="outlined"
      color="deep-orange"
      class="auth-input md:col-span-2"
      :error-messages="errors.password"
    />
  </form>
</template>
