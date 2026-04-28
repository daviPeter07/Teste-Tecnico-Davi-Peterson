<template>
  <VCard rounded="xl" elevation="8" class="auth-surface mx-auto w-full max-w-5xl overflow-hidden">
    <VRow no-gutters>
      <VCol cols="12" md="5" class="auth-accent text-white">
        <div class="flex h-full flex-col justify-between p-8">
          <div>
            <div class="mb-8 text-sm font-medium text-slate-300">SYSTOCK</div>
            <h2 class="mb-2 text-3xl font-semibold">Crie sua conta</h2>
            <p class="text-sm text-slate-300">
              Faça seu cadastro para acessar o painel e administrar seus dados.
            </p>
          </div>
          <p class="text-xs text-slate-400">snips-login-forms-03 style</p>
        </div>
      </VCol>

      <VCol cols="12" md="7">
        <div class="p-8 md:p-10">
          <h1 class="mb-1 text-3xl font-semibold text-slate-900">Cadastro</h1>
          <p class="mb-6 text-sm text-slate-500">Preencha seus dados para criar a conta.</p>

          <form class="space-y-4" @submit.prevent="onSubmit">
        <VTextField
          v-model="name"
          label="Nome"
          autocomplete="name"
          variant="outlined"
          density="comfortable"
          color="deep-orange"
          :error-messages="errors.name"
          prepend-inner-icon="mdi-account-outline"
        />

        <VTextField
          v-model="cpf"
          label="CPF"
          autocomplete="off"
          variant="outlined"
          density="comfortable"
          color="deep-orange"
          :error-messages="errors.cpf"
          prepend-inner-icon="mdi-card-account-details-outline"
        />

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
          autocomplete="new-password"
          variant="outlined"
          density="comfortable"
          color="deep-orange"
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

        <VBtn type="submit" block color="deep-orange" size="large" :loading="isSubmitting">
          Criar cadastro
        </VBtn>
      </form>

      <div class="mt-6 text-center">
        <RouterLink class="auth-link text-sm" to="/login">
          Já tem conta? Fazer login
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
    name: z.string().min(3, "Informe seu nome."),
    cpf: z
      .string()
      .regex(/^\d{11}$/, "O CPF deve conter 11 números sem pontuação."),
    email: z.string().email("Informe um e-mail válido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  }),
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
    requestError.value = getApiErrorMessage(
      error,
      "Não foi possível concluir o cadastro.",
    );
  }
});
</script>
