import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          product: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
          quantity: z.number().min(1, "Quantity must be at least 1"),
        })
      )
      .min(1, "At least one product is required"),
    deliveryAddress: z.string().min(5, "Address is too short"),
    paymentMethod: z.enum(["COD", "SSLCommerz"]).optional(),
    deliveryZone: z.enum(["inside-dhaka", "outside-dhaka"]),
    guestInfo: z.object({
      name: z.string("guest name is required"),
      email: z.string().email().optional(),
      phone: z.number().min(11).max(11),
    }),
  }),
});
