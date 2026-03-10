import { Schema, model } from "mongoose";

const SubjectSchema = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    classes: [
      {
        type: Number,
      },
    ],

    isOptional: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

SubjectSchema.index(
  {
    schoolId: 1,
    code: 1,
  },
  { unique: true }
);

export const Subject = model("Subject", SubjectSchema);
