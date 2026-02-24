import { Schema } from "mongoose";
export declare const Student: import("mongoose").Model<{
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    birthRegistration: string;
    father: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    mother: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: NativeDate;
    languagePreference: "bn" | "en";
    guardians: import("mongoose").Types.DocumentArray<{
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }> & {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }>;
    promotions: import("mongoose").Types.DocumentArray<{
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        mobile: string;
        relation: "guardian" | "other" | "father" | "mother";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        paymentMethod: "mobile_banking" | "bank" | "cash";
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session: string;
        class: number;
        roll: number;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    birthRegistration: string;
    father: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    mother: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: NativeDate;
    languagePreference: "bn" | "en";
    guardians: import("mongoose").Types.DocumentArray<{
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }> & {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }>;
    promotions: import("mongoose").Types.DocumentArray<{
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        mobile: string;
        relation: "guardian" | "other" | "father" | "mother";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        paymentMethod: "mobile_banking" | "bank" | "cash";
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session: string;
        class: number;
        roll: number;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    birthRegistration: string;
    father: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    mother: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: NativeDate;
    languagePreference: "bn" | "en";
    guardians: import("mongoose").Types.DocumentArray<{
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }> & {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }>;
    promotions: import("mongoose").Types.DocumentArray<{
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        mobile: string;
        relation: "guardian" | "other" | "father" | "mother";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        paymentMethod: "mobile_banking" | "bank" | "cash";
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session: string;
        class: number;
        roll: number;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    birthRegistration: string;
    father: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    mother: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: NativeDate;
    languagePreference: "bn" | "en";
    guardians: import("mongoose").Types.DocumentArray<{
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }> & {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }>;
    promotions: import("mongoose").Types.DocumentArray<{
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        mobile: string;
        relation: "guardian" | "other" | "father" | "mother";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        paymentMethod: "mobile_banking" | "bank" | "cash";
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session: string;
        class: number;
        roll: number;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    birthRegistration: string;
    father: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    mother: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: NativeDate;
    languagePreference: "bn" | "en";
    guardians: import("mongoose").Types.DocumentArray<{
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }> & {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }>;
    promotions: import("mongoose").Types.DocumentArray<{
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        mobile: string;
        relation: "guardian" | "other" | "father" | "mother";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        paymentMethod: "mobile_banking" | "bank" | "cash";
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session: string;
        class: number;
        roll: number;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    status: "repeat" | "active" | "passed" | "transferred" | "archived";
    name: {};
    studentUid: string;
    birthRegistration: string;
    father: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    mother: {
        name: {};
        mobile: string;
        nid: string;
        birthRegistration: string;
    };
    gender: "other" | "male" | "female";
    religion: string;
    birthDate: NativeDate;
    languagePreference: "bn" | "en";
    guardians: import("mongoose").Types.DocumentArray<{
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }> & {
        name: {};
        mobile: string;
        relation: "guardian" | "other";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        nid?: string | null | undefined;
    }>;
    promotions: import("mongoose").Types.DocumentArray<{
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }> & {
        session: string;
        fromClass: number;
        toClass: number;
        result: "repeat" | "promoted";
        decidedAt: NativeDate;
        previousRoll?: number | null | undefined;
        newRoll?: number | null | undefined;
    }>;
    stipendBeneficiary?: {
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        mobile: string;
        relation: "guardian" | "other" | "father" | "mother";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        paymentMethod: "mobile_banking" | "bank" | "cash";
    } | null | undefined;
    imageUrl?: string | null | undefined;
    current?: {
        session: string;
        class: number;
        roll: number;
    } | null | undefined;
    archivedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
