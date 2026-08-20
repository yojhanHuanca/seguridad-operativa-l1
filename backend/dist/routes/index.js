import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import usersRoutes from "../modules/users/users.routes.js";
import catalogsRoutes from "../modules/catalogs/catalog.routes.js";
import areasRoutes from "../modules/areas/area.routes.js";
import rolesRoutes from "../modules/roles/role.routes.js";
import eventosRoutes from "../modules/eventos/evento.routes.js";
import reportsRoutes from "../modules/reports/report.routes.js";
import casesRoutes from "../modules/cases/case.routes.js";
import notificationsRoutes from "../modules/notifications/notification.routes.js";
import profileRoutes from "../modules/profile/profile.routes.js";
import archivosRoutes from "../modules/archivos/archivo.routes.js";
import { AuthController } from "../modules/auth/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "API Sistema de Gestión de Seguridad Operativa",
        version: "1.0.0",
    });
});
router.use("/auth", authRoutes);
router.use(verifyToken);
router.use("/users", usersRoutes);
router.use("/catalogs", catalogsRoutes);
router.use("/areas", areasRoutes);
router.use("/roles", rolesRoutes);
router.use("/eventos", eventosRoutes);
router.use("/reports", reportsRoutes);
router.use("/cases", casesRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/profile", profileRoutes);
router.use("/archivos", archivosRoutes);
router.get("/", AuthController.home);
export default router;
//# sourceMappingURL=index.js.map