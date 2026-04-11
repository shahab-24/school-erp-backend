import { Subject } from "./subject.model";
export const SubjectService = {
  async create(payload: any, schoolId: string) {
    const exists = await Subject.findOne({
      schoolId,
      code: payload.code,
    });

    if (exists) {
      throw new Error("Subject already exists");
    }

    return Subject.create({
      ...payload,
      schoolId,
    });
  },

  async list(schoolId: string) {
    return Subject.find({ schoolId }).sort({ createdAt: -1 }).lean();
  },

  async update(id: string, payload: any, schoolId: string) {
    return Subject.findOneAndUpdate({ _id: id, schoolId }, payload, {
      new: true,
      runValidators: true,
    }).lean();
  },

  async delete(id: string, schoolId: string) {
    return Subject.findOneAndDelete({
      _id: id,
      schoolId,
    });
  },
};