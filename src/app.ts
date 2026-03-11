// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes";
import { errorHandler } from "./core/errors/error.middleware";
// import csrf from "csurf";

const app = express();

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourfrontend.com"]
        : ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  })
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
app.use("/api/v1", routes);

// 404 Handler
app.use("*", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: _req.originalUrl,
  });
});

app.use(errorHandler);

export default app;
