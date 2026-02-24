"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
/**
 * 🌐 Localized text (BN / EN / future languages)
 */
const LocalizedSchema = new mongoose_1.Schema({}, { strict: false, _id: false });
/**
 * 👨‍👩‍👦 Parent (Father / Mother)
 */
const ParentSchema = new mongoose_1.Schema({
    name: { type: LocalizedSchema, required: true },
    mobile: { type: String, required: true },
    nid: { type: String, required: true },
    birthRegistration: { type: String, required: true },
}, { _id: false });
/**
 * 👤 Guardian (optional – if not father/mother)
 */
const GuardianSchema = new mongoose_1.Schema({
    relation: {
        type: String,
        enum: ["guardian", "other"],
        required: true,
    },
    name: { type: LocalizedSchema, required: true },
    mobile: { type: String, required: true },
    nid: { type: String },
    /**
     * 💳 stipend / allowance receive method
     */
    walletProvider: {
        type: String,
        enum: ["bKash", "Nagad", "Rocket", "Other"],
        required: true,
    },
}, { _id: false });
/**
 * 📈 Promotion History
 */
const PromotionSchema = new mongoose_1.Schema({
    session: { type: String, required: true },
    fromClass: { type: Number, required: true },
    toClass: { type: Number, required: true },
    result: {
        type: String,
        enum: ["promoted", "repeat"],
        required: true,
    },
    previousRoll: Number,
    newRoll: Number,
    decidedAt: { type: Date, default: Date.now },
}, { _id: false });
/**
 * 💰 Stipend Beneficiary (Single source of truth)
 */
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
        required: true,
    },
    isActive: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now },
}, { _id: false });
/**
 * 🎓 Student (Final Production Schema)
 */
const StudentSchema = new mongoose_1.Schema({
    studentUid: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    name: { type: LocalizedSchema, required: true },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
    religion: { type: String, required: true },
    birthDate: { type: Date, required: true },
    birthRegistration: { type: String, required: true },
    languagePreference: {
        type: String,
        enum: ["bn", "en"],
        default: "bn",
    },
    /**
     * 👨 Father (mandatory)
     */
    father: {
        type: ParentSchema,
        required: true,
    },
    /**
     * 👩 Mother (mandatory)
     */
    mother: {
        type: ParentSchema,
        required: true,
    },
    /**
     * 👤 Optional guardians
     */
    guardians: {
        type: [GuardianSchema],
        default: [],
    },
    /**
     * 💰 stipend / upobritti receiver
     */
    stipendBeneficiary: {
        type: StipendBeneficiarySchema,
        required: false,
    },
    imageUrl: { type: String },
    current: {
        session: { type: String, index: true, required: true },
        class: { type: Number, index: true, required: true },
        roll: { type: Number, required: true },
    },
    status: {
        type: String,
        enum: ["active", "repeat", "passed", "transferred", "archived"],
        default: "active",
        index: true,
    },
    promotions: { type: [PromotionSchema], default: [] },
    archivedAt: { type: Date },
}, { timestamps: true });
StudentSchema.index({ "current.session": 1, "current.class": 1 });
exports.Student = (0, mongoose_1.model)("Student", StudentSchema);
//# sourceMappingURL=student.model.js.map