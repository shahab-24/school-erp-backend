// // src/modules/auth/auth.service.ts
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User, IUser } from "./auth.model";
// import { JwtPayload, Role, AuthResponse } from "./auth.types";
// import { env } from "../../core/config/env";





// const JWT_SECRET = env.JWT_SECRET;
// const JWT_EXPIRES = env.JWT_EXPIRES_IN || "7d";

// const REFRESH_SECRET = env.JWT_REFRESH_SECRET;

// export const generateTokens = (payload: JwtPayload) => {
//   const accessToken = jwt.sign(payload, JWT_SECRET, {
//     expiresIn: "15m",
//   });

//   const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
//     expiresIn: "7d",
//   });

//   return { accessToken, refreshToken };
// };

// export const AuthService = {
//   async login(email: string, password: string): Promise<AuthResponse> {
//     try {
//       if (!email || !password) {
//         throw new Error("Email and password are required");
//       }

//       const user = await User.findOne({
//         email: email.toLowerCase().trim(),
//         isActive: true,
//       });

//       if (!user) {
//         throw new Error("Invalid credentials");
//       }

//       if (!user.passwordHash) {
//         throw new Error("Account not properly configured");
//       }

//       const isValid = await bcrypt.compare(password, user.passwordHash);
//       if (!isValid) {
//         throw new Error("Invalid credentials");
//       }

//       // ✅ user.email টাইপ চেক করা
//       const userEmail = user.email || "";

//       const payload: JwtPayload = {
//         userId: user._id.toString(),
//         role: user.role as Role, // ✅ টাইপ কাস্ট করা
//         email: userEmail,
//       };

//       // ✅ JWT সিগনেচার ঠিক করা
//       const token = jwt.sign(payload, JWT_SECRET, {
//         expiresIn: JWT_EXPIRES as jwt.Secret,
//         issuer: "school-erp",
//         audience: "school-erp-users",
//       } as jwt.SignOptions);

//       // লাস্ট লগিন আপডেট
//       user.lastLogin = new Date();
//       await user.save();

//       return {
//         success: true,
//         token,
//         role: user.role as Role,
//         user: {
//           id: user._id.toString(),
//           email: userEmail,
//           role: user.role as Role,
//           name: user.name || userEmail.split("@")[0],
//           lastLogin: user.lastLogin,
//         },
//       };
//     } catch (error: any) {
//       console.error("AuthService.login error:", error);
//       throw error;
//     }
//   },
// };
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./auth.model";
import { JwtPayload, Role, AuthResponse } from "./auth.types";
import { env } from "../../core/config/env";

const ACCESS_SECRET = env.JWT_SECRET;
const REFRESH_SECRET = env.JWT_REFRESH_SECRET;

export const generateTokens = (payload: JwtPayload) => {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
    issuer: "school-erp",
    audience: "school-erp-users",
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
    issuer: "school-erp",
    audience: "school-erp-users",
  });

  return { accessToken, refreshToken };
};

export const AuthService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      isActive: true,
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // 🔥 CRITICAL CHECK
    if (!user.schoolId) {
      throw new Error("User is not assigned to any school");
    }

    // ✅ NO VALIDATION TRIGGER
    await User.updateOne({ _id: user._id }, { lastLogin: new Date() });

    const userEmail = user.email || "";

    const payload: JwtPayload = {
      userId: user._id.toString(),
      schoolId: user.schoolId.toString(),
      role: user.role,
      email: userEmail,
    };

    const { accessToken } = generateTokens(payload);

    return {
      success: true,
      token: accessToken,
      role: user.role as Role,
      user: {
        id: user._id.toString(),
        email: userEmail,
        role: user.role as Role,
        name: user.name || userEmail.split("@")[0],
        lastLogin: new Date(),
      },
    };
  },
};