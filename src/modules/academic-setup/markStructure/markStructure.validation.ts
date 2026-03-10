import { z } from "zod";

export const createMarkStructureSchema = z.object({
  schoolId: z.string(),

  name: z.string(),

  components: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      totalMarks: z.number(),
      required: z.boolean().optional(),
    })
  ),
});
