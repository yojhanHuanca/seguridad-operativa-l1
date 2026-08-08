import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model casos_sop
 *
 */
export type casos_sopModel = runtime.Types.Result.DefaultSelection<Prisma.$casos_sopPayload>;
export type AggregateCasos_sop = {
    _count: Casos_sopCountAggregateOutputType | null;
    _avg: Casos_sopAvgAggregateOutputType | null;
    _sum: Casos_sopSumAggregateOutputType | null;
    _min: Casos_sopMinAggregateOutputType | null;
    _max: Casos_sopMaxAggregateOutputType | null;
};
export type Casos_sopAvgAggregateOutputType = {
    id_caso: number | null;
    estado_hallazgo: number | null;
    dias_abierto: number | null;
    procedencia: number | null;
    tipo: number | null;
    responsable_hallazgo: number | null;
    tipo_sop: number | null;
    subtipo_sop: number | null;
    analisis_riesgo: number | null;
    area_responsable: number | null;
    responsable_plan: number | null;
    estado_plan: number | null;
    dias_abierto_plan: number | null;
    created_by: number | null;
};
export type Casos_sopSumAggregateOutputType = {
    id_caso: number | null;
    estado_hallazgo: number | null;
    dias_abierto: number | null;
    procedencia: number | null;
    tipo: number | null;
    responsable_hallazgo: number | null;
    tipo_sop: number | null;
    subtipo_sop: number | null;
    analisis_riesgo: number | null;
    area_responsable: number | null;
    responsable_plan: number | null;
    estado_plan: number | null;
    dias_abierto_plan: number | null;
    created_by: number | null;
};
export type Casos_sopMinAggregateOutputType = {
    id_caso: number | null;
    codigo_sop: string | null;
    titulo: string | null;
    nombre_reportante: string | null;
    correo_reportante: string | null;
    telefono_reportante: string | null;
    fecha_hallazgo: Date | null;
    fecha_evento: Date | null;
    estado_hallazgo: number | null;
    dias_abierto: number | null;
    procedencia: number | null;
    tipo: number | null;
    descripcion: string | null;
    responsable_hallazgo: number | null;
    tipo_sop: number | null;
    subtipo_sop: number | null;
    peligro: string | null;
    consecuencia: string | null;
    clasificacion: string | null;
    analisis_riesgo: number | null;
    acr: string | null;
    area_responsable: number | null;
    responsable_plan: number | null;
    estado_plan: number | null;
    fecha_plan: Date | null;
    fecha_reprogramada: Date | null;
    dias_abierto_plan: number | null;
    observaciones: string | null;
    created_by: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Casos_sopMaxAggregateOutputType = {
    id_caso: number | null;
    codigo_sop: string | null;
    titulo: string | null;
    nombre_reportante: string | null;
    correo_reportante: string | null;
    telefono_reportante: string | null;
    fecha_hallazgo: Date | null;
    fecha_evento: Date | null;
    estado_hallazgo: number | null;
    dias_abierto: number | null;
    procedencia: number | null;
    tipo: number | null;
    descripcion: string | null;
    responsable_hallazgo: number | null;
    tipo_sop: number | null;
    subtipo_sop: number | null;
    peligro: string | null;
    consecuencia: string | null;
    clasificacion: string | null;
    analisis_riesgo: number | null;
    acr: string | null;
    area_responsable: number | null;
    responsable_plan: number | null;
    estado_plan: number | null;
    fecha_plan: Date | null;
    fecha_reprogramada: Date | null;
    dias_abierto_plan: number | null;
    observaciones: string | null;
    created_by: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Casos_sopCountAggregateOutputType = {
    id_caso: number;
    codigo_sop: number;
    titulo: number;
    nombre_reportante: number;
    correo_reportante: number;
    telefono_reportante: number;
    fecha_hallazgo: number;
    fecha_evento: number;
    estado_hallazgo: number;
    dias_abierto: number;
    procedencia: number;
    tipo: number;
    descripcion: number;
    responsable_hallazgo: number;
    tipo_sop: number;
    subtipo_sop: number;
    peligro: number;
    consecuencia: number;
    clasificacion: number;
    analisis_riesgo: number;
    acr: number;
    area_responsable: number;
    responsable_plan: number;
    estado_plan: number;
    fecha_plan: number;
    fecha_reprogramada: number;
    dias_abierto_plan: number;
    observaciones: number;
    created_by: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Casos_sopAvgAggregateInputType = {
    id_caso?: true;
    estado_hallazgo?: true;
    dias_abierto?: true;
    procedencia?: true;
    tipo?: true;
    responsable_hallazgo?: true;
    tipo_sop?: true;
    subtipo_sop?: true;
    analisis_riesgo?: true;
    area_responsable?: true;
    responsable_plan?: true;
    estado_plan?: true;
    dias_abierto_plan?: true;
    created_by?: true;
};
export type Casos_sopSumAggregateInputType = {
    id_caso?: true;
    estado_hallazgo?: true;
    dias_abierto?: true;
    procedencia?: true;
    tipo?: true;
    responsable_hallazgo?: true;
    tipo_sop?: true;
    subtipo_sop?: true;
    analisis_riesgo?: true;
    area_responsable?: true;
    responsable_plan?: true;
    estado_plan?: true;
    dias_abierto_plan?: true;
    created_by?: true;
};
export type Casos_sopMinAggregateInputType = {
    id_caso?: true;
    codigo_sop?: true;
    titulo?: true;
    nombre_reportante?: true;
    correo_reportante?: true;
    telefono_reportante?: true;
    fecha_hallazgo?: true;
    fecha_evento?: true;
    estado_hallazgo?: true;
    dias_abierto?: true;
    procedencia?: true;
    tipo?: true;
    descripcion?: true;
    responsable_hallazgo?: true;
    tipo_sop?: true;
    subtipo_sop?: true;
    peligro?: true;
    consecuencia?: true;
    clasificacion?: true;
    analisis_riesgo?: true;
    acr?: true;
    area_responsable?: true;
    responsable_plan?: true;
    estado_plan?: true;
    fecha_plan?: true;
    fecha_reprogramada?: true;
    dias_abierto_plan?: true;
    observaciones?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type Casos_sopMaxAggregateInputType = {
    id_caso?: true;
    codigo_sop?: true;
    titulo?: true;
    nombre_reportante?: true;
    correo_reportante?: true;
    telefono_reportante?: true;
    fecha_hallazgo?: true;
    fecha_evento?: true;
    estado_hallazgo?: true;
    dias_abierto?: true;
    procedencia?: true;
    tipo?: true;
    descripcion?: true;
    responsable_hallazgo?: true;
    tipo_sop?: true;
    subtipo_sop?: true;
    peligro?: true;
    consecuencia?: true;
    clasificacion?: true;
    analisis_riesgo?: true;
    acr?: true;
    area_responsable?: true;
    responsable_plan?: true;
    estado_plan?: true;
    fecha_plan?: true;
    fecha_reprogramada?: true;
    dias_abierto_plan?: true;
    observaciones?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type Casos_sopCountAggregateInputType = {
    id_caso?: true;
    codigo_sop?: true;
    titulo?: true;
    nombre_reportante?: true;
    correo_reportante?: true;
    telefono_reportante?: true;
    fecha_hallazgo?: true;
    fecha_evento?: true;
    estado_hallazgo?: true;
    dias_abierto?: true;
    procedencia?: true;
    tipo?: true;
    descripcion?: true;
    responsable_hallazgo?: true;
    tipo_sop?: true;
    subtipo_sop?: true;
    peligro?: true;
    consecuencia?: true;
    clasificacion?: true;
    analisis_riesgo?: true;
    acr?: true;
    area_responsable?: true;
    responsable_plan?: true;
    estado_plan?: true;
    fecha_plan?: true;
    fecha_reprogramada?: true;
    dias_abierto_plan?: true;
    observaciones?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Casos_sopAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which casos_sop to aggregate.
     */
    where?: Prisma.casos_sopWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of casos_sops to fetch.
     */
    orderBy?: Prisma.casos_sopOrderByWithRelationInput | Prisma.casos_sopOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.casos_sopWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` casos_sops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` casos_sops.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned casos_sops
    **/
    _count?: true | Casos_sopCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Casos_sopAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Casos_sopSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Casos_sopMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Casos_sopMaxAggregateInputType;
};
export type GetCasos_sopAggregateType<T extends Casos_sopAggregateArgs> = {
    [P in keyof T & keyof AggregateCasos_sop]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCasos_sop[P]> : Prisma.GetScalarType<T[P], AggregateCasos_sop[P]>;
};
export type casos_sopGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.casos_sopWhereInput;
    orderBy?: Prisma.casos_sopOrderByWithAggregationInput | Prisma.casos_sopOrderByWithAggregationInput[];
    by: Prisma.Casos_sopScalarFieldEnum[] | Prisma.Casos_sopScalarFieldEnum;
    having?: Prisma.casos_sopScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Casos_sopCountAggregateInputType | true;
    _avg?: Casos_sopAvgAggregateInputType;
    _sum?: Casos_sopSumAggregateInputType;
    _min?: Casos_sopMinAggregateInputType;
    _max?: Casos_sopMaxAggregateInputType;
};
export type Casos_sopGroupByOutputType = {
    id_caso: number;
    codigo_sop: string;
    titulo: string | null;
    nombre_reportante: string | null;
    correo_reportante: string | null;
    telefono_reportante: string | null;
    fecha_hallazgo: Date;
    fecha_evento: Date | null;
    estado_hallazgo: number;
    dias_abierto: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo: number | null;
    tipo_sop: number;
    subtipo_sop: number | null;
    peligro: string | null;
    consecuencia: string | null;
    clasificacion: string | null;
    analisis_riesgo: number | null;
    acr: string | null;
    area_responsable: number | null;
    responsable_plan: number | null;
    estado_plan: number | null;
    fecha_plan: Date | null;
    fecha_reprogramada: Date | null;
    dias_abierto_plan: number | null;
    observaciones: string | null;
    created_by: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Casos_sopCountAggregateOutputType | null;
    _avg: Casos_sopAvgAggregateOutputType | null;
    _sum: Casos_sopSumAggregateOutputType | null;
    _min: Casos_sopMinAggregateOutputType | null;
    _max: Casos_sopMaxAggregateOutputType | null;
};
type GetCasos_sopGroupByPayload<T extends casos_sopGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Casos_sopGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Casos_sopGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Casos_sopGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Casos_sopGroupByOutputType[P]>;
}>>;
export type casos_sopWhereInput = {
    AND?: Prisma.casos_sopWhereInput | Prisma.casos_sopWhereInput[];
    OR?: Prisma.casos_sopWhereInput[];
    NOT?: Prisma.casos_sopWhereInput | Prisma.casos_sopWhereInput[];
    id_caso?: Prisma.IntFilter<"casos_sop"> | number;
    codigo_sop?: Prisma.StringFilter<"casos_sop"> | string;
    titulo?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    nombre_reportante?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    correo_reportante?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    telefono_reportante?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    fecha_hallazgo?: Prisma.DateTimeFilter<"casos_sop"> | Date | string;
    fecha_evento?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    estado_hallazgo?: Prisma.IntFilter<"casos_sop"> | number;
    dias_abierto?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    procedencia?: Prisma.IntFilter<"casos_sop"> | number;
    tipo?: Prisma.IntFilter<"casos_sop"> | number;
    descripcion?: Prisma.StringFilter<"casos_sop"> | string;
    responsable_hallazgo?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    tipo_sop?: Prisma.IntFilter<"casos_sop"> | number;
    subtipo_sop?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    peligro?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    consecuencia?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    clasificacion?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    analisis_riesgo?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    acr?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    area_responsable?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    responsable_plan?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    estado_plan?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    fecha_plan?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    fecha_reprogramada?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    dias_abierto_plan?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    created_by?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    anexos_caso?: Prisma.Anexos_casoListRelationFilter;
    areas?: Prisma.XOR<Prisma.AreasNullableScalarRelationFilter, Prisma.areasWhereInput> | null;
    usuarios_casos_sop_created_byTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    evento_caso?: Prisma.Evento_casoListRelationFilter;
    planes_accion?: Prisma.Planes_accionListRelationFilter;
    investigacion_caso?: Prisma.XOR<Prisma.Investigacion_casoNullableScalarRelationFilter, Prisma.investigacion_casoWhereInput> | null;
    solicitudes_informacion?: Prisma.Solicitudes_informacionListRelationFilter;
    timeline_caso?: Prisma.Timeline_casoListRelationFilter;
};
export type casos_sopOrderByWithRelationInput = {
    id_caso?: Prisma.SortOrder;
    codigo_sop?: Prisma.SortOrder;
    titulo?: Prisma.SortOrderInput | Prisma.SortOrder;
    nombre_reportante?: Prisma.SortOrderInput | Prisma.SortOrder;
    correo_reportante?: Prisma.SortOrderInput | Prisma.SortOrder;
    telefono_reportante?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_hallazgo?: Prisma.SortOrder;
    fecha_evento?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado_hallazgo?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrderInput | Prisma.SortOrder;
    procedencia?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable_hallazgo?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_sop?: Prisma.SortOrder;
    subtipo_sop?: Prisma.SortOrderInput | Prisma.SortOrder;
    peligro?: Prisma.SortOrderInput | Prisma.SortOrder;
    consecuencia?: Prisma.SortOrderInput | Prisma.SortOrder;
    clasificacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    analisis_riesgo?: Prisma.SortOrderInput | Prisma.SortOrder;
    acr?: Prisma.SortOrderInput | Prisma.SortOrder;
    area_responsable?: Prisma.SortOrderInput | Prisma.SortOrder;
    responsable_plan?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado_plan?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrderInput | Prisma.SortOrder;
    dias_abierto_plan?: Prisma.SortOrderInput | Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    anexos_caso?: Prisma.anexos_casoOrderByRelationAggregateInput;
    areas?: Prisma.areasOrderByWithRelationInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosOrderByWithRelationInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosOrderByWithRelationInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosOrderByWithRelationInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    evento_caso?: Prisma.evento_casoOrderByRelationAggregateInput;
    planes_accion?: Prisma.planes_accionOrderByRelationAggregateInput;
    investigacion_caso?: Prisma.investigacion_casoOrderByWithRelationInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionOrderByRelationAggregateInput;
    timeline_caso?: Prisma.timeline_casoOrderByRelationAggregateInput;
};
export type casos_sopWhereUniqueInput = Prisma.AtLeast<{
    id_caso?: number;
    codigo_sop?: string;
    AND?: Prisma.casos_sopWhereInput | Prisma.casos_sopWhereInput[];
    OR?: Prisma.casos_sopWhereInput[];
    NOT?: Prisma.casos_sopWhereInput | Prisma.casos_sopWhereInput[];
    titulo?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    nombre_reportante?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    correo_reportante?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    telefono_reportante?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    fecha_hallazgo?: Prisma.DateTimeFilter<"casos_sop"> | Date | string;
    fecha_evento?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    estado_hallazgo?: Prisma.IntFilter<"casos_sop"> | number;
    dias_abierto?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    procedencia?: Prisma.IntFilter<"casos_sop"> | number;
    tipo?: Prisma.IntFilter<"casos_sop"> | number;
    descripcion?: Prisma.StringFilter<"casos_sop"> | string;
    responsable_hallazgo?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    tipo_sop?: Prisma.IntFilter<"casos_sop"> | number;
    subtipo_sop?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    peligro?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    consecuencia?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    clasificacion?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    analisis_riesgo?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    acr?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    area_responsable?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    responsable_plan?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    estado_plan?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    fecha_plan?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    fecha_reprogramada?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    dias_abierto_plan?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    created_by?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    anexos_caso?: Prisma.Anexos_casoListRelationFilter;
    areas?: Prisma.XOR<Prisma.AreasNullableScalarRelationFilter, Prisma.areasWhereInput> | null;
    usuarios_casos_sop_created_byTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    evento_caso?: Prisma.Evento_casoListRelationFilter;
    planes_accion?: Prisma.Planes_accionListRelationFilter;
    investigacion_caso?: Prisma.XOR<Prisma.Investigacion_casoNullableScalarRelationFilter, Prisma.investigacion_casoWhereInput> | null;
    solicitudes_informacion?: Prisma.Solicitudes_informacionListRelationFilter;
    timeline_caso?: Prisma.Timeline_casoListRelationFilter;
}, "id_caso" | "codigo_sop">;
export type casos_sopOrderByWithAggregationInput = {
    id_caso?: Prisma.SortOrder;
    codigo_sop?: Prisma.SortOrder;
    titulo?: Prisma.SortOrderInput | Prisma.SortOrder;
    nombre_reportante?: Prisma.SortOrderInput | Prisma.SortOrder;
    correo_reportante?: Prisma.SortOrderInput | Prisma.SortOrder;
    telefono_reportante?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_hallazgo?: Prisma.SortOrder;
    fecha_evento?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado_hallazgo?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrderInput | Prisma.SortOrder;
    procedencia?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable_hallazgo?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_sop?: Prisma.SortOrder;
    subtipo_sop?: Prisma.SortOrderInput | Prisma.SortOrder;
    peligro?: Prisma.SortOrderInput | Prisma.SortOrder;
    consecuencia?: Prisma.SortOrderInput | Prisma.SortOrder;
    clasificacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    analisis_riesgo?: Prisma.SortOrderInput | Prisma.SortOrder;
    acr?: Prisma.SortOrderInput | Prisma.SortOrder;
    area_responsable?: Prisma.SortOrderInput | Prisma.SortOrder;
    responsable_plan?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado_plan?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrderInput | Prisma.SortOrder;
    dias_abierto_plan?: Prisma.SortOrderInput | Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.casos_sopCountOrderByAggregateInput;
    _avg?: Prisma.casos_sopAvgOrderByAggregateInput;
    _max?: Prisma.casos_sopMaxOrderByAggregateInput;
    _min?: Prisma.casos_sopMinOrderByAggregateInput;
    _sum?: Prisma.casos_sopSumOrderByAggregateInput;
};
export type casos_sopScalarWhereWithAggregatesInput = {
    AND?: Prisma.casos_sopScalarWhereWithAggregatesInput | Prisma.casos_sopScalarWhereWithAggregatesInput[];
    OR?: Prisma.casos_sopScalarWhereWithAggregatesInput[];
    NOT?: Prisma.casos_sopScalarWhereWithAggregatesInput | Prisma.casos_sopScalarWhereWithAggregatesInput[];
    id_caso?: Prisma.IntWithAggregatesFilter<"casos_sop"> | number;
    codigo_sop?: Prisma.StringWithAggregatesFilter<"casos_sop"> | string;
    titulo?: Prisma.StringNullableWithAggregatesFilter<"casos_sop"> | string | null;
    nombre_reportante?: Prisma.StringNullableWithAggregatesFilter<"casos_sop"> | string | null;
    correo_reportante?: Prisma.StringNullableWithAggregatesFilter<"casos_sop"> | string | null;
    telefono_reportante?: Prisma.StringNullableWithAggregatesFilter<"casos_sop"> | string | null;
    fecha_hallazgo?: Prisma.DateTimeWithAggregatesFilter<"casos_sop"> | Date | string;
    fecha_evento?: Prisma.DateTimeNullableWithAggregatesFilter<"casos_sop"> | Date | string | null;
    estado_hallazgo?: Prisma.IntWithAggregatesFilter<"casos_sop"> | number;
    dias_abierto?: Prisma.IntNullableWithAggregatesFilter<"casos_sop"> | number | null;
    procedencia?: Prisma.IntWithAggregatesFilter<"casos_sop"> | number;
    tipo?: Prisma.IntWithAggregatesFilter<"casos_sop"> | number;
    descripcion?: Prisma.StringWithAggregatesFilter<"casos_sop"> | string;
    responsable_hallazgo?: Prisma.IntNullableWithAggregatesFilter<"casos_sop"> | number | null;
    tipo_sop?: Prisma.IntWithAggregatesFilter<"casos_sop"> | number;
    subtipo_sop?: Prisma.IntNullableWithAggregatesFilter<"casos_sop"> | number | null;
    peligro?: Prisma.StringNullableWithAggregatesFilter<"casos_sop"> | string | null;
    consecuencia?: Prisma.StringNullableWithAggregatesFilter<"casos_sop"> | string | null;
    clasificacion?: Prisma.StringNullableWithAggregatesFilter<"casos_sop"> | string | null;
    analisis_riesgo?: Prisma.IntNullableWithAggregatesFilter<"casos_sop"> | number | null;
    acr?: Prisma.StringNullableWithAggregatesFilter<"casos_sop"> | string | null;
    area_responsable?: Prisma.IntNullableWithAggregatesFilter<"casos_sop"> | number | null;
    responsable_plan?: Prisma.IntNullableWithAggregatesFilter<"casos_sop"> | number | null;
    estado_plan?: Prisma.IntNullableWithAggregatesFilter<"casos_sop"> | number | null;
    fecha_plan?: Prisma.DateTimeNullableWithAggregatesFilter<"casos_sop"> | Date | string | null;
    fecha_reprogramada?: Prisma.DateTimeNullableWithAggregatesFilter<"casos_sop"> | Date | string | null;
    dias_abierto_plan?: Prisma.IntNullableWithAggregatesFilter<"casos_sop"> | number | null;
    observaciones?: Prisma.StringNullableWithAggregatesFilter<"casos_sop"> | string | null;
    created_by?: Prisma.IntNullableWithAggregatesFilter<"casos_sop"> | number | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"casos_sop"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"casos_sop"> | Date | string | null;
};
export type casos_sopCreateInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUpdateInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopCreateManyInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopUpdateManyMutationInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopUncheckedUpdateManyInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Casos_sopScalarRelationFilter = {
    is?: Prisma.casos_sopWhereInput;
    isNot?: Prisma.casos_sopWhereInput;
};
export type Casos_sopListRelationFilter = {
    every?: Prisma.casos_sopWhereInput;
    some?: Prisma.casos_sopWhereInput;
    none?: Prisma.casos_sopWhereInput;
};
export type casos_sopOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type casos_sopCountOrderByAggregateInput = {
    id_caso?: Prisma.SortOrder;
    codigo_sop?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    nombre_reportante?: Prisma.SortOrder;
    correo_reportante?: Prisma.SortOrder;
    telefono_reportante?: Prisma.SortOrder;
    fecha_hallazgo?: Prisma.SortOrder;
    fecha_evento?: Prisma.SortOrder;
    estado_hallazgo?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
    procedencia?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable_hallazgo?: Prisma.SortOrder;
    tipo_sop?: Prisma.SortOrder;
    subtipo_sop?: Prisma.SortOrder;
    peligro?: Prisma.SortOrder;
    consecuencia?: Prisma.SortOrder;
    clasificacion?: Prisma.SortOrder;
    analisis_riesgo?: Prisma.SortOrder;
    acr?: Prisma.SortOrder;
    area_responsable?: Prisma.SortOrder;
    responsable_plan?: Prisma.SortOrder;
    estado_plan?: Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrder;
    dias_abierto_plan?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type casos_sopAvgOrderByAggregateInput = {
    id_caso?: Prisma.SortOrder;
    estado_hallazgo?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
    procedencia?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    responsable_hallazgo?: Prisma.SortOrder;
    tipo_sop?: Prisma.SortOrder;
    subtipo_sop?: Prisma.SortOrder;
    analisis_riesgo?: Prisma.SortOrder;
    area_responsable?: Prisma.SortOrder;
    responsable_plan?: Prisma.SortOrder;
    estado_plan?: Prisma.SortOrder;
    dias_abierto_plan?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type casos_sopMaxOrderByAggregateInput = {
    id_caso?: Prisma.SortOrder;
    codigo_sop?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    nombre_reportante?: Prisma.SortOrder;
    correo_reportante?: Prisma.SortOrder;
    telefono_reportante?: Prisma.SortOrder;
    fecha_hallazgo?: Prisma.SortOrder;
    fecha_evento?: Prisma.SortOrder;
    estado_hallazgo?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
    procedencia?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable_hallazgo?: Prisma.SortOrder;
    tipo_sop?: Prisma.SortOrder;
    subtipo_sop?: Prisma.SortOrder;
    peligro?: Prisma.SortOrder;
    consecuencia?: Prisma.SortOrder;
    clasificacion?: Prisma.SortOrder;
    analisis_riesgo?: Prisma.SortOrder;
    acr?: Prisma.SortOrder;
    area_responsable?: Prisma.SortOrder;
    responsable_plan?: Prisma.SortOrder;
    estado_plan?: Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrder;
    dias_abierto_plan?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type casos_sopMinOrderByAggregateInput = {
    id_caso?: Prisma.SortOrder;
    codigo_sop?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    nombre_reportante?: Prisma.SortOrder;
    correo_reportante?: Prisma.SortOrder;
    telefono_reportante?: Prisma.SortOrder;
    fecha_hallazgo?: Prisma.SortOrder;
    fecha_evento?: Prisma.SortOrder;
    estado_hallazgo?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
    procedencia?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable_hallazgo?: Prisma.SortOrder;
    tipo_sop?: Prisma.SortOrder;
    subtipo_sop?: Prisma.SortOrder;
    peligro?: Prisma.SortOrder;
    consecuencia?: Prisma.SortOrder;
    clasificacion?: Prisma.SortOrder;
    analisis_riesgo?: Prisma.SortOrder;
    acr?: Prisma.SortOrder;
    area_responsable?: Prisma.SortOrder;
    responsable_plan?: Prisma.SortOrder;
    estado_plan?: Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrder;
    dias_abierto_plan?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type casos_sopSumOrderByAggregateInput = {
    id_caso?: Prisma.SortOrder;
    estado_hallazgo?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
    procedencia?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    responsable_hallazgo?: Prisma.SortOrder;
    tipo_sop?: Prisma.SortOrder;
    subtipo_sop?: Prisma.SortOrder;
    analisis_riesgo?: Prisma.SortOrder;
    area_responsable?: Prisma.SortOrder;
    responsable_plan?: Prisma.SortOrder;
    estado_plan?: Prisma.SortOrder;
    dias_abierto_plan?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type casos_sopCreateNestedOneWithoutAnexos_casoInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutAnexos_casoInput, Prisma.casos_sopUncheckedCreateWithoutAnexos_casoInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutAnexos_casoInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
};
export type casos_sopUpdateOneRequiredWithoutAnexos_casoNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutAnexos_casoInput, Prisma.casos_sopUncheckedCreateWithoutAnexos_casoInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutAnexos_casoInput;
    upsert?: Prisma.casos_sopUpsertWithoutAnexos_casoInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.casos_sopUpdateToOneWithWhereWithoutAnexos_casoInput, Prisma.casos_sopUpdateWithoutAnexos_casoInput>, Prisma.casos_sopUncheckedUpdateWithoutAnexos_casoInput>;
};
export type casos_sopCreateNestedManyWithoutAreasInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutAreasInput, Prisma.casos_sopUncheckedCreateWithoutAreasInput> | Prisma.casos_sopCreateWithoutAreasInput[] | Prisma.casos_sopUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutAreasInput | Prisma.casos_sopCreateOrConnectWithoutAreasInput[];
    createMany?: Prisma.casos_sopCreateManyAreasInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutAreasInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutAreasInput, Prisma.casos_sopUncheckedCreateWithoutAreasInput> | Prisma.casos_sopCreateWithoutAreasInput[] | Prisma.casos_sopUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutAreasInput | Prisma.casos_sopCreateOrConnectWithoutAreasInput[];
    createMany?: Prisma.casos_sopCreateManyAreasInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUpdateManyWithoutAreasNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutAreasInput, Prisma.casos_sopUncheckedCreateWithoutAreasInput> | Prisma.casos_sopCreateWithoutAreasInput[] | Prisma.casos_sopUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutAreasInput | Prisma.casos_sopCreateOrConnectWithoutAreasInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutAreasInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutAreasInput[];
    createMany?: Prisma.casos_sopCreateManyAreasInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutAreasInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutAreasInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutAreasInput | Prisma.casos_sopUpdateManyWithWhereWithoutAreasInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutAreasNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutAreasInput, Prisma.casos_sopUncheckedCreateWithoutAreasInput> | Prisma.casos_sopCreateWithoutAreasInput[] | Prisma.casos_sopUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutAreasInput | Prisma.casos_sopCreateOrConnectWithoutAreasInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutAreasInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutAreasInput[];
    createMany?: Prisma.casos_sopCreateManyAreasInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutAreasInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutAreasInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutAreasInput | Prisma.casos_sopUpdateManyWithWhereWithoutAreasInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type casos_sopCreateNestedManyWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopCreateNestedManyWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopCreateNestedManyWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopCreateNestedManyWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopCreateNestedManyWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopCreateNestedManyWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopCreateNestedManyWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUpdateManyWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUpdateManyWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUpdateManyWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUpdateManyWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUpdateManyWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUpdateManyWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUpdateManyWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput> | Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[] | Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    createMany?: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopCreateNestedOneWithoutEvento_casoInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutEvento_casoInput, Prisma.casos_sopUncheckedCreateWithoutEvento_casoInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutEvento_casoInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
};
export type casos_sopUpdateOneRequiredWithoutEvento_casoNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutEvento_casoInput, Prisma.casos_sopUncheckedCreateWithoutEvento_casoInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutEvento_casoInput;
    upsert?: Prisma.casos_sopUpsertWithoutEvento_casoInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.casos_sopUpdateToOneWithWhereWithoutEvento_casoInput, Prisma.casos_sopUpdateWithoutEvento_casoInput>, Prisma.casos_sopUncheckedUpdateWithoutEvento_casoInput>;
};
export type casos_sopCreateNestedOneWithoutTimeline_casoInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutTimeline_casoInput, Prisma.casos_sopUncheckedCreateWithoutTimeline_casoInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutTimeline_casoInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
};
export type casos_sopUpdateOneRequiredWithoutTimeline_casoNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutTimeline_casoInput, Prisma.casos_sopUncheckedCreateWithoutTimeline_casoInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutTimeline_casoInput;
    upsert?: Prisma.casos_sopUpsertWithoutTimeline_casoInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.casos_sopUpdateToOneWithWhereWithoutTimeline_casoInput, Prisma.casos_sopUpdateWithoutTimeline_casoInput>, Prisma.casos_sopUncheckedUpdateWithoutTimeline_casoInput>;
};
export type casos_sopCreateNestedOneWithoutInvestigacion_casoInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutInvestigacion_casoInput, Prisma.casos_sopUncheckedCreateWithoutInvestigacion_casoInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutInvestigacion_casoInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
};
export type casos_sopUpdateOneRequiredWithoutInvestigacion_casoNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutInvestigacion_casoInput, Prisma.casos_sopUncheckedCreateWithoutInvestigacion_casoInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutInvestigacion_casoInput;
    upsert?: Prisma.casos_sopUpsertWithoutInvestigacion_casoInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.casos_sopUpdateToOneWithWhereWithoutInvestigacion_casoInput, Prisma.casos_sopUpdateWithoutInvestigacion_casoInput>, Prisma.casos_sopUncheckedUpdateWithoutInvestigacion_casoInput>;
};
export type casos_sopCreateNestedOneWithoutPlanes_accionInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutPlanes_accionInput, Prisma.casos_sopUncheckedCreateWithoutPlanes_accionInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutPlanes_accionInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
};
export type casos_sopUpdateOneRequiredWithoutPlanes_accionNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutPlanes_accionInput, Prisma.casos_sopUncheckedCreateWithoutPlanes_accionInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutPlanes_accionInput;
    upsert?: Prisma.casos_sopUpsertWithoutPlanes_accionInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.casos_sopUpdateToOneWithWhereWithoutPlanes_accionInput, Prisma.casos_sopUpdateWithoutPlanes_accionInput>, Prisma.casos_sopUncheckedUpdateWithoutPlanes_accionInput>;
};
export type casos_sopCreateNestedOneWithoutSolicitudes_informacionInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutSolicitudes_informacionInput, Prisma.casos_sopUncheckedCreateWithoutSolicitudes_informacionInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutSolicitudes_informacionInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
};
export type casos_sopUpdateOneRequiredWithoutSolicitudes_informacionNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutSolicitudes_informacionInput, Prisma.casos_sopUncheckedCreateWithoutSolicitudes_informacionInput>;
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutSolicitudes_informacionInput;
    upsert?: Prisma.casos_sopUpsertWithoutSolicitudes_informacionInput;
    connect?: Prisma.casos_sopWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.casos_sopUpdateToOneWithWhereWithoutSolicitudes_informacionInput, Prisma.casos_sopUpdateWithoutSolicitudes_informacionInput>, Prisma.casos_sopUncheckedUpdateWithoutSolicitudes_informacionInput>;
};
export type casos_sopCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_created_byTousuariosInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_hallazgoTousuariosInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_planTousuariosInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_created_byTousuariosInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_hallazgoTousuariosInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUncheckedCreateNestedManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_planTousuariosInputEnvelope;
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
};
export type casos_sopUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_created_byTousuariosInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_hallazgoTousuariosInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_planTousuariosInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_created_byTousuariosInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_created_byTousuariosInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_hallazgoTousuariosInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosNestedInput = {
    create?: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput> | Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput[] | Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    connectOrCreate?: Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    upsert?: Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    createMany?: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_planTousuariosInputEnvelope;
    set?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    disconnect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    delete?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    connect?: Prisma.casos_sopWhereUniqueInput | Prisma.casos_sopWhereUniqueInput[];
    update?: Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    updateMany?: Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_planTousuariosInput[];
    deleteMany?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
};
export type casos_sopCreateWithoutAnexos_casoInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutAnexos_casoInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutAnexos_casoInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutAnexos_casoInput, Prisma.casos_sopUncheckedCreateWithoutAnexos_casoInput>;
};
export type casos_sopUpsertWithoutAnexos_casoInput = {
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutAnexos_casoInput, Prisma.casos_sopUncheckedUpdateWithoutAnexos_casoInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutAnexos_casoInput, Prisma.casos_sopUncheckedCreateWithoutAnexos_casoInput>;
    where?: Prisma.casos_sopWhereInput;
};
export type casos_sopUpdateToOneWithWhereWithoutAnexos_casoInput = {
    where?: Prisma.casos_sopWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutAnexos_casoInput, Prisma.casos_sopUncheckedUpdateWithoutAnexos_casoInput>;
};
export type casos_sopUpdateWithoutAnexos_casoInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutAnexos_casoInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopCreateWithoutAreasInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutAreasInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutAreasInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutAreasInput, Prisma.casos_sopUncheckedCreateWithoutAreasInput>;
};
export type casos_sopCreateManyAreasInputEnvelope = {
    data: Prisma.casos_sopCreateManyAreasInput | Prisma.casos_sopCreateManyAreasInput[];
    skipDuplicates?: boolean;
};
export type casos_sopUpsertWithWhereUniqueWithoutAreasInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutAreasInput, Prisma.casos_sopUncheckedUpdateWithoutAreasInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutAreasInput, Prisma.casos_sopUncheckedCreateWithoutAreasInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutAreasInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutAreasInput, Prisma.casos_sopUncheckedUpdateWithoutAreasInput>;
};
export type casos_sopUpdateManyWithWhereWithoutAreasInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutAreasInput>;
};
export type casos_sopScalarWhereInput = {
    AND?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
    OR?: Prisma.casos_sopScalarWhereInput[];
    NOT?: Prisma.casos_sopScalarWhereInput | Prisma.casos_sopScalarWhereInput[];
    id_caso?: Prisma.IntFilter<"casos_sop"> | number;
    codigo_sop?: Prisma.StringFilter<"casos_sop"> | string;
    titulo?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    nombre_reportante?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    correo_reportante?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    telefono_reportante?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    fecha_hallazgo?: Prisma.DateTimeFilter<"casos_sop"> | Date | string;
    fecha_evento?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    estado_hallazgo?: Prisma.IntFilter<"casos_sop"> | number;
    dias_abierto?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    procedencia?: Prisma.IntFilter<"casos_sop"> | number;
    tipo?: Prisma.IntFilter<"casos_sop"> | number;
    descripcion?: Prisma.StringFilter<"casos_sop"> | string;
    responsable_hallazgo?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    tipo_sop?: Prisma.IntFilter<"casos_sop"> | number;
    subtipo_sop?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    peligro?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    consecuencia?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    clasificacion?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    analisis_riesgo?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    acr?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    area_responsable?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    responsable_plan?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    estado_plan?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    fecha_plan?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    fecha_reprogramada?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    dias_abierto_plan?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"casos_sop"> | string | null;
    created_by?: Prisma.IntNullableFilter<"casos_sop"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"casos_sop"> | Date | string | null;
};
export type casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput>;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInputEnvelope = {
    data: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput | Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput>;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInputEnvelope = {
    data: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput | Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput>;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInputEnvelope = {
    data: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput | Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput>;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInputEnvelope = {
    data: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput | Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput>;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInputEnvelope = {
    data: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput>;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInputEnvelope = {
    data: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput | Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput>;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInputEnvelope = {
    data: Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput | Prisma.casos_sopCreateManyCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput>;
};
export type casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput>;
};
export type casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput>;
};
export type casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput>;
};
export type casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput>;
};
export type casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput>;
};
export type casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput>;
};
export type casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput>;
};
export type casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput>;
};
export type casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput>;
};
export type casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput>;
};
export type casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput>;
};
export type casos_sopUpsertWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedCreateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput, Prisma.casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput>;
};
export type casos_sopUpdateManyWithWhereWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput>;
};
export type casos_sopCreateWithoutEvento_casoInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutEvento_casoInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutEvento_casoInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutEvento_casoInput, Prisma.casos_sopUncheckedCreateWithoutEvento_casoInput>;
};
export type casos_sopUpsertWithoutEvento_casoInput = {
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutEvento_casoInput, Prisma.casos_sopUncheckedUpdateWithoutEvento_casoInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutEvento_casoInput, Prisma.casos_sopUncheckedCreateWithoutEvento_casoInput>;
    where?: Prisma.casos_sopWhereInput;
};
export type casos_sopUpdateToOneWithWhereWithoutEvento_casoInput = {
    where?: Prisma.casos_sopWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutEvento_casoInput, Prisma.casos_sopUncheckedUpdateWithoutEvento_casoInput>;
};
export type casos_sopUpdateWithoutEvento_casoInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutEvento_casoInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopCreateWithoutTimeline_casoInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutTimeline_casoInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutTimeline_casoInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutTimeline_casoInput, Prisma.casos_sopUncheckedCreateWithoutTimeline_casoInput>;
};
export type casos_sopUpsertWithoutTimeline_casoInput = {
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutTimeline_casoInput, Prisma.casos_sopUncheckedUpdateWithoutTimeline_casoInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutTimeline_casoInput, Prisma.casos_sopUncheckedCreateWithoutTimeline_casoInput>;
    where?: Prisma.casos_sopWhereInput;
};
export type casos_sopUpdateToOneWithWhereWithoutTimeline_casoInput = {
    where?: Prisma.casos_sopWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutTimeline_casoInput, Prisma.casos_sopUncheckedUpdateWithoutTimeline_casoInput>;
};
export type casos_sopUpdateWithoutTimeline_casoInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutTimeline_casoInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopCreateWithoutInvestigacion_casoInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutInvestigacion_casoInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutInvestigacion_casoInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutInvestigacion_casoInput, Prisma.casos_sopUncheckedCreateWithoutInvestigacion_casoInput>;
};
export type casos_sopUpsertWithoutInvestigacion_casoInput = {
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutInvestigacion_casoInput, Prisma.casos_sopUncheckedUpdateWithoutInvestigacion_casoInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutInvestigacion_casoInput, Prisma.casos_sopUncheckedCreateWithoutInvestigacion_casoInput>;
    where?: Prisma.casos_sopWhereInput;
};
export type casos_sopUpdateToOneWithWhereWithoutInvestigacion_casoInput = {
    where?: Prisma.casos_sopWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutInvestigacion_casoInput, Prisma.casos_sopUncheckedUpdateWithoutInvestigacion_casoInput>;
};
export type casos_sopUpdateWithoutInvestigacion_casoInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutInvestigacion_casoInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopCreateWithoutPlanes_accionInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutPlanes_accionInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutPlanes_accionInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutPlanes_accionInput, Prisma.casos_sopUncheckedCreateWithoutPlanes_accionInput>;
};
export type casos_sopUpsertWithoutPlanes_accionInput = {
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutPlanes_accionInput, Prisma.casos_sopUncheckedUpdateWithoutPlanes_accionInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutPlanes_accionInput, Prisma.casos_sopUncheckedCreateWithoutPlanes_accionInput>;
    where?: Prisma.casos_sopWhereInput;
};
export type casos_sopUpdateToOneWithWhereWithoutPlanes_accionInput = {
    where?: Prisma.casos_sopWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutPlanes_accionInput, Prisma.casos_sopUncheckedUpdateWithoutPlanes_accionInput>;
};
export type casos_sopUpdateWithoutPlanes_accionInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutPlanes_accionInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopCreateWithoutSolicitudes_informacionInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutSolicitudes_informacionInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutSolicitudes_informacionInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutSolicitudes_informacionInput, Prisma.casos_sopUncheckedCreateWithoutSolicitudes_informacionInput>;
};
export type casos_sopUpsertWithoutSolicitudes_informacionInput = {
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutSolicitudes_informacionInput, Prisma.casos_sopUncheckedUpdateWithoutSolicitudes_informacionInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutSolicitudes_informacionInput, Prisma.casos_sopUncheckedCreateWithoutSolicitudes_informacionInput>;
    where?: Prisma.casos_sopWhereInput;
};
export type casos_sopUpdateToOneWithWhereWithoutSolicitudes_informacionInput = {
    where?: Prisma.casos_sopWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutSolicitudes_informacionInput, Prisma.casos_sopUncheckedUpdateWithoutSolicitudes_informacionInput>;
};
export type casos_sopUpdateWithoutSolicitudes_informacionInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutSolicitudes_informacionInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput>;
};
export type casos_sopCreateManyUsuarios_casos_sop_created_byTousuariosInputEnvelope = {
    data: Prisma.casos_sopCreateManyUsuarios_casos_sop_created_byTousuariosInput | Prisma.casos_sopCreateManyUsuarios_casos_sop_created_byTousuariosInput[];
    skipDuplicates?: boolean;
};
export type casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_planTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput>;
};
export type casos_sopCreateManyUsuarios_casos_sop_responsable_hallazgoTousuariosInputEnvelope = {
    data: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_hallazgoTousuariosInput | Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_hallazgoTousuariosInput[];
    skipDuplicates?: boolean;
};
export type casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    descripcion: string;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoCreateNestedManyWithoutCasos_sopInput;
    areas?: Prisma.areasCreateNestedOneWithoutCasos_sopInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_created_byTousuariosInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosCreateNestedOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleInput;
    evento_caso?: Prisma.evento_casoCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    evento_caso?: Prisma.evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
    planes_accion?: Prisma.planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput;
    timeline_caso?: Prisma.timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput;
};
export type casos_sopCreateOrConnectWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput>;
};
export type casos_sopCreateManyUsuarios_casos_sop_responsable_planTousuariosInputEnvelope = {
    data: Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_planTousuariosInput | Prisma.casos_sopCreateManyUsuarios_casos_sop_responsable_planTousuariosInput[];
    skipDuplicates?: boolean;
};
export type casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutUsuarios_casos_sop_created_byTousuariosInput, Prisma.casos_sopUncheckedUpdateWithoutUsuarios_casos_sop_created_byTousuariosInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_created_byTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_created_byTousuariosInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutUsuarios_casos_sop_created_byTousuariosInput, Prisma.casos_sopUncheckedUpdateWithoutUsuarios_casos_sop_created_byTousuariosInput>;
};
export type casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosInput>;
};
export type casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput, Prisma.casos_sopUncheckedUpdateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput, Prisma.casos_sopUncheckedUpdateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput>;
};
export type casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput>;
};
export type casos_sopUpsertWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    update: Prisma.XOR<Prisma.casos_sopUpdateWithoutUsuarios_casos_sop_responsable_planTousuariosInput, Prisma.casos_sopUncheckedUpdateWithoutUsuarios_casos_sop_responsable_planTousuariosInput>;
    create: Prisma.XOR<Prisma.casos_sopCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput, Prisma.casos_sopUncheckedCreateWithoutUsuarios_casos_sop_responsable_planTousuariosInput>;
};
export type casos_sopUpdateWithWhereUniqueWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    where: Prisma.casos_sopWhereUniqueInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateWithoutUsuarios_casos_sop_responsable_planTousuariosInput, Prisma.casos_sopUncheckedUpdateWithoutUsuarios_casos_sop_responsable_planTousuariosInput>;
};
export type casos_sopUpdateManyWithWhereWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    where: Prisma.casos_sopScalarWhereInput;
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput>;
};
export type casos_sopCreateManyAreasInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopUpdateWithoutAreasInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutAreasInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutAreasInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopCreateManyCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopUpdateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopUpdateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_estado_planTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopUpdateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_procedenciaTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopUpdateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopUpdateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopUpdateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_tipoTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopUpdateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutCatalogo_detalle_casos_sop_tipo_sopTocatalogo_detalleInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopCreateManyUsuarios_casos_sop_created_byTousuariosInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopCreateManyUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    responsable_plan?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopCreateManyUsuarios_casos_sop_responsable_planTousuariosInput = {
    id_caso?: number;
    codigo_sop: string;
    titulo?: string | null;
    nombre_reportante?: string | null;
    correo_reportante?: string | null;
    telefono_reportante?: string | null;
    fecha_hallazgo: Date | string;
    fecha_evento?: Date | string | null;
    estado_hallazgo: number;
    dias_abierto?: number | null;
    procedencia: number;
    tipo: number;
    descripcion: string;
    responsable_hallazgo?: number | null;
    tipo_sop: number;
    subtipo_sop?: number | null;
    peligro?: string | null;
    consecuencia?: string | null;
    clasificacion?: string | null;
    analisis_riesgo?: number | null;
    acr?: string | null;
    area_responsable?: number | null;
    estado_plan?: number | null;
    fecha_plan?: Date | string | null;
    fecha_reprogramada?: Date | string | null;
    dias_abierto_plan?: number | null;
    observaciones?: string | null;
    created_by?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type casos_sopUpdateWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_created_byTousuariosInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopUpdateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_planTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_planTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_hallazgoTousuariosInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    responsable_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type casos_sopUpdateWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUpdateManyWithoutCasos_sopNestedInput;
    areas?: Prisma.areasUpdateOneWithoutCasos_sopNestedInput;
    usuarios_casos_sop_created_byTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_created_byTousuariosNestedInput;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_estado_hallazgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_estado_planTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_procedenciaTocatalogo_detalleNestedInput;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: Prisma.usuariosUpdateOneWithoutCasos_sop_casos_sop_responsable_hallazgoTousuariosNestedInput;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_analisis_riesgoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutCasos_sop_casos_sop_subtipo_sopTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipoTocatalogo_detalleNestedInput;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutCasos_sop_casos_sop_tipo_sopTocatalogo_detalleNestedInput;
    evento_caso?: Prisma.evento_casoUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anexos_caso?: Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    evento_caso?: Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
    planes_accion?: Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    investigacion_caso?: Prisma.investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput;
    solicitudes_informacion?: Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput;
    timeline_caso?: Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput;
};
export type casos_sopUncheckedUpdateManyWithoutUsuarios_casos_sop_responsable_planTousuariosInput = {
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_sop?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nombre_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correo_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telefono_reportante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_hallazgo?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_evento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    estado_hallazgo?: Prisma.IntFieldUpdateOperationsInput | number;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procedencia?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable_hallazgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo_sop?: Prisma.IntFieldUpdateOperationsInput | number;
    subtipo_sop?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    peligro?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecuencia?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clasificacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    analisis_riesgo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    acr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_plan?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto_plan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type Casos_sopCountOutputType
 */
export type Casos_sopCountOutputType = {
    anexos_caso: number;
    evento_caso: number;
    planes_accion: number;
    solicitudes_informacion: number;
    timeline_caso: number;
};
export type Casos_sopCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    anexos_caso?: boolean | Casos_sopCountOutputTypeCountAnexos_casoArgs;
    evento_caso?: boolean | Casos_sopCountOutputTypeCountEvento_casoArgs;
    planes_accion?: boolean | Casos_sopCountOutputTypeCountPlanes_accionArgs;
    solicitudes_informacion?: boolean | Casos_sopCountOutputTypeCountSolicitudes_informacionArgs;
    timeline_caso?: boolean | Casos_sopCountOutputTypeCountTimeline_casoArgs;
};
/**
 * Casos_sopCountOutputType without action
 */
