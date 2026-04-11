import { GradingSystem } from "./gradingSystem.model";
export const GradingSystemService = {
  async create(payload: any, schoolId: string) {
    const exists = await GradingSystem.findOne({ schoolId });

    if (exists) {
      throw new Error("Grading system already exists");
    }

    return GradingSystem.create({
      ...payload,
      schoolId,
    });
  },

  async list(schoolId: string) {
    return GradingSystem.find({ schoolId }).lean();
  },

  async update(id: string, payload: any, schoolId: string) {
    return GradingSystem.findOneAndUpdate({ _id: id, schoolId }, payload, {
      new: true,
      runValidators: true,
    }).lean();
  },

  async delete(id: string, schoolId: string) {
    return GradingSystem.findOneAndDelete({
      _id: id,
      schoolId,
    });
  },
};