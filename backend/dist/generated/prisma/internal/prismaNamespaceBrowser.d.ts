import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly actividades_plan: "actividades_plan";
    readonly anexos_caso: "anexos_caso";
    readonly areas: "areas";
    readonly auditoria: "auditoria";
    readonly bitacora: "bitacora";
    readonly casos_sop: "casos_sop";
    readonly catalogo_detalle: "catalogo_detalle";
    readonly catalogos: "catalogos";
    readonly configuracion: "configuracion";
    readonly dashboard_indicadores: "dashboard_indicadores";
    readonly dashboards: "dashboards";
    readonly estaciones: "estaciones";
    readonly evento_caso: "evento_caso";
    readonly eventos_operativos: "eventos_operativos";
    readonly eventos_monitoreo: "eventos_monitoreo";
    readonly evidencias: "evidencias";
    readonly evidencias_evento: "evidencias_evento";
    readonly historial_indicadores: "historial_indicadores";
    readonly incidencias: "incidencias";
    readonly indicadores: "indicadores";
    readonly timeline_caso: "timeline_caso";
    readonly investigacion_caso: "investigacion_caso";
    readonly investigaciones: "investigaciones";
    readonly logs_sistema: "logs_sistema";
    readonly metas_indicadores: "metas_indicadores";
    readonly notificaciones: "notificaciones";
    readonly planes_accion: "planes_accion";
    readonly reporte_detalle: "reporte_detalle";
    readonly reporte_estadistico: "reporte_estadistico";
    readonly roles: "roles";
    readonly seguimientos: "seguimientos";
    readonly sesiones: "sesiones";
    readonly solicitudes_informacion: "solicitudes_informacion";
    readonly solicitudes_prorroga: "solicitudes_prorroga";
    readonly usuarios: "usuarios";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const Actividades_planScalarFieldEnum: {
    readonly id_actividad: "id_actividad";
    readonly id_plan: "id_plan";
    readonly descripcion: "descripcion";
    readonly responsable: "responsable";
    readonly fecha_inicio: "fecha_inicio";
    readonly fecha_fin: "fecha_fin";
    readonly porcentaje: "porcentaje";
    readonly estado: "estado";
    readonly created_at: "created_at";
};
export type Actividades_planScalarFieldEnum = (typeof Actividades_planScalarFieldEnum)[keyof typeof Actividades_planScalarFieldEnum];
export declare const Anexos_casoScalarFieldEnum: {
    readonly id_anexo: "id_anexo";
    readonly id_caso: "id_caso";
    readonly nombre_archivo: "nombre_archivo";
    readonly ruta_archivo: "ruta_archivo";
    readonly tipo_archivo: "tipo_archivo";
    readonly peso: "peso";
    readonly fecha_subida: "fecha_subida";
    readonly usuario_subida: "usuario_subida";
};
export type Anexos_casoScalarFieldEnum = (typeof Anexos_casoScalarFieldEnum)[keyof typeof Anexos_casoScalarFieldEnum];
export declare const AreasScalarFieldEnum: {
    readonly id_area: "id_area";
    readonly nombre_area: "nombre_area";
};
export type AreasScalarFieldEnum = (typeof AreasScalarFieldEnum)[keyof typeof AreasScalarFieldEnum];
export declare const AuditoriaScalarFieldEnum: {
    readonly id_auditoria: "id_auditoria";
    readonly tabla_afectada: "tabla_afectada";
    readonly id_registro: "id_registro";
    readonly accion: "accion";
    readonly descripcion: "descripcion";
    readonly usuario: "usuario";
    readonly ip: "ip";
    readonly user_agent: "user_agent";
    readonly datos_previos: "datos_previos";
    readonly datos_nuevos: "datos_nuevos";
    readonly fecha: "fecha";
};
export type AuditoriaScalarFieldEnum = (typeof AuditoriaScalarFieldEnum)[keyof typeof AuditoriaScalarFieldEnum];
export declare const BitacoraScalarFieldEnum: {
    readonly id_bitacora: "id_bitacora";
    readonly usuario: "usuario";
    readonly modulo: "modulo";
    readonly accion: "accion";
    readonly descripcion: "descripcion";
    readonly fecha: "fecha";
    readonly datos_previos: "datos_previos";
    readonly datos_nuevos: "datos_nuevos";
};
export type BitacoraScalarFieldEnum = (typeof BitacoraScalarFieldEnum)[keyof typeof BitacoraScalarFieldEnum];
export declare const Casos_sopScalarFieldEnum: {
    readonly id_caso: "id_caso";
    readonly codigo_sop: "codigo_sop";
    readonly titulo: "titulo";
    readonly nombre_reportante: "nombre_reportante";
    readonly correo_reportante: "correo_reportante";
    readonly telefono_reportante: "telefono_reportante";
    readonly fecha_hallazgo: "fecha_hallazgo";
    readonly fecha_evento: "fecha_evento";
    readonly estado_hallazgo: "estado_hallazgo";
    readonly dias_abierto: "dias_abierto";
    readonly procedencia: "procedencia";
    readonly tipo: "tipo";
    readonly descripcion: "descripcion";
    readonly responsable_hallazgo: "responsable_hallazgo";
    readonly tipo_sop: "tipo_sop";
    readonly subtipo_sop: "subtipo_sop";
    readonly peligro: "peligro";
    readonly consecuencia: "consecuencia";
    readonly descripcion_evento: "descripcion_evento";
    readonly clasificacion: "clasificacion";
    readonly analisis_riesgo: "analisis_riesgo";
    readonly acr: "acr";
    readonly area_responsable: "area_responsable";
    readonly responsable_plan: "responsable_plan";
    readonly estado_plan: "estado_plan";
    readonly fecha_plan: "fecha_plan";
    readonly fecha_reprogramada: "fecha_reprogramada";
    readonly dias_abierto_plan: "dias_abierto_plan";
    readonly observaciones: "observaciones";
    readonly created_by: "created_by";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Casos_sopScalarFieldEnum = (typeof Casos_sopScalarFieldEnum)[keyof typeof Casos_sopScalarFieldEnum];
export declare const Catalogo_detalleScalarFieldEnum: {
    readonly id_detalle: "id_detalle";
    readonly id_catalogo: "id_catalogo";
    readonly codigo: "codigo";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly orden: "orden";
    readonly color: "color";
    readonly estado: "estado";
    readonly created_at: "created_at";
};
export type Catalogo_detalleScalarFieldEnum = (typeof Catalogo_detalleScalarFieldEnum)[keyof typeof Catalogo_detalleScalarFieldEnum];
export declare const CatalogosScalarFieldEnum: {
    readonly id_catalogo: "id_catalogo";
    readonly codigo: "codigo";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly estado: "estado";
    readonly created_at: "created_at";
};
export type CatalogosScalarFieldEnum = (typeof CatalogosScalarFieldEnum)[keyof typeof CatalogosScalarFieldEnum];
export declare const ConfiguracionScalarFieldEnum: {
    readonly id_config: "id_config";
    readonly nombre: "nombre";
    readonly valor: "valor";
    readonly descripcion: "descripcion";
};
export type ConfiguracionScalarFieldEnum = (typeof ConfiguracionScalarFieldEnum)[keyof typeof ConfiguracionScalarFieldEnum];
export declare const Dashboard_indicadoresScalarFieldEnum: {
    readonly id: "id";
    readonly id_dashboard: "id_dashboard";
    readonly id_indicador: "id_indicador";
    readonly posicion: "posicion";
};
export type Dashboard_indicadoresScalarFieldEnum = (typeof Dashboard_indicadoresScalarFieldEnum)[keyof typeof Dashboard_indicadoresScalarFieldEnum];
export declare const DashboardsScalarFieldEnum: {
    readonly id_dashboard: "id_dashboard";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly activo: "activo";
    readonly created_at: "created_at";
};
export type DashboardsScalarFieldEnum = (typeof DashboardsScalarFieldEnum)[keyof typeof DashboardsScalarFieldEnum];
export declare const EstacionesScalarFieldEnum: {
    readonly id_estacion: "id_estacion";
    readonly nombre_estacion: "nombre_estacion";
};
export type EstacionesScalarFieldEnum = (typeof EstacionesScalarFieldEnum)[keyof typeof EstacionesScalarFieldEnum];
export declare const Evento_casoScalarFieldEnum: {
    readonly id: "id";
    readonly id_evento: "id_evento";
    readonly id_caso: "id_caso";
    readonly fecha_conversion: "fecha_conversion";
    readonly usuario: "usuario";
};
export type Evento_casoScalarFieldEnum = (typeof Evento_casoScalarFieldEnum)[keyof typeof Evento_casoScalarFieldEnum];
export declare const Eventos_operativosScalarFieldEnum: {
    readonly id_evento: "id_evento";
    readonly codigo_evento: "codigo_evento";
    readonly fecha: "fecha";
    readonly hora: "hora";
    readonly anio: "anio";
    readonly mes: "mes";
    readonly semana: "semana";
    readonly dia: "dia";
    readonly rango_horario: "rango_horario";
    readonly tipo_incidente: "tipo_incidente";
    readonly descripcion: "descripcion";
    readonly ubicacion: "ubicacion";
    readonly tipo_via: "tipo_via";
    readonly direccion_via: "direccion_via";
    readonly lugar_incidente: "lugar_incidente";
    readonly modelo_mr: "modelo_mr";
    readonly numero_mr: "numero_mr";
    readonly numero_carrera: "numero_carrera";
    readonly personal_involucrado: "personal_involucrado";
    readonly tipo_causa: "tipo_causa";
    readonly posible_causa: "posible_causa";
    readonly informacion_adicional: "informacion_adicional";
    readonly camara_monitoreada: "camara_monitoreada";
    readonly demora: "demora";
    readonly estado: "estado";
    readonly usuario_registra: "usuario_registra";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Eventos_operativosScalarFieldEnum = (typeof Eventos_operativosScalarFieldEnum)[keyof typeof Eventos_operativosScalarFieldEnum];
export declare const Eventos_monitoreoScalarFieldEnum: {
    readonly id_evento: "id_evento";
    readonly codigo_evento: "codigo_evento";
    readonly fecha: "fecha";
    readonly hora: "hora";
    readonly anio: "anio";
    readonly mes: "mes";
    readonly semana: "semana";
    readonly dia: "dia";
    readonly rango_horario: "rango_horario";
    readonly tipo_incidente: "tipo_incidente";
    readonly descripcion: "descripcion";
    readonly ubicacion: "ubicacion";
    readonly tipo_via: "tipo_via";
    readonly direccion_via: "direccion_via";
    readonly lugar_incidente: "lugar_incidente";
    readonly modelo_mr: "modelo_mr";
    readonly numero_mr: "numero_mr";
    readonly numero_carrera: "numero_carrera";
    readonly personal_involucrado: "personal_involucrado";
    readonly tipo_causa: "tipo_causa";
    readonly posible_causa: "posible_causa";
    readonly informacion_adicional: "informacion_adicional";
    readonly camara_monitoreada: "camara_monitoreada";
    readonly demora: "demora";
    readonly estado: "estado";
    readonly usuario_registra: "usuario_registra";
    readonly asignado_a: "asignado_a";
    readonly id_caso_creado: "id_caso_creado";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Eventos_monitoreoScalarFieldEnum = (typeof Eventos_monitoreoScalarFieldEnum)[keyof typeof Eventos_monitoreoScalarFieldEnum];
export declare const EvidenciasScalarFieldEnum: {
    readonly id_evidencia: "id_evidencia";
    readonly id_incidencia: "id_incidencia";
    readonly ruta_archivo: "ruta_archivo";
    readonly tipo_archivo: "tipo_archivo";
    readonly fecha_subida: "fecha_subida";
};
export type EvidenciasScalarFieldEnum = (typeof EvidenciasScalarFieldEnum)[keyof typeof EvidenciasScalarFieldEnum];
export declare const Evidencias_eventoScalarFieldEnum: {
    readonly id_evidencia: "id_evidencia";
    readonly id_evento: "id_evento";
    readonly nombre_archivo: "nombre_archivo";
    readonly ruta_archivo: "ruta_archivo";
    readonly tipo_archivo: "tipo_archivo";
    readonly peso: "peso";
    readonly usuario: "usuario";
    readonly fecha_subida: "fecha_subida";
};
export type Evidencias_eventoScalarFieldEnum = (typeof Evidencias_eventoScalarFieldEnum)[keyof typeof Evidencias_eventoScalarFieldEnum];
export declare const Historial_indicadoresScalarFieldEnum: {
    readonly id_historial: "id_historial";
    readonly id_indicador: "id_indicador";
    readonly fecha: "fecha";
    readonly valor: "valor";
    readonly observacion: "observacion";
};
export type Historial_indicadoresScalarFieldEnum = (typeof Historial_indicadoresScalarFieldEnum)[keyof typeof Historial_indicadoresScalarFieldEnum];
export declare const IncidenciasScalarFieldEnum: {
    readonly id_incidencia: "id_incidencia";
    readonly codigo_incidencia: "codigo_incidencia";
    readonly tipo_evento: "tipo_evento";
    readonly descripcion: "descripcion";
    readonly nivel_riesgo: "nivel_riesgo";
    readonly estado: "estado";
    readonly fecha_registro: "fecha_registro";
    readonly fecha_limite: "fecha_limite";
    readonly id_usuario_reporta: "id_usuario_reporta";
    readonly id_estacion: "id_estacion";
    readonly id_area_responsable: "id_area_responsable";
};
export type IncidenciasScalarFieldEnum = (typeof IncidenciasScalarFieldEnum)[keyof typeof IncidenciasScalarFieldEnum];
export declare const IndicadoresScalarFieldEnum: {
    readonly id_indicador: "id_indicador";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly tipo: "tipo";
    readonly unidad_medida: "unidad_medida";
    readonly formula: "formula";
    readonly activo: "activo";
};
export type IndicadoresScalarFieldEnum = (typeof IndicadoresScalarFieldEnum)[keyof typeof IndicadoresScalarFieldEnum];
export declare const Timeline_casoScalarFieldEnum: {
    readonly id_evento: "id_evento";
    readonly id_caso: "id_caso";
    readonly kind: "kind";
    readonly actor: "actor";
    readonly actor_rol: "actor_rol";
    readonly titulo: "titulo";
    readonly detalle: "detalle";
    readonly fecha: "fecha";
};
export type Timeline_casoScalarFieldEnum = (typeof Timeline_casoScalarFieldEnum)[keyof typeof Timeline_casoScalarFieldEnum];
export declare const Investigacion_casoScalarFieldEnum: {
    readonly id_investigacion: "id_investigacion";
    readonly id_caso: "id_caso";
    readonly hallazgos: "hallazgos";
    readonly causa_raiz: "causa_raiz";
    readonly conclusiones: "conclusiones";
    readonly observaciones: "observaciones";
    readonly investigador: "investigador";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Investigacion_casoScalarFieldEnum = (typeof Investigacion_casoScalarFieldEnum)[keyof typeof Investigacion_casoScalarFieldEnum];
export declare const InvestigacionesScalarFieldEnum: {
    readonly id_investigacion: "id_investigacion";
    readonly id_incidencia: "id_incidencia";
    readonly causa_raiz: "causa_raiz";
    readonly plan_accion: "plan_accion";
    readonly id_usuario_investigador: "id_usuario_investigador";
    readonly fecha_investigacion: "fecha_investigacion";
};
export type InvestigacionesScalarFieldEnum = (typeof InvestigacionesScalarFieldEnum)[keyof typeof InvestigacionesScalarFieldEnum];
export declare const Logs_sistemaScalarFieldEnum: {
    readonly id_log: "id_log";
    readonly modulo: "modulo";
    readonly nivel: "nivel";
    readonly mensaje: "mensaje";
    readonly stack_trace: "stack_trace";
    readonly usuario: "usuario";
    readonly fecha: "fecha";
};
export type Logs_sistemaScalarFieldEnum = (typeof Logs_sistemaScalarFieldEnum)[keyof typeof Logs_sistemaScalarFieldEnum];
export declare const Metas_indicadoresScalarFieldEnum: {
    readonly id_meta: "id_meta";
    readonly id_indicador: "id_indicador";
    readonly anio: "anio";
    readonly mes: "mes";
    readonly valor_meta: "valor_meta";
};
export type Metas_indicadoresScalarFieldEnum = (typeof Metas_indicadoresScalarFieldEnum)[keyof typeof Metas_indicadoresScalarFieldEnum];
export declare const NotificacionesScalarFieldEnum: {
    readonly id_notificacion: "id_notificacion";
    readonly usuario: "usuario";
    readonly titulo: "titulo";
    readonly mensaje: "mensaje";
    readonly tipo: "tipo";
    readonly leido: "leido";
    readonly fecha: "fecha";
};
export type NotificacionesScalarFieldEnum = (typeof NotificacionesScalarFieldEnum)[keyof typeof NotificacionesScalarFieldEnum];
export declare const Planes_accionScalarFieldEnum: {
    readonly id_plan: "id_plan";
    readonly id_caso: "id_caso";
    readonly codigo_plan: "codigo_plan";
    readonly descripcion: "descripcion";
    readonly id_area: "id_area";
    readonly responsable: "responsable";
    readonly estado: "estado";
    readonly fecha_plan: "fecha_plan";
    readonly fecha_reprogramada: "fecha_reprogramada";
    readonly dias_abierto: "dias_abierto";
    readonly observaciones: "observaciones";
    readonly prorroga_motivo: "prorroga_motivo";
    readonly prorroga_fecha: "prorroga_fecha";
    readonly prorroga_estado: "prorroga_estado";
    readonly prorroga_fecha_sol: "prorroga_fecha_sol";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Planes_accionScalarFieldEnum = (typeof Planes_accionScalarFieldEnum)[keyof typeof Planes_accionScalarFieldEnum];
export declare const Reporte_detalleScalarFieldEnum: {
    readonly id_detalle: "id_detalle";
    readonly id_reporte: "id_reporte";
    readonly indicador: "indicador";
    readonly valor: "valor";
    readonly observacion: "observacion";
};
export type Reporte_detalleScalarFieldEnum = (typeof Reporte_detalleScalarFieldEnum)[keyof typeof Reporte_detalleScalarFieldEnum];
export declare const Reporte_estadisticoScalarFieldEnum: {
    readonly id_reporte: "id_reporte";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly fecha_inicio: "fecha_inicio";
    readonly fecha_fin: "fecha_fin";
    readonly generado_por: "generado_por";
    readonly fecha_generacion: "fecha_generacion";
};
export type Reporte_estadisticoScalarFieldEnum = (typeof Reporte_estadisticoScalarFieldEnum)[keyof typeof Reporte_estadisticoScalarFieldEnum];
export declare const RolesScalarFieldEnum: {
    readonly id_rol: "id_rol";
    readonly nombre_rol: "nombre_rol";
};
export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum];
export declare const SeguimientosScalarFieldEnum: {
    readonly id_seguimiento: "id_seguimiento";
    readonly id_actividad: "id_actividad";
    readonly comentario: "comentario";
    readonly porcentaje: "porcentaje";
    readonly fecha: "fecha";
    readonly usuario: "usuario";
};
export type SeguimientosScalarFieldEnum = (typeof SeguimientosScalarFieldEnum)[keyof typeof SeguimientosScalarFieldEnum];
export declare const SesionesScalarFieldEnum: {
    readonly id_sesion: "id_sesion";
    readonly usuario: "usuario";
    readonly fecha_inicio: "fecha_inicio";
    readonly fecha_fin: "fecha_fin";
    readonly direccion_ip: "direccion_ip";
    readonly navegador: "navegador";
    readonly dispositivo: "dispositivo";
    readonly estado: "estado";
};
export type SesionesScalarFieldEnum = (typeof SesionesScalarFieldEnum)[keyof typeof SesionesScalarFieldEnum];
export declare const Solicitudes_informacionScalarFieldEnum: {
    readonly id_solicitud: "id_solicitud";
    readonly id_caso: "id_caso";
    readonly mensaje: "mensaje";
    readonly respuesta: "respuesta";
    readonly respondida: "respondida";
    readonly estado_previo: "estado_previo";
    readonly fecha_solicitud: "fecha_solicitud";
    readonly fecha_respuesta: "fecha_respuesta";
};
export type Solicitudes_informacionScalarFieldEnum = (typeof Solicitudes_informacionScalarFieldEnum)[keyof typeof Solicitudes_informacionScalarFieldEnum];
export declare const Solicitudes_prorrogaScalarFieldEnum: {
    readonly id_prorroga: "id_prorroga";
    readonly id_incidencia: "id_incidencia";
    readonly motivo: "motivo";
    readonly nueva_fecha_propuesta: "nueva_fecha_propuesta";
    readonly estado_solicitud: "estado_solicitud";
    readonly fecha_solicitud: "fecha_solicitud";
};
export type Solicitudes_prorrogaScalarFieldEnum = (typeof Solicitudes_prorrogaScalarFieldEnum)[keyof typeof Solicitudes_prorrogaScalarFieldEnum];
export declare const UsuariosScalarFieldEnum: {
    readonly id_usuario: "id_usuario";
    readonly codigo_usuario: "codigo_usuario";
    readonly nombre: "nombre";
    readonly cargo: "cargo";
    readonly correo: "correo";
    readonly password_hash: "password_hash";
    readonly telefono: "telefono";
    readonly estado: "estado";
    readonly fecha_ingreso: "fecha_ingreso";
    readonly foto_url: "foto_url";
    readonly ultimo_acceso: "ultimo_acceso";
    readonly es_responsable: "es_responsable";
    readonly puede_reabrir_casos: "puede_reabrir_casos";
    readonly puede_rechazar_reportes: "puede_rechazar_reportes";
    readonly id_area: "id_area";
    readonly id_rol: "id_rol";
};
export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map