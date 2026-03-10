// import { z } from "zod";

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
import { z } from "zod";

// ─── Reusable ─────────────────────────────────────────────────────

const bdMobile = z
  .string()
  .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi mobile number (e.g. 01XXXXXXXXX)");

const localizedName = z.object({
  en: z.string().min(2, "English name required (min 2 chars)").max(100),
  bn: z.string().max(100).optional(),
});

const parentSchema = z.object({
  name:              localizedName,
  mobile:            bdMobile,
  nid:               z.string().regex(/^\d{10}$|^\d{17}$/, "NID must be 10 or 17 digits"),
  birthRegistration: z.string().regex(/^\d{17}$/, "Birth registration must be 17 digits"),
  occupation:        z.string().max(100).optional(),
  education:         z.string().max(100).optional(),
});

// ─── Create Student ───────────────────────────────────────────────

export const createStudentSchema = z.object({
  studentUid: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[A-Z0-9\-]+$/, "UID must be uppercase letters, numbers, hyphens only"),

  name:               localizedName,
  gender:             z.enum(["male", "female", "other"]),
  religion:           z.string().min(1, "Religion is required").max(50),
  birthDate:          z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
  birthRegistration:  z.string().regex(/^\d{17}$/, "Birth registration must be 17 digits"),
  languagePreference: z.enum(["bn", "en"]).default("bn"),
  imageUrl:           z.string().url("Invalid image URL").optional().or(z.literal("")),
  bloodGroup:         z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"]).optional(),
  nationality:        z.string().default("Bangladeshi"),

  address: z.object({
    village:  z.string().min(1),
    union:    z.string().min(1),
    upazila:  z.string().min(1),
    district: z.string().min(1),
    postCode: z.string().optional(),
  }).optional(),

  father: parentSchema,
  mother: parentSchema,

  guardians: z.array(
    z.object({
      relation:       z.enum(["guardian", "other"]),
      name:           localizedName,
      mobile:         bdMobile,
      nid:            z.string().regex(/^\d{10}$|^\d{17}$/).optional().or(z.literal("")),
      walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]).default("bKash"),
    })
  ).default([]),

  current: z.object({
    session: z.string().min(4, "Session required (e.g. 2025)").max(9),
    class:   z.coerce.number().int().min(1).max(10),
    roll:    z.coerce.number().int().min(1),
  }),
});

// ─── Update Status ────────────────────────────────────────────────

export const updateStatusSchema = z.object({
  status: z.enum(["active", "repeat", "passed", "transferred", "archived"]),
  reason: z.string().max(200).optional(),
});

// ─── Promote ──────────────────────────────────────────────────────

export const promoteSchema = z
  .object({
    session:      z.string().min(4).max(9),
    fromClass:    z.coerce.number().int().min(1).max(10),
    toClass:      z.coerce.number().int().min(1).max(10),
    result:       z.enum(["promoted", "repeat"]),
    previousRoll: z.coerce.number().int().min(1).optional(),
    newRoll:      z.coerce.number().int().min(1).optional(),
    remarks:      z.string().max(500).optional(),
  })
  .refine(
    (d) => d.result === "repeat" ? d.toClass === d.fromClass : d.toClass >= d.fromClass,
    { message: "toClass must be >= fromClass for promotion", path: ["toClass"] }
  );

// ─── Stipend Beneficiary ─────────────────────────────────────────

export const stipendBeneficiarySchema = z.object({
  name:           z.string().min(2, "Name required").max(100),
  mobile:         bdMobile,
  relation:       z.enum(["father", "mother", "guardian", "other"]),
  paymentMethod:  z.enum(["mobile_banking", "bank", "cash"]),
  walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]).optional(),
  bankName:       z.string().max(100).optional(),
  accountNumber:  z.string().max(30).optional(),
});

// ─── List Query ───────────────────────────────────────────────────

export const listQuerySchema = z.object({
  search:  z.string().max(100).optional(),
  class:   z.coerce.number().int().min(1).max(10).optional(),
  session: z.string().max(9).optional(),
  gender:  z.enum(["male", "female", "other"]).optional(),
  status:  z.enum(["active", "repeat", "passed", "transferred", "archived"]).optional(),
  page:    z.coerce.number().int().min(1).default(1),
  limit:   z.coerce.number().int().min(1).max(100).default(10),
  sortBy:  z.enum(["name", "roll", "class", "createdAt"]).default("createdAt"),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
});

// ─── Bulk Promote ─────────────────────────────────────────────────

export const bulkPromoteSchema = z.object({
  session:      z.string().min(4).max(9),
  fromClass:    z.coerce.number().int().min(1).max(10),
  toClass:      z.coerce.number().int().min(1).max(10),
  studentUids:  z.array(z.string()).min(1, "At least one student required").max(500),
  result:       z.enum(["promoted", "repeat"]).default("promoted"),
  remarks:      z.string().max(500).optional(),
});

// ─── Upload Image ─────────────────────────────────────────────────

export const imageUploadSchema = z.object({
  imageUrl:           z.string().url(),
  cloudinaryPublicId: z.string().optional(),
});