import { z } from "zod";

export const createExamTypeSchema = z.object({
  name: z.string().min(1).max(100),

  code: z
    .string()
    .min(1)
    .max(20)
    .transform((v) => v.trim().toUpperCase()),

  order: z.number().int().min(0).optional().default(0),
});

export const updateExamTypeSchema = z.object({
  name: z.string().min(1).max(100).optional(),

  code: z
    .string()
    .min(1)
    .max(20)
    .transform((v) => v.trim().toUpperCase())
    .optional(),

  order: z.number().int().min(0).optional(),

  isActive: z.boolean().optional(),
});

export type CreateExamTypeInput = z.infer<typeof createExamTypeSchema>;
export type UpdateExamTypeInput = z.infer<typeof updateExamTypeSchema>;
