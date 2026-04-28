import { api } from "@/services/api";
import type { PaginatedMeta } from "@/types/api";
import type { CreateUserPayload, UpdateUserPayload, User } from "@/types/user";

type ResourceResponse<T> = { data: T };
type PaginatedUserResponse = { data: User[]; meta?: PaginatedMeta };

const unwrapUser = (payload: User | ResourceResponse<User>) => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }

  return payload as User;
};

export const listUsersRequest = async (params: Record<string, string | number>) => {
  const { data } = await api.get<PaginatedUserResponse>("/users", { params });
  return data;
};

export const createUserRequest = async (payload: CreateUserPayload) => {
  const { data } = await api.post<User | ResourceResponse<User>>("/users", payload);
  return unwrapUser(data);
};

export const updateUserRequest = async (userId: number, payload: UpdateUserPayload) => {
  const { data } = await api.put<User | ResourceResponse<User>>(`/users/${userId}`, payload);
  return unwrapUser(data);
};

export const deleteUserRequest = async (userId: number) => {
  await api.delete(`/users/${userId}`);
};
