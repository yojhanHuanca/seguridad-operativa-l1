import { OAuth2Client } from "google-auth-library";
import { AuthRepository } from "./auth.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import { JwtHelper } from "../../utils/jwt.js";
import { AuditoriaService } from "../auditoria/auditoria.service.js";
import { env } from "../../config/env.js";

type UsuarioConRelaciones = NonNullable<Awaited<ReturnType<typeof AuthRepository.findByEmail>>>;

const googleClient = env.GOOGLE_CLIENT_ID ? new OAuth2Client(env.GOOGLE_CLIENT_ID) : null;

export class AuthService {
    /**
     * Última parte compartida por `login` y `loginWithGoogle`: una vez que ya
     * sabemos que el usuario es real, está activo y tiene rol, ambos caminos
     * abren la misma sesión, emiten el mismo JWT y devuelven la misma forma
     * de respuesta — solo cambia cómo se verificó la identidad.
     */
    private static async issueSession(
        user: UsuarioConRelaciones,
        descripcionLogin: string,
        direccion_ip?: string,
        navegador?: string,
    ) {
        const sesion = await AuthRepository.crearSesion(user.id_usuario, direccion_ip, navegador);

        await AuditoriaService.registrar({
            tabla: "sesiones",
            id_registro: sesion.id_sesion,
            accion: "login",
            descripcion: descripcionLogin,
            usuario: user.id_usuario,
            ip: direccion_ip,
            user_agent: navegador,
        });

        const token = JwtHelper.generateToken({
            id_usuario: user.id_usuario,
            correo: user.correo,
            rol: user.id_rol!,
            rol_nombre: user.roles!.nombre_rol,
            es_responsable: user.es_responsable,
            puede_reabrir_casos: user.puede_reabrir_casos,
            puede_rechazar_reportes: user.puede_rechazar_reportes,
            id_area: user.id_area,
            nombre: user.nombre,
            id_sesion: sesion.id_sesion,
        });

        // Se guarda el acceso anterior antes de sobrescribirlo: así "último
        // acceso" en el perfil muestra la sesión previa, no la que recién empieza.
        const ultimoAccesoPrevio = user.ultimo_acceso;
        await AuthRepository.updateUltimoAcceso(user.id_usuario);

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
                id_area: user.id_area,
                ultimo_acceso: ultimoAccesoPrevio,
                es_responsable: user.es_responsable,
                puede_reabrir_casos: user.puede_reabrir_casos,
                puede_rechazar_reportes: user.puede_rechazar_reportes,
            },
        };
    }

    static async login(correo: string, password: string, direccion_ip?: string, navegador?: string) {


        // Buscar usuarios
        const user = await AuthRepository.findByEmail(correo);
        // Un correo que no existe no se puede auditar contra ningún usuario
        // (la tabla `auditoria` exige un `usuario` válido) — no hay a quién
        // atribuírselo. Los intentos contra una cuenta real sí quedan, más
        // abajo, que es el caso que de verdad importa (fuerza bruta contra
        // una cuenta que existe).
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
            await AuditoriaService.registrar({
                tabla: "usuarios",
                id_registro: user.id_usuario,
                accion: "login_fallido",
                descripcion: `Intento de acceso con contraseña incorrecta (${correo})`,
                usuario: user.id_usuario,
                ip: direccion_ip,
                user_agent: navegador,
            });
            throw new Error("Correo o contraseña incorrectos");
        }

        if ((user.estado ?? "").toLowerCase() !== "activo"){
            await AuditoriaService.registrar({
                tabla: "usuarios",
                id_registro: user.id_usuario,
                accion: "login_fallido",
                descripcion: `Intento de acceso a una cuenta ${user.estado ?? "inactiva"}`,
                usuario: user.id_usuario,
                ip: direccion_ip,
                user_agent: navegador,
            });
            throw new Error("La cuenta se encuentra inactiva. Contacta al administrador.");
        }

        if (user.id_rol == null) {
            throw new Error("El usuario no tiene rol asignado");
        }

        // Una fila en `sesiones` por login: es lo que permite invalidar el
        // token al cerrar sesión (ver `verifyToken` y `AuthService.logout`).
        return AuthService.issueSession(user, `Inicio de sesión${navegador ? ` — ${navegador}` : ""}`, direccion_ip, navegador);
    }

    /**
     * "Iniciar sesión con Google" — NO crea cuentas nuevas. Solo confirma la
     * identidad del correo (Google ya lo verificó) y, si ese correo ya existe
     * como usuario dado de alta por un Admin, abre sesión igual que el login
     * normal. Si no existe, se rechaza: las altas siguen siendo solo del Admin.
     */
    static async loginWithGoogle(idToken: string, direccion_ip?: string, navegador?: string) {
        if (!googleClient) {
            throw new Error("El login con Google no está configurado en el servidor");
        }

        let correo: string;
        try {
            const ticket = await googleClient.verifyIdToken({ idToken, audience: env.GOOGLE_CLIENT_ID });
            const payload = ticket.getPayload();
            if (!payload?.email || !payload.email_verified) {
                throw new Error("La cuenta de Google no tiene un correo verificado");
            }
            correo = payload.email;
        } catch {
            throw new Error("No se pudo verificar la cuenta de Google");
        }

        const user = await AuthRepository.findByEmail(correo);
        if (!user) {
            throw new Error(`El correo ${correo} no está registrado en el sistema. Pide a un administrador que cree tu cuenta.`);
        }

        if ((user.estado ?? "").toLowerCase() !== "activo") {
            await AuditoriaService.registrar({
                tabla: "usuarios",
                id_registro: user.id_usuario,
                accion: "login_fallido",
                descripcion: `Intento de acceso con Google a una cuenta ${user.estado ?? "inactiva"}`,
                usuario: user.id_usuario,
                ip: direccion_ip,
                user_agent: navegador,
            });
            throw new Error("La cuenta se encuentra inactiva. Contacta al administrador.");
        }

        if (user.id_rol == null) {
            throw new Error("El usuario no tiene rol asignado");
        }

        return AuthService.issueSession(user, `Inicio de sesión con Google${navegador ? ` — ${navegador}` : ""}`, direccion_ip, navegador);
    }









    /** Tokens emitidos antes de llevar `id_sesion` no tienen nada que cerrar del lado del servidor. */
    static async logout(id_sesion?: number) {
        if (id_sesion) await AuthRepository.cerrarSesion(id_sesion);
    }

    static async home(){
        await AuthRepository.healthCheck();

        return {
            endpoints: [
                "/login",
                "/logout",
            ],
            database: "Connected",
        };
    }
}

