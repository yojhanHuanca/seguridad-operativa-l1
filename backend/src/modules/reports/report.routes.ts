import { Router } from "express";
import { ReportController } from "./report.controller.js";
import { uploadEvidencia } from "../../middlewares/upload.middleware.js";

const router = Router();

router.get("/", ReportController.getAll);
router.get("/:codigo", ReportController.getByCodigo);
router.post("/", uploadEvidencia.array("evidencia", 10), ReportController.create);

export default router;
