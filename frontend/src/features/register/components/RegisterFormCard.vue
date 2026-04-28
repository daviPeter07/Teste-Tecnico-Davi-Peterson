<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Fingerprint, LockKeyhole, Mail, UserRound } from "lucide-vue-next";
import { useApiError } from "@/composables/useApiError";
import { registerSchema } from "@/schemas/auth/register.schema";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { getApiErrorMessage } = useApiError();

const requestError = ref("");

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(registerSchema),
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
    requestError.value = getApiErrorMessage(error, "Nao foi possivel concluir o cadastro.");
  }
});
</script>

<template>
  <section class="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm md:p-8">
    <div class="mb-6">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Cadastro</p>
      <h1 class="mt-2 text-3xl font-semibold text-zinc-950">Criar conta</h1>
      <p class="mt-2 text-sm text-zinc-600">Preencha seus dados para liberar acesso ao painel.</p>
    </div>

    <form class="space-y-4" @submit.prevent="onSubmit">
      <VTextField
        v-model="name"
        label="Nome"
        variant="outlined"
        color="deep-orange"
        autocomplete="name"
        :error-messages="errors.name"
      >
        <template #prepend-inner>
          <UserRound :size="17" class="text-zinc-500" />
        </template>
      </VTextField>

      <VTextField
        v-model="cpf"
        label="CPF"
        variant="outlined"
        color="deep-orange"
        autocomplete="off"
        :error-messages="errors.cpf"
      >
        <template #prepend-inner>
          <Fingerprint :size="17" class="text-zinc-500" />
        </template>
      </VTextField>

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
        autocomplete="new-password"
        :error-messages="errors.password"
      >
        <template #prepend-inner>
          <LockKeyhole :size="17" class="text-zinc-500" />
        </template>
      </VTextField>

      <VAlert v-if="requestError" type="error" variant="tonal" density="comfortable">
        {{ requestError }}
      </VAlert>

      <VBtn type="submit" block size="large" color="deep-orange" :loading="isSubmitting">
        Criar cadastro
      </VBtn>

      <p class="text-center text-sm text-zinc-600">
        Ja tem conta?
        <RouterLink class="font-medium text-orange-600 hover:text-orange-700" to="/login">
          Fazer login
        </RouterLink>
      </p>
    </form>
  </section>
</template>
