import { Schema, model, Types } from "mongoose";

const componentSchema = new Schema(
  {
    key: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    totalMarks: { type: Number, required: true, min: 0 },
    required: { type: Boolean, default: true },
  },
  { _id: false }
);

const MarkStructureSchema = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    name: { type: String, required: true, trim: true },

    components: {
      type: [componentSchema],
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ fast query
MarkStructureSchema.index({ schoolId: 1, name: 1 });
// add this for read optimization
MarkStructureSchema.index({ schoolId: 1, createdAt: -1 });
// ❗ prevent duplicate name per school
MarkStructureSchema.index({ schoolId: 1, name: 1 }, { unique: true });

export const MarkStructure = model("MarkStructure", MarkStructureSchema);
