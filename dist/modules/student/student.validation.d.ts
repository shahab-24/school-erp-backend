import { z } from "zod";
/**
 * 🌐 Localized text
 */
export declare const localizedString: z.ZodRecord<z.ZodString, z.ZodString>;
/**
 * 🎓 Create Student
 */
export declare const createStudentSchema: z.ZodObject<{
    studentUid: z.ZodString;
    name: z.ZodRecord<z.ZodString, z.ZodString>;
    gender: z.ZodEnum<["male", "female", "other"]>;
    religion: z.ZodString;
    birthDate: z.ZodString;
    birthRegistration: z.ZodString;
    languagePreference: z.ZodOptional<z.ZodEnum<["bn", "en"]>>;
    father: z.ZodObject<{
        name: z.ZodRecord<z.ZodString, z.ZodString>;
        mobile: z.ZodString;
        nid: z.ZodString;
        birthRegistration: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: Record<string, string>;
        mobile: string;
        nid: string;
        birthRegistration: string;
    }, {
        name: Record<string, string>;
        mobile: string;
        nid: string;
        birthRegistration: string;
    }>;
    mother: z.ZodObject<{
        name: z.ZodRecord<z.ZodString, z.ZodString>;
        mobile: z.ZodString;
        nid: z.ZodString;
        birthRegistration: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: Record<string, string>;
        mobile: string;
        nid: string;
        birthRegistration: string;
    }, {
        name: Record<string, string>;
        mobile: string;
        nid: string;
        birthRegistration: string;
    }>;
    guardians: z.ZodOptional<z.ZodArray<z.ZodObject<{
        relation: z.ZodEnum<["guardian", "other"]>;
        name: z.ZodRecord<z.ZodString, z.ZodString>;
        mobile: z.ZodString;
        nid: z.ZodOptional<z.ZodString>;
        walletProvider: z.ZodEnum<["bKash", "Nagad", "Rocket", "Other"]>;
    }, "strip", z.ZodTypeAny, {
        name: Record<string, string>;
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | undefined;
    }, {
        name: Record<string, string>;
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | undefined;
    }>, "many">>;
    imageUrl: z.ZodOptional<z.ZodString>;
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
    name: Record<string, string>;
    studentUid: string;
    birthRegistration: string;
    father: {
        name: Record<string, string>;
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    mother: {
        name: Record<string, string>;
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: string;
    current: {
        session: string;
        class: number;
        roll: number;
    };
    languagePreference?: "bn" | "en" | undefined;
    guardians?: {
        name: Record<string, string>;
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | undefined;
    }[] | undefined;
    imageUrl?: string | undefined;
}, {
    name: Record<string, string>;
    studentUid: string;
    birthRegistration: string;
    father: {
        name: Record<string, string>;
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    mother: {
        name: Record<string, string>;
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: string;
    current: {
        session: string;
        class: number;
        roll: number;
    };
    languagePreference?: "bn" | "en" | undefined;
    guardians?: {
        name: Record<string, string>;
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | undefined;
    }[] | undefined;
    imageUrl?: string | undefined;
}>;
/**
 * 🔄 Update Status
 */
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["active", "repeat", "passed", "transferred", "archived"]>;
}, "strip", z.ZodTypeAny, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
}, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
}>;
/**
 * 📈 Promotion
 */
export declare const promoteSchema: z.ZodObject<{
    session: z.ZodString;
    fromClass: z.ZodNumber;
    toClass: z.ZodNumber;
    result: z.ZodEnum<["promoted", "repeat"]>;
    previousRoll: z.ZodOptional<z.ZodNumber>;
    newRoll: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    session: string;
    fromClass: number;
    toClass: number;
    result: "repeat" | "promoted";
    previousRoll?: number | undefined;
    newRoll?: number | undefined;
}, {
    session: string;
    fromClass: number;
    toClass: number;
    result: "repeat" | "promoted";
    previousRoll?: number | undefined;
    newRoll?: number | undefined;
}>;
/**
 * 💰 Stipend Beneficiary
 */
export declare const stipendBeneficiarySchema: z.ZodObject<{
    name: z.ZodString;
    mobile: z.ZodString;
    relation: z.ZodEnum<["father", "mother", "guardian", "other"]>;
    paymentMethod: z.ZodEnum<["mobile_banking", "bank", "cash"]>;
    walletProvider: z.ZodEnum<["bKash", "Nagad", "Rocket", "Other"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    mobile: string;
    relation: "guardian" | "other" | "father" | "mother";
    walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
    paymentMethod: "mobile_banking" | "bank" | "cash";
}, {
    name: string;
    mobile: string;
    relation: "guardian" | "other" | "father" | "mother";
    walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
    paymentMethod: "mobile_banking" | "bank" | "cash";
}>;
