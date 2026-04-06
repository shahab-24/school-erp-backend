"use strict";
// src/modules/academic-record/academicRecord.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicRecordService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const academicRecord_model_1 = require("./academicRecord.model");
const academicRecord_publisher_1 = require("./academicRecord.publisher");
const httpErrors_1 = require("../../core/errors/httpErrors");
exports.AcademicRecordService = {
    /**
     * Create or update draft record
     */
    async upsertDraft(payload) {
        const schoolObjectId = new mongoose_1.default.Types.ObjectId(payload.schoolId);
        if (payload.scope === "terminal" && !payload.terminalKey) {
            throw new httpErrors_1.BadRequestError("terminalKey is required for terminal scope");
        }
        const query = {
            schoolId: schoolObjectId,
            studentId: payload.studentId,
            session: payload.session,
            class: payload.class,
            scope: payload.scope,
            terminalKey: payload.terminalKey,
        };
        const existing = await academicRecord_model_1.AcademicRecord.findOne(query);
        if (existing && existing.status !== "DRAFT") {
            throw new httpErrors_1.ConflictError(`Record is ${existing.status.toLowerCase()} and cannot be edited`);
        }
        const record = await academicRecord_model_1.AcademicRecord.findOneAndUpdate(query, {
            $set: {
                marks: payload.marks,
                updatedAt: new Date(),
            },
        }, {
            upsert: true,
            new: true,
            runValidators: true,
        }).lean();
        return {
            success: true,
            data: record,
            message: existing ? "Draft updated" : "Draft created",
        };
    },
    /**
     * Submit draft
     */
    async submit(query) {
        const record = await academicRecord_model_1.AcademicRecord.findOneAndUpdate({ ...query, status: "DRAFT" }, {
            status: "SUBMITTED",
            submittedAt: new Date(),
        }, { new: true, runValidators: true }).lean();
        if (!record) {
            throw new httpErrors_1.NotFoundError("No draft record found to submit");
        }
        return {
            success: true,
            data: record,
            message: "Record submitted successfully",
        };
    },
    /**
     * Unlock submitted record
     */
    async unlock(query) {
        const record = await academicRecord_model_1.AcademicRecord.findOneAndUpdate({ ...query, status: "SUBMITTED" }, {
            status: "DRAFT",
            submittedAt: null,
        }, { new: true, runValidators: true }).lean();
        if (!record) {
            throw new httpErrors_1.NotFoundError("No submitted record found to unlock");
        }
        return {
            success: true,
            data: record,
            message: "Record unlocked",
        };
    },
    /**
     * Publish record + generate result
     */
    async publish(query, actor) {
        return (0, academicRecord_publisher_1.publishAndGenerateResult)(query, actor);
    },
    /**
     * List records
     */
    async listByClass(filter, options) {
        const { page = 1, limit = 50 } = options || {};
        const skip = (page - 1) * limit;
        const [records, total] = await Promise.all([
            academicRecord_model_1.AcademicRecord.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            academicRecord_model_1.AcademicRecord.countDocuments(filter),
        ]);
        return {
            success: true,
            data: records,
            meta: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    },
    /**
     * Get record by id
     */
    async getById(id, schoolId) {
        const record = await academicRecord_model_1.AcademicRecord.findOne({
            _id: id,
            schoolId,
        }).lean();
        if (!record) {
            throw new httpErrors_1.NotFoundError("Record not found");
        }
        return {
            success: true,
            data: record,
        };
    },
};
