// src/app.ts - ফাইনাল ভার্সন
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { schoolConfig } from "./config";
import { Logger } from "./utils/logger";
import routes from "./routes";
import { errorHandler } from "./core/errors/error.middleware";

const app = express();

// Security - production এ কঠোর, development এ নমনীয়
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production"
        ? {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              scriptSrc: ["'self'"],
              imgSrc: ["'self'", "data:", "https:"],
            },
          }
        : false,
  })
);

// CORS - environment based
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.FRONTEND_URL || "https://yourdomain.com"]
        : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

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
    message: `${schoolConfig.nameEn} ERP API`,
    version: "1.0.0",
    endpoints: {
      api: "/api/v1",
      health: "/health",
    },
  });
});

// API Routes
app.use("/api/v1", routes);

// 404 Handler
app.use("*", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

export default app;
