import { UserRepository } from "./users.repository.js";
export class UsersService {
    static async getAllUsers() {
        const users = await UserRepository.findAll();
        return users;
    }
}
//# sourceMappingURL=users.service.js.map