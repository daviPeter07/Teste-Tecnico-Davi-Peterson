<template>
  <VCard rounded="xl" elevation="6" class="mx-auto w-full max-w-md">
    <VCardTitle class="pt-6 text-h6">Entrar na plataforma</VCardTitle>
    <VCardText>
      <form class="space-y-4" @submit.prevent="onSubmit">
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
          autocomplete="current-password"
          :error-messages="errors.password"
          prepend-inner-icon="mdi-lock-outline"
        />

        <VTextField
          v-model="deviceName"
          label="Nome do dispositivo"
          autocomplete="off"
          :error-messages="errors.device_name"
          prepend-inner-icon="mdi-cellphone-link"
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
          Entrar
        </VBtn>
      </form>
    </VCardText>

    <VDivider />
    <VCardActions class="justify-center py-4">
      <RouterLink class="text-sm text-blue-700" to="/register">
        Não tem conta? Criar cadastro
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
    email: z.string().email("Informe um e-mail válido."),
    password: z.string().min(1, "Informe sua senha."),
    device_name: z
      .string()
      .min(3, "Informe o nome do dispositivo.")
      .max(255, "Nome do dispositivo muito grande."),
  })
);

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    password: "",
    device_name: "web-browser",
  },
});

const [email] = defineField("email");
const [password] = defineField("password");
const [deviceName] = defineField("device_name");

const onSubmit = handleSubmit(async (values) => {
  requestError.value = "";

  try {
    await authStore.login(values);
    await router.push({ name: "dashboard-users" });
  } catch (error) {
    requestError.value = getApiErrorMessage(error, "Não foi possível realizar login.");
  }
});
</script>
