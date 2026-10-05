import type { Prisma } from "../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import {
  CONTINGENCIA_CATALOGOS_INICIALES,
  type ContingenciaCatalogoInicial,
} from "./contingencia.catalogos.js";
import type { CreateContingenciaDto, UpdateContingenciaDto } from "./contingencia.types.js";

const INCLUDE_EVENTO = {
  atencion: true,
  traslado: true,
  persona: true,
  diagnostico: true,
  cierre: true,
} satisfies Prisma.contingencia_eventosInclude;

export type ContingenciaEventoCompleto = Prisma.contingencia_eventosGetPayload<{ include: typeof INCLUDE_EVENTO }>;

export interface ContingenciaFiltros {
  search?: string;
  estado?: string;
  desde?: string;
  hasta?: string;
  sortBy?: "fecha" | "tipo_evento" | "estado";
  sortDir?: "asc" | "desc";
  page: number;
  limit: number;
}

function fechaDesdeIso(iso: string, finDia = false) {
  return new Date(`${iso}T${finDia ? "23:59:59.999" : "00:00:00.000"}Z`);
}

function whereFor(filtros: ContingenciaFiltros): Prisma.contingencia_eventosWhereInput {
  const where: Prisma.contingencia_eventosWhereInput = {};
  if (filtros.estado) where.estado = filtros.estado;
  if (filtros.desde || filtros.hasta) {
    where.fecha = {
      ...(filtros.desde ? { gte: fechaDesdeIso(filtros.desde) } : {}),
      ...(filtros.hasta ? { lte: fechaDesdeIso(filtros.hasta, true) } : {}),
    };
  }
  if (filtros.search?.trim()) {
    const q = filtros.search.trim();
    where.OR = [
      { codigo_evento: { contains: q, mode: "insensitive" } },
      { tipo_evento: { contains: q, mode: "insensitive" } },
      { lugar_evento: { contains: q, mode: "insensitive" } },
      { lugar_exacto_evento: { contains: q, mode: "insensitive" } },
      { quien_reporta: { contains: q, mode: "insensitive" } },
      { persona: { nombre_persona: { contains: q, mode: "insensitive" } } },
      { persona: { dni: { contains: q, mode: "insensitive" } } },
      { diagnostico: { diagnostico_presuntivo: { contains: q, mode: "insensitive" } } },
      { cierre: { registro: { contains: q, mode: "insensitive" } } },
      { cierre: { revision: { contains: q, mode: "insensitive" } } },
    ];
  }
  return where;
}

function codigoEvento(id: number, fecha: Date) {
  return String(id);
}

function eventoData(dto: CreateContingenciaDto | UpdateContingenciaDto, actorId?: number, options?: { preserveImportedValues?: boolean }) {
  const fecha = new Date(`${dto.fecha}T00:00:00.000Z`);
  return {
    fecha,
    hora_reporte: timeOrNull(dto.hora_reporte),
    mes: options?.preserveImportedValues ? null : fecha.getUTCMonth() + 1,
    tipo_evento: dto.tipo_evento,
    lugar_evento: dto.lugar_evento,
    lugar_exacto_evento: dto.lugar_exacto_evento,
    quien_reporta: dto.quien_reporta,
    medio_comunicacion_primer_reporte: dto.medio_comunicacion_primer_reporte ?? null,
    estado_usuario_reportado: dto.estado_usuario_reportado ?? null,
    acepta_atencion: dto.acepta_atencion ?? null,
    atencion_inicial: dto.atencion_inicial ?? null,
    atencion_final: dto.atencion_final ?? null,
    nivel_inicial: dto.nivel_inicial ?? null,
    nivel_final: dto.nivel_final ?? null,
    hora_termino_ae: timeOrNull(dto.hora_termino_ae),
    estado: dto.estado ?? "Registrado",
    updated_by: actorId ?? null,
  };
}

