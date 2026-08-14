import { Router } from "express";
import { EventoController } from "./evento.controller.js";

const router = Router();

router.get("/", EventoController.getAll);
router.get("/asignados/:id_usuario", EventoController.getAsignados);
router.get("/:id", EventoController.getById);
router.post("/", EventoController.create);
router.patch("/:id/asignar", EventoController.asignar);
router.patch("/:id", EventoController.update);
router.delete("/:id", EventoController.remove);

export default router;
