import { UserRepository } from "./users.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import type { CreateUserDto } from "./users.types.js";

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

        // Verificar codigo de usuario único
        const codeExists = await UserRepository.findByCodigo(data.codigo_usuario);

        if (codeExists) {
            throw new Error("El codigo de usario ya existe ");
        }

        // Verificar correo electrónico
        const emailExists  = await UserRepository.findByEmail(data.correo);

        if (emailExists) {
            throw new Error("El correo electrónico ya está registrado");
        }

        // Hash de la contraseña
        const password_hash = await BcryptHelper.hash(data.password);


        // Crear el ususario 
        return await UserRepository.create ({
            ...data,
            password_hash,
        });



    }
}
