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
function correoDelBody(req) {
    const correo = req.body?.correo;
    return typeof correo === "string" ? correo.trim().toLowerCase() : "";
}
const MENSAJE_RECUPERACION = "Se pidieron demasiados enlaces de recuperación. Intenta nuevamente en unos minutos.";
/**
 * "Olvidé mi contraseña" responde 200 siempre, a propósito: así no revela si
 * un correo está registrado. El efecto secundario es que `loginRateLimit` no
 * le servía — con `skipSuccessfulRequests` cada intento se descontaba y el
 * límite nunca llegaba a aplicarse. Estos dos NO omiten los exitosos.
 *
 * Son dos barreras porque cubren riesgos distintos: por correo acota cuántos
 * mensajes puede recibir una misma persona (bombardeo de bandeja, aunque el
 * atacante rote de IP); por IP acota cuántos puede disparar una misma fuente
 * probando direcciones distintas (agotar la cuota diaria del proveedor).
 */
export const passwordResetPorCorreoRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    // Una petición sin correo no tiene a quién acotar; la frena el límite por IP.
    skip: (req) => !correoDelBody(req),
    keyGenerator: (req) => correoDelBody(req),
    handler: (_req, res) => {
        res.status(429).json(ApiResponse.error(MENSAJE_RECUPERACION));
    },
});
export const passwordResetPorIpRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
        res.status(429).json(ApiResponse.error(MENSAJE_RECUPERACION));
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
//# sourceMappingURL=loginRateLimit.middleware.js.map