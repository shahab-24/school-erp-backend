import { Schema } from "mongoose";
export declare const ResultSnapshot: import("mongoose").Model<{
    session: string;
    class: number;
    total: number;
    schoolId: import("mongoose").Types.ObjectId;
    studentId: string;
    scope: "terminal" | "annual";
    publishedAt: NativeDate;
    failed: boolean;
    resultConfigId: import("mongoose").Types.ObjectId;
    academicRecordId: import("mongoose").Types.ObjectId;
    subjects: import("mongoose").Types.DocumentArray<{
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }> & {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }>;
    percentage: number;
    position?: number | null | undefined;
    terminalKey?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    session: string;
    class: number;
    total: number;
    schoolId: import("mongoose").Types.ObjectId;
    studentId: string;
    scope: "terminal" | "annual";
    publishedAt: NativeDate;
    failed: boolean;
    resultConfigId: import("mongoose").Types.ObjectId;
    academicRecordId: import("mongoose").Types.ObjectId;
    subjects: import("mongoose").Types.DocumentArray<{
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }> & {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }>;
    percentage: number;
    position?: number | null | undefined;
    terminalKey?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    session: string;
    class: number;
    total: number;
    schoolId: import("mongoose").Types.ObjectId;
    studentId: string;
    scope: "terminal" | "annual";
    publishedAt: NativeDate;
    failed: boolean;
    resultConfigId: import("mongoose").Types.ObjectId;
    academicRecordId: import("mongoose").Types.ObjectId;
    subjects: import("mongoose").Types.DocumentArray<{
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }> & {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }>;
    percentage: number;
    position?: number | null | undefined;
    terminalKey?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    session: string;
    class: number;
    total: number;
    schoolId: import("mongoose").Types.ObjectId;
    studentId: string;
    scope: "terminal" | "annual";
    publishedAt: NativeDate;
    failed: boolean;
    resultConfigId: import("mongoose").Types.ObjectId;
    academicRecordId: import("mongoose").Types.ObjectId;
    subjects: import("mongoose").Types.DocumentArray<{
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }> & {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }>;
    percentage: number;
    position?: number | null | undefined;
    terminalKey?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    session: string;
    class: number;
    total: number;
    schoolId: import("mongoose").Types.ObjectId;
    studentId: string;
    scope: "terminal" | "annual";
    publishedAt: NativeDate;
    failed: boolean;
    resultConfigId: import("mongoose").Types.ObjectId;
    academicRecordId: import("mongoose").Types.ObjectId;
    subjects: import("mongoose").Types.DocumentArray<{
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }> & {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }>;
    percentage: number;
    position?: number | null | undefined;
    terminalKey?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    session: string;
    class: number;
    total: number;
    schoolId: import("mongoose").Types.ObjectId;
    studentId: string;
    scope: "terminal" | "annual";
    publishedAt: NativeDate;
    failed: boolean;
    resultConfigId: import("mongoose").Types.ObjectId;
    academicRecordId: import("mongoose").Types.ObjectId;
    subjects: import("mongoose").Types.DocumentArray<{
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }> & {
        subjectId: string;
        normalized: Map<string, number>;
        final: number;
        failed: boolean;
    }>;
    percentage: number;
    position?: number | null | undefined;
    terminalKey?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
