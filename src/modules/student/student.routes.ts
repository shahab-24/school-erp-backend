// src/modules/student/student.router.ts
import { Router } from "express";
import { auth } from "../../core/errors/middleware/auth";
import { requireRole } from "../../core/errors/middleware/requireRole";
import { StudentController } from "./student.controller";

const router = Router();

/**
 * 🔥 IMPORTANT:
 * Static routes MUST be declared BEFORE dynamic :studentUid
 */

// ─── Static routes ────────────────────────────────────────────────
router.get(
  "/sessions",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.sessions
);

router.get(
  "/classes",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.classes
);

router.get(
  "/stats",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.stats
);

router.get(
  "/roster",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.roster // ?class=5&session=2025
);

// ─── Bulk operations ──────────────────────────────────────────────
router.post(
  "/bulk-promote",
  auth(),
  requireRole("SCHOOL_ADMIN"),
  StudentController.bulkPromote
);

// ─── Collection ───────────────────────────────────────────────────
router.post("/", auth(), requireRole("SCHOOL_ADMIN"), StudentController.create);

router.get(
  "/",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.list
);

// ─── Single student ───────────────────────────────────────────────
router.get(
  "/:studentUid",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.get
);

router.patch(
  "/:studentUid/status",
  auth(),
  requireRole("SCHOOL_ADMIN"),
  StudentController.updateStatus
);

router.post(
  "/:studentUid/promote",
  auth(),
  requireRole("SCHOOL_ADMIN"),
  StudentController.promote
);

router.patch(
  "/:studentUid/image",
  auth(),
  requireRole("SCHOOL_ADMIN"),
  StudentController.updateImage
);

router.get(
  "/:studentUid/stipend-beneficiary",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.getStipendBeneficiary
);

router.patch(
  "/:studentUid/stipend-beneficiary",
  auth(),
  requireRole("SCHOOL_ADMIN"),
  StudentController.updateStipendBeneficiary
);

export default router;
