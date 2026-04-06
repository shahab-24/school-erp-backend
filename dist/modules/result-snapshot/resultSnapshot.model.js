"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSnapshot = void 0;
const mongoose_1 = require("mongoose");
const SubjectSnapshotSchema = new mongoose_1.Schema({
    subjectId: { type: String, required: true },
    normalized: {
        type: Map,
        of: Number,
        required: true,
    },
    final: { type: Number, required: true },
    failed: { type: Boolean, default: false },
}, { _id: false });
const ResultSnapshotSchema = new mongoose_1.Schema({
    schoolId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    academicRecordId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
ResultSnapshotSchema.index({
    schoolId: 1,
    scope: 1,
    terminalKey: 1,
    session: 1,
    class: 1,
    studentId: 1,
}, { unique: true });
exports.ResultSnapshot = (0, mongoose_1.model)("ResultSnapshot", ResultSnapshotSchema);
