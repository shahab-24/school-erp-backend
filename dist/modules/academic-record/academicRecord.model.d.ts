import { Schema } from "mongoose";
export declare const AcademicRecord: import("mongoose").Model<{
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    session: string;
    class: number;
    studentId: string;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    session: string;
    class: number;
    studentId: string;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    session: string;
    class: number;
    studentId: string;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    session: string;
    class: number;
    studentId: string;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    session: string;
    class: number;
    studentId: string;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
    session: string;
    class: number;
    studentId: string;
    scope: "terminal" | "annual";
    marks: {};
    terminalKey?: string | null | undefined;
    submittedAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
