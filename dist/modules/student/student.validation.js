"use strict";
// import { z } from "zod";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploadSchema = exports.bulkPromoteSchema = exports.listQuerySchema = exports.stipendBeneficiarySchema = exports.promoteSchema = exports.updateStatusSchema = exports.createStudentSchema = void 0;
// /**
//  * 🌐 Localized text
//  */
// export const localizedString = z.record(z.string().min(1));
// /**
//  * 👨‍👩‍👦 Parent (Father / Mother)
//  */
// const parentSchema = z.object({
//   name: localizedString,
//   mobile: z.string().min(6),
//   nid: z.string().min(5),
//   birthRegistration: z.string().min(10),
// });
// /**
//  * 👤 Guardian (optional)
//  */
// const guardianSchema = z.object({
//   relation: z.enum(["guardian", "other"]),
//   name: localizedString,
//   mobile: z.string().min(6),
//   nid: z.string().optional(),
//   walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]),
// });
// /**
//  * 🎓 Create Student
//  */
// export const createStudentSchema = z.object({
//   studentUid: z.string().min(3),
//   name: localizedString,
//   gender: z.enum(["male", "female", "other"]),
//   religion: z.string(),
//   birthDate: z.string(), // ISO string, convert later
//   birthRegistration: z.string(),
//   languagePreference: z.enum(["bn", "en"]).optional(),
//   father: parentSchema,
//   mother: parentSchema,
//   guardians: z.array(guardianSchema).optional(),
//   imageUrl: z.string().url().optional(),
//   current: z.object({
//     session: z.string().min(1, "Session is required"),
//     class: z.number().int().positive(),
//     roll: z.number().int().positive(),
//   }),
// });
// /**
//  * 🔄 Update Status
//  */
// export const updateStatusSchema = z.object({
//   status: z.enum(["active", "repeat", "passed", "transferred", "archived"]),
// });
// /**
//  * 📈 Promotion
//  */
// export const promoteSchema = z.object({
//   session: z.string(),
//   fromClass: z.number().int().positive(),
//   toClass: z.number().int().positive(),
//   result: z.enum(["promoted", "repeat"]),
//   previousRoll: z.number().int().optional(),
//   newRoll: z.number().int().optional(),
// });
// /**
//  * 💰 Stipend Beneficiary
//  */
// export const stipendBeneficiarySchema = z.object({
//   name: z.string().min(2),
//   mobile: z.string().min(6),
//   relation: z.enum(["father", "mother", "guardian", "other"]),
//   paymentMethod: z.enum(["mobile_banking", "bank", "cash"]),
//   walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]),
// });
// src/modules/student/student.validation.ts
const zod_1 = require("zod");
// ─── Reusable ─────────────────────────────────────────────────────
const bdMobile = zod_1.z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi mobile number (e.g. 01XXXXXXXXX)");
const localizedName = zod_1.z.object({
    en: zod_1.z.string().min(2, "English name required (min 2 chars)").max(100),
    bn: zod_1.z.string().max(100).optional(),
});
const parentSchema = zod_1.z.object({
    name: localizedName,
    mobile: bdMobile,
    nid: zod_1.z.string().regex(/^\d{10}$|^\d{17}$/, "NID must be 10 or 17 digits"),
    birthRegistration: zod_1.z.string().regex(/^\d{17}$/, "Birth registration must be 17 digits"),
    occupation: zod_1.z.string().max(100).optional(),
    education: zod_1.z.string().max(100).optional(),
});
// ─── Create Student ───────────────────────────────────────────────
exports.createStudentSchema = zod_1.z.object({
    studentUid: zod_1.z
        .string()
        .min(3)
        .max(30)
        .regex(/^[A-Z0-9\-]+$/, "UID must be uppercase letters, numbers, hyphens only"),
    name: localizedName,
    gender: zod_1.z.enum(["male", "female", "other"]),
    religion: zod_1.z.string().min(1, "Religion is required").max(50),
    birthDate: zod_1.z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
    birthRegistration: zod_1.z.string().regex(/^\d{17}$/, "Birth registration must be 17 digits"),
    languagePreference: zod_1.z.enum(["bn", "en"]).default("bn"),
    imageUrl: zod_1.z.string().url("Invalid image URL").optional().or(zod_1.z.literal("")),
    bloodGroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"]).optional(),
    nationality: zod_1.z.string().default("Bangladeshi"),
    address: zod_1.z.object({
        village: zod_1.z.string().min(1),
        union: zod_1.z.string().min(1),
        upazila: zod_1.z.string().min(1),
        district: zod_1.z.string().min(1),
        postCode: zod_1.z.string().optional(),
    }).optional(),
    father: parentSchema,
    mother: parentSchema,
    guardians: zod_1.z.array(zod_1.z.object({
        relation: zod_1.z.enum(["guardian", "other"]),
        name: localizedName,
        mobile: bdMobile,
        nid: zod_1.z.string().regex(/^\d{10}$|^\d{17}$/).optional().or(zod_1.z.literal("")),
        walletProvider: zod_1.z.enum(["bKash", "Nagad", "Rocket", "Other"]).default("bKash"),
    })).default([]),
    current: zod_1.z.object({
        session: zod_1.z.string().min(4, "Session required (e.g. 2025)").max(9),
        class: zod_1.z.coerce.number().int().min(1).max(10),
        roll: zod_1.z.coerce.number().int().min(1),
    }),
});
// ─── Update Status ────────────────────────────────────────────────
exports.updateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["active", "repeat", "passed", "transferred", "archived"]),
    reason: zod_1.z.string().max(200).optional(),
});
// ─── Promote ──────────────────────────────────────────────────────
exports.promoteSchema = zod_1.z
    .object({
    session: zod_1.z.string().min(4).max(9),
    fromClass: zod_1.z.coerce.number().int().min(1).max(10),
    toClass: zod_1.z.coerce.number().int().min(1).max(10),
    result: zod_1.z.enum(["promoted", "repeat"]),
    previousRoll: zod_1.z.coerce.number().int().min(1).optional(),
    newRoll: zod_1.z.coerce.number().int().min(1).optional(),
    remarks: zod_1.z.string().max(500).optional(),
})
    .refine((d) => d.result === "repeat" ? d.toClass === d.fromClass : d.toClass >= d.fromClass, { message: "toClass must be >= fromClass for promotion", path: ["toClass"] });
