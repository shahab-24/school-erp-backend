// src/modules/academic-record/academicRecord.model.ts
import { Schema, model, Document } from "mongoose";

// Marks schema - flexible object (strict: false allows any structure)
const MarksSchema = new Schema({}, { strict: false, _id: false });

export type RecordStatus = "DRAFT" | "SUBMITTED" | "PUBLISHED";

export interface IAcademicRecord extends Document {
  schoolId: Schema.Types.ObjectId;
  studentId: string; // ✅ String রাখা হয়েছে (existing code অনুযায়ী)
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

const AcademicRecordSchema = new Schema<IAcademicRecord>(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    studentId: {
      type: String, // ✅ String রাখা হয়েছে (existing code অনুযায়ী)
      required: true,
      index: true,
    },

    session: {
      type: String,
      required: true,
      index: true,
    },

    class: {
      type: Number,
      required: true,
      index: true,
    },

    scope: {
      type: String,
      enum: ["terminal", "annual"],
      required: true,
    },

    terminalKey: String,

    marks: {
      type: MarksSchema, // ✅ MarksSchema ব্যবহার করা হয়েছে
      required: true,
    },

    status: {
      type: String,
      enum: ["DRAFT", "SUBMITTED", "PUBLISHED"],
      default: "DRAFT",
      index: true,
    },

    submittedAt: Date,

    publishedAt: Date,
  },
  {
    timestamps: true,
    // ✅ JSON transformation for consistent API responses
    toJSON: {
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        ret.schoolId = ret.schoolId.toString();
        // studentId already string, no conversion needed
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ✅ Compound unique index (same as existing code)
AcademicRecordSchema.index(
  {
    schoolId: 1,
    studentId: 1,
    session: 1,
    class: 1,
    scope: 1,
    terminalKey: 1,
  },
  { unique: true }
);

// ✅ Indexes for common queries
AcademicRecordSchema.index({ status: 1, schoolId: 1 });
AcademicRecordSchema.index({ session: 1, class: 1, status: 1 });

export const AcademicRecord = model<IAcademicRecord>(
  "AcademicRecord",
  AcademicRecordSchema
);
