import { Schema, model } from "mongoose";

const componentSchema = new Schema(
  {
    key: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    totalMarks: { type: Number, required: true, min: 0 },
    required: { type: Boolean, default: true },
  },
  { _id: false } // prevents separate _id for components
);

const MarkStructureSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    components: { type: [componentSchema], required: true },
  },
  { timestamps: true }
);

export const MarkStructure = model("MarkStructure", MarkStructureSchema);
