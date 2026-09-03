import { Router } from "express";
import { CaseController } from "./case.controller.js";
import { uploadEvidencia } from "../../middlewares/upload.middleware.js";
import { requireRoles, requireRolesAndPermission } from "../../middlewares/auth.middleware.js";
const router = Router();
const SO = requireRoles("Seguridad Operativa", "Admin");
const JEFE = requireRoles("Jefe de Área", "Admin");
// Comentarios: los puede dejar tanto quien investiga (SO) como el área que ejecuta el plan (Jefe).
const SO_O_JEFE = requireRoles("Seguridad Operativa", "Jefe de Área", "Admin");
// Dentro de SO, reabrir y rechazar deshacen o saltan el flujo normal — solo
// quien el Admin marcó con el permiso puntual puede usarlos.
const SO_PUEDE_REABRIR = requireRolesAndPermission(["Seguridad Operativa", "Admin"], "puede_reabrir_casos");
const SO_PUEDE_RECHAZAR = requireRolesAndPermission(["Seguridad Operativa", "Admin"], "puede_rechazar_reportes");
// Leer el expediente es para quien lo gestiona. El trabajador que reporta
// sigue su caso por /reports, que solo le muestra los suyos.
const LECTURA = requireRoles("Seguridad Operativa", "Jefe de Área", "Admin");
router.get("/", LECTURA, CaseController.getAll);
// Antes de "/:codigo" para que no lo capture como si "planes"/"counts" fuese un código.
router.get("/planes", LECTURA, CaseController.getPlans);
router.get("/counts", LECTURA, CaseController.getCounts);
router.get("/:codigo", LECTURA, CaseController.getByCodigo);
router.post("/:codigo/approve", SO, CaseController.approve);
router.post("/:codigo/observation", SO, CaseController.addObservation);
router.post("/:codigo/evaluate", SO, CaseController.evaluate);
router.patch("/:codigo/tipo", SO, CaseController.updateTipo);
router.post("/:codigo/reject", SO_PUEDE_RECHAZAR, CaseController.reject);
router.post("/:codigo/request-info", SO, CaseController.requestInfo);
router.post("/:codigo/request-info/:idSolicitud/respond", SO, CaseController.respondInfo);
router.post("/:codigo/investigation", SO, CaseController.saveInvestigation);
router.post("/:codigo/plans/batch", SO, CaseController.createPlans);
router.post("/:codigo/plans", SO, CaseController.createPlan);
router.patch("/planes/:idPlan", SO, CaseController.updatePlan);
router.post("/planes/:idPlan/accept", JEFE, CaseController.acceptPlanById);
router.post("/planes/:idPlan/complete-execution", JEFE, CaseController.completeExecutionByPlan);
router.post("/planes/:idPlan/review-final", SO, CaseController.reviewFinalPlanById);
router.post("/planes/:idPlan/extension", JEFE, CaseController.requestExtensionByPlan);
router.post("/planes/:idPlan/extension/review", SO, CaseController.reviewExtensionByPlan);
router.post("/planes/:idPlan/comment", SO_O_JEFE, CaseController.addPlanComment);
router.delete("/planes/:idPlan/evidence/:idAnexo", JEFE, CaseController.removePlanEvidence);
router.post("/planes/:idPlan/evidence", JEFE, uploadEvidencia.array("evidencia", 10), CaseController.addEvidenceByPlan);
router.post("/planes/:idPlan/actualizacion", JEFE, uploadEvidencia.array("evidencia", 10), CaseController.addPlanUpdate);
router.patch("/actividades/:idActividad", JEFE, CaseController.updateActivity);
router.post("/:codigo/extension/review", SO, CaseController.reviewExtension);
router.post("/:codigo/start-execution", SO, CaseController.startExecution);
router.post("/:codigo/send-verification", SO, CaseController.sendToVerification);
router.post("/:codigo/keep-pending", SO, CaseController.keepPending);
router.post("/:codigo/reopen", SO_PUEDE_REABRIR, CaseController.reopen);
// "Revertir caso": solo Seguridad Operativa, que es quien controla el flujo del expediente.
router.post("/:codigo/rollback", SO, CaseController.rollbackStage);
router.post("/:codigo/comment", SO_O_JEFE, CaseController.addComment);
router.post("/:codigo/close", SO, CaseController.close);
router.post("/:codigo/evidence", SO, uploadEvidencia.array("evidencia", 10), CaseController.addEvidence);
export default router;
//# sourceMappingURL=case.routes.js.map