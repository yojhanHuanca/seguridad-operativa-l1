import express, { Router } from "express";
import { requireRoles } from "../../middlewares/auth.middleware.js";
import { ImportacionController } from "./importacion.controller.js";
const router = Router();
// Solo estas rutas aceptan cuerpos grandes (ver app.ts): el histórico completo
// llega como JSON desde el navegador y pesa varios MB.
const jsonImportacion = express.json({ limit: "64mb" });
router.post("/casos/validar", jsonImportacion, requireRoles("Admin"), ImportacionController.validar);
router.post("/casos/importar", jsonImportacion, requireRoles("Admin"), ImportacionController.importar);
router.post("/contingencias/validar", jsonImportacion, requireRoles("Admin"), ImportacionController.validarContingencias);
router.post("/contingencias/importar", jsonImportacion, requireRoles("Admin"), ImportacionController.importarContingencias);
router.post("/monitoreo/validar", jsonImportacion, requireRoles("Admin"), ImportacionController.validarMonitoreo);
router.post("/monitoreo/importar", jsonImportacion, requireRoles("Admin"), ImportacionController.importarMonitoreo);
export default router;
//# sourceMappingURL=importacion.routes.js.map