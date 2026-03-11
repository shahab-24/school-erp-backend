import { ExamType } from "./examType.model";
import {
  CreateExamTypeInput,
  UpdateExamTypeInput,
} from "./examType.validation";

export const ExamTypeService = {
  async create(payload: CreateExamTypeInput) {
    const examType = await ExamType.create(payload);
    return examType;
  },

  async list() {
    return ExamType.find().sort({ order: 1, createdAt: 1 }).lean();
  },

  async update(id: string, payload: UpdateExamTypeInput) {
    return ExamType.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).lean();
  },

  async toggle(id: string) {
    const doc = await ExamType.findById(id);

    if (!doc) return null;

    doc.isActive = !doc.isActive;

    await doc.save();

    return doc;
  },

  async delete(id: string) {
    return ExamType.findByIdAndDelete(id);
  },
};
