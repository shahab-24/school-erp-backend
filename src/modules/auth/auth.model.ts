// src/modules/auth/auth.model.ts
import { Schema, model, Document } from "mongoose";
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

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String },
    name: { type: String },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "STUDENT", "VIEWER"],
      required: true,
      index: true,
    },

    studentUid: { type: String },
    teacherId: { type: String },

    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret: any) => {
        return {
          id: ret._id,
          email: ret.email,
          name: ret.name,
          role: ret.role,
          studentUid: ret.studentUid,
          teacherId: ret.teacherId,
          isActive: ret.isActive,
          lastLogin: ret.lastLogin,
          createdAt: ret.createdAt,
          updatedAt: ret.updatedAt,
        };
      },
    },
  }
);

export const User = model<IUser>("User", UserSchema);
