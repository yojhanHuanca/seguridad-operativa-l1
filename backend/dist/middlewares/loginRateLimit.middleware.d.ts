/**
 * Sin esto, 10 intentos fallidos seguidos de login devolvían 10× 401 sin
 * ningún bloqueo ni demora — fuerza bruta viable. 10 intentos por IP cada 15
 * minutos; los intentos exitosos no cuentan contra el límite.
 */
export declare const loginRateLimit: import("express-rate-limit").RateLimitRequestHandler;
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
export declare const passwordResetPorCorreoRateLimit: import("express-rate-limit").RateLimitRequestHandler;
export declare const passwordResetPorIpRateLimit: import("express-rate-limit").RateLimitRequestHandler;
/**
 * El registro público está expuesto por QR/URL sin login, así que necesita un
 * límite razonable antes de procesar evidencias. El valor es alto para no
 * afectar una red corporativa compartida durante pruebas o despliegue.
 */
export declare const publicReportRateLimit: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=loginRateLimit.middleware.d.ts.map