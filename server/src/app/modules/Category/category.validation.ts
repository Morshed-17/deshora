import z, { boolean } from "zod";

export const createCategoryValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Product description is required"),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const updateUategoryValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
