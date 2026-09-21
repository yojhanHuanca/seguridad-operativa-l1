import * as Prisma from './internal/prismaNamespaceBrowser.js';
export { Prisma };
export * as $Enums from './enums.js';
export * from './enums.js';
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
 * Sin uso: ninguna ruta lee ni escribe esta tabla. Es un diseño de auditoría
 * genérica anterior al módulo actual, reemplazado por `auditoria`
 * (misma idea — usuario/tabla/acción/fecha —, pero es la que sí usa
 * `AuditoriaService` en cada acción real del sistema). Se documenta en vez
 * de borrarse porque la tabla vive también en producción (Railway) y
 * eliminarla ahí requiere un paso manual aparte.
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
 * Sin uso: diseño de un dashboard configurable (elegir indicadores y
 * acomodarlos en un layout). Ver la nota en `dashboards`.
 */
export type dashboard_indicadores = Prisma.dashboard_indicadoresModel;
/**
 * Model dashboards
 * Sin uso: junto con `dashboard_indicadores`, era un dashboard armable por
 * el usuario (elegir qué indicadores mostrar y en qué orden). El producto
 * terminó siendo pantallas fijas por rol (`IndicadoresPage`, `KpisPage`,
 * `Dashboard` de Monitoreo), que sí usan `indicadores`/`historial_indicadores`
 * directamente — esas dos SÍ están en uso, solo el "armador" de dashboards
 * quedó sin construir.
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
 * Model eventos_monitoreo
 * *
 *  * Registro propio del panel de Monitorista — deliberadamente separado de
 *  * `eventos_operativos` (la tabla de Seguridad Operativa). Lo que registra
 *  * Monitoreo no debe reflejarse en SO hasta que el jefe lo valide y lo
 *  * asigne; esa integración es un paso aparte, todavía sin construir.
 */
export type eventos_monitoreo = Prisma.eventos_monitoreoModel;
/**
 * Model evidencias
 * Sin uso: adjuntos de `incidencias` (ver la nota ahí). La evidencia real de
 * un caso vive en `anexos_caso`.
 */
export type evidencias = Prisma.evidenciasModel;
/**
 * Model evidencias_evento
 * Sin uso: adjuntos de `eventos_operativos` (el evento original que da
 * origen a un caso). La evidencia real de un caso vive en `anexos_caso`,
 * no acá.
 */
export type evidencias_evento = Prisma.evidencias_eventoModel;
/**
 * Model historial_indicadores
 *
 */
export type historial_indicadores = Prisma.historial_indicadoresModel;
/**
 * Model datos_operativos
 * Valores diarios de operación que alimentan los indicadores y conservan el
 * mismo nivel de detalle de la base histórica del cliente.
 */
export type datos_operativos = Prisma.datos_operativosModel;
/**
 * Model contingencia_catalogos
 * Catálogos propios del módulo de Planes de Contingencia. Nacen del Excel
 * "PLANTILLA PLANES DE CONTINGENCIA 2026.xlsx" y se guardan separados de los
 * catálogos SOP/Monitoreo para no mezclar dominios.
 */
export type contingencia_catalogos = Prisma.contingencia_catalogosModel;
/**
 * Model contingencia_catalogo_items
 *
 */
export type contingencia_catalogo_items = Prisma.contingencia_catalogo_itemsModel;
/**
 * Model contingencia_eventos
 * Registro principal del perfil Gestión de Planes de Contingencia. Conserva
 * la granularidad del Excel, pero dividido en relaciones 1:1 para que el
 * formulario pueda leerse por secciones.
 */
export type contingencia_eventos = Prisma.contingencia_eventosModel;
/**
 * Model contingencia_atenciones
 *
 */
export type contingencia_atenciones = Prisma.contingencia_atencionesModel;
/**
 * Model contingencia_traslados
 *
 */
export type contingencia_traslados = Prisma.contingencia_trasladosModel;
/**
 * Model contingencia_personas
 *
 */
export type contingencia_personas = Prisma.contingencia_personasModel;
/**
 * Model contingencia_diagnosticos
 *
 */
export type contingencia_diagnosticos = Prisma.contingencia_diagnosticosModel;
/**
 * Model contingencia_cierres
 *
 */
export type contingencia_cierres = Prisma.contingencia_cierresModel;
/**
 * Model incidencias
 * Sin uso real: solo se le hace `.count()` desde `AreaRepository`/
 * `EstacionRepository` (para bloquear borrar un área/estación "en uso"),
 * pero nada en la aplicación crea filas acá, así que ese conteo siempre
 * da 0. Es el diseño genérico original de "incidente" — reemplazado por
 * `casos_sop` y su propio árbol (`anexos_caso`, `investigacion_caso`,
 * `planes_accion` con sus campos `prorroga_*`). `evidencias`,
 * `investigaciones` y `solicitudes_prorroga` son sus satélites, igual de
 * sin uso.
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
 * Sin uso: investigación de `incidencias` (ver la nota ahí). La
 * investigación real de un caso vive en `investigacion_caso`.
 */
export type investigaciones = Prisma.investigacionesModel;
/**
 * Model logs_sistema
 * Sin uso: log de aplicación genérico. Los errores del servidor se
 * registran con `console.error` (ver `safeErrorMessage` en
 * `utils/ApiResponse.ts`) y las acciones de negocio quedan en `auditoria`,
 * no acá.
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
 * Model push_subscriptions
 * Un usuario puede tener varias filas (un celular, una laptop, etc.) --
 * cada `endpoint` es el navegador/dispositivo que aceptó recibir push.
 */
export type push_subscriptions = Prisma.push_subscriptionsModel;
/**
 * Model planes_accion
 *
 */
export type planes_accion = Prisma.planes_accionModel;
/**
 * Model reporte_detalle
 * Sin uso: fila de detalle de `reporte_estadistico` (ver la nota ahí).
 */
export type reporte_detalle = Prisma.reporte_detalleModel;
/**
 * Model reporte_estadistico
 * Sin uso: diseño de un reporte estadístico que se generaba y se guardaba
 * en la base. El export real (`ReportExportPage` + `exportarCombinadoExcel`)
 * arma el Excel al vuelo desde `casos_sop` cada vez, sin persistir un
 * registro de "reporte" acá.
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
 * Sin uso: prórroga de `incidencias` (ver la nota ahí). La prórroga real de
 * un plan de acción vive en los campos `prorroga_*` de `planes_accion`
 * (`prorroga_motivo`, `prorroga_fecha`, `prorroga_estado`,
 * `prorroga_fecha_sol`), no en una tabla aparte.
 */
export type solicitudes_prorroga = Prisma.solicitudes_prorrogaModel;
/**
 * Model usuarios
 *
 */
export type usuarios = Prisma.usuariosModel;
/**
 * Model password_resets
 * Tokens de un solo uso para "Olvidé mi contraseña" — se guarda el hash del
 * token (nunca el token en claro) y expira solo; no se reutiliza el mismo
 * token dos veces aunque no haya expirado.
 */
export type password_resets = Prisma.password_resetsModel;
//# sourceMappingURL=browser.d.ts.map