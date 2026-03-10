import { Router } from "express";
import { MarkStructureController } from "./markStructure.controller";

const router = Router();

router.post("/", MarkStructureController.create);

router.get("/", MarkStructureController.list);

export default router;
