"use strict";
// src/modules/result-config/resultConfig.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultConfigService = void 0;
const resultConfig_model_1 = require("./resultConfig.model");
exports.ResultConfigService = {
    async create(payload) {
        // deactivate previous active config
        await resultConfig_model_1.ResultConfig.updateMany({
            session: payload.session,
            class: payload.class,
            examTypeId: payload.examTypeId,
            isActive: true,
        }, { $set: { isActive: false } });
        // find last version
        const last = await resultConfig_model_1.ResultConfig.findOne({
            session: payload.session,
            class: payload.class,
            examTypeId: payload.examTypeId,
        })
            .sort({ version: -1 })
            .lean();
        const version = last ? last.version + 1 : 1;
        return resultConfig_model_1.ResultConfig.create({
            ...payload,
            version,
            isActive: true,
        });
    },
    async getActive(session, cls, examTypeId) {
        return resultConfig_model_1.ResultConfig.findOne({
            session,
            class: cls,
            examTypeId,
            isActive: true,
        }).lean();
    },
    async list(query) {
        return resultConfig_model_1.ResultConfig.find(query).sort({ createdAt: -1 }).lean();
    },
};
//# sourceMappingURL=resultConfig.service.js.map