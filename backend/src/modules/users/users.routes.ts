import { Router } from "express";

import { UsersController } from "./users.controller.js";



const router = Router();

router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getById);
router.post("/", UsersController.create);

export default router;
