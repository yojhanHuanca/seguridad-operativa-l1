import { UserRepository } from "./users.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import { createUserSchema, idParamSchema, updateUserSchema } from "./users.schema.js";

/**
 * Zod deja `key?: T | undefined` en el tipo inferido para todo campo
 * opcional, aunque en el objeto real la clave venga ausente. Con
 * `exactOptionalPropertyTypes` activo eso no calza con los tipos (más
 * angostos) que esperan los métodos de `UserRepository`. Se filtra acá en
 * vez de aflojar esos tipos, para no perder la garantía de que una clave con
 * `undefined` explícito nunca llegue a Prisma.
 */
type SinIndefinidos<T> = { [K in keyof T as undefined extends T[K] ? K : never]?: Exclude<T[K], undefined> } & {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

function sinIndefinidos<T extends object>(obj: T): SinIndefinidos<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as SinIndefinidos<T>;
}

export class UsersService {

     static async getAllUsers(query?: { search?: string; rol?: string; estado?: string; page?: string; limit?: string }) {
       const rol = Number(query?.rol);
       const page = Number(query?.page);
       const limit = Number(query?.limit);
       const paginar = Number.isInteger(page) && page > 0 && Number.isInteger(limit) && limit > 0;

       return UserRepository.findAll({
         ...(query?.search ? { search: query.search } : {}),
         ...(Number.isInteger(rol) && rol > 0 ? { rol } : {}),
         ...(query?.estado === "activo" || query?.estado === "inactivo" ? { estado: query.estado } : {}),
         ...(paginar ? { page, limit } : {}),
       });
     }

     static async getCounts() {
       return UserRepository.counts();
     }

  static async getUserById(rawId: unknown) {
    const id = idParamSchema.parse(rawId);
    const user = await UserRepository.findById(id);
    return user;
  }

    static async createUser(rawBody: unknown) {
        const data = createUserSchema.parse(rawBody);

        // Verificar correo electrónico
        const emailExists  = await UserRepository.findByEmail(data.correo);

        if (emailExists) {
            throw new Error("El correo electrónico ya está registrado");
        }

        // Hash de la contraseña
        const password_hash = await BcryptHelper.hash(data.password);


        // Crear el ususario
        return await UserRepository.createWithGeneratedCode(sinIndefinidos({
            ...data,
            password_hash,
        }));



    }

    static async updateUser(rawId: unknown, rawBody: unknown) {
        const id = idParamSchema.parse(rawId);
        const data = updateUserSchema.parse(rawBody);

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

        // Cadena vacía = "no cambiar contraseña", igual que si no viniera el campo.
        // `es_responsable` no se persiste aquí: la tabla `usuarios` de esta rama
        // no tiene esa columna (la funcionalidad de "responsable" no llegó a
        // develop todavía), así que se descarta en vez de reenviarla a Prisma.
        const { password, es_responsable, ...rest } = data;
        const password_hash = password ? await BcryptHelper.hash(password) : undefined;

        return await UserRepository.update(id, sinIndefinidos({
            ...rest,
            ...(password_hash ? { password_hash } : {}),
        }));
    }
}
