import multer from "multer";
import type { Request, Response, NextFunction } from "express";
export declare const uploadEvidencia: multer.Multer;
export declare const uploadAvatar: multer.Multer;
/** Va después de `uploadEvidencia.array(...)` en la ruta. */
export declare const verificarContenidoEvidencia: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
/** Va después de `uploadAvatar.single(...)` en la ruta. */
export declare const verificarContenidoAvatar: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
//# sourceMappingURL=upload.middleware.d.ts.map