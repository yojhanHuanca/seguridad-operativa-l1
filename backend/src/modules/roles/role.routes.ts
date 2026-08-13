import { Router } from "express";
import { RoleController } from "./role.controller.js";

const router = Router();

router.get("/", RoleController.getAll);

export default router;
