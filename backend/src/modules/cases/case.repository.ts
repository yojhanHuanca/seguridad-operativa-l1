import prisma from "../../lib/prisma.js";
import { planDeadline, planVencido, type PlanDeadlineSource } from "../../lib/planDeadline.js";
import { NotificationRepository } from "../notifications/notification.repository.js";
import { ConfiguracionService } from "../configuracion/configuracion.service.js";
import { enviarCorreoPlanAsignado } from "../../utils/mailer.js";
import { env } from "../../config/env.js";
import type {
  CaseListFilters,
  CreatePlanDto,
  EvaluateCaseDto,
  RejectCaseDto,
  RequestInfoDto,
  RespondInfoDto,
  SaveInvestigationDto,
  TimelineEntry,
  UploadedFile,
} from "./case.types.js";

const LIST_INCLUDE = {
  catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { select: { nombre: true, color: true } },
  catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { select: { id_detalle: true, codigo: true, nombre: true, orden: true } },
  // Estos tres solo se usaban en el detalle de un caso; la exportación de Reportes
  // (todos los casos a la vez) también los necesita, así que ya van en la lista.
  catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle: { select: { nombre: true } },
  usuarios_casos_sop_responsable_hallazgoTousuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
  areas: { select: { id_area: true, nombre_area: true } },
  anexos_caso: { select: { id_anexo: true } },
  // Sin `seguimientos`: en la lista solo hace falta el avance (que sale de
  // `porcentaje`/`catalogo_detalle` de cada actividad), no su historial de
  // comentarios completo. Ese detalle profundo sigue viniendo completo en
  // DETAIL_INCLUDE (findByCodigo, un caso a la vez) — acá, multiplicado por
  // cada caso de la lista, es lo que hace pesada la consulta cuando hay
  // miles de casos con años de seguimientos acumulados.
  planes_accion: {
    orderBy: { created_at: "asc" as const },
    include: {
      areas: { select: { id_area: true, nombre_area: true } },
      usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
      catalogo_detalle: { select: { nombre: true } },
      actividades_plan: {
        orderBy: { id_actividad: "asc" as const },
        include: {
          usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
          catalogo_detalle: { select: { nombre: true } },
        },
      },
    },
  },
  evento_caso: {
    include: {
      eventos_operativos: {
        include: {
          catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: { select: { id_detalle: true, nombre: true } },
          catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: { select: { nombre: true } },
        },
      },
    },
  },
} as const;

const DETAIL_INCLUDE = {
  ...LIST_INCLUDE,
  catalogo_detalle_casos_sop_estado_planTocatalogo_detalle: { select: { nombre: true } },
  usuarios_casos_sop_responsable_planTousuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
  anexos_caso: true,
  investigacion_caso: { include: { usuarios: { select: { id_usuario: true, nombre: true, cargo: true } } } },
  solicitudes_informacion: { orderBy: { fecha_solicitud: "desc" as const } },
  timeline_caso: { orderBy: { fecha: "desc" as const } },
  planes_accion: {
    orderBy: { created_at: "asc" as const },
    include: {
      areas: { select: { id_area: true, nombre_area: true } },
      usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
      catalogo_detalle: { select: { nombre: true } },
      actividades_plan: {
        orderBy: { id_actividad: "asc" as const },
        include: {
          usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
          catalogo_detalle: { select: { nombre: true } },
          seguimientos: {
            orderBy: { fecha: "desc" as const },
            include: { usuarios: { select: { id_usuario: true, nombre: true, cargo: true } } },
          },
        },
      },
    },
  },
  evento_caso: {
    include: {
      eventos_operativos: {
        include: {
          catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: { select: { id_detalle: true, nombre: true } },
          catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle: { select: { nombre: true } },
        },
      },
    },
  },
} as const;

/** Cliente mínimo que necesita pushTimeline — sirve para prisma y para un tx. */
type TimelineClient = {
  timeline_caso: {
    create: (args: {
      data: { id_caso: number; kind: string; actor: string; actor_rol: string; titulo: string; detalle: string | null };
    }) => Promise<unknown>;
  };
};

// TODO(auth): reemplazar por el usuario autenticado cuando exista login real.
const ACTOR_SO = "Seguridad Operativa";

/** Día calendario de una columna @db.Date, que siempre llega en medianoche UTC. */
const diaISO = (d: Date) => d.toISOString().slice(0, 10);
const MS_DIA = 86_400_000;
const sumarDias = (d: Date, dias: number) => new Date(d.getTime() + dias * MS_DIA);

/** Estados de `estado_hallazgo` en los que un caso puede tener un plan con plazo vigente. */
const VENCIDO_ESTADOS = ["Plan de Acción", "Ejecución", "Prórroga Solicitada", "Verificación"];

/**
 * El formulario de planes codifica tipo de acción y área dentro del texto de
 * `descripcion` de cada actividad (ver `activityMeta.ts` en el frontend), con
 * marcadores `__SIGMA_PLAN_ACTIVITY__{...}__/SIGMA_PLAN_ACTIVITY__` al inicio.
 * Para mostrarla en el correo hay que quitarlos, si no sale la metadata cruda.
 */
function descripcionLimpia(descripcion: string): string {
  const PREFIJO = "__SIGMA_PLAN_ACTIVITY__";
  const SUFIJO = "__/SIGMA_PLAN_ACTIVITY__";
  if (!descripcion.startsWith(PREFIJO)) return descripcion;
  const fin = descripcion.indexOf(SUFIJO);
  if (fin === -1) return descripcion;
  return descripcion.slice(fin + SUFIJO.length).replace(/^\s+/, "");
}

export class CaseRepository {
  /** Registra un evento en la bitácora del expediente. */
  static async pushTimeline(client: TimelineClient, id_caso: number, e: TimelineEntry) {
    await client.timeline_caso.create({
      data: {
        id_caso,
        kind: e.kind,
        actor: e.actor,
        actor_rol: e.actor_rol,
        titulo: e.titulo,
        detalle: e.detalle ?? null,
      },
    });
  }

  static async addComment(id_caso: number, texto: string) {
    await CaseRepository.pushTimeline(prisma, id_caso, {
      kind: "comentario",
      actor: ACTOR_SO,
      actor_rol: "seguridad",
      titulo: "Comentario agregado al expediente",
      detalle: texto,
    });
    return prisma.timeline_caso.findMany({ where: { id_caso }, orderBy: { fecha: "desc" } });
  }

  /** Comentario operativo de SO asociado a un plan específico. */
  /**
   * Comentario sobre un plan. Lo usan los dos lados: SO desde el expediente y
   * el Jefe del Área desde su panel, por eso el rol es parámetro y no fijo.
   *
   * Cuando lo escribe el jefe también queda en `seguimientos`, que es la tabla
   * de comentarios de la actividad, además del timeline que ve SO.
   */
  static async addPlanComment(id_plan: number, texto: string, rol: "seguridad" | "jefe" = "seguridad", actor?: string) {
    const plan = await prisma.planes_accion.findUnique({
      where: { id_plan },
      select: {
        id_caso: true,
        codigo_plan: true,
        actividades_plan: { select: { id_actividad: true }, orderBy: { id_actividad: "asc" }, take: 1 },
      },
    });
    if (!plan) throw new Error(`El plan ${id_plan} no existe`);

    const esJefe = rol === "jefe";
    const quien = actor?.trim() || (esJefe ? "Jefe de Área" : ACTOR_SO);

    await prisma.$transaction(async (tx) => {
      await CaseRepository.pushTimeline(tx, plan.id_caso, {
        kind: "comentario",
        actor: quien,
        actor_rol: rol,
        titulo: esJefe ? `Comentario del área — ${plan.codigo_plan}` : `Comentario SO — ${plan.codigo_plan}`,
        detalle: texto,
      });

      if (esJefe && plan.actividades_plan[0]) {
        await tx.seguimientos.create({
          data: { id_actividad: plan.actividades_plan[0].id_actividad, comentario: texto, porcentaje: null },
        });
      }

      if (esJefe) {
        await NotificationRepository.emitir(tx, {
          para: { rol: "Seguridad Operativa" },
          tipo: "ejecucion_completada",
          titulo: `Comentario del área en ${plan.codigo_plan}`,
          mensaje: `${quien}: ${texto}`,
        });
      }
    });

    return prisma.timeline_caso.findMany({ where: { id_caso: plan.id_caso }, orderBy: { fecha: "desc" } });
  }

