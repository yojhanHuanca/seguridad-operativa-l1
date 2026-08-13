import { RoleService } from "./role.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export class RoleController {
    static async getAll(_req, res) {
        try {
            const roles = await RoleService.getAllRoles();
            return res.json(ApiResponse.success("Roles obtenidos correctamente", roles));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error("Error al obtener los roles", error));
        }
    }
}
//# sourceMappingURL=role.controller.js.map