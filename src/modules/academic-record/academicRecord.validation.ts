import { z } from "zod";

export const marksSchema = z.record(z.record(z.number().min(0)));

export const upsertRecordSchema = z
  .object({
    schoolId: z.string(),

    studentId: z.string().min(1),

    session: z.string().min(1),

    class: z.number().int().positive(),

    scope: z.enum(["terminal", "annual"]),

    terminalKey: z.string().optional(),

    marks: marksSchema,
  })
  .refine((d) => d.scope === "annual" || d.terminalKey, {
    message: "terminalKey required when scope=terminal",
  });

export const changeStatusSchema = z.object({
  action: z.enum(["submit", "unlock", "publish"]),
});
