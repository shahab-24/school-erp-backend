"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvironment = exports.schoolConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../utils/logger");
dotenv_1.default.config();
// School configuration
exports.schoolConfig = {
    nameEn: process.env.SCHOOL_NAME_EN || "School Name",
    nameBn: process.env.SCHOOL_NAME_BN || "বিদ্যালয়ের নাম",
    established: parseInt(process.env.SCHOOL_ESTABLISHED || "2000"),
    phone: process.env.SCHOOL_PHONE || "",
    address: process.env.SCHOOL_ADDRESS || "",
    email: process.env.SCHOOL_EMAIL || "",
    logoUrl: process.env.SCHOOL_LOGO_URL || "/logo.png",
};
// Database connection function
// export const connectDB = async (options?: mongoose.ConnectOptions) => {
//   try {
//     const mongoUri = process.env.MONGO_URI;
//     if (!mongoUri) {
//       throw new Error("MONGO_URI is not defined in environment variables");
//     }
//     // Connection options
//     const connectionOptions: mongoose.ConnectOptions = {
//       ...options,
//       maxPoolSize: 10,
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000,
//       family: 4, // Use IPv4, skip trying IPv6
//     };
//     // Connect to MongoDB
//     await mongoose.connect(mongoUri, connectionOptions);
//     // Connection event handlers
//     mongoose.connection.on("connected", () => {
//       Logger.info(`✅ MongoDB connected to: ${mongoose.connection.name}`);
//     });
//     mongoose.connection.on("error", (error) => {
//       Logger.error("❌ MongoDB connection error:", error);
//     });
//     mongoose.connection.on("disconnected", () => {
//       Logger.warn("⚠️ MongoDB disconnected");
//     });
//     // Handle process termination
//     process.on("SIGINT", async () => {
//       await mongoose.connection.close();
//       Logger.info("MongoDB connection closed due to app termination");
//       process.exit(0);
//     });
//   } catch (error: any) {
//     Logger.error("❌ Failed to connect to MongoDB:", error.message);
//     // Provide helpful error messages
//     if (error.name === "MongoServerSelectionError") {
//       Logger.error(
//         "💡 Tip: Check your MongoDB Atlas connection string and network access"
//       );
//     }
//     throw error;
//   }
// };
// Environment validation
const validateEnvironment = () => {
    const required = ["MONGO_URI", "JWT_SECRET", "SCHOOL_NAME_EN"];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        logger_1.Logger.error("❌ Missing required environment variables:", missing);
        throw new Error(`Missing environment variables: ${missing.join(", ")}`);
    }
    // Validate JWT secret length in production
    if (process.env.NODE_ENV === "production" && process.env.JWT_SECRET) {
        if (process.env.JWT_SECRET.length < 32) {
            logger_1.Logger.warn("⚠️ JWT_SECRET is less than 32 characters - not secure for production");
        }
    }
    logger_1.Logger.info("✅ Environment validation passed");
    return true;
};
exports.validateEnvironment = validateEnvironment;
// Export configuration
exports.default = {
    schoolConfig: exports.schoolConfig,
    // connectDB,
    validateEnvironment: exports.validateEnvironment,
};
//# sourceMappingURL=index.js.map