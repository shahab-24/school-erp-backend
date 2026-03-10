import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../core/config/env";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    email?: string;
  };
}

export const authenticate = () => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as any;

      req.user = {
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email,
      };

      next();
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};