// ─── Stipend Beneficiary ─────────────────────────────────────────
exports.stipendBeneficiarySchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name required").max(100),
    mobile: bdMobile,
    relation: zod_1.z.enum(["father", "mother", "guardian", "other"]),
    paymentMethod: zod_1.z.enum(["mobile_banking", "bank", "cash"]),
    walletProvider: zod_1.z.enum(["bKash", "Nagad", "Rocket", "Other"]).optional(),
    bankName: zod_1.z.string().max(100).optional(),
    accountNumber: zod_1.z.string().max(30).optional(),
});
// ─── List Query ───────────────────────────────────────────────────
exports.listQuerySchema = zod_1.z.object({
    search: zod_1.z.string().max(100).optional(),
    class: zod_1.z.coerce.number().int().min(1).max(10).optional(),
    session: zod_1.z.string().max(9).optional(),
    gender: zod_1.z.enum(["male", "female", "other"]).optional(),
    status: zod_1.z.enum(["active", "repeat", "passed", "transferred", "archived"]).optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    sortBy: zod_1.z.enum(["name", "roll", "class", "createdAt"]).default("createdAt"),
    sortDir: zod_1.z.enum(["asc", "desc"]).default("desc"),
});
// ─── Bulk Promote ─────────────────────────────────────────────────
exports.bulkPromoteSchema = zod_1.z.object({
    session: zod_1.z.string().min(4).max(9),
    fromClass: zod_1.z.coerce.number().int().min(1).max(10),
    toClass: zod_1.z.coerce.number().int().min(1).max(10),
    studentUids: zod_1.z.array(zod_1.z.string()).min(1, "At least one student required").max(500),
    result: zod_1.z.enum(["promoted", "repeat"]).default("promoted"),
    remarks: zod_1.z.string().max(500).optional(),
});
// ─── Upload Image ─────────────────────────────────────────────────
exports.imageUploadSchema = zod_1.z.object({
    imageUrl: zod_1.z.string().url(),
    cloudinaryPublicId: zod_1.z.string().optional(),
});
