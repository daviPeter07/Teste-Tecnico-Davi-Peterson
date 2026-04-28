import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  loginRequest,
  logoutRequest,
  meRequest,
  registerRequest,
} from "@/services/auth";
import type { AuthUser } from "@/types/auth";
import type { LoginPayload, RegisterPayload } from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("auth_token"));
  const user = ref<AuthUser | null>(null);
  const isBootstrapped = ref(false);

  const isAuthenticated = computed(() => Boolean(token.value));

  const setToken = (nextToken: string | null) => {
    token.value = nextToken;

    if (nextToken) {
      localStorage.setItem("auth_token", nextToken);
      return;
    }

    localStorage.removeItem("auth_token");
  };

  const setUser = (nextUser: AuthUser | null) => {
    user.value = nextUser;
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
  };

  const login = async (payload: LoginPayload) => {
    const response = await loginRequest(payload);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const register = async (payload: RegisterPayload) => {
    const response = await registerRequest(payload);
    return response;
  };

  const fetchMe = async () => {
    const nextUser = await meRequest();
    setUser(nextUser);
    return nextUser;
  };

  const logout = async () => {
    if (token.value) {
      await logoutRequest();
    }

    clearSession();
  };

  const bootstrap = async () => {
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
  };

  return {
    token,
    user,
    isBootstrapped,
    isAuthenticated,
    setToken,
    setUser,
    clearSession,
    login,
    register,
    fetchMe,
    logout,
    bootstrap,
  };
});
