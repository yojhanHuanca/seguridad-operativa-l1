import { Router } from "express";
import { EventoController } from "./evento.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

// El listado completo de eventos es del panel de Monitoreo: antes cualquier
// rol autenticado (un Reportante, un Jefe de Área) podía pedirlo, porque el
// GET no tenía ningún guard. "/counts" y "/asignados" van antes de "/:id"
// para que no las capture como si fueran un identificador.
//
// Nota: en la rama base (entrega) esto usa `requireRolesOrResponsable` para
// que un RSO de Seguridad Operativa "visitando" el panel de Monitoreo también
// entre; esa función (y el flag `es_responsable` del token) todavía no existen
// en esta rama, así que por ahora se restringe con `requireRoles`, ya
// disponible acá.
const MONITOREO = requireRoles("Monitorista", "Seguridad Operativa");

router.get("/", MONITOREO, EventoController.getAll);
router.get("/counts", MONITOREO, EventoController.getCounts);
router.get("/asignados/:id_usuario", EventoController.getAsignados);
router.get("/:id", MONITOREO, EventoController.getById);
router.post("/", EventoController.create);
router.patch("/:id/asignar", EventoController.asignar);
router.patch("/:id", EventoController.update);
router.delete("/:id", EventoController.remove);

export default router;
