"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./core/errors/error.middleware");
// import csrf from "csurf";
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === "production"
        ? ["https://yourfrontend.com"]
        : ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
}));
app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// ✅ CSRF protection - সঠিক কনফিগারেশন
// const csrfProtection = csrf({
//   cookie: {
//     key: "_csrf",
//     httpOnly: true,
//     sameSite: "lax",
//     secure: process.env.NODE_ENV === "production",
//   },
// });
// ✅ CSRF token endpoint (public - no CSRF protection)
// app.get("/api/v1/csrf-token", (req, res) => {
//   // Generate CSRF token
//   csrfProtection(req, res, () => {
//     res.json({
//       success: true,
//       csrfToken: req.csrfToken(),
//     });
//   });
// });
// ✅ Apply CSRF protection to all non-GET routes except specific public routes
// app.use((req, res, next) => {
//   // Skip CSRF for:
//   // 1. GET and HEAD requests
//   // 2. OPTIONS requests (preflight)
//   // 3. Login endpoint (public)
//   // 4. CSRF token endpoint (public)
//   if (
//     req.method === "GET" ||
//     req.method === "HEAD" ||
//     req.method === "OPTIONS"
//   ) {
//     return next();
//   }
//   if (req.path === "/api/v1/auth/login" ) {
//     return next();
//   }
//   // Apply CSRF protection to all other non-GET routes
//   csrfProtection(req, res, next);
// });
// Health check
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// API Routes
app.use("/api/v1", routes_1.default);
// 404 Handler
app.use("*", (_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: _req.originalUrl,
    });
});
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map