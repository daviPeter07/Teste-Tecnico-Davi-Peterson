export type AuthUser = {
  id: number;
  name: string;
  email: string;
  cpf?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  device_name: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  cpf: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};
