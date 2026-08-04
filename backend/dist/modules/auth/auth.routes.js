import { Router } from "express";
const router = Router();
router.get("/", (_req, res) => {
    res.json({
        success: true,
        module: "Auth",
        message: "Módulo de autenticación funcionando correctamente",
    });
});
export default router;
//# sourceMappingURL=auth.routes.js.map