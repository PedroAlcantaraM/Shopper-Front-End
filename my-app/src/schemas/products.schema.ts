import { z } from "zod";

export const productsErrorSchema = z.object({
  message: z.string(),
  hasError: z.boolean(),
});
export const productsSchemaFileData = z.object({
  code: z.number(),
  name: z.string(),
  sales_price: z.number(),
  new_price: z.number(),
  error: productsErrorSchema,
});

export type ProductsFileData = z.infer<typeof productsSchemaFileData>;
