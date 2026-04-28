import { z } from "zod";

export const createProductSchema = z.object({
  user_id: z.coerce.number().int().min(1, "Selecione um usuário."),
  name: z.string().min(2, "Informe o nome do produto."),
  description: z.string().optional(),
  price: z.coerce.number().positive("O preço deve ser maior que zero."),
});

export const updateProductSchema = createProductSchema.partial().extend({
  user_id: z.coerce.number().int().min(1, "Selecione um usuário.").optional(),
  name: z.string().min(2, "Informe o nome do produto.").optional(),
  price: z.coerce.number().positive("O preço deve ser maior que zero.").optional(),
});

export type CreateProductSchemaInput = z.input<typeof createProductSchema>;
export type UpdateProductSchemaInput = z.input<typeof updateProductSchema>;
