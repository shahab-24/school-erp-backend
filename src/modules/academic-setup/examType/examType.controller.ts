import { Request, Response, NextFunction } from "express";
import {
  createExamTypeSchema,
  updateExamTypeSchema,
} from "./examType.validation";
import { ExamTypeService } from "./examType.service";

type AuthRequest = Request & {
  user: {
    userId: string;
    schoolId: string;
    role: string;
  };
};
export const ExamTypeController = {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const parsed = createExamTypeSchema.parse(req.body);

      const result = await ExamTypeService.create(parsed, req.user.schoolId);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const data = await ExamTypeService.list(req.user.schoolId);

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const parsed = updateExamTypeSchema.parse(req.body);

      const result = await ExamTypeService.update(
        req.params.id,
        parsed,
        req.user.schoolId
      );

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

  async toggle(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await ExamTypeService.toggle(
        req.params.id,
        req.user.schoolId
      );

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

  async remove(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await ExamTypeService.delete(
        req.params.id,
        req.user.schoolId
      );

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Exam type not found",
        });
      }

      res.json({
        success: true,
        message: "Exam type deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  },
};
