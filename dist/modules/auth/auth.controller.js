"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_validation_1 = require("./auth.validation");
const auth_model_1 = require("./auth.model");
const auth_service_1 = require("./auth.service");
exports.AuthController = {
    async login(req, res) {
        try {
            const { email, password } = auth_validation_1.loginSchema.parse(req.body);
            const data = await auth_service_1.AuthService.login(email, password);
            const { accessToken, refreshToken } = (0, auth_service_1.generateTokens)({
                userId: data.user.id,
                role: data.user.role,
                email: data.user.email,
            });
            res.cookie("token", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 15 * 60 * 1000,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.json({
                success: true,
                user: data.user,
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
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
};
