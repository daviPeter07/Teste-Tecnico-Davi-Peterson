<template>
  <VCard rounded="xl" elevation="8" class="auth-surface mx-auto w-full max-w-5xl overflow-hidden">
    <VRow no-gutters>
      <VCol cols="12" md="5" class="auth-accent text-white">
        <div class="flex h-full flex-col justify-between p-8">
          <div>
            <div class="mb-8 text-sm font-medium text-slate-300">SYSTOCK</div>
            <h2 class="mb-2 text-3xl font-semibold">Bem-vindo de volta</h2>
            <p class="text-sm text-slate-300">
              Acesse sua conta para gerenciar usuários e produtos da plataforma.
            </p>
          </div>
          <p class="text-xs text-slate-400">snips-login-forms-03 style</p>
        </div>
      </VCol>

      <VCol cols="12" md="7">
        <div class="p-8 md:p-10">
          <h1 class="mb-1 text-3xl font-semibold text-slate-900">Entrar</h1>
          <p class="mb-6 text-sm text-slate-500">
            Informe suas credenciais para continuar.
          </p>

          <form class="space-y-4" @submit.prevent="onSubmit">
            <VTextField
              v-model="email"
              label="E-mail"
              type="email"
              autocomplete="email"
              variant="outlined"
              density="comfortable"
              color="deep-orange"
              :error-messages="errors.email"
              prepend-inner-icon="mdi-email-outline"
            />

            <VTextField
              v-model="password"
              label="Senha"
              type="password"
              autocomplete="current-password"
              variant="outlined"
              density="comfortable"
              color="deep-orange"
              :error-messages="errors.password"
              prepend-inner-icon="mdi-lock-outline"
            />

            <VTextField
              v-model="deviceName"
              label="Nome do dispositivo"
              autocomplete="off"
              variant="outlined"
              density="comfortable"
              color="deep-orange"
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

            <VBtn
              type="submit"
              block
              color="deep-orange"
              size="large"
              :loading="isSubmitting"
            >
              Entrar
            </VBtn>
          </form>

          <div class="mt-6 text-center">
            <RouterLink class="auth-link text-sm" to="/register">
              Não tem conta? Criar cadastro
            </RouterLink>
          </div>
        </div>
      </VCol>
    </VRow>
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
  }),
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
    requestError.value = getApiErrorMessage(
      error,
      "Não foi possível realizar login.",
    );
  }
});
</script>
