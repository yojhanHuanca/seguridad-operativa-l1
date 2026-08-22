import { Router } from "express";
import { AuditoriaController } from "./auditoria.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

// La auditoría del sistema pertenece al Centro de Administración.
// "/export" y "/tablas" antes de cualquier ruta con parámetro para que no la capturen.
router.get("/", requireRoles("Admin"), AuditoriaController.getAll);
router.get("/tablas", requireRoles("Admin"), AuditoriaController.getTablas);
router.get("/counts", requireRoles("Admin"), AuditoriaController.getCounts);
router.get("/export", requireRoles("Admin"), AuditoriaController.exportarCsv);

export default router;
