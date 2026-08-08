import * as runtime from "@prisma/client/runtime/library";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Actividades_plans
 * const actividades_plans = await prisma.actividades_plan.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model actividades_plan
 *
 */
export type actividades_plan = Prisma.actividades_planModel;
/**
 * Model anexos_caso
 *
 */
export type anexos_caso = Prisma.anexos_casoModel;
/**
 * Model areas
 *
 */
export type areas = Prisma.areasModel;
/**
 * Model auditoria
 *
 */
export type auditoria = Prisma.auditoriaModel;
/**
 * Model bitacora
 *
 */
export type bitacora = Prisma.bitacoraModel;
/**
 * Model casos_sop
 *
 */
export type casos_sop = Prisma.casos_sopModel;
/**
 * Model catalogo_detalle
 *
 */
export type catalogo_detalle = Prisma.catalogo_detalleModel;
/**
 * Model catalogos
 *
 */
export type catalogos = Prisma.catalogosModel;
/**
 * Model configuracion
 *
 */
export type configuracion = Prisma.configuracionModel;
/**
 * Model dashboard_indicadores
 *
 */
export type dashboard_indicadores = Prisma.dashboard_indicadoresModel;
/**
 * Model dashboards
 *
 */
export type dashboards = Prisma.dashboardsModel;
/**
 * Model estaciones
 *
 */
export type estaciones = Prisma.estacionesModel;
/**
 * Model evento_caso
 *
 */
export type evento_caso = Prisma.evento_casoModel;
/**
 * Model eventos_operativos
 *
 */
export type eventos_operativos = Prisma.eventos_operativosModel;
/**
 * Model evidencias
 *
 */
export type evidencias = Prisma.evidenciasModel;
/**
 * Model evidencias_evento
 *
 */
export type evidencias_evento = Prisma.evidencias_eventoModel;
/**
 * Model historial_indicadores
 *
 */
export type historial_indicadores = Prisma.historial_indicadoresModel;
/**
 * Model incidencias
 *
 */
export type incidencias = Prisma.incidenciasModel;
/**
 * Model indicadores
 *
 */
export type indicadores = Prisma.indicadoresModel;
/**
 * Model timeline_caso
 * Bitácora del expediente: un registro por cada acción del workflow.
 * Equivale a `CaseFile.timeline` del prototipo (pushTimeline en cada acción).
 * Es distinta de `bitacora`, que es auditoría técnica del sistema y exige
 * usuario — aquí el actor puede ser un rol sin login todavía.
 */
export type timeline_caso = Prisma.timeline_casoModel;
/**
 * Model investigacion_caso
 *
 */
export type investigacion_caso = Prisma.investigacion_casoModel;
/**
 * Model investigaciones
 *
 */
export type investigaciones = Prisma.investigacionesModel;
/**
 * Model logs_sistema
 *
 */
export type logs_sistema = Prisma.logs_sistemaModel;
/**
 * Model metas_indicadores
 *
 */
export type metas_indicadores = Prisma.metas_indicadoresModel;
/**
 * Model notificaciones
 *
 */
export type notificaciones = Prisma.notificacionesModel;
/**
 * Model planes_accion
 *
 */
export type planes_accion = Prisma.planes_accionModel;
/**
 * Model reporte_detalle
 *
 */
export type reporte_detalle = Prisma.reporte_detalleModel;
/**
 * Model reporte_estadistico
 *
 */
export type reporte_estadistico = Prisma.reporte_estadisticoModel;
/**
 * Model roles
 *
 */
export type roles = Prisma.rolesModel;
/**
 * Model seguimientos
 *
 */
export type seguimientos = Prisma.seguimientosModel;
/**
 * Model sesiones
 *
 */
export type sesiones = Prisma.sesionesModel;
/**
 * Model solicitudes_informacion
 *
 */
export type solicitudes_informacion = Prisma.solicitudes_informacionModel;
/**
 * Model solicitudes_prorroga
 *
 */
export type solicitudes_prorroga = Prisma.solicitudes_prorrogaModel;
/**
 * Model usuarios
 *
 */
export type usuarios = Prisma.usuariosModel;
//# sourceMappingURL=client.d.ts.map