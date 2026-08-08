import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const router = Router();

router.post("/login", AuthController.login);
router.get("/home", AuthController.home);


export default router;