function atencionData(dto: CreateContingenciaDto | UpdateContingenciaDto) {
  return {
    hora_llamado_pco_sppa: timeOrNull(dto.hora_llamado_pco_sppa),
    hora_llegada_spaa: timeOrNull(dto.hora_llegada_spaa),
    hora_inicio_spaa: timeOrNull(dto.hora_inicio_spaa),
    hora_termino_atencion_inicio_traslado: timeOrNull(dto.hora_termino_atencion_inicio_traslado),
    estacion_partida_spaa: dto.estacion_partida_spaa ?? null,
    medio_transporte_spaa: dto.medio_transporte_spaa ?? null,
    trasladado_por: dto.trasladado_por ?? null,
  };
}

function trasladoData(dto: CreateContingenciaDto | UpdateContingenciaDto) {
  return {
    estacion_partida_ambulancia: dto.estacion_partida_ambulancia ?? null,
    estacion_llegada_ambulancia: dto.estacion_llegada_ambulancia ?? null,
    hora_llamado_ambulancia: timeOrNull(dto.hora_llamado_ambulancia),
    hora_llegada_estacion: timeOrNull(dto.hora_llegada_estacion),
    hora_salida_centro_salud: timeOrNull(dto.hora_salida_centro_salud),
    hora_llegada_centro_medico: timeOrNull(dto.hora_llegada_centro_medico),
    hora_retiro_centro_medico: timeOrNull(dto.hora_retiro_centro_medico),
    hora_retorno_puesto: timeOrNull(dto.hora_retorno_puesto),
    hora_llamado_ambulancia_tercero: timeOrNull(dto.hora_llamado_ambulancia_tercero),
    hora_llegada_ambulancia_terceros: timeOrNull(dto.hora_llegada_ambulancia_terceros),
    hora_inicio_traslado_ambulancia_terceros: timeOrNull(dto.hora_inicio_traslado_ambulancia_terceros),
    centro_salud: dto.centro_salud ?? null,
  };
}

function personaData(dto: CreateContingenciaDto | UpdateContingenciaDto) {
  return {
    nombre_persona: dto.nombre_persona ?? null,
    dni: dto.dni ?? null,
    sexo: dto.sexo ?? null,
    edad: dto.edad ?? null,
    tarjeta_cliente: dto.tarjeta_cliente ?? null,
    categoria_paciente: dto.categoria_paciente ?? null,
    extranjero: dto.extranjero ?? null,
    estacion_origen_usuario: dto.estacion_origen_usuario ?? null,
    estacion_destino_usuario: dto.estacion_destino_usuario ?? null,
    acompanante: dto.acompanante ?? null,
    numero_dni_acompanante: dto.numero_dni_acompanante ?? null,
  };
}

function diagnosticoData(dto: CreateContingenciaDto | UpdateContingenciaDto) {
  return {
    reporte_pco: dto.reporte_pco ?? null,
    reporte_cliente: dto.reporte_cliente ?? null,
    diagnostico_presuntivo: dto.diagnostico_presuntivo ?? null,
    sintomas_presentados: dto.sintomas_presentados ?? null,
    zona_lesion: dto.zona_lesion ?? null,
    nombre_personal_salud: dto.nombre_personal_salud ?? null,
    tipo_declaracion_jurada: dto.tipo_declaracion_jurada ?? null,
    nro_declaracion_jurada: dto.nro_declaracion_jurada ?? null,
  };
}

function cierreData(dto: CreateContingenciaDto | UpdateContingenciaDto) {
  return {
    breve_descripcion_hecho: dto.breve_descripcion_hecho ?? null,
    reserva_camaras: dto.reserva_camaras ?? null,
    observacion: dto.observacion ?? null,
    registro: dto.registro ?? null,
    revision: dto.revision ?? null,
    casos_sospechosos_covid_19: dto.casos_sospechosos_covid_19 ?? null,
  };
}

