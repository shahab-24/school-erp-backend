"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishSnapshotSchema = void 0;
const zod_1 = require("zod");
exports.publishSnapshotSchema = zod_1.z
    .object({
    schoolId: zod_1.z.string().min(1),
    scope: zod_1.z.enum(["terminal", "annual"]),
    terminalKey: zod_1.z.string().optional(),
    session: zod_1.z.string().min(1),
    class: zod_1.z.number().int().positive(),
    resultConfigId: zod_1.z.string().min(1),
    results: zod_1.z.array(zod_1.z.object({
        studentId: zod_1.z.string().min(1),
        academicRecordId: zod_1.z.string().min(1),
        subjects: zod_1.z.array(zod_1.z.object({
            subjectId: zod_1.z.string(),
            normalized: zod_1.z.record(zod_1.z.number()),
            final: zod_1.z.number(),
            failed: zod_1.z.boolean().optional(),
        })),
        total: zod_1.z.number(),
        percentage: zod_1.z.number(),
        failed: zod_1.z.boolean(),
    })),
})
    .refine((data) => data.scope === "annual" || data.terminalKey, {
    message: "terminalKey required when scope=terminal",
});
//# sourceMappingURL=resultSnapshot.validation.js.map