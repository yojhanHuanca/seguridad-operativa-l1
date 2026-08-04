import { ApiResponse } from "../../utils/ApiResponse.js";
import { AuthService } from "./auth.service.js";
export class AuthController {
    static async home(req, res) {
        const data = await AuthService.home();
        return res.json(ApiResponse.success("Módulo de autenticación disponible", data));
    }
}
//# sourceMappingURL=auth.controller.js.map