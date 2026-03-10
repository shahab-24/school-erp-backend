import { Request, Response } from "express";
import { createSubjectSchema } from "./subject.validation";
import { SubjectService } from "./subject.service";

export const SubjectController = {
  async create(req: Request, res: Response) {
    const parsed = createSubjectSchema.parse(req.body);

    const data = await SubjectService.create(parsed);

    res.status(201).json(data);
  },

  async list(req: Request, res: Response) {
    const schoolId = req.query.schoolId as string;

    const data = await SubjectService.list(schoolId);

    res.json(data);
  },
};
