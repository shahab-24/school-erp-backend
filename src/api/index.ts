import app from "../app";
import connectDB from "../utils/db";

let isConnected = false;

export default async function handler(req: any, res: any) {
  try {
    if (!isConnected) {
      console.log("Ì¥Ñ Connecting to MongoDB...");
      await connectDB();
      isConnected = true;
      console.log("‚úÖ MongoDB connected");
    }

    const allowedOrigins = [
      "http://localhost:3000",
      "https://school-erp-frontend-one.vercel.app",
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return app(req, res);
  } catch (error) {
    console.error("‚ùå Serverless error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
