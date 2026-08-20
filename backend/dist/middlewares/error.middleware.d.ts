import type { NextFunction, Request, Response } from "express";
/** Manejador de errores global de Express — red de seguridad para cualquier
 * error que un controlador no haya capturado (o un `next(err)` explícito).
 * La mayoría de rutas ya atrapan sus propios errores; este middleware evita
 * que uno se les escape y termine devolviendo el stack trace de Express por
 * defecto al cliente. */
export declare function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction): void;
//# sourceMappingURL=error.middleware.d.ts.map