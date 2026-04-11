"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/modules/auth/auth.model.ts
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: { type: String },
    name: { type: String },
    schoolId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
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
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
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
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
