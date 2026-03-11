import { Request, Response, NextFunction } from "express";
import {
  createExamTypeSchema,
  updateExamTypeSchema,
} from "./examType.validation";
import { ExamTypeService } from "./examType.service";

export const ExamTypeController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createExamTypeSchema.parse(req.body);

      const result = await ExamTypeService.create(parsed);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ExamTypeService.list();

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateExamTypeSchema.parse(req.body);

      const result = await ExamTypeService.update(req.params.id, parsed);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Exam type not found",
        });
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  async toggle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExamTypeService.toggle(req.params.id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Exam type not found",
        });
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await ExamTypeService.delete(req.params.id);

      res.json({
        success: true,
        message: "Exam type deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  },
};
