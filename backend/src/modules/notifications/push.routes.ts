import { Router } from "express";
import { PushController } from "./push.controller.js";

const router = Router();
router.get("/config", PushController.config);
router.post("/status", PushController.status);
router.post("/test", PushController.test);

router.post("/subscribe", PushController.subscribe);
router.post("/unsubscribe", PushController.unsubscribe);

export default router;
