"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const student_model_1 = require("./student.model");
const errors_1 = require("../../core/errors");
exports.StudentService = {
    async create(payload) {
        const exists = await student_model_1.Student.findOne({
            studentUid: payload.studentUid,
        });
        if (exists) {
            throw new errors_1.BadRequestError("Student UID already exists");
        }
        return student_model_1.Student.create({
            ...payload,
            birthDate: new Date(payload.birthDate),
        });
    },
    async list(query) {
        return student_model_1.Student.find(query).lean();
    },
    async getByUid(studentUid) {
        return student_model_1.Student.findOne({ studentUid }).lean();
    },
    async updateStatus(studentUid, status) {
        const update = { status };
        if (status === "archived")
            update.archivedAt = new Date();
        const student = await student_model_1.Student.findOneAndUpdate({ studentUid }, update, {
            new: true,
        }).lean();
        if (!student)
            throw new errors_1.NotFoundError("Student not found");
        return student;
    },
    async promote(studentUid, entry) {
        const student = await student_model_1.Student.findOneAndUpdate({ studentUid }, {
            $push: { promotions: entry },
            $set: {
                status: entry.result === "repeat" ? "repeat" : "active",
                "current.class": entry.toClass,
                "current.roll": entry.newRoll,
                "current.session": entry.session,
            },
        }, { new: true }).lean();
        if (!student)
            throw new errors_1.NotFoundError("Student not found");
        return student;
    },
    async updateStipendBeneficiary(studentUid, payload) {
        const student = await student_model_1.Student.findOne({ studentUid });
        if (!student)
            throw new errors_1.NotFoundError("Student not found");
        student.stipendBeneficiary = {
            ...payload,
            isActive: true,
            updatedAt: new Date(),
        };
        await student.save();
        return student;
    },
    async getStipendBeneficiary(studentUid) {
        const student = await student_model_1.Student.findOne({ studentUid }, { stipendBeneficiary: 1 }).lean();
        if (!student)
            throw new errors_1.NotFoundError("Student not found");
        return student.stipendBeneficiary;
    },
};
//# sourceMappingURL=student.service.js.map