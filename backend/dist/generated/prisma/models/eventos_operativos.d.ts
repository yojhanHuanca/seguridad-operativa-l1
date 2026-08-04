import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model eventos_operativos
 *
 */
export type eventos_operativosModel = runtime.Types.Result.DefaultSelection<Prisma.$eventos_operativosPayload>;
export type AggregateEventos_operativos = {
    _count: Eventos_operativosCountAggregateOutputType | null;
    _avg: Eventos_operativosAvgAggregateOutputType | null;
    _sum: Eventos_operativosSumAggregateOutputType | null;
    _min: Eventos_operativosMinAggregateOutputType | null;
    _max: Eventos_operativosMaxAggregateOutputType | null;
};
export type Eventos_operativosAvgAggregateOutputType = {
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
    estado: number | null;
    usuario_registra: number | null;
};
export type Eventos_operativosSumAggregateOutputType = {
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
    estado: number | null;
    usuario_registra: number | null;
};
export type Eventos_operativosMinAggregateOutputType = {
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
    estado: number | null;
    usuario_registra: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Eventos_operativosMaxAggregateOutputType = {
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
    estado: number | null;
    usuario_registra: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Eventos_operativosCountAggregateOutputType = {
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
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Eventos_operativosAvgAggregateInputType = {
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
    estado?: true;
    usuario_registra?: true;
};
export type Eventos_operativosSumAggregateInputType = {
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
    estado?: true;
    usuario_registra?: true;
};
export type Eventos_operativosMinAggregateInputType = {
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
    created_at?: true;
    updated_at?: true;
};
export type Eventos_operativosMaxAggregateInputType = {
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
    created_at?: true;
    updated_at?: true;
};
export type Eventos_operativosCountAggregateInputType = {
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
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Eventos_operativosAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which eventos_operativos to aggregate.
     */
    where?: Prisma.eventos_operativosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of eventos_operativos to fetch.
     */
    orderBy?: Prisma.eventos_operativosOrderByWithRelationInput | Prisma.eventos_operativosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.eventos_operativosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` eventos_operativos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` eventos_operativos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned eventos_operativos
    **/
    _count?: true | Eventos_operativosCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Eventos_operativosAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Eventos_operativosSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Eventos_operativosMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Eventos_operativosMaxAggregateInputType;
};
export type GetEventos_operativosAggregateType<T extends Eventos_operativosAggregateArgs> = {
    [P in keyof T & keyof AggregateEventos_operativos]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEventos_operativos[P]> : Prisma.GetScalarType<T[P], AggregateEventos_operativos[P]>;
};
export type eventos_operativosGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.eventos_operativosWhereInput;
    orderBy?: Prisma.eventos_operativosOrderByWithAggregationInput | Prisma.eventos_operativosOrderByWithAggregationInput[];
    by: Prisma.Eventos_operativosScalarFieldEnum[] | Prisma.Eventos_operativosScalarFieldEnum;
    having?: Prisma.eventos_operativosScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Eventos_operativosCountAggregateInputType | true;
    _avg?: Eventos_operativosAvgAggregateInputType;
    _sum?: Eventos_operativosSumAggregateInputType;
    _min?: Eventos_operativosMinAggregateInputType;
    _max?: Eventos_operativosMaxAggregateInputType;
};
export type Eventos_operativosGroupByOutputType = {
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
    estado: number | null;
    usuario_registra: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Eventos_operativosCountAggregateOutputType | null;
    _avg: Eventos_operativosAvgAggregateOutputType | null;
    _sum: Eventos_operativosSumAggregateOutputType | null;
    _min: Eventos_operativosMinAggregateOutputType | null;
    _max: Eventos_operativosMaxAggregateOutputType | null;
};
type GetEventos_operativosGroupByPayload<T extends eventos_operativosGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Eventos_operativosGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Eventos_operativosGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Eventos_operativosGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Eventos_operativosGroupByOutputType[P]>;
}>>;
export type eventos_operativosWhereInput = {
    AND?: Prisma.eventos_operativosWhereInput | Prisma.eventos_operativosWhereInput[];
    OR?: Prisma.eventos_operativosWhereInput[];
    NOT?: Prisma.eventos_operativosWhereInput | Prisma.eventos_operativosWhereInput[];
    id_evento?: Prisma.IntFilter<"eventos_operativos"> | number;
    codigo_evento?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    fecha?: Prisma.DateTimeFilter<"eventos_operativos"> | Date | string;
    hora?: Prisma.DateTimeNullableFilter<"eventos_operativos"> | Date | string | null;
    anio?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    mes?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    semana?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    dia?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    rango_horario?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    tipo_incidente?: Prisma.IntFilter<"eventos_operativos"> | number;
    descripcion?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    ubicacion?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    tipo_via?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    direccion_via?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    lugar_incidente?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    modelo_mr?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    numero_mr?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    numero_carrera?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    personal_involucrado?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    tipo_causa?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    posible_causa?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    informacion_adicional?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    camara_monitoreada?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    demora?: Prisma.DecimalNullableFilter<"eventos_operativos"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    usuario_registra?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"eventos_operativos"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"eventos_operativos"> | Date | string | null;
    evento_caso?: Prisma.Evento_casoListRelationFilter;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    evidencias_evento?: Prisma.Evidencias_eventoListRelationFilter;
};
export type eventos_operativosOrderByWithRelationInput = {
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
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    evento_caso?: Prisma.evento_casoOrderByRelationAggregateInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
    evidencias_evento?: Prisma.evidencias_eventoOrderByRelationAggregateInput;
};
export type eventos_operativosWhereUniqueInput = Prisma.AtLeast<{
    id_evento?: number;
    codigo_evento?: string;
    AND?: Prisma.eventos_operativosWhereInput | Prisma.eventos_operativosWhereInput[];
    OR?: Prisma.eventos_operativosWhereInput[];
    NOT?: Prisma.eventos_operativosWhereInput | Prisma.eventos_operativosWhereInput[];
    fecha?: Prisma.DateTimeFilter<"eventos_operativos"> | Date | string;
    hora?: Prisma.DateTimeNullableFilter<"eventos_operativos"> | Date | string | null;
    anio?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    mes?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    semana?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    dia?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    rango_horario?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    tipo_incidente?: Prisma.IntFilter<"eventos_operativos"> | number;
    descripcion?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    ubicacion?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    tipo_via?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    direccion_via?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    lugar_incidente?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    modelo_mr?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    numero_mr?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    numero_carrera?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    personal_involucrado?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    tipo_causa?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    posible_causa?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    informacion_adicional?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    camara_monitoreada?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    demora?: Prisma.DecimalNullableFilter<"eventos_operativos"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    usuario_registra?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"eventos_operativos"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"eventos_operativos"> | Date | string | null;
    evento_caso?: Prisma.Evento_casoListRelationFilter;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    evidencias_evento?: Prisma.Evidencias_eventoListRelationFilter;
}, "id_evento" | "codigo_evento">;
export type eventos_operativosOrderByWithAggregationInput = {
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
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.eventos_operativosCountOrderByAggregateInput;
    _avg?: Prisma.eventos_operativosAvgOrderByAggregateInput;
    _max?: Prisma.eventos_operativosMaxOrderByAggregateInput;
    _min?: Prisma.eventos_operativosMinOrderByAggregateInput;
    _sum?: Prisma.eventos_operativosSumOrderByAggregateInput;
};
export type eventos_operativosScalarWhereWithAggregatesInput = {
    AND?: Prisma.eventos_operativosScalarWhereWithAggregatesInput | Prisma.eventos_operativosScalarWhereWithAggregatesInput[];
    OR?: Prisma.eventos_operativosScalarWhereWithAggregatesInput[];
    NOT?: Prisma.eventos_operativosScalarWhereWithAggregatesInput | Prisma.eventos_operativosScalarWhereWithAggregatesInput[];
    id_evento?: Prisma.IntWithAggregatesFilter<"eventos_operativos"> | number;
    codigo_evento?: Prisma.StringNullableWithAggregatesFilter<"eventos_operativos"> | string | null;
    fecha?: Prisma.DateTimeWithAggregatesFilter<"eventos_operativos"> | Date | string;
    hora?: Prisma.DateTimeNullableWithAggregatesFilter<"eventos_operativos"> | Date | string | null;
    anio?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    mes?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    semana?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    dia?: Prisma.StringNullableWithAggregatesFilter<"eventos_operativos"> | string | null;
    rango_horario?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    tipo_incidente?: Prisma.IntWithAggregatesFilter<"eventos_operativos"> | number;
    descripcion?: Prisma.StringNullableWithAggregatesFilter<"eventos_operativos"> | string | null;
    ubicacion?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    tipo_via?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    direccion_via?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    lugar_incidente?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    modelo_mr?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    numero_mr?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    numero_carrera?: Prisma.StringNullableWithAggregatesFilter<"eventos_operativos"> | string | null;
    personal_involucrado?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    tipo_causa?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    posible_causa?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    informacion_adicional?: Prisma.StringNullableWithAggregatesFilter<"eventos_operativos"> | string | null;
    camara_monitoreada?: Prisma.StringNullableWithAggregatesFilter<"eventos_operativos"> | string | null;
    demora?: Prisma.DecimalNullableWithAggregatesFilter<"eventos_operativos"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    usuario_registra?: Prisma.IntNullableWithAggregatesFilter<"eventos_operativos"> | number | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"eventos_operativos"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"eventos_operativos"> | Date | string | null;
};
export type eventos_operativosCreateInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUpdateInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosCreateManyInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosUpdateManyMutationInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUncheckedUpdateManyInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Eventos_operativosListRelationFilter = {
    every?: Prisma.eventos_operativosWhereInput;
    some?: Prisma.eventos_operativosWhereInput;
    none?: Prisma.eventos_operativosWhereInput;
};
export type eventos_operativosOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type Eventos_operativosScalarRelationFilter = {
    is?: Prisma.eventos_operativosWhereInput;
    isNot?: Prisma.eventos_operativosWhereInput;
};
export type eventos_operativosCountOrderByAggregateInput = {
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
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type eventos_operativosAvgOrderByAggregateInput = {
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
    estado?: Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrder;
};
export type eventos_operativosMaxOrderByAggregateInput = {
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
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type eventos_operativosMinOrderByAggregateInput = {
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
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type eventos_operativosSumOrderByAggregateInput = {
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
    estado?: Prisma.SortOrder;
    usuario_registra?: Prisma.SortOrder;
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUpdateManyWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput> | Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[] | Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    createMany?: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosCreateNestedOneWithoutEvento_casoInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutEvento_casoInput, Prisma.eventos_operativosUncheckedCreateWithoutEvento_casoInput>;
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutEvento_casoInput;
    connect?: Prisma.eventos_operativosWhereUniqueInput;
};
export type eventos_operativosUpdateOneRequiredWithoutEvento_casoNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutEvento_casoInput, Prisma.eventos_operativosUncheckedCreateWithoutEvento_casoInput>;
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutEvento_casoInput;
    upsert?: Prisma.eventos_operativosUpsertWithoutEvento_casoInput;
    connect?: Prisma.eventos_operativosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.eventos_operativosUpdateToOneWithWhereWithoutEvento_casoInput, Prisma.eventos_operativosUpdateWithoutEvento_casoInput>, Prisma.eventos_operativosUncheckedUpdateWithoutEvento_casoInput>;
};
export type eventos_operativosCreateNestedOneWithoutEvidencias_eventoInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutEvidencias_eventoInput, Prisma.eventos_operativosUncheckedCreateWithoutEvidencias_eventoInput>;
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutEvidencias_eventoInput;
    connect?: Prisma.eventos_operativosWhereUniqueInput;
};
export type eventos_operativosUpdateOneRequiredWithoutEvidencias_eventoNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutEvidencias_eventoInput, Prisma.eventos_operativosUncheckedCreateWithoutEvidencias_eventoInput>;
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutEvidencias_eventoInput;
    upsert?: Prisma.eventos_operativosUpsertWithoutEvidencias_eventoInput;
    connect?: Prisma.eventos_operativosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.eventos_operativosUpdateToOneWithWhereWithoutEvidencias_eventoInput, Prisma.eventos_operativosUpdateWithoutEvidencias_eventoInput>, Prisma.eventos_operativosUncheckedUpdateWithoutEvidencias_eventoInput>;
};
export type eventos_operativosCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutUsuariosInput, Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput> | Prisma.eventos_operativosCreateWithoutUsuariosInput[] | Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutUsuariosInput | Prisma.eventos_operativosCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.eventos_operativosCreateManyUsuariosInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutUsuariosInput, Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput> | Prisma.eventos_operativosCreateWithoutUsuariosInput[] | Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutUsuariosInput | Prisma.eventos_operativosCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.eventos_operativosCreateManyUsuariosInputEnvelope;
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
};
export type eventos_operativosUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutUsuariosInput, Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput> | Prisma.eventos_operativosCreateWithoutUsuariosInput[] | Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutUsuariosInput | Prisma.eventos_operativosCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.eventos_operativosCreateManyUsuariosInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutUsuariosInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.eventos_operativosCreateWithoutUsuariosInput, Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput> | Prisma.eventos_operativosCreateWithoutUsuariosInput[] | Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.eventos_operativosCreateOrConnectWithoutUsuariosInput | Prisma.eventos_operativosCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.eventos_operativosUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.eventos_operativosUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.eventos_operativosCreateManyUsuariosInputEnvelope;
    set?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    disconnect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    delete?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    connect?: Prisma.eventos_operativosWhereUniqueInput | Prisma.eventos_operativosWhereUniqueInput[];
    update?: Prisma.eventos_operativosUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.eventos_operativosUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.eventos_operativosUpdateManyWithWhereWithoutUsuariosInput | Prisma.eventos_operativosUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
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
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput | Prisma.eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput>;
};
export type eventos_operativosScalarWhereInput = {
    AND?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
    OR?: Prisma.eventos_operativosScalarWhereInput[];
    NOT?: Prisma.eventos_operativosScalarWhereInput | Prisma.eventos_operativosScalarWhereInput[];
    id_evento?: Prisma.IntFilter<"eventos_operativos"> | number;
    codigo_evento?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    fecha?: Prisma.DateTimeFilter<"eventos_operativos"> | Date | string;
    hora?: Prisma.DateTimeNullableFilter<"eventos_operativos"> | Date | string | null;
    anio?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    mes?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    semana?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    dia?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    rango_horario?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    tipo_incidente?: Prisma.IntFilter<"eventos_operativos"> | number;
    descripcion?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    ubicacion?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    tipo_via?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    direccion_via?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    lugar_incidente?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    modelo_mr?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    numero_mr?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    numero_carrera?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    personal_involucrado?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    tipo_causa?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    posible_causa?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    informacion_adicional?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    camara_monitoreada?: Prisma.StringNullableFilter<"eventos_operativos"> | string | null;
    demora?: Prisma.DecimalNullableFilter<"eventos_operativos"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    usuario_registra?: Prisma.IntNullableFilter<"eventos_operativos"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"eventos_operativos"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"eventos_operativos"> | Date | string | null;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput>;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedCreateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput, Prisma.eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput>;
};
export type eventos_operativosCreateWithoutEvento_casoInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutEvento_casoInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutEvento_casoInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutEvento_casoInput, Prisma.eventos_operativosUncheckedCreateWithoutEvento_casoInput>;
};
export type eventos_operativosUpsertWithoutEvento_casoInput = {
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutEvento_casoInput, Prisma.eventos_operativosUncheckedUpdateWithoutEvento_casoInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutEvento_casoInput, Prisma.eventos_operativosUncheckedCreateWithoutEvento_casoInput>;
    where?: Prisma.eventos_operativosWhereInput;
};
export type eventos_operativosUpdateToOneWithWhereWithoutEvento_casoInput = {
    where?: Prisma.eventos_operativosWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutEvento_casoInput, Prisma.eventos_operativosUncheckedUpdateWithoutEvento_casoInput>;
};
export type eventos_operativosUpdateWithoutEvento_casoInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutEvento_casoInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosCreateWithoutEvidencias_eventoInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutEvidencias_eventoInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutEvidencias_eventoInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutEvidencias_eventoInput, Prisma.eventos_operativosUncheckedCreateWithoutEvidencias_eventoInput>;
};
export type eventos_operativosUpsertWithoutEvidencias_eventoInput = {
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutEvidencias_eventoInput, Prisma.eventos_operativosUncheckedUpdateWithoutEvidencias_eventoInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutEvidencias_eventoInput, Prisma.eventos_operativosUncheckedCreateWithoutEvidencias_eventoInput>;
    where?: Prisma.eventos_operativosWhereInput;
};
export type eventos_operativosUpdateToOneWithWhereWithoutEvidencias_eventoInput = {
    where?: Prisma.eventos_operativosWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutEvidencias_eventoInput, Prisma.eventos_operativosUncheckedUpdateWithoutEvidencias_eventoInput>;
};
export type eventos_operativosUpdateWithoutEvidencias_eventoInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutEvidencias_eventoInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosCreateWithoutUsuariosInput = {
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
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutEventos_operativosInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleInput;
    evidencias_evento?: Prisma.evidencias_eventoCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosUncheckedCreateWithoutUsuariosInput = {
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
    estado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput;
};
export type eventos_operativosCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutUsuariosInput, Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput>;
};
export type eventos_operativosCreateManyUsuariosInputEnvelope = {
    data: Prisma.eventos_operativosCreateManyUsuariosInput | Prisma.eventos_operativosCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type eventos_operativosUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    update: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutUsuariosInput, Prisma.eventos_operativosUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.eventos_operativosCreateWithoutUsuariosInput, Prisma.eventos_operativosUncheckedCreateWithoutUsuariosInput>;
};
export type eventos_operativosUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.eventos_operativosWhereUniqueInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateWithoutUsuariosInput, Prisma.eventos_operativosUncheckedUpdateWithoutUsuariosInput>;
};
export type eventos_operativosUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.eventos_operativosScalarWhereInput;
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyWithoutUsuariosInput>;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
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
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosCreateManyCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
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
    estado?: number | null;
    usuario_registra?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
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
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_estadoTocatalogo_detalleInput = {
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
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosUpdateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutCatalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_registra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type eventos_operativosCreateManyUsuariosInput = {
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
    estado?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type eventos_operativosUpdateWithoutUsuariosInput = {
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
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutEventos_operativosNestedInput;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_direccion_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_estadoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_lugar_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_modelo_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_numero_mrTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_personal_involucradoTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_posible_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_rango_horarioTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutEventos_operativos_eventos_operativos_tipo_incidenteTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_causaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_tipo_viaTocatalogo_detalleNestedInput;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutEventos_operativos_eventos_operativos_ubicacionTocatalogo_detalleNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateWithoutUsuariosInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
    evidencias_evento?: Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput;
};
export type eventos_operativosUncheckedUpdateManyWithoutUsuariosInput = {
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
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type Eventos_operativosCountOutputType
 */
export type Eventos_operativosCountOutputType = {
    evento_caso: number;
    evidencias_evento: number;
};
export type Eventos_operativosCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    evento_caso?: boolean | Eventos_operativosCountOutputTypeCountEvento_casoArgs;
    evidencias_evento?: boolean | Eventos_operativosCountOutputTypeCountEvidencias_eventoArgs;
};
/**
 * Eventos_operativosCountOutputType without action
 */
export type Eventos_operativosCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eventos_operativosCountOutputType
     */
    select?: Prisma.Eventos_operativosCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * Eventos_operativosCountOutputType without action
 */
export type Eventos_operativosCountOutputTypeCountEvento_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.evento_casoWhereInput;
};
/**
 * Eventos_operativosCountOutputType without action
 */
export type Eventos_operativosCountOutputTypeCountEvidencias_eventoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.evidencias_eventoWhereInput;
};
export type eventos_operativosSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
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
    created_at?: boolean;
    updated_at?: boolean;
    evento_caso?: boolean | Prisma.eventos_operativos$evento_casoArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_estadoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios?: boolean | Prisma.eventos_operativos$usuariosArgs<ExtArgs>;
    evidencias_evento?: boolean | Prisma.eventos_operativos$evidencias_eventoArgs<ExtArgs>;
    _count?: boolean | Prisma.Eventos_operativosCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["eventos_operativos"]>;
