import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(1).max(100),

  code: z
    .string()
    .min(1)
    .max(20)
    .transform((v) => v.toUpperCase()),

  classes: z.array(z.number()).optional().default([]),

  isOptional: z.boolean().optional().default(false),
});
