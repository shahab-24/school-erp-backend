"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/student/student.router.ts
const express_1 = require("express");
const auth_1 = require("../../core/errors/middleware/auth");
const requireRole_1 = require("../../core/errors/middleware/requireRole");
const student_controller_1 = require("./student.controller");
const router = (0, express_1.Router)();
/**
 * 🔥 IMPORTANT:
 * Static routes MUST be declared BEFORE dynamic :studentUid
 */
// ─── Static routes ────────────────────────────────────────────────
router.get("/sessions", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN", "TEACHER"), student_controller_1.StudentController.sessions);
router.get("/classes", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN", "TEACHER"), student_controller_1.StudentController.classes);
router.get("/stats", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN", "TEACHER"), student_controller_1.StudentController.stats);
router.get("/roster", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN", "TEACHER"), student_controller_1.StudentController.roster // ?class=5&session=2025
);
// ─── Bulk operations ──────────────────────────────────────────────
router.post("/bulk-promote", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN"), student_controller_1.StudentController.bulkPromote);
// ─── Collection ───────────────────────────────────────────────────
router.post("/", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN"), student_controller_1.StudentController.create);
router.get("/", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN", "TEACHER"), student_controller_1.StudentController.list);
// ─── Single student ───────────────────────────────────────────────
router.get("/:studentUid", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN", "TEACHER"), student_controller_1.StudentController.get);
router.patch("/:studentUid/status", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN"), student_controller_1.StudentController.updateStatus);
router.post("/:studentUid/promote", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN"), student_controller_1.StudentController.promote);
router.patch("/:studentUid/image", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN"), student_controller_1.StudentController.updateImage);
router.get("/:studentUid/stipend-beneficiary", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN", "TEACHER"), student_controller_1.StudentController.getStipendBeneficiary);
router.patch("/:studentUid/stipend-beneficiary", (0, auth_1.auth)(), (0, requireRole_1.requireRole)("SCHOOL_ADMIN"), student_controller_1.StudentController.updateStipendBeneficiary);
exports.default = router;
