// src/modules/result-config/resultConfig.controller.ts

import { Request, Response } from "express";
import { createResultConfigSchema } from "./resultConfig.validation";
import { ResultConfigService } from "./resultConfig.service";

export const ResultConfigController = {
  async create(req: Request, res: Response) {
    const parsed = createResultConfigSchema.parse(req.body);

    const cfg = await ResultConfigService.create(parsed);

    res.status(201).json(cfg);
  },

  async active(req: Request, res: Response) {
    const session = String(req.query.session);
    const cls = Number(req.query.class);
    const examTypeId = String(req.query.examTypeId);

    const cfg = await ResultConfigService.getActive(session, cls, examTypeId);

    if (!cfg) {
      return res.status(404).json({ message: "No active config found" });
    }

    res.json(cfg);
  },

  async list(req: Request, res: Response) {
    const query: any = {};

    if (req.query.session) {
      query.session = req.query.session.toString();
    }

    if (req.query.class) {
      query.class = Number(req.query.class);
    }

    if (req.query.examTypeId) {
      query.examTypeId = req.query.examTypeId.toString();
    }

    const list = await ResultConfigService.list(query);

    res.json(list);
  },
};
