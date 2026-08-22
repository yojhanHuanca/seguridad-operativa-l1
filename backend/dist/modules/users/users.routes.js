import { Router } from "express";
import { UsersController } from "./users.controller.js";
import { requireRoles } from "../../middlewares/auth.middleware.js";
const router = Router();
// El padrón completo (correo, teléfono, código de empleado) es solo del Admin.
// El resto de los paneles usa /basicos, que trae nombre, cargo, área y rol.
// Va antes de "/:id" para que no lo capture como si "basicos" fuese un id.
router.get("/basicos", UsersController.getBasicos);
// "/counts" antes de "/:id" para que no la capture como si fuese un id.
router.get("/counts", requireRoles("Admin"), UsersController.getCounts);
router.get("/", requireRoles("Admin"), UsersController.getAll);
router.get("/:id", requireRoles("Admin"), UsersController.getById);
router.post("/", requireRoles("Admin"), UsersController.create);
router.patch("/:id", requireRoles("Admin"), UsersController.update);
export default router;
//# sourceMappingURL=users.routes.js.map