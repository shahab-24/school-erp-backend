import { Request, Response, NextFunction } from "express";
import {
  createMarkStructureSchema,
  updateMarkStructureSchema,
} from "./markStructure.validation";
import { MarkStructureService } from "./markStructure.service";

export const MarkStructureController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = createMarkStructureSchema.parse(req.body);
      const data = await MarkStructureService.create(payload);
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await MarkStructureService.list();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = updateMarkStructureSchema.parse(req.body);
      const result = await MarkStructureService.update(req.params.id, payload);
      if (!result)
        return res.status(404).json({ success: false, message: "Not found" });
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MarkStructureService.delete(req.params.id);
      if (!result)
        return res.status(404).json({ success: false, message: "Not found" });
      res.json({ success: true, message: "Deleted" });
    } catch (err) {
      next(err);
    }
  },
};
