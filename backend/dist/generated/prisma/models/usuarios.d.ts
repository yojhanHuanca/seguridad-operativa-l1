import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model usuarios
 *
 */
export type usuariosModel = runtime.Types.Result.DefaultSelection<Prisma.$usuariosPayload>;
export type AggregateUsuarios = {
    _count: UsuariosCountAggregateOutputType | null;
    _avg: UsuariosAvgAggregateOutputType | null;
    _sum: UsuariosSumAggregateOutputType | null;
    _min: UsuariosMinAggregateOutputType | null;
    _max: UsuariosMaxAggregateOutputType | null;
};
export type UsuariosAvgAggregateOutputType = {
    id_usuario: number | null;
    id_area: number | null;
    id_rol: number | null;
};
export type UsuariosSumAggregateOutputType = {
    id_usuario: number | null;
    id_area: number | null;
    id_rol: number | null;
};
export type UsuariosMinAggregateOutputType = {
    id_usuario: number | null;
    codigo_usuario: string | null;
    nombre: string | null;
    cargo: string | null;
    correo: string | null;
    password_hash: string | null;
    telefono: string | null;
    estado: string | null;
    fecha_ingreso: Date | null;
    foto_url: string | null;
    ultimo_acceso: Date | null;
    es_responsable: boolean | null;
    puede_reabrir_casos: boolean | null;
    puede_rechazar_reportes: boolean | null;
    id_area: number | null;
    id_rol: number | null;
};
export type UsuariosMaxAggregateOutputType = {
    id_usuario: number | null;
    codigo_usuario: string | null;
    nombre: string | null;
    cargo: string | null;
    correo: string | null;
    password_hash: string | null;
    telefono: string | null;
    estado: string | null;
    fecha_ingreso: Date | null;
    foto_url: string | null;
    ultimo_acceso: Date | null;
    es_responsable: boolean | null;
    puede_reabrir_casos: boolean | null;
    puede_rechazar_reportes: boolean | null;
    id_area: number | null;
    id_rol: number | null;
};
export type UsuariosCountAggregateOutputType = {
    id_usuario: number;
    codigo_usuario: number;
    nombre: number;
    cargo: number;
    correo: number;
    password_hash: number;
    telefono: number;
    estado: number;
    fecha_ingreso: number;
    foto_url: number;
    ultimo_acceso: number;
    es_responsable: number;
    puede_reabrir_casos: number;
    puede_rechazar_reportes: number;
    id_area: number;
    id_rol: number;
    _all: number;
};
export type UsuariosAvgAggregateInputType = {
    id_usuario?: true;
    id_area?: true;
    id_rol?: true;
};
export type UsuariosSumAggregateInputType = {
    id_usuario?: true;
    id_area?: true;
    id_rol?: true;
};
export type UsuariosMinAggregateInputType = {
    id_usuario?: true;
    codigo_usuario?: true;
    nombre?: true;
    cargo?: true;
    correo?: true;
    password_hash?: true;
    telefono?: true;
    estado?: true;
    fecha_ingreso?: true;
    foto_url?: true;
    ultimo_acceso?: true;
    es_responsable?: true;
    puede_reabrir_casos?: true;
    puede_rechazar_reportes?: true;
    id_area?: true;
    id_rol?: true;
};
export type UsuariosMaxAggregateInputType = {
    id_usuario?: true;
    codigo_usuario?: true;
    nombre?: true;
    cargo?: true;
    correo?: true;
    password_hash?: true;
    telefono?: true;
    estado?: true;
    fecha_ingreso?: true;
    foto_url?: true;
    ultimo_acceso?: true;
    es_responsable?: true;
    puede_reabrir_casos?: true;
    puede_rechazar_reportes?: true;
    id_area?: true;
    id_rol?: true;
};
export type UsuariosCountAggregateInputType = {
    id_usuario?: true;
    codigo_usuario?: true;
    nombre?: true;
    cargo?: true;
    correo?: true;
    password_hash?: true;
    telefono?: true;
    estado?: true;
    fecha_ingreso?: true;
    foto_url?: true;
    ultimo_acceso?: true;
    es_responsable?: true;
    puede_reabrir_casos?: true;
    puede_rechazar_reportes?: true;
    id_area?: true;
    id_rol?: true;
    _all?: true;
};
export type UsuariosAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to aggregate.
     */
    where?: Prisma.usuariosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of usuarios to fetch.
     */
    orderBy?: Prisma.usuariosOrderByWithRelationInput | Prisma.usuariosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.usuariosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned usuarios
    **/
    _count?: true | UsuariosCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UsuariosAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UsuariosSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UsuariosMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UsuariosMaxAggregateInputType;
};
export type GetUsuariosAggregateType<T extends UsuariosAggregateArgs> = {
    [P in keyof T & keyof AggregateUsuarios]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUsuarios[P]> : Prisma.GetScalarType<T[P], AggregateUsuarios[P]>;
};
export type usuariosGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuariosWhereInput;
    orderBy?: Prisma.usuariosOrderByWithAggregationInput | Prisma.usuariosOrderByWithAggregationInput[];
    by: Prisma.UsuariosScalarFieldEnum[] | Prisma.UsuariosScalarFieldEnum;
    having?: Prisma.usuariosScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UsuariosCountAggregateInputType | true;
    _avg?: UsuariosAvgAggregateInputType;
    _sum?: UsuariosSumAggregateInputType;
    _min?: UsuariosMinAggregateInputType;
    _max?: UsuariosMaxAggregateInputType;
};
export type UsuariosGroupByOutputType = {
    id_usuario: number;
    codigo_usuario: string;
    nombre: string;
    cargo: string | null;
    correo: string;
    password_hash: string | null;
    telefono: string | null;
    estado: string | null;
    fecha_ingreso: Date | null;
    foto_url: string | null;
    ultimo_acceso: Date | null;
    es_responsable: boolean;
    puede_reabrir_casos: boolean;
    puede_rechazar_reportes: boolean;
    id_area: number | null;
    id_rol: number | null;
    _count: UsuariosCountAggregateOutputType | null;
    _avg: UsuariosAvgAggregateOutputType | null;
    _sum: UsuariosSumAggregateOutputType | null;
    _min: UsuariosMinAggregateOutputType | null;
    _max: UsuariosMaxAggregateOutputType | null;
};
type GetUsuariosGroupByPayload<T extends usuariosGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UsuariosGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UsuariosGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UsuariosGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UsuariosGroupByOutputType[P]>;
}>>;
export type usuariosWhereInput = {
    AND?: Prisma.usuariosWhereInput | Prisma.usuariosWhereInput[];
    OR?: Prisma.usuariosWhereInput[];
    NOT?: Prisma.usuariosWhereInput | Prisma.usuariosWhereInput[];
    id_usuario?: Prisma.IntFilter<"usuarios"> | number;
    codigo_usuario?: Prisma.StringFilter<"usuarios"> | string;
    nombre?: Prisma.StringFilter<"usuarios"> | string;
    cargo?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    correo?: Prisma.StringFilter<"usuarios"> | string;
    password_hash?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    telefono?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    estado?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    fecha_ingreso?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    foto_url?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    ultimo_acceso?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    es_responsable?: Prisma.BoolFilter<"usuarios"> | boolean;
    puede_reabrir_casos?: Prisma.BoolFilter<"usuarios"> | boolean;
    puede_rechazar_reportes?: Prisma.BoolFilter<"usuarios"> | boolean;
    id_area?: Prisma.IntNullableFilter<"usuarios"> | number | null;
    id_rol?: Prisma.IntNullableFilter<"usuarios"> | number | null;
    actividades_plan?: Prisma.Actividades_planListRelationFilter;
    anexos_caso?: Prisma.Anexos_casoListRelationFilter;
    auditoria?: Prisma.AuditoriaListRelationFilter;
    bitacora?: Prisma.BitacoraListRelationFilter;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.Casos_sopListRelationFilter;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.Casos_sopListRelationFilter;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.Casos_sopListRelationFilter;
    evento_caso?: Prisma.Evento_casoListRelationFilter;
    eventos_operativos?: Prisma.Eventos_operativosListRelationFilter;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.Eventos_monitoreoListRelationFilter;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.Eventos_monitoreoListRelationFilter;
    evidencias_evento?: Prisma.Evidencias_eventoListRelationFilter;
    incidencias?: Prisma.IncidenciasListRelationFilter;
    investigacion_caso?: Prisma.Investigacion_casoListRelationFilter;
    investigaciones?: Prisma.InvestigacionesListRelationFilter;
    logs_sistema?: Prisma.Logs_sistemaListRelationFilter;
    notificaciones?: Prisma.NotificacionesListRelationFilter;
    planes_accion?: Prisma.Planes_accionListRelationFilter;
    reporte_estadistico?: Prisma.Reporte_estadisticoListRelationFilter;
    seguimientos?: Prisma.SeguimientosListRelationFilter;
    sesiones?: Prisma.SesionesListRelationFilter;
    areas?: Prisma.XOR<Prisma.AreasNullableScalarRelationFilter, Prisma.areasWhereInput> | null;
    roles?: Prisma.XOR<Prisma.RolesNullableScalarRelationFilter, Prisma.rolesWhereInput> | null;
};
export type usuariosOrderByWithRelationInput = {
    id_usuario?: Prisma.SortOrder;
    codigo_usuario?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    cargo?: Prisma.SortOrderInput | Prisma.SortOrder;
    correo?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrderInput | Prisma.SortOrder;
    telefono?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_ingreso?: Prisma.SortOrderInput | Prisma.SortOrder;
    foto_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    ultimo_acceso?: Prisma.SortOrderInput | Prisma.SortOrder;
    es_responsable?: Prisma.SortOrder;
    puede_reabrir_casos?: Prisma.SortOrder;
    puede_rechazar_reportes?: Prisma.SortOrder;
    id_area?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_rol?: Prisma.SortOrderInput | Prisma.SortOrder;
    actividades_plan?: Prisma.actividades_planOrderByRelationAggregateInput;
    anexos_caso?: Prisma.anexos_casoOrderByRelationAggregateInput;
    auditoria?: Prisma.auditoriaOrderByRelationAggregateInput;
    bitacora?: Prisma.bitacoraOrderByRelationAggregateInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopOrderByRelationAggregateInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopOrderByRelationAggregateInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopOrderByRelationAggregateInput;
    evento_caso?: Prisma.evento_casoOrderByRelationAggregateInput;
    eventos_operativos?: Prisma.eventos_operativosOrderByRelationAggregateInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoOrderByRelationAggregateInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoOrderByRelationAggregateInput;
    evidencias_evento?: Prisma.evidencias_eventoOrderByRelationAggregateInput;
    incidencias?: Prisma.incidenciasOrderByRelationAggregateInput;
    investigacion_caso?: Prisma.investigacion_casoOrderByRelationAggregateInput;
    investigaciones?: Prisma.investigacionesOrderByRelationAggregateInput;
    logs_sistema?: Prisma.logs_sistemaOrderByRelationAggregateInput;
    notificaciones?: Prisma.notificacionesOrderByRelationAggregateInput;
    planes_accion?: Prisma.planes_accionOrderByRelationAggregateInput;
    reporte_estadistico?: Prisma.reporte_estadisticoOrderByRelationAggregateInput;
    seguimientos?: Prisma.seguimientosOrderByRelationAggregateInput;
    sesiones?: Prisma.sesionesOrderByRelationAggregateInput;
    areas?: Prisma.areasOrderByWithRelationInput;
    roles?: Prisma.rolesOrderByWithRelationInput;
};
export type usuariosWhereUniqueInput = Prisma.AtLeast<{
    id_usuario?: number;
    codigo_usuario?: string;
    correo?: string;
    AND?: Prisma.usuariosWhereInput | Prisma.usuariosWhereInput[];
    OR?: Prisma.usuariosWhereInput[];
    NOT?: Prisma.usuariosWhereInput | Prisma.usuariosWhereInput[];
    nombre?: Prisma.StringFilter<"usuarios"> | string;
    cargo?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    password_hash?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    telefono?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    estado?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    fecha_ingreso?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    foto_url?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    ultimo_acceso?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    es_responsable?: Prisma.BoolFilter<"usuarios"> | boolean;
    puede_reabrir_casos?: Prisma.BoolFilter<"usuarios"> | boolean;
    puede_rechazar_reportes?: Prisma.BoolFilter<"usuarios"> | boolean;
    id_area?: Prisma.IntNullableFilter<"usuarios"> | number | null;
    id_rol?: Prisma.IntNullableFilter<"usuarios"> | number | null;
    actividades_plan?: Prisma.Actividades_planListRelationFilter;
    anexos_caso?: Prisma.Anexos_casoListRelationFilter;
    auditoria?: Prisma.AuditoriaListRelationFilter;
    bitacora?: Prisma.BitacoraListRelationFilter;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.Casos_sopListRelationFilter;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.Casos_sopListRelationFilter;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.Casos_sopListRelationFilter;
    evento_caso?: Prisma.Evento_casoListRelationFilter;
    eventos_operativos?: Prisma.Eventos_operativosListRelationFilter;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.Eventos_monitoreoListRelationFilter;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.Eventos_monitoreoListRelationFilter;
    evidencias_evento?: Prisma.Evidencias_eventoListRelationFilter;
    incidencias?: Prisma.IncidenciasListRelationFilter;
    investigacion_caso?: Prisma.Investigacion_casoListRelationFilter;
    investigaciones?: Prisma.InvestigacionesListRelationFilter;
    logs_sistema?: Prisma.Logs_sistemaListRelationFilter;
    notificaciones?: Prisma.NotificacionesListRelationFilter;
    planes_accion?: Prisma.Planes_accionListRelationFilter;
    reporte_estadistico?: Prisma.Reporte_estadisticoListRelationFilter;
    seguimientos?: Prisma.SeguimientosListRelationFilter;
    sesiones?: Prisma.SesionesListRelationFilter;
    areas?: Prisma.XOR<Prisma.AreasNullableScalarRelationFilter, Prisma.areasWhereInput> | null;
    roles?: Prisma.XOR<Prisma.RolesNullableScalarRelationFilter, Prisma.rolesWhereInput> | null;
}, "id_usuario" | "codigo_usuario" | "correo">;
export type usuariosOrderByWithAggregationInput = {
    id_usuario?: Prisma.SortOrder;
    codigo_usuario?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    cargo?: Prisma.SortOrderInput | Prisma.SortOrder;
    correo?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrderInput | Prisma.SortOrder;
    telefono?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_ingreso?: Prisma.SortOrderInput | Prisma.SortOrder;
    foto_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    ultimo_acceso?: Prisma.SortOrderInput | Prisma.SortOrder;
    es_responsable?: Prisma.SortOrder;
    puede_reabrir_casos?: Prisma.SortOrder;
    puede_rechazar_reportes?: Prisma.SortOrder;
    id_area?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_rol?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.usuariosCountOrderByAggregateInput;
    _avg?: Prisma.usuariosAvgOrderByAggregateInput;
    _max?: Prisma.usuariosMaxOrderByAggregateInput;
    _min?: Prisma.usuariosMinOrderByAggregateInput;
    _sum?: Prisma.usuariosSumOrderByAggregateInput;
};
export type usuariosScalarWhereWithAggregatesInput = {
    AND?: Prisma.usuariosScalarWhereWithAggregatesInput | Prisma.usuariosScalarWhereWithAggregatesInput[];
    OR?: Prisma.usuariosScalarWhereWithAggregatesInput[];
    NOT?: Prisma.usuariosScalarWhereWithAggregatesInput | Prisma.usuariosScalarWhereWithAggregatesInput[];
    id_usuario?: Prisma.IntWithAggregatesFilter<"usuarios"> | number;
    codigo_usuario?: Prisma.StringWithAggregatesFilter<"usuarios"> | string;
    nombre?: Prisma.StringWithAggregatesFilter<"usuarios"> | string;
    cargo?: Prisma.StringNullableWithAggregatesFilter<"usuarios"> | string | null;
    correo?: Prisma.StringWithAggregatesFilter<"usuarios"> | string;
    password_hash?: Prisma.StringNullableWithAggregatesFilter<"usuarios"> | string | null;
    telefono?: Prisma.StringNullableWithAggregatesFilter<"usuarios"> | string | null;
    estado?: Prisma.StringNullableWithAggregatesFilter<"usuarios"> | string | null;
    fecha_ingreso?: Prisma.DateTimeNullableWithAggregatesFilter<"usuarios"> | Date | string | null;
    foto_url?: Prisma.StringNullableWithAggregatesFilter<"usuarios"> | string | null;
    ultimo_acceso?: Prisma.DateTimeNullableWithAggregatesFilter<"usuarios"> | Date | string | null;
    es_responsable?: Prisma.BoolWithAggregatesFilter<"usuarios"> | boolean;
    puede_reabrir_casos?: Prisma.BoolWithAggregatesFilter<"usuarios"> | boolean;
    puede_rechazar_reportes?: Prisma.BoolWithAggregatesFilter<"usuarios"> | boolean;
    id_area?: Prisma.IntNullableWithAggregatesFilter<"usuarios"> | number | null;
    id_rol?: Prisma.IntNullableWithAggregatesFilter<"usuarios"> | number | null;
};
export type usuariosCreateInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosUpdateInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateManyInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
};
export type usuariosUpdateManyMutationInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type usuariosUncheckedUpdateManyInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type UsuariosNullableScalarRelationFilter = {
    is?: Prisma.usuariosWhereInput | null;
    isNot?: Prisma.usuariosWhereInput | null;
};
export type UsuariosListRelationFilter = {
    every?: Prisma.usuariosWhereInput;
    some?: Prisma.usuariosWhereInput;
    none?: Prisma.usuariosWhereInput;
};
export type usuariosOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UsuariosScalarRelationFilter = {
    is?: Prisma.usuariosWhereInput;
    isNot?: Prisma.usuariosWhereInput;
};
export type usuariosCountOrderByAggregateInput = {
    id_usuario?: Prisma.SortOrder;
    codigo_usuario?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    correo?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrder;
    telefono?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_ingreso?: Prisma.SortOrder;
    foto_url?: Prisma.SortOrder;
    ultimo_acceso?: Prisma.SortOrder;
    es_responsable?: Prisma.SortOrder;
    puede_reabrir_casos?: Prisma.SortOrder;
    puede_rechazar_reportes?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    id_rol?: Prisma.SortOrder;
};
export type usuariosAvgOrderByAggregateInput = {
    id_usuario?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    id_rol?: Prisma.SortOrder;
};
export type usuariosMaxOrderByAggregateInput = {
    id_usuario?: Prisma.SortOrder;
    codigo_usuario?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    correo?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrder;
    telefono?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_ingreso?: Prisma.SortOrder;
    foto_url?: Prisma.SortOrder;
    ultimo_acceso?: Prisma.SortOrder;
    es_responsable?: Prisma.SortOrder;
    puede_reabrir_casos?: Prisma.SortOrder;
    puede_rechazar_reportes?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    id_rol?: Prisma.SortOrder;
};
export type usuariosMinOrderByAggregateInput = {
    id_usuario?: Prisma.SortOrder;
    codigo_usuario?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    correo?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrder;
    telefono?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_ingreso?: Prisma.SortOrder;
    foto_url?: Prisma.SortOrder;
    ultimo_acceso?: Prisma.SortOrder;
    es_responsable?: Prisma.SortOrder;
    puede_reabrir_casos?: Prisma.SortOrder;
    puede_rechazar_reportes?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    id_rol?: Prisma.SortOrder;
};
export type usuariosSumOrderByAggregateInput = {
    id_usuario?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    id_rol?: Prisma.SortOrder;
};
export type usuariosCreateNestedOneWithoutActividades_planInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutActividades_planInput, Prisma.usuariosUncheckedCreateWithoutActividades_planInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutActividades_planInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutActividades_planNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutActividades_planInput, Prisma.usuariosUncheckedCreateWithoutActividades_planInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutActividades_planInput;
    upsert?: Prisma.usuariosUpsertWithoutActividades_planInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutActividades_planInput, Prisma.usuariosUpdateWithoutActividades_planInput>, Prisma.usuariosUncheckedUpdateWithoutActividades_planInput>;
};
export type usuariosCreateNestedOneWithoutAnexos_casoInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAnexos_casoInput, Prisma.usuariosUncheckedCreateWithoutAnexos_casoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAnexos_casoInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutAnexos_casoNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAnexos_casoInput, Prisma.usuariosUncheckedCreateWithoutAnexos_casoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAnexos_casoInput;
    upsert?: Prisma.usuariosUpsertWithoutAnexos_casoInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutAnexos_casoInput, Prisma.usuariosUpdateWithoutAnexos_casoInput>, Prisma.usuariosUncheckedUpdateWithoutAnexos_casoInput>;
};
export type usuariosCreateNestedManyWithoutAreasInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAreasInput, Prisma.usuariosUncheckedCreateWithoutAreasInput> | Prisma.usuariosCreateWithoutAreasInput[] | Prisma.usuariosUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAreasInput | Prisma.usuariosCreateOrConnectWithoutAreasInput[];
    createMany?: Prisma.usuariosCreateManyAreasInputEnvelope;
    connect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
};
export type usuariosUncheckedCreateNestedManyWithoutAreasInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAreasInput, Prisma.usuariosUncheckedCreateWithoutAreasInput> | Prisma.usuariosCreateWithoutAreasInput[] | Prisma.usuariosUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAreasInput | Prisma.usuariosCreateOrConnectWithoutAreasInput[];
    createMany?: Prisma.usuariosCreateManyAreasInputEnvelope;
    connect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
};
export type usuariosUpdateManyWithoutAreasNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAreasInput, Prisma.usuariosUncheckedCreateWithoutAreasInput> | Prisma.usuariosCreateWithoutAreasInput[] | Prisma.usuariosUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAreasInput | Prisma.usuariosCreateOrConnectWithoutAreasInput[];
    upsert?: Prisma.usuariosUpsertWithWhereUniqueWithoutAreasInput | Prisma.usuariosUpsertWithWhereUniqueWithoutAreasInput[];
    createMany?: Prisma.usuariosCreateManyAreasInputEnvelope;
    set?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    disconnect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    delete?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    connect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    update?: Prisma.usuariosUpdateWithWhereUniqueWithoutAreasInput | Prisma.usuariosUpdateWithWhereUniqueWithoutAreasInput[];
    updateMany?: Prisma.usuariosUpdateManyWithWhereWithoutAreasInput | Prisma.usuariosUpdateManyWithWhereWithoutAreasInput[];
    deleteMany?: Prisma.usuariosScalarWhereInput | Prisma.usuariosScalarWhereInput[];
};
export type usuariosUncheckedUpdateManyWithoutAreasNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAreasInput, Prisma.usuariosUncheckedCreateWithoutAreasInput> | Prisma.usuariosCreateWithoutAreasInput[] | Prisma.usuariosUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAreasInput | Prisma.usuariosCreateOrConnectWithoutAreasInput[];
    upsert?: Prisma.usuariosUpsertWithWhereUniqueWithoutAreasInput | Prisma.usuariosUpsertWithWhereUniqueWithoutAreasInput[];
    createMany?: Prisma.usuariosCreateManyAreasInputEnvelope;
    set?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    disconnect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    delete?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    connect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    update?: Prisma.usuariosUpdateWithWhereUniqueWithoutAreasInput | Prisma.usuariosUpdateWithWhereUniqueWithoutAreasInput[];
    updateMany?: Prisma.usuariosUpdateManyWithWhereWithoutAreasInput | Prisma.usuariosUpdateManyWithWhereWithoutAreasInput[];
    deleteMany?: Prisma.usuariosScalarWhereInput | Prisma.usuariosScalarWhereInput[];
};
export type usuariosCreateNestedOneWithoutAuditoriaInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAuditoriaInput, Prisma.usuariosUncheckedCreateWithoutAuditoriaInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAuditoriaInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneRequiredWithoutAuditoriaNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAuditoriaInput, Prisma.usuariosUncheckedCreateWithoutAuditoriaInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAuditoriaInput;
    upsert?: Prisma.usuariosUpsertWithoutAuditoriaInput;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutAuditoriaInput, Prisma.usuariosUpdateWithoutAuditoriaInput>, Prisma.usuariosUncheckedUpdateWithoutAuditoriaInput>;
};
export type usuariosCreateNestedOneWithoutBitacoraInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutBitacoraInput, Prisma.usuariosUncheckedCreateWithoutBitacoraInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutBitacoraInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneRequiredWithoutBitacoraNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutBitacoraInput, Prisma.usuariosUncheckedCreateWithoutBitacoraInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutBitacoraInput;
    upsert?: Prisma.usuariosUpsertWithoutBitacoraInput;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutBitacoraInput, Prisma.usuariosUpdateWithoutBitacoraInput>, Prisma.usuariosUncheckedUpdateWithoutBitacoraInput>;
};
export type usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    upsert?: Prisma.usuariosUpsertWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutCasos_sop_casos_sop_created_byTousuariosInput, Prisma.usuariosUpdateWithoutCasos_sop_casos_sop_created_byTousuariosInput>, Prisma.usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_created_byTousuariosInput>;
};
export type usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    upsert?: Prisma.usuariosUpsertWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput, Prisma.usuariosUpdateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput>, Prisma.usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput>;
};
export type usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    upsert?: Prisma.usuariosUpsertWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutCasos_sop_casos_sop_responsable_planTousuariosInput, Prisma.usuariosUpdateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput>, Prisma.usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput>;
};
export type usuariosCreateNestedOneWithoutEvento_casoInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEvento_casoInput, Prisma.usuariosUncheckedCreateWithoutEvento_casoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEvento_casoInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutEvento_casoNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEvento_casoInput, Prisma.usuariosUncheckedCreateWithoutEvento_casoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEvento_casoInput;
    upsert?: Prisma.usuariosUpsertWithoutEvento_casoInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutEvento_casoInput, Prisma.usuariosUpdateWithoutEvento_casoInput>, Prisma.usuariosUncheckedUpdateWithoutEvento_casoInput>;
};
export type usuariosCreateNestedOneWithoutEventos_operativosInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_operativosInput, Prisma.usuariosUncheckedCreateWithoutEventos_operativosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEventos_operativosInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutEventos_operativosNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_operativosInput, Prisma.usuariosUncheckedCreateWithoutEventos_operativosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEventos_operativosInput;
    upsert?: Prisma.usuariosUpsertWithoutEventos_operativosInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutEventos_operativosInput, Prisma.usuariosUpdateWithoutEventos_operativosInput>, Prisma.usuariosUncheckedUpdateWithoutEventos_operativosInput>;
};
export type usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput, Prisma.usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    upsert?: Prisma.usuariosUpsertWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.usuariosUpdateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput>, Prisma.usuariosUncheckedUpdateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput>;
};
export type usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput, Prisma.usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    upsert?: Prisma.usuariosUpsertWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput, Prisma.usuariosUpdateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput>, Prisma.usuariosUncheckedUpdateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput>;
};
export type usuariosCreateNestedOneWithoutEvidencias_eventoInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEvidencias_eventoInput, Prisma.usuariosUncheckedCreateWithoutEvidencias_eventoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEvidencias_eventoInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutEvidencias_eventoNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutEvidencias_eventoInput, Prisma.usuariosUncheckedCreateWithoutEvidencias_eventoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutEvidencias_eventoInput;
    upsert?: Prisma.usuariosUpsertWithoutEvidencias_eventoInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutEvidencias_eventoInput, Prisma.usuariosUpdateWithoutEvidencias_eventoInput>, Prisma.usuariosUncheckedUpdateWithoutEvidencias_eventoInput>;
};
export type usuariosCreateNestedOneWithoutIncidenciasInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutIncidenciasInput, Prisma.usuariosUncheckedCreateWithoutIncidenciasInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutIncidenciasInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutIncidenciasNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutIncidenciasInput, Prisma.usuariosUncheckedCreateWithoutIncidenciasInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutIncidenciasInput;
    upsert?: Prisma.usuariosUpsertWithoutIncidenciasInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutIncidenciasInput, Prisma.usuariosUpdateWithoutIncidenciasInput>, Prisma.usuariosUncheckedUpdateWithoutIncidenciasInput>;
};
export type usuariosCreateNestedOneWithoutInvestigacion_casoInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutInvestigacion_casoInput, Prisma.usuariosUncheckedCreateWithoutInvestigacion_casoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutInvestigacion_casoInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutInvestigacion_casoNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutInvestigacion_casoInput, Prisma.usuariosUncheckedCreateWithoutInvestigacion_casoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutInvestigacion_casoInput;
    upsert?: Prisma.usuariosUpsertWithoutInvestigacion_casoInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutInvestigacion_casoInput, Prisma.usuariosUpdateWithoutInvestigacion_casoInput>, Prisma.usuariosUncheckedUpdateWithoutInvestigacion_casoInput>;
};
export type usuariosCreateNestedOneWithoutInvestigacionesInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutInvestigacionesInput, Prisma.usuariosUncheckedCreateWithoutInvestigacionesInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutInvestigacionesInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutInvestigacionesNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutInvestigacionesInput, Prisma.usuariosUncheckedCreateWithoutInvestigacionesInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutInvestigacionesInput;
    upsert?: Prisma.usuariosUpsertWithoutInvestigacionesInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutInvestigacionesInput, Prisma.usuariosUpdateWithoutInvestigacionesInput>, Prisma.usuariosUncheckedUpdateWithoutInvestigacionesInput>;
};
export type usuariosCreateNestedOneWithoutLogs_sistemaInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutLogs_sistemaInput, Prisma.usuariosUncheckedCreateWithoutLogs_sistemaInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutLogs_sistemaInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutLogs_sistemaNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutLogs_sistemaInput, Prisma.usuariosUncheckedCreateWithoutLogs_sistemaInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutLogs_sistemaInput;
    upsert?: Prisma.usuariosUpsertWithoutLogs_sistemaInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutLogs_sistemaInput, Prisma.usuariosUpdateWithoutLogs_sistemaInput>, Prisma.usuariosUncheckedUpdateWithoutLogs_sistemaInput>;
};
export type usuariosCreateNestedOneWithoutNotificacionesInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutNotificacionesInput, Prisma.usuariosUncheckedCreateWithoutNotificacionesInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutNotificacionesInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneRequiredWithoutNotificacionesNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutNotificacionesInput, Prisma.usuariosUncheckedCreateWithoutNotificacionesInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutNotificacionesInput;
    upsert?: Prisma.usuariosUpsertWithoutNotificacionesInput;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutNotificacionesInput, Prisma.usuariosUpdateWithoutNotificacionesInput>, Prisma.usuariosUncheckedUpdateWithoutNotificacionesInput>;
};
export type usuariosCreateNestedOneWithoutPlanes_accionInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutPlanes_accionInput, Prisma.usuariosUncheckedCreateWithoutPlanes_accionInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutPlanes_accionInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneRequiredWithoutPlanes_accionNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutPlanes_accionInput, Prisma.usuariosUncheckedCreateWithoutPlanes_accionInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutPlanes_accionInput;
    upsert?: Prisma.usuariosUpsertWithoutPlanes_accionInput;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutPlanes_accionInput, Prisma.usuariosUpdateWithoutPlanes_accionInput>, Prisma.usuariosUncheckedUpdateWithoutPlanes_accionInput>;
};
export type usuariosCreateNestedOneWithoutReporte_estadisticoInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutReporte_estadisticoInput, Prisma.usuariosUncheckedCreateWithoutReporte_estadisticoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutReporte_estadisticoInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutReporte_estadisticoNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutReporte_estadisticoInput, Prisma.usuariosUncheckedCreateWithoutReporte_estadisticoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutReporte_estadisticoInput;
    upsert?: Prisma.usuariosUpsertWithoutReporte_estadisticoInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutReporte_estadisticoInput, Prisma.usuariosUpdateWithoutReporte_estadisticoInput>, Prisma.usuariosUncheckedUpdateWithoutReporte_estadisticoInput>;
};
export type usuariosCreateNestedManyWithoutRolesInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutRolesInput, Prisma.usuariosUncheckedCreateWithoutRolesInput> | Prisma.usuariosCreateWithoutRolesInput[] | Prisma.usuariosUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutRolesInput | Prisma.usuariosCreateOrConnectWithoutRolesInput[];
    createMany?: Prisma.usuariosCreateManyRolesInputEnvelope;
    connect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
};
export type usuariosUncheckedCreateNestedManyWithoutRolesInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutRolesInput, Prisma.usuariosUncheckedCreateWithoutRolesInput> | Prisma.usuariosCreateWithoutRolesInput[] | Prisma.usuariosUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutRolesInput | Prisma.usuariosCreateOrConnectWithoutRolesInput[];
    createMany?: Prisma.usuariosCreateManyRolesInputEnvelope;
    connect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
};
export type usuariosUpdateManyWithoutRolesNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutRolesInput, Prisma.usuariosUncheckedCreateWithoutRolesInput> | Prisma.usuariosCreateWithoutRolesInput[] | Prisma.usuariosUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutRolesInput | Prisma.usuariosCreateOrConnectWithoutRolesInput[];
    upsert?: Prisma.usuariosUpsertWithWhereUniqueWithoutRolesInput | Prisma.usuariosUpsertWithWhereUniqueWithoutRolesInput[];
    createMany?: Prisma.usuariosCreateManyRolesInputEnvelope;
    set?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    disconnect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    delete?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    connect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    update?: Prisma.usuariosUpdateWithWhereUniqueWithoutRolesInput | Prisma.usuariosUpdateWithWhereUniqueWithoutRolesInput[];
    updateMany?: Prisma.usuariosUpdateManyWithWhereWithoutRolesInput | Prisma.usuariosUpdateManyWithWhereWithoutRolesInput[];
    deleteMany?: Prisma.usuariosScalarWhereInput | Prisma.usuariosScalarWhereInput[];
};
export type usuariosUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutRolesInput, Prisma.usuariosUncheckedCreateWithoutRolesInput> | Prisma.usuariosCreateWithoutRolesInput[] | Prisma.usuariosUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutRolesInput | Prisma.usuariosCreateOrConnectWithoutRolesInput[];
    upsert?: Prisma.usuariosUpsertWithWhereUniqueWithoutRolesInput | Prisma.usuariosUpsertWithWhereUniqueWithoutRolesInput[];
    createMany?: Prisma.usuariosCreateManyRolesInputEnvelope;
    set?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    disconnect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    delete?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    connect?: Prisma.usuariosWhereUniqueInput | Prisma.usuariosWhereUniqueInput[];
    update?: Prisma.usuariosUpdateWithWhereUniqueWithoutRolesInput | Prisma.usuariosUpdateWithWhereUniqueWithoutRolesInput[];
    updateMany?: Prisma.usuariosUpdateManyWithWhereWithoutRolesInput | Prisma.usuariosUpdateManyWithWhereWithoutRolesInput[];
    deleteMany?: Prisma.usuariosScalarWhereInput | Prisma.usuariosScalarWhereInput[];
};
export type usuariosCreateNestedOneWithoutSeguimientosInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutSeguimientosInput, Prisma.usuariosUncheckedCreateWithoutSeguimientosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutSeguimientosInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutSeguimientosNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutSeguimientosInput, Prisma.usuariosUncheckedCreateWithoutSeguimientosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutSeguimientosInput;
    upsert?: Prisma.usuariosUpsertWithoutSeguimientosInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutSeguimientosInput, Prisma.usuariosUpdateWithoutSeguimientosInput>, Prisma.usuariosUncheckedUpdateWithoutSeguimientosInput>;
};
export type usuariosCreateNestedOneWithoutSesionesInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutSesionesInput, Prisma.usuariosUncheckedCreateWithoutSesionesInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutSesionesInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneRequiredWithoutSesionesNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutSesionesInput, Prisma.usuariosUncheckedCreateWithoutSesionesInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutSesionesInput;
    upsert?: Prisma.usuariosUpsertWithoutSesionesInput;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutSesionesInput, Prisma.usuariosUpdateWithoutSesionesInput>, Prisma.usuariosUncheckedUpdateWithoutSesionesInput>;
};
export type usuariosCreateWithoutActividades_planInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutActividades_planInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutActividades_planInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutActividades_planInput, Prisma.usuariosUncheckedCreateWithoutActividades_planInput>;
};
export type usuariosUpsertWithoutActividades_planInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutActividades_planInput, Prisma.usuariosUncheckedUpdateWithoutActividades_planInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutActividades_planInput, Prisma.usuariosUncheckedCreateWithoutActividades_planInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutActividades_planInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutActividades_planInput, Prisma.usuariosUncheckedUpdateWithoutActividades_planInput>;
};
export type usuariosUpdateWithoutActividades_planInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutActividades_planInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutAnexos_casoInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutAnexos_casoInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutAnexos_casoInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutAnexos_casoInput, Prisma.usuariosUncheckedCreateWithoutAnexos_casoInput>;
};
export type usuariosUpsertWithoutAnexos_casoInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutAnexos_casoInput, Prisma.usuariosUncheckedUpdateWithoutAnexos_casoInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutAnexos_casoInput, Prisma.usuariosUncheckedCreateWithoutAnexos_casoInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutAnexos_casoInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutAnexos_casoInput, Prisma.usuariosUncheckedUpdateWithoutAnexos_casoInput>;
};
export type usuariosUpdateWithoutAnexos_casoInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutAnexos_casoInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutAreasInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutAreasInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutAreasInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutAreasInput, Prisma.usuariosUncheckedCreateWithoutAreasInput>;
};
export type usuariosCreateManyAreasInputEnvelope = {
    data: Prisma.usuariosCreateManyAreasInput | Prisma.usuariosCreateManyAreasInput[];
    skipDuplicates?: boolean;
};
export type usuariosUpsertWithWhereUniqueWithoutAreasInput = {
    where: Prisma.usuariosWhereUniqueInput;
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutAreasInput, Prisma.usuariosUncheckedUpdateWithoutAreasInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutAreasInput, Prisma.usuariosUncheckedCreateWithoutAreasInput>;
};
export type usuariosUpdateWithWhereUniqueWithoutAreasInput = {
    where: Prisma.usuariosWhereUniqueInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutAreasInput, Prisma.usuariosUncheckedUpdateWithoutAreasInput>;
};
export type usuariosUpdateManyWithWhereWithoutAreasInput = {
    where: Prisma.usuariosScalarWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateManyMutationInput, Prisma.usuariosUncheckedUpdateManyWithoutAreasInput>;
};
export type usuariosScalarWhereInput = {
    AND?: Prisma.usuariosScalarWhereInput | Prisma.usuariosScalarWhereInput[];
    OR?: Prisma.usuariosScalarWhereInput[];
    NOT?: Prisma.usuariosScalarWhereInput | Prisma.usuariosScalarWhereInput[];
    id_usuario?: Prisma.IntFilter<"usuarios"> | number;
    codigo_usuario?: Prisma.StringFilter<"usuarios"> | string;
    nombre?: Prisma.StringFilter<"usuarios"> | string;
    cargo?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    correo?: Prisma.StringFilter<"usuarios"> | string;
    password_hash?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    telefono?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    estado?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    fecha_ingreso?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    foto_url?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    ultimo_acceso?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    es_responsable?: Prisma.BoolFilter<"usuarios"> | boolean;
    puede_reabrir_casos?: Prisma.BoolFilter<"usuarios"> | boolean;
    puede_rechazar_reportes?: Prisma.BoolFilter<"usuarios"> | boolean;
    id_area?: Prisma.IntNullableFilter<"usuarios"> | number | null;
    id_rol?: Prisma.IntNullableFilter<"usuarios"> | number | null;
};
export type usuariosCreateWithoutAuditoriaInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutAuditoriaInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutAuditoriaInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutAuditoriaInput, Prisma.usuariosUncheckedCreateWithoutAuditoriaInput>;
};
export type usuariosUpsertWithoutAuditoriaInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutAuditoriaInput, Prisma.usuariosUncheckedUpdateWithoutAuditoriaInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutAuditoriaInput, Prisma.usuariosUncheckedCreateWithoutAuditoriaInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutAuditoriaInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutAuditoriaInput, Prisma.usuariosUncheckedUpdateWithoutAuditoriaInput>;
};
export type usuariosUpdateWithoutAuditoriaInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutAuditoriaInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutBitacoraInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutBitacoraInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutBitacoraInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutBitacoraInput, Prisma.usuariosUncheckedCreateWithoutBitacoraInput>;
};
export type usuariosUpsertWithoutBitacoraInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutBitacoraInput, Prisma.usuariosUncheckedUpdateWithoutBitacoraInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutBitacoraInput, Prisma.usuariosUncheckedCreateWithoutBitacoraInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutBitacoraInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutBitacoraInput, Prisma.usuariosUncheckedUpdateWithoutBitacoraInput>;
};
export type usuariosUpdateWithoutBitacoraInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutBitacoraInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutCasos_sop_casos_sop_created_byTousuariosInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput>;
};
export type usuariosCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput>;
};
export type usuariosCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutCasos_sop_casos_sop_responsable_planTousuariosInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput>;
};
export type usuariosUpsertWithoutCasos_sop_casos_sop_created_byTousuariosInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutCasos_sop_casos_sop_created_byTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_created_byTousuariosInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_created_byTousuariosInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutCasos_sop_casos_sop_created_byTousuariosInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutCasos_sop_casos_sop_created_byTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_created_byTousuariosInput>;
};
export type usuariosUpdateWithoutCasos_sop_casos_sop_created_byTousuariosInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_created_byTousuariosInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUpsertWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput>;
};
export type usuariosUpdateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUpsertWithoutCasos_sop_casos_sop_responsable_planTousuariosInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput, Prisma.usuariosUncheckedCreateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutCasos_sop_casos_sop_responsable_planTousuariosInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput>;
};
export type usuariosUpdateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutCasos_sop_casos_sop_responsable_planTousuariosInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutEvento_casoInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutEvento_casoInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutEvento_casoInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEvento_casoInput, Prisma.usuariosUncheckedCreateWithoutEvento_casoInput>;
};
export type usuariosUpsertWithoutEvento_casoInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutEvento_casoInput, Prisma.usuariosUncheckedUpdateWithoutEvento_casoInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEvento_casoInput, Prisma.usuariosUncheckedCreateWithoutEvento_casoInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutEvento_casoInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutEvento_casoInput, Prisma.usuariosUncheckedUpdateWithoutEvento_casoInput>;
};
export type usuariosUpdateWithoutEvento_casoInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutEvento_casoInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutEventos_operativosInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutEventos_operativosInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutEventos_operativosInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_operativosInput, Prisma.usuariosUncheckedCreateWithoutEventos_operativosInput>;
};
export type usuariosUpsertWithoutEventos_operativosInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutEventos_operativosInput, Prisma.usuariosUncheckedUpdateWithoutEventos_operativosInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_operativosInput, Prisma.usuariosUncheckedCreateWithoutEventos_operativosInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutEventos_operativosInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutEventos_operativosInput, Prisma.usuariosUncheckedUpdateWithoutEventos_operativosInput>;
};
export type usuariosUpdateWithoutEventos_operativosInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutEventos_operativosInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput>;
};
export type usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput, Prisma.usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput>;
};
export type usuariosUpsertWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput>;
};
export type usuariosUpdateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUpsertWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput, Prisma.usuariosUncheckedCreateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput, Prisma.usuariosUncheckedUpdateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput>;
};
export type usuariosUpdateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutEvidencias_eventoInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutEvidencias_eventoInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutEvidencias_eventoInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEvidencias_eventoInput, Prisma.usuariosUncheckedCreateWithoutEvidencias_eventoInput>;
};
export type usuariosUpsertWithoutEvidencias_eventoInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutEvidencias_eventoInput, Prisma.usuariosUncheckedUpdateWithoutEvidencias_eventoInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutEvidencias_eventoInput, Prisma.usuariosUncheckedCreateWithoutEvidencias_eventoInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutEvidencias_eventoInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutEvidencias_eventoInput, Prisma.usuariosUncheckedUpdateWithoutEvidencias_eventoInput>;
};
export type usuariosUpdateWithoutEvidencias_eventoInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutEvidencias_eventoInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutIncidenciasInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutIncidenciasInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutIncidenciasInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutIncidenciasInput, Prisma.usuariosUncheckedCreateWithoutIncidenciasInput>;
};
export type usuariosUpsertWithoutIncidenciasInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutIncidenciasInput, Prisma.usuariosUncheckedUpdateWithoutIncidenciasInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutIncidenciasInput, Prisma.usuariosUncheckedCreateWithoutIncidenciasInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutIncidenciasInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutIncidenciasInput, Prisma.usuariosUncheckedUpdateWithoutIncidenciasInput>;
};
export type usuariosUpdateWithoutIncidenciasInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutIncidenciasInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutInvestigacion_casoInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutInvestigacion_casoInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutInvestigacion_casoInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutInvestigacion_casoInput, Prisma.usuariosUncheckedCreateWithoutInvestigacion_casoInput>;
};
export type usuariosUpsertWithoutInvestigacion_casoInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutInvestigacion_casoInput, Prisma.usuariosUncheckedUpdateWithoutInvestigacion_casoInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutInvestigacion_casoInput, Prisma.usuariosUncheckedCreateWithoutInvestigacion_casoInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutInvestigacion_casoInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutInvestigacion_casoInput, Prisma.usuariosUncheckedUpdateWithoutInvestigacion_casoInput>;
};
export type usuariosUpdateWithoutInvestigacion_casoInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutInvestigacion_casoInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutInvestigacionesInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutInvestigacionesInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutInvestigacionesInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutInvestigacionesInput, Prisma.usuariosUncheckedCreateWithoutInvestigacionesInput>;
};
export type usuariosUpsertWithoutInvestigacionesInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutInvestigacionesInput, Prisma.usuariosUncheckedUpdateWithoutInvestigacionesInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutInvestigacionesInput, Prisma.usuariosUncheckedCreateWithoutInvestigacionesInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutInvestigacionesInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutInvestigacionesInput, Prisma.usuariosUncheckedUpdateWithoutInvestigacionesInput>;
};
export type usuariosUpdateWithoutInvestigacionesInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutInvestigacionesInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutLogs_sistemaInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutLogs_sistemaInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutLogs_sistemaInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutLogs_sistemaInput, Prisma.usuariosUncheckedCreateWithoutLogs_sistemaInput>;
};
export type usuariosUpsertWithoutLogs_sistemaInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutLogs_sistemaInput, Prisma.usuariosUncheckedUpdateWithoutLogs_sistemaInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutLogs_sistemaInput, Prisma.usuariosUncheckedCreateWithoutLogs_sistemaInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutLogs_sistemaInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutLogs_sistemaInput, Prisma.usuariosUncheckedUpdateWithoutLogs_sistemaInput>;
};
export type usuariosUpdateWithoutLogs_sistemaInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutLogs_sistemaInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutNotificacionesInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutNotificacionesInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutNotificacionesInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutNotificacionesInput, Prisma.usuariosUncheckedCreateWithoutNotificacionesInput>;
};
export type usuariosUpsertWithoutNotificacionesInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutNotificacionesInput, Prisma.usuariosUncheckedUpdateWithoutNotificacionesInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutNotificacionesInput, Prisma.usuariosUncheckedCreateWithoutNotificacionesInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutNotificacionesInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutNotificacionesInput, Prisma.usuariosUncheckedUpdateWithoutNotificacionesInput>;
};
export type usuariosUpdateWithoutNotificacionesInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutNotificacionesInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutPlanes_accionInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutPlanes_accionInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutPlanes_accionInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutPlanes_accionInput, Prisma.usuariosUncheckedCreateWithoutPlanes_accionInput>;
};
export type usuariosUpsertWithoutPlanes_accionInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutPlanes_accionInput, Prisma.usuariosUncheckedUpdateWithoutPlanes_accionInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutPlanes_accionInput, Prisma.usuariosUncheckedCreateWithoutPlanes_accionInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutPlanes_accionInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutPlanes_accionInput, Prisma.usuariosUncheckedUpdateWithoutPlanes_accionInput>;
};
export type usuariosUpdateWithoutPlanes_accionInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutPlanes_accionInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutReporte_estadisticoInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutReporte_estadisticoInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutReporte_estadisticoInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutReporte_estadisticoInput, Prisma.usuariosUncheckedCreateWithoutReporte_estadisticoInput>;
};
export type usuariosUpsertWithoutReporte_estadisticoInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutReporte_estadisticoInput, Prisma.usuariosUncheckedUpdateWithoutReporte_estadisticoInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutReporte_estadisticoInput, Prisma.usuariosUncheckedCreateWithoutReporte_estadisticoInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutReporte_estadisticoInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutReporte_estadisticoInput, Prisma.usuariosUncheckedUpdateWithoutReporte_estadisticoInput>;
};
export type usuariosUpdateWithoutReporte_estadisticoInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutReporte_estadisticoInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutRolesInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutRolesInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutRolesInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutRolesInput, Prisma.usuariosUncheckedCreateWithoutRolesInput>;
};
export type usuariosCreateManyRolesInputEnvelope = {
    data: Prisma.usuariosCreateManyRolesInput | Prisma.usuariosCreateManyRolesInput[];
    skipDuplicates?: boolean;
};
export type usuariosUpsertWithWhereUniqueWithoutRolesInput = {
    where: Prisma.usuariosWhereUniqueInput;
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutRolesInput, Prisma.usuariosUncheckedUpdateWithoutRolesInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutRolesInput, Prisma.usuariosUncheckedCreateWithoutRolesInput>;
};
export type usuariosUpdateWithWhereUniqueWithoutRolesInput = {
    where: Prisma.usuariosWhereUniqueInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutRolesInput, Prisma.usuariosUncheckedUpdateWithoutRolesInput>;
};
export type usuariosUpdateManyWithWhereWithoutRolesInput = {
    where: Prisma.usuariosScalarWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateManyMutationInput, Prisma.usuariosUncheckedUpdateManyWithoutRolesInput>;
};
export type usuariosCreateWithoutSeguimientosInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutSeguimientosInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    sesiones?: Prisma.sesionesUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutSeguimientosInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutSeguimientosInput, Prisma.usuariosUncheckedCreateWithoutSeguimientosInput>;
};
export type usuariosUpsertWithoutSeguimientosInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutSeguimientosInput, Prisma.usuariosUncheckedUpdateWithoutSeguimientosInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutSeguimientosInput, Prisma.usuariosUncheckedCreateWithoutSeguimientosInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutSeguimientosInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutSeguimientosInput, Prisma.usuariosUncheckedUpdateWithoutSeguimientosInput>;
};
export type usuariosUpdateWithoutSeguimientosInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutSeguimientosInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutSesionesInput = {
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutUsuariosInput;
    areas?: Prisma.areasCreateNestedOneWithoutUsuariosInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutSesionesInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
    id_rol?: number | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutUsuariosInput;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    auditoria?: Prisma.auditoriaUncheckedCreateNestedManyWithoutUsuariosInput;
    bitacora?: Prisma.bitacoraUncheckedCreateNestedManyWithoutUsuariosInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutUsuariosInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput;
    notificaciones?: Prisma.notificacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutUsuariosInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutSesionesInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutSesionesInput, Prisma.usuariosUncheckedCreateWithoutSesionesInput>;
};
export type usuariosUpsertWithoutSesionesInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutSesionesInput, Prisma.usuariosUncheckedUpdateWithoutSesionesInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutSesionesInput, Prisma.usuariosUncheckedCreateWithoutSesionesInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutSesionesInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutSesionesInput, Prisma.usuariosUncheckedUpdateWithoutSesionesInput>;
};
export type usuariosUpdateWithoutSesionesInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutSesionesInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateManyAreasInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_rol?: number | null;
};
export type usuariosUpdateWithoutAreasInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutAreasInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateManyWithoutAreasInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_rol?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type usuariosCreateManyRolesInput = {
    id_usuario?: number;
    codigo_usuario: string;
    nombre: string;
    cargo?: string | null;
    correo: string;
    password_hash?: string | null;
    telefono?: string | null;
    estado?: string | null;
    fecha_ingreso?: Date | string | null;
    foto_url?: string | null;
    ultimo_acceso?: Date | string | null;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: number | null;
};
export type usuariosUpdateWithoutRolesInput = {
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUpdateManyWithoutUsuariosNestedInput;
    areas?: Prisma.areasUpdateOneWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutRolesInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    auditoria?: Prisma.auditoriaUncheckedUpdateManyWithoutUsuariosNestedInput;
    bitacora?: Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput;
    casos_sop_casos_sop_created_byTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput;
    casos_sop_casos_sop_responsable_planTousuarios?: Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    logs_sistema?: Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput;
    notificaciones?: Prisma.notificacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput;
    reporte_estadistico?: Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput;
    sesiones?: Prisma.sesionesUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateManyWithoutRolesInput = {
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_usuario?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_ingreso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    foto_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ultimo_acceso?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    es_responsable?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_reabrir_casos?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    puede_rechazar_reportes?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_area?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
/**
 * Count Type UsuariosCountOutputType
 */
export type UsuariosCountOutputType = {
    actividades_plan: number;
    anexos_caso: number;
    auditoria: number;
    bitacora: number;
    casos_sop_casos_sop_created_byTousuarios: number;
    casos_sop_casos_sop_responsable_hallazgoTousuarios: number;
    casos_sop_casos_sop_responsable_planTousuarios: number;
    evento_caso: number;
    eventos_operativos: number;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios: number;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios: number;
    evidencias_evento: number;
    incidencias: number;
    investigacion_caso: number;
    investigaciones: number;
    logs_sistema: number;
    notificaciones: number;
    planes_accion: number;
    reporte_estadistico: number;
    seguimientos: number;
    sesiones: number;
};
export type UsuariosCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actividades_plan?: boolean | UsuariosCountOutputTypeCountActividades_planArgs;
    anexos_caso?: boolean | UsuariosCountOutputTypeCountAnexos_casoArgs;
    auditoria?: boolean | UsuariosCountOutputTypeCountAuditoriaArgs;
    bitacora?: boolean | UsuariosCountOutputTypeCountBitacoraArgs;
    casos_sop_casos_sop_created_byTousuarios?: boolean | UsuariosCountOutputTypeCountCasos_sop_casos_sop_created_byTousuariosArgs;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: boolean | UsuariosCountOutputTypeCountCasos_sop_casos_sop_responsable_hallazgoTousuariosArgs;
    casos_sop_casos_sop_responsable_planTousuarios?: boolean | UsuariosCountOutputTypeCountCasos_sop_casos_sop_responsable_planTousuariosArgs;
    evento_caso?: boolean | UsuariosCountOutputTypeCountEvento_casoArgs;
    eventos_operativos?: boolean | UsuariosCountOutputTypeCountEventos_operativosArgs;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: boolean | UsuariosCountOutputTypeCountEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosArgs;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: boolean | UsuariosCountOutputTypeCountEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosArgs;
    evidencias_evento?: boolean | UsuariosCountOutputTypeCountEvidencias_eventoArgs;
    incidencias?: boolean | UsuariosCountOutputTypeCountIncidenciasArgs;
    investigacion_caso?: boolean | UsuariosCountOutputTypeCountInvestigacion_casoArgs;
    investigaciones?: boolean | UsuariosCountOutputTypeCountInvestigacionesArgs;
    logs_sistema?: boolean | UsuariosCountOutputTypeCountLogs_sistemaArgs;
    notificaciones?: boolean | UsuariosCountOutputTypeCountNotificacionesArgs;
    planes_accion?: boolean | UsuariosCountOutputTypeCountPlanes_accionArgs;
    reporte_estadistico?: boolean | UsuariosCountOutputTypeCountReporte_estadisticoArgs;
    seguimientos?: boolean | UsuariosCountOutputTypeCountSeguimientosArgs;
    sesiones?: boolean | UsuariosCountOutputTypeCountSesionesArgs;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuariosCountOutputType
     */
    select?: Prisma.UsuariosCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountActividades_planArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.actividades_planWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountAnexos_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.anexos_casoWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountAuditoriaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.auditoriaWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountBitacoraArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.bitacoraWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountCasos_sop_casos_sop_created_byTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.casos_sopWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountCasos_sop_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.casos_sopWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountCasos_sop_casos_sop_responsable_planTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.casos_sopWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountEvento_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.evento_casoWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountEventos_operativosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.eventos_operativosWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.eventos_monitoreoWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.eventos_monitoreoWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountEvidencias_eventoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.evidencias_eventoWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountIncidenciasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.incidenciasWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountInvestigacion_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.investigacion_casoWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountInvestigacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.investigacionesWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountLogs_sistemaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.logs_sistemaWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountNotificacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notificacionesWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountPlanes_accionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.planes_accionWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountReporte_estadisticoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.reporte_estadisticoWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountSeguimientosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.seguimientosWhereInput;
};
/**
 * UsuariosCountOutputType without action
 */
export type UsuariosCountOutputTypeCountSesionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.sesionesWhereInput;
};
export type usuariosSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_usuario?: boolean;
    codigo_usuario?: boolean;
    nombre?: boolean;
    cargo?: boolean;
    correo?: boolean;
    password_hash?: boolean;
    telefono?: boolean;
    estado?: boolean;
    fecha_ingreso?: boolean;
    foto_url?: boolean;
    ultimo_acceso?: boolean;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: boolean;
    id_rol?: boolean;
    actividades_plan?: boolean | Prisma.usuarios$actividades_planArgs<ExtArgs>;
    anexos_caso?: boolean | Prisma.usuarios$anexos_casoArgs<ExtArgs>;
    auditoria?: boolean | Prisma.usuarios$auditoriaArgs<ExtArgs>;
    bitacora?: boolean | Prisma.usuarios$bitacoraArgs<ExtArgs>;
    casos_sop_casos_sop_created_byTousuarios?: boolean | Prisma.usuarios$casos_sop_casos_sop_created_byTousuariosArgs<ExtArgs>;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: boolean | Prisma.usuarios$casos_sop_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>;
    casos_sop_casos_sop_responsable_planTousuarios?: boolean | Prisma.usuarios$casos_sop_casos_sop_responsable_planTousuariosArgs<ExtArgs>;
    evento_caso?: boolean | Prisma.usuarios$evento_casoArgs<ExtArgs>;
    eventos_operativos?: boolean | Prisma.usuarios$eventos_operativosArgs<ExtArgs>;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: boolean | Prisma.usuarios$eventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: boolean | Prisma.usuarios$eventos_monitoreo_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>;
    evidencias_evento?: boolean | Prisma.usuarios$evidencias_eventoArgs<ExtArgs>;
    incidencias?: boolean | Prisma.usuarios$incidenciasArgs<ExtArgs>;
    investigacion_caso?: boolean | Prisma.usuarios$investigacion_casoArgs<ExtArgs>;
    investigaciones?: boolean | Prisma.usuarios$investigacionesArgs<ExtArgs>;
    logs_sistema?: boolean | Prisma.usuarios$logs_sistemaArgs<ExtArgs>;
    notificaciones?: boolean | Prisma.usuarios$notificacionesArgs<ExtArgs>;
    planes_accion?: boolean | Prisma.usuarios$planes_accionArgs<ExtArgs>;
    reporte_estadistico?: boolean | Prisma.usuarios$reporte_estadisticoArgs<ExtArgs>;
    seguimientos?: boolean | Prisma.usuarios$seguimientosArgs<ExtArgs>;
    sesiones?: boolean | Prisma.usuarios$sesionesArgs<ExtArgs>;
    areas?: boolean | Prisma.usuarios$areasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuarios$rolesArgs<ExtArgs>;
    _count?: boolean | Prisma.UsuariosCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["usuarios"]>;
