<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-vue-next";
import { useApiError } from "@/composables/useApiError";
import { registerSchema } from "@/schemas/auth/register.schema";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { getApiErrorMessage } = useApiError();

const requestError = ref("");
const isPasswordVisible = ref(false);

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
    requestError.value = getApiErrorMessage(error, "Não foi possível concluir o cadastro.");
  }
});
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
    <div class="grid md:grid-cols-[0.95fr_1.2fr]">
      <aside class="bg-zinc-950 p-7 text-white md:p-9">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Cadastro</p>
        <h1 class="mt-3 text-3xl font-bold">Crie sua conta</h1>
        <p class="mt-3 text-sm text-zinc-300">Gerencie aqui seus usuários e produtos.</p>
      </aside>

      <form class="space-y-4 p-7 md:p-9" @submit.prevent="onSubmit">
        <div class="mb-1 flex items-center gap-2 text-sm font-medium text-zinc-700">
          <UserRound :size="15" class="text-zinc-500" />
          <span>Nome</span>
        </div>
        <VTextField
          v-model="name"
          aria-label="Nome"
          placeholder="Seu nome completo"
          variant="outlined"
          density="comfortable"
          color="deep-orange"
          autocomplete="name"
          class="auth-input"
          :error-messages="errors.name"
        />

        <div class="mb-1 mt-1 flex items-center gap-2 text-sm font-medium text-zinc-700">
          <Fingerprint :size="15" class="text-zinc-500" />
          <span>CPF</span>
        </div>
        <VTextField
          v-model="cpf"
          aria-label="CPF"
          placeholder="Somente números"
          variant="outlined"
          density="comfortable"
          color="deep-orange"
          autocomplete="off"
          class="auth-input"
          :error-messages="errors.cpf"
        />

        <div class="mb-1 mt-1 flex items-center gap-2 text-sm font-medium text-zinc-700">
          <Mail :size="15" class="text-zinc-500" />
          <span>E-mail</span>
        </div>
        <VTextField
          v-model="email"
          aria-label="E-mail"
          placeholder="voce@empresa.com"
          type="email"
          variant="outlined"
          density="comfortable"
          color="deep-orange"
          autocomplete="email"
          class="auth-input"
          :error-messages="errors.email"
        />

        <div class="mb-1 mt-1 flex items-center gap-2 text-sm font-medium text-zinc-700">
          <LockKeyhole :size="15" class="text-zinc-500" />
          <span>Senha</span>
        </div>
        <VTextField
          v-model="password"
          aria-label="Senha"
          :type="isPasswordVisible ? 'text' : 'password'"
          placeholder="Crie uma senha"
          variant="outlined"
          density="comfortable"
          color="deep-orange"
          autocomplete="new-password"
          class="auth-input"
          :error-messages="errors.password"
        >
          <template #append-inner>
            <button
              type="button"
              class="text-zinc-500 transition hover:text-zinc-800"
              @click="isPasswordVisible = !isPasswordVisible"
            >
              <Eye v-if="!isPasswordVisible" :size="17" />
              <EyeOff v-else :size="17" />
            </button>
          </template>
        </VTextField>

        <VAlert v-if="requestError" type="error" variant="tonal" density="comfortable">
          {{ requestError }}
        </VAlert>

        <VBtn
          type="submit"
          block
          size="large"
          color="deep-orange"
          class="!bg-orange-500 !text-white hover:!bg-orange-600"
          :loading="isSubmitting"
        >
          Criar cadastro
        </VBtn>

        <p class="text-center text-sm text-zinc-600">
          Já tem conta?
          <RouterLink class="font-medium text-orange-600 hover:text-orange-700" to="/login">
            Fazer login
          </RouterLink>
        </p>
      </form>
    </div>
  </section>
</template>
