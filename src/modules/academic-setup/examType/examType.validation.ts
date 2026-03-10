import { z } from "zod";

export const createExamTypeSchema = z.object({
  schoolId: z.string(),
  name: z.string().min(1),
  code: z.string().min(1),
  order: z.number().optional(),
});
