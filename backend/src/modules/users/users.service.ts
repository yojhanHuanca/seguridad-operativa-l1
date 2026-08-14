import { UserRepository } from "./users.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import type { CreateUserDto, UpdateUserDto } from "./users.types.js";

export class UsersService {

     static async getAllUsers() {
       const users = await UserRepository.findAll();
       return users;
     }

  static async getUserById(id: number) {
    const user = await UserRepository.findById(id);
    return user;
  }

    static async createUser(data: CreateUserDto) {
        // Verificar correo electrónico
        const emailExists  = await UserRepository.findByEmail(data.correo);

        if (emailExists) {
            throw new Error("El correo electrónico ya está registrado");
        }

        // Hash de la contraseña
        const password_hash = await BcryptHelper.hash(data.password);


        // Crear el ususario
        return await UserRepository.createWithGeneratedCode({
            ...data,
            password_hash,
        });



    }

    static async updateUser(id: number, data: UpdateUserDto) {
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
