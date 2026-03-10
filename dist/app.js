"use strict";
// // src/app.ts
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";
// import compression from "compression";
// import { schoolConfig } from "./config";
// import routes from "./routes";
// import { errorHandler } from "./core/errors/error.middleware";
// import csurf from "csurf";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// // ✅ শুধু একবার CORS কনফিগার করুন
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:5173",
//   "https://school-erp-frontend.vercel.app",
// ];
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // ডেভেলপমেন্টে সব অনুমতি দিন
//       if (process.env.NODE_ENV !== "production") {
//         return callback(null, true);
//       }
//       // প্রোডাকশনে specific origins
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
//   })
// );
// // Preflight requests
// app.options("*", cors());
// // Security
// app.use(
//   helmet({
//     contentSecurityPolicy:
//       process.env.NODE_ENV === "production" ? undefined : false,
//   })
// );
// // Middleware
// app.use(compression());
// app.use(express.json({ limit: "10mb" }));
// app.use(cookieParser());
// const csrfProtection = csurf({
//   cookie: true,
// });
// app.use(csrfProtection);
// app.use(express.urlencoded({ extended: true }));
// // Health check
// app.get("/health", (_req, res) => {
//   res.json({
//     status: "ok",
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV,
//     vercel: !!process.env.VERCEL,
//   });
// });
// // Root route
// app.get("/", (_req, res) => {
//   res.json({
//     success: true,
//     message: `${schoolConfig.nameEn} ERP API`,
//     version: "1.0.0",
//     endpoints: {
//       api: "/api/v1",
//       health: "/health",
//     },
//   });
// });
// // ✅ API Routes - base path /api/v1
// app.use("/api/v1", routes);
// // 404 Handler
// app.use("*", (_req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });
// app.use(errorHandler);
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./core/errors/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// API routes
app.use("/api/v1", routes_1.default);
// health
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map