export type Casos_sopCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Casos_sopCountOutputType
     */
    select?: Prisma.Casos_sopCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * Casos_sopCountOutputType without action
 */
export type Casos_sopCountOutputTypeCountAnexos_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.anexos_casoWhereInput;
};
/**
 * Casos_sopCountOutputType without action
 */
export type Casos_sopCountOutputTypeCountEvento_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.evento_casoWhereInput;
};
/**
 * Casos_sopCountOutputType without action
 */
export type Casos_sopCountOutputTypeCountPlanes_accionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.planes_accionWhereInput;
};
/**
 * Casos_sopCountOutputType without action
 */
export type Casos_sopCountOutputTypeCountSolicitudes_informacionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitudes_informacionWhereInput;
};
/**
 * Casos_sopCountOutputType without action
 */
export type Casos_sopCountOutputTypeCountTimeline_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.timeline_casoWhereInput;
};
export type casos_sopSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_caso?: boolean;
    codigo_sop?: boolean;
    titulo?: boolean;
    nombre_reportante?: boolean;
    correo_reportante?: boolean;
    telefono_reportante?: boolean;
    fecha_hallazgo?: boolean;
    fecha_evento?: boolean;
    estado_hallazgo?: boolean;
    dias_abierto?: boolean;
    procedencia?: boolean;
    tipo?: boolean;
    descripcion?: boolean;
    responsable_hallazgo?: boolean;
    tipo_sop?: boolean;
    subtipo_sop?: boolean;
    peligro?: boolean;
    consecuencia?: boolean;
    clasificacion?: boolean;
    analisis_riesgo?: boolean;
    acr?: boolean;
    area_responsable?: boolean;
    responsable_plan?: boolean;
    estado_plan?: boolean;
    fecha_plan?: boolean;
    fecha_reprogramada?: boolean;
    dias_abierto_plan?: boolean;
    observaciones?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    anexos_caso?: boolean | Prisma.casos_sop$anexos_casoArgs<ExtArgs>;
    areas?: boolean | Prisma.casos_sop$areasArgs<ExtArgs>;
    usuarios_casos_sop_created_byTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_created_byTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_estado_planTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>;
    usuarios_casos_sop_responsable_planTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_planTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    evento_caso?: boolean | Prisma.casos_sop$evento_casoArgs<ExtArgs>;
    planes_accion?: boolean | Prisma.casos_sop$planes_accionArgs<ExtArgs>;
    investigacion_caso?: boolean | Prisma.casos_sop$investigacion_casoArgs<ExtArgs>;
    solicitudes_informacion?: boolean | Prisma.casos_sop$solicitudes_informacionArgs<ExtArgs>;
    timeline_caso?: boolean | Prisma.casos_sop$timeline_casoArgs<ExtArgs>;
    _count?: boolean | Prisma.Casos_sopCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["casos_sop"]>;
