import { Router } from "express";
import { AuditoriaController } from "./auditoria.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

// Solo Admin: es el registro de quién hizo qué en el sistema.
router.get("/", requireRoles("Admin"), AuditoriaController.getAll);
router.get("/tablas", requireRoles("Admin"), AuditoriaController.getTablas);

export default router;
