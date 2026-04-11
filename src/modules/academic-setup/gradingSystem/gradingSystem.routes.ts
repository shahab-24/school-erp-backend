import { Router } from "express";
import { GradingSystemController } from "./gradingSystem.controller";

const router = Router();
router.get("/", GradingSystemController.list);
router.post("/", GradingSystemController.create);
router.patch("/:id", GradingSystemController.update);
router.delete("/:id", GradingSystemController.remove);

export default router;
