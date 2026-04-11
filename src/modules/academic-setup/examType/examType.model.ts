import { Schema, model, Document, Types } from "mongoose";

export interface IExamType extends Document {
  schoolId: Types.ObjectId; // ✅ FIXED

  name: string;
  code: string;
  order: number;
  isActive: boolean;
}

const ExamTypeSchema = new Schema<IExamType>(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 20,
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ✅ multi-tenant safe unique
ExamTypeSchema.index({ schoolId: 1, code: 1 }, { unique: true });

export const ExamType = model<IExamType>("ExamType", ExamTypeSchema);
