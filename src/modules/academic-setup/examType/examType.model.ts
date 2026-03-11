import { Schema, model, Document } from "mongoose";

export interface IExamType extends Document {
  name: string;
  code: string;
  order: number;
  isActive: boolean;
}

const ExamTypeSchema = new Schema<IExamType>(
  {
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
  {
    timestamps: true,
  }
);

ExamTypeSchema.index({ code: 1 }, { unique: true });

export const ExamType = model<IExamType>("ExamType", ExamTypeSchema);
