// // // import { z } from "zod";

// // // /**
// // //  * 🌐 Localized text
// // //  */
// // // export const localizedString = z.record(z.string().min(1));

// // // /**
// // //  * 👨‍👩‍👦 Parent (Father / Mother)
// // //  */
// // // const parentSchema = z.object({
// // //   name: localizedString,
// // //   mobile: z.string().min(6),
// // //   nid: z.string().min(5),
// // //   birthRegistration: z.string().min(10),
// // // });

// // // /**
// // //  * 👤 Guardian (optional)
// // //  */
// // // const guardianSchema = z.object({
// // //   relation: z.enum(["guardian", "other"]),
// // //   name: localizedString,
// // //   mobile: z.string().min(6),
// // //   nid: z.string().optional(),
// // //   walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]),
// // // });

// // // /**
// // //  * 🎓 Create Student
// // //  */
// // // export const createStudentSchema = z.object({
// // //   studentUid: z.string().min(3),

// // //   name: localizedString,

// // //   gender: z.enum(["male", "female", "other"]),
// // //   religion: z.string(),
// // //   birthDate: z.string(), // ISO string, convert later
// // //   birthRegistration: z.string(),

// // //   languagePreference: z.enum(["bn", "en"]).optional(),

// // //   father: parentSchema,
// // //   mother: parentSchema,

// // //   guardians: z.array(guardianSchema).optional(),

// // //   imageUrl: z.string().url().optional(),

// // //   current: z.object({
// // //     session: z.string().min(1, "Session is required"),
// // //     class: z.number().int().positive(),
// // //     roll: z.number().int().positive(),
// // //   }),
// // // });

// // // /**
// // //  * 🔄 Update Status
// // //  */
// // // export const updateStatusSchema = z.object({
// // //   status: z.enum(["active", "repeat", "passed", "transferred", "archived"]),
// // // });

// // // /**
// // //  * 📈 Promotion
// // //  */
// // // export const promoteSchema = z.object({
// // //   session: z.string(),
// // //   fromClass: z.number().int().positive(),
// // //   toClass: z.number().int().positive(),
// // //   result: z.enum(["promoted", "repeat"]),
// // //   previousRoll: z.number().int().optional(),
// // //   newRoll: z.number().int().optional(),
// // // });

// // // /**
// // //  * 💰 Stipend Beneficiary
// // //  */
// // // export const stipendBeneficiarySchema = z.object({
// // //   name: z.string().min(2),
// // //   mobile: z.string().min(6),
// // //   relation: z.enum(["father", "mother", "guardian", "other"]),
// // //   paymentMethod: z.enum(["mobile_banking", "bank", "cash"]),
// // //   walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]),
// // // });
// // // src/modules/student/student.validation.ts
// // import { z } from "zod";

// // // ─── Reusable ─────────────────────────────────────────────────────

// // const bdMobile = z
// //   .string()
// //   .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi mobile number (e.g. 01XXXXXXXXX)");

// // const localizedName = z.object({
// //   en: z.string().min(2, "English name required (min 2 chars)").max(100),
// //   bn: z.string().max(100).optional(),
// // });

// // const parentSchema = z.object({
// //   name:              localizedName,
// //   mobile:            bdMobile,
// //   nid:               z.string().regex(/^\d{10}$|^\d{17}$/, "NID must be 10 or 17 digits"),
// //   birthRegistration: z.string().regex(/^\d{17}$/, "Birth registration must be 17 digits"),
// //   occupation:        z.string().max(100).optional(),
// //   education:         z.string().max(100).optional(),
// // });

// // // ─── Create Student ───────────────────────────────────────────────

// // export const createStudentSchema = z.object({
// //   studentUid: z
// //     .string()
// //     .min(3)
// //     .max(30)
// //     .regex(/^[A-Z0-9\-]+$/, "UID must be uppercase letters, numbers, hyphens only"),

// //   name:               localizedName,
// //   gender:             z.enum(["male", "female", "other"]),
// //   religion:           z.string().min(1, "Religion is required").max(50),
// //   birthDate:          z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
// //   birthRegistration:  z.string().regex(/^\d{17}$/, "Birth registration must be 17 digits"),
// //   languagePreference: z.enum(["bn", "en"]).default("bn"),
// //   imageUrl:           z.string().url("Invalid image URL").optional().or(z.literal("")),
// //   bloodGroup:         z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"]).optional(),
// //   nationality:        z.string().default("Bangladeshi"),

