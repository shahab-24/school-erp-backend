import { z } from "zod";

const scaleItem = z.object({
  min: z.number().min(0).max(100),
  label: z.string().min(1),
  point: z.number().min(0).max(5).optional(),
});

export const createGradingSchema = z.object({
  type: z.enum(["percentage", "gpa"]),

  scale: z
    .array(scaleItem)
    .min(1)
    .refine(
      (arr) => arr.every((v, i) => (i === 0 ? true : v.min < arr[i - 1].min)),
      "Scale must be sorted descending (90 → 80 → 70)"
    ),
});
