"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stipendBeneficiarySchema = exports.promoteSchema = exports.updateStatusSchema = exports.createStudentSchema = exports.localizedString = void 0;
const zod_1 = require("zod");
/**
 * 🌐 Localized text
 */
exports.localizedString = zod_1.z.record(zod_1.z.string().min(1));
/**
 * 👨‍👩‍👦 Parent (Father / Mother)
 */
const parentSchema = zod_1.z.object({
    name: exports.localizedString,
    mobile: zod_1.z.string().min(6),
    nid: zod_1.z.string().min(5),
    birthRegistration: zod_1.z.string().min(10),
});
/**
 * 👤 Guardian (optional)
 */
const guardianSchema = zod_1.z.object({
    relation: zod_1.z.enum(["guardian", "other"]),
    name: exports.localizedString,
    mobile: zod_1.z.string().min(6),
    nid: zod_1.z.string().optional(),
    walletProvider: zod_1.z.enum(["bKash", "Nagad", "Rocket", "Other"]),
});
/**
 * 🎓 Create Student
 */
exports.createStudentSchema = zod_1.z.object({
    studentUid: zod_1.z.string().min(3),
    name: exports.localizedString,
    gender: zod_1.z.enum(["male", "female", "other"]),
    religion: zod_1.z.string(),
    birthDate: zod_1.z.string(), // ISO string, convert later
    birthRegistration: zod_1.z.string(),
    languagePreference: zod_1.z.enum(["bn", "en"]).optional(),
    father: parentSchema,
    mother: parentSchema,
    guardians: zod_1.z.array(guardianSchema).optional(),
    imageUrl: zod_1.z.string().url().optional(),
    current: zod_1.z.object({
        session: zod_1.z.string(),
        class: zod_1.z.number().int().positive(),
        roll: zod_1.z.number().int().positive(),
    }),
});
/**
 * 🔄 Update Status
 */
exports.updateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["active", "repeat", "passed", "transferred", "archived"]),
});
/**
 * 📈 Promotion
 */
exports.promoteSchema = zod_1.z.object({
    session: zod_1.z.string(),
    fromClass: zod_1.z.number().int().positive(),
    toClass: zod_1.z.number().int().positive(),
    result: zod_1.z.enum(["promoted", "repeat"]),
    previousRoll: zod_1.z.number().int().optional(),
    newRoll: zod_1.z.number().int().optional(),
});
/**
 * 💰 Stipend Beneficiary
 */
exports.stipendBeneficiarySchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    mobile: zod_1.z.string().min(6),
    relation: zod_1.z.enum(["father", "mother", "guardian", "other"]),
    paymentMethod: zod_1.z.enum(["mobile_banking", "bank", "cash"]),
    walletProvider: zod_1.z.enum(["bKash", "Nagad", "Rocket", "Other"]),
});
//# sourceMappingURL=student.validation.js.map