import { Schema, model } from "mongoose";

const SubjectSnapshotSchema = new Schema(
  {
    subjectId: { type: String, required: true },

    normalized: {
      type: Map,
      of: Number,
      required: true,
    },

    final: { type: Number, required: true },

    failed: { type: Boolean, default: false },
  },
  { _id: false }
);

const ResultSnapshotSchema = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    scope: {
      type: String,
      enum: ["terminal", "annual"],
      required: true,
    },

    terminalKey: String,

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

    studentId: {
      type: String,
      required: true,
      index: true,
    },

    resultConfigId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    academicRecordId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    subjects: {
      type: [SubjectSnapshotSchema],
      required: true,
    },

    total: { type: Number, required: true },

    percentage: { type: Number, required: true },

    failed: { type: Boolean, default: false },

    position: Number,

    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

ResultSnapshotSchema.index(
  {
    schoolId: 1,
    scope: 1,
    terminalKey: 1,
    session: 1,
    class: 1,
    studentId: 1,
  },
  { unique: true }
);

export const ResultSnapshot = model("ResultSnapshot", ResultSnapshotSchema);
