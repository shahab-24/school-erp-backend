export declare const StudentService: {
    create(payload: any): Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    list(query: any): Promise<(import("mongoose").FlattenMaps<{
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getByUid(studentUid: string): Promise<(import("mongoose").FlattenMaps<{
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateStatus(studentUid: string, status: string): Promise<import("mongoose").FlattenMaps<{
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    promote(studentUid: string, entry: any): Promise<import("mongoose").FlattenMaps<{
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateStipendBeneficiary(studentUid: string, payload: any): Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    getStipendBeneficiary(studentUid: string): Promise<import("mongoose").FlattenMaps<{
        name: string;
        isActive: boolean;
        updatedAt: NativeDate;
        mobile: string;
        relation: "guardian" | "other" | "father" | "mother";
        walletProvider: "bKash" | "Nagad" | "Rocket" | "Other";
        paymentMethod: "mobile_banking" | "bank" | "cash";
    }> | null | undefined>;
};
