import { Router } from "express";
import { ExamTypeController } from "./examType.controller";

const router = Router();

router.get("/", ExamTypeController.list);
router.post("/", ExamTypeController.create);
router.patch("/:id", ExamTypeController.update);
router.patch("/:id/toggle", ExamTypeController.toggle);
router.delete("/:id", ExamTypeController.remove);

export default router;
