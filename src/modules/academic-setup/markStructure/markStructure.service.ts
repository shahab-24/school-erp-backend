import { MarkStructure } from "./markStructure.model";
import type {
  CreateMarkStructureInput,
  UpdateMarkStructureInput,
} from "./markStructure.validation";

export const MarkStructureService = {
  async create(payload: CreateMarkStructureInput) {
    return MarkStructure.create(payload);
  },

  async list() {
    return MarkStructure.find().sort({ createdAt: -1 }).lean();
  },

  async update(id: string, payload: UpdateMarkStructureInput) {
    return MarkStructure.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).lean();
  },

  async delete(id: string) {
    return MarkStructure.findByIdAndDelete(id).lean();
  },
};
