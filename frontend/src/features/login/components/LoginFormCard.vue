<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Laptop, LockKeyhole, Mail } from "lucide-vue-next";
import { useApiError } from "@/composables/useApiError";
import { loginSchema } from "@/schemas/auth/login.schema";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { getApiErrorMessage } = useApiError();

const requestError = ref("");

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
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
      "Nao foi possivel realizar login.",
    );
  }
});
</script>

<template>
  <section
    class="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm md:p-8"
  >
    <div class="mb-6">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
        Acesso
      </p>
      <h1 class="mt-2 text-3xl font-semibold text-zinc-950">Entrar</h1>
      <p class="mt-2 text-sm text-zinc-600">
        Use suas credenciais para acessar o painel.
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="onSubmit">
      <VTextField
        v-model="email"
        label="E-mail"
        type="email"
        variant="outlined"
        color="deep-orange"
        autocomplete="email"
        :error-messages="errors.email"
      >
        <template #prepend-inner>
          <Mail :size="17" class="text-zinc-500" />
        </template>
      </VTextField>

      <VTextField
        v-model="password"
        label="Senha"
        type="password"
        variant="outlined"
        color="deep-orange"
        autocomplete="current-password"
        :error-messages="errors.password"
      >
        <template #prepend-inner>
          <LockKeyhole :size="17" class="text-zinc-500" />
        </template>
      </VTextField>

      <VTextField
        v-model="deviceName"
        label="Nome do dispositivo"
        variant="outlined"
        color="deep-orange"
        autocomplete="off"
        :error-messages="errors.device_name"
      >
        <template #prepend-inner>
          <Laptop :size="17" class="text-zinc-500" />
        </template>
      </VTextField>

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
        size="large"
        color="deep-orange"
        :loading="isSubmitting"
      >
        Entrar
      </VBtn>

      <p class="text-center text-sm text-zinc-600">
        Nao tem conta?
        <RouterLink
          class="font-medium text-orange-600 hover:text-orange-700"
          to="/register"
        >
          Criar cadastro
        </RouterLink>
      </p>
    </form>
  </section>
</template>
