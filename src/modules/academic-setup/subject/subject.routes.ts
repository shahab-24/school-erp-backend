import { Router } from "express";
import { SubjectController } from "./subject.controller";

const router = Router();

router.post("/", SubjectController.create);

router.get("/", SubjectController.list);
router.patch("/:id", SubjectController.update);
router.delete("/:id", SubjectController.remove);
export default router;
