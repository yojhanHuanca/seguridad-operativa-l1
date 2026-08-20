/**
 * Sin esto, 10 intentos fallidos seguidos de login devolvían 10× 401 sin
 * ningún bloqueo ni demora — fuerza bruta viable. 10 intentos por IP cada 15
 * minutos; los intentos exitosos no cuentan contra el límite.
 */
export declare const loginRateLimit: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=loginRateLimit.middleware.d.ts.map