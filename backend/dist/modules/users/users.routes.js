import { Router } from "express";
import { UsersController } from "./users.controller.js";
const router = Router();
router.get("/", UsersController.getAll);
export default router;
//# sourceMappingURL=users.routes.js.map