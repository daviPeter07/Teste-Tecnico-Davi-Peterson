import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  loginRequest,
  logoutRequest,
  meRequest,
  registerRequest,
} from "../services/auth";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types/auth";

const TOKEN_STORAGE_KEY = "auth_token";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
  const user = ref<AuthUser | null>(null);
  const isBootstrapped = ref(false);

  const isAuthenticated = computed(() => Boolean(token.value));

  function setToken(nextToken: string | null): void {
    token.value = nextToken;

    if (nextToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
      return;
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  function clearSession(): void {
    setToken(null);
    user.value = null;
  }

  async function login(payload: LoginPayload): Promise<void> {
    const response = await loginRequest(payload);
    setToken(response.token);
    user.value = response.data;
  }

  async function register(payload: RegisterPayload): Promise<void> {
    await registerRequest(payload);
  }

  async function fetchMe(): Promise<void> {
    const response = await meRequest();
    user.value = response.data;
  }

  async function logout(): Promise<void> {
    try {
      if (token.value) {
        await logoutRequest();
      }
    } finally {
      clearSession();
    }
  }

  async function bootstrap(): Promise<void> {
    if (isBootstrapped.value) {
      return;
    }

    if (!token.value) {
      isBootstrapped.value = true;
      return;
    }

    try {
      await fetchMe();
    } catch {
      clearSession();
    } finally {
      isBootstrapped.value = true;
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    isBootstrapped,
    setToken,
    clearSession,
    login,
    register,
    fetchMe,
    logout,
    bootstrap,
  };
});
