import { Router } from "express";
import { AreaController } from "./area.controller.js";
const router = Router();
router.get("/", AreaController.getAll);
export default router;
//# sourceMappingURL=area.routes.js.map