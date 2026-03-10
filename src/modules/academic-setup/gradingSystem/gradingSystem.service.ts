import { GradingSystem } from "./gradingSystem.model";

export const GradingSystemService = {
  async create(payload: any) {
    return GradingSystem.create(payload);
  },

  async list(schoolId: string) {
    return GradingSystem.find({ schoolId }).lean();
  },
};
