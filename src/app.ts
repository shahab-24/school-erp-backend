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
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes";
import { errorHandler } from "./core/errors/error.middleware";
import { csrfProtection } from "./middlewares/csrf.middleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// API routes
app.use("/api/v1", routes);

// health
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

export default app;