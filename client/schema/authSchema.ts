import z, { refine } from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Show error on the confirmPassword field
  });

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});
