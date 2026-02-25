// src/routes.ts
import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import studentRoutes from "./modules/student/student.routes";
import academicRecordRoutes from "./modules/academic-record/academicRecord.routes";

const router = Router();

// ✅ শুধু মডিউল রাউটার
router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/academic-records", academicRecordRoutes);

// API root info
router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "KHIRAM GOVERNMENT PRIMARY SCHOOL ERP API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/v1/auth",
      students: "/api/v1/students",
      "academic-records": "/api/v1/academic-records",
      health: "/health",
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
