"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicRecord = void 0;
// src/modules/academic-record/academicRecord.model.ts
const mongoose_1 = require("mongoose");
// Marks schema - flexible object (strict: false allows any structure)
const MarksSchema = new mongoose_1.Schema({}, { strict: false, _id: false });
const AcademicRecordSchema = new mongoose_1.Schema({
    schoolId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    studentId: {
        type: String, // ✅ String রাখা হয়েছে (existing code অনুযায়ী)
        required: true,
        index: true,
    },
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
    scope: {
        type: String,
        enum: ["terminal", "annual"],
        required: true,
    },
    terminalKey: String,
    marks: {
        type: MarksSchema, // ✅ MarksSchema ব্যবহার করা হয়েছে
        required: true,
    },
    status: {
        type: String,
        enum: ["DRAFT", "SUBMITTED", "PUBLISHED"],
        default: "DRAFT",
        index: true,
    },
    submittedAt: Date,
    publishedAt: Date,
}, {
    timestamps: true,
    // ✅ JSON transformation for consistent API responses
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            ret.schoolId = ret.schoolId.toString();
            // studentId already string, no conversion needed
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});
// ✅ Compound unique index (same as existing code)
AcademicRecordSchema.index({
    schoolId: 1,
    studentId: 1,
    session: 1,
    class: 1,
    scope: 1,
    terminalKey: 1,
}, { unique: true });
// ✅ Indexes for common queries
AcademicRecordSchema.index({ status: 1, schoolId: 1 });
AcademicRecordSchema.index({ session: 1, class: 1, status: 1 });
exports.AcademicRecord = (0, mongoose_1.model)("AcademicRecord", AcademicRecordSchema);
