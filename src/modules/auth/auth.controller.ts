import { Request, Response } from "express";
import { loginSchema } from "./auth.validation";
import { AuthRequest } from "./auth.middleware";
import { User } from "./auth.model";
import { AuthService, generateTokens } from "./auth.service";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      console.log("📥 Login request body:", req.body);

      const { email, password } = req.body;
      const data = await AuthService.login(email, password);

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
    } catch (error: any) {
      console.error("❌ Login error:", error);
      res.status(401).json({
        success: false,
        message: error.message || "Login failed",
      });
    }
  },

  async logout(req: AuthRequest, res: Response) {
    res.clearCookie("token");
    res.clearCookie("refreshToken");

    res.json({
      success: true,
    });
  },

  async me(req: AuthRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await User.findById(req.user.userId).select("-passwordHash");

    res.json({
      success: true,
      user,
    });
  },

  async csrf(req: Request, res: Response) {
    res.json({
      csrfToken: req.csrfToken(),
    });
  },

  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const schoolId = new Types.ObjectId();

    const user = await User.create({
      email,
      passwordHash,
      role: "SCHOOL_ADMIN",
      schoolId,
    });

    res.json({ success: true, user });
  },
};
