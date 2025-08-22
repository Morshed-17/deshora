import z, { boolean } from "zod";

export const createCategoryValidationSchema = z.object({
  body: z.object({
    title: z
      .string("Product name is required")
      .min(1, "Title must be at least 1 characters")
      .max(50, "Title cannot be longer than 50 characters"),

    description: z.string().optional(),

    parent: z.string().optional().nullable(),
  }),
});

export const updateUategoryValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title must be at least 1 characters")
      .max(50, "Title cannot be longer than 50 characters")
      .optional(),
    description: z
      .string()
      .max(500, "Description cannot be longer than 500 characters")
      .optional(),

    parent: z.string().optional(),
  }),
});
