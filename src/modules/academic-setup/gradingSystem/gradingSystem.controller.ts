import { Request, Response } from "express";
import { createGradingSchema } from "./gradingSystem.validation";
import { GradingSystemService } from "./gradingSystem.service";

export const GradingSystemController = {
  async create(req: Request, res: Response) {
    const parsed = createGradingSchema.parse(req.body);

    const data = await GradingSystemService.create(parsed);

    res.status(201).json(data);
  },

  async list(req: Request, res: Response) {
    const schoolId = req.query.schoolId as string;

    const data = await GradingSystemService.list(schoolId);

    res.json(data);
  },
};
