export type User = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  created_at?: string;
  updated_at?: string;
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
