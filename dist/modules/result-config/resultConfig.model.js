"use strict";
// src/modules/result-config/resultConfig.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultConfig = void 0;
const mongoose_1 = require("mongoose");
const ExamSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    label: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    required: { type: Boolean, default: true },
}, { _id: false });
const NormalizationSchema = new mongoose_1.Schema({
    examKey: { type: String, required: true },
    from: { type: Number, required: true },
    to: { type: Number, required: true },
}, { _id: false });
const ResultConfigSchema = new mongoose_1.Schema({
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
    examTypeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    markStructureId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    exams: {
        type: [ExamSchema],
        required: true,
    },
    normalization: {
        type: [NormalizationSchema],
        required: true,
    },
    aggregation: {
        type: {
            type: String,
            enum: ["sum", "average", "weighted"],
            required: true,
        },
        examKeys: [String],
        weights: {
            type: Map,
            of: Number,
        },
    },
    passRules: {
        passPercentage: Number,
        failIfAnySubjectFail: Boolean,
    },
    grading: {
        type: {
            type: String,
            enum: ["percentage", "gpa"],
        },
        scale: [
            {
                min: Number,
                label: String,
                point: Number,
            },
        ],
    },
    version: {
        type: Number,
        default: 1,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
}, { timestamps: true });
ResultConfigSchema.index({
    session: 1,
    class: 1,
    examTypeId: 1,
    version: 1,
}, { unique: true });
exports.ResultConfig = (0, mongoose_1.model)("ResultConfig", ResultConfigSchema);
//# sourceMappingURL=resultConfig.model.js.map