// //   address: z.object({
// //     village:  z.string().min(1),
// //     union:    z.string().min(1),
// //     upazila:  z.string().min(1),
// //     district: z.string().min(1),
// //     postCode: z.string().optional(),
// //   }).optional(),

// //   father: parentSchema,
// //   mother: parentSchema,

// //   guardians: z.array(
// //     z.object({
// //       relation:       z.enum(["guardian", "other"]),
// //       name:           localizedName,
// //       mobile:         bdMobile,
// //       nid:            z.string().regex(/^\d{10}$|^\d{17}$/).optional().or(z.literal("")),
// //       walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]).default("bKash"),
// //     })
// //   ).default([]),

// //   current: z.object({
// //     session: z.string().min(4, "Session required (e.g. 2025)").max(9),
// //     class:   z.coerce.number().int().min(1).max(10),
// //     roll:    z.coerce.number().int().min(1),
// //   }),
// // });

// // // ─── Update Status ────────────────────────────────────────────────

// // export const updateStatusSchema = z.object({
// //   status: z.enum(["active", "repeat", "passed", "transferred", "archived"]),
// //   reason: z.string().max(200).optional(),
// // });

// // // ─── Promote ──────────────────────────────────────────────────────

// // export const promoteSchema = z
// //   .object({
// //     session:      z.string().min(4).max(9),
// //     fromClass:    z.coerce.number().int().min(1).max(10),
// //     toClass:      z.coerce.number().int().min(1).max(10),
// //     result:       z.enum(["promoted", "repeat"]),
// //     previousRoll: z.coerce.number().int().min(1).optional(),
// //     newRoll:      z.coerce.number().int().min(1).optional(),
// //     remarks:      z.string().max(500).optional(),
// //   })
// //   .refine(
// //     (d) => d.result === "repeat" ? d.toClass === d.fromClass : d.toClass >= d.fromClass,
// //     { message: "toClass must be >= fromClass for promotion", path: ["toClass"] }
// //   );

// // // ─── Stipend Beneficiary ─────────────────────────────────────────

// // export const stipendBeneficiarySchema = z.object({
// //   name:           z.string().min(2, "Name required").max(100),
// //   mobile:         bdMobile,
// //   relation:       z.enum(["father", "mother", "guardian", "other"]),
// //   paymentMethod:  z.enum(["mobile_banking", "bank", "cash"]),
// //   walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]).optional(),
// //   bankName:       z.string().max(100).optional(),
// //   accountNumber:  z.string().max(30).optional(),
// // });

// // // ─── List Query ───────────────────────────────────────────────────

// // export const listQuerySchema = z.object({
// //   search:  z.string().max(100).optional(),
// //   class:   z.coerce.number().int().min(1).max(10).optional(),
// //   session: z.string().max(9).optional(),
// //   gender:  z.enum(["male", "female", "other"]).optional(),
// //   status:  z.enum(["active", "repeat", "passed", "transferred", "archived"]).optional(),
// //   page:    z.coerce.number().int().min(1).default(1),
// //   limit:   z.coerce.number().int().min(1).max(100).default(10),
// //   sortBy:  z.enum(["name", "roll", "class", "createdAt"]).default("createdAt"),
// //   sortDir: z.enum(["asc", "desc"]).default("desc"),
// // });

// // // ─── Bulk Promote ─────────────────────────────────────────────────

// // export const bulkPromoteSchema = z.object({
// //   session:      z.string().min(4).max(9),
// //   fromClass:    z.coerce.number().int().min(1).max(10),
// //   toClass:      z.coerce.number().int().min(1).max(10),
// //   studentUids:  z.array(z.string()).min(1, "At least one student required").max(500),
// //   result:       z.enum(["promoted", "repeat"]).default("promoted"),
// //   remarks:      z.string().max(500).optional(),
// // });

// // // ─── Upload Image ─────────────────────────────────────────────────

// // export const imageUploadSchema = z.object({
// //   imageUrl:           z.string().url(),
// //   cloudinaryPublicId: z.string().optional(),
// // });// src/modules/student/student.validation.ts
// import { z } from "zod";

