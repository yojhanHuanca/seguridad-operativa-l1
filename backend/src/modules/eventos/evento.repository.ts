import prisma from "../../lib/prisma.js";
import type { CreateEventoDto, UpdateEventoDto } from "./evento.types.js";

const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export const ESTADOS_EVENTO = ["Registrado", "En investigación", "Cerrado"] as const;

/** Día calendario 1-7 de la semana ISO-ish, más el nombre en español. */
function diaSemana(fecha: Date) {
  return DIAS[fecha.getUTCDay()] ?? "Domingo";
}

/** Semana del año (1-53), calculada igual que en el prototipo: días desde el 1 de enero / 7. */
function semanaDelAnio(fecha: Date) {
  const inicioAnio = Date.UTC(fecha.getUTCFullYear(), 0, 1);
  const dias = Math.floor((fecha.getTime() - inicioAnio) / 86_400_000);
  return Math.floor(dias / 7) + 1;
}

/** "08:00 - 09:59", el mismo formato con el que está sembrado el catálogo "Rango horario". */
function rangoHorarioLabel(hora: string) {
  const horaNum = Number(hora.split(":")[0]);
  const inicio = Math.floor(horaNum / 2) * 2;
  const fin = inicio + 1;
  return `${String(inicio).padStart(2, "0")}:00 - ${String(fin).padStart(2, "0")}:59`;
}

const LIST_INCLUDE = {
  catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle: { select: { codigo: true, nombre: true } },
  catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle: { select: { nombre: true } },
  usuarios_eventos_monitoreo_usuario_registraTousuarios: { select: { nombre: true } },
  usuarios_eventos_monitoreo_asignado_aTousuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
  casos_sop: { select: { codigo_sop: true } },
} as const;

function datosDesdeDto(dto: CreateEventoDto | UpdateEventoDto) {
  return {
    descripcion: dto.descripcion ?? null,
    ubicacion: dto.id_ubicacion ?? null,
    tipo_via: dto.id_tipo_via ?? null,
    direccion_via: dto.id_direccion_via ?? null,
    lugar_incidente: dto.id_lugar_incidente ?? null,
    modelo_mr: dto.id_modelo_mr ?? null,
    numero_mr: dto.id_numero_mr ?? null,
    numero_carrera: dto.numero_carrera ?? null,
    personal_involucrado: dto.id_personal_involucrado ?? null,
    tipo_causa: dto.id_tipo_causa ?? null,
    posible_causa: dto.id_posible_causa ?? null,
    informacion_adicional: dto.informacion_adicional ?? null,
    camara_monitoreada: dto.camara_monitoreada ?? null,
    demora: dto.demora ?? null,
  };
}

export class EventoRepository {
  static async findCatalogoDetalleById(id_detalle: number) {
    return prisma.catalogo_detalle.findUnique({
      where: { id_detalle },
      include: { catalogos: { select: { nombre: true } } },
    });
  }


  /**
   * `page`/`limit` son opcionales y deben venir juntos — sin ellos se
   * comporta exactamente igual que antes (trae todo). Eso es a propósito:
   * el Dashboard y Reportes de Monitoreo siguen llamando esto sin paginar
   * porque necesitan el listado entero para sus propios agregados — solo
   * el Historial manda `page`/`limit`, igual que ya hace Casos SOP.
   */
  static async findAll(opts?: {
    estado?: string;
    search?: string;
    desde?: string;
    hasta?: string;
    page?: number;
    limit?: number;
  }) {
    const where: Record<string, unknown> = {};

    if (opts?.estado) where.estado = opts.estado;
    if (opts?.desde || opts?.hasta) {
      where.fecha = {
        ...(opts.desde ? { gte: new Date(`${opts.desde}T00:00:00.000Z`) } : {}),
        ...(opts.hasta ? { lte: new Date(`${opts.hasta}T23:59:59.999Z`) } : {}),
      };
    }
    if (opts?.search) {
      const q = opts.search;
      where.OR = [
        { descripcion: { contains: q, mode: "insensitive" } },
        { camara_monitoreada: { contains: q, mode: "insensitive" } },
        { catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: { nombre: { contains: q, mode: "insensitive" } } },
        { catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle: { nombre: { contains: q, mode: "insensitive" } } },
        { catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: { nombre: { contains: q, mode: "insensitive" } } },
      ];
    }

    const orderBy = [{ fecha: "desc" as const }, { id_evento: "desc" as const }];

    if (!opts?.page || !opts?.limit) {
      const data = await prisma.eventos_monitoreo.findMany({ where, include: LIST_INCLUDE, orderBy });
      return { data, total: undefined as number | undefined };
    }

    const [data, total] = await Promise.all([
      prisma.eventos_monitoreo.findMany({
        where,
        include: LIST_INCLUDE,
        orderBy,
        skip: (opts.page - 1) * opts.limit,
        take: opts.limit,
      }),
      prisma.eventos_monitoreo.count({ where }),
    ]);
    return { data, total };
  }

