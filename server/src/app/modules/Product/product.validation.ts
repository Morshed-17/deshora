import z from "zod";

export const productValidationShema = z.object({
  body: z.object({
    categoryId: z.string("Category ID is required"),
    title: z.string().min(1, "Product name is required"),
    color: z.string().optional(),
    description: z.string().optional(),

    price: z.preprocess((val) => {
      if (typeof val === "string") {
        return Number(val);
      }
      return val; // if it's already a number or something else
    }, z.number().positive("Price must be positive number")),

    sizesAvailable: z
      .object({
        size: z.string(),
        stock: z.number().default(0),
      })
      .array()
      .optional(),
  }),
});
