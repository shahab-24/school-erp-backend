// src/modules/result-config/resultConfig.service.ts

import { ResultConfig } from "./resultConfig.model";

export const ResultConfigService = {
  async create(payload: any) {
    // deactivate previous active config
    await ResultConfig.updateMany(
      {
        session: payload.session,
        class: payload.class,
        examTypeId: payload.examTypeId,
        isActive: true,
      },
      { $set: { isActive: false } }
    );

    // find last version
    const last = await ResultConfig.findOne({
      session: payload.session,
      class: payload.class,
      examTypeId: payload.examTypeId,
    })
      .sort({ version: -1 })
      .lean();

    const version = last ? last.version + 1 : 1;

    return ResultConfig.create({
      ...payload,
      version,
      isActive: true,
    });
  },

  async getActive(session: string, cls: number, examTypeId: string) {
    return ResultConfig.findOne({
      session,
      class: cls,
      examTypeId,
      isActive: true,
    }).lean();
  },

  async list(query: any) {
    return ResultConfig.find(query).sort({ createdAt: -1 }).lean();
  },
};
