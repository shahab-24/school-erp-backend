"use strict";
// // src/routes.ts
// import { Router } from "express";
// import authRoutes from "./modules/auth/auth.routes";
// import studentRoutes from "./modules/student/student.routes";
// import academicRecordRoutes from "./modules/academic-record/academicRecord.routes";
// import csrf from "csurf";
// const csrfProtection = csrf({
//   cookie: true,
// });
// const router = Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // ✅ সঠিক: শুধু মডিউল রাউটার, base path app.ts এ already /api/v1 আছে
// router.use("/auth", authRoutes);
// router.use("/students", studentRoutes);
// router.use("/academic-records", academicRecordRoutes);
// router.use("/api/v1/auth", csrfProtection);
// // API root info
// router.get("/", (_req, res) => {
//   res.json({
//     success: true,
//     message: "KHIRAM GOVERNMENT PRIMARY SCHOOL ERP API",
//     version: "1.0.0",
//     endpoints: {
//       auth: "/api/v1/auth",
//       students: "/api/v1/students",
//       "academic-records": "/api/v1/academic-records",
//       health: "/health",
//     },
//     timestamp: new Date().toISOString(),
//   });
// });
// export default router;
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const student_routes_1 = __importDefault(require("./modules/student/student.routes"));
const academicRecord_routes_1 = __importDefault(require("./modules/academic-record/academicRecord.routes"));
const upload_routes_1 = __importDefault(require("./modules/upload/upload.routes"));
const csurf_1 = __importDefault(require("csurf"));
const csrfProtection = (0, csurf_1.default)({
    cookie: true,
});
const router = (0, express_1.Router)();
router.use("/api/v1/auth", csrfProtection);
router.use("/auth", auth_routes_1.default);
router.use("/students", student_routes_1.default);
router.use("/academic-records", academicRecord_routes_1.default);
router.use("/api/v1/upload", upload_routes_1.default);
router.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "KHIRAM GOVERNMENT PRIMARY SCHOOL ERP API",
    });
});
exports.default = router;
//# sourceMappingURL=routes.js.map