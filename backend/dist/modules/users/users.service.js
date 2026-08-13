import { UserRepository } from "./users.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
export class UsersService {
    static async getAllUsers() {
        const users = await UserRepository.findAll();
        return users;
    }
    static async getUserById(id) {
        const user = await UserRepository.findById(id);
        return user;
    }
    static async createUser(data) {
        // Verificar codigo de usuario único
        const codeExists = await UserRepository.findByCodigo(data.codigo_usuario);
        if (codeExists) {
            throw new Error("El codigo de usario ya existe ");
        }
        // Verificar correo electrónico
        const emailExists = await UserRepository.findByEmail(data.correo);
        if (emailExists) {
            throw new Error("El correo electrónico ya está registrado");
        }
        // Hash de la contraseña
        const password_hash = await BcryptHelper.hash(data.password);
        // Crear el ususario
        return await UserRepository.create({
            ...data,
            password_hash,
        });
    }
    static async updateUser(id, data) {
        const usuario = await UserRepository.findById(id);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        // Si cambia el correo, verificar que no choque con el de otro usuario.
        if (data.correo && data.correo !== usuario.correo) {
            const emailExists = await UserRepository.findByEmail(data.correo);
            if (emailExists) {
                throw new Error("El correo electrónico ya está registrado");
            }
        }
        const { password, ...rest } = data;
        const password_hash = password ? await BcryptHelper.hash(password) : undefined;
        return await UserRepository.update(id, {
            ...rest,
            ...(password_hash ? { password_hash } : {}),
        });
    }
}
//# sourceMappingURL=users.service.js.map