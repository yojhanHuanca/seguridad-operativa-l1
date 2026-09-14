import { CONTINGENCIA_CATALOGOS_INICIALES, CONTINGENCIA_CATALOGOS_POR_CAMPO, ESTACIONES_LINEA_1 } from "./contingencia.catalogos.js";
import { ContingenciaRepository, type ContingenciaEventoCompleto } from "./contingencia.repository.js";
import { validarReglasContingencia } from "./contingencia.rules.js";
import {
  createContingenciaSchema,
  fechaContingenciaSchema,
  ESTADOS_CONTINGENCIA,
  type CreateContingenciaDto,
  type UpdateContingenciaDto,
  updateContingenciaSchema,
} from "./contingencia.types.js";
import { AuditoriaService } from "../auditoria/auditoria.service.js";
import type { Actor } from "../../utils/actor.js";

function parseId(id: unknown) {
  const value = Number(id);
  if (!Number.isInteger(value) || value <= 0) throw new Error("El evento solicitado no es válido");
  return value;
}

function parsePage(value: unknown) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function parseLimit(value: unknown) {
  const parsed = Number(value);
  return Math.min(100, Number.isInteger(parsed) && parsed > 0 ? parsed : 20);
}

function parseFechaQuery(value: unknown, label: string) {
  if (value == null || value === "") return undefined;
  if (!fechaContingenciaSchema.safeParse(value).success) {
    throw new Error(`${label} debe ser una fecha válida (YYYY-MM-DD)`);
  }
  return value as string;
}

function parseSortBy(value: unknown) {
  return value === "tipo_evento" || value === "estado" || value === "fecha" ? value : "fecha";
}

function parseSortDir(value: unknown) {
  return value === "asc" ? "asc" : "desc";
}

function timeToHHmm(value?: Date | null) {
  if (!value) return null;
  return `${String(value.getUTCHours()).padStart(2, "0")}:${String(value.getUTCMinutes()).padStart(2, "0")}`;
}

function dateToIso(value: Date) {
  return value.toISOString().slice(0, 10);
}

function minutosEntre(inicio?: Date | null, fin?: Date | null) {
  if (!inicio || !fin) return null;
  return Math.round((fin.getTime() - inicio.getTime()) / 60_000);
}

const CATEGORIAS_PACIENTE = [
  "Colaborador UNNA",
  "Colaborador Tercero",
  "Otro",
  "Proveedor",
  "Transeúnte",
  "Pasajero",
];

function categoriaPaciente(value: string | null | undefined) {
  return value?.trim().toLowerCase() === "usuario" ? "Pasajero" : value;
}

const ESTACION_CODIGOS = [
  "VES",
  "PIN",
  "PUM",
  "VMA",
  "MAU",
  "SJU",
  "ATO",
  "JCH",
  "AYA",
  "CAB",
  "ANG",
  "SBS",
  "CUL",
  "NAR",
  "GAM",
  "MIG",
  "ELA",
  "PRE",
  "CAA",
  "PIR",
  "JAR",
  "POS",
  "SCA",
  "SMA",
  "SRO",
  "BAY",
];

const CAMPOS_ESTACION = [
  "lugar_evento",
  "estacion_partida_spaa",
  "estacion_partida_ambulancia",
  "estacion_llegada_ambulancia",
  "estacion_origen_usuario",
  "estacion_destino_usuario",
] as const;

const CATALOGOS_ESTACION = [
  "lugar_del_evento",
  "estacion_de_partida_del_spaa",
  "estacion_de_partida_de_la_ambulancia",
  "estacion_de_llegada_de_la_ambulancia",
  "estacion_de_origen_del_usuario",
  "estacion_de_destino_del_usuario",
];

