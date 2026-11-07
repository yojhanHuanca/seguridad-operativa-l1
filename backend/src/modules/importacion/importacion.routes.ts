import express, { Router } from "express";
import { requireRoles } from "../../middlewares/auth.middleware.js";
import { ImportacionController } from "./importacion.controller.js";
import { UsersImportController } from "../users/users-import.controller.js";

const router = Router();

// Solo estas rutas aceptan cuerpos grandes (ver app.ts): el histórico completo
// llega como JSON desde el navegador y pesa varios MB.
const jsonImportacion = express.json({ limit: "64mb" });

// Permisos por tipo de carga acordados para cada panel. La autorización se
// valida aquí, en el servidor; ocultar pestañas o rutas en el frontend no basta.
const rolesImportacion = {
  casos: ["Admin", "Seguridad Operativa"],
  contingencias: ["Admin", "Monitorista", "Gestión de Planes de Contingencia"],
  monitoreo: ["Admin", "Monitorista"],
  datosOperativos: ["Admin", "Seguridad Operativa", "Monitorista", "Gestión de Planes de Contingencia"],
} as const;

router.post("/usuarios/validar", requireRoles("Admin"), express.json({ limit: "2mb" }), UsersImportController.validar);
router.post("/usuarios/importar", requireRoles("Admin"), express.json({ limit: "2mb" }), UsersImportController.importar);

router.get("/historial", requireRoles("Admin"), ImportacionController.historial);
router.post("/historial/:id/revertir", requireRoles("Admin"), express.json({ limit: "16kb" }), ImportacionController.revertir);

// Rechazar primero los perfiles no autorizados evita parsear cuerpos grandes.
router.post("/casos/validar", requireRoles(...rolesImportacion.casos), jsonImportacion, ImportacionController.validar);
router.post("/casos/importar", requireRoles(...rolesImportacion.casos), jsonImportacion, ImportacionController.importar);

router.post("/contingencias/validar", requireRoles(...rolesImportacion.contingencias), jsonImportacion, ImportacionController.validarContingencias);
router.post("/contingencias/importar", requireRoles(...rolesImportacion.contingencias), jsonImportacion, ImportacionController.importarContingencias);

router.post("/monitoreo/validar", requireRoles(...rolesImportacion.monitoreo), jsonImportacion, ImportacionController.validarMonitoreo);
router.post("/monitoreo/importar", requireRoles(...rolesImportacion.monitoreo), jsonImportacion, ImportacionController.importarMonitoreo);
router.post("/datos-operativos/validar", requireRoles(...rolesImportacion.datosOperativos), jsonImportacion, ImportacionController.validarDatosOperativos);
router.post("/datos-operativos/importar", requireRoles(...rolesImportacion.datosOperativos), jsonImportacion, ImportacionController.importarDatosOperativos);

export default router;
