import { z } from "zod";
export declare const createStudentSchema: z.ZodObject<{
    studentUid: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodString;
        bn: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        en: string;
        bn?: string | undefined;
    }, {
        en: string;
        bn?: string | undefined;
    }>;
    gender: z.ZodEnum<["male", "female", "other"]>;
    religion: z.ZodString;
    birthDate: z.ZodEffects<z.ZodString, string, string>;
    birthRegistration: z.ZodString;
    languagePreference: z.ZodDefault<z.ZodEnum<["bn", "en"]>>;
    imageUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    bloodGroup: z.ZodOptional<z.ZodEnum<["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"]>>;
    nationality: z.ZodDefault<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        village: z.ZodString;
        union: z.ZodString;
        upazila: z.ZodString;
        district: z.ZodString;
        postCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        union: string;
        village: string;
        upazila: string;
        district: string;
        postCode?: string | undefined;
    }, {
        union: string;
        village: string;
        upazila: string;
        district: string;
        postCode?: string | undefined;
    }>>;
    father: z.ZodObject<{
        name: z.ZodObject<{
            en: z.ZodString;
            bn: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            en: string;
            bn?: string | undefined;
        }, {
            en: string;
            bn?: string | undefined;
        }>;
        mobile: z.ZodString;
        nid: z.ZodString;
        birthRegistration: z.ZodString;
        occupation: z.ZodOptional<z.ZodString>;
        education: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        nid: string;
        birthRegistration: string;
        occupation?: string | undefined;
        education?: string | undefined;
    }, {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        nid: string;
        birthRegistration: string;
        occupation?: string | undefined;
        education?: string | undefined;
    }>;
    mother: z.ZodObject<{
        name: z.ZodObject<{
            en: z.ZodString;
            bn: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            en: string;
            bn?: string | undefined;
        }, {
            en: string;
            bn?: string | undefined;
        }>;
        mobile: z.ZodString;
        nid: z.ZodString;
        birthRegistration: z.ZodString;
        occupation: z.ZodOptional<z.ZodString>;
        education: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        nid: string;
        birthRegistration: string;
        occupation?: string | undefined;
        education?: string | undefined;
    }, {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        nid: string;
        birthRegistration: string;
        occupation?: string | undefined;
        education?: string | undefined;
    }>;
    guardians: z.ZodDefault<z.ZodArray<z.ZodObject<{
        relation: z.ZodEnum<["guardian", "other"]>;
        name: z.ZodObject<{
            en: z.ZodString;
            bn: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            en: string;
            bn?: string | undefined;
        }, {
            en: string;
            bn?: string | undefined;
        }>;
        mobile: z.ZodString;
        nid: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        walletProvider: z.ZodDefault<z.ZodEnum<["bKash", "Nagad", "Rocket", "Other"]>>;
    }, "strip", z.ZodTypeAny, {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | undefined;
    }, {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        relation: "guardian" | "other";
        nid?: string | undefined;
        walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | undefined;
    }>, "many">>;
    current: z.ZodObject<{
        session: z.ZodString;
        class: z.ZodNumber;
        roll: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        session: string;
        class: number;
        roll: number;
    }, {
        session: string;
        class: number;
        roll: number;
    }>;
}, "strip", z.ZodTypeAny, {
    name: {
        en: string;
        bn?: string | undefined;
    };
    studentUid: string;
    birthRegistration: string;
    father: {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        nid: string;
        birthRegistration: string;
        occupation?: string | undefined;
        education?: string | undefined;
    };
    mother: {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        nid: string;
        birthRegistration: string;
        occupation?: string | undefined;
        education?: string | undefined;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: string;
    languagePreference: "en" | "bn";
    nationality: string;
    guardians: {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | undefined;
    }[];
    current: {
        session: string;
        class: number;
        roll: number;
    };
    imageUrl?: string | undefined;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "unknown" | undefined;
    address?: {
        union: string;
        village: string;
        upazila: string;
        district: string;
        postCode?: string | undefined;
    } | undefined;
}, {
    name: {
        en: string;
        bn?: string | undefined;
    };
    studentUid: string;
    birthRegistration: string;
    father: {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        nid: string;
        birthRegistration: string;
        occupation?: string | undefined;
        education?: string | undefined;
    };
    mother: {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        nid: string;
        birthRegistration: string;
        occupation?: string | undefined;
        education?: string | undefined;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: string;
    current: {
        session: string;
        class: number;
        roll: number;
    };
    languagePreference?: "en" | "bn" | undefined;
    imageUrl?: string | undefined;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "unknown" | undefined;
    nationality?: string | undefined;
    address?: {
        union: string;
        village: string;
        upazila: string;
        district: string;
        postCode?: string | undefined;
    } | undefined;
    guardians?: {
        name: {
            en: string;
            bn?: string | undefined;
        };
        mobile: string;
        relation: "guardian" | "other";
        nid?: string | undefined;
        walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | undefined;
    }[] | undefined;
}>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["active", "repeat", "passed", "transferred", "archived"]>;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    reason?: string | undefined;
}, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    reason?: string | undefined;
}>;
export declare const promoteSchema: z.ZodEffects<z.ZodObject<{
    session: z.ZodString;
    fromClass: z.ZodNumber;
    toClass: z.ZodNumber;
    result: z.ZodEnum<["promoted", "repeat"]>;
    previousRoll: z.ZodOptional<z.ZodNumber>;
    newRoll: z.ZodOptional<z.ZodNumber>;
    remarks: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    session: string;
    result: "repeat" | "promoted";
    fromClass: number;
    toClass: number;
    previousRoll?: number | undefined;
    newRoll?: number | undefined;
    remarks?: string | undefined;
}, {
    session: string;
    result: "repeat" | "promoted";
    fromClass: number;
    toClass: number;
    previousRoll?: number | undefined;
    newRoll?: number | undefined;
    remarks?: string | undefined;
}>, {
    session: string;
    result: "repeat" | "promoted";
    fromClass: number;
    toClass: number;
    previousRoll?: number | undefined;
    newRoll?: number | undefined;
    remarks?: string | undefined;
}, {
    session: string;
    result: "repeat" | "promoted";
    fromClass: number;
    toClass: number;
    previousRoll?: number | undefined;
    newRoll?: number | undefined;
    remarks?: string | undefined;
}>;
export declare const stipendBeneficiarySchema: z.ZodObject<{
    name: z.ZodString;
    mobile: z.ZodString;
    relation: z.ZodEnum<["father", "mother", "guardian", "other"]>;
    paymentMethod: z.ZodEnum<["mobile_banking", "bank", "cash"]>;
    walletProvider: z.ZodOptional<z.ZodEnum<["bKash", "Nagad", "Rocket", "Other"]>>;
    bankName: z.ZodOptional<z.ZodString>;
    accountNumber: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    mobile: string;
    relation: "guardian" | "other" | "father" | "mother";
    paymentMethod: "mobile_banking" | "bank" | "cash";
    walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | undefined;
    bankName?: string | undefined;
    accountNumber?: string | undefined;
}, {
    name: string;
    mobile: string;
    relation: "guardian" | "other" | "father" | "mother";
    paymentMethod: "mobile_banking" | "bank" | "cash";
    walletProvider?: "bKash" | "Nagad" | "Rocket" | "Other" | undefined;
    bankName?: string | undefined;
    accountNumber?: string | undefined;
}>;
export declare const listQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    class: z.ZodOptional<z.ZodNumber>;
    session: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["male", "female", "other"]>>;
    status: z.ZodOptional<z.ZodEnum<["active", "repeat", "passed", "transferred", "archived"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["name", "roll", "class", "createdAt"]>>;
    sortDir: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    sortBy: "name" | "class" | "roll" | "createdAt";
    sortDir: "asc" | "desc";
    status?: "repeat" | "active" | "passed" | "transferred" | "archived" | undefined;
    session?: string | undefined;
    search?: string | undefined;
    gender?: "other" | "male" | "female" | undefined;
    class?: number | undefined;
}, {
    status?: "repeat" | "active" | "passed" | "transferred" | "archived" | undefined;
    session?: string | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    gender?: "other" | "male" | "female" | undefined;
    class?: number | undefined;
    page?: number | undefined;
    sortBy?: "name" | "class" | "roll" | "createdAt" | undefined;
    sortDir?: "asc" | "desc" | undefined;
}>;
export declare const bulkPromoteSchema: z.ZodObject<{
    session: z.ZodString;
    fromClass: z.ZodNumber;
    toClass: z.ZodNumber;
    studentUids: z.ZodArray<z.ZodString, "many">;
    result: z.ZodDefault<z.ZodEnum<["promoted", "repeat"]>>;
    remarks: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    session: string;
    result: "repeat" | "promoted";
    fromClass: number;
    toClass: number;
    studentUids: string[];
    remarks?: string | undefined;
}, {
    session: string;
    fromClass: number;
    toClass: number;
    studentUids: string[];
    result?: "repeat" | "promoted" | undefined;
    remarks?: string | undefined;
}>;
export declare const imageUploadSchema: z.ZodObject<{
    imageUrl: z.ZodString;
    cloudinaryPublicId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    imageUrl: string;
    cloudinaryPublicId?: string | undefined;
}, {
    imageUrl: string;
    cloudinaryPublicId?: string | undefined;
}>;
