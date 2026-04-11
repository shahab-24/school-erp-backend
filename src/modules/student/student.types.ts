// // // export type LocalizedString = Record<string, string>; // { en, bn, ar, cc }

// // // export type StudentStatus =
// // //   | "active"
// // //   | "repeat"
// // //   | "passed"
// // //   | "transferred"
// // //   | "archived";



// // // export interface PromotionEntry {
// // //   session: string;
// // //   fromClass: number;
// // //   toClass: number;
// // //   result: "promoted" | "repeat";
// // //   previousRoll?: number;
// // //   newRoll?: number;
// // //   decidedAt: Date;
// // // }

// // // export interface Parent {
// // //   name: LocalizedString;
// // //   mobile: string;
// // //   nid: string;
// // //   birthRegistration: string;
// // // }

// // // export interface Guardian {
// // //   relation: "guardian" | "other";
// // //   name: LocalizedString;
// // //   mobile: string;
// // //   nid?: string;
// // //   walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
// // // }

// // // export interface StipendBeneficiary {
// // //   name: string;
// // //   mobile: string;
// // //   relation: "father" | "mother" | "guardian" | "other";
// // //   paymentMethod: "mobile_banking" | "bank" | "cash";
// // //   walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
// // //   isActive: boolean;
// // //   updatedAt: Date;
// // // }
// // // src/modules/student/student.types.ts
// // // Shared types used across controller, service, validation

// // export type StudentStatus = "active" | "repeat" | "passed" | "transferred" | "archived";
// // export type Gender        = "male" | "female" | "other";
// // export type LangPref      = "bn" | "en";
// // export type WalletProvider = "bKash" | "Nagad" | "Rocket" | "Other";
// // export type PaymentMethod  = "mobile_banking" | "bank" | "cash";
// // export type PromoteResult  = "promoted" | "repeat";
// // export type BloodGroup     = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "unknown";

// // export interface LocalizedName {
// //   en: string;
// //   bn?: string;
// // }

// // export interface ParentInfo {
// //   name:              LocalizedName;
// //   mobile:            string;
// //   nid:               string;
// //   birthRegistration: string;
// //   occupation?:       string;
// //   education?:        string;
// // }

// // export interface GuardianInfo {
// //   relation:       "guardian" | "other";
// //   name:           LocalizedName;
// //   mobile:         string;
// //   nid?:           string;
// //   walletProvider: WalletProvider;
// // }

// // export interface PromotionEntry {
// //   session:      string;
// //   fromClass:    number;
// //   toClass:      number;
// //   result:       PromoteResult;
// //   previousRoll?: number;
// //   newRoll?:     number;
// //   remarks?:     string;
// //   decidedAt:    Date;
// // }

// // export interface StipendBeneficiary {
// //   name:           string;
// //   mobile:         string;
// //   relation:       "father" | "mother" | "guardian" | "other";
// //   paymentMethod:  PaymentMethod;
// //   walletProvider?: WalletProvider;
// //   bankName?:      string;
// //   accountNumber?: string;
// //   isActive:       boolean;
// //   updatedAt:      Date;
// // }

// // export interface StudentAddress {
// //   village:  string;
// //   union:    string;
// //   upazila:  string;
// //   district: string;
// //   postCode?: string;
// // }

// // export interface CreateStudentDTO {
// //   studentUid:         string;
// //   name:               LocalizedName;
// //   gender:             Gender;
// //   religion:           string;
// //   birthDate:          string;
// //   birthRegistration:  string;
// //   languagePreference?: LangPref;
// //   imageUrl?:          string;
// //   bloodGroup?:        BloodGroup;
// //   nationality?:       string;
// //   address?:           StudentAddress;
// //   father:             ParentInfo;
// //   mother:             ParentInfo;
// //   guardians?:         GuardianInfo[];
// //   current: {
// //     session: string;
// //     class:   number;
// //     roll:    number;
// //   };
// // }

// // export interface UpdateStatusDTO {
// //   status: StudentStatus;
// // }

// // export interface PromoteDTO {
// //   session:      string;
// //   fromClass:    number;
// //   toClass:      number;
// //   result:       PromoteResult;
// //   previousRoll?: number;
// //   newRoll?:     number;
// //   remarks?:     string;
// // }

