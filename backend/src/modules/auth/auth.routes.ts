import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import { loginRateLimit } from "../../middlewares/loginRateLimit.middleware.js";

const router = Router();

router.post("/login", loginRateLimit, AuthController.login);
router.post("/google", loginRateLimit, AuthController.loginGoogle);
router.post("/logout", verifyToken, AuthController.logout);
router.get("/home", AuthController.home);


export default router;