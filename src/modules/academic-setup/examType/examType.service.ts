import { ExamType } from "./examType.model";

export const ExamTypeService = {
  async create(payload: any) {
    return ExamType.create(payload);
  },

  async list(schoolId: string) {
    return ExamType.find({ schoolId }).lean();
  },

  async update(id: string, payload: any) {
    return ExamType.findByIdAndUpdate(id, payload, { new: true });
  },

  async delete(id: string) {
    return ExamType.findByIdAndDelete(id);
  },
};
