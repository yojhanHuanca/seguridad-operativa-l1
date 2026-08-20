import { Router } from "express";

import { UsersController } from "./users.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";



const router = Router();

// "/counts" antes de "/:id" para que no la capture como si fuese un id.
router.get("/counts", requireRoles("Admin"), UsersController.getCounts);
router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getById);
router.post("/", requireRoles("Admin"), UsersController.create);
router.patch("/:id", requireRoles("Admin"), UsersController.update);

export default router;