  /** Conteos por estado para las pestañas del Historial — solo `COUNT`, nunca trae filas. */
  static async counts() {
    const [total, registrados, enInvestigacion, cerrados] = await Promise.all([
      prisma.eventos_monitoreo.count(),
      prisma.eventos_monitoreo.count({ where: { estado: "Registrado" } }),
      prisma.eventos_monitoreo.count({ where: { estado: "En investigación" } }),
      prisma.eventos_monitoreo.count({ where: { estado: "Cerrado" } }),
    ]);
    return { total, registrados, enInvestigacion, cerrados };
  }

  static async findById(id_evento: number) {
    return prisma.eventos_monitoreo.findUnique({ where: { id_evento }, include: LIST_INCLUDE });
  }

  /** Eventos que le asignaron a esta persona de Seguridad Operativa, para su bandeja. */
  static async findByAsignado(id_usuario: number) {
    return prisma.eventos_monitoreo.findMany({
      where: { asignado_a: id_usuario },
      include: LIST_INCLUDE,
      orderBy: [{ fecha: "desc" }, { id_evento: "desc" }],
    });
  }

  static async asignar(id_evento: number, id_usuario: number) {
    return prisma.eventos_monitoreo.update({ where: { id_evento }, data: { asignado_a: id_usuario } });
  }

  static async create(dto: CreateEventoDto, actor?: number) {
    const match = dto.fecha.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) throw new Error("Fecha inválida");
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const fecha = new Date(Date.UTC(year, month - 1, day));
    const hora = new Date(`1970-01-01T${dto.hora}:00.000Z`);

    // Año/mes/semana/día/rango horario se calculan solos a partir de
    // fecha+hora, pero el usuario los puede corregir a mano en el
    // formulario — si vienen en el DTO, ganan sobre el cálculo automático.
    let rango_horario: number | null = null;
    if (dto.id_rango_horario != null) {
      rango_horario = dto.id_rango_horario;
    } else {
      const rango = await prisma.catalogo_detalle.findFirst({
        where: { nombre: rangoHorarioLabel(dto.hora), catalogos: { nombre: "Rango horario" } },
      });
      rango_horario = rango?.id_detalle ?? null;
    }

    return prisma.eventos_monitoreo.create({
      data: {
        fecha,
        hora,
        anio: dto.anio ?? year,
        mes: dto.mes ?? month,
        semana: dto.semana ?? semanaDelAnio(fecha),
        dia: dto.dia ?? diaSemana(fecha),
        rango_horario,
        tipo_incidente: dto.id_tipo_incidente,
        usuario_registra: actor ?? null,
        ...datosDesdeDto(dto),
      },
    });
  }

  static async update(id_evento: number, dto: UpdateEventoDto) {
    const data: Record<string, unknown> = datosDesdeDto(dto);

    if (dto.fecha) {
      const match = dto.fecha.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!match) throw new Error("Fecha inválida");
      const year = Number(match[1]);
      const month = Number(match[2]);
      const fecha = new Date(Date.UTC(year, month - 1, Number(match[3])));
      data.fecha = fecha;
      data.anio = year;
      data.mes = month;
      data.semana = semanaDelAnio(fecha);
      data.dia = diaSemana(fecha);
    }
    if (dto.hora) {
      data.hora = new Date(`1970-01-01T${dto.hora}:00.000Z`);
      const rango = await prisma.catalogo_detalle.findFirst({
        where: { nombre: rangoHorarioLabel(dto.hora), catalogos: { nombre: "Rango horario" } },
      });
      data.rango_horario = rango?.id_detalle ?? null;
    }
    if (dto.estado) data.estado = dto.estado;
    if (dto.id_tipo_incidente != null) data.tipo_incidente = dto.id_tipo_incidente;

    // Correcciones manuales de los campos derivados — se aplican después del
    // cálculo automático de arriba, así que siempre ganan.
    if (dto.anio != null) data.anio = dto.anio;
    if (dto.mes != null) data.mes = dto.mes;
    if (dto.semana != null) data.semana = dto.semana;
    if (dto.dia != null) data.dia = dto.dia;
    if (dto.id_rango_horario != null) data.rango_horario = dto.id_rango_horario;

    return prisma.eventos_monitoreo.update({ where: { id_evento }, data });
  }

  static async remove(id_evento: number) {
    return prisma.eventos_monitoreo.delete({ where: { id_evento } });
  }
}
