// src/modules/auth/auth.validation.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long"),
});

export type LoginInput = z.infer<typeof loginSchema>;
