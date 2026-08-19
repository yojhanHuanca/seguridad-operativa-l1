import { Router } from "express";
import { EventoController } from "./evento.controller.js";
import { requireRolesOrResponsable } from "../../middlewares/auth.middleware.js";

const router = Router();

// Monitorista siempre; el RSO de Seguridad Operativa (es_responsable) puede
// "visitar" el panel de Monitoreo y hacer todo lo mismo ahí.
const MONITOREO = requireRolesOrResponsable(["Monitorista"], ["Seguridad Operativa"]);

router.get("/", EventoController.getAll);
router.get("/asignados/:id_usuario", EventoController.getAsignados);
router.get("/:id", EventoController.getById);
router.post("/", MONITOREO, EventoController.create);
router.patch("/:id/asignar", MONITOREO, EventoController.asignar);
router.patch("/:id", MONITOREO, EventoController.update);
router.delete("/:id", MONITOREO, EventoController.remove);

export default router;
