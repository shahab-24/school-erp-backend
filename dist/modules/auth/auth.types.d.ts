export type Role = "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "VIEWER";
export interface JwtPayload {
    userId: string;
    role: Role;
    email?: string;
    schoolId?: string;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export interface AuthResponse {
    success: boolean;
    token: string;
    role: Role;
    user: {
        id: string;
        email: string;
        role: Role;
        name?: string;
        lastLogin?: Date;
    };
}
