"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicRecordController = void 0;
const academicRecord_validation_1 = require("./academicRecord.validation");
const academicRecord_service_1 = require("./academicRecord.service");
exports.AcademicRecordController = {
    async saveDraft(req, res) {
        const data = academicRecord_validation_1.upsertRecordSchema.parse(req.body);
        const doc = await academicRecord_service_1.AcademicRecordService.upsertDraft({
            ...data,
            schoolId: data.schoolId,
        });
        res.json(doc);
    },
    async changeStatus(req, res) {
        const { action } = academicRecord_validation_1.changeStatusSchema.parse(req.body);
        const query = req.query;
        if (action === "submit") {
            const result = await academicRecord_service_1.AcademicRecordService.submit(query);
            return res.json(result);
        }
        if (action === "unlock") {
            const result = await academicRecord_service_1.AcademicRecordService.unlock(query);
            return res.json(result);
        }
        if (action === "publish") {
            const result = await academicRecord_service_1.AcademicRecordService.publish(query, {
                userId: req.user.userId,
                role: req.user.role,
            });
            return res.json(result);
        }
    },
    async classList(req, res) {
        const docs = await academicRecord_service_1.AcademicRecordService.listByClass(req.query);
        res.json(docs);
    },
};
//# sourceMappingURL=academicRecord.controller.js.map