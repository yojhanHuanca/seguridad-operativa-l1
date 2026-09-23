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


const SCHEMA_BOOTSTRAP = [
  `INSERT INTO "roles" ("nombre_rol") SELECT 'Gestión de Planes de Contingencia' WHERE NOT EXISTS (SELECT 1 FROM "roles" WHERE "nombre_rol" = 'Gestión de Planes de Contingencia')`,
  `CREATE TABLE IF NOT EXISTS "contingencia_catalogos" ("id_catalogo" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, "codigo" VARCHAR(80) NOT NULL, "nombre" VARCHAR(160) NOT NULL, "hoja_excel" VARCHAR(80), "columna_excel" VARCHAR(10), "estado" BOOLEAN NOT NULL DEFAULT true, "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "contingencia_catalogo_items" ("id_item" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, "id_catalogo" INTEGER NOT NULL, "valor" VARCHAR(220) NOT NULL, "orden" INTEGER NOT NULL DEFAULT 1, "estado" BOOLEAN NOT NULL DEFAULT true, "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "contingencia_eventos" ("id_evento" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, "codigo_evento" VARCHAR(30), "fecha" DATE NOT NULL, "hora_reporte" TIME(6), "mes" SMALLINT, "tipo_evento" VARCHAR(100) NOT NULL, "lugar_evento" VARCHAR(160), "lugar_exacto_evento" VARCHAR(180), "quien_reporta" VARCHAR(120), "medio_comunicacion_primer_reporte" VARCHAR(180), "estado_usuario_reportado" VARCHAR(80), "acepta_atencion" VARCHAR(20), "atencion_inicial" VARCHAR(120), "atencion_final" VARCHAR(120), "nivel_inicial" VARCHAR(60), "nivel_final" VARCHAR(60), "hora_termino_ae" TIME(6), "estado" VARCHAR(30) NOT NULL DEFAULT 'Registrado', "created_by" INTEGER, "updated_by" INTEGER, "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "contingencia_atenciones" ("id_atencion" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, "id_evento" INTEGER NOT NULL, "hora_llamado_pco_sppa" TIME(6), "hora_llegada_spaa" TIME(6), "hora_inicio_spaa" TIME(6), "hora_termino_atencion_inicio_traslado" TIME(6), "estacion_partida_spaa" VARCHAR(160), "medio_transporte_spaa" VARCHAR(120), "trasladado_por" VARCHAR(120))`,
  `CREATE TABLE IF NOT EXISTS "contingencia_traslados" ("id_traslado" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, "id_evento" INTEGER NOT NULL, "estacion_partida_ambulancia" VARCHAR(160), "estacion_llegada_ambulancia" VARCHAR(180), "hora_llamado_ambulancia" TIME(6), "hora_llegada_estacion" TIME(6), "hora_salida_centro_salud" TIME(6), "hora_llegada_centro_medico" TIME(6), "hora_retiro_centro_medico" TIME(6), "hora_retorno_puesto" TIME(6), "hora_llamado_ambulancia_tercero" TIME(6), "hora_llegada_ambulancia_terceros" TIME(6), "hora_inicio_traslado_ambulancia_terceros" TIME(6), "centro_salud" VARCHAR(180))`,
  `CREATE TABLE IF NOT EXISTS "contingencia_personas" ("id_persona" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, "id_evento" INTEGER NOT NULL, "nombre_persona" VARCHAR(180), "dni" VARCHAR(20), "sexo" VARCHAR(10), "edad" INTEGER, "tarjeta_cliente" VARCHAR(60), "categoria_paciente" VARCHAR(120), "extranjero" VARCHAR(10), "estacion_origen_usuario" VARCHAR(160), "estacion_destino_usuario" VARCHAR(160), "acompanante" VARCHAR(80), "numero_dni_acompanante" VARCHAR(20))`,
  `CREATE TABLE IF NOT EXISTS "contingencia_diagnosticos" ("id_diagnostico" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, "id_evento" INTEGER NOT NULL, "reporte_pco" VARCHAR(180), "reporte_cliente" VARCHAR(180), "diagnostico_presuntivo" VARCHAR(220), "sintomas_presentados" TEXT, "zona_lesion" VARCHAR(120), "nombre_personal_salud" VARCHAR(180), "tipo_declaracion_jurada" VARCHAR(20), "nro_declaracion_jurada" VARCHAR(80))`,
  `CREATE TABLE IF NOT EXISTS "contingencia_cierres" ("id_cierre" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, "id_evento" INTEGER NOT NULL, "breve_descripcion_hecho" TEXT, "reserva_camaras" VARCHAR(120), "observacion" TEXT, "registro" VARCHAR(120), "revision" VARCHAR(120), "casos_sospechosos_covid_19" VARCHAR(120))`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "id_evento" INTEGER GENERATED BY DEFAULT AS IDENTITY`,
  `ALTER TABLE "contingencia_atenciones" ADD COLUMN IF NOT EXISTS "id_atencion" INTEGER GENERATED BY DEFAULT AS IDENTITY`,
  `ALTER TABLE "contingencia_atenciones" ADD COLUMN IF NOT EXISTS "id_evento" INTEGER`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "id_traslado" INTEGER GENERATED BY DEFAULT AS IDENTITY`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "id_evento" INTEGER`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "id_persona" INTEGER GENERATED BY DEFAULT AS IDENTITY`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "id_evento" INTEGER`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "id_diagnostico" INTEGER GENERATED BY DEFAULT AS IDENTITY`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "id_evento" INTEGER`,
  `ALTER TABLE "contingencia_cierres" ADD COLUMN IF NOT EXISTS "id_cierre" INTEGER GENERATED BY DEFAULT AS IDENTITY`,
  `ALTER TABLE "contingencia_cierres" ADD COLUMN IF NOT EXISTS "id_evento" INTEGER`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "codigo_evento" VARCHAR(30)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "fecha" DATE NOT NULL DEFAULT CURRENT_DATE`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "hora_reporte" TIME(6)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "mes" SMALLINT`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "tipo_evento" VARCHAR(100) NOT NULL DEFAULT 'Problemas de salud'`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "lugar_evento" VARCHAR(160)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "lugar_exacto_evento" VARCHAR(180)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "quien_reporta" VARCHAR(120)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "medio_comunicacion_primer_reporte" VARCHAR(180)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "estado_usuario_reportado" VARCHAR(80)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "acepta_atencion" VARCHAR(20)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "atencion_inicial" VARCHAR(120)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "atencion_final" VARCHAR(120)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "nivel_inicial" VARCHAR(60)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "nivel_final" VARCHAR(60)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "hora_termino_ae" TIME(6)`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "estado" VARCHAR(30) NOT NULL DEFAULT 'Registrado'`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "created_by" INTEGER`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "updated_by" INTEGER`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
  `ALTER TABLE "contingencia_eventos" ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
  `ALTER TABLE "contingencia_atenciones" ADD COLUMN IF NOT EXISTS "hora_llamado_pco_sppa" TIME(6)`,
  `ALTER TABLE "contingencia_atenciones" ADD COLUMN IF NOT EXISTS "hora_llegada_spaa" TIME(6)`,
  `ALTER TABLE "contingencia_atenciones" ADD COLUMN IF NOT EXISTS "hora_inicio_spaa" TIME(6)`,
  `ALTER TABLE "contingencia_atenciones" ADD COLUMN IF NOT EXISTS "hora_termino_atencion_inicio_traslado" TIME(6)`,
  `ALTER TABLE "contingencia_atenciones" ADD COLUMN IF NOT EXISTS "estacion_partida_spaa" VARCHAR(160)`,
  `ALTER TABLE "contingencia_atenciones" ADD COLUMN IF NOT EXISTS "medio_transporte_spaa" VARCHAR(120)`,
  `ALTER TABLE "contingencia_atenciones" ADD COLUMN IF NOT EXISTS "trasladado_por" VARCHAR(120)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "estacion_partida_ambulancia" VARCHAR(160)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "estacion_llegada_ambulancia" VARCHAR(180)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "hora_llamado_ambulancia" TIME(6)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "hora_llegada_estacion" TIME(6)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "hora_salida_centro_salud" TIME(6)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "hora_llegada_centro_medico" TIME(6)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "hora_retiro_centro_medico" TIME(6)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "hora_retorno_puesto" TIME(6)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "hora_llamado_ambulancia_tercero" TIME(6)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "hora_llegada_ambulancia_terceros" TIME(6)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "hora_inicio_traslado_ambulancia_terceros" TIME(6)`,
  `ALTER TABLE "contingencia_traslados" ADD COLUMN IF NOT EXISTS "centro_salud" VARCHAR(180)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "nombre_persona" VARCHAR(180)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "dni" VARCHAR(20)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "sexo" VARCHAR(10)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "edad" INTEGER`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "tarjeta_cliente" VARCHAR(60)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "categoria_paciente" VARCHAR(120)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "extranjero" VARCHAR(10)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "estacion_origen_usuario" VARCHAR(160)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "estacion_destino_usuario" VARCHAR(160)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "acompanante" VARCHAR(80)`,
  `ALTER TABLE "contingencia_personas" ADD COLUMN IF NOT EXISTS "numero_dni_acompanante" VARCHAR(20)`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "reporte_pco" VARCHAR(180)`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "reporte_cliente" VARCHAR(180)`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "diagnostico_presuntivo" VARCHAR(220)`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "sintomas_presentados" TEXT`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "zona_lesion" VARCHAR(120)`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "nombre_personal_salud" VARCHAR(180)`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "tipo_declaracion_jurada" VARCHAR(20)`,
  `ALTER TABLE "contingencia_diagnosticos" ADD COLUMN IF NOT EXISTS "nro_declaracion_jurada" VARCHAR(80)`,
  `ALTER TABLE "contingencia_cierres" ADD COLUMN IF NOT EXISTS "breve_descripcion_hecho" TEXT`,
  `ALTER TABLE "contingencia_cierres" ADD COLUMN IF NOT EXISTS "reserva_camaras" VARCHAR(120)`,
  `ALTER TABLE "contingencia_cierres" ADD COLUMN IF NOT EXISTS "observacion" TEXT`,
  `ALTER TABLE "contingencia_cierres" ADD COLUMN IF NOT EXISTS "registro" VARCHAR(120)`,
  `ALTER TABLE "contingencia_cierres" ADD COLUMN IF NOT EXISTS "revision" VARCHAR(120)`,
  `ALTER TABLE "contingencia_cierres" ADD COLUMN IF NOT EXISTS "casos_sospechosos_covid_19" VARCHAR(120)`,
];

let schemaReady: Promise<void> | null = null;

async function ensureSchemaInicial() {
  schemaReady ??= (async () => {
    for (const statement of SCHEMA_BOOTSTRAP) await prisma.$executeRawUnsafe(statement);
  })();
  return schemaReady;
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
    await ensureSchemaInicial();
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
    await ensureSchemaInicial();
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
    await ensureSchemaInicial();
    const evento = await prisma.contingencia_eventos.findUnique({ where: { id_evento } });
    if (!evento) return null;
    const [completo] = await ContingenciaRepository.attachDetalles([evento]);
    if (!completo) return null;
    return completo;
  }

  static async create(dto: CreateContingenciaDto, actorId?: number, options?: { preserveImportedValues?: boolean; idImportacion?: number }) {
    await ensureSchemaInicial();
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
    await ensureSchemaInicial();
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
    await ensureSchemaInicial();
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
