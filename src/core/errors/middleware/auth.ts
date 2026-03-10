import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../httpErrors";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const auth = () => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    let token: string | undefined;

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
      throw new UnauthorizedError("Token missing");
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      req.user = {
        userId: decoded.userId,
        role: decoded.role,
      };

      next();
    } catch {
      throw new UnauthorizedError("Invalid or expired token");
    }
  };
};
