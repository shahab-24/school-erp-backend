import { Types } from "mongoose";
import "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        schoolId: string;
        role: string;
        email?: string;
      };
    }
  }
}

export {};
