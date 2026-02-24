"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const student_validation_1 = require("./student.validation");
exports.StudentController = {
    async create(req, res) {
        const data = student_validation_1.createStudentSchema.parse(req.body);
        const student = await student_service_1.StudentService.create(data);
        res.status(201).json({
            success: true,
            data: student,
        });
    },
    async list(req, res) {
        const docs = await student_service_1.StudentService.list(req.query);
        res.json({ success: true, data: docs });
    },
    async get(req, res) {
        const doc = await student_service_1.StudentService.getByUid(req.params.studentUid);
        if (!doc) {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        res.json({ success: true, data: doc });
    },
    async updateStatus(req, res) {
        const { status } = student_validation_1.updateStatusSchema.parse(req.body);
        const doc = await student_service_1.StudentService.updateStatus(req.params.studentUid, status);
        res.json({ success: true, data: doc });
    },
    async promote(req, res) {
        const entry = student_validation_1.promoteSchema.parse(req.body);
        const doc = await student_service_1.StudentService.promote(req.params.studentUid, entry);
        res.json({ success: true, data: doc });
    },
    async updateStipendBeneficiary(req, res) {
        const data = student_validation_1.stipendBeneficiarySchema.parse(req.body);
        const student = await student_service_1.StudentService.updateStipendBeneficiary(req.params.studentUid, data);
        res.json({
            success: true,
            message: "Stipend beneficiary updated successfully",
            data: student.stipendBeneficiary,
        });
    },
    async getStipendBeneficiary(req, res) {
        const beneficiary = await student_service_1.StudentService.getStipendBeneficiary(req.params.studentUid);
        res.json({ success: true, data: beneficiary });
    },
};
//# sourceMappingURL=student.controller.js.map