import { z } from "zod";

const registerValidationSchema = z.object({
  body: z.object({
    name: z
      .string("Name is required")
      .min(2, "Name must be atleast 2 characters"),
    email: z.string("Email is required").email({ message: "Invalid email" }),
    password: z
      .string("Password is required")
      .min(6, "Password must be atleast 6 characters"),

    role: z.enum(["admin", "user"]).default("user"),
    isActive: z.boolean().default(true),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string("Email is required").email({ message: "Invalid email" }),
    password: z
      .string("Password is required")
      .min(6, "Password must be atleast 6 characters"),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
};
