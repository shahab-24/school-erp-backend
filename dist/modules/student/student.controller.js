"use strict";
// import { Request, Response } from "express";
// import { StudentService } from "./student.service";
// import {
//   createStudentSchema,
//   updateStatusSchema,
//   promoteSchema,
//   stipendBeneficiarySchema,
// } from "./student.validation";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const student_validation_1 = require("./student.validation");
// Helper: wrap async handlers
const asyncHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);
exports.StudentController = {
    // ──────────────────────────────────────────────────────────────
    // POST /students
    // ──────────────────────────────────────────────────────────────
    create: asyncHandler(async (req, res) => {
        const data = student_validation_1.createStudentSchema.parse(req.body);
        const student = await student_service_1.StudentService.create(data);
        return res.status(201).json({ success: true, data: student });
    }),
    // ──────────────────────────────────────────────────────────────
    // GET /students
    // ──────────────────────────────────────────────────────────────
    list: asyncHandler(async (req, res) => {
        const query = student_validation_1.listQuerySchema.parse(req.query);
        const result = await student_service_1.StudentService.list(query);
        return res.json({ success: true, ...result });
    }),
    // ──────────────────────────────────────────────────────────────
    // GET /students/sessions
    // ──────────────────────────────────────────────────────────────
    sessions: asyncHandler(async (_req, res) => {
        const sessions = await student_service_1.StudentService.getSessions();
        res.json({ success: true, data: sessions });
    }),
    // ──────────────────────────────────────────────────────────────
    // GET /students/classes
    // ──────────────────────────────────────────────────────────────
    classes: asyncHandler(async (_req, res) => {
        const classes = await student_service_1.StudentService.getClasses();
        res.json({ success: true, data: classes });
    }),
    // ──────────────────────────────────────────────────────────────
    // GET /students/stats
    // ──────────────────────────────────────────────────────────────
    stats: asyncHandler(async (req, res) => {
        const session = req.query.session;
        const stats = await student_service_1.StudentService.getStats(session);
        res.json({ success: true, data: stats });
    }),
    // ──────────────────────────────────────────────────────────────
    // GET /students/roster?class=5&session=2025
    // ──────────────────────────────────────────────────────────────
    roster: asyncHandler(async (req, res) => {
        const classNum = Number(req.query.class);
        const session = req.query.session;
        if (!classNum || !session) {
            return res.status(400).json({ success: false, message: "class and session required" });
        }
        const students = await student_service_1.StudentService.getClassRoster(classNum, session);
        res.json({ success: true, data: students });
    }),
    // ──────────────────────────────────────────────────────────────
    // GET /students/:studentUid
    // ──────────────────────────────────────────────────────────────
    get: asyncHandler(async (req, res) => {
        const student = await student_service_1.StudentService.getByUid(req.params.studentUid);
        res.json({ success: true, data: student });
    }),
    // ──────────────────────────────────────────────────────────────
    // PATCH /students/:studentUid/status
    // ──────────────────────────────────────────────────────────────
    updateStatus: asyncHandler(async (req, res) => {
        const { status } = student_validation_1.updateStatusSchema.parse(req.body);
        const student = await student_service_1.StudentService.updateStatus(req.params.studentUid, status);
        res.json({ success: true, data: student });
    }),
    // ──────────────────────────────────────────────────────────────
    // POST /students/:studentUid/promote
    // ──────────────────────────────────────────────────────────────
    promote: asyncHandler(async (req, res) => {
        const entry = student_validation_1.promoteSchema.parse(req.body);
        const student = await student_service_1.StudentService.promote(req.params.studentUid, entry);
        res.json({ success: true, data: student });
    }),
    // ──────────────────────────────────────────────────────────────
    // POST /students/bulk-promote
    // ──────────────────────────────────────────────────────────────
    bulkPromote: asyncHandler(async (req, res) => {
        const payload = student_validation_1.bulkPromoteSchema.parse(req.body);
        const result = await student_service_1.StudentService.bulkPromote(payload);
        res.json({ success: true, data: result });
    }),
    // ──────────────────────────────────────────────────────────────
    // PATCH /students/:studentUid/stipend-beneficiary
    // ──────────────────────────────────────────────────────────────
    updateStipendBeneficiary: asyncHandler(async (req, res) => {
        const data = student_validation_1.stipendBeneficiarySchema.parse(req.body);
        const student = await student_service_1.StudentService.updateStipendBeneficiary(req.params.studentUid, data);
        res.json({
            success: true,
            message: "Stipend beneficiary updated",
            data: student.stipendBeneficiary,
        });
    }),
    // ──────────────────────────────────────────────────────────────
    // GET /students/:studentUid/stipend-beneficiary
    // ──────────────────────────────────────────────────────────────
    getStipendBeneficiary: asyncHandler(async (req, res) => {
        const data = await student_service_1.StudentService.getStipendBeneficiary(req.params.studentUid);
        res.json({ success: true, data });
    }),
    // ──────────────────────────────────────────────────────────────
    // PATCH /students/:studentUid/image
    // ──────────────────────────────────────────────────────────────
    updateImage: asyncHandler(async (req, res) => {
        const { imageUrl, cloudinaryPublicId } = student_validation_1.imageUploadSchema.parse(req.body);
        const student = await student_service_1.StudentService.updateImage(req.params.studentUid, imageUrl, cloudinaryPublicId);
        res.json({ success: true, data: { imageUrl: student.imageUrl } });
    }),
};
