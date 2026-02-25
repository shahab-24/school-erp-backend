"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts - ফাইনাল ভার্সন
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./core/errors/error.middleware");
const app = (0, express_1.default)();
// Security - production এ কঠোর, development এ নমনীয়
app.use((0, helmet_1.default)({
    contentSecurityPolicy: process.env.NODE_ENV === "production"
        ? {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        }
        : false,
}));
// CORS - environment based
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === "production"
        ? [process.env.FRONTEND_URL || "https://yourdomain.com"]
        : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// Health check (DB connection check ছাড়া)
app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        vercel: !!process.env.VERCEL,
    });
});
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: `${config_1.schoolConfig.nameEn} ERP API`,
        version: "1.0.0",
        endpoints: {
            api: "/api/v1",
            health: "/health",
        },
    });
});
// API Routes
app.use("/api/v1", routes_1.default);
// 404 Handler
app.use("*", (_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map