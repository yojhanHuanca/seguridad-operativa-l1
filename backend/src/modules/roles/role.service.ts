import { RoleRepository } from "./role.repository.js";

export class RoleService {
  static async getAllRoles() {
    return RoleRepository.findAll();
  }
}
