// src/modules/academic-record/academicRecord.publisher.ts
import mongoose from "mongoose";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../core/errors/httpErrors";

import { AcademicRecord } from "./academicRecord.model";
import { ResultSnapshot } from "../result-snapshot/resultSnapshot.model";
import { ResultConfig } from "../result-config/resultConfig.model";
import { calculateResults } from "../result-engine/resultEngine";
import { convertForCalculation } from "../../utils/typesafe-wrapper";
import { ResultSnapshotService } from "../result-snapshot/resultSnapshot.service";

export async function publishAndGenerateResult(
  query: any,
  actor: { userId: string; role: string }
) {
  // 1. Authorization check
  if (actor.role !== "SCHOOL_ADMIN" && actor.role !== "SUPER_ADMIN") {
    throw new ForbiddenError("Only admin can publish result");
  }

  // 2. Start transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 3. Find academic record
    const record = await AcademicRecord.findOne(query).session(session);

    if (!record) {
      throw new NotFoundError("Academic record not found");
    }

    if (record.status !== "SUBMITTED") {
      throw new ConflictError("Only submitted record can be published");
    }

    // 4. Find active result config
    const config = await ResultConfig.findOne({
      session: record.session,
      class: record.class,
      isActive: true,
    }).session(session);

    if (!config) {
      throw new NotFoundError("Active result config not found");
    }

    // 5. Convert config for calculation engine
    const configForCalculation = convertForCalculation(config);

    // 6. Prepare engine options
    const engineOptions: any = {
      scope: record.scope,
    };

    if (record.scope === "terminal" && record.terminalKey) {
      engineOptions.terminalKeyPrefix = String(record.terminalKey);
    }

    // 7. Calculate results
    const [result] = calculateResults(
      [
        {
          studentId: record.studentId.toString(), // ✅ Fix: ObjectId → string
          session: record.session,
          class: record.class,
          marks: record.marks,
        },
      ],
      configForCalculation,
      engineOptions
    );

    // 8. Create result snapshot
    try {
      await ResultSnapshot.create(
        [
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
        ],
        { session }
      );
    } catch (e: any) {
      if (e.code === 11000) {
        throw new ConflictError("Result already published for this student");
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
      await ResultSnapshotService.updateRanking(
        record.schoolId.toString(), // ✅ Fix: ObjectId → string
        record.scope,
        record.session,
        record.class,
        record.terminalKey
      );
    } catch (rankingError) {
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
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