// // export interface StipendDTO {
// //   name:           string;
// //   mobile:         string;
// //   relation:       "father" | "mother" | "guardian" | "other";
// //   paymentMethod:  PaymentMethod;
// //   walletProvider?: WalletProvider;
// //   bankName?:      string;
// //   accountNumber?: string;
// // }

// // export interface ListStudentsQuery {
// //   search?:  string;
// //   class?:   number | string;
// //   session?: string;
// //   gender?:  Gender;
// //   status?:  StudentStatus;
// //   page?:    number;
// //   limit?:   number;
// //   sortBy?:  "name" | "roll" | "class" | "createdAt";
// //   sortDir?: "asc" | "desc";
// // }

// // export interface PaginatedResult<T> {
// //   data:  T[];
// //   meta: {
// //     total:       number;
// //     page:        number;
// //     limit:       number;
// //     totalPages:  number;
// //   };
// // }// src/modules/student/student.types.ts
// // Shared types used across controller, service, validation

// export type StudentStatus = "active" | "repeat" | "passed" | "transferred" | "archived";
// export type Gender        = "male" | "female" | "other";
// export type LangPref      = "bn" | "en";
// export type WalletProvider = "bKash" | "Nagad" | "Rocket" | "Other";
// export type PaymentMethod  = "mobile_banking" | "bank" | "cash";
// export type PromoteResult  = "promoted" | "repeat";
// export type BloodGroup     = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "unknown";

// export interface LocalizedName {
//   en: string;
//   bn?: string;
// }

// export interface ParentInfo {
//   name:              LocalizedName;
//   mobile:            string;
//   nid:               string;
//   birthRegistration: string;
//   occupation?:       string;
//   education?:        string;
// }

// export interface GuardianInfo {
//   relation:       "guardian" | "other";
//   name:           LocalizedName;
//   mobile:         string;
//   nid?:           string;
//   walletProvider: WalletProvider;
// }

// export interface PromotionEntry {
//   session:      string;
//   fromClass:    number;
//   toClass:      number;
//   result:       PromoteResult;
//   previousRoll?: number;
//   newRoll?:     number;
//   remarks?:     string;
//   decidedAt:    Date;
// }

// export interface StipendBeneficiary {
//   name:           string;
//   mobile:         string;
//   relation:       "father" | "mother" | "guardian" | "other";
//   paymentMethod:  PaymentMethod;
//   walletProvider?: WalletProvider;
//   bankName?:      string;
//   accountNumber?: string;
//   isActive:       boolean;
//   updatedAt:      Date;
// }

// export interface StudentAddress {
//   village:  string;
//   union:    string;
//   upazila:  string;
//   district: string;
//   postCode?: string;
// }

// export interface CreateStudentDTO {
//   studentUid:         string;
//   name:               LocalizedName;
//   gender:             Gender;
//   religion:           string;
//   birthDate:          string;
//   birthRegistration:  string;
//   languagePreference?: LangPref;
//   imageUrl?:          string;
//   bloodGroup?:        BloodGroup;
//   nationality?:       string;
//   address?:           StudentAddress;
//   father:             ParentInfo;
//   mother:             ParentInfo;
//   guardians?:         GuardianInfo[];
//   current: {
//     session: string;
//     class:   number;
//     roll:    number;
//   };
// }

// export interface UpdateStatusDTO {
//   status: StudentStatus;
// }

// export interface PromoteDTO {
//   session:      string;
//   fromClass:    number;
//   toClass:      number;
//   result:       PromoteResult;
//   previousRoll?: number;
//   newRoll?:     number;
//   remarks?:     string;
// }

// export interface StipendDTO {
//   name:           string;
//   mobile:         string;
//   relation:       "father" | "mother" | "guardian" | "other";
//   paymentMethod:  PaymentMethod;
//   walletProvider?: WalletProvider;
//   bankName?:      string;
//   accountNumber?: string;
// }

// export interface ListStudentsQuery {
//   search?:   string;          // name.en, name.bn, uid, phone, NID, birthReg, parent name
//   class?:    number | string;
//   session?:  string;
//   gender?:   Gender;
//   status?:   StudentStatus;
//   religion?: string;          // exact match (case-insensitive)
//   ageMin?:   number;          // minimum age in years
//   ageMax?:   number;          // maximum age in years
//   page?:     number;
//   limit?:    number;
//   sortBy?:   "name" | "roll" | "class" | "createdAt";
//   sortDir?:  "asc" | "desc";
// }

