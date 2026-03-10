import { Schema } from "mongoose";
export declare const ResultConfig: import("mongoose").Model<{
    isActive: boolean;
    session: string;
    version: number;
    class: number;
    schoolId: import("mongoose").Types.ObjectId;
    examTypeId: import("mongoose").Types.ObjectId;
    markStructureId: import("mongoose").Types.ObjectId;
    normalization: import("mongoose").Types.DocumentArray<{
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }> & {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }>;
    gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
    aggregation?: {
        examKeys: string[];
        type?: "sum" | "average" | "weighted" | null | undefined;
        weights?: Map<string, number> | null | undefined;
    } | null | undefined;
    passRules?: {
        passPercentage?: number | null | undefined;
        failIfAnySubjectFail?: boolean | null | undefined;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    isActive: boolean;
    session: string;
    version: number;
    class: number;
    schoolId: import("mongoose").Types.ObjectId;
    examTypeId: import("mongoose").Types.ObjectId;
    markStructureId: import("mongoose").Types.ObjectId;
    normalization: import("mongoose").Types.DocumentArray<{
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }> & {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }>;
    gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
    aggregation?: {
        examKeys: string[];
        type?: "sum" | "average" | "weighted" | null | undefined;
        weights?: Map<string, number> | null | undefined;
    } | null | undefined;
    passRules?: {
        passPercentage?: number | null | undefined;
        failIfAnySubjectFail?: boolean | null | undefined;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    isActive: boolean;
    session: string;
    version: number;
    class: number;
    schoolId: import("mongoose").Types.ObjectId;
    examTypeId: import("mongoose").Types.ObjectId;
    markStructureId: import("mongoose").Types.ObjectId;
    normalization: import("mongoose").Types.DocumentArray<{
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }> & {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }>;
    gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
    aggregation?: {
        examKeys: string[];
        type?: "sum" | "average" | "weighted" | null | undefined;
        weights?: Map<string, number> | null | undefined;
    } | null | undefined;
    passRules?: {
        passPercentage?: number | null | undefined;
        failIfAnySubjectFail?: boolean | null | undefined;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    isActive: boolean;
    session: string;
    version: number;
    class: number;
    schoolId: import("mongoose").Types.ObjectId;
    examTypeId: import("mongoose").Types.ObjectId;
    markStructureId: import("mongoose").Types.ObjectId;
    normalization: import("mongoose").Types.DocumentArray<{
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }> & {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }>;
    gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
    aggregation?: {
        examKeys: string[];
        type?: "sum" | "average" | "weighted" | null | undefined;
        weights?: Map<string, number> | null | undefined;
    } | null | undefined;
    passRules?: {
        passPercentage?: number | null | undefined;
        failIfAnySubjectFail?: boolean | null | undefined;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    isActive: boolean;
    session: string;
    version: number;
    class: number;
    schoolId: import("mongoose").Types.ObjectId;
    examTypeId: import("mongoose").Types.ObjectId;
    markStructureId: import("mongoose").Types.ObjectId;
    normalization: import("mongoose").Types.DocumentArray<{
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }> & {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }>;
    gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
    aggregation?: {
        examKeys: string[];
        type?: "sum" | "average" | "weighted" | null | undefined;
        weights?: Map<string, number> | null | undefined;
    } | null | undefined;
    passRules?: {
        passPercentage?: number | null | undefined;
        failIfAnySubjectFail?: boolean | null | undefined;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    isActive: boolean;
    session: string;
    version: number;
    class: number;
    schoolId: import("mongoose").Types.ObjectId;
    examTypeId: import("mongoose").Types.ObjectId;
    markStructureId: import("mongoose").Types.ObjectId;
    normalization: import("mongoose").Types.DocumentArray<{
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }> & {
        examKey?: string | null | undefined;
        from?: number | null | undefined;
        to?: number | null | undefined;
    }>;
    gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
    aggregation?: {
        examKeys: string[];
        type?: "sum" | "average" | "weighted" | null | undefined;
        weights?: Map<string, number> | null | undefined;
    } | null | undefined;
    passRules?: {
        passPercentage?: number | null | undefined;
        failIfAnySubjectFail?: boolean | null | undefined;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
