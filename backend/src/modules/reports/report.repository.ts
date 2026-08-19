import prisma from "../../lib/prisma.js";
import { NotificationRepository } from "../notifications/notification.repository.js";
import type { CreateReportDto, UploadedFile } from "./report.types.js";

const DIAS: string[] = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

const LIST_INCLUDE = {
  catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { select: { nombre: true, color: true } },
  catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { select: { nombre: true } },
  catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { select: { nombre: true } },
  areas: { select: { nombre_area: true } },
  anexos_caso: { select: { id_anexo: true } },
  solicitudes_informacion: {
    orderBy: { fecha_solicitud: "desc" as const },
    select: {
      id_solicitud: true,
      mensaje: true,
      respuesta: true,
      respondida: true,
      fecha_solicitud: true,
      fecha_respuesta: true,
    },
  },
  evento_caso: {
    include: {
      eventos_operativos: {
        include: {
          catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: { select: { nombre: true } },
          catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: { select: { nombre: true } },
        },
      },
    },
  },
} as const;

export class ReportRepository {
  static async findAll() {
    return prisma.casos_sop.findMany({
      orderBy: { created_at: "desc" },
      include: LIST_INCLUDE,
    });
  }

  /** "Mis reportes" del trabajador: solo los casos que él mismo registró. */
  static async findAllByCreator(id_usuario: number) {
    return prisma.casos_sop.findMany({
      where: { created_by: id_usuario },
      orderBy: { created_at: "desc" },
      include: LIST_INCLUDE,
    });
  }

  static async findByCodigo(codigo_sop: string) {
    return prisma.casos_sop.findUnique({
      where: { codigo_sop },
      include: LIST_INCLUDE,
    });
  }

  static async findCatalogoDetalle(catalogoNombre: string, valorNombre: string) {
    return prisma.catalogo_detalle.findFirst({
      where: { nombre: valorNombre, catalogos: { nombre: catalogoNombre } },
    });
  }

  static async findCatalogoDetalleById(id_detalle: number) {
    return prisma.catalogo_detalle.findUnique({
      where: { id_detalle },
      include: { catalogos: { select: { nombre: true } } },
    });
  }

