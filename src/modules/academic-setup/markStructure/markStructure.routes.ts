import { Router } from "express";
import { MarkStructureController } from "./markStructure.controller";

const router = Router();

router.get("/", MarkStructureController.list);
router.post("/", MarkStructureController.create);
router.patch("/:id", MarkStructureController.update);
router.delete("/:id", MarkStructureController.remove);

export default router;
