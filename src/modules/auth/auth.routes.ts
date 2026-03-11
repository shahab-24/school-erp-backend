// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "./auth.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.get("/me", authenticate(), AuthController.me);
router.post("/logout", authenticate(), AuthController.logout); // ✅ নতুন রুট

router.get("/csrf-token", AuthController.csrf);
export default router;