export type eventos_operativosSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
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
    created_at?: boolean;
    updated_at?: boolean;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_estadoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios?: boolean | Prisma.eventos_operativos$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["eventos_operativos"]>;
export type eventos_operativosSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
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
    created_at?: boolean;
    updated_at?: boolean;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_estadoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios?: boolean | Prisma.eventos_operativos$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["eventos_operativos"]>;
export type eventos_operativosSelectScalar = {
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
    created_at?: boolean;
    updated_at?: boolean;
};
export type eventos_operativosOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_evento" | "codigo_evento" | "fecha" | "hora" | "anio" | "mes" | "semana" | "dia" | "rango_horario" | "tipo_incidente" | "descripcion" | "ubicacion" | "tipo_via" | "direccion_via" | "lugar_incidente" | "modelo_mr" | "numero_mr" | "numero_carrera" | "personal_involucrado" | "tipo_causa" | "posible_causa" | "informacion_adicional" | "camara_monitoreada" | "demora" | "estado" | "usuario_registra" | "created_at" | "updated_at", ExtArgs["result"]["eventos_operativos"]>;
export type eventos_operativosInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    evento_caso?: boolean | Prisma.eventos_operativos$evento_casoArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_estadoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios?: boolean | Prisma.eventos_operativos$usuariosArgs<ExtArgs>;
    evidencias_evento?: boolean | Prisma.eventos_operativos$evidencias_eventoArgs<ExtArgs>;
    _count?: boolean | Prisma.Eventos_operativosCountOutputTypeDefaultArgs<ExtArgs>;
};
export type eventos_operativosIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_estadoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios?: boolean | Prisma.eventos_operativos$usuariosArgs<ExtArgs>;
};
export type eventos_operativosIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_estadoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?: boolean | Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleArgs<ExtArgs>;
    usuarios?: boolean | Prisma.eventos_operativos$usuariosArgs<ExtArgs>;
};
export type $eventos_operativosPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "eventos_operativos";
    objects: {
        evento_caso: Prisma.$evento_casoPayload<ExtArgs>[];
        catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs>;
        catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
        evidencias_evento: Prisma.$evidencias_eventoPayload<ExtArgs>[];
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
        estado: number | null;
        usuario_registra: number | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["eventos_operativos"]>;
    composites: {};
};
export type eventos_operativosGetPayload<S extends boolean | null | undefined | eventos_operativosDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload, S>;
export type eventos_operativosCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<eventos_operativosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Eventos_operativosCountAggregateInputType | true;
};
export interface eventos_operativosDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['eventos_operativos'];
        meta: {
            name: 'eventos_operativos';
        };
    };
    /**
     * Find zero or one Eventos_operativos that matches the filter.
     * @param {eventos_operativosFindUniqueArgs} args - Arguments to find a Eventos_operativos
     * @example
     * // Get one Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends eventos_operativosFindUniqueArgs>(args: Prisma.SelectSubset<T, eventos_operativosFindUniqueArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Eventos_operativos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {eventos_operativosFindUniqueOrThrowArgs} args - Arguments to find a Eventos_operativos
     * @example
     * // Get one Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends eventos_operativosFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, eventos_operativosFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Eventos_operativos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_operativosFindFirstArgs} args - Arguments to find a Eventos_operativos
     * @example
     * // Get one Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends eventos_operativosFindFirstArgs>(args?: Prisma.SelectSubset<T, eventos_operativosFindFirstArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Eventos_operativos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_operativosFindFirstOrThrowArgs} args - Arguments to find a Eventos_operativos
     * @example
     * // Get one Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends eventos_operativosFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, eventos_operativosFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Eventos_operativos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_operativosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.findMany()
     *
     * // Get first 10 Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.findMany({ take: 10 })
     *
     * // Only select the `id_evento`
     * const eventos_operativosWithId_eventoOnly = await prisma.eventos_operativos.findMany({ select: { id_evento: true } })
     *
     */
    findMany<T extends eventos_operativosFindManyArgs>(args?: Prisma.SelectSubset<T, eventos_operativosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Eventos_operativos.
     * @param {eventos_operativosCreateArgs} args - Arguments to create a Eventos_operativos.
     * @example
     * // Create one Eventos_operativos
     * const Eventos_operativos = await prisma.eventos_operativos.create({
     *   data: {
     *     // ... data to create a Eventos_operativos
     *   }
     * })
     *
     */
    create<T extends eventos_operativosCreateArgs>(args: Prisma.SelectSubset<T, eventos_operativosCreateArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Eventos_operativos.
     * @param {eventos_operativosCreateManyArgs} args - Arguments to create many Eventos_operativos.
     * @example
     * // Create many Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends eventos_operativosCreateManyArgs>(args?: Prisma.SelectSubset<T, eventos_operativosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Eventos_operativos and returns the data saved in the database.
     * @param {eventos_operativosCreateManyAndReturnArgs} args - Arguments to create many Eventos_operativos.
     * @example
     * // Create many Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Eventos_operativos and only return the `id_evento`
     * const eventos_operativosWithId_eventoOnly = await prisma.eventos_operativos.createManyAndReturn({
     *   select: { id_evento: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends eventos_operativosCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, eventos_operativosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Eventos_operativos.
     * @param {eventos_operativosDeleteArgs} args - Arguments to delete one Eventos_operativos.
     * @example
     * // Delete one Eventos_operativos
     * const Eventos_operativos = await prisma.eventos_operativos.delete({
     *   where: {
     *     // ... filter to delete one Eventos_operativos
     *   }
     * })
     *
     */
    delete<T extends eventos_operativosDeleteArgs>(args: Prisma.SelectSubset<T, eventos_operativosDeleteArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Eventos_operativos.
     * @param {eventos_operativosUpdateArgs} args - Arguments to update one Eventos_operativos.
     * @example
     * // Update one Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends eventos_operativosUpdateArgs>(args: Prisma.SelectSubset<T, eventos_operativosUpdateArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Eventos_operativos.
     * @param {eventos_operativosDeleteManyArgs} args - Arguments to filter Eventos_operativos to delete.
     * @example
     * // Delete a few Eventos_operativos
     * const { count } = await prisma.eventos_operativos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends eventos_operativosDeleteManyArgs>(args?: Prisma.SelectSubset<T, eventos_operativosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Eventos_operativos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_operativosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends eventos_operativosUpdateManyArgs>(args: Prisma.SelectSubset<T, eventos_operativosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Eventos_operativos and returns the data updated in the database.
     * @param {eventos_operativosUpdateManyAndReturnArgs} args - Arguments to update many Eventos_operativos.
     * @example
     * // Update many Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Eventos_operativos and only return the `id_evento`
     * const eventos_operativosWithId_eventoOnly = await prisma.eventos_operativos.updateManyAndReturn({
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
    updateManyAndReturn<T extends eventos_operativosUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, eventos_operativosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Eventos_operativos.
     * @param {eventos_operativosUpsertArgs} args - Arguments to update or create a Eventos_operativos.
     * @example
     * // Update or create a Eventos_operativos
     * const eventos_operativos = await prisma.eventos_operativos.upsert({
     *   create: {
     *     // ... data to create a Eventos_operativos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eventos_operativos we want to update
     *   }
     * })
     */
    upsert<T extends eventos_operativosUpsertArgs>(args: Prisma.SelectSubset<T, eventos_operativosUpsertArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Eventos_operativos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_operativosCountArgs} args - Arguments to filter Eventos_operativos to count.
     * @example
     * // Count the number of Eventos_operativos
     * const count = await prisma.eventos_operativos.count({
     *   where: {
     *     // ... the filter for the Eventos_operativos we want to count
     *   }
     * })
    **/
    count<T extends eventos_operativosCountArgs>(args?: Prisma.Subset<T, eventos_operativosCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Eventos_operativosCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Eventos_operativos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eventos_operativosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Eventos_operativosAggregateArgs>(args: Prisma.Subset<T, Eventos_operativosAggregateArgs>): Prisma.PrismaPromise<GetEventos_operativosAggregateType<T>>;
    /**
     * Group by Eventos_operativos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventos_operativosGroupByArgs} args - Group by arguments.
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
    groupBy<T extends eventos_operativosGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: eventos_operativosGroupByArgs['orderBy'];
    } : {
        orderBy?: eventos_operativosGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, eventos_operativosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventos_operativosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the eventos_operativos model
     */
    readonly fields: eventos_operativosFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for eventos_operativos.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__eventos_operativosClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    evento_caso<T extends Prisma.eventos_operativos$evento_casoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$evento_casoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_estadoTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_estadoTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle<T extends Prisma.catalogo_detalleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.catalogo_detalleDefaultArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle<T extends Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.eventos_operativos$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    evidencias_evento<T extends Prisma.eventos_operativos$evidencias_eventoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativos$evidencias_eventoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the eventos_operativos model
 */
export interface eventos_operativosFieldRefs {
    readonly id_evento: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly codigo_evento: Prisma.FieldRef<"eventos_operativos", 'String'>;
    readonly fecha: Prisma.FieldRef<"eventos_operativos", 'DateTime'>;
    readonly hora: Prisma.FieldRef<"eventos_operativos", 'DateTime'>;
    readonly anio: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly mes: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly semana: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly dia: Prisma.FieldRef<"eventos_operativos", 'String'>;
    readonly rango_horario: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly tipo_incidente: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly descripcion: Prisma.FieldRef<"eventos_operativos", 'String'>;
    readonly ubicacion: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly tipo_via: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly direccion_via: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly lugar_incidente: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly modelo_mr: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly numero_mr: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly numero_carrera: Prisma.FieldRef<"eventos_operativos", 'String'>;
    readonly personal_involucrado: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly tipo_causa: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly posible_causa: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly informacion_adicional: Prisma.FieldRef<"eventos_operativos", 'String'>;
    readonly camara_monitoreada: Prisma.FieldRef<"eventos_operativos", 'String'>;
    readonly demora: Prisma.FieldRef<"eventos_operativos", 'Decimal'>;
    readonly estado: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly usuario_registra: Prisma.FieldRef<"eventos_operativos", 'Int'>;
    readonly created_at: Prisma.FieldRef<"eventos_operativos", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"eventos_operativos", 'DateTime'>;
}
/**
 * eventos_operativos findUnique
 */
export type eventos_operativosFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_operativos to fetch.
     */
    where: Prisma.eventos_operativosWhereUniqueInput;
};
/**
 * eventos_operativos findUniqueOrThrow
 */
export type eventos_operativosFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_operativos to fetch.
     */
    where: Prisma.eventos_operativosWhereUniqueInput;
};
/**
 * eventos_operativos findFirst
 */
export type eventos_operativosFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_operativos to fetch.
     */
    where?: Prisma.eventos_operativosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of eventos_operativos to fetch.
     */
    orderBy?: Prisma.eventos_operativosOrderByWithRelationInput | Prisma.eventos_operativosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for eventos_operativos.
     */
    cursor?: Prisma.eventos_operativosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` eventos_operativos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` eventos_operativos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of eventos_operativos.
     */
    distinct?: Prisma.Eventos_operativosScalarFieldEnum | Prisma.Eventos_operativosScalarFieldEnum[];
};
/**
 * eventos_operativos findFirstOrThrow
 */
export type eventos_operativosFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_operativos to fetch.
     */
    where?: Prisma.eventos_operativosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of eventos_operativos to fetch.
     */
    orderBy?: Prisma.eventos_operativosOrderByWithRelationInput | Prisma.eventos_operativosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for eventos_operativos.
     */
    cursor?: Prisma.eventos_operativosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` eventos_operativos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` eventos_operativos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of eventos_operativos.
     */
    distinct?: Prisma.Eventos_operativosScalarFieldEnum | Prisma.Eventos_operativosScalarFieldEnum[];
};
/**
 * eventos_operativos findMany
 */
export type eventos_operativosFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which eventos_operativos to fetch.
     */
    where?: Prisma.eventos_operativosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of eventos_operativos to fetch.
     */
    orderBy?: Prisma.eventos_operativosOrderByWithRelationInput | Prisma.eventos_operativosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing eventos_operativos.
     */
    cursor?: Prisma.eventos_operativosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` eventos_operativos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` eventos_operativos.
     */
    skip?: number;
    distinct?: Prisma.Eventos_operativosScalarFieldEnum | Prisma.Eventos_operativosScalarFieldEnum[];
};
/**
 * eventos_operativos create
 */
export type eventos_operativosCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a eventos_operativos.
     */
    data: Prisma.XOR<Prisma.eventos_operativosCreateInput, Prisma.eventos_operativosUncheckedCreateInput>;
};
/**
 * eventos_operativos createMany
 */
export type eventos_operativosCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many eventos_operativos.
     */
    data: Prisma.eventos_operativosCreateManyInput | Prisma.eventos_operativosCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * eventos_operativos createManyAndReturn
 */
export type eventos_operativosCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos_operativos
     */
    select?: Prisma.eventos_operativosSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the eventos_operativos
     */
    omit?: Prisma.eventos_operativosOmit<ExtArgs> | null;
    /**
     * The data used to create many eventos_operativos.
     */
    data: Prisma.eventos_operativosCreateManyInput | Prisma.eventos_operativosCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.eventos_operativosIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * eventos_operativos update
 */
export type eventos_operativosUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a eventos_operativos.
     */
    data: Prisma.XOR<Prisma.eventos_operativosUpdateInput, Prisma.eventos_operativosUncheckedUpdateInput>;
    /**
     * Choose, which eventos_operativos to update.
     */
    where: Prisma.eventos_operativosWhereUniqueInput;
};
/**
 * eventos_operativos updateMany
 */
export type eventos_operativosUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update eventos_operativos.
     */
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyInput>;
    /**
     * Filter which eventos_operativos to update
     */
    where?: Prisma.eventos_operativosWhereInput;
    /**
     * Limit how many eventos_operativos to update.
     */
    limit?: number;
};
/**
 * eventos_operativos updateManyAndReturn
 */
export type eventos_operativosUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventos_operativos
     */
    select?: Prisma.eventos_operativosSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the eventos_operativos
     */
    omit?: Prisma.eventos_operativosOmit<ExtArgs> | null;
    /**
     * The data used to update eventos_operativos.
     */
    data: Prisma.XOR<Prisma.eventos_operativosUpdateManyMutationInput, Prisma.eventos_operativosUncheckedUpdateManyInput>;
    /**
     * Filter which eventos_operativos to update
     */
    where?: Prisma.eventos_operativosWhereInput;
    /**
     * Limit how many eventos_operativos to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.eventos_operativosIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * eventos_operativos upsert
 */
export type eventos_operativosUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the eventos_operativos to update in case it exists.
     */
    where: Prisma.eventos_operativosWhereUniqueInput;
    /**
     * In case the eventos_operativos found by the `where` argument doesn't exist, create a new eventos_operativos with this data.
     */
    create: Prisma.XOR<Prisma.eventos_operativosCreateInput, Prisma.eventos_operativosUncheckedCreateInput>;
    /**
     * In case the eventos_operativos was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.eventos_operativosUpdateInput, Prisma.eventos_operativosUncheckedUpdateInput>;
};
/**
 * eventos_operativos delete
 */
export type eventos_operativosDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which eventos_operativos to delete.
     */
    where: Prisma.eventos_operativosWhereUniqueInput;
};
/**
 * eventos_operativos deleteMany
 */
export type eventos_operativosDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which eventos_operativos to delete
     */
    where?: Prisma.eventos_operativosWhereInput;
    /**
     * Limit how many eventos_operativos to delete.
     */
    limit?: number;
};
/**
 * eventos_operativos.evento_caso
 */
export type eventos_operativos$evento_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_estadoTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_estadoTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle
 */
export type eventos_operativos$catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.usuarios
 */
export type eventos_operativos$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos.evidencias_evento
 */
export type eventos_operativos$evidencias_eventoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * eventos_operativos without action
 */
export type eventos_operativosDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=eventos_operativos.d.ts.map