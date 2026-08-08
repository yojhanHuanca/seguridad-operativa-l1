import { CatalogService } from "./catalog.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export class CatalogController {
    static async getAll(_req, res) {
        try {
            const catalogos = await CatalogService.getAllGroups();
            return res.json(ApiResponse.success("Catálogos obtenidos correctamente", catalogos));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error("Error al obtener los catálogos", error));
        }
    }
}
//# sourceMappingURL=catalog.controller.js.map