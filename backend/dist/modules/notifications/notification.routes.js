import { Router } from "express";
import { NotificationController } from "./notification.controller.js";
const router = Router();
router.get("/", NotificationController.list);
router.patch("/read-all", NotificationController.markAllRead);
router.patch("/:id/read", NotificationController.markRead);
export default router;
//# sourceMappingURL=notification.routes.js.map