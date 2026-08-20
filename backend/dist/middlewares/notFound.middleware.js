import { ApiResponse } from "../utils/ApiResponse.js";
export function notFoundMiddleware(req, res) {
    res.status(404).json(ApiResponse.error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}
//# sourceMappingURL=notFound.middleware.js.map