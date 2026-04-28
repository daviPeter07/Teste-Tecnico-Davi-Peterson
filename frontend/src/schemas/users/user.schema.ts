import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Informe o nome do usuário."),
  cpf: z.string().regex(/^\d{11}$/, "O CPF deve conter 11 números sem pontuação."),
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const updateUserSchema = createUserSchema.extend({
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres.").optional(),
});

export type CreateUserSchemaInput = z.input<typeof createUserSchema>;
export type UpdateUserSchemaInput = z.input<typeof updateUserSchema>;
