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

/**
 * El registro público está expuesto por QR/URL sin login, así que necesita un
 * límite razonable antes de procesar evidencias. El valor es alto para no
 * afectar una red corporativa compartida durante pruebas o despliegue.
 */
export const publicReportRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json(ApiResponse.error("Se registraron demasiados reportes desde esta red. Intenta nuevamente en unos minutos."));
  },
});
