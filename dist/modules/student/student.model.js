"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
// src/modules/student/student.model.ts
const mongoose_1 = __importStar(require("mongoose"));
// ─── Sub-schemas ─────────────────────────────────────────────────
const LocalizedSchema = new mongoose_1.Schema({ en: { type: String, required: true }, bn: { type: String } }, { _id: false });
const ParentSchema = new mongoose_1.Schema({
    name: { type: LocalizedSchema, required: true },
    mobile: { type: String, required: true },
    nid: { type: String, required: true },
    birthRegistration: { type: String, required: true },
    occupation: { type: String },
    education: { type: String },
}, { _id: false });
const GuardianSchema = new mongoose_1.Schema({
    relation: { type: String, enum: ["guardian", "other"], required: true },
    name: { type: LocalizedSchema, required: true },
    mobile: { type: String, required: true },
    nid: { type: String },
    walletProvider: {
        type: String,
        enum: ["bKash", "Nagad", "Rocket", "Other"],
        default: "bKash",
    },
}, { _id: false });
const PromotionSchema = new mongoose_1.Schema({
    session: { type: String, required: true },
    fromClass: { type: Number, required: true },
    toClass: { type: Number, required: true },
    result: { type: String, enum: ["promoted", "repeat"], required: true },
    previousRoll: { type: Number },
    newRoll: { type: Number },
    remarks: { type: String },
    decidedAt: { type: Date, default: Date.now },
}, { _id: false });
const StipendBeneficiarySchema = new mongoose_1.Schema({
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
}, { _id: false });
const StudentSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// ─── Indexes ──────────────────────────────────────────────────────
StudentSchema.index({
    "name.en": "text",
    "name.bn": "text",
    studentUid: "text",
    "father.mobile": "text",
}, {
    weights: { studentUid: 10, "name.en": 5, "name.bn": 5, "father.mobile": 3 },
});
StudentSchema.index({ "current.class": 1, "current.session": 1 });
StudentSchema.index({ status: 1 });
StudentSchema.index({ gender: 1 });
exports.Student = mongoose_1.default.model("Student", StudentSchema);
