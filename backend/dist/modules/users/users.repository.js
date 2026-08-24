import prisma from "../../lib/prisma.js";
import { randomUUID } from "node:crypto";
const SYSTEM_AUDIT_USER_CODE = "SYS-AUDIT";
const PUBLIC_SELECT = {
    id_usuario: true,
    codigo_usuario: true,
    nombre: true,
    correo: true,
    cargo: true,
    telefono: true,
    estado: true,
    fecha_ingreso: true,
    ultimo_acceso: true,
    es_responsable: true,
    puede_reabrir_casos: true,
    puede_rechazar_reportes: true,
    id_area: true,
    id_rol: true,
    roles: true,
    areas: true,
};
/**
 * Lo mínimo que necesitan los desplegables de "responsable" (asignar evento,
 * armar plan de acción) y la cabecera de cada panel. Deliberadamente NO trae
 * correo ni teléfono: el padrón completo es solo para el Admin.
 */
const BASIC_SELECT = {
    id_usuario: true,
    codigo_usuario: true,
    nombre: true,
    cargo: true,
    estado: true,
    es_responsable: true,
    id_area: true,
    id_rol: true,
    roles: { select: { nombre_rol: true } },
    areas: { select: { nombre_area: true } },
};
export class UserRepository {
    /** Directorio reducido, sin datos de contacto — ver BASIC_SELECT. */
    static async findAllBasic() {
        return prisma.usuarios.findMany({
            where: { NOT: { codigo_usuario: SYSTEM_AUDIT_USER_CODE } },
            select: BASIC_SELECT,
            orderBy: { id_usuario: "asc" },
        });
    }
    /**
     * `page`/`limit` son opcionales y deben venir juntos — sin ellos se
     * comporta exactamente igual que antes (trae todo). Es el mismo patrón
     * aditivo que ya usan Casos SOP, Reportes y Planes de Acción.
     */
    static async findAll(opts) {
        const where = { NOT: { codigo_usuario: SYSTEM_AUDIT_USER_CODE } };
        if (opts?.rol)
            where.id_rol = opts.rol;
        if (opts?.estado === "activo")
            where.estado = "Activo";
        else if (opts?.estado === "inactivo")
            where.estado = { not: "Activo" };
        if (opts?.search) {
            const q = opts.search;
            where.OR = [
                { codigo_usuario: { contains: q, mode: "insensitive" } },
                { nombre: { contains: q, mode: "insensitive" } },
                { correo: { contains: q, mode: "insensitive" } },
                { areas: { nombre_area: { contains: q, mode: "insensitive" } } },
            ];
        }
        const select = {
            id_usuario: true,
            codigo_usuario: true,
            nombre: true,
            correo: true,
            cargo: true,
            telefono: true,
            estado: true,
            ultimo_acceso: true,
            es_responsable: true,
            puede_reabrir_casos: true,
            puede_rechazar_reportes: true,
            id_area: true,
            id_rol: true,
            roles: { select: { nombre_rol: true } },
            areas: { select: { nombre_area: true } },
        };
        const orderBy = { id_usuario: "asc" };
        if (!opts?.page || !opts?.limit) {
            const data = await prisma.usuarios.findMany({ where, select, orderBy });
            return { data, total: undefined };
        }
        const [data, total] = await Promise.all([
            prisma.usuarios.findMany({
                where,
                select,
                orderBy,
                skip: (opts.page - 1) * opts.limit,
                take: opts.limit,
            }),
            prisma.usuarios.count({ where }),
        ]);
        return { data, total };
    }
    /**
     * Conteos para las tarjetas de resumen y la pestaña "Roles y Permisos" —
     * solo `COUNT`/`groupBy`, nunca trae las filas completas.
     */
    static async counts() {
        const visibles = { NOT: { codigo_usuario: SYSTEM_AUDIT_USER_CODE } };
        const seguridadOperativa = { ...visibles, roles: { nombre_rol: "Seguridad Operativa" } };
        const [total, activos, conRol, sinRol, porRol, esResponsable, puedeReabrirCasos, puedeRechazarReportes] = await Promise.all([
            prisma.usuarios.count({ where: visibles }),
            prisma.usuarios.count({ where: { ...visibles, estado: "Activo" } }),
            prisma.usuarios.count({ where: { ...visibles, id_rol: { not: null } } }),
            prisma.usuarios.count({ where: { ...visibles, id_rol: null } }),
            prisma.usuarios.groupBy({ by: ["id_rol"], where: visibles, _count: { id_rol: true } }),
            prisma.usuarios.count({ where: { ...seguridadOperativa, es_responsable: true } }),
            prisma.usuarios.count({ where: { ...seguridadOperativa, puede_reabrir_casos: true } }),
            prisma.usuarios.count({ where: { ...seguridadOperativa, puede_rechazar_reportes: true } }),
        ]);
        return {
            total,
            activos,
            conRol,
            sinRol,
            porRol: Object.fromEntries(porRol.filter((r) => r.id_rol != null).map((r) => [String(r.id_rol), r._count.id_rol])),
            porPermiso: {
                es_responsable: esResponsable,
                puede_reabrir_casos: puedeReabrirCasos,
                puede_rechazar_reportes: puedeRechazarReportes,
            },
        };
    }
    static async findById(id) {
        return await prisma.usuarios.findFirst({
            where: {
                id_usuario: id,
                NOT: { codigo_usuario: SYSTEM_AUDIT_USER_CODE },
            },
            select: PUBLIC_SELECT,
        });
    }
    static async createWithGeneratedCode(data) {
        return prisma.$transaction(async (tx) => {
            const created = await tx.usuarios.create({
                data: {
                    codigo_usuario: `TMP-${randomUUID().replaceAll("-", "").slice(0, 12)}`,
                    nombre: data.nombre,
                    correo: data.correo,
                    password_hash: data.password_hash,
                    cargo: data.cargo ?? null,
                    telefono: data.telefono ?? null,
                    id_area: data.id_area,
                    id_rol: data.id_rol,
                    es_responsable: data.es_responsable ?? false,
                    puede_reabrir_casos: data.puede_reabrir_casos ?? false,
                    puede_rechazar_reportes: data.puede_rechazar_reportes ?? false,
                    estado: "Activo",
                },
            });
            return tx.usuarios.update({
                where: { id_usuario: created.id_usuario },
                data: { codigo_usuario: `EMP-${String(created.id_usuario).padStart(4, "0")}` },
                select: PUBLIC_SELECT,
            });
        });
    }
    static async findByEmail(email) {
        return await prisma.usuarios.findUnique({
            where: {
                correo: email,
            },
        });
    }
    static async update(id, data) {
        return await prisma.usuarios.update({
            where: { id_usuario: id },
            data,
            select: PUBLIC_SELECT,
        });
    }
}
//# sourceMappingURL=users.repository.js.map