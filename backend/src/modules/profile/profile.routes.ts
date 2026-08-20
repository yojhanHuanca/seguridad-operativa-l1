import { Router } from "express";
import { ProfileController } from "./profile.controller.js";
import { uploadAvatar } from "../../middlewares/upload.middleware.js";

const router = Router();

router.get("/me", ProfileController.getMe);
router.patch("/me", ProfileController.updateMe);
router.post("/me/foto", uploadAvatar.single("foto"), ProfileController.uploadFoto);
router.patch("/me/password", ProfileController.changePassword);
router.get("/me/actividad", ProfileController.getActividad);

export default router;
