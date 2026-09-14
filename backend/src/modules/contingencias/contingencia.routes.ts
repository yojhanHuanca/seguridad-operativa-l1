import { Router } from "express";
import { requireRoles } from "../../middlewares/auth.middleware.js";
import { ContingenciaController } from "./contingencia.controller.js";

const router = Router();
const CONTINGENCIAS = requireRoles("Gestión de Planes de Contingencia", "Admin");

router.get("/catalogos", CONTINGENCIAS, ContingenciaController.catalogos);
router.get("/", CONTINGENCIAS, ContingenciaController.getAll);
router.get("/:id", CONTINGENCIAS, ContingenciaController.getById);
router.post("/", CONTINGENCIAS, ContingenciaController.create);
router.put("/:id", CONTINGENCIAS, ContingenciaController.update);
router.delete("/:id", CONTINGENCIAS, ContingenciaController.remove);

export default router;
