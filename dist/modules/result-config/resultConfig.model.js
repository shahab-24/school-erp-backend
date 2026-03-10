"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultConfig = void 0;
const mongoose_1 = require("mongoose");
const ResultConfigSchema = new mongoose_1.Schema({
    schoolId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    session: {
        type: String,
        required: true,
    },
    class: {
        type: Number,
        required: true,
    },
    examTypeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ExamType",
        required: true,
    },
    markStructureId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "MarkStructure",
        required: true,
    },
    gradingSystemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "GradingSystem",
    },
    version: {
        type: Number,
        required: true,
    },
    normalization: [
        {
            examKey: String,
            from: Number,
            to: Number,
        },
    ],
    aggregation: {
        type: {
            type: String,
            enum: ["sum", "average", "weighted"],
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
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
ResultConfigSchema.index({
    schoolId: 1,
    session: 1,
    class: 1,
    examTypeId: 1,
    version: 1,
}, { unique: true });
exports.ResultConfig = (0, mongoose_1.model)("ResultConfig", ResultConfigSchema);
//# sourceMappingURL=resultConfig.model.js.map