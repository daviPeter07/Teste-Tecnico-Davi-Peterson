import { api } from "./api";
import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
  RegisterPayload,
} from "../types/auth";

export async function loginRequest(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/login", payload);
  return data;
}

export async function registerRequest(
  payload: RegisterPayload,
): Promise<MeResponse> {
  const { data } = await api.post<MeResponse>("/api/users", payload);
  return data;
}

export async function meRequest(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>("/api/me");
  return data;
}

export async function logoutRequest(): Promise<void> {
  await api.post("/api/logout");
}
