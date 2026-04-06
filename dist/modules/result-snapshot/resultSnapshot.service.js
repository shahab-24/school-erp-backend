"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSnapshotService = void 0;
const resultSnapshot_model_1 = require("./resultSnapshot.model");
exports.ResultSnapshotService = {
    async publish(payload) {
        if (payload.scope === "terminal" && !payload.terminalKey) {
            throw new Error("terminalKey is required for terminal scope");
        }
        const docs = payload.results.map((r) => ({
            schoolId: payload.schoolId,
            scope: payload.scope,
            terminalKey: payload.scope === "terminal" ? payload.terminalKey : undefined,
            session: payload.session,
            class: payload.class,
            studentId: r.studentId,
            academicRecordId: r.academicRecordId,
            resultConfigId: payload.resultConfigId,
            subjects: r.subjects,
            total: r.total,
            percentage: r.percentage,
            failed: r.failed,
        }));
        const inserted = await resultSnapshot_model_1.ResultSnapshot.insertMany(docs, { ordered: true });
        await this.updateRanking(payload.schoolId, payload.scope, payload.session, payload.class, payload.terminalKey);
        return inserted;
    },
    async updateRanking(schoolId, scope, session, classNo, terminalKey) {
        const filter = {
            schoolId,
            scope,
            session,
            class: classNo,
        };
        if (scope === "terminal") {
            filter.terminalKey = terminalKey;
        }
        const list = await resultSnapshot_model_1.ResultSnapshot.find(filter).sort({ percentage: -1 });
        for (let i = 0; i < list.length; i++) {
            list[i].position = i + 1;
            await list[i].save();
        }
    },
    async listByClass(params) {
        const q = {
            schoolId: params.schoolId,
            scope: params.scope,
            session: params.session,
            class: params.class,
        };
        if (params.scope === "terminal") {
            q.terminalKey = params.terminalKey;
        }
        return resultSnapshot_model_1.ResultSnapshot.find(q).sort({ position: 1 }).lean();
    },
    async getStudent(params) {
        const q = {
            schoolId: params.schoolId,
            studentId: params.studentId,
            scope: params.scope,
            session: params.session,
        };
        if (params.scope === "terminal") {
            q.terminalKey = params.terminalKey;
        }
        return resultSnapshot_model_1.ResultSnapshot.findOne(q).lean();
    },
};
//# sourceMappingURL=resultSnapshot.service.js.map