function timeOrNull(value?: string | null) {
  return value ? new Date(`1970-01-01T${value}:00.000Z`) : null;
}


async function upsertCatalogo(catalogo: ContingenciaCatalogoInicial) {
  const creado =
    (await prisma.contingencia_catalogos.findFirst({
      where: { codigo: catalogo.codigo },
      orderBy: { id_catalogo: "asc" },
    })) ??
    (await prisma.contingencia_catalogos.create({
      data: {
      codigo: catalogo.codigo,
      nombre: catalogo.nombre,
      hoja_excel: catalogo.hoja_excel,
      columna_excel: catalogo.columna_excel,
      },
    }));

  const existentes = await prisma.contingencia_catalogo_items.findMany({
    where: { id_catalogo: creado.id_catalogo },
    select: { valor: true },
  });
  const valoresExistentes = new Set(existentes.map((item) => item.valor));
  const faltantes = [...new Set(catalogo.items)]
    .map((valor, index) => ({ id_catalogo: creado.id_catalogo, valor, orden: index + 1 }))
    .filter((item) => !valoresExistentes.has(item.valor));

  if (faltantes.length) {
    await prisma.contingencia_catalogo_items.createMany({ data: faltantes });
  }
}

export class ContingenciaRepository {
  static async ensureCatalogosIniciales() {
    for (const catalogo of CONTINGENCIA_CATALOGOS_INICIALES) {
      await upsertCatalogo(catalogo);
    }
  }

  static async findCatalogos() {
    return prisma.contingencia_catalogos.findMany({
      where: { estado: true },
      include: { items: { where: { estado: true }, orderBy: { orden: "asc" } } },
      orderBy: { id_catalogo: "asc" },
    });
  }

  private static async attachDetalles(eventos: Prisma.contingencia_eventosGetPayload<Record<string, never>>[]) {
    const ids = eventos.map((evento) => evento.id_evento);
    if (!ids.length) return [] as ContingenciaEventoCompleto[];

    const [atenciones, traslados, personas, diagnosticos, cierres] = await Promise.all([
      prisma.contingencia_atenciones.findMany({ where: { id_evento: { in: ids } } }),
      prisma.contingencia_traslados.findMany({ where: { id_evento: { in: ids } } }),
      prisma.contingencia_personas.findMany({ where: { id_evento: { in: ids } } }),
      prisma.contingencia_diagnosticos.findMany({ where: { id_evento: { in: ids } } }),
      prisma.contingencia_cierres.findMany({ where: { id_evento: { in: ids } } }),
    ]);

    const byEvento = <R extends { id_evento: number }>(rows: R[]) => new Map(rows.map((row) => [row.id_evento, row]));
    const atencionPorEvento = byEvento(atenciones);
    const trasladoPorEvento = byEvento(traslados);
    const personaPorEvento = byEvento(personas);
    const diagnosticoPorEvento = byEvento(diagnosticos);
    const cierrePorEvento = byEvento(cierres);

    return eventos.map((evento) => ({
      ...evento,
      atencion: atencionPorEvento.get(evento.id_evento) ?? null,
      traslado: trasladoPorEvento.get(evento.id_evento) ?? null,
      persona: personaPorEvento.get(evento.id_evento) ?? null,
      diagnostico: diagnosticoPorEvento.get(evento.id_evento) ?? null,
      cierre: cierrePorEvento.get(evento.id_evento) ?? null,
    })) as ContingenciaEventoCompleto[];
  }

  static async findAll(filtros: ContingenciaFiltros) {
    const where = whereFor(filtros);
    const orderBy: Prisma.contingencia_eventosOrderByWithRelationInput[] = [
      { [filtros.sortBy ?? "fecha"]: filtros.sortDir ?? "desc" },
      { id_evento: "desc" },
    ];
    const [eventos, total] = await prisma.$transaction([
      prisma.contingencia_eventos.findMany({
        where,
        orderBy,
        skip: (filtros.page - 1) * filtros.limit,
        take: filtros.limit,
      }),
      prisma.contingencia_eventos.count({ where }),
    ]);
    return { items: await ContingenciaRepository.attachDetalles(eventos), total };
  }

