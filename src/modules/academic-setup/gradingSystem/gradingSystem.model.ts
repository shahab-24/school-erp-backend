import { Schema, model } from "mongoose";

const GradingSystemSchema = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["percentage", "gpa"],
      required: true,
    },

    scale: [
      {
        min: Number,
        label: String,
        point: Number,
      },
    ],
  },
  { timestamps: true }
);

export const GradingSystem = model("GradingSystem", GradingSystemSchema);
