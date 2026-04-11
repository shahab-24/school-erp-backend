// // // src/app.ts
// // import express from "express";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";
// // import helmet from "helmet";
// // import compression from "compression";
// // import routes from "./routes";
// // import { errorHandler } from "./core/errors/error.middleware";
// // // import csrf from "csurf";

// // const app = express();
// // const allowedOrigins = [
// //   "http://localhost:3000",
// //   "https://school-erp-frontend-one.vercel.app",
// //   "https://school-erp-frontend-8bpr16bo5-shahab-uddins-projects.vercel.app",
// // ];

// // // CORS configuration
// // app.use(
// //   cors({
// //     origin: (origin, callback) => {
// //       if (
// //         !origin ||
// //         allowedOrigins.includes(origin) ||
// //         process.env.NODE_ENV !== "production"
// //       ) {
// //         callback(null, true);
// //       } else {
// //         console.log("❌ Blocked origin:", origin);
// //         callback(new Error("Not allowed by CORS"));
// //       }
// //     },
// //     credentials: true,
// //     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
// //   })
// // );

// // app.use(helmet({ contentSecurityPolicy: false }));
// // app.use(compression());
// // app.use(express.json({ limit: "10mb" }));
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // // ✅ CSRF protection - সঠিক কনফিগারেশন
// // // const csrfProtection = csrf({
// // //   cookie: {
// // //     key: "_csrf",
// // //     httpOnly: true,
// // //     sameSite: "lax",
// // //     secure: process.env.NODE_ENV === "production",
// // //   },
// // // });

// // // ✅ CSRF token endpoint (public - no CSRF protection)
// // // app.get("/api/v1/csrf-token", (req, res) => {
// // //   // Generate CSRF token
// // //   csrfProtection(req, res, () => {
// // //     res.json({
// // //       success: true,
// // //       csrfToken: req.csrfToken(),
// // //     });
// // //   });
// // // });

// // // ✅ Apply CSRF protection to all non-GET routes except specific public routes
// // // app.use((req, res, next) => {
// // //   // Skip CSRF for:
// // //   // 1. GET and HEAD requests
// // //   // 2. OPTIONS requests (preflight)
// // //   // 3. Login endpoint (public)
// // //   // 4. CSRF token endpoint (public)

// // //   if (
// // //     req.method === "GET" ||
// // //     req.method === "HEAD" ||
// // //     req.method === "OPTIONS"
// // //   ) {
// // //     return next();
// // //   }

// // //   if (req.path === "/api/v1/auth/login" ) {
// // //     return next();
// // //   }

// // //   // Apply CSRF protection to all other non-GET routes
// // //   csrfProtection(req, res, next);
// // // });

// // // Health check
// // app.get("/health", (_req, res) => {
// //   res.json({ status: "ok", timestamp: new Date().toISOString() });
// // });

// // // API Routes
// // app.use("/api/v1", routes);

// // // 404 Handler
// // app.use("*", (_req, res) => {
// //   res.status(404).json({
// //     success: false,
// //     message: "Route not found",
// //     path: _req.originalUrl,
// //   });
// // });

// // app.use(errorHandler);

// // export default app;
// // src/app.ts - MongoDB connection এখানে করবেন না
// // কারণ serverless function আলাদাভাবে handle করে

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";
// import compression from "compression";
// import routes from "./routes";
// import { errorHandler } from "./core/errors/error.middleware";

// const app = express();

// // CORS configuration (dynamic for production)
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         "http://localhost:3000",
//         "https://school-erp-frontend-one.vercel.app",
//       ];
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(helmet({ contentSecurityPolicy: false }));
// app.use(compression());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Health check
// app.get("/health", (_req, res) => {
//   res.json({ status: "ok", timestamp: new Date().toISOString() });
// });

// // API Routes
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
// src/app.ts – শুধু middleware আর routes থাকবে, কোনো connectDB() নেই
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes";
import { errorHandler } from "./core/errors/error.middleware";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "http://localhost:3000",
        "https://school-erp-frontend-one.vercel.app",
      ];
      if (!origin || allowed.includes(origin)) callback(null, true);
      else callback(new Error("CORS blocked"));
    },
    credentials: true,
  })
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "API is running 🚀",
  });
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/v1", routes);



app.use("*", (_req, res) =>
  res.status(404).json({ success: false, message: "Route not found" })
);
app.use(errorHandler);

export default app;