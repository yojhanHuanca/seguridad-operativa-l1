import { Router } from "express";
import { CatalogController } from "./catalog.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", CatalogController.getAll);
router.get("/:id/admin", requireRoles("Admin"), CatalogController.getGroupForAdmin);
router.post("/:id/detalle", requireRoles("Admin"), CatalogController.createItem);
router.patch("/detalle/:idDetalle", requireRoles("Admin"), CatalogController.updateItem);
router.delete("/detalle/:idDetalle", requireRoles("Admin"), CatalogController.removeItem);
router.post("/detalle/:idDetalle/restaurar", requireRoles("Admin"), CatalogController.restoreItem);

export default router;
