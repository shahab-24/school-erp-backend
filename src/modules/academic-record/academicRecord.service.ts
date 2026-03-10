// src/modules/academic-record/academicRecord.service.ts

import mongoose from "mongoose";
import { AcademicRecord } from "./academicRecord.model";
import { publishAndGenerateResult } from "./academicRecord.publisher";

import {
  NotFoundError,
  ConflictError,
  BadRequestError,
} from "../../core/errors/httpErrors";

interface UpsertDraftPayload {
  schoolId: string;
  studentId: string;
  session: string;
  class: number;
  scope: "terminal" | "annual";
  terminalKey?: string;
  marks: Record<string, Record<string, number>>;
}

interface QueryFilter {
  schoolId?: mongoose.Types.ObjectId;
  studentId?: string;
  session?: string;
  class?: number;
  scope?: "terminal" | "annual";
  terminalKey?: string;
  status?: "DRAFT" | "SUBMITTED" | "PUBLISHED";
}

export const AcademicRecordService = {
  /**
   * Create or update draft record
   */
  async upsertDraft(payload: UpsertDraftPayload) {
    const schoolObjectId = new mongoose.Types.ObjectId(payload.schoolId);
    if (payload.scope === "terminal" && !payload.terminalKey) {
      throw new BadRequestError("terminalKey is required for terminal scope");
    }
const query = {
  schoolId: schoolObjectId,
  studentId: payload.studentId,
  session: payload.session,
  class: payload.class,
  scope: payload.scope,
  terminalKey: payload.terminalKey,
};

    const existing = await AcademicRecord.findOne(query);

    if (existing && existing.status !== "DRAFT") {
      throw new ConflictError(
        `Record is ${existing.status.toLowerCase()} and cannot be edited`
      );
    }

    const record = await AcademicRecord.findOneAndUpdate(
      query,
      {
        $set: {
          marks: payload.marks,
          updatedAt: new Date(),
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    ).lean();

    return {
      success: true,
      data: record,
      message: existing ? "Draft updated" : "Draft created",
    };
  },

  /**
   * Submit draft
   */
  async submit(query: QueryFilter) {
    const record = await AcademicRecord.findOneAndUpdate(
      { ...query, status: "DRAFT" },
      {
        status: "SUBMITTED",
        submittedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).lean();

    if (!record) {
      throw new NotFoundError("No draft record found to submit");
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
  async unlock(query: QueryFilter) {
    const record = await AcademicRecord.findOneAndUpdate(
      { ...query, status: "SUBMITTED" },
      {
        status: "DRAFT",
        submittedAt: null,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!record) {
      throw new NotFoundError("No submitted record found to unlock");
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
  async publish(query: QueryFilter, actor: { userId: string; role: string }) {
    return publishAndGenerateResult(query, actor);
  },

  /**
   * List records
   */
  async listByClass(
    filter: QueryFilter,
    options?: { page?: number; limit?: number }
  ) {
    const { page = 1, limit = 50 } = options || {};

    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      AcademicRecord.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      AcademicRecord.countDocuments(filter),
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
  async getById(id: string, schoolId: mongoose.Types.ObjectId) {
    const record = await AcademicRecord.findOne({
      _id: id,
      schoolId,
    }).lean();

    if (!record) {
      throw new NotFoundError("Record not found");
    }

    return {
      success: true,
      data: record,
    };
  },
};
