"use strict";
// src/modules/result-config/resultConfig.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultConfigController = void 0;
const resultConfig_validation_1 = require("./resultConfig.validation");
const resultConfig_service_1 = require("./resultConfig.service");
exports.ResultConfigController = {
    async create(req, res) {
        const parsed = resultConfig_validation_1.createResultConfigSchema.parse(req.body);
        const cfg = await resultConfig_service_1.ResultConfigService.create(parsed);
        res.status(201).json(cfg);
    },
    async active(req, res) {
        const session = String(req.query.session);
        const cls = Number(req.query.class);
        const examTypeId = String(req.query.examTypeId);
        const cfg = await resultConfig_service_1.ResultConfigService.getActive(session, cls, examTypeId);
        if (!cfg) {
            return res.status(404).json({ message: "No active config found" });
        }
        res.json(cfg);
    },
    async list(req, res) {
        const query = {};
        if (req.query.session) {
            query.session = req.query.session.toString();
        }
        if (req.query.class) {
            query.class = Number(req.query.class);
        }
        if (req.query.examTypeId) {
            query.examTypeId = req.query.examTypeId.toString();
        }
        const list = await resultConfig_service_1.ResultConfigService.list(query);
        res.json(list);
    },
};
//# sourceMappingURL=resultConfig.controller.js.map