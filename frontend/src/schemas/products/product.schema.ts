import { z } from "zod";

export const createProductSchema = z.object({
  user_id: z.number({ invalid_type_error: "Selecione um usuário." }).int(),
  name: z.string().min(2, "Informe o nome do produto."),
  description: z.string().optional(),
  price: z
    .number({ invalid_type_error: "Informe um preço válido." })
    .positive("O preço deve ser maior que zero."),
});

export const updateProductSchema = createProductSchema.partial().extend({
  user_id: z
    .number({ invalid_type_error: "Selecione um usuário." })
    .int()
    .optional(),
  name: z.string().min(2, "Informe o nome do produto.").optional(),
  price: z
    .number({ invalid_type_error: "Informe um preço válido." })
    .positive("O preço deve ser maior que zero.")
    .optional(),
});

export type CreateProductSchemaInput = z.input<typeof createProductSchema>;
export type UpdateProductSchemaInput = z.input<typeof updateProductSchema>;
