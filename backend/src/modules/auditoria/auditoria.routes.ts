import { Router } from "express";
import { AuditoriaController } from "./auditoria.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

// Admin y Seguridad Operativa revisan trazabilidad del flujo SOP.
// "/export" y "/tablas" antes de cualquier ruta con parámetro para que no la capturen.
router.get("/", requireRoles("Admin", "Seguridad Operativa"), AuditoriaController.getAll);
router.get("/tablas", requireRoles("Admin", "Seguridad Operativa"), AuditoriaController.getTablas);
router.get("/export", requireRoles("Admin", "Seguridad Operativa"), AuditoriaController.exportarCsv);

export default router;
