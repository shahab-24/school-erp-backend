import { Request, Response, NextFunction } from "express";
export declare const StudentController: {
    create: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    list: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    sessions: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    classes: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    stats: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    roster: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    get: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    updateStatus: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    promote: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    bulkPromote: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    updateStipendBeneficiary: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    getStipendBeneficiary: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    updateImage: (req: Request, res: Response, next: NextFunction) => Promise<any>;
};
