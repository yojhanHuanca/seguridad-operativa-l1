import { Router } from "express";
import { requireRoles } from "../../middlewares/auth.middleware.js";
import { ImportacionController } from "./importacion.controller.js";

const router = Router();

router.post("/casos/validar", requireRoles("Admin"), ImportacionController.validar);
router.post("/casos/importar", requireRoles("Admin"), ImportacionController.importar);

export default router;