  /**
   * Quita una evidencia del plan antes de que el cierre se envíe a SO.
   *
   * Solo se permite mientras el plan sigue abierto: una vez finalizado, lo
   * enviado queda bloqueado y no se puede eliminar. Se borra el anexo y se
   * limpia su referencia del payload del timeline para que no quede apuntando
   * a un archivo que ya no existe.
   */
  static async removePlanEvidence(id_plan: number, id_anexo: number, actor: string) {
    const plan = await prisma.planes_accion.findUnique({
      where: { id_plan },
      select: { id_caso: true, codigo_plan: true, catalogo_detalle: { select: { nombre: true } } },
    });
    if (!plan) throw new Error(`El plan ${id_plan} no existe`);

    const estado = (plan.catalogo_detalle?.nombre ?? "").toLowerCase();
    if (estado.includes("finaliz") || estado.includes("cerrad")) {
      throw new Error(`${plan.codigo_plan} ya fue enviado a Seguridad Operativa; sus evidencias no se pueden eliminar`);
    }

    const anexo = await prisma.anexos_caso.findUnique({
      where: { id_anexo },
      select: { id_anexo: true, id_caso: true, nombre_archivo: true },
    });
    if (!anexo || anexo.id_caso !== plan.id_caso) {
      throw new Error("La evidencia no existe o no pertenece a este plan");
    }

    return prisma.$transaction(async (tx) => {
      // El enlace evidencia↔plan vive en el detalle del timeline; hay que
      // sacar la referencia de ahí o el archivo seguiría listándose.
      const eventos = await tx.timeline_caso.findMany({
        where: { id_caso: plan.id_caso, detalle: { contains: `"id_anexo":${id_anexo}` } },
        select: { id_evento: true, detalle: true },
      });

      for (const evento of eventos) {
        const [humano, tecnico] = (evento.detalle ?? "").split("__PLAN_EVIDENCE__:");
        if (!tecnico) continue;
        try {
          const payload = JSON.parse(tecnico.trim());
          payload.anexos = (payload.anexos ?? []).filter((a: { id_anexo?: number }) => a.id_anexo !== id_anexo);
          await tx.timeline_caso.update({
            where: { id_evento: evento.id_evento },
            data: { detalle: `${humano ?? ""}__PLAN_EVIDENCE__:${JSON.stringify(payload)}` },
          });
        } catch {
          // Payload ilegible: se deja como está antes que corromperlo.
        }
      }

      await tx.anexos_caso.delete({ where: { id_anexo } });

      await CaseRepository.pushTimeline(tx, plan.id_caso, {
        kind: "seguimiento",
        actor,
        actor_rol: "jefe",
        titulo: `Evidencia eliminada — ${plan.codigo_plan}`,
        detalle: `Se quitó "${anexo.nombre_archivo ?? "archivo"}" antes del envío a revisión.`,
      });

      return { id_anexo };
    });
  }

  /**
   * Casos con al menos un plan de acción activo (no cerrado/rechazado/
   * finalizado) cuyo plazo vigente ya pasó. No es un `estado_hallazgo`
   * literal como el resto de filtros — hay que traer los planes y calcular
   * el plazo en JS (misma regla que `planDeadline`/`planVencido` del
   * frontend), así que se resuelve en dos pasos en vez de un solo `where`.
   */
  private static async vencidoCaseIds(area?: number): Promise<number[]> {
    const where: Record<string, unknown> = {
      catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: { in: VENCIDO_ESTADOS } },
    };
    if (area) where.area_responsable = area;

    const casos = await prisma.casos_sop.findMany({
      where,
      select: {
        id_caso: true,
        planes_accion: {
          select: {
            fecha_plan: true,
            fecha_reprogramada: true,
            catalogo_detalle: { select: { nombre: true } },
            actividades_plan: { select: { fecha_fin: true } },
          },
        },
      },
    });

