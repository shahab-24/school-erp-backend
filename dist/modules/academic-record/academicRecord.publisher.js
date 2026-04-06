"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishAndGenerateResult = publishAndGenerateResult;
// src/modules/academic-record/academicRecord.publisher.ts
const mongoose_1 = __importDefault(require("mongoose"));
const httpErrors_1 = require("../../core/errors/httpErrors");
const academicRecord_model_1 = require("./academicRecord.model");
const resultSnapshot_model_1 = require("../result-snapshot/resultSnapshot.model");
const resultConfig_model_1 = require("../result-config/resultConfig.model");
const resultEngine_1 = require("../result-engine/resultEngine");
const typesafe_wrapper_1 = require("../../utils/typesafe-wrapper");
const resultSnapshot_service_1 = require("../result-snapshot/resultSnapshot.service");
async function publishAndGenerateResult(query, actor) {
    // 1. Authorization check
    if (actor.role !== "SCHOOL_ADMIN" && actor.role !== "SUPER_ADMIN") {
        throw new httpErrors_1.ForbiddenError("Only admin can publish result");
    }
    // 2. Start transaction
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // 3. Find academic record
        const record = await academicRecord_model_1.AcademicRecord.findOne(query).session(session);
        if (!record) {
            throw new httpErrors_1.NotFoundError("Academic record not found");
        }
        if (record.status !== "SUBMITTED") {
            throw new httpErrors_1.ConflictError("Only submitted record can be published");
        }
        // 4. Find active result config
        const config = await resultConfig_model_1.ResultConfig.findOne({
            session: record.session,
            class: record.class,
            isActive: true,
        }).session(session);
        if (!config) {
            throw new httpErrors_1.NotFoundError("Active result config not found");
        }
        // 5. Convert config for calculation engine
        const configForCalculation = (0, typesafe_wrapper_1.convertForCalculation)(config);
        // 6. Prepare engine options
        const engineOptions = {
            scope: record.scope,
        };
        if (record.scope === "terminal" && record.terminalKey) {
            engineOptions.terminalKeyPrefix = String(record.terminalKey);
        }
        // 7. Calculate results
        const [result] = (0, resultEngine_1.calculateResults)([
            {
                studentId: record.studentId.toString(), // ✅ Fix: ObjectId → string
                session: record.session,
                class: record.class,
                marks: record.marks,
            },
        ], configForCalculation, engineOptions);
        // 8. Create result snapshot
        try {
            await resultSnapshot_model_1.ResultSnapshot.create([
                {
                    schoolId: record.schoolId,
                    studentId: result.studentId,
                    session: record.session,
                    class: record.class,
                    scope: record.scope,
                    terminalKey: record.terminalKey,
                    academicRecordId: record._id,
                    resultConfigId: config._id,
                    subjects: Object.entries(result.subjects).map(([subjectId, s]) => ({
                        subjectId,
                        normalized: s.normalized,
                        final: s.final,
                        failed: s.failed,
                    })),
                    total: result.total,
                    percentage: result.percentage,
                    failed: result.failed,
                },
            ], { session });
        }
        catch (e) {
            if (e.code === 11000) {
                throw new httpErrors_1.ConflictError("Result already published for this student");
            }
            throw e;
        }
        // 9. Update academic record status
        record.status = "PUBLISHED";
        record.publishedAt = new Date();
        await record.save({ session });
        // 10. Commit transaction
        await session.commitTransaction();
        // 11. Update rankings (outside transaction - non-critical)
        try {
            await resultSnapshot_service_1.ResultSnapshotService.updateRanking(record.schoolId.toString(), // ✅ Fix: ObjectId → string
            record.scope, record.session, record.class, record.terminalKey);
        }
        catch (rankingError) {
            // Log but don't fail - ranking update can be retried separately
            console.error("Ranking update failed:", rankingError);
        }
        return {
            success: true,
            message: "Result published successfully",
            data: {
                studentId: record.studentId.toString(),
                session: record.session,
                class: record.class,
            },
        };
    }
    catch (err) {
        await session.abortTransaction();
        throw err;
    }
    finally {
        session.endSession();
    }
}
