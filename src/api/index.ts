// src/api/index.ts
import app from "../app";
import connectDB from "../utils/db";

// let isConnected = false;

export default async function handler(req: any, res: any) {
  try {
    // MongoDB connection for Vercel
    // if (!isConnected) {
    //   console.log("🔄 Connecting to MongoDB...");
    //   await connectDB();
    //   isConnected = true;
    // }
    await connectDB();
      console.log("✅ MongoDB connected");
    // CORS headers
    const allowedOrigins = [
      "http://localhost:3000",
      "https://school-erp-frontend-one.vercel.app",
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
      "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return app(req, res);
  } catch (error: any) {
    console.error("❌ Serverless error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
