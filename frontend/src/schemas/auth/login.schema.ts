import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe sua senha."),
  device_name: z
    .string()
    .min(3, "Informe o nome do dispositivo.")
    .max(255, "Nome do dispositivo muito grande."),
});

export type LoginSchemaInput = z.input<typeof loginSchema>;
export type LoginSchemaOutput = z.output<typeof loginSchema>;
