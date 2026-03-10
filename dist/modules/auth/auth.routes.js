"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/auth/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("./auth.middleware");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.AuthController.login);
router.get("/me", (0, auth_middleware_1.authenticate)(), auth_controller_1.AuthController.me);
router.post("/logout", (0, auth_middleware_1.authenticate)(), auth_controller_1.AuthController.logout); // ✅ নতুন রুট
router.get("/csrf-token", auth_controller_1.AuthController.csrf);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map