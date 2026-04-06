"use strict";
// // // src/routes.ts
// // import { Router } from "express";
// // import authRoutes from "./modules/auth/auth.routes";
// // import studentRoutes from "./modules/student/student.routes";
// // import academicRecordRoutes from "./modules/academic-record/academicRecord.routes";
// // import csrf from "csurf";
// // const csrfProtection = csrf({
// //   cookie: true,
// // });
// // const router = Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // // ✅ সঠিক: শুধু মডিউল রাউটার, base path app.ts এ already /api/v1 আছে
// // router.use("/auth", authRoutes);
// // router.use("/students", studentRoutes);
// // router.use("/academic-records", academicRecordRoutes);
// // router.use("/api/v1/auth", csrfProtection);
// // // API root info
// // router.get("/", (_req, res) => {
// //   res.json({
// //     success: true,
// //     message: "KHIRAM GOVERNMENT PRIMARY SCHOOL ERP API",
// //     version: "1.0.0",
// //     endpoints: {
// //       auth: "/api/v1/auth",
// //       students: "/api/v1/students",
// //       "academic-records": "/api/v1/academic-records",
// //       health: "/health",
// //     },
// //     timestamp: new Date().toISOString(),
// //   });
// // });
// // export default router;
// import { Router } from "express";
// import authRoutes from "./modules/auth/auth.routes";
// import studentRoutes from "./modules/student/student.routes";
// import academicRecordRoutes from "./modules/academic-record/academicRecord.routes";
// import uploadRoutes from "./modules/upload/upload.routes";
// import resultConfigRoutes from "./modules/result-config/resultConfig.routes"
// import examRoutes from "./modules/academic-setup/examType/examType.routes"
//  import csrf from "csurf";
// const csrfProtection = csrf({
//   cookie: true,
// });
// const router = Router();
// router.use("/api/v1/auth", csrfProtection);
// router.use("/auth", authRoutes);
// router.use("/students", studentRoutes);
// router.use("/academic-records", academicRecordRoutes);
// // backend
// router.use("/result-config", resultConfigRoutes);
// router.use("/api/v1/upload", uploadRoutes);
// router.use("/exam-types", examRoutes)
// router.get("/", (_req, res) => {
//   res.json({
//     success: true,
//     message: "KHIRAM GOVERNMENT PRIMARY SCHOOL ERP API",
//   });
// });
// export default router;
// src/routes.ts
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const student_routes_1 = __importDefault(require("./modules/student/student.routes"));
const academicRecord_routes_1 = __importDefault(require("./modules/academic-record/academicRecord.routes"));
const upload_routes_1 = __importDefault(require("./modules/upload/upload.routes"));
const resultConfig_routes_1 = __importDefault(require("./modules/result-config/resultConfig.routes"));
const examType_routes_1 = __importDefault(require("./modules/academic-setup/examType/examType.routes"));
const markStructure_routes_1 = __importDefault(require("./modules/academic-setup/markStructure/markStructure.routes"));
const router = (0, express_1.Router)();
// ✅ সব routes - base path ছাড়া (app.ts এ /api/v1 যোগ হবে)
router.use("/auth", auth_routes_1.default);
router.use("/students", student_routes_1.default);
router.use("/academic-records", academicRecord_routes_1.default);
router.use("/result-config", resultConfig_routes_1.default);
router.use("/upload", upload_routes_1.default);
router.use("/exam-types", examType_routes_1.default); // ✅ ঠিক আছে - হবে /api/v1/exam-types
router.use("/mark-structures", markStructure_routes_1.default); // ✅ ঠিক আছে - হবে /api/v1/exam-types
// Root info route
router.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "KHIRAM GOVERNMENT PRIMARY SCHOOL ERP API",
        version: "1.0.0",
        endpoints: {
            auth: "/api/v1/auth",
            students: "/api/v1/students",
            "academic-records": "/api/v1/academic-records",
            "exam-types": "/api/v1/exam-types",
            upload: "/api/v1/upload",
            health: "/health",
        },
    });
});
exports.default = router;
