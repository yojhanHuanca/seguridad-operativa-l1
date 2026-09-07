import { Router } from "express";
import { requireRolesOrResponsable } from "../../middlewares/auth.middleware.js";
import { DatosOperativosController } from "./datos-operativos.controller.js";

const router = Router();
const MONITOREO = requireRolesOrResponsable(["Monitorista"], ["Seguridad Operativa"]);

router.get("/", MONITOREO, DatosOperativosController.getAll);
router.post("/", MONITOREO, DatosOperativosController.create);
router.put("/:id", MONITOREO, DatosOperativosController.update);
router.delete("/:id", MONITOREO, DatosOperativosController.remove);

export default router;
