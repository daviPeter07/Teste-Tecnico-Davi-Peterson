import { api } from "@/services/api";
import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/auth";
import type { ApiMessageResponse } from "@/types/api";

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await api.post<LoginResponse>("/login", payload);
  return data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const { data } = await api.post<AuthUser>("/users", payload);
  return data;
};

export const meRequest = async () => {
  const { data } = await api.get<AuthUser>("/me");
  return data;
};

export const logoutRequest = async () => {
  const { data } = await api.post<ApiMessageResponse>("/logout");
  return data;
};
