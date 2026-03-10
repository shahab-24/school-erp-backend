import { z } from "zod";

export const publishSnapshotSchema = z
  .object({
    schoolId: z.string().min(1),

    scope: z.enum(["terminal", "annual"]),

    terminalKey: z.string().optional(),

    session: z.string().min(1),

    class: z.number().int().positive(),

    resultConfigId: z.string().min(1),

    results: z.array(
      z.object({
        studentId: z.string().min(1),

        academicRecordId: z.string().min(1),

        subjects: z.array(
          z.object({
            subjectId: z.string(),

            normalized: z.record(z.number()),

            final: z.number(),

            failed: z.boolean().optional(),
          })
        ),

        total: z.number(),

        percentage: z.number(),

        failed: z.boolean(),
      })
    ),
  })
  .refine((data) => data.scope === "annual" || data.terminalKey, {
    message: "terminalKey required when scope=terminal",
  });
