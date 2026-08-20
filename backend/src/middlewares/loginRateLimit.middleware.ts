import rateLimit from "express-rate-limit";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * Sin esto, 10 intentos fallidos seguidos de login devolvían 10× 401 sin
 * ningún bloqueo ni demora — fuerza bruta viable. 10 intentos por IP cada 15
 * minutos; los intentos exitosos no cuentan contra el límite.
 */
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (_req, res) => {
    res.status(429).json(ApiResponse.error("Demasiados intentos de inicio de sesión. Intenta de nuevo en unos minutos."));
  },
});
