import { Schema, Document } from "mongoose";
export type RecordStatus = "DRAFT" | "SUBMITTED" | "PUBLISHED";
export interface IAcademicRecord extends Document {
    schoolId: Schema.Types.ObjectId;
    studentId: string;
    session: string;
    class: number;
    scope: "terminal" | "annual";
    terminalKey?: string;
    marks: Record<string, Record<string, number>>;
    status: RecordStatus;
    submittedAt?: Date;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AcademicRecord: import("mongoose").Model<IAcademicRecord, {}, {}, {}, Document<unknown, {}, IAcademicRecord, {}, {}> & IAcademicRecord & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
