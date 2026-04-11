"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../core/config/env");
const authenticate = () => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        let token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;
        if (!token) {
            token = req.cookies?.token;
        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
            // 🔥 MUST INCLUDE schoolId
            req.user = {
                userId: decoded.userId,
                schoolId: decoded.schoolId, // ✅ FIX
                role: decoded.role,
                email: decoded.email,
            };
            next();
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: error.name === "TokenExpiredError"
                    ? "Token expired"
                    : "Invalid token",
            });
        }
    };
};
exports.authenticate = authenticate;
