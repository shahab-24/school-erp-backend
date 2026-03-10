import { Schema, model } from "mongoose";

const MarkStructureSchema = new Schema(
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

    components: [
      {
        key: String,
        label: String,
        totalMarks: Number,
        required: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export const MarkStructure = model("MarkStructure", MarkStructureSchema);
