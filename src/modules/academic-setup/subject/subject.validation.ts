import { z } from "zod";

export const createSubjectSchema = z.object({
  schoolId: z.string(),

  name: z.string().min(1),

  code: z.string().min(1),

  classes: z.array(z.number()).optional(),
});
