import { AuthRepository } from "./auth.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import { JwtHelper } from "../../utils/jwt.js";


export class AuthService {
    static async login(correo: string, password: string) {


        // Buscar usuarios 
        const user = await AuthRepository.findByEmail(correo);
        if (!user) {
            throw new Error("Correo o contraseña incorrectos");
        }

        if (!user.password_hash) {
            throw new Error("Correo o contraseña incorrectos");
        }

        //Comparar comtraseña 
        const isPasswordValid = await BcryptHelper.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            throw new Error("Correo o contraseña incorrectos");
        }

        if ((user.estado ?? "").toLowerCase() !== "activo"){
            throw new Error("La cuenta se encuentra inactiva. Contacta al administrador.");
        }

        if (user.id_rol == null) {
            throw new Error("El usuario no tiene rol asignado");
        }

        // Generar token JWT 

        const token = JwtHelper.generateToken({
            id_usuario: user.id_usuario,
            correo: user.correo,
            rol: user.id_rol,
            rol_nombre: user.roles!.nombre_rol,
        });

        return {
            token,
            usuario: { 
                id_usuario: user.id_usuario,
                codigo_usuario: user.codigo_usuario,
                nombre: user.nombre,
                correo: user.correo,
                estado: user.estado,
                rol: user.roles?.nombre_rol,
                area: user.areas?.nombre_area,

            },
        };


    }









    static async home(){
        await AuthRepository.healthCheck();

        return {
            endpoints: [
                "/login",
                "/register",
                "/logout",
                "/refresh-token",
    
            ],
            database: "Connected",
        };
    }
}

