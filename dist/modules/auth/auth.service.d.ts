import { JwtPayload, AuthResponse } from "./auth.types";
export declare const generateTokens: (payload: JwtPayload) => {
    accessToken: string;
    refreshToken: string;
};
export declare const AuthService: {
    login(email: string, password: string): Promise<AuthResponse>;
};
