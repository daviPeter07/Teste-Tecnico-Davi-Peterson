<template>
  <VCard rounded="xl" elevation="6" class="mx-auto w-full max-w-md">
    <VCardTitle class="pt-6 text-h6">Criar conta</VCardTitle>
    <VCardText>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <VTextField
          v-model="name"
          label="Nome"
          autocomplete="name"
          :error-messages="errors.name"
          prepend-inner-icon="mdi-account-outline"
        />

        <VTextField
          v-model="cpf"
          label="CPF"
          autocomplete="off"
          :error-messages="errors.cpf"
          prepend-inner-icon="mdi-card-account-details-outline"
        />

        <VTextField
          v-model="email"
          label="E-mail"
          type="email"
          autocomplete="email"
          :error-messages="errors.email"
          prepend-inner-icon="mdi-email-outline"
        />

        <VTextField
          v-model="password"
          label="Senha"
          type="password"
          autocomplete="new-password"
          :error-messages="errors.password"
          prepend-inner-icon="mdi-lock-outline"
        />

        <VAlert
          v-if="requestError"
          type="error"
          variant="tonal"
          density="comfortable"
        >
          {{ requestError }}
        </VAlert>

        <VBtn type="submit" block color="primary" :loading="isSubmitting">
          Criar cadastro
        </VBtn>
      </form>
    </VCardText>

    <VDivider />
    <VCardActions class="justify-center py-4">
      <RouterLink class="text-sm text-blue-700" to="/login">
        Já tem conta? Fazer login
      </RouterLink>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useAuthStore } from "../../stores/auth";
import { useApiError } from "../../composables/useApiError";

const router = useRouter();
const authStore = useAuthStore();
const { getApiErrorMessage } = useApiError();

const requestError = ref("");

const schema = toTypedSchema(
  z.object({
    name: z.string().min(3, "Informe seu nome."),
    cpf: z
      .string()
      .regex(/^\d{11}$/, "O CPF deve conter 11 números sem pontuação."),
    email: z.string().email("Informe um e-mail válido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  })
);

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    cpf: "",
    email: "",
    password: "",
  },
});

const [name] = defineField("name");
const [cpf] = defineField("cpf");
const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  requestError.value = "";

  try {
    await authStore.register(values);
    await router.push({ name: "login" });
  } catch (error) {
    requestError.value = getApiErrorMessage(error, "Não foi possível concluir o cadastro.");
  }
});
</script>
