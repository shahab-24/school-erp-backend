import { Request, Response } from "express";
import { createGradingSchema } from "./gradingSystem.validation";
import { GradingSystemService } from "./gradingSystem.service";
export const GradingSystemController = {
  async create(req, res, next) {
    try {
      const parsed = createGradingSchema.parse(req.body);

      const data = await GradingSystemService.create(parsed, req.user.schoolId);

      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const data = await GradingSystemService.list(req.user.schoolId);

      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = await GradingSystemService.update(
        req.params.id,
        req.body,
        req.user.schoolId
      );

      if (!data) return res.status(404).json({ success: false });

      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await GradingSystemService.delete(
        req.params.id,
        req.user.schoolId
      );

      if (!data) return res.status(404).json({ success: false });

      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },
};