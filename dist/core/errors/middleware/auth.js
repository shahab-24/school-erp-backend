"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpErrors_1 = require("../httpErrors");
const auth = () => {
    return (req, _res, next) => {
        let token;
        const authHeader = req.headers.authorization;
        // 1️⃣ Authorization header
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        // 2️⃣ Cookie fallback
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }
        if (!token) {
            throw new httpErrors_1.UnauthorizedError("Token missing");
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = {
                userId: decoded.userId,
                schoolId: decoded.schoolId,
                role: decoded.role,
            };
            next();
        }
        catch {
            throw new httpErrors_1.UnauthorizedError("Invalid or expired token");
        }
    };
};
exports.auth = auth;
