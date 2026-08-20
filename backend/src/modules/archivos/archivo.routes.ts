import { Router } from "express";
import type { Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import {
  ArchivoNoAccesibleError,
  ArchivoNoEncontradoError,
  rutaDeArchivoPermitido,
} from "./archivo.service.js";

const router = Router();

/**
 * Entrega evidencias y fotos de perfil.
 *
 * Antes esto era un `express.static("/uploads")` montado fuera de la
 * autenticación, así que cualquiera con la URL descargaba una evidencia sin
 * iniciar sesión. Ahora pasa por el token y por la misma regla de visibilidad
 * que el expediente.
 */
router.get("/:carpeta/:archivo", async (req: AuthenticatedRequest, res: Response) => {
  const { carpeta, archivo } = req.params as { carpeta: string; archivo: string };

  try {
    const ruta = await rutaDeArchivoPermitido(carpeta, archivo, req.user);
    return res.sendFile(ruta, (error) => {
      if (error && !res.headersSent) {
        res.status(404).json(ApiResponse.error("Archivo no encontrado"));
      }
    });
  } catch (error) {
    if (error instanceof ArchivoNoAccesibleError) {
      return res.status(403).json(ApiResponse.error(error.message));
    }
    if (error instanceof ArchivoNoEncontradoError) {
      return res.status(404).json(ApiResponse.error(error.message));
    }
    return res.status(500).json(ApiResponse.error("No se pudo entregar el archivo"));
  }
});

export default router;