function normalizarTexto(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

const ESTACIONES_POR_ALIAS = new Map<string, string>();
ESTACION_CODIGOS.forEach((codigo, index) => {
  const estacion = ESTACIONES_LINEA_1[index];
  if (!estacion) return;
  ESTACIONES_POR_ALIAS.set(normalizarTexto(codigo), estacion);
  ESTACIONES_POR_ALIAS.set(normalizarTexto(`Estacion ${codigo}`), estacion);
  ESTACIONES_POR_ALIAS.set(normalizarTexto(`Estación ${codigo}`), estacion);
});

function estacionLinea1(value: string | null | undefined) {
  if (!value) return value;
  return ESTACIONES_POR_ALIAS.get(normalizarTexto(value)) ?? value;
}

function valorCatalogoContingencia(codigo: string, value: string) {
  if (codigo === "categoria_de_paciente") return categoriaPaciente(value) ?? value;
  if (CATALOGOS_ESTACION.includes(codigo)) return estacionLinea1(value) ?? value;
  return value;
}

function normalizarDto(dto: CreateContingenciaDto | UpdateContingenciaDto) {
  if (dto.categoria_paciente) dto.categoria_paciente = categoriaPaciente(dto.categoria_paciente) ?? undefined;
  for (const campo of CAMPOS_ESTACION) {
    const value = dto[campo];
    const normalizado = value ? estacionLinea1(value) : value;
    if (normalizado) dto[campo] = normalizado;
  }
}

type CatalogoItem = Awaited<ReturnType<typeof ContingenciaRepository.findCatalogos>>[number]["items"][number];

function completarItemsBase(codigo: string, idCatalogo: number, normalizados: CatalogoItem[]) {
  const presentes = new Set(normalizados.map((item) => normalizarTexto(item.valor)));
  const base = CONTINGENCIA_CATALOGOS_INICIALES.find((catalogo) => catalogo.codigo === codigo)?.items ?? [];
  const faltantes = base
    .map((valor) => valorCatalogoContingencia(codigo, valor))
    .filter((valor): valor is string => Boolean(valor))
    .filter((valor, index, all) => all.findIndex((other) => normalizarTexto(other) === normalizarTexto(valor)) === index)
    .filter((valor) => !presentes.has(normalizarTexto(valor)));

  return [
    ...normalizados,
    ...faltantes.map((valor, index) => ({
      id_item: -1 - index,
      id_catalogo: idCatalogo,
      valor,
      orden: normalizados.length + index + 1,
      estado: true,
      created_at: new Date(0),
    })),
  ];
}

function itemsNormalizados(codigo: string, idCatalogo: number, items: CatalogoItem[]) {
  const normalizados = items
    .map((item) => ({ ...item, valor: valorCatalogoContingencia(codigo, item.valor) }))
    .filter((item, index, all) => all.findIndex((other) => other.valor === item.valor) === index);

  if (codigo === "categoria_de_paciente") {
    const porValor = new Map(normalizados.map((item) => [normalizarTexto(item.valor), item]));
    return CATEGORIAS_PACIENTE.map((valor, index) => {
      const existente = porValor.get(normalizarTexto(valor));
      return existente
        ? { ...existente, valor, orden: index + 1 }
        : {
            id_item: -100 - index,
            id_catalogo: idCatalogo,
            valor,
            orden: index + 1,
            estado: true,
            created_at: new Date(0),
          };
    });
  }

  const completos = completarItemsBase(codigo, idCatalogo, normalizados);
  if (!CATALOGOS_ESTACION.includes(codigo)) return completos;

  const presentes = new Set(completos.map((item) => normalizarTexto(item.valor)));
  const faltantes = ESTACIONES_LINEA_1.filter((estacion) => !presentes.has(normalizarTexto(estacion)));
  return [
    ...completos,
    ...faltantes.map((valor, index) => ({
      id_item: -1000 - index,
      id_catalogo: idCatalogo,
      valor,
      orden: completos.length + index + 1,
      estado: true,
      created_at: new Date(0),
    })),
  ];
}

function serializar(evento: ContingenciaEventoCompleto) {
  return {
    ...evento,
    lugar_evento: estacionLinea1(evento.lugar_evento),
    persona: evento.persona
      ? {
          ...evento.persona,
          categoria_paciente: categoriaPaciente(evento.persona.categoria_paciente),
          estacion_origen_usuario: estacionLinea1(evento.persona.estacion_origen_usuario),
          estacion_destino_usuario: estacionLinea1(evento.persona.estacion_destino_usuario),
        }
      : null,
    fecha: dateToIso(evento.fecha),
    hora_reporte: timeToHHmm(evento.hora_reporte),
    hora_termino_ae: timeToHHmm(evento.hora_termino_ae),
    created_at: evento.created_at.toISOString(),
    updated_at: evento.updated_at.toISOString(),
    atencion: evento.atencion
      ? {
          ...evento.atencion,
          estacion_partida_spaa: estacionLinea1(evento.atencion.estacion_partida_spaa),
          hora_llamado_pco_sppa: timeToHHmm(evento.atencion.hora_llamado_pco_sppa),
          hora_llegada_spaa: timeToHHmm(evento.atencion.hora_llegada_spaa),
          hora_inicio_spaa: timeToHHmm(evento.atencion.hora_inicio_spaa),
          hora_termino_atencion_inicio_traslado: timeToHHmm(evento.atencion.hora_termino_atencion_inicio_traslado),
          tiempo_respuesta_spaa_minutos: minutosEntre(evento.atencion.hora_llamado_pco_sppa, evento.atencion.hora_llegada_spaa),
        }
      : null,
    traslado: evento.traslado
      ? {
          ...evento.traslado,
          estacion_partida_ambulancia: estacionLinea1(evento.traslado.estacion_partida_ambulancia),
          estacion_llegada_ambulancia: estacionLinea1(evento.traslado.estacion_llegada_ambulancia),
          hora_llamado_ambulancia: timeToHHmm(evento.traslado.hora_llamado_ambulancia),
          hora_llegada_estacion: timeToHHmm(evento.traslado.hora_llegada_estacion),
          hora_salida_centro_salud: timeToHHmm(evento.traslado.hora_salida_centro_salud),
          hora_llegada_centro_medico: timeToHHmm(evento.traslado.hora_llegada_centro_medico),
          hora_retiro_centro_medico: timeToHHmm(evento.traslado.hora_retiro_centro_medico),
          hora_retorno_puesto: timeToHHmm(evento.traslado.hora_retorno_puesto),
          hora_llamado_ambulancia_tercero: timeToHHmm(evento.traslado.hora_llamado_ambulancia_tercero),
          hora_llegada_ambulancia_terceros: timeToHHmm(evento.traslado.hora_llegada_ambulancia_terceros),
          hora_inicio_traslado_ambulancia_terceros: timeToHHmm(evento.traslado.hora_inicio_traslado_ambulancia_terceros),
          tiempo_llegada_ambulancia_minutos: minutosEntre(evento.traslado.hora_llamado_ambulancia, evento.traslado.hora_llegada_estacion),
          tiempo_evacuacion_minutos: minutosEntre(evento.traslado.hora_llegada_estacion, evento.traslado.hora_salida_centro_salud),
        }
      : null,
  };
}

async function validarCatalogos(dto: CreateContingenciaDto | UpdateContingenciaDto) {
  const catalogos = await ContingenciaService.catalogos();
  for (const [campo, codigoCatalogo] of Object.entries(CONTINGENCIA_CATALOGOS_POR_CAMPO)) {
    const valor = dto[campo as keyof typeof dto];
    if (typeof valor !== "string" || valor === "") continue;
    const existe = catalogos.some((catalogo) => catalogo.codigo === codigoCatalogo && catalogo.items.some((item) => item.valor === valor));
    if (!existe) throw new Error(`El valor "${valor.trim()}" no pertenece al catálogo correspondiente.`);
  }
}

async function validarDto(dto: CreateContingenciaDto | UpdateContingenciaDto) {
  await validarCatalogos(dto);
  validarReglasContingencia({
    categoria_paciente: dto.categoria_paciente ?? null,
    lugar_exacto_evento: dto.lugar_exacto_evento,
  });
}

export class ContingenciaService {
  static async catalogos() {
    await ContingenciaRepository.ensureCatalogosIniciales();
    const catalogos = await ContingenciaRepository.findCatalogos();
    return catalogos.map((catalogo) => ({ ...catalogo, items: itemsNormalizados(catalogo.codigo, catalogo.id_catalogo, catalogo.items) }));
  }

  static async list(query: Record<string, unknown>) {
    const desde = parseFechaQuery(query.desde, "La fecha inicial");
    const hasta = parseFechaQuery(query.hasta, "La fecha final");
    if (desde && hasta && desde > hasta) throw new Error("La fecha inicial no puede ser posterior a la fecha final");

    const estado = ESTADOS_CONTINGENCIA.includes(query.estado as (typeof ESTADOS_CONTINGENCIA)[number])
      ? (query.estado as string)
      : undefined;

    const result = await ContingenciaRepository.findAll({
      page: parsePage(query.page),
      limit: parseLimit(query.limit),
      ...(typeof query.search === "string" && query.search.trim() ? { search: query.search } : {}),
      ...(estado ? { estado } : {}),
      ...(desde ? { desde } : {}),
      ...(hasta ? { hasta } : {}),
      sortBy: parseSortBy(query.sortBy),
      sortDir: parseSortDir(query.sortDir),
    });

    return { items: result.items.map(serializar), total: result.total };
  }

  static async getById(id: unknown) {
    const evento = await ContingenciaRepository.findById(parseId(id));
    if (!evento) throw new Error("Evento no encontrado");
    return serializar(evento);
  }

  static async create(raw: unknown, actor?: Actor) {
    const dto = createContingenciaSchema.parse(raw);
    normalizarDto(dto);
    await validarDto(dto);
    const creado = await ContingenciaRepository.create(dto, actor?.id_usuario);
    if (actor) {
      await AuditoriaService.registrar({
        tabla: "contingencia_eventos",
        id_registro: creado.id_evento,
        accion: "crear",
        descripcion: `Registró el evento de contingencia ${creado.codigo_evento ?? creado.id_evento}`,
        usuario: actor.id_usuario,
        despues: serializar(creado) as Record<string, unknown>,
      });
    }
    return serializar(creado);
  }

  static async update(id: unknown, raw: unknown, actor?: Actor) {
    const idEvento = parseId(id);
    const dto = updateContingenciaSchema.parse(raw);
    normalizarDto(dto);
    await validarDto(dto);
    const antes = await ContingenciaRepository.findById(idEvento);
    if (!antes) throw new Error("Evento no encontrado");
    const actualizado = await ContingenciaRepository.update(idEvento, dto, actor?.id_usuario);
    if (actor) {
      await AuditoriaService.registrar({
        tabla: "contingencia_eventos",
        id_registro: idEvento,
        accion: "editar",
        descripcion: `Editó el evento de contingencia ${actualizado.codigo_evento ?? idEvento}`,
        usuario: actor.id_usuario,
        antes: serializar(antes) as Record<string, unknown>,
        despues: serializar(actualizado) as Record<string, unknown>,
      });
    }
    return serializar(actualizado);
  }

  static async remove(id: unknown, actor?: Actor) {
    const idEvento = parseId(id);
    const eliminado = await ContingenciaRepository.remove(idEvento);
    if (!eliminado) throw new Error("Evento no encontrado");

    if (actor) {
      await AuditoriaService.registrar({
        tabla: "contingencia_eventos",
        id_registro: eliminado.id_evento,
        accion: "eliminar",
        descripcion: `Eliminó el evento de contingencia ${eliminado.codigo_evento ?? eliminado.id_evento}`,
        usuario: actor.id_usuario,
        antes: serializar(eliminado) as Record<string, unknown>,
      });
    }

    return serializar(eliminado);
  }

}