// export interface PaginatedResult<T> {
//   data:  T[];
//   meta: {
//     total:       number;
//     page:        number;
//     limit:       number;
//     totalPages:  number;
//   };
// }// src/modules/student/student.types.ts

import { Types, Document } from "mongoose";
export type Gender = "male" | "female" | "other";
export type StudentStatus = "active" | "repeat" | "passed" | "transferred" | "archived";

// ──────────────────────────────────────────────────────────────
// Create Student DTO (সব field required)
// ──────────────────────────────────────────────────────────────
export interface CreateStudentDTO {
  studentUid: string;           // ✅ required
  name?: {
    en?: string;
    bn?: string;
  };
  gender: Gender;
  religion?: string;
  birthDate: Date | string;
  birthRegistration?: string;
  languagePreference?: "bn" | "en";
  father?: {
    name?: { en?: string; bn?: string };
    mobile?: string;
    nid?: string;
    birthRegistration?: string;
    occupation?: string;
    education?: string;
  };
  mother?: {
    name?: { en?: string; bn?: string };
    mobile?: string;
    nid?: string;
    birthRegistration?: string;
    occupation?: string;
    education?: string;
  };
  guardians?: Array<{
    relation: "guardian" | "other";
    name: { en?: string; bn?: string };
    mobile: string;
    nid?: string;
    walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other";
  }>;
  current: {
    session: string;
    class: number;
    roll: number;
  };
  status?: StudentStatus;
  imageUrl?: string;
}

// ──────────────────────────────────────────────────────────────
// List Query DTO (সব optional)
// ──────────────────────────────────────────────────────────────
export interface ListStudentsQuery {
  page?: number;
  limit?: number;
  search?: string;
  class?: string;
  session?: string;
  gender?: Gender;
  status?: StudentStatus;
  sortBy?: "name" | "class" | "roll" | "createdAt";
  sortDir?: "asc" | "desc";
  religion?: string;
  ageMin?: number;
  ageMax?: number;
}

// ──────────────────────────────────────────────────────────────
// Promote DTO (সব field required)
// ──────────────────────────────────────────────────────────────
export interface PromoteDTO {
  session: string;          // ✅ required
  fromClass: number;        // ✅ required
  toClass: number;          // ✅ required
  result: "promoted" | "repeat";
  previousRoll?: number;
  newRoll?: number;
}

// ──────────────────────────────────────────────────────────────
// Bulk Promote DTO
// ──────────────────────────────────────────────────────────────
export interface BulkPromoteDTO {
  session: string;          // ✅ required
  fromClass: number;        // ✅ required
  toClass: number;          // ✅ required
  studentUids: string[];    // ✅ required
  result: "promoted" | "repeat";
  remarks?: string;
}

// ──────────────────────────────────────────────────────────────
// Stipend DTO (সব field required যেখানে প্রয়োজন)
// ──────────────────────────────────────────────────────────────
export interface StipendDTO {
  name: string;             // ✅ required
  mobile: string;           // ✅ required
  relation: "father" | "mother" | "guardian" | "other";
  paymentMethod: "mobile_banking" | "bank" | "cash";
  walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other";
  bankName?: string;
  accountNumber?: string;
}

// ──────────────────────────────────────────────────────────────
// Paginated Result
// ──────────────────────────────────────────────────────────────
export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ──────────────────────────────────────────────────────────────
// IStudent Interface
// ──────────────────────────────────────────────────────────────
export interface IStudent extends Document {
  _id: Types.ObjectId;
  studentUid: string;
  name: { en?: string; bn?: string };
  gender: Gender;
  religion?: string;
  birthDate: Date;
  birthRegistration?: string;
  languagePreference?: "bn" | "en";
  father?: CreateStudentDTO["father"];
  mother?: CreateStudentDTO["mother"];
  guardians?: CreateStudentDTO["guardians"];
  stipendBeneficiary?: StipendDTO & { isActive: boolean; updatedAt: Date };
  imageUrl?: string;
  cloudinaryPublicId?: string;
  current: {
    session: string;
    class: number;
    roll: number;
  };
  status: StudentStatus;
  promotions: Array<{
    session: string;
    fromClass: number;
    toClass: number;
    result: "promoted" | "repeat";
    previousRoll?: number;
    newRoll?: number;
    decidedAt: Date;
    remarks?: string;
  }>;
  archivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}