import { Request, Response } from "express";

import {
  upsertRecordSchema,
  changeStatusSchema,
} from "./academicRecord.validation";
import mongoose from "mongoose";
import { AcademicRecordService } from "./academicRecord.service";

export const AcademicRecordController = {
  async saveDraft(req: Request, res: Response) {
    const data = upsertRecordSchema.parse(req.body);

   const doc = await AcademicRecordService.upsertDraft({
     ...data,
     schoolId: data.schoolId,
   });

    res.json(doc);
  },

  async changeStatus(req: Request & { user?: any }, res: Response) {
    const { action } = changeStatusSchema.parse(req.body);

    const query = req.query as any;

    if (action === "submit") {
      const result = await AcademicRecordService.submit(query);

      return res.json(result);
    }

    if (action === "unlock") {
      const result = await AcademicRecordService.unlock(query);

      return res.json(result);
    }

    if (action === "publish") {
      const result = await AcademicRecordService.publish(query, {
        userId: req.user!.userId,

        role: req.user!.role,
      });

      return res.json(result);
    }
  },

  async classList(req: Request, res: Response) {
    const docs = await AcademicRecordService.listByClass(req.query);

    res.json(docs);
  },
};