  static async createFullReport(dto: CreateReportDto, archivos: UploadedFile[], id_usuario_creador?: number) {
    const MAX_INTENTOS = 3;
    let intento = 0;

    while (true) {
      intento++;
      try {
        return await prisma.$transaction(async (tx) => {
          const ahora = new Date();
          const fecha = new Date(Date.UTC(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()));
          const hora = new Date(
            Date.UTC(1970, 0, 1, ahora.getHours(), ahora.getMinutes(), ahora.getSeconds())
          );

          const evento = await tx.eventos_operativos.create({
            data: {
              fecha,
              hora,
              anio: fecha.getUTCFullYear(),
              mes: fecha.getUTCMonth() + 1,
              dia: DIAS[fecha.getUTCDay()] ?? null,
              tipo_incidente: dto.id_tipo,
              lugar_incidente: dto.id_lugar,
              ubicacion: dto.id_lugar_especifico ?? null,
              descripcion: dto.descripcion,
              usuario_registra: id_usuario_creador ?? null,
            },
          });

          // El wizard no pide Área, Tipo SOP ni Tipo (No Conformidad/
          // Observación) — Seguridad Operativa los define al derivar el
          // caso, en la etapa de Evaluación.
          const [estadoRecepcion, estadoEvaluacion, procedencia, tipoSopDefault, tipoDefault, tipoReporte, lugar, lugarEspecifico] =
            await Promise.all([
              tx.catalogo_detalle.findFirst({ where: { nombre: "Recepción", catalogos: { nombre: "Estado Hallazgo" } } }),
              tx.catalogo_detalle.findFirst({ where: { nombre: "Evaluación", catalogos: { nombre: "Estado Hallazgo" } } }),
              tx.catalogo_detalle.findFirst({ where: { nombre: "Incidencias", catalogos: { nombre: "Procedencia" } } }),
              tx.catalogo_detalle.findFirst({ where: { nombre: "Hallazgo", catalogos: { nombre: "Tipo SOP" } } }),
              tx.catalogo_detalle.findFirst({ where: { nombre: "Observación", catalogos: { nombre: "Tipo" } } }),
              tx.catalogo_detalle.findUnique({ where: { id_detalle: dto.id_tipo }, select: { nombre: true } }),
              tx.catalogo_detalle.findUnique({ where: { id_detalle: dto.id_lugar }, select: { nombre: true } }),
              dto.id_lugar_especifico
                ? tx.catalogo_detalle.findUnique({ where: { id_detalle: dto.id_lugar_especifico }, select: { nombre: true } })
                : Promise.resolve(null),
            ]);
          if (!estadoRecepcion) throw new Error("Falta el estado 'Recepción' en el catálogo 'Estado Hallazgo'");
          if (!estadoEvaluacion) throw new Error("Falta el estado 'Evaluación' en el catálogo 'Estado Hallazgo'");
          if (!procedencia) throw new Error("Falta el valor 'Incidencias' en el catálogo 'Procedencia'");
          if (!tipoSopDefault) throw new Error("Falta el valor 'Hallazgo' en el catálogo 'Tipo SOP'");
          if (!tipoDefault) throw new Error("Falta el valor 'Observación' en el catálogo 'Tipo'");
          if (!tipoReporte) throw new Error("El tipo de reporte seleccionado no existe");
          if (!lugar) throw new Error("El lugar seleccionado no existe");

          // Código secuencial por año, mismo formato que el caso de ejemplo "SOP 01-2024".
          const year = fecha.getUTCFullYear();
          const inicioAnio = new Date(Date.UTC(year, 0, 1));
          const finAnio = new Date(Date.UTC(year + 1, 0, 1));
          const totalAnio = await tx.casos_sop.count({
            where: { fecha_hallazgo: { gte: inicioAnio, lt: finAnio } },
          });
          const codigo_sop = `SOP ${String(totalAnio + 1).padStart(2, "0")}-${year}`;

          const esIdentificado = dto.modalidad === "identificado";
          // Registrado por el analista desde el panel de SO: el caso nace con
          // su firma en la bitácora en vez de la del reportante de campo, y
          // se salta Recepción (esa etapa es para filtrar reportes que llegan
          // de afuera; un caso que ya crea SO no necesita ese filtro).
          const esRegistroSO = dto.origen === "seguridad_operativa";
          const estadoInicial = esRegistroSO ? estadoEvaluacion : estadoRecepcion;
          const nombreReportante = dto.nombre_reportante?.trim() || null;
          const ubicacionTitulo = [lugar.nombre, lugarEspecifico?.nombre].filter(Boolean).join(" · ");
          const titulo = `${tipoReporte.nombre} en ${ubicacionTitulo}`;

          const caso = await tx.casos_sop.create({
            data: {
              codigo_sop,
              titulo,
              fecha_hallazgo: ahora,
              fecha_evento: ahora,
              estado_hallazgo: estadoInicial.id_detalle,
              procedencia: procedencia.id_detalle,
              tipo: tipoDefault.id_detalle,
              descripcion: dto.descripcion,
              tipo_sop: tipoSopDefault.id_detalle,
              nombre_reportante: esIdentificado ? nombreReportante : null,
              correo_reportante: esIdentificado ? dto.correo_reportante?.trim().toLowerCase() || null : null,
              telefono_reportante: esIdentificado ? dto.telefono_reportante?.trim() || null : null,
              created_by: id_usuario_creador ?? null,
              // Si lo registra SO directamente, esa persona ya es quien investiga.
              // Si viene de un Reportante, queda sin responsable hasta que SO lo evalúe.
              ...(esRegistroSO && id_usuario_creador ? { responsable_hallazgo: id_usuario_creador } : {}),
              // area_responsable: lo define Seguridad Operativa al derivar el caso.
            },
          });

          await tx.evento_caso.create({
            data: { id_evento: evento.id_evento, id_caso: caso.id_caso },
          });

          // Si el hallazgo se creó desde "Eventos asignados" de Monitoreo,
          // deja registrado a qué caso dio origen ese evento — así esa
          // tarjeta pasa de "Crear hallazgo" a "Ver hallazgo" y no se repite.
          if (dto.id_evento_monitoreo != null) {
            await tx.eventos_monitoreo.update({
              where: { id_evento: dto.id_evento_monitoreo },
              data: { id_caso_creado: caso.id_caso },
            });
          }

          const actorReportante = esIdentificado ? nombreReportante || "Reportante Identificado" : "Reporte Anónimo";

          await tx.timeline_caso.create({
            data: {
              id_caso: caso.id_caso,
              kind: "creado",
              actor: esRegistroSO ? nombreReportante || "Seguridad Operativa" : actorReportante,
              actor_rol: esRegistroSO ? "seguridad" : "reportante",
              titulo: esRegistroSO ? "Reporte registrado por Seguridad Operativa" : "Reporte registrado por trabajador",
              detalle: esRegistroSO
                ? `${codigo_sop} creado desde el panel de Seguridad Operativa. Pasa directo a Evaluación.`
                : `${codigo_sop} creado. Enviado a la bandeja de Seguridad Operativa.`,
            },
          });

          await NotificationRepository.emitir(tx, {
            para: { rol: "Seguridad Operativa" },
            tipo: "reporte_nuevo",
            titulo: `Nuevo reporte ${codigo_sop}`,
            mensaje: `${titulo}. Registrado por ${
              esRegistroSO
                ? `${nombreReportante || "Seguridad Operativa"} (Seguridad Operativa)`
                : esIdentificado
                  ? nombreReportante || "un reportante identificado"
                  : "un reportante anónimo"
            }. ${esRegistroSO ? "Pendiente de evaluación." : "Pendiente de recepción."}`,
          });

          if (archivos.length > 0) {
            await tx.anexos_caso.createMany({
              data: archivos.map((f) => ({
                id_caso: caso.id_caso,
                nombre_archivo: f.originalname,
                ruta_archivo: `/uploads/casos/${f.filename}`,
                tipo_archivo: f.mimetype,
                peso: Math.round((f.size / 1024) * 100) / 100, // KB
              })),
            });
          }

          return { caso, evento };
        });
      } catch (error) {
        const esColisionCodigo = error instanceof Error && error.message.includes("codigo_sop");
        if (esColisionCodigo && intento < MAX_INTENTOS) continue;
        throw error;
      }
    }
  }
}
