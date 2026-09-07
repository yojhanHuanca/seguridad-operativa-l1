import prisma from "../../lib/prisma.js";

export interface DatosOperativosFiltros {
  desde?: Date;
  hasta?: Date;
  page: number;
  limit: number;
}

function whereFor(filtros: DatosOperativosFiltros) {
  if (!filtros.desde && !filtros.hasta) return {};
  return {
    fecha: {
      ...(filtros.desde ? { gte: filtros.desde } : {}),
      ...(filtros.hasta ? { lte: filtros.hasta } : {}),
    },
  };
}

export class DatosOperativosRepository {
  static async findAll(filtros: DatosOperativosFiltros) {
    const where = whereFor(filtros);
    const [items, total] = await prisma.$transaction([
      prisma.datos_operativos.findMany({
        where,
        orderBy: { fecha: "desc" },
        skip: (filtros.page - 1) * filtros.limit,
        take: filtros.limit,
      }),
      prisma.datos_operativos.count({ where }),
    ]);
    return { items, total };
  }

  static findByFecha(fecha: Date) {
    return prisma.datos_operativos.findUnique({ where: { fecha } });
  }

  static create(data: {
    fecha: Date;
    qty_carreras: number;
    qty_pasajeros: number;
    km_comercial: number;
    km_no_comercial: number;
    paradas_estacion: number;
  }) {
    return prisma.datos_operativos.create({ data });
  }

  static update(id_dato_operativo: number, data: {
    fecha: Date;
    qty_carreras: number;
    qty_pasajeros: number;
    km_comercial: number;
    km_no_comercial: number;
    paradas_estacion: number;
  }) {
    return prisma.datos_operativos.update({ where: { id_dato_operativo }, data });
  }

  static remove(id_dato_operativo: number) {
    return prisma.datos_operativos.delete({ where: { id_dato_operativo } });
  }
}
