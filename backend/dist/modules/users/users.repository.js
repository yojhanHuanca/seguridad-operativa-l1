import prisma from "../../lib/prisma.js";
import { randomUUID } from "node:crypto";
export class UserRepository {
    /**
     * `page`/`limit` son opcionales y deben venir juntos — sin ellos se
     * comporta exactamente igual que antes (trae todo). Es el mismo patrón
     * aditivo que ya usan Casos SOP, Reportes y Planes de Acción.
     */
    static async findAll(opts) {
        const where = {};
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
        const [total, activos, conRol, sinRol, porRol] = await Promise.all([
            prisma.usuarios.count(),
            prisma.usuarios.count({ where: { estado: "Activo" } }),
            prisma.usuarios.count({ where: { id_rol: { not: null } } }),
            prisma.usuarios.count({ where: { id_rol: null } }),
            prisma.usuarios.groupBy({ by: ["id_rol"], _count: { id_rol: true } }),
        ]);
        return {
            total,
            activos,
            conRol,
            sinRol,
            porRol: Object.fromEntries(porRol.filter((r) => r.id_rol != null).map((r) => [String(r.id_rol), r._count.id_rol])),
        };
    }
    static async findById(id) {
        return await prisma.usuarios.findUnique({
            where: {
                id_usuario: id,
            },
            include: {
                roles: true,
                areas: true,
            },
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
                    estado: "Activo",
                },
            });
            return tx.usuarios.update({
                where: { id_usuario: created.id_usuario },
                data: { codigo_usuario: `EMP-${String(created.id_usuario).padStart(4, "0")}` },
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
        });
    }
}
//# sourceMappingURL=users.repository.js.map