  static async findById(id_evento: number) {
    const evento = await prisma.contingencia_eventos.findUnique({ where: { id_evento } });
    if (!evento) return null;
    const [completo] = await ContingenciaRepository.attachDetalles([evento]);
    if (!completo) return null;
    return completo;
  }

  static async create(dto: CreateContingenciaDto, actorId?: number, options?: { preserveImportedValues?: boolean; idImportacion?: number }) {
    const evento = await prisma.$transaction(async (tx) => {
      const creado = await tx.contingencia_eventos.create({
        data: {
          ...eventoData(dto, actorId, options),
          created_by: actorId ?? null,
          id_importacion: options?.idImportacion ?? null,
        },
      });

      await Promise.all([
        tx.contingencia_atenciones.create({ data: { id_evento: creado.id_evento, ...atencionData(dto) } }),
        tx.contingencia_traslados.create({ data: { id_evento: creado.id_evento, ...trasladoData(dto) } }),
        tx.contingencia_personas.create({ data: { id_evento: creado.id_evento, ...personaData(dto) } }),
        tx.contingencia_diagnosticos.create({ data: { id_evento: creado.id_evento, ...diagnosticoData(dto) } }),
        tx.contingencia_cierres.create({ data: { id_evento: creado.id_evento, ...cierreData(dto) } }),
      ]);

      return tx.contingencia_eventos.update({
        where: { id_evento: creado.id_evento },
        data: { codigo_evento: codigoEvento(creado.id_evento, creado.fecha) },
      });
    });

    const [completo] = await ContingenciaRepository.attachDetalles([evento]);
    if (!completo) throw new Error("No se pudo registrar el evento");
    return completo;
  }

  static async update(id_evento: number, dto: UpdateContingenciaDto, actorId?: number) {
    await prisma.$transaction(async (tx) => {
      await tx.contingencia_eventos.update({ where: { id_evento }, data: eventoData(dto, actorId) });
      await Promise.all([
        tx.contingencia_atenciones.upsert({
          where: { id_evento },
          update: atencionData(dto),
          create: { id_evento, ...atencionData(dto) },
        }),
        tx.contingencia_traslados.upsert({
          where: { id_evento },
          update: trasladoData(dto),
          create: { id_evento, ...trasladoData(dto) },
        }),
        tx.contingencia_personas.upsert({
          where: { id_evento },
          update: personaData(dto),
          create: { id_evento, ...personaData(dto) },
        }),
        tx.contingencia_diagnosticos.upsert({
          where: { id_evento },
          update: diagnosticoData(dto),
          create: { id_evento, ...diagnosticoData(dto) },
        }),
        tx.contingencia_cierres.upsert({
          where: { id_evento },
          update: cierreData(dto),
          create: { id_evento, ...cierreData(dto) },
        }),
      ]);
    });
    const actualizado = await ContingenciaRepository.findById(id_evento);
    if (!actualizado) throw new Error("Evento no encontrado");
    return actualizado;
  }

  static async remove(id_evento: number) {
    const existente = await ContingenciaRepository.findById(id_evento);
    if (!existente) return null;

    await prisma.$transaction(async (tx) => {
      await Promise.all([
        tx.contingencia_atenciones.deleteMany({ where: { id_evento } }),
        tx.contingencia_traslados.deleteMany({ where: { id_evento } }),
        tx.contingencia_personas.deleteMany({ where: { id_evento } }),
        tx.contingencia_diagnosticos.deleteMany({ where: { id_evento } }),
        tx.contingencia_cierres.deleteMany({ where: { id_evento } }),
      ]);
      await tx.contingencia_eventos.delete({ where: { id_evento } });
    });

    return existente;
  }


}
