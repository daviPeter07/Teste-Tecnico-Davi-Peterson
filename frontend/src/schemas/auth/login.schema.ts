import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Informe um e-mail válido." }).max(255, {
    error: "O e-mail deve ter no máximo 255 caracteres.",
  }),
  password: z.string().min(1, { error: "Informe sua senha." }),
  device_name: z
    .string()
    .min(1, { error: "Informe o nome do dispositivo." })
    .max(255, { error: "Nome do dispositivo muito grande." }),
});

export type LoginSchemaInput = z.input<typeof loginSchema>;
export type LoginSchemaOutput = z.output<typeof loginSchema>;
