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
import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import studentRoutes from "./modules/student/student.routes";
import academicRecordRoutes from "./modules/academic-record/academicRecord.routes";
import uploadRoutes from "./modules/upload/upload.routes";
import resultConfigRoutes from "./modules/result-config/resultConfig.routes";
import examRoutes from "./modules/academic-setup/examType/examType.routes";
import markstructuresRoutes from "./modules/academic-setup/markStructure/markStructure.routes";

const router = Router();

// ✅ সব routes - base path ছাড়া (app.ts এ /api/v1 যোগ হবে)
router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/academic-records", academicRecordRoutes);
router.use("/result-config", resultConfigRoutes);
router.use("/upload", uploadRoutes);
router.use("/exam-types", examRoutes); // ✅ ঠিক আছে - হবে /api/v1/exam-types
router.use("/mark-structures", markstructuresRoutes); // ✅ ঠিক আছে - হবে /api/v1/exam-types

// Root info route
router.get("/debug", (req, res) => {
  res.json({
    success: true,
    message: "API is working!",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    vercel: !!process.env.VERCEL,
  });
});

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

export default router;