import { z } from "zod";

const componentSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  totalMarks: z.number().positive(),
  required: z.boolean().optional().default(true),
});

export const createMarkStructureSchema = z.object({
  name: z.string().min(1).max(100),

  components: z
    .array(componentSchema)
    .min(1)
    .refine(
      (arr) => new Set(arr.map((c) => c.key)).size === arr.length,
      "Duplicate component key not allowed"
    ),
});

export const updateMarkStructureSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  components: z.array(componentSchema).optional(),
});
