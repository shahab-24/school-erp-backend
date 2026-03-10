import { Router } from "express";
import { SubjectController } from "./subject.controller";

const router = Router();

router.post("/", SubjectController.create);

router.get("/", SubjectController.list);

export default router;
