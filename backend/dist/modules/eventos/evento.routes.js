import { Router } from "express";
import { EventoController } from "./evento.controller.js";
import { requireRolesOrResponsable } from "../../middlewares/auth.middleware.js";
const router = Router();
// Monitorista siempre; el RSO de Seguridad Operativa (es_responsable) puede
// "visitar" el panel de Monitoreo y hacer todo lo mismo ahí.
const MONITOREO = requireRolesOrResponsable(["Monitorista"], ["Seguridad Operativa"]);
// El listado completo de eventos es del panel de Monitoreo: antes cualquier
// rol autenticado (un Reportante, un Jefe de Área) podía pedirlo, porque el
// GET no tenía ningún guard. "/counts" y "/asignados" van antes de "/:id"
// para que no las capture como si fueran un identificador.
router.get("/", MONITOREO, EventoController.getAll);
router.get("/counts", MONITOREO, EventoController.getCounts);
router.get("/indicadores", MONITOREO, EventoController.getIndicadores);
router.get("/asignados/:id_usuario", EventoController.getAsignados);
router.get("/:id", MONITOREO, EventoController.getById);
router.post("/", MONITOREO, EventoController.create);
router.patch("/:id/asignar", MONITOREO, EventoController.asignar);
router.patch("/:id", MONITOREO, EventoController.update);
router.delete("/:id", MONITOREO, EventoController.remove);
export default router;
//# sourceMappingURL=evento.routes.js.map