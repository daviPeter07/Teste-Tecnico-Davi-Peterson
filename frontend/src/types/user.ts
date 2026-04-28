import type { Product } from "@/types/product";

export type User = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  created_at?: string;
  updated_at?: string;
  products?: Product[];
};

export type CreateUserPayload = {
  name: string;
  email: string;
  cpf: string;
  password: string;
};

export type UpdateUserPayload = {
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
};
