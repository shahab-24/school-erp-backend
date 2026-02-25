"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes.ts
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const student_routes_1 = __importDefault(require("./modules/student/student.routes"));
const academicRecord_routes_1 = __importDefault(require("./modules/academic-record/academicRecord.routes"));
const router = (0, express_1.Router)();
// ✅ শুধু মডিউল রাউটার
router.use("/auth", auth_routes_1.default);
router.use("/students", student_routes_1.default);
router.use("/academic-records", academicRecord_routes_1.default);
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
exports.default = router;
//# sourceMappingURL=routes.js.map