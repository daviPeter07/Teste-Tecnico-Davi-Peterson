<script setup lang="ts">
import { computed, ref } from "vue";
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
import AppButton from "@/components/ui/AppButton.vue";
import AppInput from "@/components/ui/AppInput.vue";
import AppLabel from "@/components/ui/AppLabel.vue";
import { useApiError } from "@/composables/useApiError";
import { registerSchema } from "@/schemas/auth/register.schema";
import { useAuthStore } from "@/stores/auth";
import { formatCpf, onlyDigits } from "@/utils/cpf";

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

const cpfMasked = computed({
  get: () => formatCpf(cpf.value ?? ""),
  set: (value: string) => {
    cpf.value = onlyDigits(value).slice(0, 11);
  },
});

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
        <AppLabel text="Nome" :icon="UserRound" />
        <AppInput
          v-model="name"
          aria-label="Nome"
          placeholder="Seu nome completo"
          autocomplete="name"
          :error-messages="errors.name"
        />

        <AppLabel class="mt-1" text="CPF" :icon="Fingerprint" />
        <AppInput
          v-model="cpfMasked"
          aria-label="CPF"
          placeholder="000.000.000-00"
          autocomplete="off"
          :error-messages="errors.cpf"
        />

        <AppLabel class="mt-1" text="E-mail" :icon="Mail" />
        <AppInput
          v-model="email"
          aria-label="E-mail"
          placeholder="voce@empresa.com"
          type="email"
          autocomplete="email"
          :error-messages="errors.email"
        />

        <AppLabel class="mt-1" text="Senha" :icon="LockKeyhole" />
        <AppInput
          v-model="password"
          aria-label="Senha"
          :type="isPasswordVisible ? 'text' : 'password'"
          placeholder="Crie uma senha"
          autocomplete="new-password"
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
        </AppInput>

        <VAlert v-if="requestError" type="error" variant="tonal" density="comfortable">
          {{ requestError }}
        </VAlert>

        <AppButton
          type="submit"
          size="large"
          block
          variant="primary"
          :loading="isSubmitting"
        >
          Criar cadastro
        </AppButton>

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
