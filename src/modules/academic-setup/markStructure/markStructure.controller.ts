import { Request, Response, NextFunction } from "express";
import {
  createMarkStructureSchema,
  updateMarkStructureSchema,
} from "./markStructure.validation";
import { MarkStructureService } from "./markStructure.service";
export const MarkStructureController = {
  async create(req, res, next) {
    try {
      const payload = createMarkStructureSchema.parse(req.body);

      const data = await MarkStructureService.create(
        payload,
        req.user.schoolId
      );

      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const data = await MarkStructureService.list(req.user.schoolId);

      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const payload = updateMarkStructureSchema.parse(req.body);

      const result = await MarkStructureService.update(
        req.params.id,
        payload,
        req.user.schoolId
      );

      if (!result) return res.status(404).json({ success: false });

      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const result = await MarkStructureService.delete(
        req.params.id,
        req.user.schoolId
      );

      if (!result) return res.status(404).json({ success: false });

      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },
};