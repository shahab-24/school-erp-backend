// src/utils/logger.ts
import winston from "winston";

// Environment check
const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.NODE_ENV === "production";
const isLocal = !isVercel && process.env.NODE_ENV === "development";

// কাস্টম ফরম্যাট
const customFormat = winston.format.printf(
  ({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ""
    }`;
  }
);

// শুধু কনসোল ট্রান্সপোর্ট (Vercel এর জন্য)
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.errors({ stack: true }),
      customFormat
    ),
  }),
];

// লোকাল ডেভেলপমেন্টের জন্য ফাইল ট্রান্সপোর্ট (শুধু লোকাল)
if (isLocal) {
  try {
    const fs = require("fs");
    const path = require("path");

    const logsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    transports.push(
      new winston.transports.File({
        filename: path.join(logsDir, "error.log"),
        level: "error",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
      new winston.transports.File({
        filename: path.join(logsDir, "combined.log"),
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      })
    );

    console.log("📝 File logging enabled for development");
  } catch (error) {
    if (error instanceof Error) {
      console.warn("⚠️ Could not create logs directory:", error.message);
    } else {
      console.warn("⚠️ Could not create logs directory:", String(error));
    }
  }
}

// Logger তৈরি
const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat()
  ),
  defaultMeta: {
    service: "school-erp-backend",
    environment: isVercel ? "vercel" : process.env.NODE_ENV || "development",
  },
  transports,
});

if (isVercel) {
  console.log("📡 Logger initialized in Vercel environment (console only)");
} else {
  console.log(
    `📝 Logger initialized in ${process.env.NODE_ENV || "development"} mode`
  );
}

export const Logger = logger;
