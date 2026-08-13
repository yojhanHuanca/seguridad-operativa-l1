import prisma from "../../lib/prisma.js";

export class UserRepository {
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
            include: {
                roles: true,
                areas: true,
            },
        });
     }

    static async create(data: {
      codigo_usuario: string;
      nombre: string;
      correo: string;
      password_hash: string;
      cargo?: string | null;
      telefono?: string | null;
      id_area: number;
      id_rol: number;
    }) {
      return await prisma.usuarios.create({
        data: {
          codigo_usuario: data.codigo_usuario,
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
    }

    static async findByEmail(email: string) {
        return await prisma.usuarios.findUnique({
            where:{
                correo: email,
            },
        });

    }

    static async findByCodigo(codigo: string) {
        return await prisma.usuarios.findUnique({
            where: {
                codigo_usuario: codigo,
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
      password_hash?: string;
    }) {
      return await prisma.usuarios.update({
        where: { id_usuario: id },
        data,
      });
    }
}


