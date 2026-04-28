import { z } from "zod";

const hasOnlyDigits = (value: string) =>
  value.split("").every((char) => char >= "0" && char <= "9");

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Informe o nome do usuário." })
    .max(255, { error: "O nome deve ter no máximo 255 caracteres." }),
  cpf: z
    .string()
    .length(11, { error: "O CPF deve conter 11 números." })
    .refine(hasOnlyDigits, { error: "O CPF deve conter apenas números." }),
  email: z.email({ error: "Informe um e-mail válido." }).max(255, {
    error: "O e-mail deve ter no máximo 255 caracteres.",
  }),
  password: z
    .string()
    .min(6, { error: "A senha deve ter no mínimo 6 caracteres." }),
});

export const updateUserSchema = createUserSchema.extend({
  password: z
    .string()
    .min(6, { error: "A senha deve ter no mínimo 6 caracteres." })
    .optional(),
});

export type CreateUserSchemaInput = z.input<typeof createUserSchema>;
export type UpdateUserSchemaInput = z.input<typeof updateUserSchema>;