export type usuariosSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_usuario?: boolean;
    codigo_usuario?: boolean;
    nombre?: boolean;
    cargo?: boolean;
    correo?: boolean;
    password_hash?: boolean;
    telefono?: boolean;
    estado?: boolean;
    fecha_ingreso?: boolean;
    foto_url?: boolean;
    ultimo_acceso?: boolean;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: boolean;
    id_rol?: boolean;
    areas?: boolean | Prisma.usuarios$areasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuarios$rolesArgs<ExtArgs>;
}, ExtArgs["result"]["usuarios"]>;
export type usuariosSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_usuario?: boolean;
    codigo_usuario?: boolean;
    nombre?: boolean;
    cargo?: boolean;
    correo?: boolean;
    password_hash?: boolean;
    telefono?: boolean;
    estado?: boolean;
    fecha_ingreso?: boolean;
    foto_url?: boolean;
    ultimo_acceso?: boolean;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: boolean;
    id_rol?: boolean;
    areas?: boolean | Prisma.usuarios$areasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuarios$rolesArgs<ExtArgs>;
}, ExtArgs["result"]["usuarios"]>;
export type usuariosSelectScalar = {
    id_usuario?: boolean;
    codigo_usuario?: boolean;
    nombre?: boolean;
    cargo?: boolean;
    correo?: boolean;
    password_hash?: boolean;
    telefono?: boolean;
    estado?: boolean;
    fecha_ingreso?: boolean;
    foto_url?: boolean;
    ultimo_acceso?: boolean;
    es_responsable?: boolean;
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    id_area?: boolean;
    id_rol?: boolean;
};
export type usuariosOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_usuario" | "codigo_usuario" | "nombre" | "cargo" | "correo" | "password_hash" | "telefono" | "estado" | "fecha_ingreso" | "foto_url" | "ultimo_acceso" | "es_responsable" | "puede_reabrir_casos" | "puede_rechazar_reportes" | "id_area" | "id_rol", ExtArgs["result"]["usuarios"]>;
export type usuariosInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actividades_plan?: boolean | Prisma.usuarios$actividades_planArgs<ExtArgs>;
    anexos_caso?: boolean | Prisma.usuarios$anexos_casoArgs<ExtArgs>;
    auditoria?: boolean | Prisma.usuarios$auditoriaArgs<ExtArgs>;
    bitacora?: boolean | Prisma.usuarios$bitacoraArgs<ExtArgs>;
    casos_sop_casos_sop_created_byTousuarios?: boolean | Prisma.usuarios$casos_sop_casos_sop_created_byTousuariosArgs<ExtArgs>;
    casos_sop_casos_sop_responsable_hallazgoTousuarios?: boolean | Prisma.usuarios$casos_sop_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>;
    casos_sop_casos_sop_responsable_planTousuarios?: boolean | Prisma.usuarios$casos_sop_casos_sop_responsable_planTousuariosArgs<ExtArgs>;
    evento_caso?: boolean | Prisma.usuarios$evento_casoArgs<ExtArgs>;
    eventos_operativos?: boolean | Prisma.usuarios$eventos_operativosArgs<ExtArgs>;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios?: boolean | Prisma.usuarios$eventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios?: boolean | Prisma.usuarios$eventos_monitoreo_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>;
    evidencias_evento?: boolean | Prisma.usuarios$evidencias_eventoArgs<ExtArgs>;
    incidencias?: boolean | Prisma.usuarios$incidenciasArgs<ExtArgs>;
    investigacion_caso?: boolean | Prisma.usuarios$investigacion_casoArgs<ExtArgs>;
    investigaciones?: boolean | Prisma.usuarios$investigacionesArgs<ExtArgs>;
    logs_sistema?: boolean | Prisma.usuarios$logs_sistemaArgs<ExtArgs>;
    notificaciones?: boolean | Prisma.usuarios$notificacionesArgs<ExtArgs>;
    planes_accion?: boolean | Prisma.usuarios$planes_accionArgs<ExtArgs>;
    reporte_estadistico?: boolean | Prisma.usuarios$reporte_estadisticoArgs<ExtArgs>;
    seguimientos?: boolean | Prisma.usuarios$seguimientosArgs<ExtArgs>;
    sesiones?: boolean | Prisma.usuarios$sesionesArgs<ExtArgs>;
    areas?: boolean | Prisma.usuarios$areasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuarios$rolesArgs<ExtArgs>;
    _count?: boolean | Prisma.UsuariosCountOutputTypeDefaultArgs<ExtArgs>;
};
export type usuariosIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    areas?: boolean | Prisma.usuarios$areasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuarios$rolesArgs<ExtArgs>;
};
export type usuariosIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    areas?: boolean | Prisma.usuarios$areasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuarios$rolesArgs<ExtArgs>;
};
export type $usuariosPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "usuarios";
    objects: {
        actividades_plan: Prisma.$actividades_planPayload<ExtArgs>[];
        anexos_caso: Prisma.$anexos_casoPayload<ExtArgs>[];
        auditoria: Prisma.$auditoriaPayload<ExtArgs>[];
        bitacora: Prisma.$bitacoraPayload<ExtArgs>[];
        casos_sop_casos_sop_created_byTousuarios: Prisma.$casos_sopPayload<ExtArgs>[];
        casos_sop_casos_sop_responsable_hallazgoTousuarios: Prisma.$casos_sopPayload<ExtArgs>[];
        casos_sop_casos_sop_responsable_planTousuarios: Prisma.$casos_sopPayload<ExtArgs>[];
        evento_caso: Prisma.$evento_casoPayload<ExtArgs>[];
        eventos_operativos: Prisma.$eventos_operativosPayload<ExtArgs>[];
        eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios: Prisma.$eventos_monitoreoPayload<ExtArgs>[];
        eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios: Prisma.$eventos_monitoreoPayload<ExtArgs>[];
        evidencias_evento: Prisma.$evidencias_eventoPayload<ExtArgs>[];
        incidencias: Prisma.$incidenciasPayload<ExtArgs>[];
        investigacion_caso: Prisma.$investigacion_casoPayload<ExtArgs>[];
        investigaciones: Prisma.$investigacionesPayload<ExtArgs>[];
        logs_sistema: Prisma.$logs_sistemaPayload<ExtArgs>[];
        notificaciones: Prisma.$notificacionesPayload<ExtArgs>[];
        planes_accion: Prisma.$planes_accionPayload<ExtArgs>[];
        reporte_estadistico: Prisma.$reporte_estadisticoPayload<ExtArgs>[];
        seguimientos: Prisma.$seguimientosPayload<ExtArgs>[];
        sesiones: Prisma.$sesionesPayload<ExtArgs>[];
        areas: Prisma.$areasPayload<ExtArgs> | null;
        roles: Prisma.$rolesPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_usuario: number;
        codigo_usuario: string;
        nombre: string;
        cargo: string | null;
        correo: string;
        password_hash: string | null;
        telefono: string | null;
        estado: string | null;
        fecha_ingreso: Date | null;
        foto_url: string | null;
        ultimo_acceso: Date | null;
        es_responsable: boolean;
        puede_reabrir_casos: boolean;
        puede_rechazar_reportes: boolean;
        id_area: number | null;
        id_rol: number | null;
    }, ExtArgs["result"]["usuarios"]>;
    composites: {};
};
export type usuariosGetPayload<S extends boolean | null | undefined | usuariosDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$usuariosPayload, S>;
export type usuariosCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<usuariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UsuariosCountAggregateInputType | true;
};
export interface usuariosDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['usuarios'];
        meta: {
            name: 'usuarios';
        };
    };
    /**
     * Find zero or one Usuarios that matches the filter.
     * @param {usuariosFindUniqueArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuariosFindUniqueArgs>(args: Prisma.SelectSubset<T, usuariosFindUniqueArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Usuarios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuariosFindUniqueOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuariosFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, usuariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuariosFindFirstArgs>(args?: Prisma.SelectSubset<T, usuariosFindFirstArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Usuarios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuariosFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, usuariosFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuarios.findMany()
     *
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuarios.findMany({ take: 10 })
     *
     * // Only select the `id_usuario`
     * const usuariosWithId_usuarioOnly = await prisma.usuarios.findMany({ select: { id_usuario: true } })
     *
     */
    findMany<T extends usuariosFindManyArgs>(args?: Prisma.SelectSubset<T, usuariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Usuarios.
     * @param {usuariosCreateArgs} args - Arguments to create a Usuarios.
     * @example
     * // Create one Usuarios
     * const Usuarios = await prisma.usuarios.create({
     *   data: {
     *     // ... data to create a Usuarios
     *   }
     * })
     *
     */
    create<T extends usuariosCreateArgs>(args: Prisma.SelectSubset<T, usuariosCreateArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Usuarios.
     * @param {usuariosCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends usuariosCreateManyArgs>(args?: Prisma.SelectSubset<T, usuariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {usuariosCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Usuarios and only return the `id_usuario`
     * const usuariosWithId_usuarioOnly = await prisma.usuarios.createManyAndReturn({
     *   select: { id_usuario: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends usuariosCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, usuariosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Usuarios.
     * @param {usuariosDeleteArgs} args - Arguments to delete one Usuarios.
     * @example
     * // Delete one Usuarios
     * const Usuarios = await prisma.usuarios.delete({
     *   where: {
     *     // ... filter to delete one Usuarios
     *   }
     * })
     *
     */
    delete<T extends usuariosDeleteArgs>(args: Prisma.SelectSubset<T, usuariosDeleteArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Usuarios.
     * @param {usuariosUpdateArgs} args - Arguments to update one Usuarios.
     * @example
     * // Update one Usuarios
     * const usuarios = await prisma.usuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends usuariosUpdateArgs>(args: Prisma.SelectSubset<T, usuariosUpdateArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Usuarios.
     * @param {usuariosDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends usuariosDeleteManyArgs>(args?: Prisma.SelectSubset<T, usuariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends usuariosUpdateManyArgs>(args: Prisma.SelectSubset<T, usuariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {usuariosUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Usuarios and only return the `id_usuario`
     * const usuariosWithId_usuarioOnly = await prisma.usuarios.updateManyAndReturn({
     *   select: { id_usuario: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends usuariosUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, usuariosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Usuarios.
     * @param {usuariosUpsertArgs} args - Arguments to update or create a Usuarios.
     * @example
     * // Update or create a Usuarios
     * const usuarios = await prisma.usuarios.upsert({
     *   create: {
     *     // ... data to create a Usuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuarios we want to update
     *   }
     * })
     */
    upsert<T extends usuariosUpsertArgs>(args: Prisma.SelectSubset<T, usuariosUpsertArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuarios.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends usuariosCountArgs>(args?: Prisma.Subset<T, usuariosCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UsuariosCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuariosAggregateArgs>(args: Prisma.Subset<T, UsuariosAggregateArgs>): Prisma.PrismaPromise<GetUsuariosAggregateType<T>>;
    /**
     * Group by Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends usuariosGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: usuariosGroupByArgs['orderBy'];
    } : {
        orderBy?: usuariosGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, usuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the usuarios model
     */
    readonly fields: usuariosFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for usuarios.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__usuariosClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    actividades_plan<T extends Prisma.usuarios$actividades_planArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$actividades_planArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    anexos_caso<T extends Prisma.usuarios$anexos_casoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$anexos_casoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditoria<T extends Prisma.usuarios$auditoriaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$auditoriaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$auditoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bitacora<T extends Prisma.usuarios$bitacoraArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$bitacoraArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    casos_sop_casos_sop_created_byTousuarios<T extends Prisma.usuarios$casos_sop_casos_sop_created_byTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$casos_sop_casos_sop_created_byTousuariosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    casos_sop_casos_sop_responsable_hallazgoTousuarios<T extends Prisma.usuarios$casos_sop_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$casos_sop_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    casos_sop_casos_sop_responsable_planTousuarios<T extends Prisma.usuarios$casos_sop_casos_sop_responsable_planTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$casos_sop_casos_sop_responsable_planTousuariosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    evento_caso<T extends Prisma.usuarios$evento_casoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$evento_casoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    eventos_operativos<T extends Prisma.usuarios$eventos_operativosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$eventos_operativosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios<T extends Prisma.usuarios$eventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$eventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios<T extends Prisma.usuarios$eventos_monitoreo_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$eventos_monitoreo_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    evidencias_evento<T extends Prisma.usuarios$evidencias_eventoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$evidencias_eventoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    incidencias<T extends Prisma.usuarios$incidenciasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$incidenciasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    investigacion_caso<T extends Prisma.usuarios$investigacion_casoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$investigacion_casoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    investigaciones<T extends Prisma.usuarios$investigacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$investigacionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    logs_sistema<T extends Prisma.usuarios$logs_sistemaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$logs_sistemaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notificaciones<T extends Prisma.usuarios$notificacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$notificacionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notificacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    planes_accion<T extends Prisma.usuarios$planes_accionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$planes_accionArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reporte_estadistico<T extends Prisma.usuarios$reporte_estadisticoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$reporte_estadisticoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    seguimientos<T extends Prisma.usuarios$seguimientosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$seguimientosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sesiones<T extends Prisma.usuarios$sesionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$sesionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sesionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    areas<T extends Prisma.usuarios$areasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$areasArgs<ExtArgs>>): Prisma.Prisma__areasClient<runtime.Types.Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    roles<T extends Prisma.usuarios$rolesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$rolesArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the usuarios model
 */
export interface usuariosFieldRefs {
    readonly id_usuario: Prisma.FieldRef<"usuarios", 'Int'>;
    readonly codigo_usuario: Prisma.FieldRef<"usuarios", 'String'>;
    readonly nombre: Prisma.FieldRef<"usuarios", 'String'>;
    readonly cargo: Prisma.FieldRef<"usuarios", 'String'>;
    readonly correo: Prisma.FieldRef<"usuarios", 'String'>;
    readonly password_hash: Prisma.FieldRef<"usuarios", 'String'>;
    readonly telefono: Prisma.FieldRef<"usuarios", 'String'>;
    readonly estado: Prisma.FieldRef<"usuarios", 'String'>;
    readonly fecha_ingreso: Prisma.FieldRef<"usuarios", 'DateTime'>;
    readonly foto_url: Prisma.FieldRef<"usuarios", 'String'>;
    readonly ultimo_acceso: Prisma.FieldRef<"usuarios", 'DateTime'>;
    readonly es_responsable: Prisma.FieldRef<"usuarios", 'Boolean'>;
    readonly puede_reabrir_casos: Prisma.FieldRef<"usuarios", 'Boolean'>;
    readonly puede_rechazar_reportes: Prisma.FieldRef<"usuarios", 'Boolean'>;
    readonly id_area: Prisma.FieldRef<"usuarios", 'Int'>;
    readonly id_rol: Prisma.FieldRef<"usuarios", 'Int'>;
}
/**
 * usuarios findUnique
 */
export type usuariosFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    /**
     * Filter, which usuarios to fetch.
     */
    where: Prisma.usuariosWhereUniqueInput;
};
/**
 * usuarios findUniqueOrThrow
 */
export type usuariosFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    /**
     * Filter, which usuarios to fetch.
     */
    where: Prisma.usuariosWhereUniqueInput;
};
/**
 * usuarios findFirst
 */
export type usuariosFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    /**
     * Filter, which usuarios to fetch.
     */
    where?: Prisma.usuariosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of usuarios to fetch.
     */
    orderBy?: Prisma.usuariosOrderByWithRelationInput | Prisma.usuariosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for usuarios.
     */
    cursor?: Prisma.usuariosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of usuarios.
     */
    distinct?: Prisma.UsuariosScalarFieldEnum | Prisma.UsuariosScalarFieldEnum[];
};
/**
 * usuarios findFirstOrThrow
 */
export type usuariosFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    /**
     * Filter, which usuarios to fetch.
     */
    where?: Prisma.usuariosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of usuarios to fetch.
     */
    orderBy?: Prisma.usuariosOrderByWithRelationInput | Prisma.usuariosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for usuarios.
     */
    cursor?: Prisma.usuariosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of usuarios.
     */
    distinct?: Prisma.UsuariosScalarFieldEnum | Prisma.UsuariosScalarFieldEnum[];
};
/**
 * usuarios findMany
 */
export type usuariosFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    /**
     * Filter, which usuarios to fetch.
     */
    where?: Prisma.usuariosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of usuarios to fetch.
     */
    orderBy?: Prisma.usuariosOrderByWithRelationInput | Prisma.usuariosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing usuarios.
     */
    cursor?: Prisma.usuariosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` usuarios.
     */
    skip?: number;
    distinct?: Prisma.UsuariosScalarFieldEnum | Prisma.UsuariosScalarFieldEnum[];
};
/**
 * usuarios create
 */
export type usuariosCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    /**
     * The data needed to create a usuarios.
     */
    data: Prisma.XOR<Prisma.usuariosCreateInput, Prisma.usuariosUncheckedCreateInput>;
};
/**
 * usuarios createMany
 */
export type usuariosCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios.
     */
    data: Prisma.usuariosCreateManyInput | Prisma.usuariosCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * usuarios createManyAndReturn
 */
export type usuariosCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * The data used to create many usuarios.
     */
    data: Prisma.usuariosCreateManyInput | Prisma.usuariosCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * usuarios update
 */
export type usuariosUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    /**
     * The data needed to update a usuarios.
     */
    data: Prisma.XOR<Prisma.usuariosUpdateInput, Prisma.usuariosUncheckedUpdateInput>;
    /**
     * Choose, which usuarios to update.
     */
    where: Prisma.usuariosWhereUniqueInput;
};
/**
 * usuarios updateMany
 */
export type usuariosUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios.
     */
    data: Prisma.XOR<Prisma.usuariosUpdateManyMutationInput, Prisma.usuariosUncheckedUpdateManyInput>;
    /**
     * Filter which usuarios to update
     */
    where?: Prisma.usuariosWhereInput;
    /**
     * Limit how many usuarios to update.
     */
    limit?: number;
};
/**
 * usuarios updateManyAndReturn
 */
export type usuariosUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * The data used to update usuarios.
     */
    data: Prisma.XOR<Prisma.usuariosUpdateManyMutationInput, Prisma.usuariosUncheckedUpdateManyInput>;
    /**
     * Filter which usuarios to update
     */
    where?: Prisma.usuariosWhereInput;
    /**
     * Limit how many usuarios to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * usuarios upsert
 */
export type usuariosUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    /**
     * The filter to search for the usuarios to update in case it exists.
     */
    where: Prisma.usuariosWhereUniqueInput;
    /**
     * In case the usuarios found by the `where` argument doesn't exist, create a new usuarios with this data.
     */
    create: Prisma.XOR<Prisma.usuariosCreateInput, Prisma.usuariosUncheckedCreateInput>;
    /**
     * In case the usuarios was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.usuariosUpdateInput, Prisma.usuariosUncheckedUpdateInput>;
};
/**
 * usuarios delete
 */
export type usuariosDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    /**
     * Filter which usuarios to delete.
     */
    where: Prisma.usuariosWhereUniqueInput;
};
/**
 * usuarios deleteMany
 */
export type usuariosDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to delete
     */
    where?: Prisma.usuariosWhereInput;
    /**
     * Limit how many usuarios to delete.
     */
    limit?: number;
};
/**
 * usuarios.actividades_plan
 */
export type usuarios$actividades_planArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the actividades_plan
     */
    select?: Prisma.actividades_planSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the actividades_plan
     */
    omit?: Prisma.actividades_planOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.actividades_planInclude<ExtArgs> | null;
    where?: Prisma.actividades_planWhereInput;
    orderBy?: Prisma.actividades_planOrderByWithRelationInput | Prisma.actividades_planOrderByWithRelationInput[];
    cursor?: Prisma.actividades_planWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Actividades_planScalarFieldEnum | Prisma.Actividades_planScalarFieldEnum[];
};
/**
 * usuarios.anexos_caso
 */
export type usuarios$anexos_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    where?: Prisma.anexos_casoWhereInput;
    orderBy?: Prisma.anexos_casoOrderByWithRelationInput | Prisma.anexos_casoOrderByWithRelationInput[];
    cursor?: Prisma.anexos_casoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Anexos_casoScalarFieldEnum | Prisma.Anexos_casoScalarFieldEnum[];
};
/**
 * usuarios.auditoria
 */
export type usuarios$auditoriaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auditoria
     */
    select?: Prisma.auditoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the auditoria
     */
    omit?: Prisma.auditoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.auditoriaInclude<ExtArgs> | null;
    where?: Prisma.auditoriaWhereInput;
    orderBy?: Prisma.auditoriaOrderByWithRelationInput | Prisma.auditoriaOrderByWithRelationInput[];
    cursor?: Prisma.auditoriaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditoriaScalarFieldEnum | Prisma.AuditoriaScalarFieldEnum[];
};
/**
 * usuarios.bitacora
 */
export type usuarios$bitacoraArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    where?: Prisma.bitacoraWhereInput;
    orderBy?: Prisma.bitacoraOrderByWithRelationInput | Prisma.bitacoraOrderByWithRelationInput[];
    cursor?: Prisma.bitacoraWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BitacoraScalarFieldEnum | Prisma.BitacoraScalarFieldEnum[];
};
/**
 * usuarios.casos_sop_casos_sop_created_byTousuarios
 */
export type usuarios$casos_sop_casos_sop_created_byTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the casos_sop
     */
    select?: Prisma.casos_sopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the casos_sop
     */
    omit?: Prisma.casos_sopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.casos_sopInclude<ExtArgs> | null;
    where?: Prisma.casos_sopWhereInput;
    orderBy?: Prisma.casos_sopOrderByWithRelationInput | Prisma.casos_sopOrderByWithRelationInput[];
    cursor?: Prisma.casos_sopWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Casos_sopScalarFieldEnum | Prisma.Casos_sopScalarFieldEnum[];
};
/**
 * usuarios.casos_sop_casos_sop_responsable_hallazgoTousuarios
 */
export type usuarios$casos_sop_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the casos_sop
     */
    select?: Prisma.casos_sopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the casos_sop
     */
    omit?: Prisma.casos_sopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.casos_sopInclude<ExtArgs> | null;
    where?: Prisma.casos_sopWhereInput;
    orderBy?: Prisma.casos_sopOrderByWithRelationInput | Prisma.casos_sopOrderByWithRelationInput[];
    cursor?: Prisma.casos_sopWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Casos_sopScalarFieldEnum | Prisma.Casos_sopScalarFieldEnum[];
};
/**
 * usuarios.casos_sop_casos_sop_responsable_planTousuarios
 */
export type usuarios$casos_sop_casos_sop_responsable_planTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the casos_sop
     */
    select?: Prisma.casos_sopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the casos_sop
     */
    omit?: Prisma.casos_sopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.casos_sopInclude<ExtArgs> | null;
    where?: Prisma.casos_sopWhereInput;
    orderBy?: Prisma.casos_sopOrderByWithRelationInput | Prisma.casos_sopOrderByWithRelationInput[];
    cursor?: Prisma.casos_sopWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Casos_sopScalarFieldEnum | Prisma.Casos_sopScalarFieldEnum[];
};
/**
 * usuarios.evento_caso
 */
export type usuarios$evento_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evento_caso
     */
    select?: Prisma.evento_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evento_caso
     */
    omit?: Prisma.evento_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evento_casoInclude<ExtArgs> | null;
    where?: Prisma.evento_casoWhereInput;
    orderBy?: Prisma.evento_casoOrderByWithRelationInput | Prisma.evento_casoOrderByWithRelationInput[];
    cursor?: Prisma.evento_casoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Evento_casoScalarFieldEnum | Prisma.Evento_casoScalarFieldEnum[];
};
/**
 * usuarios.eventos_operativos
 */
export type usuarios$eventos_operativosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos_operativos
     */
    select?: Prisma.eventos_operativosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the eventos_operativos
     */
    omit?: Prisma.eventos_operativosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.eventos_operativosInclude<ExtArgs> | null;
    where?: Prisma.eventos_operativosWhereInput;
    orderBy?: Prisma.eventos_operativosOrderByWithRelationInput | Prisma.eventos_operativosOrderByWithRelationInput[];
    cursor?: Prisma.eventos_operativosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Eventos_operativosScalarFieldEnum | Prisma.Eventos_operativosScalarFieldEnum[];
};
/**
 * usuarios.eventos_monitoreo_eventos_monitoreo_usuario_registraTousuarios
 */
export type usuarios$eventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos_monitoreo
     */
    select?: Prisma.eventos_monitoreoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the eventos_monitoreo
     */
    omit?: Prisma.eventos_monitoreoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.eventos_monitoreoInclude<ExtArgs> | null;
    where?: Prisma.eventos_monitoreoWhereInput;
    orderBy?: Prisma.eventos_monitoreoOrderByWithRelationInput | Prisma.eventos_monitoreoOrderByWithRelationInput[];
    cursor?: Prisma.eventos_monitoreoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Eventos_monitoreoScalarFieldEnum | Prisma.Eventos_monitoreoScalarFieldEnum[];
};
/**
 * usuarios.eventos_monitoreo_eventos_monitoreo_asignado_aTousuarios
 */
export type usuarios$eventos_monitoreo_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos_monitoreo
     */
    select?: Prisma.eventos_monitoreoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the eventos_monitoreo
     */
    omit?: Prisma.eventos_monitoreoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.eventos_monitoreoInclude<ExtArgs> | null;
    where?: Prisma.eventos_monitoreoWhereInput;
    orderBy?: Prisma.eventos_monitoreoOrderByWithRelationInput | Prisma.eventos_monitoreoOrderByWithRelationInput[];
    cursor?: Prisma.eventos_monitoreoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Eventos_monitoreoScalarFieldEnum | Prisma.Eventos_monitoreoScalarFieldEnum[];
};
/**
 * usuarios.evidencias_evento
 */
export type usuarios$evidencias_eventoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias_evento
     */
    select?: Prisma.evidencias_eventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias_evento
     */
    omit?: Prisma.evidencias_eventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidencias_eventoInclude<ExtArgs> | null;
    where?: Prisma.evidencias_eventoWhereInput;
    orderBy?: Prisma.evidencias_eventoOrderByWithRelationInput | Prisma.evidencias_eventoOrderByWithRelationInput[];
    cursor?: Prisma.evidencias_eventoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Evidencias_eventoScalarFieldEnum | Prisma.Evidencias_eventoScalarFieldEnum[];
};
/**
 * usuarios.incidencias
 */
export type usuarios$incidenciasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidencias
     */
    select?: Prisma.incidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the incidencias
     */
    omit?: Prisma.incidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.incidenciasInclude<ExtArgs> | null;
    where?: Prisma.incidenciasWhereInput;
    orderBy?: Prisma.incidenciasOrderByWithRelationInput | Prisma.incidenciasOrderByWithRelationInput[];
    cursor?: Prisma.incidenciasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IncidenciasScalarFieldEnum | Prisma.IncidenciasScalarFieldEnum[];
};
/**
 * usuarios.investigacion_caso
 */
export type usuarios$investigacion_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    where?: Prisma.investigacion_casoWhereInput;
    orderBy?: Prisma.investigacion_casoOrderByWithRelationInput | Prisma.investigacion_casoOrderByWithRelationInput[];
    cursor?: Prisma.investigacion_casoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Investigacion_casoScalarFieldEnum | Prisma.Investigacion_casoScalarFieldEnum[];
};
/**
 * usuarios.investigaciones
 */
export type usuarios$investigacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    where?: Prisma.investigacionesWhereInput;
    orderBy?: Prisma.investigacionesOrderByWithRelationInput | Prisma.investigacionesOrderByWithRelationInput[];
    cursor?: Prisma.investigacionesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvestigacionesScalarFieldEnum | Prisma.InvestigacionesScalarFieldEnum[];
};
/**
 * usuarios.logs_sistema
 */
export type usuarios$logs_sistemaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    where?: Prisma.logs_sistemaWhereInput;
    orderBy?: Prisma.logs_sistemaOrderByWithRelationInput | Prisma.logs_sistemaOrderByWithRelationInput[];
    cursor?: Prisma.logs_sistemaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Logs_sistemaScalarFieldEnum | Prisma.Logs_sistemaScalarFieldEnum[];
};
/**
 * usuarios.notificaciones
 */
export type usuarios$notificacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificaciones
     */
    select?: Prisma.notificacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the notificaciones
     */
    omit?: Prisma.notificacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.notificacionesInclude<ExtArgs> | null;
    where?: Prisma.notificacionesWhereInput;
    orderBy?: Prisma.notificacionesOrderByWithRelationInput | Prisma.notificacionesOrderByWithRelationInput[];
    cursor?: Prisma.notificacionesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificacionesScalarFieldEnum | Prisma.NotificacionesScalarFieldEnum[];
};
/**
 * usuarios.planes_accion
 */
export type usuarios$planes_accionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    where?: Prisma.planes_accionWhereInput;
    orderBy?: Prisma.planes_accionOrderByWithRelationInput | Prisma.planes_accionOrderByWithRelationInput[];
    cursor?: Prisma.planes_accionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Planes_accionScalarFieldEnum | Prisma.Planes_accionScalarFieldEnum[];
};
/**
 * usuarios.reporte_estadistico
 */
export type usuarios$reporte_estadisticoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reporte_estadistico
     */
    select?: Prisma.reporte_estadisticoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the reporte_estadistico
     */
    omit?: Prisma.reporte_estadisticoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.reporte_estadisticoInclude<ExtArgs> | null;
    where?: Prisma.reporte_estadisticoWhereInput;
    orderBy?: Prisma.reporte_estadisticoOrderByWithRelationInput | Prisma.reporte_estadisticoOrderByWithRelationInput[];
    cursor?: Prisma.reporte_estadisticoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Reporte_estadisticoScalarFieldEnum | Prisma.Reporte_estadisticoScalarFieldEnum[];
};
/**
 * usuarios.seguimientos
 */
export type usuarios$seguimientosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    where?: Prisma.seguimientosWhereInput;
    orderBy?: Prisma.seguimientosOrderByWithRelationInput | Prisma.seguimientosOrderByWithRelationInput[];
    cursor?: Prisma.seguimientosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SeguimientosScalarFieldEnum | Prisma.SeguimientosScalarFieldEnum[];
};
/**
 * usuarios.sesiones
 */
export type usuarios$sesionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sesiones
     */
    select?: Prisma.sesionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the sesiones
     */
    omit?: Prisma.sesionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.sesionesInclude<ExtArgs> | null;
    where?: Prisma.sesionesWhereInput;
    orderBy?: Prisma.sesionesOrderByWithRelationInput | Prisma.sesionesOrderByWithRelationInput[];
    cursor?: Prisma.sesionesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SesionesScalarFieldEnum | Prisma.SesionesScalarFieldEnum[];
};
/**
 * usuarios.areas
 */
export type usuarios$areasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: Prisma.areasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the areas
     */
    omit?: Prisma.areasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.areasInclude<ExtArgs> | null;
    where?: Prisma.areasWhereInput;
};
/**
 * usuarios.roles
 */
export type usuarios$rolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: Prisma.rolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the roles
     */
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where?: Prisma.rolesWhereInput;
};
/**
 * usuarios without action
 */
export type usuariosDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuarios
     */
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usuariosInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=usuarios.d.ts.map