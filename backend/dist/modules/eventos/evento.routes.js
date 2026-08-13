import { Router } from "express";
import { EventoController } from "./evento.controller.js";
const router = Router();
router.get("/", EventoController.getAll);
router.get("/:id", EventoController.getById);
router.post("/", EventoController.create);
router.patch("/:id", EventoController.update);
router.delete("/:id", EventoController.remove);
export default router;
//# sourceMappingURL=evento.routes.js.map