import { Router } from "express";
import { AuditoriaController } from "./auditoria.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

// Admin y Seguridad Operativa revisan trazabilidad del flujo SOP.
router.get("/", requireRoles("Admin", "Seguridad Operativa"), AuditoriaController.getAll);
router.get("/tablas", requireRoles("Admin", "Seguridad Operativa"), AuditoriaController.getTablas);

export default router;
