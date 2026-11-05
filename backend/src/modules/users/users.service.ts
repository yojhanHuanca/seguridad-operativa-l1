import { UserRepository } from "./users.repository.js";
import { RoleRepository } from "../roles/role.repository.js";
import { AreaRepository } from "../areas/area.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import { createUserSchema, idParamSchema, updateUserSchema } from "./users.schema.js";
import { AuditoriaService, diffCampos } from "../auditoria/auditoria.service.js";
import { AuthRepository } from "../auth/auth.repository.js";
import type { Actor } from "../../utils/actor.js";
import { parseOptionalPagination } from "../../utils/pagination.js";

/** Campos sensibles que nunca deben llegar al registro de auditoría en texto plano. */
const CAMPOS_SENSIBLES = new Set(["password", "password_hash"]);
const ROL_SEGURIDAD_OPERATIVA = "Seguridad Operativa";
const ROL_JEFE_AREA = "Jefe de Área";
const PERMISOS_ESPECIALES = ["es_responsable", "puede_reabrir_casos", "puede_rechazar_reportes"] as const;

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

type PermisosEspeciales = {
  [K in (typeof PERMISOS_ESPECIALES)[number]]?: boolean | undefined;
};


async function validarArea<T extends { id_area?: number | null | undefined }>(data: T, nombreRol?: string | null, areaActual?: number | null): Promise<T> {
  // Misma regla en alta manual, edición e importación: solo Jefe de Área.
  if (nombreRol !== ROL_JEFE_AREA) {
    return data.id_area !== undefined || areaActual != null || "id_rol" in data
      ? { ...data, id_area: null } : data;
  }

  const idArea = data.id_area === undefined ? areaActual : data.id_area;
  if (!idArea) throw new Error("El rol Jefe de Área requiere un área asignada");
  if (!await AreaRepository.findById(idArea)) throw new Error("El área seleccionada ya no existe. Actualiza las áreas y selecciona una válida.");

  return { ...data, id_area: idArea };
}

function permisosSoloParaSO<T extends PermisosEspeciales & { id_rol?: number | undefined }>(data: T, nombreRol?: string | null): T {
  if (nombreRol === ROL_SEGURIDAD_OPERATIVA) return data;

  const recibioPermisos = PERMISOS_ESPECIALES.some((key) => data[key] !== undefined);
  if (!recibioPermisos && data.id_rol === undefined) return data;

  return {
    ...data,
    es_responsable: false,
    puede_reabrir_casos: false,
    puede_rechazar_reportes: false,
  } as T;
}

export class UsersService {

     static async getAllUsers(query?: { search?: string; rol?: string; estado?: string; page?: string; limit?: string }) {
       const rol = Number(query?.rol);
       const pagination = parseOptionalPagination(query?.page, query?.limit);

       return UserRepository.findAll({
         ...(query?.search ? { search: query.search } : {}),
         ...(Number.isInteger(rol) && rol > 0 ? { rol } : {}),
         ...(query?.estado === "activo" || query?.estado === "inactivo" ? { estado: query.estado } : {}),
         ...(pagination ?? {}),
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

        const rol = await RoleRepository.findById(data.id_rol);
        if (!rol) throw new Error("Selecciona un rol existente de la plataforma.");


        const dataNormalizada = await validarArea(data, rol.nombre_rol);
        const password_hash = await BcryptHelper.hash(data.password);

        // Crear el usuario
        const creado = await UserRepository.createWithGeneratedCode(sinIndefinidos(permisosSoloParaSO({
            ...dataNormalizada,
            password_hash,
        }, rol?.nombre_rol)));

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
            if (emailExists && emailExists.id_usuario !== id) {
                throw new Error("El correo electrónico ya está registrado");
            }
        }

        // Cadena vacía = "no cambiar contraseña", igual que si no viniera el campo.
        const { password, ...rest } = data;
        const password_hash = password ? await BcryptHelper.hash(password) : undefined;
        const rolDestino = rest.id_rol ? await RoleRepository.findById(rest.id_rol) : usuario.roles;
        if (rest.id_rol && !rolDestino) throw new Error("Selecciona un rol existente de la plataforma.");
        if (actor?.id_usuario === id && usuario.roles?.nombre_rol === "Admin" &&
          ((rest.id_rol !== undefined && rolDestino?.nombre_rol !== "Admin") ||
            (rest.estado !== undefined && rest.estado !== "Activo"))) {
          throw new Error("No puedes desactivar tu propia cuenta ni quitarte el rol de administrador. Solicita el cambio a otro administrador.");
        }

        const dataNormalizada = await validarArea(rest, rolDestino?.nombre_rol, usuario.id_area);
        // Fail before revoking sessions, and recheck inside the write transaction.
        await UserRepository.assertAccessChangeAllowed(id, usuario, sinIndefinidos(dataNormalizada));

        const cambioDeAcceso = password_hash !== undefined
            || (data.estado !== undefined && data.estado !== usuario.estado)
            || (data.id_rol !== undefined && data.id_rol !== usuario.id_rol)
            || (dataNormalizada.id_area !== undefined && dataNormalizada.id_area !== usuario.id_area)
            || PERMISOS_ESPECIALES.some((key) => data[key] !== undefined && data[key] !== usuario[key]);
        // Revocar antes de guardar cambios sensibles: si la revocación falla,
        // el cambio de credencial/permisos tampoco se aplica parcialmente.
        if (cambioDeAcceso) await AuthRepository.cerrarTodasLasSesiones(id);

        const actualizado = await UserRepository.update(id, sinIndefinidos(permisosSoloParaSO({
            ...dataNormalizada,
            ...(password_hash ? { password_hash, debe_cambiar_password: true } : {}),
        }, rolDestino?.nombre_rol)));

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
                descripcion: password_hash ? `Restableció la contraseña temporal de ${actualizado.nombre}. ${resumen}` : `Editó al usuario ${actualizado.nombre}. ${resumen}`,
                usuario: actor.id_usuario,
                ip,
                ...(cambios ? { antes: cambios.antes, despues: cambios.despues } : {}),
            });
        }

        return actualizado;
    }
}
