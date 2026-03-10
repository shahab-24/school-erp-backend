"use strict";
// // src/modules/auth/auth.service.ts
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User, IUser } from "./auth.model";
// import { JwtPayload, Role, AuthResponse } from "./auth.types";
// import { env } from "../../core/config/env";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.generateTokens = void 0;
// const JWT_SECRET = env.JWT_SECRET;
// const JWT_EXPIRES = env.JWT_EXPIRES_IN || "7d";
// const REFRESH_SECRET = env.JWT_REFRESH_SECRET;
// export const generateTokens = (payload: JwtPayload) => {
//   const accessToken = jwt.sign(payload, JWT_SECRET, {
//     expiresIn: "15m",
//   });
//   const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
//     expiresIn: "7d",
//   });
//   return { accessToken, refreshToken };
// };
// export const AuthService = {
//   async login(email: string, password: string): Promise<AuthResponse> {
//     try {
//       if (!email || !password) {
//         throw new Error("Email and password are required");
//       }
//       const user = await User.findOne({
//         email: email.toLowerCase().trim(),
//         isActive: true,
//       });
//       if (!user) {
//         throw new Error("Invalid credentials");
//       }
//       if (!user.passwordHash) {
//         throw new Error("Account not properly configured");
//       }
//       const isValid = await bcrypt.compare(password, user.passwordHash);
//       if (!isValid) {
//         throw new Error("Invalid credentials");
//       }
//       // ✅ user.email টাইপ চেক করা
//       const userEmail = user.email || "";
//       const payload: JwtPayload = {
//         userId: user._id.toString(),
//         role: user.role as Role, // ✅ টাইপ কাস্ট করা
//         email: userEmail,
//       };
//       // ✅ JWT সিগনেচার ঠিক করা
//       const token = jwt.sign(payload, JWT_SECRET, {
//         expiresIn: JWT_EXPIRES as jwt.Secret,
//         issuer: "school-erp",
//         audience: "school-erp-users",
//       } as jwt.SignOptions);
//       // লাস্ট লগিন আপডেট
//       user.lastLogin = new Date();
//       await user.save();
//       return {
//         success: true,
//         token,
//         role: user.role as Role,
//         user: {
//           id: user._id.toString(),
//           email: userEmail,
//           role: user.role as Role,
//           name: user.name || userEmail.split("@")[0],
//           lastLogin: user.lastLogin,
//         },
//       };
//     } catch (error: any) {
//       console.error("AuthService.login error:", error);
//       throw error;
//     }
//   },
// };
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("./auth.model");
const env_1 = require("../../core/config/env");
const ACCESS_SECRET = env_1.env.JWT_SECRET;
const REFRESH_SECRET = env_1.env.JWT_REFRESH_SECRET;
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_SECRET, {
        expiresIn: "15m",
        issuer: "school-erp",
        audience: "school-erp-users",
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, {
        expiresIn: "7d",
        issuer: "school-erp",
        audience: "school-erp-users",
    });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
exports.AuthService = {
    async login(email, password) {
        const user = await auth_model_1.User.findOne({
            email: email.toLowerCase().trim(),
            isActive: true,
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }
        user.lastLogin = new Date();
        await user.save();
        const userEmail = user.email || "";
        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: userEmail,
        };
        const { accessToken } = (0, exports.generateTokens)(payload);
        return {
            success: true,
            token: accessToken,
            role: user.role,
            user: {
                id: user._id.toString(),
                email: userEmail,
                role: user.role,
                name: user.name || userEmail.split("@")[0],
                lastLogin: user.lastLogin,
            },
        };
    },
};
//# sourceMappingURL=auth.service.js.map