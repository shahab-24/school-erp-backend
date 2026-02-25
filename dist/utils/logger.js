"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// src/utils/logger.ts
const winston_1 = __importDefault(require("winston"));
// Environment check
const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.NODE_ENV === "production";
// কাস্টম ফরম্যাট
const customFormat = winston_1.default.format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
});
// শুধু কনসোল ট্রান্সপোর্ট (Vercel এর জন্য)
const consoleTransport = new winston_1.default.transports.Console({
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.errors({ stack: true }), customFormat),
});
// লোকাল ডেভেলপমেন্টের জন্য ফাইল ট্রান্সপোর্ট
const fileTransports = [];
if (!isVercel && !isProduction) {
    // লোকাল ডেভেলপমেন্টে শুধু ফাইল ট্রান্সপোর্ট যোগ করুন
    try {
        const fs = require("fs");
        const path = require("path");
        // logs ফোল্ডার চেক/ক্রিয়েট করুন
        const logsDir = path.join(process.cwd(), "logs");
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
        fileTransports.push(new winston_1.default.transports.File({
            filename: path.join(logsDir, "error.log"),
            level: "error",
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
        }), new winston_1.default.transports.File({
            filename: path.join(logsDir, "combined.log"),
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
        }));
        console.log("📝 File logging enabled for development");
    }
    catch (error) {
        console.warn("⚠️ Could not create logs directory:", error.message);
    }
}
// Logger তৈরি
const logger = winston_1.default.createLogger({
    level: isProduction ? "info" : "debug",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat()),
    defaultMeta: {
        service: "school-erp-backend",
        environment: isVercel ? "vercel" : process.env.NODE_ENV || "development",
    },
    transports: [consoleTransport, ...fileTransports],
});
// Vercel environment এ লগিং টেস্ট
if (isVercel) {
    logger.info("📡 Logger initialized in Vercel environment (console only)");
}
else {
    logger.info(`📝 Logger initialized in ${process.env.NODE_ENV || "development"} mode`);
}
exports.Logger = logger;
//# sourceMappingURL=logger.js.map