import { Request, Response } from "express";
import { loginSchema } from "./auth.validation";
import { AuthRequest } from "./auth.middleware";
import { User } from "./auth.model";
import { AuthService, generateTokens } from "./auth.service";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const data = await AuthService.login(email, password);

      const { accessToken, refreshToken } = generateTokens({
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
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
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
};
