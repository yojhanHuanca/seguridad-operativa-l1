import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import usersRoutes from "../modules/users/users.routes.js";
import { AuthController } from "../modules/auth/auth.controller.js";

const router = Router(); 

router.get("/", (_req, res) => {
    res.json({
        success: true,
        message:  "API Sistema de Gestión de Seguridad Operativa",
        version: "1.0.0",
    });
}); 

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.get("/", AuthController.home);


export default router;

