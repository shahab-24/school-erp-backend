import { Request, Response } from "express";
import { createSubjectSchema } from "./subject.validation";
import { SubjectService } from "./subject.service";
export const SubjectController = {
  async create(req, res, next) {
    try {
      const parsed = createSubjectSchema.parse(req.body);

      const data = await SubjectService.create(parsed, req.user.schoolId);

      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const data = await SubjectService.list(req.user.schoolId);

      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = await SubjectService.update(
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
      const data = await SubjectService.delete(
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