import { Router } from "express";
import { GradingSystemController } from "./gradingSystem.controller";

const router = Router();

router.post("/", GradingSystemController.create);

router.get("/", GradingSystemController.list);

export default router;
