import prisma from "../../lib/prisma.js";
import { randomUUID } from "node:crypto";

const PUBLIC_SELECT = {
  id_usuario: true,
  codigo_usuario: true,
  nombre: true,
  correo: true,
  cargo: true,
  telefono: true,
  estado: true,
  fecha_ingreso: true,
  es_responsable: true,
  id_area: true,
  id_rol: true,
  roles: true,
  areas: true,
} as const;

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
} as const;

export class UserRepository {
     /** Directorio reducido, sin datos de contacto — ver BASIC_SELECT. */
     static async findAllBasic() {
        return prisma.usuarios.findMany({
            select: BASIC_SELECT,
            orderBy: { id_usuario: "asc" },
        });
     }

     static async findAll() {
        return prisma.usuarios.findMany({
            select: {
                id_usuario: true,
                codigo_usuario: true,
                nombre: true,
                correo: true,
                cargo: true,
                telefono: true,
                estado: true,
                es_responsable: true,
                id_area: true,
                id_rol: true,
                roles: {
                    select: {
                        nombre_rol: true,

                    },
                },
                areas: {
                    select: {
                        nombre_area: true,
                    },
                },

            },
            orderBy: {
              id_usuario: "asc",
            },

        });
     }

     static async findById(id: number) {
        return await prisma.usuarios.findUnique({
            where: {
                id_usuario: id,
            },
            select: PUBLIC_SELECT,
        });
     }

    static async createWithGeneratedCode(data: {
      nombre: string;
      correo: string;
      password_hash: string;
      cargo?: string | null;
      telefono?: string | null;
      id_area: number;
      id_rol: number;
      es_responsable?: boolean;
    }) {
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

    static async findByEmail(email: string) {
        return await prisma.usuarios.findUnique({
            where:{
                correo: email,
            },
        });

    }

    static async update(id: number, data: {
      nombre?: string;
      correo?: string;
      cargo?: string | null;
      telefono?: string | null;
      id_area?: number;
      id_rol?: number;
      estado?: string;
      es_responsable?: boolean;
      password_hash?: string;
    }) {
      return await prisma.usuarios.update({
        where: { id_usuario: id },
        data,
        select: PUBLIC_SELECT,
      });
    }
}


