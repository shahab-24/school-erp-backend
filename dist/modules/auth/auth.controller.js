"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_model_1 = require("./auth.model");
const auth_service_1 = require("./auth.service");
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.AuthController = {
    async login(req, res) {
        try {
            console.log("📥 Login request body:", req.body);
            const { email, password } = req.body;
            const data = await auth_service_1.AuthService.login(email, password);
            // ✅ টোকেন কুকিতে সেট করুন (HttpOnly, Secure)
            res.cookie("token", data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            res.json({
                success: true,
                token: data.token,
                user: data.user,
                role: data.role,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            console.error("❌ Login error:", error);
            res.status(401).json({
                success: false,
                message: error.message || "Login failed",
            });
        }
    },
    async logout(req, res) {
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        res.json({
            success: true,
        });
    },
    async me(req, res) {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated",
            });
        }
        const user = await auth_model_1.User.findById(req.user.userId).select("-passwordHash");
        res.json({
            success: true,
            user,
        });
    },
    async csrf(req, res) {
        res.json({
            csrfToken: req.csrfToken(),
        });
    },
    async register(req, res) {
        const { email, password } = req.body;
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const schoolId = new mongoose_1.Types.ObjectId();
        const user = await auth_model_1.User.create({
            email,
            passwordHash,
            role: "SCHOOL_ADMIN",
            schoolId,
        });
        res.json({ success: true, user });
    },
};
