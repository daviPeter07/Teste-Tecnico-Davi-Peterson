import { computed, ref } from "vue";
import { defineStore } from "pinia";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("auth_token"));
  const user = ref<AuthUser | null>(null);

  const isAuthenticated = computed(() => Boolean(token.value));

  function setToken(nextToken: string | null) {
    token.value = nextToken;

    if (nextToken) {
      localStorage.setItem("auth_token", nextToken);
      return;
    }

    localStorage.removeItem("auth_token");
  }

  function setUser(nextUser: AuthUser | null) {
    user.value = nextUser;
  }

  function clearSession() {
    setToken(null);
    setUser(null);
  }

  return {
    token,
    user,
    isAuthenticated,
    setToken,
    setUser,
    clearSession,
  };
});
