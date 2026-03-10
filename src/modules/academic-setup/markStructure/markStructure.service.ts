import { MarkStructure } from "./markStructure.model";

export const MarkStructureService = {
  async create(payload: any) {
    return MarkStructure.create(payload);
  },

  async list(schoolId: string) {
    return MarkStructure.find({ schoolId }).lean();
  },
};
