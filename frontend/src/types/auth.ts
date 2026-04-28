export interface AuthUser {
  id: number;
  name: string;
  cpf: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  device_name: string;
}

export interface RegisterPayload {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  token_type: string;
  data: AuthUser;
}

export interface MeResponse {
  message: string;
  data: AuthUser;
}