// // ──────────────────────────────────────────────────────────────
// // Create Student DTO (সব field required)
// // ──────────────────────────────────────────────────────────────
// export const createStudentSchema = z.object({
//   studentUid: z.string().min(1, "Student UID required"),
//   name: z.object({
//     en: z.string().optional(),
//     bn: z.string().optional(),
//   }),
//   gender: z.enum(["male", "female", "other"]),
//   religion: z.string().optional(),
//   birthDate: z.string().or(z.date()),
//   birthRegistration: z.string().optional(),
//   languagePreference: z.enum(["bn", "en"]).optional(),
//   father: z.object({
//     name: z.object({ en: z.string().optional(), bn: z.string().optional() }).optional(),
//     mobile: z.string().optional(),
//     nid: z.string().optional(),
//     birthRegistration: z.string().optional(),
//   }).optional(),
//   mother: z.object({
//     name: z.object({ en: z.string().optional(), bn: z.string().optional() }).optional(),
//     mobile: z.string().optional(),
//     nid: z.string().optional(),
//     birthRegistration: z.string().optional(),
//   }).optional(),
//   guardians: z.array(z.any()).optional(),
//   current: z.object({
//     session: z.string().min(1, "Session required"),
//     class: z.number().min(1, "Class required"),
//     roll: z.number().min(1, "Roll required"),
//   }),
//   status: z.enum(["active", "repeat", "passed", "transferred", "archived"]).optional(),
//   imageUrl: z.string().url().optional(),
// });

// // ──────────────────────────────────────────────────────────────
// // Update Status Schema
// // ──────────────────────────────────────────────────────────────
// export const updateStatusSchema = z.object({
//   status: z.enum(["active", "repeat", "passed", "transferred", "archived"]),
// });

// // ──────────────────────────────────────────────────────────────
// // Promote Schema (সব field required)
// // ──────────────────────────────────────────────────────────────
// export const promoteSchema = z.object({
//   session: z.string().min(1, "Session required"),
//   fromClass: z.number().min(1),
//   toClass: z.number().min(1),
//   result: z.enum(["promoted", "repeat"]),
//   previousRoll: z.number().optional(),
//   newRoll: z.number().optional(),
// });

// // ──────────────────────────────────────────────────────────────
// // Bulk Promote Schema
// // ──────────────────────────────────────────────────────────────
// export const bulkPromoteSchema = z.object({
//   session: z.string().min(1, "Session required"),
//   fromClass: z.number().min(1),
//   toClass: z.number().min(1),
//   studentUids: z.array(z.string()).min(1),
//   result: z.enum(["promoted", "repeat"]),
//   remarks: z.string().optional(),
// });

// // ──────────────────────────────────────────────────────────────
// // Stipend Beneficiary Schema (সব field required)
// // ──────────────────────────────────────────────────────────────
// export const stipendBeneficiarySchema = z.object({
//   name: z.string().min(1, "Name required"),
//   mobile: z.string().min(1, "Mobile required"),
//   relation: z.enum(["father", "mother", "guardian", "other"]),
//   paymentMethod: z.enum(["mobile_banking", "bank", "cash"]),
//   walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]),
//   bankName: z.string().optional(),
//   accountNumber: z.string().optional(),
// });

// // ──────────────────────────────────────────────────────────────
// // List Query Schema
// // ──────────────────────────────────────────────────────────────
// export const listQuerySchema = z.object({
//   page: z.string().optional().transform(Number),
//   limit: z.string().optional().transform(Number),
//   search: z.string().optional(),
//   class: z.string().optional(),
//   session: z.string().optional(),
//   gender: z.string().optional(),
//   status: z.string().optional(),
// });

// // ──────────────────────────────────────────────────────────────
// // Image Upload Schema
// // ──────────────────────────────────────────────────────────────
// export const imageUploadSchema = z.object({
//   imageUrl: z.string().url(),
//   cloudinaryPublicId: z.string().optional(),
// });

// export type CreateStudentDTO = z.infer<typeof createStudentSchema>;
// export type UpdateStatusDTO = z.infer<typeof updateStatusSchema>;
// export type PromoteDTO = z.infer<typeof promoteSchema>;
// export type BulkPromoteDTO = z.infer<typeof bulkPromoteSchema>;
// export type StipendDTO = z.infer<typeof stipendBeneficiarySchema>;
// export type ListQueryDTO = z.infer<typeof listQuerySchema>;// src/modules/student/student.validation.ts
import { z } from "zod";

// ──────────────────────────────────────────────────────────────
// Gender Enum
// ──────────────────────────────────────────────────────────────
export const genderEnum = z.enum(["male", "female", "other"]);
export type Gender = z.infer<typeof genderEnum>;

