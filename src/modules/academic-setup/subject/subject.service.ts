import { Subject } from "./subject.model";

export const SubjectService = {
  async create(payload: any) {
    return Subject.create(payload);
  },

  async list(schoolId: string) {
    return Subject.find({ schoolId }).lean();
  },
};
