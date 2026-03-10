import { Schema, model } from "mongoose";

const ExamTypeSchema = new Schema(
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
    },

    code: {
      type: String,
      required: true,
      trim: true,
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

ExamTypeSchema.index(
  {
    schoolId: 1,
    code: 1,
  },
  { unique: true }
);

export const ExamType = model("ExamType", ExamTypeSchema);
