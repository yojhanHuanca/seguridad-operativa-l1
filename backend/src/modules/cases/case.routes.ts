import { Router } from "express";
import { CaseController } from "./case.controller.js";
import { uploadEvidencia } from "../../middlewares/upload.middleware.js";

const router = Router();

router.get("/", CaseController.getAll);
// Antes de "/:codigo" para que no lo capture como si "planes" fuese un código.
router.get("/planes", CaseController.getPlans);
router.get("/:codigo", CaseController.getByCodigo);
router.post("/:codigo/approve", CaseController.approve);
router.post("/:codigo/observation", CaseController.addObservation);
router.post("/:codigo/evaluate", CaseController.evaluate);
router.post("/:codigo/reject", CaseController.reject);
router.post("/:codigo/request-info", CaseController.requestInfo);
router.post("/:codigo/request-info/:idSolicitud/respond", CaseController.respondInfo);
router.post("/:codigo/investigation", CaseController.saveInvestigation);
router.post("/:codigo/plans/batch", CaseController.createPlans);
router.post("/:codigo/plans", CaseController.createPlan);
router.patch("/planes/:idPlan", CaseController.updatePlan);
router.post("/planes/:idPlan/accept", CaseController.acceptPlanById);
router.post("/planes/:idPlan/complete-execution", CaseController.completeExecutionByPlan);
router.post("/planes/:idPlan/review-final", CaseController.reviewFinalPlanById);
router.post("/planes/:idPlan/extension", CaseController.requestExtensionByPlan);
router.post("/planes/:idPlan/extension/review", CaseController.reviewExtensionByPlan);
router.post("/planes/:idPlan/comment", CaseController.addPlanComment);
router.post("/planes/:idPlan/evidence", uploadEvidencia.array("evidencia", 10), CaseController.addEvidenceByPlan);
router.post("/planes/:idPlan/actualizacion", uploadEvidencia.array("evidencia", 10), CaseController.addPlanUpdate);
router.patch("/actividades/:idActividad", CaseController.updateActivity);
router.post("/:codigo/extension", CaseController.requestExtension);
router.post("/:codigo/extension/review", CaseController.reviewExtension);
router.post("/:codigo/accept-plan", CaseController.acceptPlan);
router.post("/:codigo/complete-execution", CaseController.completeExecution);
router.post("/:codigo/start-execution", CaseController.startExecution);
router.post("/:codigo/send-verification", CaseController.sendToVerification);
router.post("/:codigo/keep-pending", CaseController.keepPending);
router.post("/:codigo/reopen", CaseController.reopen);
router.post("/:codigo/rollback", CaseController.rollbackStage);
router.post("/:codigo/comment", CaseController.addComment);
router.post("/:codigo/close", CaseController.close);
router.post("/:codigo/evidence", uploadEvidencia.array("evidencia", 10), CaseController.addEvidence);

export default router;


