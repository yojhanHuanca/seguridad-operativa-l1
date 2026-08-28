import { Router } from "express";
import { PushController } from "./push.controller.js";
const router = Router();
router.post("/subscribe", PushController.subscribe);
router.post("/unsubscribe", PushController.unsubscribe);
export default router;
//# sourceMappingURL=push.routes.js.map