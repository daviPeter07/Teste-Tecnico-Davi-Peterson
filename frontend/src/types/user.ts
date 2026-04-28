export type User = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  created_at?: string;
  updated_at?: string;
};

export type UserPayload = {
  name: string;
  email: string;
  cpf: string;
  password?: string;
};
