import { UserRepository } from "./users.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import { createUserSchema, idParamSchema, updateUserSchema } from "./users.schema.js";
import { AuditoriaService, diffCampos } from "../auditoria/auditoria.service.js";
import type { Actor } from "../../utils/actor.js";

/** Campos sensibles que nunca deben llegar al registro de auditoría en texto plano. */
const CAMPOS_SENSIBLES = new Set(["password", "password_hash"]);

function paraAuditoria(usuario: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(usuario).filter(([key]) => !CAMPOS_SENSIBLES.has(key)));
}

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

     /**
      * Directorio reducido para los selectores de responsable. Lo puede pedir
      * cualquier rol autenticado, por eso no incluye correo ni teléfono.
      */
     static async getBasicUsers() {
       return UserRepository.findAllBasic();
     }

  static async getUserById(rawId: unknown) {
    const id = idParamSchema.parse(rawId);
    const user = await UserRepository.findById(id);
    return user;
  }

    static async createUser(rawBody: unknown, actor?: Actor, ip?: string | null) {
        const data = createUserSchema.parse(rawBody);

        // Verificar correo electrónico
        const emailExists  = await UserRepository.findByEmail(data.correo);

        if (emailExists) {
            throw new Error("El correo electrónico ya está registrado");
        }

        // Hash de la contraseña
        const password_hash = await BcryptHelper.hash(data.password);


        // Crear el ususario
        const creado = await UserRepository.createWithGeneratedCode(sinIndefinidos({
            ...data,
            password_hash,
        }));

        if (actor) {
            await AuditoriaService.registrar({
                tabla: "usuarios",
                id_registro: creado.id_usuario,
                accion: "crear",
                descripcion: `Creó al usuario ${creado.nombre} (${creado.correo})`,
                usuario: actor.id_usuario,
                ip,
                despues: paraAuditoria(creado as unknown as Record<string, unknown>),
            });
        }

        return creado;
    }

    static async updateUser(rawId: unknown, rawBody: unknown, actor?: Actor, ip?: string | null) {
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
        const { password, ...rest } = data;
        const password_hash = password ? await BcryptHelper.hash(password) : undefined;

        const actualizado = await UserRepository.update(id, sinIndefinidos({
            ...rest,
            ...(password_hash ? { password_hash } : {}),
        }));

        if (actor) {
            const cambios = diffCampos(
                paraAuditoria(usuario as unknown as Record<string, unknown>),
                paraAuditoria(actualizado as unknown as Record<string, unknown>)
            );
            const resumen = cambios ? `Campos modificados: ${Object.keys(cambios.despues).join(", ")}` : "Sin cambios en los campos auditados";
            await AuditoriaService.registrar({
                tabla: "usuarios",
                id_registro: id,
                accion: "editar",
                descripcion: `Editó al usuario ${actualizado.nombre}. ${resumen}`,
                usuario: actor.id_usuario,
                ip,
                ...(cambios ? { antes: cambios.antes, despues: cambios.despues } : {}),
            });
        }

        return actualizado;
    }
}