    const ahora = new Date();
    return casos.filter((c) => c.planes_accion.some((p) => planVencido(p, ahora))).map((c) => c.id_caso);
  }

  static async findAll(filtros: CaseListFilters) {
    const where: Record<string, unknown> = {};

    if (filtros.vencidos) {
      where.id_caso = { in: await CaseRepository.vencidoCaseIds(filtros.area) };
    } else if (filtros.estados?.length) {
      where.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle = { nombre: { in: filtros.estados } };
    }
    if (filtros.area) where.area_responsable = filtros.area;
    if (filtros.search) {
      const q = filtros.search;
      where.OR = [
        { codigo_sop: { contains: q, mode: "insensitive" } },
        { titulo: { contains: q, mode: "insensitive" } },
        { descripcion: { contains: q, mode: "insensitive" } },
        { nombre_reportante: { contains: q, mode: "insensitive" } },
      ];
    }

    const orderBy =
      filtros.sort === "prioridad"
        ? [{ catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { orden: "asc" as const } }, { created_at: "desc" as const }]
        : { created_at: "desc" as const };

    // Sin `page`/`limit` se comporta exactamente igual que antes: trae todo
    // y no cuenta nada de más. Solo pagina cuando ambos vienen juntos — así
    // los 6 consumidores que ya existían (dashboard, indicadores, mapa,
    // exportar, badge del sidebar) no notan ningún cambio.
    if (!filtros.page || !filtros.limit) {
      const data = await prisma.casos_sop.findMany({ where, include: LIST_INCLUDE, orderBy });
      return { data, total: undefined };
    }

    const [data, total] = await Promise.all([
      prisma.casos_sop.findMany({
        where,
        include: LIST_INCLUDE,
        orderBy,
        skip: (filtros.page - 1) * filtros.limit,
        take: filtros.limit,
      }),
      prisma.casos_sop.count({ where }),
    ]);
    return { data, total };
  }

  /**
   * Conteos por pestaña de la bandeja de Casos SOP — solo `COUNT`, nunca trae
   * filas. Los grupos de `estado_hallazgo` por pestaña deben coincidir con
   * `CASE_FILTERS`/`STAGE_BY_ESTADO` del frontend (`features/cases/lib/
   * filters.ts` y `features/cases/domain.ts`): si se agrega o renombra un
   * estado allá, hay que actualizar esto también.
   */
  static async counts(area?: number) {
    const baseWhere: Record<string, unknown> = area ? { area_responsable: area } : {};
    const grupos: Record<string, string[]> = {
      nuevos: ["Recepción", "Evaluación", "En Proceso"],
      investigacion: ["Investigación"],
      proceso: ["Plan de Acción", "Ejecución", "Prórroga Solicitada"],
      prorrogas: ["Prórroga Solicitada"],
      verificacion: ["Verificación"],
      cerrados: ["Cerrado", "Rechazado"],
    };
    const entradas = Object.entries(grupos);

    const [todos, vencidosIds, ...resto] = await Promise.all([
      prisma.casos_sop.count({ where: baseWhere }),
      CaseRepository.vencidoCaseIds(area),
      ...entradas.map(([, estados]) =>
        prisma.casos_sop.count({
          where: { ...baseWhere, catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: { in: estados } } },
        })
      ),
    ]);

    const out: Record<string, number> = { todos, vencidos: vencidosIds.length };
    entradas.forEach(([clave], i) => {
      out[clave] = resto[i] ?? 0;
    });
    return out;
  }

  static async findByCodigo(codigo_sop: string) {
    return prisma.casos_sop.findUnique({ where: { codigo_sop }, include: DETAIL_INCLUDE });
  }

  /**
   * Planes de acción visibles para un Jefe de Área. Si no se pasa área,
   * devuelve todos (útil mientras no hay login que fije el área del usuario).
   * `codigo_sop` opcional acota a los planes de un solo caso — la usa
   * `PlanDetail.tsx` en vez de traer toda el área y filtrar en el navegador.
   */
  static async findPlansByArea(opts?: { id_area?: number; codigo_sop?: string }) {
    const where: Record<string, unknown> = {};
    if (opts?.id_area) where.id_area = opts.id_area;
    if (opts?.codigo_sop) where.casos_sop = { codigo_sop: opts.codigo_sop };

    return prisma.planes_accion.findMany({
      where,
      orderBy: { created_at: "desc" as const },
      include: {
        areas: { select: { id_area: true, nombre_area: true } },
        usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
        catalogo_detalle: { select: { nombre: true } },
        actividades_plan: {
          orderBy: { id_actividad: "asc" as const },
          include: {
            usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
            catalogo_detalle: { select: { nombre: true } },
            seguimientos: {
              orderBy: { fecha: "desc" as const },
              include: { usuarios: { select: { id_usuario: true, nombre: true, cargo: true } } },
            },
          },
        },
        casos_sop: {
          select: {
            id_caso: true,
            codigo_sop: true,
            titulo: true,
            descripcion: true,
            fecha_hallazgo: true,
            fecha_evento: true,
            catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { select: { nombre: true } },
            catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { select: { nombre: true } },
            catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { select: { codigo: true, nombre: true } },
            // `observaciones` es opcional en el formulario de SO, pero el jefe
            // debe poder leerla: es donde van las recomendaciones.
            investigacion_caso: { select: { causa_raiz: true, hallazgos: true, conclusiones: true, observaciones: true } },
            timeline_caso: {
              orderBy: { fecha: "desc" as const },
              select: {
                id_evento: true,
                kind: true,
                actor: true,
                actor_rol: true,
                titulo: true,
                detalle: true,
                fecha: true,
              },
            },
            anexos_caso: {
              orderBy: { fecha_subida: "desc" as const },
              select: {
                id_anexo: true,
                nombre_archivo: true,
                ruta_archivo: true,
                tipo_archivo: true,
                peso: true,
                fecha_subida: true,
              },
            },
          },
        },
      },
    });
  }

  static async findBasicByCodigo(codigo_sop: string) {
    return prisma.casos_sop.findUnique({
      where: { codigo_sop },
      select: {
        id_caso: true,
        codigo_sop: true,
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { select: { nombre: true } },
      },
    });
  }

  /**
   * Contexto mínimo de un plan para decidir si la acción procede: en qué etapa
   * está su caso y de quién es el plan. Va en una sola consulta porque las dos
   * comprobaciones (etapa y propiedad) se hacen siempre juntas.
   */
  static async findPlanContexto(id_plan: number) {
    return prisma.planes_accion.findUnique({
      where: { id_plan },
      select: {
        id_plan: true,
        id_caso: true,
        id_area: true,
        responsable: true,
        codigo_plan: true,
        casos_sop: {
          select: {
            codigo_sop: true,
            catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { select: { nombre: true } },
          },
        },
      },
    });
  }

  /** Igual que findPlanContexto, pero entrando por una actividad del plan. */
  static async findActividadContexto(id_actividad: number) {
    const actividad = await prisma.actividades_plan.findUnique({
      where: { id_actividad },
      select: { id_plan: true },
    });
    if (!actividad?.id_plan) return null;
    return CaseRepository.findPlanContexto(actividad.id_plan);
  }

  static async findEstado(nombre: string) {
    const estado = await prisma.catalogo_detalle.findFirst({ where: { nombre, catalogos: { nombre: "Estado Hallazgo" } } });
    if (!estado) throw new Error(`Falta el estado "${nombre}" en el catálogo "Estado Hallazgo"`);
    return estado;
  }

  static async findEstadoPlan(nombre: string) {
    const estado = await prisma.catalogo_detalle.findFirst({ where: { nombre, catalogos: { nombre: "Estado Plan de acción" } } });
    if (!estado) throw new Error(`Falta el estado "${nombre}" en el catálogo "Estado Plan de acción"`);
    return estado;
  }

  static async ensureEstadoPlan(nombre: string) {
    const catalogo = await prisma.catalogos.findUnique({
      where: { nombre: "Estado Plan de acción" },
      select: { id_catalogo: true },
    });
    if (!catalogo) throw new Error('Falta el catálogo "Estado Plan de acción"');

    const existente = await prisma.catalogo_detalle.findFirst({
      where: { id_catalogo: catalogo.id_catalogo, nombre },
    });
    if (existente) return existente;

    const orden = await prisma.catalogo_detalle.aggregate({
      where: { id_catalogo: catalogo.id_catalogo },
      _max: { orden: true },
    });

    return prisma.catalogo_detalle.create({
      data: {
        id_catalogo: catalogo.id_catalogo,
        nombre,
        orden: (orden._max.orden ?? 0) + 1,
      },
    });
  }

  static async findEstadoActividad(nombre: string) {
    const estado = await prisma.catalogo_detalle.findFirst({ where: { nombre, catalogos: { nombre: "Estado Actividad" } } });
    if (!estado) throw new Error(`Falta el estado "${nombre}" en el catálogo "Estado Actividad"`);
    return estado;
  }

  static async approve(id_caso: number) {
    const estado = await CaseRepository.findEstado("Evaluación");
    return prisma.$transaction(async (tx) => {
      const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "aprobado",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Reporte aprobado — pasa a Evaluación",
      });
      return caso;
    });
  }

  static async addObservation(id_caso: number, texto: string) {
    const caso = await prisma.casos_sop.findUniqueOrThrow({ where: { id_caso }, select: { observaciones: true } });
    const fecha = new Date().toLocaleString("es-PE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const nueva = `[${fecha}] ${texto}`;
    const observaciones = caso.observaciones ? `${caso.observaciones}\n${nueva}` : nueva;
    return prisma.$transaction(async (tx) => {
      const actualizado = await tx.casos_sop.update({ where: { id_caso }, data: { observaciones } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "comentario",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Observación de revisión registrada",
        detalle: texto,
      });
      return actualizado;
    });
  }

  /**
   * Corrige el tipo de reporte (Accidente / Incidente / Condición Insegura /
   * Hallazgo / Acto Inseguro / Otro) que eligió el reportante al crear el
   * caso. Ese valor vive en `eventos_operativos.tipo_incidente` —no en
   * `casos_sop.tipo`, que es un campo interno de SO (No Conformidad /
   * Observación) sin relación con lo que reporta el trabajador—, así que
   * la corrección se aplica ahí, sobre el evento operativo vinculado al caso.
   */
  static async updateTipo(id_caso: number, id_tipo: number, actor = ACTOR_SO) {
    const evento = await prisma.evento_caso.findFirst({
      where: { id_caso },
      select: {
        id_evento: true,
        eventos_operativos: {
          select: { catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: { select: { nombre: true } } },
        },
      },
    });
    if (!evento) throw new Error("El caso no tiene un evento operativo vinculado");

    const nuevo = await prisma.catalogo_detalle.findUniqueOrThrow({
      where: { id_detalle: id_tipo },
      select: { nombre: true, catalogos: { select: { nombre: true } } },
    });
    if (nuevo.catalogos.nombre !== "Tipo de Reporte") {
      throw new Error(`El valor "${nuevo.nombre}" no pertenece al catálogo "Tipo de Reporte"`);
    }

    return prisma.$transaction(async (tx) => {
      const actualizado = await tx.eventos_operativos.update({
        where: { id_evento: evento.id_evento },
        data: { tipo_incidente: id_tipo },
      });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "comentario",
        actor,
        actor_rol: "seguridad",
        titulo: "Tipo de reporte corregido",
        detalle: `${evento.eventos_operativos.catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle.nombre} -> ${nuevo.nombre}`,
      });
      return actualizado;
    });
  }

  static async evaluate(id_caso: number, dto: EvaluateCaseDto) {
    const destino = dto.requiere_investigacion ? "Investigación" : "Plan de Acción";
    const estado = await CaseRepository.findEstado(destino);
    return prisma.$transaction(async (tx) => {
      const caso = await tx.casos_sop.update({
        where: { id_caso },
        data: {
          analisis_riesgo: dto.id_riesgo,
          clasificacion: dto.clasificacion,
          descripcion_evento: dto.descripcion_evento,
          estado_hallazgo: estado.id_detalle,
          ...(dto.id_area != null ? { area_responsable: dto.id_area } : {}),
          ...(dto.id_responsable != null ? { responsable_hallazgo: dto.id_responsable } : {}),
          ...(dto.peligro != null ? { peligro: dto.peligro } : {}),
          ...(dto.consecuencia != null ? { consecuencia: dto.consecuencia } : {}),
          ...(dto.observaciones != null ? { observaciones: dto.observaciones } : {}),
        },
      });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: dto.requiere_investigacion ? "investigacion" : "derivado",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: `Caso evaluado — pasa a ${destino}`,
        detalle: `Clasificación: ${dto.clasificacion}.`,
      });
      return caso;
    });
  }

  static async reject(id_caso: number, dto: RejectCaseDto) {
    const estado = await CaseRepository.findEstado("Rechazado");
    return prisma.$transaction(async (tx) => {
      const caso = await tx.casos_sop.update({
        where: { id_caso },
        data: { estado_hallazgo: estado.id_detalle, ...(dto.motivo != null ? { observaciones: dto.motivo } : {}) },
      });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "rechazado",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Reporte rechazado",
        detalle: dto.motivo ?? null,
      });
      return caso;
    });
  }

  static async requestInfo(id_caso: number, estadoActualNombre: string, dto: RequestInfoDto) {
    const estadoPausa = await CaseRepository.findEstado("Pendiente de Información");
    const caso = await prisma.casos_sop.findUniqueOrThrow({
      where: { id_caso },
      select: { codigo_sop: true, created_by: true },
    });
    return prisma.$transaction(async (tx) => {
      const solicitud = await tx.solicitudes_informacion.create({
        data: { id_caso, mensaje: dto.mensaje, estado_previo: estadoActualNombre },
      });
      await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estadoPausa.id_detalle } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "info_solicitada",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Información adicional solicitada al reportante",
        detalle: dto.mensaje,
      });
      // Reporte "anónimo" (sin created_by asociado a un usuario) no tiene a
      // quién avisar; el resto sí — antes esto no se emitía nunca y el
      // reportante no se enteraba de que su caso estaba parado esperándolo.
      if (caso.created_by) {
        await NotificationRepository.emitir(tx, {
          para: { id_usuario: caso.created_by },
          tipo: "caso_devuelto",
          titulo: `Se necesita más información — ${caso.codigo_sop}`,
          mensaje: dto.mensaje,
        });
      }
      return solicitud;
    });
  }

  static async respondInfo(id_caso: number, id_solicitud: number, dto: RespondInfoDto) {
    const solicitud = await prisma.solicitudes_informacion.findUnique({ where: { id_solicitud } });
    if (!solicitud || solicitud.id_caso !== id_caso) throw new Error("La solicitud de información no existe para este caso");

    const estadoDestino = await CaseRepository.findEstado(solicitud.estado_previo ?? "Evaluación");
    const caso = await prisma.casos_sop.findUniqueOrThrow({ where: { id_caso }, select: { codigo_sop: true } });

    return prisma.$transaction(async (tx) => {
      const actualizada = await tx.solicitudes_informacion.update({
        where: { id_solicitud },
        data: { respondida: true, respuesta: dto.respuesta ?? null, fecha_respuesta: new Date() },
      });
      await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estadoDestino.id_detalle } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "info_recibida",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: `Información recibida — vuelve a ${estadoDestino.nombre}`,
        detalle: dto.respuesta ?? null,
      });
      await NotificationRepository.emitir(tx, {
        para: { rol: "Seguridad Operativa" },
        tipo: "info_respondida",
        titulo: `El reportante respondió — ${caso.codigo_sop}`,
        mensaje: dto.respuesta ?? "El reportante envió la información solicitada.",
      });
      return actualizada;
    });
  }

  static async saveInvestigation(id_caso: number, dto: SaveInvestigationDto) {
    const estado = await CaseRepository.findEstado("Plan de Acción");
    return prisma.$transaction(async (tx) => {
      // La descripción del evento se escribió en Evaluación; acá solo se
      // copia como "hallazgos" para no duplicar el campo en el formulario.
      const caso = await tx.casos_sop.findUniqueOrThrow({ where: { id_caso }, select: { descripcion_evento: true } });
      const hallazgos = caso.descripcion_evento?.trim() || "Sin descripción registrada en Evaluación.";

      const investigacion = await tx.investigacion_caso.upsert({
        where: { id_caso },
        create: {
          id_caso,
          hallazgos,
          causa_raiz: dto.causa_raiz,
          conclusiones: dto.conclusiones,
          observaciones: dto.observaciones ?? null,
          investigador: dto.investigador ?? null,
        },
        update: {
          hallazgos,
          causa_raiz: dto.causa_raiz,
          conclusiones: dto.conclusiones,
          observaciones: dto.observaciones ?? null,
          ...(dto.investigador != null ? { investigador: dto.investigador } : {}),
          updated_at: new Date(),
        },
      });
      await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "investigacion",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Investigación registrada — pasa a Plan de Acción",
        detalle: `Causa raíz: ${dto.causa_raiz}`,
      });
      return investigacion;
    });
  }

  /**
   * Avisa por correo al Jefe de Área de cada plan recién creado, con el
   * detalle completo (no solo un enlace). Se llama después de que la
   * transacción que crea los planes ya confirmó, nunca desde adentro: es una
   * llamada de red a Resend, y sostenerla dentro de una transacción de base
   * de datos mantendría filas bloqueadas mientras tanto sin necesidad.
   *
   * No se espera (`void`, sin await del lado del que llama) y cada plan se
   * envía por separado con `allSettled`: un correo que falla no debe demorar
   * la respuesta al usuario ni impedir que salgan los demás. El plan ya quedó
   * creado y visible en la plataforma pase lo que pase acá — el correo es un
   * aviso adicional, no un requisito, según lo acordado con el cliente.
   */
  private static async avisarPlanesAsignados(idsPlan: number[]) {
    const planes = await prisma.planes_accion.findMany({
      where: { id_plan: { in: idsPlan } },
      select: {
        id_plan: true,
        codigo_plan: true,
        descripcion: true,
        fecha_plan: true,
        observaciones: true,
        areas: { select: { nombre_area: true } },
        usuarios: { select: { nombre: true, correo: true } },
        casos_sop: { select: { codigo_sop: true, descripcion: true } },
        actividades_plan: { select: { descripcion: true, fecha_fin: true } },
      },
    });

    const baseUrl = env.FRONTEND_URL.replace(/\/$/, "");
    const resultados = await Promise.allSettled(
      planes.map((plan) =>
        enviarCorreoPlanAsignado({
          destino: plan.usuarios.correo,
          nombreJefe: plan.usuarios.nombre,
          codigoPlan: plan.codigo_plan,
          codigoCaso: plan.casos_sop.codigo_sop,
          descripcionCaso: plan.casos_sop.descripcion,
          areaNombre: plan.areas.nombre_area,
          descripcionPlan: plan.descripcion,
          fechaLimite: plan.fecha_plan,
          observaciones: plan.observaciones,
          actividades: plan.actividades_plan.map((a) => ({ ...a, descripcion: descripcionLimpia(a.descripcion) })),
          // El detalle vive en /jefe/planes/:codigo por el código del CASO
          // (mismo criterio que el resto de la app, ver usePlansByCase), no
          // por el del plan — aunque a veces se parezcan casi idénticos. El
          // ?plan= evita que, si el caso tiene más de un plan, el correo
          // mande a elegir entre todos en vez de abrir directo el asignado.
          url: `${baseUrl}/jefe/planes/${encodeURIComponent(plan.casos_sop.codigo_sop)}?plan=${plan.id_plan}`,
        }),
      ),
    );

    resultados.forEach((resultado, i) => {
      if (resultado.status === "rejected") {
        console.error("[planes] no se pudo avisar por correo del plan", planes[i]?.codigo_plan, resultado.reason);
      }
    });
  }

  static async createPlan(id_caso: number, codigo_sop: string, dto: CreatePlanDto) {
    // El caso NO pasa a Ejecución al crear el plan: queda en "Plan de Acción"
    // con el plan en estado "Enviado", esperando que el Jefe del Área lo
    // acepte (acceptPlan). Recién ahí arranca la Ejecución — mismo flujo que
    // el prototipo (submitActionPlan deja stage="plan_accion").
    const [estadoPlanEnviado, estadoCasoPlan, estadoActividadPendiente] = await Promise.all([
      CaseRepository.findEstadoPlan("Enviado"),
      CaseRepository.findEstado("Plan de Acción"),
      CaseRepository.findEstadoActividad("Pendiente"),
    ]);

    const plan = await prisma.$transaction(async (tx) => {
      const codigo_plan = await ConfiguracionService.nextCodigoPlan(tx, codigo_sop);

      const plan = await tx.planes_accion.create({
        data: {
          id_caso,
          codigo_plan,
          descripcion: dto.descripcion,
          id_area: dto.id_area,
          responsable: dto.responsable,
          estado: estadoPlanEnviado.id_detalle,
          fecha_plan: new Date(dto.fecha_plan),
          observaciones: dto.observaciones ?? null,
        },
      });

      if (dto.actividades.length > 0) {
        await tx.actividades_plan.createMany({
          data: dto.actividades.map((a) => ({
            id_plan: plan.id_plan,
            descripcion: a.descripcion,
            responsable: a.responsable ?? null,
            fecha_inicio: a.fecha_inicio ? new Date(a.fecha_inicio) : null,
            fecha_fin: a.fecha_fin ? new Date(a.fecha_fin) : null,
            estado: estadoActividadPendiente.id_detalle,
            porcentaje: 0,
          })),
        });
      }

      await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estadoCasoPlan.id_detalle } });

      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "plan_propuesto",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Plan de Acción enviado a Jefe de Área",
        detalle: `${codigo_plan} · pendiente de aceptación por el área responsable.`,
      });

      await NotificationRepository.emitir(tx, {
        para: { id_usuario: dto.responsable },
        tipo: "plan_asignado",
        titulo: `Nuevo plan asignado: ${codigo_plan}`,
        mensaje: `${dto.descripcion} Debe aceptarlo para iniciar la ejecución.`,
      });

      return plan;
    });

    void CaseRepository.avisarPlanesAsignados([plan.id_plan]);
    return plan;
  }

  static async createPlans(id_caso: number, codigo_sop: string, dtos: CreatePlanDto[]) {
    if (dtos.length === 0) throw new Error("Agregue al menos un plan de acción");

    const [estadoPlanEnviado, estadoCasoPlan, estadoActividadPendiente] = await Promise.all([
      CaseRepository.findEstadoPlan("Enviado"),
      CaseRepository.findEstado("Plan de Acción"),
      CaseRepository.findEstadoActividad("Pendiente"),
    ]);

    return prisma.$transaction(async (tx) => {
      const codigosPlan = await ConfiguracionService.nextCodigosPlan(tx, codigo_sop, dtos.length);
      const creados = [];

      for (const [i, dto] of dtos.entries()) {
        const codigo_plan = codigosPlan[i];
        if (!codigo_plan) throw new Error("No se pudo generar el código del plan");

        const plan = await tx.planes_accion.create({
          data: {
            id_caso,
            codigo_plan,
            descripcion: dto.descripcion,
            id_area: dto.id_area,
            responsable: dto.responsable,
            estado: estadoPlanEnviado.id_detalle,
            fecha_plan: new Date(dto.fecha_plan),
            observaciones: dto.observaciones ?? null,
          },
        });

        if (dto.actividades.length > 0) {
          await tx.actividades_plan.createMany({
            data: dto.actividades.map((a) => ({
              id_plan: plan.id_plan,
              descripcion: a.descripcion,
              responsable: a.responsable ?? null,
              fecha_inicio: a.fecha_inicio ? new Date(a.fecha_inicio) : null,
              fecha_fin: a.fecha_fin ? new Date(a.fecha_fin) : null,
              estado: estadoActividadPendiente.id_detalle,
              porcentaje: 0,
            })),
          });
        }

        await CaseRepository.pushTimeline(tx, id_caso, {
          kind: "plan_propuesto",
          actor: ACTOR_SO,
          actor_rol: "seguridad",
          titulo: "Plan de Acción enviado a Jefe de Área",
          detalle: `${codigo_plan} · pendiente de aceptación por el área responsable.`,
        });

        // Faltaba acá: `createPlan` (un solo plan) sí la emite, pero al
        // repartir un caso entre varios Jefes de Área ninguno se enteraba por
        // ningún lado salvo que entrara a mirar la plataforma por su cuenta.
        await NotificationRepository.emitir(tx, {
          para: { id_usuario: dto.responsable },
          tipo: "plan_asignado",
          titulo: `Nuevo plan asignado: ${codigo_plan}`,
          mensaje: `${dto.descripcion} Debe aceptarlo para iniciar la ejecución.`,
        });

        creados.push(plan);
      }

      await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estadoCasoPlan.id_detalle } });
      return creados;
    }).then((creados) => {
      void CaseRepository.avisarPlanesAsignados(creados.map((plan) => plan.id_plan));
      return creados;
    });
  }

  /**
   * Modifica un plan ya enviado conservando las actividades existentes.
   * Antes se borraban y recreaban en bloque; eso hacía que al presionar
   * "Modificar" se perdiera lo ya cargado, especialmente estados, avances y
   * seguimientos registrados sobre la actividad.
   */
  static async updatePlan(id_plan: number, dto: CreatePlanDto) {
    const estadoActPendiente = await CaseRepository.findEstadoActividad("Pendiente");
    return prisma.$transaction(async (tx) => {
      const actividadesActuales = await tx.actividades_plan.findMany({
        where: { id_plan },
        select: {
          id_actividad: true,
          porcentaje: true,
          seguimientos: { select: { id_seguimiento: true }, take: 1 },
        },
      });
      const idsActuales = new Set(actividadesActuales.map((a) => a.id_actividad));
      const idsRecibidos = new Set(
        dto.actividades
          .map((a) => a.id_actividad)
          .filter((id): id is number => typeof id === "number" && idsActuales.has(id))
      );

      const plan = await tx.planes_accion.update({
        where: { id_plan },
        data: {
          descripcion: dto.descripcion,
          id_area: dto.id_area,
          responsable: dto.responsable,
          fecha_plan: new Date(dto.fecha_plan),
          observaciones: dto.observaciones ?? null,
          updated_at: new Date(),
        },
      });

      for (const a of dto.actividades) {
        if (a.id_actividad && idsActuales.has(a.id_actividad)) {
          await tx.actividades_plan.update({
            where: { id_actividad: a.id_actividad },
            data: {
              descripcion: a.descripcion,
              responsable: a.responsable ?? null,
              fecha_inicio: a.fecha_inicio ? new Date(a.fecha_inicio) : null,
              fecha_fin: a.fecha_fin ? new Date(a.fecha_fin) : null,
            },
          });
        } else {
          await tx.actividades_plan.create({
            data: {
            id_plan,
            descripcion: a.descripcion,
            responsable: a.responsable ?? null,
            fecha_inicio: a.fecha_inicio ? new Date(a.fecha_inicio) : null,
            fecha_fin: a.fecha_fin ? new Date(a.fecha_fin) : null,
            estado: estadoActPendiente.id_detalle,
            porcentaje: 0,
            },
          });
        }
      }

      const removibles = actividadesActuales
        .filter((a) => !idsRecibidos.has(a.id_actividad))
        .filter((a) => Number(a.porcentaje ?? 0) === 0 && a.seguimientos.length === 0)
        .map((a) => a.id_actividad);

      if (removibles.length > 0) {
        await tx.actividades_plan.deleteMany({ where: { id_actividad: { in: removibles } } });
      }

      await CaseRepository.pushTimeline(tx, plan.id_caso, {
        kind: "plan_ajustado",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Plan de Acción modificado",
        detalle: `${plan.codigo_plan} · ${dto.actividades.length} actividad(es).`,
      });

      return plan;
    });
  }

  /** ETAPA 5 — el Jefe del Área acepta un plan específico del reporte. */
  /**
   * ETAPA 4 → 5 — SO adelanta el caso a Ejecución sin esperar a que todas las
   * áreas acepten su plan.
   *
   * `acceptPlanById` solo mueve el caso cuando no queda ningún plan por
   * aceptar, y eso dejaba el expediente en "Plan de Acción" mientras un área
   * ya estaba ejecutando: el estado del caso no reflejaba la realidad. Esta
   * transición la dispara SO a mano cuando decide que con lo aceptado alcanza
   * para arrancar.
   *
   * Los planes que siguen sin aceptar NO se tocan: se quedan en "Enviado" y su
   * jefe los puede aceptar después, ya con el caso en Ejecución.
   */
  static async startExecution(id_caso: number) {
    const [estadoEjecucion, estadoPlanAceptado, estadoPlanEnEjecucion, estadoPlanFinalizado, estadoPlanCerrado] =
      await Promise.all([
        CaseRepository.findEstado("Ejecución"),
        CaseRepository.findEstadoPlan("Aceptado"),
        CaseRepository.findEstadoPlan("En Ejecución"),
        CaseRepository.ensureEstadoPlan("Finalizado"),
        CaseRepository.findEstadoPlan("Cerrado"),
      ]);

    const enMarcha = [
      estadoPlanAceptado.id_detalle,
      estadoPlanEnEjecucion.id_detalle,
      estadoPlanFinalizado.id_detalle,
      estadoPlanCerrado.id_detalle,
    ];

    const [aceptados, pendientes] = await Promise.all([
      prisma.planes_accion.count({ where: { id_caso, estado: { in: enMarcha } } }),
      prisma.planes_accion.count({ where: { id_caso, estado: { notIn: enMarcha } } }),
    ]);

    if (aceptados === 0) {
      throw new Error("Ningún área aceptó su plan todavía; no hay ejecución que iniciar");
    }

    return prisma.$transaction(async (tx) => {
      const caso = await tx.casos_sop.update({
        where: { id_caso },
        data: { estado_hallazgo: estadoEjecucion.id_detalle },
      });

      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "seguimiento",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Ejecución iniciada por Seguridad Operativa",
        detalle:
          pendientes > 0
            ? `El caso pasa a Ejecución con ${aceptados} plan(es) aceptado(s). Quedan ${pendientes} plan(es) pendientes de aceptación; siguen vigentes y su área los puede aceptar más adelante.`
            : `El caso pasa a Ejecución con los ${aceptados} plan(es) aceptados.`,
      });

      return caso;
    });
  }

  static async acceptPlanById(id_plan: number, actor: string) {
    const plan = await prisma.planes_accion.findUnique({
      where: { id_plan },
      select: { id_plan: true, id_caso: true, codigo_plan: true, descripcion: true },
    });
    if (!plan) throw new Error(`El plan ${id_plan} no existe`);

    const [estadoCaso, estadoPlanAceptado, estadoPlanEnEjecucion, estadoPlanFinalizado, estadoPlanCerrado, estadoActEnProgreso] = await Promise.all([
      CaseRepository.findEstado("Ejecución"),
      CaseRepository.findEstadoPlan("Aceptado"),
      CaseRepository.findEstadoPlan("En Ejecución"),
      CaseRepository.ensureEstadoPlan("Finalizado"),
      CaseRepository.findEstadoPlan("Cerrado"),
      CaseRepository.findEstadoActividad("En progreso"),
    ]);

    return prisma.$transaction(async (tx) => {
      const actualizado = await tx.planes_accion.update({
        where: { id_plan },
        data: { estado: estadoPlanEnEjecucion.id_detalle, updated_at: new Date() },
      });

      await tx.actividades_plan.updateMany({
        where: { id_plan },
        data: { estado: estadoActEnProgreso.id_detalle, porcentaje: 0 },
      });

      const estadosListos = [
        estadoPlanAceptado.id_detalle,
        estadoPlanEnEjecucion.id_detalle,
        estadoPlanFinalizado.id_detalle,
        estadoPlanCerrado.id_detalle,
      ];
      const planesPendientes = await tx.planes_accion.count({
        where: { id_caso: plan.id_caso, estado: { notIn: estadosListos } },
      });

      if (planesPendientes === 0) {
        await tx.casos_sop.update({ where: { id_caso: plan.id_caso }, data: { estado_hallazgo: estadoCaso.id_detalle } });
      }

      await CaseRepository.pushTimeline(tx, plan.id_caso, {
        kind: "plan_aprobado",
        actor,
        actor_rol: "jefe",
        titulo: planesPendientes === 0 ? "Todos los planes fueron aceptados" : "Plan aceptado por el jefe del área",
        detalle:
          planesPendientes === 0
            ? `${plan.codigo_plan} aceptado. Todos los planes del reporte pueden ejecutarse.`
            : `${plan.codigo_plan} aceptado. Este plan inicia ejecución; el caso espera la aceptación de los demás planes.`,
      });

      await NotificationRepository.emitir(tx, {
        para: { rol: "Seguridad Operativa" },
        tipo: "plan_aceptado",
        titulo: `${plan.codigo_plan} aceptado por el área`,
        mensaje: `${actor} aceptó el plan y arrancó la ejecución. ${plan.descripcion}`,
      });

      return actualizado;
    });
  }

  /** El área termina un plan específico; SO lo revisa después de forma independiente. */
  static async completeExecutionByPlan(
    id_plan: number,
    actor: string,
    descripcionCierre: string,
    comentario: string | null = null
  ) {
    const plan = await prisma.planes_accion.findUnique({
      where: { id_plan },
      select: {
        id_plan: true,
        id_caso: true,
        codigo_plan: true,
        catalogo_detalle: { select: { nombre: true } },
        actividades_plan: { select: { id_actividad: true }, orderBy: { id_actividad: "asc" }, take: 1 },
      },
    });
    if (!plan) throw new Error(`El plan ${id_plan} no existe`);

    const estadoPlan = plan.catalogo_detalle.nombre.toLowerCase();
    if (estadoPlan.includes("finaliz") || estadoPlan.includes("cerrad")) {
      throw new Error(`El plan ${plan.codigo_plan} ya fue enviado a revisión`);
    }

    // Ya no se exige que las actividades estén al 100%: el cliente indicó que
    // un plan puede ejecutarse y finalizarse el mismo día, y el seguimiento
    // pasó a trabajar solo con los estados del flujo. El único requisito es
    // que el plan tenga algo que finalizar.
    const totalActividades = await prisma.actividades_plan.count({ where: { id_plan } });
    if (totalActividades === 0) {
      throw new Error(`El plan ${plan.codigo_plan} no tiene actividades para finalizar`);
    }

    const [estadoPlanFinalizado, estadoActCompletado] = await Promise.all([
      CaseRepository.ensureEstadoPlan("Finalizado"),
      CaseRepository.findEstadoActividad("Completado"),
    ]);

    return prisma.$transaction(async (tx) => {
      await tx.planes_accion.update({
        where: { id_plan },
        data: { estado: estadoPlanFinalizado.id_detalle, updated_at: new Date() },
      });

      await tx.actividades_plan.updateMany({
        where: { id_plan },
        data: { estado: estadoActCompletado.id_detalle, porcentaje: 100 },
      });

      await CaseRepository.pushTimeline(tx, plan.id_caso, {
        kind: "seguimiento",
        actor,
        actor_rol: "jefe",
        titulo: `Plan de acción finalizado por el área — ${plan.codigo_plan}`,
        // El comentario es opcional; solo se agrega si el jefe lo escribió.
        detalle: comentario
          ? `Descripción final: ${descripcionCierre}\nComentario: ${comentario}`
          : `Descripción final: ${descripcionCierre}`,
      });

      // Además queda en `seguimientos`, que es la tabla propia de comentarios.
      if (comentario && plan.actividades_plan[0]) {
        await tx.seguimientos.create({
          data: { id_actividad: plan.actividades_plan[0].id_actividad, comentario, porcentaje: null },
        });
      }

      await NotificationRepository.emitir(tx, {
        para: { rol: "Seguridad Operativa" },
        tipo: "ejecucion_completada",
        titulo: `${plan.codigo_plan} finalizado, pendiente de revisión`,
        mensaje: `${actor} terminó la ejecución. Descripción final: ${descripcionCierre}`,
      });

      return tx.planes_accion.findUnique({ where: { id_plan } });
    });
  }

  /** SO revisa un plan finalizado: lo cierra o lo devuelve al área sin afectar a otros planes. */
  static async reviewFinalPlanById(id_plan: number, decision: "aprobada" | "rechazada", nota: string | null) {
    const plan = await prisma.planes_accion.findUnique({
      where: { id_plan },
      select: {
        id_plan: true,
        id_caso: true,
        codigo_plan: true,
        responsable: true,
        catalogo_detalle: { select: { nombre: true } },
        actividades_plan: {
          select: {
            porcentaje: true,
            catalogo_detalle: { select: { nombre: true } },
          },
        },
      },
    });
    if (!plan) throw new Error(`El plan ${id_plan} no existe`);

    const estadoActual = plan.catalogo_detalle.nombre.toLowerCase();
    const estaFinalizado = estadoActual.includes("finaliz");
    const estaCerrado = estadoActual.includes("cerrad");
    const estaEnEjecucion = estadoActual.includes("ejecucion") || estadoActual.includes("aceptad");
    const actividadesCompletadas =
      plan.actividades_plan.length > 0 &&
      plan.actividades_plan.every((actividad) => {
        const avance = Number(actividad.porcentaje ?? 0);
        const estadoActividad = actividad.catalogo_detalle?.nombre?.toLowerCase() ?? "";
        return avance >= 100 || estadoActividad.includes("complet");
      });
    const listoPorAvance = estaEnEjecucion && actividadesCompletadas;

    if (decision === "aprobada" && !estaFinalizado && !listoPorAvance) {
      throw new Error(`El plan ${plan.codigo_plan} debe estar Finalizado para poder cerrarlo`);
    }
    if (decision === "rechazada" && !estaFinalizado && !estaCerrado && !listoPorAvance) {
      throw new Error(`El plan ${plan.codigo_plan} debe estar Finalizado o Cerrado para devolverlo al área`);
    }

    const [estadoCasoVerificacion, estadoCasoEjecucion, estadoPlanCerrado, estadoPlanEnEjecucion, estadoActEnProgreso] = await Promise.all([
      CaseRepository.findEstado("Verificación"),
      CaseRepository.findEstado("Ejecución"),
      CaseRepository.findEstadoPlan("Cerrado"),
      CaseRepository.findEstadoPlan("En Ejecución"),
      CaseRepository.findEstadoActividad("En progreso"),
    ]);

    return prisma.$transaction(async (tx) => {
      const aprobado = decision === "aprobada";
      const actualizado = await tx.planes_accion.update({
        where: { id_plan },
        data: {
          estado: aprobado ? estadoPlanCerrado.id_detalle : estadoPlanEnEjecucion.id_detalle,
          updated_at: new Date(),
        },
      });

      if (!aprobado) {
        await tx.actividades_plan.updateMany({
          where: { id_plan },
          data: { estado: estadoActEnProgreso.id_detalle, porcentaje: 50 },
        });
        await tx.casos_sop.update({ where: { id_caso: plan.id_caso }, data: { estado_hallazgo: estadoCasoEjecucion.id_detalle } });
      }

      let todosCerrados = false;
      if (aprobado) {
        const planesAbiertos = await tx.planes_accion.count({
          where: { id_caso: plan.id_caso, estado: { not: estadoPlanCerrado.id_detalle } },
        });
        todosCerrados = planesAbiertos === 0;
        if (todosCerrados) {
          await tx.casos_sop.update({ where: { id_caso: plan.id_caso }, data: { estado_hallazgo: estadoCasoVerificacion.id_detalle } });
        }
      }

      await CaseRepository.pushTimeline(tx, plan.id_caso, {
        kind: "seguimiento",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: aprobado
          ? `Plan de acción cerrado por Seguridad Operativa — ${plan.codigo_plan}`
          : estaCerrado
            ? `Plan de acción reabierto por Seguridad Operativa — ${plan.codigo_plan}`
            : `Plan de acción devuelto al área — ${plan.codigo_plan}`,
        detalle: nota
          ? `${plan.codigo_plan}: ${nota}`
          : aprobado
            ? todosCerrados
              ? `${plan.codigo_plan} cerrado. Todos los planes están cerrados y el caso pasa a Verificación.`
              : `${plan.codigo_plan} cerrado. Otros planes del reporte siguen pendientes.`
            : estaCerrado
              ? `${plan.codigo_plan} fue reabierto y vuelve a ejecución para correcciones.`
              : `${plan.codigo_plan} requiere correcciones antes del cierre.`,
      });

      await NotificationRepository.emitir(tx, {
        para: { id_usuario: plan.responsable },
        tipo: "plan_revisado",
        titulo: aprobado
          ? `${plan.codigo_plan} cerrado por Seguridad Operativa`
          : `${plan.codigo_plan} devuelto para correcciones`,
        mensaje:
          nota ??
          (aprobado
            ? "Seguridad Operativa dio conforme al cierre del plan."
            : "Seguridad Operativa devolvió el plan a ejecución."),
      });

      return actualizado;
    });
  }

  /** ETAPA 5 — el Jefe del Área solicita ampliación de plazo para un plan específico. */
  static async requestExtensionByPlan(id_plan: number, dto: { nueva_fecha: string; justificacion: string }, actor: string) {
    const plan = await prisma.planes_accion.findUnique({
      where: { id_plan },
      select: {
        id_plan: true,
        id_caso: true,
        codigo_plan: true,
        fecha_plan: true,
        fecha_reprogramada: true,
        actividades_plan: { select: { fecha_fin: true } },
      },
    });
    if (!plan) throw new Error(`El plan ${id_plan} no existe`);

    const configuracion = await ConfiguracionService.get();
    const fechaVigente = planDeadline(plan);
    const fechaPedida = new Date(`${dto.nueva_fecha}T00:00:00.000Z`);
    const fechaMaxima = sumarDias(fechaVigente, configuracion.plazos.diasSolicitarProrroga);

    if (Number.isNaN(fechaPedida.getTime())) {
      throw new Error("La nueva fecha de prórroga no es válida");
    }
    if (fechaPedida.getTime() <= fechaVigente.getTime()) {
      throw new Error(`La nueva fecha debe ser posterior al plazo vigente (${diaISO(fechaVigente)})`);
    }
    if (fechaPedida.getTime() > fechaMaxima.getTime()) {
      throw new Error(
        `La prórroga no puede superar ${configuracion.plazos.diasSolicitarProrroga} día(s) adicionales. Fecha máxima: ${diaISO(fechaMaxima)}`
      );
    }

    const estado = await CaseRepository.findEstado("Prórroga Solicitada");
    return prisma.$transaction(async (tx) => {
      const actualizado = await tx.planes_accion.update({
        where: { id_plan },
        data: {
          prorroga_motivo: dto.justificacion,
          prorroga_fecha: fechaPedida,
          prorroga_estado: "pendiente",
          prorroga_fecha_sol: new Date(),
          updated_at: new Date(),
        },
      });
      await tx.casos_sop.update({ where: { id_caso: plan.id_caso }, data: { estado_hallazgo: estado.id_detalle } });
      await CaseRepository.pushTimeline(tx, plan.id_caso, {
        kind: "ampliacion",
        actor,
        actor_rol: "jefe",
        titulo: "Solicitud de ampliación de plazo",
        detalle: `${plan.codigo_plan}. Nueva fecha: ${dto.nueva_fecha}. Justificación: ${dto.justificacion}`,
      });
      await NotificationRepository.emitir(tx, {
        para: { rol: "Seguridad Operativa" },
        tipo: "prorroga_solicitada",
        titulo: `Prórroga solicitada en ${plan.codigo_plan}`,
        mensaje: `${actor} pide mover el plazo al ${dto.nueva_fecha}. Motivo: ${dto.justificacion}`,
      });
      return actualizado;
    });
  }

  /**
   * SO aprueba o rechaza la prórroga de un plan sin tocar los demás.
   *
   * Al aprobar, SO puede correr el plan a `fecha_aprobada` en vez de la fecha
   * que pidió el área: la solicitud del Jefe es una propuesta, no un plazo
   * que se acepte tal cual. Sin `fecha_aprobada` vale la fecha propuesta.
   */
  static async reviewExtensionByPlan(
    id_plan: number,
    decision: "aprobada" | "rechazada",
    nota: string | null,
    fecha_aprobada: string | null = null
  ) {
    const plan = await prisma.planes_accion.findUnique({
      where: { id_plan },
      select: {
        id_plan: true,
        id_caso: true,
        codigo_plan: true,
        responsable: true,
        fecha_plan: true,
        fecha_reprogramada: true,
        actividades_plan: { select: { fecha_fin: true } },
        prorroga_fecha: true,
        prorroga_estado: true,
      },
    });
    if (!plan) throw new Error(`El plan ${id_plan} no existe`);
    if (plan.prorroga_estado !== "pendiente") {
      throw new Error(`El plan ${plan.codigo_plan} no tiene una prórroga pendiente`);
    }

    // Las columnas son @db.Date: se comparan y guardan como medianoche UTC.
    const fechaVigente = planDeadline(plan);
    const fechaFinal =
      decision === "aprobada"
        ? fecha_aprobada
          ? new Date(`${fecha_aprobada}T00:00:00.000Z`)
          : plan.prorroga_fecha
        : null;

    if (decision === "aprobada") {
      if (!fechaFinal) {
        throw new Error(`No hay fecha para aprobar la prórroga de ${plan.codigo_plan}`);
      }
      if (fechaFinal.getTime() <= fechaVigente.getTime()) {
        throw new Error(
          `La nueva fecha debe ser posterior al plazo vigente (${diaISO(fechaVigente)}) para que sea una ampliación`
        );
      }
    }

    const ajustada =
      !!fechaFinal && !!plan.prorroga_fecha && fechaFinal.getTime() !== plan.prorroga_fecha.getTime();

    const [estadoEjecucion, estadoProrroga] = await Promise.all([
      CaseRepository.findEstado("Ejecución"),
      CaseRepository.findEstado("Prórroga Solicitada"),
    ]);

    return prisma.$transaction(async (tx) => {
      const actualizado = await tx.planes_accion.update({
        where: { id_plan },
        data: {
          prorroga_estado: decision,
          updated_at: new Date(),
          ...(fechaFinal ? { fecha_reprogramada: fechaFinal } : {}),
        },
      });

      const pendientes = await tx.planes_accion.count({
        where: { id_caso: plan.id_caso, prorroga_estado: "pendiente" },
      });

      await tx.casos_sop.update({
        where: { id_caso: plan.id_caso },
        data: { estado_hallazgo: pendientes > 0 ? estadoProrroga.id_detalle : estadoEjecucion.id_detalle },
      });

      // La bitácora deja constancia de qué pidió el área y qué otorgó SO,
      // que es lo que se audita cuando el plazo aprobado no es el propuesto.
      const resumen =
        decision === "rechazada"
          ? `${plan.codigo_plan}: solicitud rechazada, se mantiene el ${diaISO(fechaVigente)}.`
          : ajustada
            ? `${plan.codigo_plan}: aprobada al ${diaISO(fechaFinal!)}; el área había pedido el ${diaISO(plan.prorroga_fecha!)}.`
            : `${plan.codigo_plan}: aprobada al ${diaISO(fechaFinal!)}, según lo pedido por el área.`;

      await CaseRepository.pushTimeline(tx, plan.id_caso, {
        kind: "ampliacion",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo:
          decision === "rechazada"
            ? `Ampliación de plazo rechazada — ${plan.codigo_plan}`
            : ajustada
              ? `Ampliación aprobada con plazo ajustado — ${plan.codigo_plan}`
              : `Ampliación de plazo aprobada — ${plan.codigo_plan}`,
        detalle: nota ? `${resumen} ${nota}` : resumen,
      });

      // Al jefe le importa el desenlace, y sobre todo si el plazo otorgado no
      // es el que pidió: de eso depende cómo reorganiza su ejecución.
      await NotificationRepository.emitir(tx, {
        para: { id_usuario: plan.responsable },
        tipo: "prorroga_resuelta",
        titulo:
          decision === "rechazada"
            ? `Prórroga rechazada en ${plan.codigo_plan}`
            : ajustada
              ? `Prórroga aprobada con otro plazo en ${plan.codigo_plan}`
              : `Prórroga aprobada en ${plan.codigo_plan}`,
        mensaje: nota ? `${resumen} ${nota}` : resumen,
      });

      return actualizado;
    });
  }

  /** SO confirma que ya no queda ejecución abierta y mueve el expediente a Verificación. */
  static async sendToVerification(id_caso: number) {
    const estadoVerificacion = await CaseRepository.findEstado("Verificación");

    return prisma.$transaction(async (tx) => {
      const planes = await tx.planes_accion.findMany({
        where: { id_caso },
        select: {
          codigo_plan: true,
          prorroga_estado: true,
          catalogo_detalle: { select: { nombre: true } },
        },
        orderBy: { created_at: "asc" },
      });

      if (planes.length === 0) {
        throw new Error("No se puede pasar a Verificación sin planes de acción");
      }

      const conProrrogaPendiente = planes.filter((plan) => plan.prorroga_estado === "pendiente");
      if (conProrrogaPendiente.length > 0) {
        throw new Error(`Resuelva las prórrogas pendientes antes de pasar a Verificación: ${conProrrogaPendiente.map((p) => p.codigo_plan).join(", ")}`);
      }

      const abiertos = planes.filter((plan) => {
        const estado = plan.catalogo_detalle.nombre.toLowerCase();
        return !estado.includes("finaliz") && !estado.includes("cerrad");
      });
      if (abiertos.length > 0) {
        throw new Error(`Aún hay planes en ejecución o pendientes: ${abiertos.map((p) => p.codigo_plan).join(", ")}`);
      }

      const caso = await tx.casos_sop.update({
        where: { id_caso },
        data: { estado_hallazgo: estadoVerificacion.id_detalle },
      });

      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "seguimiento",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Expediente enviado a Verificación",
        detalle: "Todos los planes de acción quedaron listos para validación final por Seguridad Operativa.",
      });

      return caso;
    });
  }

  /** ETAPA 5 — el área actualiza el estado/avance de una actividad del plan. */
  static async updateActivity(id_actividad: number, estadoNombre: string, comentario: string | null, actor: string) {
    const estado = await CaseRepository.findEstadoActividad(estadoNombre);
    const porcentaje = estadoNombre === "Completado" ? 100 : estadoNombre === "En progreso" ? 50 : 0;

    return prisma.$transaction(async (tx) => {
      const actividad = await tx.actividades_plan.update({
        where: { id_actividad },
        data: { estado: estado.id_detalle, porcentaje },
        include: {
          planes_accion: {
            select: {
              id_plan: true,
              id_caso: true,
              codigo_plan: true,
              catalogo_detalle: { select: { nombre: true } },
            },
          },
        },
      });

      if (comentario) {
        await tx.seguimientos.create({ data: { id_actividad, comentario, porcentaje } });
      }

      await CaseRepository.pushTimeline(tx, actividad.planes_accion.id_caso, {
        kind: "seguimiento",
        actor,
        actor_rol: "jefe",
        titulo: `Actividad actualizada — ${actividad.planes_accion.codigo_plan}`,
        detalle: `${estadoNombre}: ${comentario ?? actividad.descripcion}`,
      });

      return actividad;
    });
  }

  /** ETAPA 5 — el Jefe del Área solicita ampliación de plazo. */
  static async requestExtension(id_caso: number, dto: { nueva_fecha: string; justificacion: string }, actor: string) {
    const estado = await CaseRepository.findEstado("Prórroga Solicitada");
    return prisma.$transaction(async (tx) => {
      await tx.planes_accion.updateMany({
        where: { id_caso },
        data: {
          prorroga_motivo: dto.justificacion,
          prorroga_fecha: new Date(dto.nueva_fecha),
          prorroga_estado: "pendiente",
          prorroga_fecha_sol: new Date(),
        },
      });
      const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "ampliacion",
        actor,
        actor_rol: "jefe",
        titulo: "Solicitud de ampliación de plazo",
        detalle: `Nueva fecha: ${dto.nueva_fecha}. Justificación: ${dto.justificacion}`,
      });
      return caso;
    });
  }

  /** ETAPA 5 — SO aprueba o rechaza la prórroga; el caso vuelve a Ejecución. */
  static async reviewExtension(id_caso: number, decision: "aprobada" | "rechazada", nota: string | null) {
    const estado = await CaseRepository.findEstado("Ejecución");
    return prisma.$transaction(async (tx) => {
      const planes = await tx.planes_accion.findMany({
        where: { id_caso },
        select: { id_plan: true, prorroga_fecha: true },
      });

      for (const p of planes) {
        await tx.planes_accion.update({
          where: { id_plan: p.id_plan },
          data: {
            prorroga_estado: decision,
            // Solo si se aprueba se corre la fecha del plan.
            ...(decision === "aprobada" && p.prorroga_fecha ? { fecha_reprogramada: p.prorroga_fecha } : {}),
          },
        });
      }

      const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "ampliacion",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: decision === "aprobada" ? "Ampliación de plazo aprobada" : "Ampliación de plazo rechazada",
        detalle: nota,
      });
      return caso;
    });
  }

  /** ETAPA 6 — SO deja constancia y conserva el expediente en Verificación. */
  static async keepPending(id_caso: number, motivo?: string | null) {
    const estado = await CaseRepository.findEstado("Verificación");
    return prisma.$transaction(async (tx) => {
      const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "seguimiento",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Caso mantenido pendiente en Verificación",
        detalle: motivo ?? "Seguridad Operativa mantiene el expediente pendiente de verificación.",
      });
      return caso;
    });
  }

  /** ETAPA 7 — reabrir un caso cerrado hacia la etapa que SO necesita corregir. */
  static async reopenCase(
    id_caso: number,
    motivo?: string | null,
    destino: "Recepción" | "Evaluación" | "Investigación" | "Plan de Acción" | "Ejecución" | "Verificación" = "Verificación"
  ) {
    const estado = await CaseRepository.findEstado(destino);
    return prisma.$transaction(async (tx) => {
      const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "reapertura",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: `Caso reabierto a ${destino}`,
        detalle: motivo ? `${motivo} · Etapa destino: ${destino}.` : `El caso vuelve a ${destino}.`,
      });
      return caso;
    });
  }

  /** Retroceso controlado entre etapas activas, sin borrar datos del expediente. */
  static async rollbackStage(
    id_caso: number,
    estadoActualNombre: string,
    destinoNombre: "Evaluación" | "Investigación" | "Plan de Acción",
    motivo: string
  ) {
    const permitidos: Record<string, Array<"Evaluación" | "Investigación" | "Plan de Acción">> = {
      Investigación: ["Evaluación"],
      "Plan de Acción": ["Investigación"],
      Ejecución: ["Plan de Acción"],
    };

    if (!permitidos[estadoActualNombre]?.includes(destinoNombre)) {
      throw new Error(`No se puede retroceder de "${estadoActualNombre}" a "${destinoNombre}"`);
    }

    const estadoDestino = await CaseRepository.findEstado(destinoNombre);
    return prisma.$transaction(async (tx) => {
      const caso = await tx.casos_sop.update({
        where: { id_caso },
        data: { estado_hallazgo: estadoDestino.id_detalle },
      });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "retroceso",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: `Retroceso de etapa — vuelve a ${destinoNombre}`,
        detalle: `Desde ${estadoActualNombre}. Motivo: ${motivo}`,
      });
      return caso;
    });
  }

  static async closeCase(id_caso: number, nota?: string | null) {
    const [estado, estadoPlanCerrado] = await Promise.all([
      CaseRepository.findEstado("Cerrado"),
      CaseRepository.findEstadoPlan("Cerrado"),
    ]);
    return prisma.$transaction(async (tx) => {
      const [totalPlanes, planesAbiertos] = await Promise.all([
        tx.planes_accion.count({ where: { id_caso } }),
        tx.planes_accion.count({ where: { id_caso, estado: { not: estadoPlanCerrado.id_detalle } } }),
      ]);

      if (totalPlanes > 0 && planesAbiertos > 0) {
        throw new Error("No se puede cerrar el expediente hasta que todos los planes de acción estén cerrados por Seguridad Operativa");
      }

      const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
      await CaseRepository.pushTimeline(tx, id_caso, {
        kind: "cierre",
        actor: ACTOR_SO,
        actor_rol: "seguridad",
        titulo: "Caso cerrado",
        detalle: nota ?? "Cierre del caso. Historial completo generado y archivado.",
      });
      return caso;
    });
  }

  static async addEvidence(id_caso: number, archivos: UploadedFile[], actor = ACTOR_SO) {
    return prisma.$transaction(async (tx) => {
      const anexosCreados = [] as Awaited<ReturnType<typeof prisma.anexos_caso.create>>[];

      for (const f of archivos) {
        const anexo = await tx.anexos_caso.create({
          data: {
            id_caso,
            nombre_archivo: f.originalname,
            ruta_archivo: `/uploads/casos/${f.filename}`,
            tipo_archivo: f.mimetype,
            peso: Math.round((f.size / 1024) * 100) / 100,
          },
        });
        anexosCreados.push(anexo);
      }

      if (anexosCreados.length > 0) {
        const detalleHumano = anexosCreados.map((a) => a.nombre_archivo).filter(Boolean).join(", ");
        const detalleTecnico = {
          origin: "seguridad",
          actor,
          anexos: anexosCreados.map((a) => ({
            id_anexo: a.id_anexo,
            nombre_archivo: a.nombre_archivo,
            ruta_archivo: a.ruta_archivo,
          })),
        };

        await CaseRepository.pushTimeline(tx, id_caso, {
          kind: "seguimiento",
          actor,
          actor_rol: "seguridad",
          titulo: "Evidencia adjuntada al expediente",
          detalle: `${detalleHumano}\n__CASE_EVIDENCE__:${JSON.stringify(detalleTecnico)}`,
        });
      }

      return tx.anexos_caso.findMany({ where: { id_caso }, orderBy: { fecha_subida: "desc" } });
    });
  }

  /**
   * Actualizaciones adicionales de un plan ya finalizado por el área.
   *
   * La actualización "original" es la descripción de cierre que el jefe manda
   * con `completeExecutionByPlan`. Cuando después necesita agregar información
   * no se edita aquella —queda bloqueada— sino que se apila una nueva, con su
   * propia descripción y sus propias evidencias, siempre sobre el MISMO plan.
   *
   * No hay tabla nueva: el texto va a `seguimientos` (que ya es el registro de
   * avance por actividad) y las evidencias a `anexos_caso`, enlazadas con el
   * mismo payload `__PLAN_EVIDENCE__` del timeline que usa `addEvidenceByPlan`,
   * más el `seguimientoId` para saber a qué actualización pertenece cada una.
   */
  static readonly MAX_ACTUALIZACIONES_ADICIONALES = 4;

  /** Cuenta las actualizaciones adicionales ya registradas para un plan. */
  static async contarActualizaciones(id_plan: number, id_caso: number): Promise<number> {
    return prisma.timeline_caso.count({
      where: { id_caso, kind: "actualizacion", detalle: { contains: `"planId":${id_plan}` } },
    });
  }

  static async addPlanUpdate(id_plan: number, descripcion: string, archivos: UploadedFile[], actor: string) {
    const plan = await prisma.planes_accion.findUnique({
      where: { id_plan },
      select: {
        id_plan: true,
        id_caso: true,
        codigo_plan: true,
        actividades_plan: { select: { id_actividad: true }, orderBy: { id_actividad: "asc" }, take: 1 },
      },
    });
    if (!plan) throw new Error(`El plan ${id_plan} no existe`);

    const actividad = plan.actividades_plan[0];
    if (!actividad) throw new Error(`El plan ${plan.codigo_plan} no tiene actividades donde registrar la actualización`);

    const yaRegistradas = await CaseRepository.contarActualizaciones(id_plan, plan.id_caso);
    if (yaRegistradas >= CaseRepository.MAX_ACTUALIZACIONES_ADICIONALES) {
      throw new Error(
        `El plan ${plan.codigo_plan} alcanzó el máximo de ${CaseRepository.MAX_ACTUALIZACIONES_ADICIONALES} actualizaciones adicionales. Comuníquese con Seguridad Operativa.`
      );
    }

    const numero = yaRegistradas + 1;

    return prisma.$transaction(async (tx) => {
      const seguimiento = await tx.seguimientos.create({
        data: {
          id_actividad: actividad.id_actividad,
          comentario: descripcion,
          // Sin porcentaje: el cliente pidió trabajar solo con los estados del
          // flujo, porque un plan puede ejecutarse y cerrarse el mismo día.
          porcentaje: null,
        },
      });

      const anexosCreados = [] as { id_anexo: number; nombre_archivo: string | null; ruta_archivo: string | null }[];
      for (const f of archivos) {
        const anexo = await tx.anexos_caso.create({
          data: {
            id_caso: plan.id_caso,
            nombre_archivo: f.originalname,
            ruta_archivo: `/uploads/casos/${f.filename}`,
            tipo_archivo: f.mimetype,
            peso: Math.round((f.size / 1024) * 100) / 100,
          },
        });
        anexosCreados.push({
          id_anexo: anexo.id_anexo,
          nombre_archivo: anexo.nombre_archivo,
          ruta_archivo: anexo.ruta_archivo,
        });
      }

      const payload = {
        planId: id_plan,
        planCode: plan.codigo_plan,
        seguimientoId: seguimiento.id_seguimiento,
        anexos: anexosCreados,
      };

      await CaseRepository.pushTimeline(tx, plan.id_caso, {
        kind: "actualizacion",
        actor,
        actor_rol: "jefe",
        titulo: `Actualización ${numero} — ${plan.codigo_plan}`,
        detalle: `${descripcion}\n__PLAN_EVIDENCE__:${JSON.stringify(payload)}`,
      });

      await NotificationRepository.emitir(tx, {
        para: { rol: "Seguridad Operativa" },
        tipo: "ejecucion_completada",
        titulo: `Actualización ${numero} en ${plan.codigo_plan}`,
        mensaje: `${actor} agregó información al plan: ${descripcion}`,
      });

      return {
        id_seguimiento: seguimiento.id_seguimiento,
        numero,
        restantes: CaseRepository.MAX_ACTUALIZACIONES_ADICIONALES - numero,
        anexos: anexosCreados,
      };
    });
  }

  static async addEvidenceByPlan(id_plan: number, archivos: UploadedFile[], actor: string) {
    const plan = await prisma.planes_accion.findUnique({
      where: { id_plan },
      select: { id_caso: true, codigo_plan: true },
    });
    if (!plan) throw new Error(`El plan ${id_plan} no existe`);

    return prisma.$transaction(async (tx) => {
      const anexosCreados = [] as Awaited<ReturnType<typeof prisma.anexos_caso.create>>[];

      if (archivos.length > 0) {
        for (const f of archivos) {
          const anexo = await tx.anexos_caso.create({
            data: {
              id_caso: plan.id_caso,
              nombre_archivo: f.originalname,
              ruta_archivo: `/uploads/casos/${f.filename}`,
              tipo_archivo: f.mimetype,
              peso: Math.round((f.size / 1024) * 100) / 100,
            },
          });
          anexosCreados.push(anexo);
        }

        const detalleHumano = anexosCreados.map((a) => a.nombre_archivo).filter(Boolean).join(", ");
        const detalleTecnico = {
          planId: id_plan,
          planCode: plan.codigo_plan,
          anexos: anexosCreados.map((a) => ({
            id_anexo: a.id_anexo,
            nombre_archivo: a.nombre_archivo,
            ruta_archivo: a.ruta_archivo,
          })),
        };

        await CaseRepository.pushTimeline(tx, plan.id_caso, {
          kind: "seguimiento",
          actor,
          actor_rol: "jefe",
          titulo: `Evidencia adjuntada — ${plan.codigo_plan}`,
          detalle: `${detalleHumano}\n__PLAN_EVIDENCE__:${JSON.stringify(detalleTecnico)}`,
        });
      }

      return anexosCreados;
    });
  }
}
