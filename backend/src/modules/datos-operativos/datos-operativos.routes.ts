import { Router } from "express";
import { requireRolesOrResponsable } from "../../middlewares/auth.middleware.js";
import { DatosOperativosController } from "./datos-operativos.controller.js";

const router = Router();
const DATOS_OPERATIVOS = requireRolesOrResponsable(["Gestión de Planes de Contingencia", "Monitorista"], ["Seguridad Operativa"]);

router.get("/", DATOS_OPERATIVOS, DatosOperativosController.getAll);
router.post("/", DATOS_OPERATIVOS, DatosOperativosController.create);
router.put("/:id", DATOS_OPERATIVOS, DatosOperativosController.update);
router.delete("/:id", DATOS_OPERATIVOS, DatosOperativosController.remove);

export default router;
