import { Router } from "express";
import { DashboardController } from "./dashboard.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

// El cliente pidió este dashboard para Seguridad Operativa y Jefe de Área,
// expresamente NO para Monitorista.
router.get("/indicadores", requireRoles("Seguridad Operativa", "Jefe de Área", "Admin"), DashboardController.getIndicadores);

export default router;
