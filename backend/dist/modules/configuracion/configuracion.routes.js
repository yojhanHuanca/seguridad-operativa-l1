import { Router } from "express";
import { ConfiguracionController } from "./configuracion.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";
const router = Router();
router.get("/", ConfiguracionController.get);
router.patch("/", requireRoles("Admin"), ConfiguracionController.update);
export default router;
//# sourceMappingURL=configuracion.routes.js.map