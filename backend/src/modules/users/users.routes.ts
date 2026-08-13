import { Router } from "express";

import { UsersController } from "./users.controller.js";



const router = Router();

router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getById);
router.post("/", UsersController.create);
router.patch("/:id", UsersController.update);

export default router;
