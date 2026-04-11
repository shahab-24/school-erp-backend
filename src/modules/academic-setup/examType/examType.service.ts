import { ExamType } from "./examType.model";
import {
  CreateExamTypeInput,
  UpdateExamTypeInput,
} from "./examType.validation";

export const ExamTypeService = {
  async create(payload: CreateExamTypeInput, schoolId: string) {
    // ✅ prevent duplicate
    const exists = await ExamType.findOne({
      schoolId,
      code: payload.code,
    });

    if (exists) {
      throw new Error("Exam type code already exists");
    }

    return ExamType.create({
      ...payload,
      schoolId,
    });
  },

  async list(schoolId: string) {
    return ExamType.find({ schoolId }).sort({ order: 1, createdAt: 1 }).lean();
  },

  async update(id: string, payload: UpdateExamTypeInput, schoolId: string) {
    return ExamType.findOneAndUpdate({ _id: id, schoolId }, payload, {
      new: true,
      runValidators: true,
    }).lean();
  },

  async toggle(id: string, schoolId: string) {
    const doc = await ExamType.findOne({ _id: id, schoolId });

    if (!doc) return null;

    doc.isActive = !doc.isActive;
    await doc.save();

    return doc;
  },

  async delete(id: string, schoolId: string) {
    return ExamType.findOneAndDelete({ _id: id, schoolId });
  },
};
