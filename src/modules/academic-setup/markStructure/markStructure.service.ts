import { MarkStructure } from "./markStructure.model";
import { Types } from "mongoose";

export const MarkStructureService = {
  async create(payload: any, schoolId: string) {
    // ✅ duplicate name check
    const exists = await MarkStructure.findOne({
      schoolId,
      name: payload.name,
    });

    if (exists) {
      throw new Error("Structure already exists");
    }

    // ✅ component key uniqueness
    const keys = payload.components.map((c: any) => c.key);
    if (new Set(keys).size !== keys.length) {
      throw new Error("Duplicate component keys not allowed");
    }

    // ✅ total marks validation
    const total = payload.components.reduce(
      (sum: number, c: any) => sum + c.totalMarks,
      0
    );

    if (total <= 0) {
      throw new Error("Total marks must be greater than 0");
    }

    return MarkStructure.create({
      ...payload,
      schoolId: new Types.ObjectId(schoolId),
    });
  },

  async list(schoolId: string) {
    return MarkStructure.find({ schoolId })
      .select("name components createdAt") // ✅ projection (FAST)
      .sort({ createdAt: -1 })
      .lean();
  },

  async update(id: string, payload: any, schoolId: string) {
    return MarkStructure.findOneAndUpdate({ _id: id, schoolId }, payload, {
      new: true,
      runValidators: true,
    }).lean();
  },

  async delete(id: string, schoolId: string) {
    return MarkStructure.findOneAndDelete({
      _id: id,
      schoolId,
    });
  },
};
