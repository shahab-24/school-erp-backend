import { Request, Response } from "express";
import { createMarkStructureSchema } from "./markStructure.validation";
import { MarkStructureService } from "./markStructure.service";

export const MarkStructureController = {
  async create(req: Request, res: Response) {
    const parsed = createMarkStructureSchema.parse(req.body);

    const data = await MarkStructureService.create(parsed);

    res.status(201).json(data);
  },

  async list(req: Request, res: Response) {
    const schoolId = req.query.schoolId as string;

    const data = await MarkStructureService.list(schoolId);

    res.json(data);
  },
};
