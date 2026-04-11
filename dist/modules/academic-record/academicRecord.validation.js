"use strict";
// // import { z } from "zod";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatusSchema = exports.upsertRecordSchema = void 0;
// // export const marksSchema = z.record(z.record(z.number().min(0)));
// // export const upsertRecordSchema = z
// //   .object({
// //     schoolId: z.string(),
// //     studentId: z.string().min(1),
// //     session: z.string().min(1),
// //     class: z.number().int().positive(),
// //     scope: z.enum(["terminal", "annual"]),
// //     terminalKey: z.string().optional(),
// //     marks: marksSchema,
// //   })
// //   .refine((d) => d.scope === "annual" || d.terminalKey, {
// //     message: "terminalKey required when scope=terminal",
// //   });
// // export const changeStatusSchema = z.object({
// //   action: z.enum(["submit", "unlock", "publish"]),
// // });
// // src/modules/academic-record/academicRecord.validation.ts
// import { z } from "zod";
// export const upsertRecordSchema = z.object({
//   schoolId: z.string().min(1),
//   session: z.string().optional(),
//   class: z.number().optional(),
//   studentId: z.string().min(1, "Student ID required"), // ✅ required
//   scope: z.enum(["terminal", "annual"]).optional(),
//   terminalKey: z.string().optional(),
//   marks: z.record(z.string(), z.record(z.string(), z.number())).optional(),
// });
// export const changeStatusSchema = z.object({
//   action: z.enum(["submit", "unlock", "publish"]),
// });
// export type UpsertDraftPayload = z.infer<typeof upsertRecordSchema>;
// export type ChangeStatusDTO = z.infer<typeof changeStatusSchema>;// src/modules/academic-record/academicRecord.validation.ts
const zod_1 = require("zod");
// ──────────────────────────────────────────────────────────────
// Upsert Draft Schema (সব field required যেখানে প্রয়োজন)
// ──────────────────────────────────────────────────────────────
exports.upsertRecordSchema = zod_1.z.object({
    schoolId: zod_1.z.string().min(1, "School ID required"),
    studentId: zod_1.z.string().min(1, "Student ID required"), // ✅ required
    session: zod_1.z.string().min(1, "Session required"),
    class: zod_1.z.number().min(1, "Class required"),
    scope: zod_1.z.enum(["terminal", "annual"]),
    terminalKey: zod_1.z.string().optional(),
    marks: zod_1.z.record(zod_1.z.string(), zod_1.z.record(zod_1.z.string(), zod_1.z.number())).optional(),
});
// ──────────────────────────────────────────────────────────────
// Change Status Schema
// ──────────────────────────────────────────────────────────────
exports.changeStatusSchema = zod_1.z.object({
    action: zod_1.z.enum(["submit", "unlock", "publish"]),
});
