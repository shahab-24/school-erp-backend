import { Request, Response } from "express";
import { AuthRequest } from "./auth.middleware";
export declare const AuthController: {
    login(req: Request, res: Response): Promise<void>;
    logout(req: AuthRequest, res: Response): Promise<void>;
    me(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    csrf(req: Request, res: Response): Promise<void>;
};
