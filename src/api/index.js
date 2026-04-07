"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// api/index.ts
const app_1 = __importDefault(require("../src/app"));
const db_1 = __importDefault(require("../src/utils/db"));
let isConnected = false;
async function handler(req, res) {
    try {
        if (!isConnected) {
            console.log("🔄 Connecting to MongoDB in serverless...");
            await (0, db_1.default)();
            isConnected = true;
            console.log("✅ MongoDB connected");
        }
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
        res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        if (req.method === "OPTIONS") {
            res.status(200).end();
            return;
        }
        return (0, app_1.default)(req, res);
    }
    catch (error) {
        console.error("❌ Serverless error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
