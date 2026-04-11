// src/modules/auth/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../core/config/env";
export interface AuthRequest extends Request {
  user: {
    userId: string;
    schoolId: string; // ✅ ADD THIS
    role: string;
    email?: string;
  };
}
export const authenticate = () => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
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
      const decoded = jwt.verify(token, env.JWT_SECRET) as any;

      // 🔥 MUST INCLUDE schoolId
      req.user = {
        userId: decoded.userId,
        schoolId: decoded.schoolId, // ✅ FIX
        role: decoded.role,
        email: decoded.email,
      };

      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message:
          error.name === "TokenExpiredError"
            ? "Token expired"
            : "Invalid token",
      });
    }
  };
};