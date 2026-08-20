import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model eventos_monitoreo
 * *
 *  * Registro propio del panel de Monitorista — deliberadamente separado de
 *  * `eventos_operativos` (la tabla de Seguridad Operativa). Lo que registra
 *  * Monitoreo no debe reflejarse en SO hasta que el jefe lo valide y lo
 *  * asigne; esa integración es un paso aparte, todavía sin construir.
 */
export type eventos_monitoreoModel = runtime.Types.Result.DefaultSelection<Prisma.$eventos_monitoreoPayload>;
export type AggregateEventos_monitoreo = {
    _count: Eventos_monitoreoCountAggregateOutputType | null;
    _avg: Eventos_monitoreoAvgAggregateOutputType | null;
    _sum: Eventos_monitoreoSumAggregateOutputType | null;
    _min: Eventos_monitoreoMinAggregateOutputType | null;
    _max: Eventos_monitoreoMaxAggregateOutputType | null;
};
export type Eventos_monitoreoAvgAggregateOutputType = {
    id_evento: number | null;
    anio: number | null;
    mes: number | null;
    semana: number | null;
    rango_horario: number | null;
    tipo_incidente: number | null;
    ubicacion: number | null;
    tipo_via: number | null;
    direccion_via: number | null;
    lugar_incidente: number | null;
    modelo_mr: number | null;
    numero_mr: number | null;
    personal_involucrado: number | null;
    tipo_causa: number | null;
    posible_causa: number | null;
    demora: runtime.Decimal | null;
    usuario_registra: number | null;
    asignado_a: number | null;
    id_caso_creado: number | null;
};
export type Eventos_monitoreoSumAggregateOutputType = {
    id_evento: number | null;
    anio: number | null;
    mes: number | null;
    semana: number | null;
    rango_horario: number | null;
    tipo_incidente: number | null;
    ubicacion: number | null;
    tipo_via: number | null;
    direccion_via: number | null;
    lugar_incidente: number | null;
    modelo_mr: number | null;
    numero_mr: number | null;
    personal_involucrado: number | null;
    tipo_causa: number | null;
    posible_causa: number | null;
    demora: runtime.Decimal | null;
    usuario_registra: number | null;
    asignado_a: number | null;
    id_caso_creado: number | null;
};
export type Eventos_monitoreoMinAggregateOutputType = {
    id_evento: number | null;
    codigo_evento: string | null;
    fecha: Date | null;
    hora: Date | null;
    anio: number | null;
    mes: number | null;
    semana: number | null;
    dia: string | null;
    rango_horario: number | null;
    tipo_incidente: number | null;
    descripcion: string | null;
    ubicacion: number | null;
    tipo_via: number | null;
    direccion_via: number | null;
    lugar_incidente: number | null;
    modelo_mr: number | null;
    numero_mr: number | null;
    numero_carrera: string | null;
    personal_involucrado: number | null;
    tipo_causa: number | null;
    posible_causa: number | null;
    informacion_adicional: string | null;
    camara_monitoreada: string | null;
    demora: runtime.Decimal | null;
    estado: string | null;
    usuario_registra: number | null;
    asignado_a: number | null;
    id_caso_creado: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Eventos_monitoreoMaxAggregateOutputType = {
    id_evento: number | null;
    codigo_evento: string | null;
    fecha: Date | null;
    hora: Date | null;
    anio: number | null;
    mes: number | null;
    semana: number | null;
    dia: string | null;
    rango_horario: number | null;
    tipo_incidente: number | null;
    descripcion: string | null;
    ubicacion: number | null;
    tipo_via: number | null;
    direccion_via: number | null;
    lugar_incidente: number | null;
    modelo_mr: number | null;
    numero_mr: number | null;
    numero_carrera: string | null;
    personal_involucrado: number | null;
    tipo_causa: number | null;
    posible_causa: number | null;
    informacion_adicional: string | null;
    camara_monitoreada: string | null;
    demora: runtime.Decimal | null;
    estado: string | null;
    usuario_registra: number | null;
    asignado_a: number | null;
    id_caso_creado: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Eventos_monitoreoCountAggregateOutputType = {
    id_evento: number;
    codigo_evento: number;
    fecha: number;
    hora: number;
    anio: number;
    mes: number;
    semana: number;
    dia: number;
    rango_horario: number;
    tipo_incidente: number;
    descripcion: number;
    ubicacion: number;
    tipo_via: number;
    direccion_via: number;
    lugar_incidente: number;
    modelo_mr: number;
    numero_mr: number;
    numero_carrera: number;
    personal_involucrado: number;
    tipo_causa: number;
    posible_causa: number;
    informacion_adicional: number;
    camara_monitoreada: number;
    demora: number;
    estado: number;
    usuario_registra: number;
    asignado_a: number;
    id_caso_creado: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Eventos_monitoreoAvgAggregateInputType = {
    id_evento?: true;
    anio?: true;
    mes?: true;
    semana?: true;
    rango_horario?: true;
    tipo_incidente?: true;
    ubicacion?: true;
    tipo_via?: true;
    direccion_via?: true;
    lugar_incidente?: true;
    modelo_mr?: true;
    numero_mr?: true;
    personal_involucrado?: true;
    tipo_causa?: true;
    posible_causa?: true;
    demora?: true;
    usuario_registra?: true;
    asignado_a?: true;
    id_caso_creado?: true;
};
export type Eventos_monitoreoSumAggregateInputType = {
    id_evento?: true;
    anio?: true;
    mes?: true;
    semana?: true;
    rango_horario?: true;
    tipo_incidente?: true;
    ubicacion?: true;
    tipo_via?: true;
    direccion_via?: true;
    lugar_incidente?: true;
    modelo_mr?: true;
    numero_mr?: true;
    personal_involucrado?: true;
    tipo_causa?: true;
    posible_causa?: true;
    demora?: true;
    usuario_registra?: true;
    asignado_a?: true;
    id_caso_creado?: true;
};
export type Eventos_monitoreoMinAggregateInputType = {
    id_evento?: true;
    codigo_evento?: true;
    fecha?: true;
    hora?: true;
    anio?: true;
    mes?: true;
    semana?: true;
    dia?: true;
    rango_horario?: true;
    tipo_incidente?: true;
    descripcion?: true;
    ubicacion?: true;
    tipo_via?: true;
    direccion_via?: true;
    lugar_incidente?: true;
    modelo_mr?: true;
    numero_mr?: true;
    numero_carrera?: true;
    personal_involucrado?: true;
    tipo_causa?: true;
    posible_causa?: true;
    informacion_adicional?: true;
    camara_monitoreada?: true;
    demora?: true;
    estado?: true;
    usuario_registra?: true;
    asignado_a?: true;
    id_caso_creado?: true;
    created_at?: true;
    updated_at?: true;
};
export type Eventos_monitoreoMaxAggregateInputType = {
    id_evento?: true;
    codigo_evento?: true;
    fecha?: true;
    hora?: true;
    anio?: true;
    mes?: true;
    semana?: true;
    dia?: true;
    rango_horario?: true;
    tipo_incidente?: true;
    descripcion?: true;
    ubicacion?: true;
    tipo_via?: true;
    direccion_via?: true;
    lugar_incidente?: true;
    modelo_mr?: true;
    numero_mr?: true;
    numero_carrera?: true;
    personal_involucrado?: true;
    tipo_causa?: true;
    posible_causa?: true;
    informacion_adicional?: true;
    camara_monitoreada?: true;
    demora?: true;
    estado?: true;
    usuario_registra?: true;
    asignado_a?: true;
    id_caso_creado?: true;
    created_at?: true;
    updated_at?: true;
};
export type Eventos_monitoreoCountAggregateInputType = {
    id_evento?: true;
    codigo_evento?: true;
    fecha?: true;
    hora?: true;
    anio?: true;
    mes?: true;
    semana?: true;
    dia?: true;
    rango_horario?: true;
    tipo_incidente?: true;
    descripcion?: true;
    ubicacion?: true;
    tipo_via?: true;
    direccion_via?: true;
    lugar_incidente?: true;
    modelo_mr?: true;
    numero_mr?: true;
    numero_carrera?: true;
    personal_involucrado?: true;
    tipo_causa?: true;
    posible_causa?: true;
    informacion_adicional?: true;
    camara_monitoreada?: true;
    demora?: true;
    estado?: true;
    usuario_registra?: true;
    asignado_a?: true;
    id_caso_creado?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Eventos_monitoreoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which eventos_monitoreo to aggregate.
     */
    where?: Prisma.eventos_monitoreoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of eventos_monitoreos to fetch.
     */
    orderBy?: Prisma.eventos_monitoreoOrderByWithRelationInput | Prisma.eventos_monitoreoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.eventos_monitoreoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` eventos_monitoreos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` eventos_monitoreos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned eventos_monitoreos
    **/
    _count?: true | Eventos_monitoreoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Eventos_monitoreoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Eventos_monitoreoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Eventos_monitoreoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Eventos_monitoreoMaxAggregateInputType;
};
export type GetEventos_monitoreoAggregateType<T extends Eventos_monitoreoAggregateArgs> = {
    [P in keyof T & keyof AggregateEventos_monitoreo]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEventos_monitoreo[P]> : Prisma.GetScalarType<T[P], AggregateEventos_monitoreo[P]>;
};
export type eventos_monitoreoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.eventos_monitoreoWhereInput;
    orderBy?: Prisma.eventos_monitoreoOrderByWithAggregationInput | Prisma.eventos_monitoreoOrderByWithAggregationInput[];
    by: Prisma.Eventos_monitoreoScalarFieldEnum[] | Prisma.Eventos_monitoreoScalarFieldEnum;
    having?: Prisma.eventos_monitoreoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Eventos_monitoreoCountAggregateInputType | true;
    _avg?: Eventos_monitoreoAvgAggregateInputType;
    _sum?: Eventos_monitoreoSumAggregateInputType;
    _min?: Eventos_monitoreoMinAggregateInputType;
    _max?: Eventos_monitoreoMaxAggregateInputType;
};
export type Eventos_monitoreoGroupByOutputType = {
    id_evento: number;
    codigo_evento: string | null;
    fecha: Date;
    hora: Date | null;
    anio: number | null;
    mes: number | null;
    semana: number | null;
    dia: string | null;
    rango_horario: number | null;
    tipo_incidente: number;
    descripcion: string | null;
    ubicacion: number | null;
    tipo_via: number | null;
    direccion_via: number | null;
    lugar_incidente: number | null;
    modelo_mr: number | null;
    numero_mr: number | null;
    numero_carrera: string | null;
    personal_involucrado: number | null;
    tipo_causa: number | null;
    posible_causa: number | null;
    informacion_adicional: string | null;
    camara_monitoreada: string | null;
    demora: runtime.Decimal | null;
    estado: string;
    usuario_registra: number | null;
    asignado_a: number | null;
    id_caso_creado: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Eventos_monitoreoCountAggregateOutputType | null;
    _avg: Eventos_monitoreoAvgAggregateOutputType | null;
    _sum: Eventos_monitoreoSumAggregateOutputType | null;
    _min: Eventos_monitoreoMinAggregateOutputType | null;
    _max: Eventos_monitoreoMaxAggregateOutputType | null;
};
type GetEventos_monitoreoGroupByPayload<T extends eventos_monitoreoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Eventos_monitoreoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Eventos_monitoreoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Eventos_monitoreoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Eventos_monitoreoGroupByOutputType[P]>;
}>>;
export type eventos_monitoreoWhereInput = {
    AND?: Prisma.eventos_monitoreoWhereInput | Prisma.eventos_monitoreoWhereInput[];
    OR?: Prisma.eventos_monitoreoWhereInput[];
    NOT?: Prisma.eventos_monitoreoWhereInput | Prisma.eventos_monitoreoWhereInput[];
    id_evento?: Prisma.IntFilter<"eventos_monitoreo"> | number;
    codigo_evento?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    fecha?: Prisma.DateTimeFilter<"eventos_monitoreo"> | Date | string;
    hora?: Prisma.DateTimeNullableFilter<"eventos_monitoreo"> | Date | string | null;
    anio?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    mes?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    semana?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    dia?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    rango_horario?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    tipo_incidente?: Prisma.IntFilter<"eventos_monitoreo"> | number;
    descripcion?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    ubicacion?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    tipo_via?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    direccion_via?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    lugar_incidente?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    modelo_mr?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    numero_mr?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    numero_carrera?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    personal_involucrado?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    tipo_causa?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    posible_causa?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    informacion_adicional?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    camara_monitoreada?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    demora?: Prisma.DecimalNullableFilter<"eventos_monitoreo"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFilter<"eventos_monitoreo"> | string;
    usuario_registra?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    asignado_a?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    id_caso_creado?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"eventos_monitoreo"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"eventos_monitoreo"> | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopNullableScalarRelationFilter, Prisma.casos_sopWhereInput> | null;
};
export type eventos_monitoreoOrderByWithRelationInput = {
    id_evento?: Prisma.SortOrder;
    codigo_evento?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    hora?: Prisma.SortOrderInput | Prisma.SortOrder;
    anio?: Prisma.SortOrderInput | Prisma.SortOrder;
    mes?: Prisma.SortOrderInput | Prisma.SortOrder;
    semana?: Prisma.SortOrderInput | Prisma.SortOrder;
    dia?: Prisma.SortOrderInput | Prisma.SortOrder;
    rango_horario?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_incidente?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    ubicacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_via?: Prisma.SortOrderInput | Prisma.SortOrder;
    direccion_via?: Prisma.SortOrderInput | Prisma.SortOrder;
    lugar_incidente?: Prisma.SortOrderInput | Prisma.SortOrder;
    modelo_mr?: Prisma.SortOrderInput | Prisma.SortOrder;
    numero_mr?: Prisma.SortOrderInput | Prisma.SortOrder;
    numero_carrera?: Prisma.SortOrderInput | Prisma.SortOrder;
    personal_involucrado?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_causa?: Prisma.SortOrderInput | Prisma.SortOrder;
    posible_causa?: Prisma.SortOrderInput | Prisma.SortOrder;
    informacion_adicional?: Prisma.SortOrderInput | Prisma.SortOrder;
    camara_monitoreada?: Prisma.SortOrderInput | Prisma.SortOrder;
    demora?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrderInput | Prisma.SortOrder;
    asignado_a?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_caso_creado?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosOrderByWithRelationInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosOrderByWithRelationInput;
    casos_sop?: Prisma.casos_sopOrderByWithRelationInput;
};
export type eventos_monitoreoWhereUniqueInput = Prisma.AtLeast<{
    id_evento?: number;
    codigo_evento?: string;
    id_caso_creado?: number;
    AND?: Prisma.eventos_monitoreoWhereInput | Prisma.eventos_monitoreoWhereInput[];
    OR?: Prisma.eventos_monitoreoWhereInput[];
    NOT?: Prisma.eventos_monitoreoWhereInput | Prisma.eventos_monitoreoWhereInput[];
    fecha?: Prisma.DateTimeFilter<"eventos_monitoreo"> | Date | string;
    hora?: Prisma.DateTimeNullableFilter<"eventos_monitoreo"> | Date | string | null;
    anio?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    mes?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    semana?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    dia?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    rango_horario?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    tipo_incidente?: Prisma.IntFilter<"eventos_monitoreo"> | number;
    descripcion?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    ubicacion?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    tipo_via?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    direccion_via?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    lugar_incidente?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    modelo_mr?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    numero_mr?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    numero_carrera?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    personal_involucrado?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    tipo_causa?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    posible_causa?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    informacion_adicional?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    camara_monitoreada?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    demora?: Prisma.DecimalNullableFilter<"eventos_monitoreo"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFilter<"eventos_monitoreo"> | string;
    usuario_registra?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    asignado_a?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"eventos_monitoreo"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"eventos_monitoreo"> | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopNullableScalarRelationFilter, Prisma.casos_sopWhereInput> | null;
}, "id_evento" | "codigo_evento" | "id_caso_creado">;
export type eventos_monitoreoOrderByWithAggregationInput = {
    id_evento?: Prisma.SortOrder;
    codigo_evento?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    hora?: Prisma.SortOrderInput | Prisma.SortOrder;
    anio?: Prisma.SortOrderInput | Prisma.SortOrder;
    mes?: Prisma.SortOrderInput | Prisma.SortOrder;
    semana?: Prisma.SortOrderInput | Prisma.SortOrder;
    dia?: Prisma.SortOrderInput | Prisma.SortOrder;
    rango_horario?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_incidente?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    ubicacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_via?: Prisma.SortOrderInput | Prisma.SortOrder;
    direccion_via?: Prisma.SortOrderInput | Prisma.SortOrder;
    lugar_incidente?: Prisma.SortOrderInput | Prisma.SortOrder;
    modelo_mr?: Prisma.SortOrderInput | Prisma.SortOrder;
    numero_mr?: Prisma.SortOrderInput | Prisma.SortOrder;
    numero_carrera?: Prisma.SortOrderInput | Prisma.SortOrder;
    personal_involucrado?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_causa?: Prisma.SortOrderInput | Prisma.SortOrder;
    posible_causa?: Prisma.SortOrderInput | Prisma.SortOrder;
    informacion_adicional?: Prisma.SortOrderInput | Prisma.SortOrder;
    camara_monitoreada?: Prisma.SortOrderInput | Prisma.SortOrder;
    demora?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrderInput | Prisma.SortOrder;
    asignado_a?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_caso_creado?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.eventos_monitoreoCountOrderByAggregateInput;
    _avg?: Prisma.eventos_monitoreoAvgOrderByAggregateInput;
    _max?: Prisma.eventos_monitoreoMaxOrderByAggregateInput;
    _min?: Prisma.eventos_monitoreoMinOrderByAggregateInput;
    _sum?: Prisma.eventos_monitoreoSumOrderByAggregateInput;
};
export type eventos_monitoreoScalarWhereWithAggregatesInput = {
    AND?: Prisma.eventos_monitoreoScalarWhereWithAggregatesInput | Prisma.eventos_monitoreoScalarWhereWithAggregatesInput[];
    OR?: Prisma.eventos_monitoreoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.eventos_monitoreoScalarWhereWithAggregatesInput | Prisma.eventos_monitoreoScalarWhereWithAggregatesInput[];
    id_evento?: Prisma.IntWithAggregatesFilter<"eventos_monitoreo"> | number;
    codigo_evento?: Prisma.StringNullableWithAggregatesFilter<"eventos_monitoreo"> | string | null;
    fecha?: Prisma.DateTimeWithAggregatesFilter<"eventos_monitoreo"> | Date | string;
    hora?: Prisma.DateTimeNullableWithAggregatesFilter<"eventos_monitoreo"> | Date | string | null;
    anio?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    mes?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    semana?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    dia?: Prisma.StringNullableWithAggregatesFilter<"eventos_monitoreo"> | string | null;
    rango_horario?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    tipo_incidente?: Prisma.IntWithAggregatesFilter<"eventos_monitoreo"> | number;
    descripcion?: Prisma.StringNullableWithAggregatesFilter<"eventos_monitoreo"> | string | null;
    ubicacion?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    tipo_via?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    direccion_via?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    lugar_incidente?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    modelo_mr?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    numero_mr?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    numero_carrera?: Prisma.StringNullableWithAggregatesFilter<"eventos_monitoreo"> | string | null;
    personal_involucrado?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    tipo_causa?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    posible_causa?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    informacion_adicional?: Prisma.StringNullableWithAggregatesFilter<"eventos_monitoreo"> | string | null;
    camara_monitoreada?: Prisma.StringNullableWithAggregatesFilter<"eventos_monitoreo"> | string | null;
    demora?: Prisma.DecimalNullableWithAggregatesFilter<"eventos_monitoreo"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringWithAggregatesFilter<"eventos_monitoreo"> | string;
    usuario_registra?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    asignado_a?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    id_caso_creado?: Prisma.IntNullableWithAggregatesFilter<"eventos_monitoreo"> | number | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"eventos_monitoreo"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"eventos_monitoreo"> | Date | string | null;
};
export type eventos_monitoreoCreateInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoUpdateInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoCreateManyInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoUpdateManyMutationInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Eventos_monitoreoNullableScalarRelationFilter = {
    is?: Prisma.eventos_monitoreoWhereInput | null;
    isNot?: Prisma.eventos_monitoreoWhereInput | null;
};
export type Eventos_monitoreoListRelationFilter = {
    every?: Prisma.eventos_monitoreoWhereInput;
    some?: Prisma.eventos_monitoreoWhereInput;
    none?: Prisma.eventos_monitoreoWhereInput;
};
export type eventos_monitoreoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type eventos_monitoreoCountOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    codigo_evento?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    hora?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    semana?: Prisma.SortOrder;
    dia?: Prisma.SortOrder;
    rango_horario?: Prisma.SortOrder;
    tipo_incidente?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrder;
    tipo_via?: Prisma.SortOrder;
    direccion_via?: Prisma.SortOrder;
    lugar_incidente?: Prisma.SortOrder;
    modelo_mr?: Prisma.SortOrder;
    numero_mr?: Prisma.SortOrder;
    numero_carrera?: Prisma.SortOrder;
    personal_involucrado?: Prisma.SortOrder;
    tipo_causa?: Prisma.SortOrder;
    posible_causa?: Prisma.SortOrder;
    informacion_adicional?: Prisma.SortOrder;
    camara_monitoreada?: Prisma.SortOrder;
    demora?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrder;
    asignado_a?: Prisma.SortOrder;
    id_caso_creado?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type eventos_monitoreoAvgOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    semana?: Prisma.SortOrder;
    rango_horario?: Prisma.SortOrder;
    tipo_incidente?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrder;
    tipo_via?: Prisma.SortOrder;
    direccion_via?: Prisma.SortOrder;
    lugar_incidente?: Prisma.SortOrder;
    modelo_mr?: Prisma.SortOrder;
    numero_mr?: Prisma.SortOrder;
    personal_involucrado?: Prisma.SortOrder;
    tipo_causa?: Prisma.SortOrder;
    posible_causa?: Prisma.SortOrder;
    demora?: Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrder;
    asignado_a?: Prisma.SortOrder;
    id_caso_creado?: Prisma.SortOrder;
};
export type eventos_monitoreoMaxOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    codigo_evento?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    hora?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    semana?: Prisma.SortOrder;
    dia?: Prisma.SortOrder;
    rango_horario?: Prisma.SortOrder;
    tipo_incidente?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrder;
    tipo_via?: Prisma.SortOrder;
    direccion_via?: Prisma.SortOrder;
    lugar_incidente?: Prisma.SortOrder;
    modelo_mr?: Prisma.SortOrder;
    numero_mr?: Prisma.SortOrder;
    numero_carrera?: Prisma.SortOrder;
    personal_involucrado?: Prisma.SortOrder;
    tipo_causa?: Prisma.SortOrder;
    posible_causa?: Prisma.SortOrder;
    informacion_adicional?: Prisma.SortOrder;
    camara_monitoreada?: Prisma.SortOrder;
    demora?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrder;
    asignado_a?: Prisma.SortOrder;
    id_caso_creado?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type eventos_monitoreoMinOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    codigo_evento?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    hora?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    semana?: Prisma.SortOrder;
    dia?: Prisma.SortOrder;
    rango_horario?: Prisma.SortOrder;
    tipo_incidente?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrder;
    tipo_via?: Prisma.SortOrder;
    direccion_via?: Prisma.SortOrder;
    lugar_incidente?: Prisma.SortOrder;
    modelo_mr?: Prisma.SortOrder;
    numero_mr?: Prisma.SortOrder;
    numero_carrera?: Prisma.SortOrder;
    personal_involucrado?: Prisma.SortOrder;
    tipo_causa?: Prisma.SortOrder;
    posible_causa?: Prisma.SortOrder;
    informacion_adicional?: Prisma.SortOrder;
    camara_monitoreada?: Prisma.SortOrder;
    demora?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrder;
    asignado_a?: Prisma.SortOrder;
    id_caso_creado?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type eventos_monitoreoSumOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    semana?: Prisma.SortOrder;
    rango_horario?: Prisma.SortOrder;
    tipo_incidente?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrder;
    tipo_via?: Prisma.SortOrder;
    direccion_via?: Prisma.SortOrder;
    lugar_incidente?: Prisma.SortOrder;
    modelo_mr?: Prisma.SortOrder;
    numero_mr?: Prisma.SortOrder;
    personal_involucrado?: Prisma.SortOrder;
    tipo_causa?: Prisma.SortOrder;
    posible_causa?: Prisma.SortOrder;
    demora?: Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrder;
    asignado_a?: Prisma.SortOrder;
    id_caso_creado?: Prisma.SortOrder;
};
export type eventos_monitoreoCreateNestedOneWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCasos_sopInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCasos_sopInput>;
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCasos_sopInput;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput;
};
export type eventos_monitoreoUncheckedCreateNestedOneWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCasos_sopInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCasos_sopInput>;
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCasos_sopInput;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput;
};
export type eventos_monitoreoUpdateOneWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCasos_sopInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCasos_sopInput>;
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCasos_sopInput;
    upsert?: Prisma.eventos_monitoreoUpsertWithoutCasos_sopInput;
    disconnect?: Prisma.eventos_monitoreoWhereInput | boolean;
    delete?: Prisma.eventos_monitoreoWhereInput | boolean;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.eventos_monitoreoUpdateToOneWithWhereWithoutCasos_sopInput, Prisma.eventos_monitoreoUpdateWithoutCasos_sopInput>, Prisma.eventos_monitoreoUncheckedUpdateWithoutCasos_sopInput>;
};
export type eventos_monitoreoUncheckedUpdateOneWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCasos_sopInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCasos_sopInput>;
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCasos_sopInput;
    upsert?: Prisma.eventos_monitoreoUpsertWithoutCasos_sopInput;
    disconnect?: Prisma.eventos_monitoreoWhereInput | boolean;
    delete?: Prisma.eventos_monitoreoWhereInput | boolean;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.eventos_monitoreoUpdateToOneWithWhereWithoutCasos_sopInput, Prisma.eventos_monitoreoUpdateWithoutCasos_sopInput>, Prisma.eventos_monitoreoUncheckedUpdateWithoutCasos_sopInput>;
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput> | Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput> | Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_usuario_registraTousuariosInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput> | Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_asignado_aTousuariosInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput> | Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_usuario_registraTousuariosInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUncheckedCreateNestedManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput> | Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_asignado_aTousuariosInputEnvelope;
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
};
export type eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput> | Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_usuario_registraTousuariosInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput> | Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_asignado_aTousuariosInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput> | Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_usuario_registraTousuariosInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput> | Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[] | Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    connectOrCreate?: Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    upsert?: Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    createMany?: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_asignado_aTousuariosInputEnvelope;
    set?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    disconnect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    delete?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    connect?: Prisma.eventos_monitoreoWhereUniqueInput | Prisma.eventos_monitoreoWhereUniqueInput[];
    update?: Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    updateMany?: Prisma.eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    deleteMany?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
};
export type eventos_monitoreoCreateWithoutCasos_sopInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCasos_sopInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCasos_sopInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCasos_sopInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCasos_sopInput>;
};
export type eventos_monitoreoUpsertWithoutCasos_sopInput = {
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCasos_sopInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCasos_sopInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCasos_sopInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCasos_sopInput>;
    where?: Prisma.eventos_monitoreoWhereInput;
};
export type eventos_monitoreoUpdateToOneWithWhereWithoutCasos_sopInput = {
    where?: Prisma.eventos_monitoreoWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCasos_sopInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCasos_sopInput>;
};
export type eventos_monitoreoUpdateWithoutCasos_sopInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCasos_sopInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput | Prisma.eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput>;
};
export type eventos_monitoreoScalarWhereInput = {
    AND?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
    OR?: Prisma.eventos_monitoreoScalarWhereInput[];
    NOT?: Prisma.eventos_monitoreoScalarWhereInput | Prisma.eventos_monitoreoScalarWhereInput[];
    id_evento?: Prisma.IntFilter<"eventos_monitoreo"> | number;
    codigo_evento?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    fecha?: Prisma.DateTimeFilter<"eventos_monitoreo"> | Date | string;
    hora?: Prisma.DateTimeNullableFilter<"eventos_monitoreo"> | Date | string | null;
    anio?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    mes?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    semana?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    dia?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    rango_horario?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    tipo_incidente?: Prisma.IntFilter<"eventos_monitoreo"> | number;
    descripcion?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    ubicacion?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    tipo_via?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    direccion_via?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    lugar_incidente?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    modelo_mr?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    numero_mr?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    numero_carrera?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    personal_involucrado?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    tipo_causa?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    posible_causa?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    informacion_adicional?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    camara_monitoreada?: Prisma.StringNullableFilter<"eventos_monitoreo"> | string | null;
    demora?: Prisma.DecimalNullableFilter<"eventos_monitoreo"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFilter<"eventos_monitoreo"> | string;
    usuario_registra?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    asignado_a?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    id_caso_creado?: Prisma.IntNullableFilter<"eventos_monitoreo"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"eventos_monitoreo"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"eventos_monitoreo"> | Date | string | null;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedCreateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput>;
};
export type eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput>;
};
export type eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_usuario_registraTousuariosInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_usuario_registraTousuariosInput | Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_usuario_registraTousuariosInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    descripcion?: string | null;
    numero_carrera?: string | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosInput;
    casos_sop?: Prisma.casos_sopCreateNestedOneWithoutEventos_monitoreoInput;
};
export type eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateOrConnectWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput>;
};
export type eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_asignado_aTousuariosInputEnvelope = {
    data: Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_asignado_aTousuariosInput | Prisma.eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_asignado_aTousuariosInput[];
    skipDuplicates?: boolean;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput>;
};
export type eventos_monitoreoUpsertWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput>;
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput, Prisma.eventos_monitoreoUncheckedCreateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput>;
};
export type eventos_monitoreoUpdateWithWhereUniqueWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput, Prisma.eventos_monitoreoUncheckedUpdateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput>;
};
export type eventos_monitoreoUpdateManyWithWhereWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    where: Prisma.eventos_monitoreoScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput>;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutCatalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    asignado_a?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoCreateManyUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    id_evento?: number;
    codigo_evento?: string | null;
    fecha: Date | string;
    hora?: Date | string | null;
    anio?: number | null;
    mes?: number | null;
    semana?: number | null;
    dia?: string | null;
    rango_horario?: number | null;
    tipo_incidente: number;
    descripcion?: string | null;
    ubicacion?: number | null;
    tipo_via?: number | null;
    direccion_via?: number | null;
    lugar_incidente?: number | null;
    modelo_mr?: number | null;
    numero_mr?: number | null;
    numero_carrera?: string | null;
    personal_involucrado?: number | null;
    tipo_causa?: number | null;
    posible_causa?: number | null;
    informacion_adicional?: string | null;
    camara_monitoreada?: string | null;
    demora?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: string;
    usuario_registra?: number | null;
    id_caso_creado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_monitoreoUpdateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_asignado_aTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_usuario_registraTousuariosInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asignado_a?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUpdateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_monitoreo_eventos_monitoreo_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_ubicacionTocatalogo_detalleNestedInput;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: Prisma.usuariosUpdateOneWithoutEventos_monitoreo_eventos_monitoreo_usuario_registraTousuariosNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneWithoutEventos_monitoreoNestedInput;
};
export type eventos_monitoreoUncheckedUpdateWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoUncheckedUpdateManyWithoutUsuarios_eventos_monitoreo_asignado_aTousuariosInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_evento?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hora?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    semana?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rango_horario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_incidente?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ubicacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    direccion_via?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lugar_incidente?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    modelo_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_mr?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    numero_carrera?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    personal_involucrado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    posible_causa?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    informacion_adicional?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    camara_monitoreada?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demora?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_caso_creado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_monitoreoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evento?: boolean;
    codigo_evento?: boolean;
    fecha?: boolean;
    hora?: boolean;
    anio?: boolean;
    mes?: boolean;
    semana?: boolean;
    dia?: boolean;
    rango_horario?: boolean;
    tipo_incidente?: boolean;
    descripcion?: boolean;
    ubicacion?: boolean;
    tipo_via?: boolean;
    direccion_via?: boolean;
    lugar_incidente?: boolean;
    modelo_mr?: boolean;
    numero_mr?: boolean;
    numero_carrera?: boolean;
    personal_involucrado?: boolean;
    tipo_causa?: boolean;
    posible_causa?: boolean;
    informacion_adicional?: boolean;
    camara_monitoreada?: boolean;
    demora?: boolean;
    estado?: boolean;
    usuario_registra?: boolean;
    asignado_a?: boolean;
    id_caso_creado?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.eventos_monitoreo$casos_sopArgs<ExtArgs>;
}, ExtArgs["result"]["eventos_monitoreo"]>;
export type eventos_monitoreoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evento?: boolean;
    codigo_evento?: boolean;
    fecha?: boolean;
    hora?: boolean;
    anio?: boolean;
    mes?: boolean;
    semana?: boolean;
    dia?: boolean;
    rango_horario?: boolean;
    tipo_incidente?: boolean;
    descripcion?: boolean;
    ubicacion?: boolean;
    tipo_via?: boolean;
    direccion_via?: boolean;
    lugar_incidente?: boolean;
    modelo_mr?: boolean;
    numero_mr?: boolean;
    numero_carrera?: boolean;
    personal_involucrado?: boolean;
    tipo_causa?: boolean;
    posible_causa?: boolean;
    informacion_adicional?: boolean;
    camara_monitoreada?: boolean;
    demora?: boolean;
    estado?: boolean;
    usuario_registra?: boolean;
    asignado_a?: boolean;
    id_caso_creado?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.eventos_monitoreo$casos_sopArgs<ExtArgs>;
}, ExtArgs["result"]["eventos_monitoreo"]>;
export type eventos_monitoreoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evento?: boolean;
    codigo_evento?: boolean;
    fecha?: boolean;
    hora?: boolean;
    anio?: boolean;
    mes?: boolean;
    semana?: boolean;
    dia?: boolean;
    rango_horario?: boolean;
    tipo_incidente?: boolean;
    descripcion?: boolean;
    ubicacion?: boolean;
    tipo_via?: boolean;
    direccion_via?: boolean;
    lugar_incidente?: boolean;
    modelo_mr?: boolean;
    numero_mr?: boolean;
    numero_carrera?: boolean;
    personal_involucrado?: boolean;
    tipo_causa?: boolean;
    posible_causa?: boolean;
    informacion_adicional?: boolean;
    camara_monitoreada?: boolean;
    demora?: boolean;
    estado?: boolean;
    usuario_registra?: boolean;
    asignado_a?: boolean;
    id_caso_creado?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.eventos_monitoreo$casos_sopArgs<ExtArgs>;
}, ExtArgs["result"]["eventos_monitoreo"]>;
export type eventos_monitoreoSelectScalar = {
    id_evento?: boolean;
    codigo_evento?: boolean;
    fecha?: boolean;
    hora?: boolean;
    anio?: boolean;
    mes?: boolean;
    semana?: boolean;
    dia?: boolean;
    rango_horario?: boolean;
    tipo_incidente?: boolean;
    descripcion?: boolean;
    ubicacion?: boolean;
    tipo_via?: boolean;
    direccion_via?: boolean;
    lugar_incidente?: boolean;
    modelo_mr?: boolean;
    numero_mr?: boolean;
    numero_carrera?: boolean;
    personal_involucrado?: boolean;
    tipo_causa?: boolean;
    posible_causa?: boolean;
    informacion_adicional?: boolean;
    camara_monitoreada?: boolean;
    demora?: boolean;
    estado?: boolean;
    usuario_registra?: boolean;
    asignado_a?: boolean;
    id_caso_creado?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type eventos_monitoreoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_evento" | "codigo_evento" | "fecha" | "hora" | "anio" | "mes" | "semana" | "dia" | "rango_horario" | "tipo_incidente" | "descripcion" | "ubicacion" | "tipo_via" | "direccion_via" | "lugar_incidente" | "modelo_mr" | "numero_mr" | "numero_carrera" | "personal_involucrado" | "tipo_causa" | "posible_causa" | "informacion_adicional" | "camara_monitoreada" | "demora" | "estado" | "usuario_registra" | "asignado_a" | "id_caso_creado" | "created_at" | "updated_at", ExtArgs["result"]["eventos_monitoreo"]>;
export type eventos_monitoreoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.eventos_monitoreo$casos_sopArgs<ExtArgs>;
};
export type eventos_monitoreoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.eventos_monitoreo$casos_sopArgs<ExtArgs>;
};
export type eventos_monitoreoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios_eventos_monitoreo_usuario_registraTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>;
    usuarios_eventos_monitoreo_asignado_aTousuarios?: boolean | Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.eventos_monitoreo$casos_sopArgs<ExtArgs>;
};
export type $eventos_monitoreoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "eventos_monitoreo";
    objects: {
        catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs>;
        catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        usuarios_eventos_monitoreo_usuario_registraTousuarios: Prisma.$usuariosPayload<ExtArgs> | null;
        usuarios_eventos_monitoreo_asignado_aTousuarios: Prisma.$usuariosPayload<ExtArgs> | null;
        casos_sop: Prisma.$casos_sopPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_evento: number;
        codigo_evento: string | null;
        fecha: Date;
        hora: Date | null;
        anio: number | null;
        mes: number | null;
        semana: number | null;
        dia: string | null;
        rango_horario: number | null;
        tipo_incidente: number;
        descripcion: string | null;
        ubicacion: number | null;
        tipo_via: number | null;
        direccion_via: number | null;
        lugar_incidente: number | null;
        modelo_mr: number | null;
        numero_mr: number | null;
        numero_carrera: string | null;
        personal_involucrado: number | null;
        tipo_causa: number | null;
        posible_causa: number | null;
        informacion_adicional: string | null;
        camara_monitoreada: string | null;
        demora: runtime.Decimal | null;
        /**
         * *
         *    * Solo 3 valores: "Registrado" (inicial), "En investigación" (asignado), "Cerrado" (planes de acción cerrados).
         */
        estado: string;
        usuario_registra: number | null;
        /**
         * * Persona de Seguridad Operativa a la que se le asignó el evento (ver EventoService.asignarEvento).
         */
        asignado_a: number | null;
        /**
         * * Caso SOP que se creó a partir de este evento (si ya se hizo el hallazgo). Único: un evento da como mucho un caso.
         */
        id_caso_creado: number | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["eventos_monitoreo"]>;
    composites: {};
};
export type eventos_monitoreoGetPayload<S extends boolean | null | undefined | eventos_monitoreoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload, S>;
export type eventos_monitoreoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<eventos_monitoreoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Eventos_monitoreoCountAggregateInputType | true;
};
export interface eventos_monitoreoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['eventos_monitoreo'];
        meta: {
            name: 'eventos_monitoreo';
        };
    };
    /**
     * Find zero or one Eventos_monitoreo that matches the filter.
     * @param {eventos_monitoreoFindUniqueArgs} args - Arguments to find a Eventos_monitoreo
     * @example
     * // Get one Eventos_monitoreo
     * const eventos_monitoreo = await prisma.eventos_monitoreo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends eventos_monitoreoFindUniqueArgs>(args: Prisma.SelectSubset<T, eventos_monitoreoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__eventos_monitoreoClient<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Eventos_monitoreo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {eventos_monitoreoFindUniqueOrThrowArgs} args - Arguments to find a Eventos_monitoreo
     * @example
     * // Get one Eventos_monitoreo
     * const eventos_monitoreo = await prisma.eventos_monitoreo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends eventos_monitoreoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, eventos_monitoreoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__eventos_monitoreoClient<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Eventos_monitoreo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_monitoreoFindFirstArgs} args - Arguments to find a Eventos_monitoreo
     * @example
     * // Get one Eventos_monitoreo
     * const eventos_monitoreo = await prisma.eventos_monitoreo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends eventos_monitoreoFindFirstArgs>(args?: Prisma.SelectSubset<T, eventos_monitoreoFindFirstArgs<ExtArgs>>): Prisma.Prisma__eventos_monitoreoClient<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Eventos_monitoreo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_monitoreoFindFirstOrThrowArgs} args - Arguments to find a Eventos_monitoreo
     * @example
     * // Get one Eventos_monitoreo
     * const eventos_monitoreo = await prisma.eventos_monitoreo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends eventos_monitoreoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, eventos_monitoreoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__eventos_monitoreoClient<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Eventos_monitoreos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_monitoreoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eventos_monitoreos
     * const eventos_monitoreos = await prisma.eventos_monitoreo.findMany()
     *
     * // Get first 10 Eventos_monitoreos
     * const eventos_monitoreos = await prisma.eventos_monitoreo.findMany({ take: 10 })
     *
     * // Only select the `id_evento`
     * const eventos_monitoreoWithId_eventoOnly = await prisma.eventos_monitoreo.findMany({ select: { id_evento: true } })
     *
     */
    findMany<T extends eventos_monitoreoFindManyArgs>(args?: Prisma.SelectSubset<T, eventos_monitoreoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Eventos_monitoreo.
     * @param {eventos_monitoreoCreateArgs} args - Arguments to create a Eventos_monitoreo.
     * @example
     * // Create one Eventos_monitoreo
     * const Eventos_monitoreo = await prisma.eventos_monitoreo.create({
     *   data: {
     *     // ... data to create a Eventos_monitoreo
     *   }
     * })
     *
     */
    create<T extends eventos_monitoreoCreateArgs>(args: Prisma.SelectSubset<T, eventos_monitoreoCreateArgs<ExtArgs>>): Prisma.Prisma__eventos_monitoreoClient<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Eventos_monitoreos.
     * @param {eventos_monitoreoCreateManyArgs} args - Arguments to create many Eventos_monitoreos.
     * @example
     * // Create many Eventos_monitoreos
     * const eventos_monitoreo = await prisma.eventos_monitoreo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends eventos_monitoreoCreateManyArgs>(args?: Prisma.SelectSubset<T, eventos_monitoreoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Eventos_monitoreos and returns the data saved in the database.
     * @param {eventos_monitoreoCreateManyAndReturnArgs} args - Arguments to create many Eventos_monitoreos.
     * @example
     * // Create many Eventos_monitoreos
     * const eventos_monitoreo = await prisma.eventos_monitoreo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Eventos_monitoreos and only return the `id_evento`
     * const eventos_monitoreoWithId_eventoOnly = await prisma.eventos_monitoreo.createManyAndReturn({
     *   select: { id_evento: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends eventos_monitoreoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, eventos_monitoreoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Eventos_monitoreo.
     * @param {eventos_monitoreoDeleteArgs} args - Arguments to delete one Eventos_monitoreo.
     * @example
     * // Delete one Eventos_monitoreo
     * const Eventos_monitoreo = await prisma.eventos_monitoreo.delete({
     *   where: {
     *     // ... filter to delete one Eventos_monitoreo
     *   }
     * })
     *
     */
    delete<T extends eventos_monitoreoDeleteArgs>(args: Prisma.SelectSubset<T, eventos_monitoreoDeleteArgs<ExtArgs>>): Prisma.Prisma__eventos_monitoreoClient<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Eventos_monitoreo.
     * @param {eventos_monitoreoUpdateArgs} args - Arguments to update one Eventos_monitoreo.
     * @example
     * // Update one Eventos_monitoreo
     * const eventos_monitoreo = await prisma.eventos_monitoreo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends eventos_monitoreoUpdateArgs>(args: Prisma.SelectSubset<T, eventos_monitoreoUpdateArgs<ExtArgs>>): Prisma.Prisma__eventos_monitoreoClient<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Eventos_monitoreos.
     * @param {eventos_monitoreoDeleteManyArgs} args - Arguments to filter Eventos_monitoreos to delete.
     * @example
     * // Delete a few Eventos_monitoreos
     * const { count } = await prisma.eventos_monitoreo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends eventos_monitoreoDeleteManyArgs>(args?: Prisma.SelectSubset<T, eventos_monitoreoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Eventos_monitoreos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_monitoreoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eventos_monitoreos
     * const eventos_monitoreo = await prisma.eventos_monitoreo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends eventos_monitoreoUpdateManyArgs>(args: Prisma.SelectSubset<T, eventos_monitoreoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Eventos_monitoreos and returns the data updated in the database.
     * @param {eventos_monitoreoUpdateManyAndReturnArgs} args - Arguments to update many Eventos_monitoreos.
     * @example
     * // Update many Eventos_monitoreos
     * const eventos_monitoreo = await prisma.eventos_monitoreo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Eventos_monitoreos and only return the `id_evento`
     * const eventos_monitoreoWithId_eventoOnly = await prisma.eventos_monitoreo.updateManyAndReturn({
     *   select: { id_evento: true },
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
    updateManyAndReturn<T extends eventos_monitoreoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, eventos_monitoreoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Eventos_monitoreo.
     * @param {eventos_monitoreoUpsertArgs} args - Arguments to update or create a Eventos_monitoreo.
     * @example
     * // Update or create a Eventos_monitoreo
     * const eventos_monitoreo = await prisma.eventos_monitoreo.upsert({
     *   create: {
     *     // ... data to create a Eventos_monitoreo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eventos_monitoreo we want to update
     *   }
     * })
     */
    upsert<T extends eventos_monitoreoUpsertArgs>(args: Prisma.SelectSubset<T, eventos_monitoreoUpsertArgs<ExtArgs>>): Prisma.Prisma__eventos_monitoreoClient<runtime.Types.Result.GetResult<Prisma.$eventos_monitoreoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Eventos_monitoreos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_monitoreoCountArgs} args - Arguments to filter Eventos_monitoreos to count.
     * @example
     * // Count the number of Eventos_monitoreos
     * const count = await prisma.eventos_monitoreo.count({
     *   where: {
     *     // ... the filter for the Eventos_monitoreos we want to count
     *   }
     * })
    **/
    count<T extends eventos_monitoreoCountArgs>(args?: Prisma.Subset<T, eventos_monitoreoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Eventos_monitoreoCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Eventos_monitoreo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eventos_monitoreoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Eventos_monitoreoAggregateArgs>(args: Prisma.Subset<T, Eventos_monitoreoAggregateArgs>): Prisma.PrismaPromise<GetEventos_monitoreoAggregateType<T>>;
    /**
     * Group by Eventos_monitoreo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_monitoreoGroupByArgs} args - Group by arguments.
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
    groupBy<T extends eventos_monitoreoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: eventos_monitoreoGroupByArgs['orderBy'];
    } : {
        orderBy?: eventos_monitoreoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, eventos_monitoreoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventos_monitoreoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the eventos_monitoreo model
     */
    readonly fields: eventos_monitoreoFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for eventos_monitoreo.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__eventos_monitoreoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle<T extends Prisma.catalogo_detalleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.catalogo_detalleDefaultArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle<T extends Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios_eventos_monitoreo_usuario_registraTousuarios<T extends Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios_eventos_monitoreo_asignado_aTousuarios<T extends Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$usuarios_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    casos_sop<T extends Prisma.eventos_monitoreo$casos_sopArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_monitoreo$casos_sopArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the eventos_monitoreo model
 */
export interface eventos_monitoreoFieldRefs {
    readonly id_evento: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly codigo_evento: Prisma.FieldRef<"eventos_monitoreo", 'String'>;
    readonly fecha: Prisma.FieldRef<"eventos_monitoreo", 'DateTime'>;
    readonly hora: Prisma.FieldRef<"eventos_monitoreo", 'DateTime'>;
    readonly anio: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly mes: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly semana: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly dia: Prisma.FieldRef<"eventos_monitoreo", 'String'>;
    readonly rango_horario: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly tipo_incidente: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly descripcion: Prisma.FieldRef<"eventos_monitoreo", 'String'>;
    readonly ubicacion: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly tipo_via: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly direccion_via: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly lugar_incidente: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly modelo_mr: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly numero_mr: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly numero_carrera: Prisma.FieldRef<"eventos_monitoreo", 'String'>;
    readonly personal_involucrado: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly tipo_causa: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly posible_causa: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly informacion_adicional: Prisma.FieldRef<"eventos_monitoreo", 'String'>;
    readonly camara_monitoreada: Prisma.FieldRef<"eventos_monitoreo", 'String'>;
    readonly demora: Prisma.FieldRef<"eventos_monitoreo", 'Decimal'>;
    readonly estado: Prisma.FieldRef<"eventos_monitoreo", 'String'>;
    readonly usuario_registra: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly asignado_a: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly id_caso_creado: Prisma.FieldRef<"eventos_monitoreo", 'Int'>;
    readonly created_at: Prisma.FieldRef<"eventos_monitoreo", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"eventos_monitoreo", 'DateTime'>;
}
/**
 * eventos_monitoreo findUnique
 */
export type eventos_monitoreoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_monitoreo to fetch.
     */
    where: Prisma.eventos_monitoreoWhereUniqueInput;
};
/**
 * eventos_monitoreo findUniqueOrThrow
 */
export type eventos_monitoreoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_monitoreo to fetch.
     */
    where: Prisma.eventos_monitoreoWhereUniqueInput;
};
/**
 * eventos_monitoreo findFirst
 */
export type eventos_monitoreoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_monitoreo to fetch.
     */
    where?: Prisma.eventos_monitoreoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of eventos_monitoreos to fetch.
     */
    orderBy?: Prisma.eventos_monitoreoOrderByWithRelationInput | Prisma.eventos_monitoreoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for eventos_monitoreos.
     */
    cursor?: Prisma.eventos_monitoreoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` eventos_monitoreos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` eventos_monitoreos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of eventos_monitoreos.
     */
    distinct?: Prisma.Eventos_monitoreoScalarFieldEnum | Prisma.Eventos_monitoreoScalarFieldEnum[];
};
/**
 * eventos_monitoreo findFirstOrThrow
 */
export type eventos_monitoreoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_monitoreo to fetch.
     */
    where?: Prisma.eventos_monitoreoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of eventos_monitoreos to fetch.
     */
    orderBy?: Prisma.eventos_monitoreoOrderByWithRelationInput | Prisma.eventos_monitoreoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for eventos_monitoreos.
     */
    cursor?: Prisma.eventos_monitoreoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` eventos_monitoreos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` eventos_monitoreos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of eventos_monitoreos.
     */
    distinct?: Prisma.Eventos_monitoreoScalarFieldEnum | Prisma.Eventos_monitoreoScalarFieldEnum[];
};
/**
 * eventos_monitoreo findMany
 */
export type eventos_monitoreoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_monitoreos to fetch.
     */
    where?: Prisma.eventos_monitoreoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of eventos_monitoreos to fetch.
     */
    orderBy?: Prisma.eventos_monitoreoOrderByWithRelationInput | Prisma.eventos_monitoreoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing eventos_monitoreos.
     */
    cursor?: Prisma.eventos_monitoreoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` eventos_monitoreos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` eventos_monitoreos.
     */
    skip?: number;
    distinct?: Prisma.Eventos_monitoreoScalarFieldEnum | Prisma.Eventos_monitoreoScalarFieldEnum[];
};
/**
 * eventos_monitoreo create
 */
export type eventos_monitoreoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a eventos_monitoreo.
     */
    data: Prisma.XOR<Prisma.eventos_monitoreoCreateInput, Prisma.eventos_monitoreoUncheckedCreateInput>;
};
/**
 * eventos_monitoreo createMany
 */
export type eventos_monitoreoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many eventos_monitoreos.
     */
    data: Prisma.eventos_monitoreoCreateManyInput | Prisma.eventos_monitoreoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * eventos_monitoreo createManyAndReturn
 */
export type eventos_monitoreoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos_monitoreo
     */
    select?: Prisma.eventos_monitoreoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the eventos_monitoreo
     */
    omit?: Prisma.eventos_monitoreoOmit<ExtArgs> | null;
    /**
     * The data used to create many eventos_monitoreos.
     */
    data: Prisma.eventos_monitoreoCreateManyInput | Prisma.eventos_monitoreoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.eventos_monitoreoIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * eventos_monitoreo update
 */
export type eventos_monitoreoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a eventos_monitoreo.
     */
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateInput, Prisma.eventos_monitoreoUncheckedUpdateInput>;
    /**
     * Choose, which eventos_monitoreo to update.
     */
    where: Prisma.eventos_monitoreoWhereUniqueInput;
};
/**
 * eventos_monitoreo updateMany
 */
export type eventos_monitoreoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update eventos_monitoreos.
     */
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyInput>;
    /**
     * Filter which eventos_monitoreos to update
     */
    where?: Prisma.eventos_monitoreoWhereInput;
    /**
     * Limit how many eventos_monitoreos to update.
     */
    limit?: number;
};
/**
 * eventos_monitoreo updateManyAndReturn
 */
export type eventos_monitoreoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos_monitoreo
     */
    select?: Prisma.eventos_monitoreoSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the eventos_monitoreo
     */
    omit?: Prisma.eventos_monitoreoOmit<ExtArgs> | null;
    /**
     * The data used to update eventos_monitoreos.
     */
    data: Prisma.XOR<Prisma.eventos_monitoreoUpdateManyMutationInput, Prisma.eventos_monitoreoUncheckedUpdateManyInput>;
    /**
     * Filter which eventos_monitoreos to update
     */
    where?: Prisma.eventos_monitoreoWhereInput;
    /**
     * Limit how many eventos_monitoreos to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.eventos_monitoreoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * eventos_monitoreo upsert
 */
export type eventos_monitoreoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the eventos_monitoreo to update in case it exists.
     */
    where: Prisma.eventos_monitoreoWhereUniqueInput;
    /**
     * In case the eventos_monitoreo found by the `where` argument doesn't exist, create a new eventos_monitoreo with this data.
     */
    create: Prisma.XOR<Prisma.eventos_monitoreoCreateInput, Prisma.eventos_monitoreoUncheckedCreateInput>;
    /**
     * In case the eventos_monitoreo was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.eventos_monitoreoUpdateInput, Prisma.eventos_monitoreoUncheckedUpdateInput>;
};
/**
 * eventos_monitoreo delete
 */
export type eventos_monitoreoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which eventos_monitoreo to delete.
     */
    where: Prisma.eventos_monitoreoWhereUniqueInput;
};
/**
 * eventos_monitoreo deleteMany
 */
export type eventos_monitoreoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which eventos_monitoreos to delete
     */
    where?: Prisma.eventos_monitoreoWhereInput;
    /**
     * Limit how many eventos_monitoreos to delete.
     */
    limit?: number;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle
 */
export type eventos_monitoreo$catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
};
/**
 * eventos_monitoreo.usuarios_eventos_monitoreo_usuario_registraTousuarios
 */
export type eventos_monitoreo$usuarios_eventos_monitoreo_usuario_registraTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.usuariosWhereInput;
};
/**
 * eventos_monitoreo.usuarios_eventos_monitoreo_asignado_aTousuarios
 */
export type eventos_monitoreo$usuarios_eventos_monitoreo_asignado_aTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.usuariosWhereInput;
};
/**
 * eventos_monitoreo.casos_sop
 */
export type eventos_monitoreo$casos_sopArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * eventos_monitoreo without action
 */
export type eventos_monitoreoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=eventos_monitoreo.d.ts.map