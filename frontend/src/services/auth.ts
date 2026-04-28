import { api } from "@/services/api";
import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/auth";
import type { ApiMessageResponse } from "@/types/api";

type ResourceResponse<T> = {
  data: T;
};

const unwrapResource = <T>(payload: T | ResourceResponse<T>) => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }

  return payload as T;
};

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await api.post<
    LoginResponse | (Omit<LoginResponse, "user"> & { user: ResourceResponse<AuthUser> })
  >("/login", payload);

  if (data && typeof data === "object" && "user" in data) {
    return {
      ...data,
      user: unwrapResource(data.user),
    };
  }

  return data as LoginResponse;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const { data } = await api.post<AuthUser | ResourceResponse<AuthUser>>(
    "/users",
    payload,
  );
  return unwrapResource(data);
};

export const meRequest = async () => {
  const { data } = await api.get<AuthUser | ResourceResponse<AuthUser>>("/me");
  return unwrapResource(data);
};

export const logoutRequest = async () => {
  const { data } = await api.post<ApiMessageResponse>("/logout");
  return data;
};
