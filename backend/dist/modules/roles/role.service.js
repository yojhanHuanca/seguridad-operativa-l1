import { RoleRepository } from "./role.repository.js";
export class RoleService {
    static async getAllRoles() {
        return RoleRepository.findAll();
    }
}
//# sourceMappingURL=role.service.js.map