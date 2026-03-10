import { Document } from "mongoose";
import { Role } from "./auth.types";
import { HydratedDocument } from "mongoose";
export interface IUser {
    email: string;
    passwordHash: string;
    name?: string;
    role: Role;
    studentUid?: string;
    teacherId?: string;
    isActive: boolean;
    lastLogin?: Date;
}
export type UserDocument = HydratedDocument<IUser>;
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
