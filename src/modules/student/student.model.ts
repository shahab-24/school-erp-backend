// src/modules/student/student.model.ts
import mongoose, { Schema, Document } from "mongoose";

// ─── Sub-schemas ─────────────────────────────────────────────────

const LocalizedSchema = new Schema(
  { en: { type: String, required: true }, bn: { type: String } },
  { _id: false }
);

const ParentSchema = new Schema(
  {
    name: { type: LocalizedSchema, required: true },
    mobile: { type: String, required: true },
    nid: { type: String, required: true },
    birthRegistration: { type: String, required: true },
    occupation: { type: String },
    education: { type: String },
  },
  { _id: false }
);

const GuardianSchema = new Schema(
  {
    relation: { type: String, enum: ["guardian", "other"], required: true },
    name: { type: LocalizedSchema, required: true },
    mobile: { type: String, required: true },
    nid: { type: String },
    walletProvider: {
      type: String,
      enum: ["bKash", "Nagad", "Rocket", "Other"],
      default: "bKash",
    },
  },
  { _id: false }
);

const PromotionSchema = new Schema(
  {
    session: { type: String, required: true },
    fromClass: { type: Number, required: true },
    toClass: { type: Number, required: true },
    result: { type: String, enum: ["promoted", "repeat"], required: true },
    previousRoll: { type: Number },
    newRoll: { type: Number },
    remarks: { type: String },
    decidedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const StipendBeneficiarySchema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    relation: {
      type: String,
      enum: ["father", "mother", "guardian", "other"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["mobile_banking", "bank", "cash"],
      required: true,
    },
    walletProvider: {
      type: String,
      enum: ["bKash", "Nagad", "Rocket", "Other"],
    },
    bankName: { type: String },
    accountNumber: { type: String },
    isActive: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// ─── Main schema ─────────────────────────────────────────────────

export interface IStudent extends Document {
  studentUid: string;
  name: { en: string; bn?: string };
  gender: "male" | "female" | "other";
  religion: string;
  birthDate: Date;
  birthRegistration: string;
  languagePreference: "bn" | "en";
  imageUrl?: string;
  cloudinaryPublicId?: string;
  father: any;
  mother: any;
  guardians: any[];
  stipendBeneficiary?: any;
  current: {
    session: string;
    class: number;
    roll: number;
  };
  status: "active" | "repeat" | "passed" | "transferred" | "archived";
  promotions: any[];
  archivedAt?: Date;
  address?: {
    village: string;
    union: string;
    upazila: string;
    district: string;
    postCode?: string;
  };
  bloodGroup?: string;
  nationality: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema(
  {
    studentUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    name: { type: LocalizedSchema, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    religion: { type: String, required: true },
    birthDate: { type: Date, required: true },
    birthRegistration: { type: String, required: true },
    languagePreference: { type: String, enum: ["bn", "en"], default: "bn" },
    imageUrl: { type: String },
    cloudinaryPublicId: { type: String },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"],
    },
    nationality: { type: String, default: "Bangladeshi" },

    address: {
      village: String,
      union: String,
      upazila: String,
      district: String,
      postCode: String,
    },

    father: { type: ParentSchema, required: true },
    mother: { type: ParentSchema, required: true },

    // ✅ Direct array syntax — avoids TS2322 with Schema[] inside { type }
    guardians: { type: [GuardianSchema], default: [] },
    stipendBeneficiary: { type: StipendBeneficiarySchema },
    promotions: { type: [PromotionSchema], default: [] },

    current: {
      session: { type: String, required: true },
      class: { type: Number, required: true, min: 1, max: 10 },
      roll: { type: Number, required: true, min: 1 },
    },

    status: {
      type: String,
      enum: ["active", "repeat", "passed", "transferred", "archived"],
      default: "active",
    },
    archivedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────
StudentSchema.index(
  {
    "name.en": "text",
    "name.bn": "text",
    studentUid: "text",
    "father.mobile": "text",
  },
  {
    weights: { studentUid: 10, "name.en": 5, "name.bn": 5, "father.mobile": 3 },
  }
);
StudentSchema.index({ "current.class": 1, "current.session": 1 });
StudentSchema.index({ status: 1 });
StudentSchema.index({ gender: 1 });

export const Student = mongoose.model<IStudent>("Student", StudentSchema);
