import { Router } from "express";
import { EstacionController } from "./estacion.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";
const router = Router();
router.get("/", EstacionController.getAll);
router.post("/", requireRoles("Admin"), EstacionController.create);
router.patch("/:id", requireRoles("Admin"), EstacionController.update);
router.delete("/:id", requireRoles("Admin"), EstacionController.remove);
export default router;
//# sourceMappingURL=estacion.routes.js.map