// ──────────────────────────────────────────────────────────────
// Create Student DTO (সব field required)
// ──────────────────────────────────────────────────────────────
export const createStudentSchema = z.object({
  studentUid: z.string().min(1, "Student UID required"),
  name: z.object({
    en: z.string().optional(),
    bn: z.string().optional(),
  }),
  gender: genderEnum,
  religion: z.string().optional(),
  birthDate: z.string().or(z.date()),
  birthRegistration: z.string().optional(),
  languagePreference: z.enum(["bn", "en"]).optional(),
  father: z.object({
    name: z.object({ en: z.string().optional(), bn: z.string().optional() }).optional(),
    mobile: z.string().optional(),
    nid: z.string().optional(),
    birthRegistration: z.string().optional(),
  }).optional(),
  mother: z.object({
    name: z.object({ en: z.string().optional(), bn: z.string().optional() }).optional(),
    mobile: z.string().optional(),
    nid: z.string().optional(),
    birthRegistration: z.string().optional(),
  }).optional(),
  guardians: z.array(z.any()).optional(),
  current: z.object({
    session: z.string().min(1, "Session required"),
    class: z.number().min(1, "Class required"),
    roll: z.number().min(1, "Roll required"),
  }),
  status: z.enum(["active", "repeat", "passed", "transferred", "archived"]).optional(),
  imageUrl: z.string().url().optional(),
});

// ──────────────────────────────────────────────────────────────
// List Query Schema (সব optional কিন্তু টাইপ সঠিক)
// ──────────────────────────────────────────────────────────────
export const listQuerySchema = z.object({
  page: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number),
  search: z.string().optional(),
  class: z.string().optional(),
  session: z.string().optional(),
  gender: genderEnum.optional(), // ✅ Gender type ঠিক করা
  status: z
    .enum(["active", "repeat", "passed", "transferred", "archived"])
    .optional(),
  sortBy: z.enum(["name", "class", "roll", "createdAt"]).optional(),
  sortDir: z.enum(["asc", "desc"]).optional(),
  religion: z.string().optional(),
  ageMin: z.string().optional().transform(Number),
  ageMax: z.string().optional().transform(Number),
});

// ──────────────────────────────────────────────────────────────
// Update Status Schema
// ──────────────────────────────────────────────────────────────
export const updateStatusSchema = z.object({
  status: z.enum(["active", "repeat", "passed", "transferred", "archived"]),
});

// ──────────────────────────────────────────────────────────────
// Promote Schema (সব field required)
// ──────── promoteSchema ────────


// ✅ এখন — coerce যোগ করো, required রাখো
export const promoteSchema = z.object({
  session:      z.string().min(1, "Session required"),
  fromClass:    z.coerce.number().min(1),
  toClass:      z.coerce.number().min(1),
  result:       z.enum(["promoted", "repeat"]),
  previousRoll: z.coerce.number().optional(),
  newRoll:      z.coerce.number().optional(),
  remarks:      z.string().optional(),
});

// ──────── bulkPromoteSchema ────────
// ✅ এখন — studentUids required রাখো
export const bulkPromoteSchema = z.object({
  session:      z.string().min(1),
  fromClass:    z.coerce.number().min(1),
  toClass:      z.coerce.number().min(1),
  studentUids:  z.array(z.string()).min(1),
  result:       z.enum(["promoted", "repeat"]),
  remarks:      z.string().optional(),
});

// ──────── stipendBeneficiarySchema ────────
// ✅ এখন — name, mobile required রাখো
export const stipendBeneficiarySchema = z.object({
  name:           z.string().min(1, "Name required"),
  mobile:         z.string().min(1, "Mobile required"),
  relation:       z.enum(["father", "mother", "guardian", "other"]),
  paymentMethod:  z.enum(["mobile_banking", "bank", "cash"]),
  walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]).optional(),
  bankName:       z.string().optional(),
  accountNumber:  z.string().optional(),
});

// ──────── listQuerySchema ────────





// ──────────────────────────────────────────────────────────────
// Image Upload Schema
// ──────────────────────────────────────────────────────────────
export const imageUploadSchema = z.object({
  imageUrl: z.string().url(),
  cloudinaryPublicId: z.string().optional(),
});

// ──────────────────────────────────────────────────────────────
// Export Types
// ──────────────────────────────────────────────────────────────
export type CreateStudentDTO = z.infer<typeof createStudentSchema>;
export type UpdateStatusDTO = z.infer<typeof updateStatusSchema>;
export type PromoteDTO = z.infer<typeof promoteSchema>;
export type BulkPromoteDTO = z.infer<typeof bulkPromoteSchema>;
export type StipendDTO = z.infer<typeof stipendBeneficiarySchema>;
export type ListQueryDTO = z.infer<typeof listQuerySchema>;