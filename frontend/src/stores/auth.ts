import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { AuthUser } from "../types/auth";

const TOKEN_STORAGE_KEY = "auth_token";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
  const user = ref<AuthUser | null>(null);

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

  return {
    token,
    user,
    isAuthenticated,
    setToken,
    clearSession,
  };
});
