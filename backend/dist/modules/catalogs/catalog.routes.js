import { Router } from "express";
import { CatalogController } from "./catalog.controller.js";
const router = Router();
router.get("/", CatalogController.getAll);
export default router;
//# sourceMappingURL=catalog.routes.js.map