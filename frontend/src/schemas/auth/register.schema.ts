import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Informe seu nome."),
  cpf: z
    .string()
    .regex(/^\d{11}$/, "O CPF deve conter 11 números sem pontuação."),
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type RegisterSchemaInput = z.input<typeof registerSchema>;
export type RegisterSchemaOutput = z.output<typeof registerSchema>;
