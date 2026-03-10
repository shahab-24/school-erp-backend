import { Request, Response } from "express";
import { createExamTypeSchema } from "./examType.validation";
import { ExamTypeService } from "./examType.service";

export const ExamTypeController = {
  async create(req: Request, res: Response) {
    const parsed = createExamTypeSchema.parse(req.body);

    const result = await ExamTypeService.create(parsed);

    res.status(201).json(result);
  },

  async list(req: Request, res: Response) {
    const schoolId = req.query.schoolId as string;

    const data = await ExamTypeService.list(schoolId);

    res.json(data);
  },
};
