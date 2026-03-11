import { z } from "zod";

const componentSchema = z.object({
  key: z.string().min(1, "Key required"),
  label: z.string().min(1, "Label required"),
  totalMarks: z.number().positive("Must be positive"),
  required: z.boolean().optional().default(true),
});

export const createMarkStructureSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  components: z
    .array(componentSchema)
    .min(1, "At least one component required"),
});

export const updateMarkStructureSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  components: z.array(componentSchema).min(1).optional(),
});

export type CreateMarkStructureInput = z.infer<
  typeof createMarkStructureSchema
>;
export type UpdateMarkStructureInput = z.infer<
  typeof updateMarkStructureSchema
>;
