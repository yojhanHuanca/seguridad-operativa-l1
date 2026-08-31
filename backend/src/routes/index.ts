import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import usersRoutes from "../modules/users/users.routes.js";
import catalogsRoutes from "../modules/catalogs/catalog.routes.js";
import areasRoutes from "../modules/areas/area.routes.js";
import estacionesRoutes from "../modules/estaciones/estacion.routes.js";
import rolesRoutes from "../modules/roles/role.routes.js";
import eventosRoutes from "../modules/eventos/evento.routes.js";
import reportsRoutes from "../modules/reports/report.routes.js";
import casesRoutes from "../modules/cases/case.routes.js";
import notificationsRoutes from "../modules/notifications/notification.routes.js";
import pushRoutes from "../modules/notifications/push.routes.js";
import profileRoutes from "../modules/profile/profile.routes.js";
import archivosRoutes from "../modules/archivos/archivo.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import auditoriaRoutes from "../modules/auditoria/auditoria.routes.js";
import importacionRoutes from "../modules/importacion/importacion.routes.js";
import configuracionRoutes from "../modules/configuracion/configuracion.routes.js";
import { ConfiguracionController } from "../modules/configuracion/configuracion.controller.js";
import { AuthController } from "../modules/auth/auth.controller.js";
import { optionalVerifyToken, verifyToken } from "../middlewares/auth.middleware.js";
import { CatalogController } from "../modules/catalogs/catalog.controller.js";
import { ReportController } from "../modules/reports/report.controller.js";
import { uploadEvidencia } from "../middlewares/upload.middleware.js";
import { publicReportRateLimit } from "../middlewares/loginRateLimit.middleware.js";

const router = Router();

router.get("/", (_req, res) => {
    res.json({
        success: true,
        message:  "API Sistema de Gestión de Seguridad Operativa",
        version: "1.0.0",
    });
});

router.use("/auth", authRoutes);

// Público, sin sesión: la persona que reporta escanea un QR/URL y llena el
// formulario ahí mismo, no tiene ni necesita cuenta. Solo se expone crear el
// reporte y los catálogos que llenan sus selects (tipo, ubicación, etc.) —
// todo lo demás de /reports y /catalogs sigue exigiendo sesión más abajo.
router.get("/catalogs", CatalogController.getAll);
router.post("/reports", publicReportRateLimit, optionalVerifyToken, uploadEvidencia.array("evidencia", 10), ReportController.create);
// El código real del caso hace de "llave" de seguimiento: quien reportó sin
// cuenta lo usa para consultar su estado después, sin loguearse.
router.get("/reports/consulta/:codigo", ReportController.getByCodigo);
// Responder una solicitud de información sin cuenta: mismo código como llave.
router.post(
  "/reports/consulta/:codigo/responder-info",
  publicReportRateLimit,
  uploadEvidencia.array("evidencia", 10),
  ReportController.responderInfo
);
router.get("/configuracion/publica", ConfiguracionController.publica);

router.use(verifyToken);
router.use("/users", usersRoutes);
router.use("/catalogs", catalogsRoutes);
router.use("/areas", areasRoutes);
router.use("/estaciones", estacionesRoutes);
router.use("/roles", rolesRoutes);
router.use("/eventos", eventosRoutes);
router.use("/reports", reportsRoutes);
router.use("/cases", casesRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/push", pushRoutes);
router.use("/profile", profileRoutes);
router.use("/archivos", archivosRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/auditoria", auditoriaRoutes);
router.use("/importacion", importacionRoutes);
router.use("/configuracion", configuracionRoutes);
router.get("/", AuthController.home);


export default router;