export type casos_sopSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_caso?: boolean;
    codigo_sop?: boolean;
    titulo?: boolean;
    nombre_reportante?: boolean;
    correo_reportante?: boolean;
    telefono_reportante?: boolean;
    fecha_hallazgo?: boolean;
    fecha_evento?: boolean;
    estado_hallazgo?: boolean;
    dias_abierto?: boolean;
    procedencia?: boolean;
    tipo?: boolean;
    descripcion?: boolean;
    responsable_hallazgo?: boolean;
    tipo_sop?: boolean;
    subtipo_sop?: boolean;
    peligro?: boolean;
    consecuencia?: boolean;
    clasificacion?: boolean;
    analisis_riesgo?: boolean;
    acr?: boolean;
    area_responsable?: boolean;
    responsable_plan?: boolean;
    estado_plan?: boolean;
    fecha_plan?: boolean;
    fecha_reprogramada?: boolean;
    dias_abierto_plan?: boolean;
    observaciones?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    areas?: boolean | Prisma.casos_sop$areasArgs<ExtArgs>;
    usuarios_casos_sop_created_byTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_created_byTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_estado_planTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>;
    usuarios_casos_sop_responsable_planTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_planTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["casos_sop"]>;
export type casos_sopSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_caso?: boolean;
    codigo_sop?: boolean;
    titulo?: boolean;
    nombre_reportante?: boolean;
    correo_reportante?: boolean;
    telefono_reportante?: boolean;
    fecha_hallazgo?: boolean;
    fecha_evento?: boolean;
    estado_hallazgo?: boolean;
    dias_abierto?: boolean;
    procedencia?: boolean;
    tipo?: boolean;
    descripcion?: boolean;
    responsable_hallazgo?: boolean;
    tipo_sop?: boolean;
    subtipo_sop?: boolean;
    peligro?: boolean;
    consecuencia?: boolean;
    clasificacion?: boolean;
    analisis_riesgo?: boolean;
    acr?: boolean;
    area_responsable?: boolean;
    responsable_plan?: boolean;
    estado_plan?: boolean;
    fecha_plan?: boolean;
    fecha_reprogramada?: boolean;
    dias_abierto_plan?: boolean;
    observaciones?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    areas?: boolean | Prisma.casos_sop$areasArgs<ExtArgs>;
    usuarios_casos_sop_created_byTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_created_byTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_estado_planTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>;
    usuarios_casos_sop_responsable_planTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_planTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["casos_sop"]>;
