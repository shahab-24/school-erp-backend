// api/index.ts
import app from "../src/app";
import connectDB from "../src/utils/db";

// ✅ Global cache for serverless (prevents multiple connections)
let isConnected = false;

export default async function handler(req: any, res: any) {
  try {
    // ✅ Connect to MongoDB only once
    if (!isConnected) {
      console.log("🔄 Connecting to MongoDB in serverless...");
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB connected successfully");
    }

    // ✅ CORS headers for production
    const allowedOrigins = [
      "http://localhost:3000",
      "https://school-erp-frontend-one.vercel.app",
      "https://school-erp-frontend-8bpr16bo5-shahab-uddins-projects.vercel.app",
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return app(req, res);
  } catch (error) {
    console.error("❌ Serverless function error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
