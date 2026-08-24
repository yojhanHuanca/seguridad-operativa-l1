import { Router } from "express";
import { ReportController } from "./report.controller.js";
import { uploadEvidencia } from "../../middlewares/upload.middleware.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";
const router = Router();
// El padrón de reportes es de quien los registra (ve solo los suyos) y de
// quien los gestiona. Monitorista y Jefe de Área no tienen pantalla de
// reportes: sin este guard, cualquiera de los dos podía pedir el listado
// completo del sistema.
const REPORTES = requireRoles("Reportante", "Seguridad Operativa", "Admin");
router.get("/", REPORTES, ReportController.getAll);
router.get("/:codigo", REPORTES, ReportController.getByCodigo);
router.post("/", uploadEvidencia.array("evidencia", 10), ReportController.create);
export default router;
//# sourceMappingURL=report.routes.js.map