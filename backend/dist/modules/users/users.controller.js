import { UsersService } from "./users.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export class UsersController {
    static async getAll(req, res) {
        try {
            const users = await UsersService.getAllUsers();
            return res.json(ApiResponse.success("Usuarios obtenidos correctamente", users));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error("Error al obtener los usuarios", error));
        }
    }
}
//# sourceMappingURL=users.controller.js.map