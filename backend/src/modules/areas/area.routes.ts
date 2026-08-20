import { Router } from "express";
import { AreaController } from "./area.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", AreaController.getAll);
router.post("/", requireRoles("Admin"), AreaController.create);
router.patch("/:id", requireRoles("Admin"), AreaController.update);
router.delete("/:id", requireRoles("Admin"), AreaController.remove);

export default router;
