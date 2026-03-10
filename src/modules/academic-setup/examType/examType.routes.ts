import { Router } from "express";
import { ExamTypeController } from "./examType.controller";

const router = Router();

router.post("/", ExamTypeController.create);

router.get("/", ExamTypeController.list);

export default router;
