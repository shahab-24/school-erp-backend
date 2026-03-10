import { z } from "zod";

export const createGradingSchema = z.object({
  schoolId: z.string(),

  type: z.enum(["percentage", "gpa"]),

  scale: z.array(
    z.object({
      min: z.number(),
      label: z.string(),
      point: z.number().optional(),
    })
  ),
});