export type casos_sopSelectScalar = {
    id_caso?: boolean;
    codigo_sop?: boolean;
    titulo?: boolean;
    nombre_reportante?: boolean;
    correo_reportante?: boolean;
    telefono_reportante?: boolean;
    fecha_hallazgo?: boolean;
    fecha_evento?: boolean;
    estado_hallazgo?: boolean;
    dias_abierto?: boolean;
    procedencia?: boolean;
    tipo?: boolean;
    descripcion?: boolean;
    responsable_hallazgo?: boolean;
    tipo_sop?: boolean;
    subtipo_sop?: boolean;
    peligro?: boolean;
    consecuencia?: boolean;
    clasificacion?: boolean;
    analisis_riesgo?: boolean;
    acr?: boolean;
    area_responsable?: boolean;
    responsable_plan?: boolean;
    estado_plan?: boolean;
    fecha_plan?: boolean;
    fecha_reprogramada?: boolean;
    dias_abierto_plan?: boolean;
    observaciones?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type casos_sopOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_caso" | "codigo_sop" | "titulo" | "nombre_reportante" | "correo_reportante" | "telefono_reportante" | "fecha_hallazgo" | "fecha_evento" | "estado_hallazgo" | "dias_abierto" | "procedencia" | "tipo" | "descripcion" | "responsable_hallazgo" | "tipo_sop" | "subtipo_sop" | "peligro" | "consecuencia" | "clasificacion" | "analisis_riesgo" | "acr" | "area_responsable" | "responsable_plan" | "estado_plan" | "fecha_plan" | "fecha_reprogramada" | "dias_abierto_plan" | "observaciones" | "created_by" | "created_at" | "updated_at", ExtArgs["result"]["casos_sop"]>;
export type casos_sopInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    anexos_caso?: boolean | Prisma.casos_sop$anexos_casoArgs<ExtArgs>;
    areas?: boolean | Prisma.casos_sop$areasArgs<ExtArgs>;
    usuarios_casos_sop_created_byTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_created_byTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_estado_planTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>;
    usuarios_casos_sop_responsable_planTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_planTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    evento_caso?: boolean | Prisma.casos_sop$evento_casoArgs<ExtArgs>;
    planes_accion?: boolean | Prisma.casos_sop$planes_accionArgs<ExtArgs>;
    investigacion_caso?: boolean | Prisma.casos_sop$investigacion_casoArgs<ExtArgs>;
    solicitudes_informacion?: boolean | Prisma.casos_sop$solicitudes_informacionArgs<ExtArgs>;
    timeline_caso?: boolean | Prisma.casos_sop$timeline_casoArgs<ExtArgs>;
    _count?: boolean | Prisma.Casos_sopCountOutputTypeDefaultArgs<ExtArgs>;
};
export type casos_sopIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    areas?: boolean | Prisma.casos_sop$areasArgs<ExtArgs>;
    usuarios_casos_sop_created_byTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_created_byTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_estado_planTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>;
    usuarios_casos_sop_responsable_planTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_planTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
};
export type casos_sopIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    areas?: boolean | Prisma.casos_sop$areasArgs<ExtArgs>;
    usuarios_casos_sop_created_byTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_created_byTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_estado_planTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios_casos_sop_responsable_hallazgoTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>;
    usuarios_casos_sop_responsable_planTousuarios?: boolean | Prisma.casos_sop$usuarios_casos_sop_responsable_planTousuariosArgs<ExtArgs>;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?: boolean | Prisma.casos_sop$catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
};
export type $casos_sopPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "casos_sop";
    objects: {
        anexos_caso: Prisma.$anexos_casoPayload<ExtArgs>[];
        areas: Prisma.$areasPayload<ExtArgs> | null;
        usuarios_casos_sop_created_byTousuarios: Prisma.$usuariosPayload<ExtArgs> | null;
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs>;
        catalogo_detalle_casos_sop_estado_planTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs>;
        usuarios_casos_sop_responsable_hallazgoTousuarios: Prisma.$usuariosPayload<ExtArgs> | null;
        usuarios_casos_sop_responsable_planTousuarios: Prisma.$usuariosPayload<ExtArgs> | null;
        catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        catalogo_detalle_casos_sop_tipoTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs>;
        catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs>;
        evento_caso: Prisma.$evento_casoPayload<ExtArgs>[];
        planes_accion: Prisma.$planes_accionPayload<ExtArgs>[];
        investigacion_caso: Prisma.$investigacion_casoPayload<ExtArgs> | null;
        solicitudes_informacion: Prisma.$solicitudes_informacionPayload<ExtArgs>[];
        timeline_caso: Prisma.$timeline_casoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        descripcion: string;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["casos_sop"]>;
    composites: {};
};
export type casos_sopGetPayload<S extends boolean | null | undefined | casos_sopDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$casos_sopPayload, S>;
export type casos_sopCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<casos_sopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Casos_sopCountAggregateInputType | true;
};
export interface casos_sopDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['casos_sop'];
        meta: {
            name: 'casos_sop';
        };
    };
    /**
     * Find zero or one Casos_sop that matches the filter.
     * @param {casos_sopFindUniqueArgs} args - Arguments to find a Casos_sop
     * @example
     * // Get one Casos_sop
     * const casos_sop = await prisma.casos_sop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends casos_sopFindUniqueArgs>(args: Prisma.SelectSubset<T, casos_sopFindUniqueArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Casos_sop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {casos_sopFindUniqueOrThrowArgs} args - Arguments to find a Casos_sop
     * @example
     * // Get one Casos_sop
     * const casos_sop = await prisma.casos_sop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends casos_sopFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, casos_sopFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Casos_sop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {casos_sopFindFirstArgs} args - Arguments to find a Casos_sop
     * @example
     * // Get one Casos_sop
     * const casos_sop = await prisma.casos_sop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends casos_sopFindFirstArgs>(args?: Prisma.SelectSubset<T, casos_sopFindFirstArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Casos_sop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {casos_sopFindFirstOrThrowArgs} args - Arguments to find a Casos_sop
     * @example
     * // Get one Casos_sop
     * const casos_sop = await prisma.casos_sop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends casos_sopFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, casos_sopFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Casos_sops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {casos_sopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Casos_sops
     * const casos_sops = await prisma.casos_sop.findMany()
     *
     * // Get first 10 Casos_sops
     * const casos_sops = await prisma.casos_sop.findMany({ take: 10 })
     *
     * // Only select the `id_caso`
     * const casos_sopWithId_casoOnly = await prisma.casos_sop.findMany({ select: { id_caso: true } })
     *
     */
    findMany<T extends casos_sopFindManyArgs>(args?: Prisma.SelectSubset<T, casos_sopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Casos_sop.
     * @param {casos_sopCreateArgs} args - Arguments to create a Casos_sop.
     * @example
     * // Create one Casos_sop
     * const Casos_sop = await prisma.casos_sop.create({
     *   data: {
     *     // ... data to create a Casos_sop
     *   }
     * })
     *
     */
    create<T extends casos_sopCreateArgs>(args: Prisma.SelectSubset<T, casos_sopCreateArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Casos_sops.
     * @param {casos_sopCreateManyArgs} args - Arguments to create many Casos_sops.
     * @example
     * // Create many Casos_sops
     * const casos_sop = await prisma.casos_sop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends casos_sopCreateManyArgs>(args?: Prisma.SelectSubset<T, casos_sopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Casos_sops and returns the data saved in the database.
     * @param {casos_sopCreateManyAndReturnArgs} args - Arguments to create many Casos_sops.
     * @example
     * // Create many Casos_sops
     * const casos_sop = await prisma.casos_sop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Casos_sops and only return the `id_caso`
     * const casos_sopWithId_casoOnly = await prisma.casos_sop.createManyAndReturn({
     *   select: { id_caso: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends casos_sopCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, casos_sopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Casos_sop.
     * @param {casos_sopDeleteArgs} args - Arguments to delete one Casos_sop.
     * @example
     * // Delete one Casos_sop
     * const Casos_sop = await prisma.casos_sop.delete({
     *   where: {
     *     // ... filter to delete one Casos_sop
     *   }
     * })
     *
     */
    delete<T extends casos_sopDeleteArgs>(args: Prisma.SelectSubset<T, casos_sopDeleteArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Casos_sop.
     * @param {casos_sopUpdateArgs} args - Arguments to update one Casos_sop.
     * @example
     * // Update one Casos_sop
     * const casos_sop = await prisma.casos_sop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends casos_sopUpdateArgs>(args: Prisma.SelectSubset<T, casos_sopUpdateArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Casos_sops.
     * @param {casos_sopDeleteManyArgs} args - Arguments to filter Casos_sops to delete.
     * @example
     * // Delete a few Casos_sops
     * const { count } = await prisma.casos_sop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends casos_sopDeleteManyArgs>(args?: Prisma.SelectSubset<T, casos_sopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Casos_sops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {casos_sopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Casos_sops
     * const casos_sop = await prisma.casos_sop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends casos_sopUpdateManyArgs>(args: Prisma.SelectSubset<T, casos_sopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Casos_sops and returns the data updated in the database.
     * @param {casos_sopUpdateManyAndReturnArgs} args - Arguments to update many Casos_sops.
     * @example
     * // Update many Casos_sops
     * const casos_sop = await prisma.casos_sop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Casos_sops and only return the `id_caso`
     * const casos_sopWithId_casoOnly = await prisma.casos_sop.updateManyAndReturn({
     *   select: { id_caso: true },
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
    updateManyAndReturn<T extends casos_sopUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, casos_sopUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Casos_sop.
     * @param {casos_sopUpsertArgs} args - Arguments to update or create a Casos_sop.
     * @example
     * // Update or create a Casos_sop
     * const casos_sop = await prisma.casos_sop.upsert({
     *   create: {
     *     // ... data to create a Casos_sop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Casos_sop we want to update
     *   }
     * })
     */
    upsert<T extends casos_sopUpsertArgs>(args: Prisma.SelectSubset<T, casos_sopUpsertArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Casos_sops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {casos_sopCountArgs} args - Arguments to filter Casos_sops to count.
     * @example
     * // Count the number of Casos_sops
     * const count = await prisma.casos_sop.count({
     *   where: {
     *     // ... the filter for the Casos_sops we want to count
     *   }
     * })
    **/
    count<T extends casos_sopCountArgs>(args?: Prisma.Subset<T, casos_sopCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Casos_sopCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Casos_sop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Casos_sopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Casos_sopAggregateArgs>(args: Prisma.Subset<T, Casos_sopAggregateArgs>): Prisma.PrismaPromise<GetCasos_sopAggregateType<T>>;
    /**
     * Group by Casos_sop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {casos_sopGroupByArgs} args - Group by arguments.
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
    groupBy<T extends casos_sopGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: casos_sopGroupByArgs['orderBy'];
    } : {
        orderBy?: casos_sopGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, casos_sopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCasos_sopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the casos_sop model
     */
    readonly fields: casos_sopFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for casos_sop.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__casos_sopClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    anexos_caso<T extends Prisma.casos_sop$anexos_casoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$anexos_casoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    areas<T extends Prisma.casos_sop$areasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$areasArgs<ExtArgs>>): Prisma.Prisma__areasClient<runtime.Types.Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios_casos_sop_created_byTousuarios<T extends Prisma.casos_sop$usuarios_casos_sop_created_byTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$usuarios_casos_sop_created_byTousuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle<T extends Prisma.catalogo_detalleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.catalogo_detalleDefaultArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle<T extends Prisma.casos_sop$catalogo_detalle_casos_sop_estado_planTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$catalogo_detalle_casos_sop_estado_planTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle<T extends Prisma.catalogo_detalleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.catalogo_detalleDefaultArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usuarios_casos_sop_responsable_hallazgoTousuarios<T extends Prisma.casos_sop$usuarios_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$usuarios_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios_casos_sop_responsable_planTousuarios<T extends Prisma.casos_sop$usuarios_casos_sop_responsable_planTousuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$usuarios_casos_sop_responsable_planTousuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle<T extends Prisma.casos_sop$catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle<T extends Prisma.casos_sop$catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle<T extends Prisma.catalogo_detalleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.catalogo_detalleDefaultArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle<T extends Prisma.catalogo_detalleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.catalogo_detalleDefaultArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    evento_caso<T extends Prisma.casos_sop$evento_casoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$evento_casoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    planes_accion<T extends Prisma.casos_sop$planes_accionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$planes_accionArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    investigacion_caso<T extends Prisma.casos_sop$investigacion_casoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$investigacion_casoArgs<ExtArgs>>): Prisma.Prisma__investigacion_casoClient<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    solicitudes_informacion<T extends Prisma.casos_sop$solicitudes_informacionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$solicitudes_informacionArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    timeline_caso<T extends Prisma.casos_sop$timeline_casoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sop$timeline_casoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the casos_sop model
 */
export interface casos_sopFieldRefs {
    readonly id_caso: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly codigo_sop: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly titulo: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly nombre_reportante: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly correo_reportante: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly telefono_reportante: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly fecha_hallazgo: Prisma.FieldRef<"casos_sop", 'DateTime'>;
    readonly fecha_evento: Prisma.FieldRef<"casos_sop", 'DateTime'>;
    readonly estado_hallazgo: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly dias_abierto: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly procedencia: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly tipo: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly descripcion: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly responsable_hallazgo: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly tipo_sop: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly subtipo_sop: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly peligro: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly consecuencia: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly clasificacion: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly analisis_riesgo: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly acr: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly area_responsable: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly responsable_plan: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly estado_plan: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly fecha_plan: Prisma.FieldRef<"casos_sop", 'DateTime'>;
    readonly fecha_reprogramada: Prisma.FieldRef<"casos_sop", 'DateTime'>;
    readonly dias_abierto_plan: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly observaciones: Prisma.FieldRef<"casos_sop", 'String'>;
    readonly created_by: Prisma.FieldRef<"casos_sop", 'Int'>;
    readonly created_at: Prisma.FieldRef<"casos_sop", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"casos_sop", 'DateTime'>;
}
/**
 * casos_sop findUnique
 */
export type casos_sopFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which casos_sop to fetch.
     */
    where: Prisma.casos_sopWhereUniqueInput;
};
/**
 * casos_sop findUniqueOrThrow
 */
export type casos_sopFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which casos_sop to fetch.
     */
    where: Prisma.casos_sopWhereUniqueInput;
};
/**
 * casos_sop findFirst
 */
export type casos_sopFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which casos_sop to fetch.
     */
    where?: Prisma.casos_sopWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of casos_sops to fetch.
     */
    orderBy?: Prisma.casos_sopOrderByWithRelationInput | Prisma.casos_sopOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for casos_sops.
     */
    cursor?: Prisma.casos_sopWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` casos_sops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` casos_sops.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of casos_sops.
     */
    distinct?: Prisma.Casos_sopScalarFieldEnum | Prisma.Casos_sopScalarFieldEnum[];
};
/**
 * casos_sop findFirstOrThrow
 */
export type casos_sopFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which casos_sop to fetch.
     */
    where?: Prisma.casos_sopWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of casos_sops to fetch.
     */
    orderBy?: Prisma.casos_sopOrderByWithRelationInput | Prisma.casos_sopOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for casos_sops.
     */
    cursor?: Prisma.casos_sopWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` casos_sops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` casos_sops.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of casos_sops.
     */
    distinct?: Prisma.Casos_sopScalarFieldEnum | Prisma.Casos_sopScalarFieldEnum[];
};
/**
 * casos_sop findMany
 */
export type casos_sopFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which casos_sops to fetch.
     */
    where?: Prisma.casos_sopWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of casos_sops to fetch.
     */
    orderBy?: Prisma.casos_sopOrderByWithRelationInput | Prisma.casos_sopOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing casos_sops.
     */
    cursor?: Prisma.casos_sopWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` casos_sops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` casos_sops.
     */
    skip?: number;
    distinct?: Prisma.Casos_sopScalarFieldEnum | Prisma.Casos_sopScalarFieldEnum[];
};
/**
 * casos_sop create
 */
export type casos_sopCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a casos_sop.
     */
    data: Prisma.XOR<Prisma.casos_sopCreateInput, Prisma.casos_sopUncheckedCreateInput>;
};
/**
 * casos_sop createMany
 */
export type casos_sopCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many casos_sops.
     */
    data: Prisma.casos_sopCreateManyInput | Prisma.casos_sopCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * casos_sop createManyAndReturn
 */
export type casos_sopCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the casos_sop
     */
    select?: Prisma.casos_sopSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the casos_sop
     */
    omit?: Prisma.casos_sopOmit<ExtArgs> | null;
    /**
     * The data used to create many casos_sops.
     */
    data: Prisma.casos_sopCreateManyInput | Prisma.casos_sopCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.casos_sopIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * casos_sop update
 */
export type casos_sopUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a casos_sop.
     */
    data: Prisma.XOR<Prisma.casos_sopUpdateInput, Prisma.casos_sopUncheckedUpdateInput>;
    /**
     * Choose, which casos_sop to update.
     */
    where: Prisma.casos_sopWhereUniqueInput;
};
/**
 * casos_sop updateMany
 */
export type casos_sopUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update casos_sops.
     */
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyInput>;
    /**
     * Filter which casos_sops to update
     */
    where?: Prisma.casos_sopWhereInput;
    /**
     * Limit how many casos_sops to update.
     */
    limit?: number;
};
/**
 * casos_sop updateManyAndReturn
 */
export type casos_sopUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the casos_sop
     */
    select?: Prisma.casos_sopSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the casos_sop
     */
    omit?: Prisma.casos_sopOmit<ExtArgs> | null;
    /**
     * The data used to update casos_sops.
     */
    data: Prisma.XOR<Prisma.casos_sopUpdateManyMutationInput, Prisma.casos_sopUncheckedUpdateManyInput>;
    /**
     * Filter which casos_sops to update
     */
    where?: Prisma.casos_sopWhereInput;
    /**
     * Limit how many casos_sops to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.casos_sopIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * casos_sop upsert
 */
export type casos_sopUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the casos_sop to update in case it exists.
     */
    where: Prisma.casos_sopWhereUniqueInput;
    /**
     * In case the casos_sop found by the `where` argument doesn't exist, create a new casos_sop with this data.
     */
    create: Prisma.XOR<Prisma.casos_sopCreateInput, Prisma.casos_sopUncheckedCreateInput>;
    /**
     * In case the casos_sop was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.casos_sopUpdateInput, Prisma.casos_sopUncheckedUpdateInput>;
};
/**
 * casos_sop delete
 */
export type casos_sopDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which casos_sop to delete.
     */
    where: Prisma.casos_sopWhereUniqueInput;
};
/**
 * casos_sop deleteMany
 */
export type casos_sopDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which casos_sops to delete
     */
    where?: Prisma.casos_sopWhereInput;
    /**
     * Limit how many casos_sops to delete.
     */
    limit?: number;
};
/**
 * casos_sop.anexos_caso
 */
export type casos_sop$anexos_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.areas
 */
export type casos_sop$areasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.usuarios_casos_sop_created_byTousuarios
 */
export type casos_sop$usuarios_casos_sop_created_byTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.catalogo_detalle_casos_sop_estado_planTocatalogo_detalle
 */
export type casos_sop$catalogo_detalle_casos_sop_estado_planTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.usuarios_casos_sop_responsable_hallazgoTousuarios
 */
export type casos_sop$usuarios_casos_sop_responsable_hallazgoTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.usuarios_casos_sop_responsable_planTousuarios
 */
export type casos_sop$usuarios_casos_sop_responsable_planTousuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle
 */
export type casos_sop$catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle
 */
export type casos_sop$catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.evento_caso
 */
export type casos_sop$evento_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.planes_accion
 */
export type casos_sop$planes_accionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * casos_sop.investigacion_caso
 */
export type casos_sop$investigacion_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * casos_sop.solicitudes_informacion
 */
export type casos_sop$solicitudes_informacionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_informacion
     */
    select?: Prisma.solicitudes_informacionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_informacion
     */
    omit?: Prisma.solicitudes_informacionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_informacionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_informacionWhereInput;
    orderBy?: Prisma.solicitudes_informacionOrderByWithRelationInput | Prisma.solicitudes_informacionOrderByWithRelationInput[];
    cursor?: Prisma.solicitudes_informacionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitudes_informacionScalarFieldEnum | Prisma.Solicitudes_informacionScalarFieldEnum[];
};
/**
 * casos_sop.timeline_caso
 */
export type casos_sop$timeline_casoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the timeline_caso
     */
    select?: Prisma.timeline_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the timeline_caso
     */
    omit?: Prisma.timeline_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.timeline_casoInclude<ExtArgs> | null;
    where?: Prisma.timeline_casoWhereInput;
    orderBy?: Prisma.timeline_casoOrderByWithRelationInput | Prisma.timeline_casoOrderByWithRelationInput[];
    cursor?: Prisma.timeline_casoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Timeline_casoScalarFieldEnum | Prisma.Timeline_casoScalarFieldEnum[];
};
/**
 * casos_sop without action
 */
export type casos_sopDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=casos_sop.d.ts.map