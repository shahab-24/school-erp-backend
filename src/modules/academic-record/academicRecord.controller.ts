import { Request, Response } from "express";

import {
  upsertRecordSchema,
  changeStatusSchema,
} from "./academicRecord.validation";
import mongoose from "mongoose";
import { AcademicRecordService } from "./academicRecord.service";
import { UpsertDraftPayload } from "./academicRecord.types";

export const AcademicRecordController = {
 async saveDraft(req: Request, res: Response) {
    const data = upsertRecordSchema.parse(req.body);
    
    // ✅ Ensure all required fields exist
    const payload: UpsertDraftPayload = {
      schoolId: data.schoolId,
      studentId: data.studentId!,
      session: data.session!,
      class: data.class!,
      scope: data.scope,
      terminalKey: data.terminalKey,
      marks: data.marks || {},
    };
    
    const doc = await AcademicRecordService.upsertDraft(payload);
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
  }

}