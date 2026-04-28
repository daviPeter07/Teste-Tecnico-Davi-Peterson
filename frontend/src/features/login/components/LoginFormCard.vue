<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-vue-next";
import AppButton from "@/components/ui/AppButton.vue";
import AppInput from "@/components/ui/AppInput.vue";
import AppLabel from "@/components/ui/AppLabel.vue";
import { useApiError } from "@/composables/useApiError";
import { loginSchema } from "@/schemas/auth/login.schema";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { getApiErrorMessage } = useApiError();

const requestError = ref("");
const isPasswordVisible = ref(false);

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: "",
    password: "",
    device_name: "interview-browser",
  },
});

const [email] = defineField("email");
const [password] = defineField("password");

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

<template>
  <section
    class="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
  >
    <div class="grid md:grid-cols-[0.95fr_1.2fr]">
      <aside class="bg-zinc-950 p-7 text-white md:p-9">
        <p
          class="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400"
        >
          Acesso
        </p>
        <h1 class="mt-3 text-3xl font-bold">Bem-vindo de volta</h1>
        <p class="mt-3 text-sm text-zinc-300">
          Gerencie aqui seus usuários e produtos.
        </p>
      </aside>

      <form class="space-y-4 p-7 md:p-9" @submit.prevent="onSubmit">
        <AppLabel text="E-mail" :icon="Mail" />
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
          placeholder="Digite sua senha"
          autocomplete="current-password"
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

        <VAlert
          v-if="requestError"
          type="error"
          variant="tonal"
          density="comfortable"
        >
          {{ requestError }}
        </VAlert>

        <AppButton
          type="submit"
          size="large"
          block
          variant="primary"
          :loading="isSubmitting"
        >
          Entrar
        </AppButton>

        <p class="text-center text-sm text-zinc-600">
          Não tem conta?
          <RouterLink
            class="font-medium text-orange-600 hover:text-orange-700"
            to="/register"
          >
            Criar cadastro
          </RouterLink>
        </p>
      </form>
    </div>
  </section>
</template>
