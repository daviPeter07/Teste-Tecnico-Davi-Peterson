import { createUserSchema } from "@/schemas/users/user.schema";
import z from "zod";

export const registerSchema = createUserSchema;

export type RegisterSchemaInput = z.input<typeof registerSchema>;
export type RegisterSchemaOutput = z.output<typeof registerSchema>;
