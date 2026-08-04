import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model incidencias
 *
 */
export type incidenciasModel = runtime.Types.Result.DefaultSelection<Prisma.$incidenciasPayload>;
export type AggregateIncidencias = {
    _count: IncidenciasCountAggregateOutputType | null;
    _avg: IncidenciasAvgAggregateOutputType | null;
    _sum: IncidenciasSumAggregateOutputType | null;
    _min: IncidenciasMinAggregateOutputType | null;
    _max: IncidenciasMaxAggregateOutputType | null;
};
export type IncidenciasAvgAggregateOutputType = {
    id_incidencia: number | null;
    id_usuario_reporta: number | null;
    id_estacion: number | null;
    id_area_responsable: number | null;
};
export type IncidenciasSumAggregateOutputType = {
    id_incidencia: number | null;
    id_usuario_reporta: number | null;
    id_estacion: number | null;
    id_area_responsable: number | null;
};
export type IncidenciasMinAggregateOutputType = {
    id_incidencia: number | null;
    codigo_incidencia: string | null;
    tipo_evento: string | null;
    descripcion: string | null;
    nivel_riesgo: string | null;
    estado: string | null;
    fecha_registro: Date | null;
    fecha_limite: Date | null;
    id_usuario_reporta: number | null;
    id_estacion: number | null;
    id_area_responsable: number | null;
};
export type IncidenciasMaxAggregateOutputType = {
    id_incidencia: number | null;
    codigo_incidencia: string | null;
    tipo_evento: string | null;
    descripcion: string | null;
    nivel_riesgo: string | null;
    estado: string | null;
    fecha_registro: Date | null;
    fecha_limite: Date | null;
    id_usuario_reporta: number | null;
    id_estacion: number | null;
    id_area_responsable: number | null;
};
export type IncidenciasCountAggregateOutputType = {
    id_incidencia: number;
    codigo_incidencia: number;
    tipo_evento: number;
    descripcion: number;
    nivel_riesgo: number;
    estado: number;
    fecha_registro: number;
    fecha_limite: number;
    id_usuario_reporta: number;
    id_estacion: number;
    id_area_responsable: number;
    _all: number;
};
export type IncidenciasAvgAggregateInputType = {
    id_incidencia?: true;
    id_usuario_reporta?: true;
    id_estacion?: true;
    id_area_responsable?: true;
};
export type IncidenciasSumAggregateInputType = {
    id_incidencia?: true;
    id_usuario_reporta?: true;
    id_estacion?: true;
    id_area_responsable?: true;
};
export type IncidenciasMinAggregateInputType = {
    id_incidencia?: true;
    codigo_incidencia?: true;
    tipo_evento?: true;
    descripcion?: true;
    nivel_riesgo?: true;
    estado?: true;
    fecha_registro?: true;
    fecha_limite?: true;
    id_usuario_reporta?: true;
    id_estacion?: true;
    id_area_responsable?: true;
};
export type IncidenciasMaxAggregateInputType = {
    id_incidencia?: true;
    codigo_incidencia?: true;
    tipo_evento?: true;
    descripcion?: true;
    nivel_riesgo?: true;
    estado?: true;
    fecha_registro?: true;
    fecha_limite?: true;
    id_usuario_reporta?: true;
    id_estacion?: true;
    id_area_responsable?: true;
};
export type IncidenciasCountAggregateInputType = {
    id_incidencia?: true;
    codigo_incidencia?: true;
    tipo_evento?: true;
    descripcion?: true;
    nivel_riesgo?: true;
    estado?: true;
    fecha_registro?: true;
    fecha_limite?: true;
    id_usuario_reporta?: true;
    id_estacion?: true;
    id_area_responsable?: true;
    _all?: true;
};
export type IncidenciasAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which incidencias to aggregate.
     */
    where?: Prisma.incidenciasWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of incidencias to fetch.
     */
    orderBy?: Prisma.incidenciasOrderByWithRelationInput | Prisma.incidenciasOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.incidenciasWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` incidencias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` incidencias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned incidencias
    **/
    _count?: true | IncidenciasCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: IncidenciasAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: IncidenciasSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: IncidenciasMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: IncidenciasMaxAggregateInputType;
};
export type GetIncidenciasAggregateType<T extends IncidenciasAggregateArgs> = {
    [P in keyof T & keyof AggregateIncidencias]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIncidencias[P]> : Prisma.GetScalarType<T[P], AggregateIncidencias[P]>;
};
export type incidenciasGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.incidenciasWhereInput;
    orderBy?: Prisma.incidenciasOrderByWithAggregationInput | Prisma.incidenciasOrderByWithAggregationInput[];
    by: Prisma.IncidenciasScalarFieldEnum[] | Prisma.IncidenciasScalarFieldEnum;
    having?: Prisma.incidenciasScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IncidenciasCountAggregateInputType | true;
    _avg?: IncidenciasAvgAggregateInputType;
    _sum?: IncidenciasSumAggregateInputType;
    _min?: IncidenciasMinAggregateInputType;
    _max?: IncidenciasMaxAggregateInputType;
};
export type IncidenciasGroupByOutputType = {
    id_incidencia: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo: string | null;
    estado: string | null;
    fecha_registro: Date | null;
    fecha_limite: Date | null;
    id_usuario_reporta: number | null;
    id_estacion: number | null;
    id_area_responsable: number | null;
    _count: IncidenciasCountAggregateOutputType | null;
    _avg: IncidenciasAvgAggregateOutputType | null;
    _sum: IncidenciasSumAggregateOutputType | null;
    _min: IncidenciasMinAggregateOutputType | null;
    _max: IncidenciasMaxAggregateOutputType | null;
};
type GetIncidenciasGroupByPayload<T extends incidenciasGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IncidenciasGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IncidenciasGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IncidenciasGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IncidenciasGroupByOutputType[P]>;
}>>;
export type incidenciasWhereInput = {
    AND?: Prisma.incidenciasWhereInput | Prisma.incidenciasWhereInput[];
    OR?: Prisma.incidenciasWhereInput[];
    NOT?: Prisma.incidenciasWhereInput | Prisma.incidenciasWhereInput[];
    id_incidencia?: Prisma.IntFilter<"incidencias"> | number;
    codigo_incidencia?: Prisma.StringFilter<"incidencias"> | string;
    tipo_evento?: Prisma.StringFilter<"incidencias"> | string;
    descripcion?: Prisma.StringFilter<"incidencias"> | string;
    nivel_riesgo?: Prisma.StringNullableFilter<"incidencias"> | string | null;
    estado?: Prisma.StringNullableFilter<"incidencias"> | string | null;
    fecha_registro?: Prisma.DateTimeNullableFilter<"incidencias"> | Date | string | null;
    fecha_limite?: Prisma.DateTimeNullableFilter<"incidencias"> | Date | string | null;
    id_usuario_reporta?: Prisma.IntNullableFilter<"incidencias"> | number | null;
    id_estacion?: Prisma.IntNullableFilter<"incidencias"> | number | null;
    id_area_responsable?: Prisma.IntNullableFilter<"incidencias"> | number | null;
    evidencias?: Prisma.EvidenciasListRelationFilter;
    areas?: Prisma.XOR<Prisma.AreasNullableScalarRelationFilter, Prisma.areasWhereInput> | null;
    estaciones?: Prisma.XOR<Prisma.EstacionesNullableScalarRelationFilter, Prisma.estacionesWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    investigaciones?: Prisma.XOR<Prisma.InvestigacionesNullableScalarRelationFilter, Prisma.investigacionesWhereInput> | null;
    solicitudes_prorroga?: Prisma.Solicitudes_prorrogaListRelationFilter;
};
export type incidenciasOrderByWithRelationInput = {
    id_incidencia?: Prisma.SortOrder;
    codigo_incidencia?: Prisma.SortOrder;
    tipo_evento?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    nivel_riesgo?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_limite?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_usuario_reporta?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_estacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_area_responsable?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidencias?: Prisma.evidenciasOrderByRelationAggregateInput;
    areas?: Prisma.areasOrderByWithRelationInput;
    estaciones?: Prisma.estacionesOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
    investigaciones?: Prisma.investigacionesOrderByWithRelationInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaOrderByRelationAggregateInput;
};
export type incidenciasWhereUniqueInput = Prisma.AtLeast<{
    id_incidencia?: number;
    codigo_incidencia?: string;
    AND?: Prisma.incidenciasWhereInput | Prisma.incidenciasWhereInput[];
    OR?: Prisma.incidenciasWhereInput[];
    NOT?: Prisma.incidenciasWhereInput | Prisma.incidenciasWhereInput[];
    tipo_evento?: Prisma.StringFilter<"incidencias"> | string;
    descripcion?: Prisma.StringFilter<"incidencias"> | string;
    nivel_riesgo?: Prisma.StringNullableFilter<"incidencias"> | string | null;
    estado?: Prisma.StringNullableFilter<"incidencias"> | string | null;
    fecha_registro?: Prisma.DateTimeNullableFilter<"incidencias"> | Date | string | null;
    fecha_limite?: Prisma.DateTimeNullableFilter<"incidencias"> | Date | string | null;
    id_usuario_reporta?: Prisma.IntNullableFilter<"incidencias"> | number | null;
    id_estacion?: Prisma.IntNullableFilter<"incidencias"> | number | null;
    id_area_responsable?: Prisma.IntNullableFilter<"incidencias"> | number | null;
    evidencias?: Prisma.EvidenciasListRelationFilter;
    areas?: Prisma.XOR<Prisma.AreasNullableScalarRelationFilter, Prisma.areasWhereInput> | null;
    estaciones?: Prisma.XOR<Prisma.EstacionesNullableScalarRelationFilter, Prisma.estacionesWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    investigaciones?: Prisma.XOR<Prisma.InvestigacionesNullableScalarRelationFilter, Prisma.investigacionesWhereInput> | null;
    solicitudes_prorroga?: Prisma.Solicitudes_prorrogaListRelationFilter;
}, "id_incidencia" | "codigo_incidencia">;
export type incidenciasOrderByWithAggregationInput = {
    id_incidencia?: Prisma.SortOrder;
    codigo_incidencia?: Prisma.SortOrder;
    tipo_evento?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    nivel_riesgo?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_limite?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_usuario_reporta?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_estacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    id_area_responsable?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.incidenciasCountOrderByAggregateInput;
    _avg?: Prisma.incidenciasAvgOrderByAggregateInput;
    _max?: Prisma.incidenciasMaxOrderByAggregateInput;
    _min?: Prisma.incidenciasMinOrderByAggregateInput;
    _sum?: Prisma.incidenciasSumOrderByAggregateInput;
};
export type incidenciasScalarWhereWithAggregatesInput = {
    AND?: Prisma.incidenciasScalarWhereWithAggregatesInput | Prisma.incidenciasScalarWhereWithAggregatesInput[];
    OR?: Prisma.incidenciasScalarWhereWithAggregatesInput[];
    NOT?: Prisma.incidenciasScalarWhereWithAggregatesInput | Prisma.incidenciasScalarWhereWithAggregatesInput[];
    id_incidencia?: Prisma.IntWithAggregatesFilter<"incidencias"> | number;
    codigo_incidencia?: Prisma.StringWithAggregatesFilter<"incidencias"> | string;
    tipo_evento?: Prisma.StringWithAggregatesFilter<"incidencias"> | string;
    descripcion?: Prisma.StringWithAggregatesFilter<"incidencias"> | string;
    nivel_riesgo?: Prisma.StringNullableWithAggregatesFilter<"incidencias"> | string | null;
    estado?: Prisma.StringNullableWithAggregatesFilter<"incidencias"> | string | null;
    fecha_registro?: Prisma.DateTimeNullableWithAggregatesFilter<"incidencias"> | Date | string | null;
    fecha_limite?: Prisma.DateTimeNullableWithAggregatesFilter<"incidencias"> | Date | string | null;
    id_usuario_reporta?: Prisma.IntNullableWithAggregatesFilter<"incidencias"> | number | null;
    id_estacion?: Prisma.IntNullableWithAggregatesFilter<"incidencias"> | number | null;
    id_area_responsable?: Prisma.IntNullableWithAggregatesFilter<"incidencias"> | number | null;
};
export type incidenciasCreateInput = {
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    evidencias?: Prisma.evidenciasCreateNestedManyWithoutIncidenciasInput;
    areas?: Prisma.areasCreateNestedOneWithoutIncidenciasInput;
    estaciones?: Prisma.estacionesCreateNestedOneWithoutIncidenciasInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasUncheckedCreateInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_usuario_reporta?: number | null;
    id_estacion?: number | null;
    id_area_responsable?: number | null;
    evidencias?: Prisma.evidenciasUncheckedCreateNestedManyWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasUpdateInput = {
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evidencias?: Prisma.evidenciasUpdateManyWithoutIncidenciasNestedInput;
    areas?: Prisma.areasUpdateOneWithoutIncidenciasNestedInput;
    estaciones?: Prisma.estacionesUpdateOneWithoutIncidenciasNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_usuario_reporta?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_estacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    evidencias?: Prisma.evidenciasUncheckedUpdateManyWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasCreateManyInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_usuario_reporta?: number | null;
    id_estacion?: number | null;
    id_area_responsable?: number | null;
};
export type incidenciasUpdateManyMutationInput = {
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type incidenciasUncheckedUpdateManyInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_usuario_reporta?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_estacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type IncidenciasListRelationFilter = {
    every?: Prisma.incidenciasWhereInput;
    some?: Prisma.incidenciasWhereInput;
    none?: Prisma.incidenciasWhereInput;
};
export type incidenciasOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IncidenciasNullableScalarRelationFilter = {
    is?: Prisma.incidenciasWhereInput | null;
    isNot?: Prisma.incidenciasWhereInput | null;
};
export type incidenciasCountOrderByAggregateInput = {
    id_incidencia?: Prisma.SortOrder;
    codigo_incidencia?: Prisma.SortOrder;
    tipo_evento?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    nivel_riesgo?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrder;
    fecha_limite?: Prisma.SortOrder;
    id_usuario_reporta?: Prisma.SortOrder;
    id_estacion?: Prisma.SortOrder;
    id_area_responsable?: Prisma.SortOrder;
};
export type incidenciasAvgOrderByAggregateInput = {
    id_incidencia?: Prisma.SortOrder;
    id_usuario_reporta?: Prisma.SortOrder;
    id_estacion?: Prisma.SortOrder;
    id_area_responsable?: Prisma.SortOrder;
};
export type incidenciasMaxOrderByAggregateInput = {
    id_incidencia?: Prisma.SortOrder;
    codigo_incidencia?: Prisma.SortOrder;
    tipo_evento?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    nivel_riesgo?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrder;
    fecha_limite?: Prisma.SortOrder;
    id_usuario_reporta?: Prisma.SortOrder;
    id_estacion?: Prisma.SortOrder;
    id_area_responsable?: Prisma.SortOrder;
};
export type incidenciasMinOrderByAggregateInput = {
    id_incidencia?: Prisma.SortOrder;
    codigo_incidencia?: Prisma.SortOrder;
    tipo_evento?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    nivel_riesgo?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrder;
    fecha_limite?: Prisma.SortOrder;
    id_usuario_reporta?: Prisma.SortOrder;
    id_estacion?: Prisma.SortOrder;
    id_area_responsable?: Prisma.SortOrder;
};
export type incidenciasSumOrderByAggregateInput = {
    id_incidencia?: Prisma.SortOrder;
    id_usuario_reporta?: Prisma.SortOrder;
    id_estacion?: Prisma.SortOrder;
    id_area_responsable?: Prisma.SortOrder;
};
export type incidenciasCreateNestedManyWithoutAreasInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutAreasInput, Prisma.incidenciasUncheckedCreateWithoutAreasInput> | Prisma.incidenciasCreateWithoutAreasInput[] | Prisma.incidenciasUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutAreasInput | Prisma.incidenciasCreateOrConnectWithoutAreasInput[];
    createMany?: Prisma.incidenciasCreateManyAreasInputEnvelope;
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
};
export type incidenciasUncheckedCreateNestedManyWithoutAreasInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutAreasInput, Prisma.incidenciasUncheckedCreateWithoutAreasInput> | Prisma.incidenciasCreateWithoutAreasInput[] | Prisma.incidenciasUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutAreasInput | Prisma.incidenciasCreateOrConnectWithoutAreasInput[];
    createMany?: Prisma.incidenciasCreateManyAreasInputEnvelope;
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
};
export type incidenciasUpdateManyWithoutAreasNestedInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutAreasInput, Prisma.incidenciasUncheckedCreateWithoutAreasInput> | Prisma.incidenciasCreateWithoutAreasInput[] | Prisma.incidenciasUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutAreasInput | Prisma.incidenciasCreateOrConnectWithoutAreasInput[];
    upsert?: Prisma.incidenciasUpsertWithWhereUniqueWithoutAreasInput | Prisma.incidenciasUpsertWithWhereUniqueWithoutAreasInput[];
    createMany?: Prisma.incidenciasCreateManyAreasInputEnvelope;
    set?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    disconnect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    delete?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    update?: Prisma.incidenciasUpdateWithWhereUniqueWithoutAreasInput | Prisma.incidenciasUpdateWithWhereUniqueWithoutAreasInput[];
    updateMany?: Prisma.incidenciasUpdateManyWithWhereWithoutAreasInput | Prisma.incidenciasUpdateManyWithWhereWithoutAreasInput[];
    deleteMany?: Prisma.incidenciasScalarWhereInput | Prisma.incidenciasScalarWhereInput[];
};
export type incidenciasUncheckedUpdateManyWithoutAreasNestedInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutAreasInput, Prisma.incidenciasUncheckedCreateWithoutAreasInput> | Prisma.incidenciasCreateWithoutAreasInput[] | Prisma.incidenciasUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutAreasInput | Prisma.incidenciasCreateOrConnectWithoutAreasInput[];
    upsert?: Prisma.incidenciasUpsertWithWhereUniqueWithoutAreasInput | Prisma.incidenciasUpsertWithWhereUniqueWithoutAreasInput[];
    createMany?: Prisma.incidenciasCreateManyAreasInputEnvelope;
    set?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    disconnect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    delete?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    update?: Prisma.incidenciasUpdateWithWhereUniqueWithoutAreasInput | Prisma.incidenciasUpdateWithWhereUniqueWithoutAreasInput[];
    updateMany?: Prisma.incidenciasUpdateManyWithWhereWithoutAreasInput | Prisma.incidenciasUpdateManyWithWhereWithoutAreasInput[];
    deleteMany?: Prisma.incidenciasScalarWhereInput | Prisma.incidenciasScalarWhereInput[];
};
export type incidenciasCreateNestedManyWithoutEstacionesInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutEstacionesInput, Prisma.incidenciasUncheckedCreateWithoutEstacionesInput> | Prisma.incidenciasCreateWithoutEstacionesInput[] | Prisma.incidenciasUncheckedCreateWithoutEstacionesInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutEstacionesInput | Prisma.incidenciasCreateOrConnectWithoutEstacionesInput[];
    createMany?: Prisma.incidenciasCreateManyEstacionesInputEnvelope;
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
};
export type incidenciasUncheckedCreateNestedManyWithoutEstacionesInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutEstacionesInput, Prisma.incidenciasUncheckedCreateWithoutEstacionesInput> | Prisma.incidenciasCreateWithoutEstacionesInput[] | Prisma.incidenciasUncheckedCreateWithoutEstacionesInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutEstacionesInput | Prisma.incidenciasCreateOrConnectWithoutEstacionesInput[];
    createMany?: Prisma.incidenciasCreateManyEstacionesInputEnvelope;
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
};
export type incidenciasUpdateManyWithoutEstacionesNestedInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutEstacionesInput, Prisma.incidenciasUncheckedCreateWithoutEstacionesInput> | Prisma.incidenciasCreateWithoutEstacionesInput[] | Prisma.incidenciasUncheckedCreateWithoutEstacionesInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutEstacionesInput | Prisma.incidenciasCreateOrConnectWithoutEstacionesInput[];
    upsert?: Prisma.incidenciasUpsertWithWhereUniqueWithoutEstacionesInput | Prisma.incidenciasUpsertWithWhereUniqueWithoutEstacionesInput[];
    createMany?: Prisma.incidenciasCreateManyEstacionesInputEnvelope;
    set?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    disconnect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    delete?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    update?: Prisma.incidenciasUpdateWithWhereUniqueWithoutEstacionesInput | Prisma.incidenciasUpdateWithWhereUniqueWithoutEstacionesInput[];
    updateMany?: Prisma.incidenciasUpdateManyWithWhereWithoutEstacionesInput | Prisma.incidenciasUpdateManyWithWhereWithoutEstacionesInput[];
    deleteMany?: Prisma.incidenciasScalarWhereInput | Prisma.incidenciasScalarWhereInput[];
};
export type incidenciasUncheckedUpdateManyWithoutEstacionesNestedInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutEstacionesInput, Prisma.incidenciasUncheckedCreateWithoutEstacionesInput> | Prisma.incidenciasCreateWithoutEstacionesInput[] | Prisma.incidenciasUncheckedCreateWithoutEstacionesInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutEstacionesInput | Prisma.incidenciasCreateOrConnectWithoutEstacionesInput[];
    upsert?: Prisma.incidenciasUpsertWithWhereUniqueWithoutEstacionesInput | Prisma.incidenciasUpsertWithWhereUniqueWithoutEstacionesInput[];
    createMany?: Prisma.incidenciasCreateManyEstacionesInputEnvelope;
    set?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    disconnect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    delete?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    update?: Prisma.incidenciasUpdateWithWhereUniqueWithoutEstacionesInput | Prisma.incidenciasUpdateWithWhereUniqueWithoutEstacionesInput[];
    updateMany?: Prisma.incidenciasUpdateManyWithWhereWithoutEstacionesInput | Prisma.incidenciasUpdateManyWithWhereWithoutEstacionesInput[];
    deleteMany?: Prisma.incidenciasScalarWhereInput | Prisma.incidenciasScalarWhereInput[];
};
export type incidenciasCreateNestedOneWithoutEvidenciasInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutEvidenciasInput, Prisma.incidenciasUncheckedCreateWithoutEvidenciasInput>;
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutEvidenciasInput;
    connect?: Prisma.incidenciasWhereUniqueInput;
};
export type incidenciasUpdateOneWithoutEvidenciasNestedInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutEvidenciasInput, Prisma.incidenciasUncheckedCreateWithoutEvidenciasInput>;
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutEvidenciasInput;
    upsert?: Prisma.incidenciasUpsertWithoutEvidenciasInput;
    disconnect?: Prisma.incidenciasWhereInput | boolean;
    delete?: Prisma.incidenciasWhereInput | boolean;
    connect?: Prisma.incidenciasWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.incidenciasUpdateToOneWithWhereWithoutEvidenciasInput, Prisma.incidenciasUpdateWithoutEvidenciasInput>, Prisma.incidenciasUncheckedUpdateWithoutEvidenciasInput>;
};
export type incidenciasCreateNestedOneWithoutInvestigacionesInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutInvestigacionesInput, Prisma.incidenciasUncheckedCreateWithoutInvestigacionesInput>;
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutInvestigacionesInput;
    connect?: Prisma.incidenciasWhereUniqueInput;
};
export type incidenciasUpdateOneWithoutInvestigacionesNestedInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutInvestigacionesInput, Prisma.incidenciasUncheckedCreateWithoutInvestigacionesInput>;
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutInvestigacionesInput;
    upsert?: Prisma.incidenciasUpsertWithoutInvestigacionesInput;
    disconnect?: Prisma.incidenciasWhereInput | boolean;
    delete?: Prisma.incidenciasWhereInput | boolean;
    connect?: Prisma.incidenciasWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.incidenciasUpdateToOneWithWhereWithoutInvestigacionesInput, Prisma.incidenciasUpdateWithoutInvestigacionesInput>, Prisma.incidenciasUncheckedUpdateWithoutInvestigacionesInput>;
};
export type incidenciasCreateNestedOneWithoutSolicitudes_prorrogaInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutSolicitudes_prorrogaInput, Prisma.incidenciasUncheckedCreateWithoutSolicitudes_prorrogaInput>;
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutSolicitudes_prorrogaInput;
    connect?: Prisma.incidenciasWhereUniqueInput;
};
export type incidenciasUpdateOneWithoutSolicitudes_prorrogaNestedInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutSolicitudes_prorrogaInput, Prisma.incidenciasUncheckedCreateWithoutSolicitudes_prorrogaInput>;
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutSolicitudes_prorrogaInput;
    upsert?: Prisma.incidenciasUpsertWithoutSolicitudes_prorrogaInput;
    disconnect?: Prisma.incidenciasWhereInput | boolean;
    delete?: Prisma.incidenciasWhereInput | boolean;
    connect?: Prisma.incidenciasWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.incidenciasUpdateToOneWithWhereWithoutSolicitudes_prorrogaInput, Prisma.incidenciasUpdateWithoutSolicitudes_prorrogaInput>, Prisma.incidenciasUncheckedUpdateWithoutSolicitudes_prorrogaInput>;
};
export type incidenciasCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutUsuariosInput, Prisma.incidenciasUncheckedCreateWithoutUsuariosInput> | Prisma.incidenciasCreateWithoutUsuariosInput[] | Prisma.incidenciasUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutUsuariosInput | Prisma.incidenciasCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.incidenciasCreateManyUsuariosInputEnvelope;
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
};
export type incidenciasUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutUsuariosInput, Prisma.incidenciasUncheckedCreateWithoutUsuariosInput> | Prisma.incidenciasCreateWithoutUsuariosInput[] | Prisma.incidenciasUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutUsuariosInput | Prisma.incidenciasCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.incidenciasCreateManyUsuariosInputEnvelope;
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
};
export type incidenciasUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutUsuariosInput, Prisma.incidenciasUncheckedCreateWithoutUsuariosInput> | Prisma.incidenciasCreateWithoutUsuariosInput[] | Prisma.incidenciasUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutUsuariosInput | Prisma.incidenciasCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.incidenciasUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.incidenciasUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.incidenciasCreateManyUsuariosInputEnvelope;
    set?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    disconnect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    delete?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    update?: Prisma.incidenciasUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.incidenciasUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.incidenciasUpdateManyWithWhereWithoutUsuariosInput | Prisma.incidenciasUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.incidenciasScalarWhereInput | Prisma.incidenciasScalarWhereInput[];
};
export type incidenciasUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.incidenciasCreateWithoutUsuariosInput, Prisma.incidenciasUncheckedCreateWithoutUsuariosInput> | Prisma.incidenciasCreateWithoutUsuariosInput[] | Prisma.incidenciasUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.incidenciasCreateOrConnectWithoutUsuariosInput | Prisma.incidenciasCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.incidenciasUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.incidenciasUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.incidenciasCreateManyUsuariosInputEnvelope;
    set?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    disconnect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    delete?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    connect?: Prisma.incidenciasWhereUniqueInput | Prisma.incidenciasWhereUniqueInput[];
    update?: Prisma.incidenciasUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.incidenciasUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.incidenciasUpdateManyWithWhereWithoutUsuariosInput | Prisma.incidenciasUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.incidenciasScalarWhereInput | Prisma.incidenciasScalarWhereInput[];
};
export type incidenciasCreateWithoutAreasInput = {
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    evidencias?: Prisma.evidenciasCreateNestedManyWithoutIncidenciasInput;
    estaciones?: Prisma.estacionesCreateNestedOneWithoutIncidenciasInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasUncheckedCreateWithoutAreasInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_usuario_reporta?: number | null;
    id_estacion?: number | null;
    evidencias?: Prisma.evidenciasUncheckedCreateNestedManyWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasCreateOrConnectWithoutAreasInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutAreasInput, Prisma.incidenciasUncheckedCreateWithoutAreasInput>;
};
export type incidenciasCreateManyAreasInputEnvelope = {
    data: Prisma.incidenciasCreateManyAreasInput | Prisma.incidenciasCreateManyAreasInput[];
    skipDuplicates?: boolean;
};
export type incidenciasUpsertWithWhereUniqueWithoutAreasInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    update: Prisma.XOR<Prisma.incidenciasUpdateWithoutAreasInput, Prisma.incidenciasUncheckedUpdateWithoutAreasInput>;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutAreasInput, Prisma.incidenciasUncheckedCreateWithoutAreasInput>;
};
export type incidenciasUpdateWithWhereUniqueWithoutAreasInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    data: Prisma.XOR<Prisma.incidenciasUpdateWithoutAreasInput, Prisma.incidenciasUncheckedUpdateWithoutAreasInput>;
};
export type incidenciasUpdateManyWithWhereWithoutAreasInput = {
    where: Prisma.incidenciasScalarWhereInput;
    data: Prisma.XOR<Prisma.incidenciasUpdateManyMutationInput, Prisma.incidenciasUncheckedUpdateManyWithoutAreasInput>;
};
export type incidenciasScalarWhereInput = {
    AND?: Prisma.incidenciasScalarWhereInput | Prisma.incidenciasScalarWhereInput[];
    OR?: Prisma.incidenciasScalarWhereInput[];
    NOT?: Prisma.incidenciasScalarWhereInput | Prisma.incidenciasScalarWhereInput[];
    id_incidencia?: Prisma.IntFilter<"incidencias"> | number;
    codigo_incidencia?: Prisma.StringFilter<"incidencias"> | string;
    tipo_evento?: Prisma.StringFilter<"incidencias"> | string;
    descripcion?: Prisma.StringFilter<"incidencias"> | string;
    nivel_riesgo?: Prisma.StringNullableFilter<"incidencias"> | string | null;
    estado?: Prisma.StringNullableFilter<"incidencias"> | string | null;
    fecha_registro?: Prisma.DateTimeNullableFilter<"incidencias"> | Date | string | null;
    fecha_limite?: Prisma.DateTimeNullableFilter<"incidencias"> | Date | string | null;
    id_usuario_reporta?: Prisma.IntNullableFilter<"incidencias"> | number | null;
    id_estacion?: Prisma.IntNullableFilter<"incidencias"> | number | null;
    id_area_responsable?: Prisma.IntNullableFilter<"incidencias"> | number | null;
};
export type incidenciasCreateWithoutEstacionesInput = {
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    evidencias?: Prisma.evidenciasCreateNestedManyWithoutIncidenciasInput;
    areas?: Prisma.areasCreateNestedOneWithoutIncidenciasInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasUncheckedCreateWithoutEstacionesInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_usuario_reporta?: number | null;
    id_area_responsable?: number | null;
    evidencias?: Prisma.evidenciasUncheckedCreateNestedManyWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasCreateOrConnectWithoutEstacionesInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutEstacionesInput, Prisma.incidenciasUncheckedCreateWithoutEstacionesInput>;
};
export type incidenciasCreateManyEstacionesInputEnvelope = {
    data: Prisma.incidenciasCreateManyEstacionesInput | Prisma.incidenciasCreateManyEstacionesInput[];
    skipDuplicates?: boolean;
};
export type incidenciasUpsertWithWhereUniqueWithoutEstacionesInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    update: Prisma.XOR<Prisma.incidenciasUpdateWithoutEstacionesInput, Prisma.incidenciasUncheckedUpdateWithoutEstacionesInput>;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutEstacionesInput, Prisma.incidenciasUncheckedCreateWithoutEstacionesInput>;
};
export type incidenciasUpdateWithWhereUniqueWithoutEstacionesInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    data: Prisma.XOR<Prisma.incidenciasUpdateWithoutEstacionesInput, Prisma.incidenciasUncheckedUpdateWithoutEstacionesInput>;
};
export type incidenciasUpdateManyWithWhereWithoutEstacionesInput = {
    where: Prisma.incidenciasScalarWhereInput;
    data: Prisma.XOR<Prisma.incidenciasUpdateManyMutationInput, Prisma.incidenciasUncheckedUpdateManyWithoutEstacionesInput>;
};
export type incidenciasCreateWithoutEvidenciasInput = {
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    areas?: Prisma.areasCreateNestedOneWithoutIncidenciasInput;
    estaciones?: Prisma.estacionesCreateNestedOneWithoutIncidenciasInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasUncheckedCreateWithoutEvidenciasInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_usuario_reporta?: number | null;
    id_estacion?: number | null;
    id_area_responsable?: number | null;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasCreateOrConnectWithoutEvidenciasInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutEvidenciasInput, Prisma.incidenciasUncheckedCreateWithoutEvidenciasInput>;
};
export type incidenciasUpsertWithoutEvidenciasInput = {
    update: Prisma.XOR<Prisma.incidenciasUpdateWithoutEvidenciasInput, Prisma.incidenciasUncheckedUpdateWithoutEvidenciasInput>;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutEvidenciasInput, Prisma.incidenciasUncheckedCreateWithoutEvidenciasInput>;
    where?: Prisma.incidenciasWhereInput;
};
export type incidenciasUpdateToOneWithWhereWithoutEvidenciasInput = {
    where?: Prisma.incidenciasWhereInput;
    data: Prisma.XOR<Prisma.incidenciasUpdateWithoutEvidenciasInput, Prisma.incidenciasUncheckedUpdateWithoutEvidenciasInput>;
};
export type incidenciasUpdateWithoutEvidenciasInput = {
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    areas?: Prisma.areasUpdateOneWithoutIncidenciasNestedInput;
    estaciones?: Prisma.estacionesUpdateOneWithoutIncidenciasNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateWithoutEvidenciasInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_usuario_reporta?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_estacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    investigaciones?: Prisma.investigacionesUncheckedUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasCreateWithoutInvestigacionesInput = {
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    evidencias?: Prisma.evidenciasCreateNestedManyWithoutIncidenciasInput;
    areas?: Prisma.areasCreateNestedOneWithoutIncidenciasInput;
    estaciones?: Prisma.estacionesCreateNestedOneWithoutIncidenciasInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasUncheckedCreateWithoutInvestigacionesInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_usuario_reporta?: number | null;
    id_estacion?: number | null;
    id_area_responsable?: number | null;
    evidencias?: Prisma.evidenciasUncheckedCreateNestedManyWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasCreateOrConnectWithoutInvestigacionesInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutInvestigacionesInput, Prisma.incidenciasUncheckedCreateWithoutInvestigacionesInput>;
};
export type incidenciasUpsertWithoutInvestigacionesInput = {
    update: Prisma.XOR<Prisma.incidenciasUpdateWithoutInvestigacionesInput, Prisma.incidenciasUncheckedUpdateWithoutInvestigacionesInput>;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutInvestigacionesInput, Prisma.incidenciasUncheckedCreateWithoutInvestigacionesInput>;
    where?: Prisma.incidenciasWhereInput;
};
export type incidenciasUpdateToOneWithWhereWithoutInvestigacionesInput = {
    where?: Prisma.incidenciasWhereInput;
    data: Prisma.XOR<Prisma.incidenciasUpdateWithoutInvestigacionesInput, Prisma.incidenciasUncheckedUpdateWithoutInvestigacionesInput>;
};
export type incidenciasUpdateWithoutInvestigacionesInput = {
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evidencias?: Prisma.evidenciasUpdateManyWithoutIncidenciasNestedInput;
    areas?: Prisma.areasUpdateOneWithoutIncidenciasNestedInput;
    estaciones?: Prisma.estacionesUpdateOneWithoutIncidenciasNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateWithoutInvestigacionesInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_usuario_reporta?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_estacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    evidencias?: Prisma.evidenciasUncheckedUpdateManyWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasCreateWithoutSolicitudes_prorrogaInput = {
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    evidencias?: Prisma.evidenciasCreateNestedManyWithoutIncidenciasInput;
    areas?: Prisma.areasCreateNestedOneWithoutIncidenciasInput;
    estaciones?: Prisma.estacionesCreateNestedOneWithoutIncidenciasInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesCreateNestedOneWithoutIncidenciasInput;
};
export type incidenciasUncheckedCreateWithoutSolicitudes_prorrogaInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_usuario_reporta?: number | null;
    id_estacion?: number | null;
    id_area_responsable?: number | null;
    evidencias?: Prisma.evidenciasUncheckedCreateNestedManyWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedOneWithoutIncidenciasInput;
};
export type incidenciasCreateOrConnectWithoutSolicitudes_prorrogaInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutSolicitudes_prorrogaInput, Prisma.incidenciasUncheckedCreateWithoutSolicitudes_prorrogaInput>;
};
export type incidenciasUpsertWithoutSolicitudes_prorrogaInput = {
    update: Prisma.XOR<Prisma.incidenciasUpdateWithoutSolicitudes_prorrogaInput, Prisma.incidenciasUncheckedUpdateWithoutSolicitudes_prorrogaInput>;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutSolicitudes_prorrogaInput, Prisma.incidenciasUncheckedCreateWithoutSolicitudes_prorrogaInput>;
    where?: Prisma.incidenciasWhereInput;
};
export type incidenciasUpdateToOneWithWhereWithoutSolicitudes_prorrogaInput = {
    where?: Prisma.incidenciasWhereInput;
    data: Prisma.XOR<Prisma.incidenciasUpdateWithoutSolicitudes_prorrogaInput, Prisma.incidenciasUncheckedUpdateWithoutSolicitudes_prorrogaInput>;
};
export type incidenciasUpdateWithoutSolicitudes_prorrogaInput = {
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evidencias?: Prisma.evidenciasUpdateManyWithoutIncidenciasNestedInput;
    areas?: Prisma.areasUpdateOneWithoutIncidenciasNestedInput;
    estaciones?: Prisma.estacionesUpdateOneWithoutIncidenciasNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUpdateOneWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateWithoutSolicitudes_prorrogaInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_usuario_reporta?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_estacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    evidencias?: Prisma.evidenciasUncheckedUpdateManyWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateOneWithoutIncidenciasNestedInput;
};
export type incidenciasCreateWithoutUsuariosInput = {
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    evidencias?: Prisma.evidenciasCreateNestedManyWithoutIncidenciasInput;
    areas?: Prisma.areasCreateNestedOneWithoutIncidenciasInput;
    estaciones?: Prisma.estacionesCreateNestedOneWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasUncheckedCreateWithoutUsuariosInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_estacion?: number | null;
    id_area_responsable?: number | null;
    evidencias?: Prisma.evidenciasUncheckedCreateNestedManyWithoutIncidenciasInput;
    investigaciones?: Prisma.investigacionesUncheckedCreateNestedOneWithoutIncidenciasInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedCreateNestedManyWithoutIncidenciasInput;
};
export type incidenciasCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutUsuariosInput, Prisma.incidenciasUncheckedCreateWithoutUsuariosInput>;
};
export type incidenciasCreateManyUsuariosInputEnvelope = {
    data: Prisma.incidenciasCreateManyUsuariosInput | Prisma.incidenciasCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type incidenciasUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    update: Prisma.XOR<Prisma.incidenciasUpdateWithoutUsuariosInput, Prisma.incidenciasUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.incidenciasCreateWithoutUsuariosInput, Prisma.incidenciasUncheckedCreateWithoutUsuariosInput>;
};
export type incidenciasUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.incidenciasWhereUniqueInput;
    data: Prisma.XOR<Prisma.incidenciasUpdateWithoutUsuariosInput, Prisma.incidenciasUncheckedUpdateWithoutUsuariosInput>;
};
export type incidenciasUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.incidenciasScalarWhereInput;
    data: Prisma.XOR<Prisma.incidenciasUpdateManyMutationInput, Prisma.incidenciasUncheckedUpdateManyWithoutUsuariosInput>;
};
export type incidenciasCreateManyAreasInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_usuario_reporta?: number | null;
    id_estacion?: number | null;
};
export type incidenciasUpdateWithoutAreasInput = {
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evidencias?: Prisma.evidenciasUpdateManyWithoutIncidenciasNestedInput;
    estaciones?: Prisma.estacionesUpdateOneWithoutIncidenciasNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateWithoutAreasInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_usuario_reporta?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_estacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    evidencias?: Prisma.evidenciasUncheckedUpdateManyWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateManyWithoutAreasInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_usuario_reporta?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_estacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type incidenciasCreateManyEstacionesInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_usuario_reporta?: number | null;
    id_area_responsable?: number | null;
};
export type incidenciasUpdateWithoutEstacionesInput = {
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evidencias?: Prisma.evidenciasUpdateManyWithoutIncidenciasNestedInput;
    areas?: Prisma.areasUpdateOneWithoutIncidenciasNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateWithoutEstacionesInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_usuario_reporta?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    evidencias?: Prisma.evidenciasUncheckedUpdateManyWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateManyWithoutEstacionesInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_usuario_reporta?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type incidenciasCreateManyUsuariosInput = {
    id_incidencia?: number;
    codigo_incidencia: string;
    tipo_evento: string;
    descripcion: string;
    nivel_riesgo?: string | null;
    estado?: string | null;
    fecha_registro?: Date | string | null;
    fecha_limite?: Date | string | null;
    id_estacion?: number | null;
    id_area_responsable?: number | null;
};
export type incidenciasUpdateWithoutUsuariosInput = {
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    evidencias?: Prisma.evidenciasUpdateManyWithoutIncidenciasNestedInput;
    areas?: Prisma.areasUpdateOneWithoutIncidenciasNestedInput;
    estaciones?: Prisma.estacionesUpdateOneWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateWithoutUsuariosInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_estacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    evidencias?: Prisma.evidenciasUncheckedUpdateManyWithoutIncidenciasNestedInput;
    investigaciones?: Prisma.investigacionesUncheckedUpdateOneWithoutIncidenciasNestedInput;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaUncheckedUpdateManyWithoutIncidenciasNestedInput;
};
export type incidenciasUncheckedUpdateManyWithoutUsuariosInput = {
    id_incidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_incidencia?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_evento?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    nivel_riesgo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_limite?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    id_estacion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    id_area_responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
/**
 * Count Type IncidenciasCountOutputType
 */
export type IncidenciasCountOutputType = {
    evidencias: number;
    solicitudes_prorroga: number;
};
export type IncidenciasCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    evidencias?: boolean | IncidenciasCountOutputTypeCountEvidenciasArgs;
    solicitudes_prorroga?: boolean | IncidenciasCountOutputTypeCountSolicitudes_prorrogaArgs;
};
/**
 * IncidenciasCountOutputType without action
 */
export type IncidenciasCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncidenciasCountOutputType
     */
    select?: Prisma.IncidenciasCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * IncidenciasCountOutputType without action
 */
export type IncidenciasCountOutputTypeCountEvidenciasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.evidenciasWhereInput;
};
/**
 * IncidenciasCountOutputType without action
 */
export type IncidenciasCountOutputTypeCountSolicitudes_prorrogaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitudes_prorrogaWhereInput;
};
export type incidenciasSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_incidencia?: boolean;
    codigo_incidencia?: boolean;
    tipo_evento?: boolean;
    descripcion?: boolean;
    nivel_riesgo?: boolean;
    estado?: boolean;
    fecha_registro?: boolean;
    fecha_limite?: boolean;
    id_usuario_reporta?: boolean;
    id_estacion?: boolean;
    id_area_responsable?: boolean;
    evidencias?: boolean | Prisma.incidencias$evidenciasArgs<ExtArgs>;
    areas?: boolean | Prisma.incidencias$areasArgs<ExtArgs>;
    estaciones?: boolean | Prisma.incidencias$estacionesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.incidencias$usuariosArgs<ExtArgs>;
    investigaciones?: boolean | Prisma.incidencias$investigacionesArgs<ExtArgs>;
    solicitudes_prorroga?: boolean | Prisma.incidencias$solicitudes_prorrogaArgs<ExtArgs>;
    _count?: boolean | Prisma.IncidenciasCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["incidencias"]>;
export type incidenciasSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_incidencia?: boolean;
    codigo_incidencia?: boolean;
    tipo_evento?: boolean;
    descripcion?: boolean;
    nivel_riesgo?: boolean;
    estado?: boolean;
    fecha_registro?: boolean;
    fecha_limite?: boolean;
    id_usuario_reporta?: boolean;
    id_estacion?: boolean;
    id_area_responsable?: boolean;
    areas?: boolean | Prisma.incidencias$areasArgs<ExtArgs>;
    estaciones?: boolean | Prisma.incidencias$estacionesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.incidencias$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["incidencias"]>;
export type incidenciasSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_incidencia?: boolean;
    codigo_incidencia?: boolean;
    tipo_evento?: boolean;
    descripcion?: boolean;
    nivel_riesgo?: boolean;
    estado?: boolean;
    fecha_registro?: boolean;
    fecha_limite?: boolean;
    id_usuario_reporta?: boolean;
    id_estacion?: boolean;
    id_area_responsable?: boolean;
    areas?: boolean | Prisma.incidencias$areasArgs<ExtArgs>;
    estaciones?: boolean | Prisma.incidencias$estacionesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.incidencias$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["incidencias"]>;
export type incidenciasSelectScalar = {
    id_incidencia?: boolean;
    codigo_incidencia?: boolean;
    tipo_evento?: boolean;
    descripcion?: boolean;
    nivel_riesgo?: boolean;
    estado?: boolean;
    fecha_registro?: boolean;
    fecha_limite?: boolean;
    id_usuario_reporta?: boolean;
    id_estacion?: boolean;
    id_area_responsable?: boolean;
};
export type incidenciasOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_incidencia" | "codigo_incidencia" | "tipo_evento" | "descripcion" | "nivel_riesgo" | "estado" | "fecha_registro" | "fecha_limite" | "id_usuario_reporta" | "id_estacion" | "id_area_responsable", ExtArgs["result"]["incidencias"]>;
export type incidenciasInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    evidencias?: boolean | Prisma.incidencias$evidenciasArgs<ExtArgs>;
    areas?: boolean | Prisma.incidencias$areasArgs<ExtArgs>;
    estaciones?: boolean | Prisma.incidencias$estacionesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.incidencias$usuariosArgs<ExtArgs>;
    investigaciones?: boolean | Prisma.incidencias$investigacionesArgs<ExtArgs>;
    solicitudes_prorroga?: boolean | Prisma.incidencias$solicitudes_prorrogaArgs<ExtArgs>;
    _count?: boolean | Prisma.IncidenciasCountOutputTypeDefaultArgs<ExtArgs>;
};
export type incidenciasIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    areas?: boolean | Prisma.incidencias$areasArgs<ExtArgs>;
    estaciones?: boolean | Prisma.incidencias$estacionesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.incidencias$usuariosArgs<ExtArgs>;
};
export type incidenciasIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    areas?: boolean | Prisma.incidencias$areasArgs<ExtArgs>;
    estaciones?: boolean | Prisma.incidencias$estacionesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.incidencias$usuariosArgs<ExtArgs>;
};
export type $incidenciasPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "incidencias";
    objects: {
        evidencias: Prisma.$evidenciasPayload<ExtArgs>[];
        areas: Prisma.$areasPayload<ExtArgs> | null;
        estaciones: Prisma.$estacionesPayload<ExtArgs> | null;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
        investigaciones: Prisma.$investigacionesPayload<ExtArgs> | null;
        solicitudes_prorroga: Prisma.$solicitudes_prorrogaPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_incidencia: number;
        codigo_incidencia: string;
        tipo_evento: string;
        descripcion: string;
        nivel_riesgo: string | null;
        estado: string | null;
        fecha_registro: Date | null;
        fecha_limite: Date | null;
        id_usuario_reporta: number | null;
        id_estacion: number | null;
        id_area_responsable: number | null;
    }, ExtArgs["result"]["incidencias"]>;
    composites: {};
};
export type incidenciasGetPayload<S extends boolean | null | undefined | incidenciasDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$incidenciasPayload, S>;
export type incidenciasCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<incidenciasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IncidenciasCountAggregateInputType | true;
};
export interface incidenciasDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['incidencias'];
        meta: {
            name: 'incidencias';
        };
    };
    /**
     * Find zero or one Incidencias that matches the filter.
     * @param {incidenciasFindUniqueArgs} args - Arguments to find a Incidencias
     * @example
     * // Get one Incidencias
     * const incidencias = await prisma.incidencias.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends incidenciasFindUniqueArgs>(args: Prisma.SelectSubset<T, incidenciasFindUniqueArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Incidencias that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {incidenciasFindUniqueOrThrowArgs} args - Arguments to find a Incidencias
     * @example
     * // Get one Incidencias
     * const incidencias = await prisma.incidencias.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends incidenciasFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, incidenciasFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Incidencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidenciasFindFirstArgs} args - Arguments to find a Incidencias
     * @example
     * // Get one Incidencias
     * const incidencias = await prisma.incidencias.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends incidenciasFindFirstArgs>(args?: Prisma.SelectSubset<T, incidenciasFindFirstArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Incidencias that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidenciasFindFirstOrThrowArgs} args - Arguments to find a Incidencias
     * @example
     * // Get one Incidencias
     * const incidencias = await prisma.incidencias.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends incidenciasFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, incidenciasFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Incidencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidenciasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Incidencias
     * const incidencias = await prisma.incidencias.findMany()
     *
     * // Get first 10 Incidencias
     * const incidencias = await prisma.incidencias.findMany({ take: 10 })
     *
     * // Only select the `id_incidencia`
     * const incidenciasWithId_incidenciaOnly = await prisma.incidencias.findMany({ select: { id_incidencia: true } })
     *
     */
    findMany<T extends incidenciasFindManyArgs>(args?: Prisma.SelectSubset<T, incidenciasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Incidencias.
     * @param {incidenciasCreateArgs} args - Arguments to create a Incidencias.
     * @example
     * // Create one Incidencias
     * const Incidencias = await prisma.incidencias.create({
     *   data: {
     *     // ... data to create a Incidencias
     *   }
     * })
     *
     */
    create<T extends incidenciasCreateArgs>(args: Prisma.SelectSubset<T, incidenciasCreateArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Incidencias.
     * @param {incidenciasCreateManyArgs} args - Arguments to create many Incidencias.
     * @example
     * // Create many Incidencias
     * const incidencias = await prisma.incidencias.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends incidenciasCreateManyArgs>(args?: Prisma.SelectSubset<T, incidenciasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Incidencias and returns the data saved in the database.
     * @param {incidenciasCreateManyAndReturnArgs} args - Arguments to create many Incidencias.
     * @example
     * // Create many Incidencias
     * const incidencias = await prisma.incidencias.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Incidencias and only return the `id_incidencia`
     * const incidenciasWithId_incidenciaOnly = await prisma.incidencias.createManyAndReturn({
     *   select: { id_incidencia: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends incidenciasCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, incidenciasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Incidencias.
     * @param {incidenciasDeleteArgs} args - Arguments to delete one Incidencias.
     * @example
     * // Delete one Incidencias
     * const Incidencias = await prisma.incidencias.delete({
     *   where: {
     *     // ... filter to delete one Incidencias
     *   }
     * })
     *
     */
    delete<T extends incidenciasDeleteArgs>(args: Prisma.SelectSubset<T, incidenciasDeleteArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Incidencias.
     * @param {incidenciasUpdateArgs} args - Arguments to update one Incidencias.
     * @example
     * // Update one Incidencias
     * const incidencias = await prisma.incidencias.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends incidenciasUpdateArgs>(args: Prisma.SelectSubset<T, incidenciasUpdateArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Incidencias.
     * @param {incidenciasDeleteManyArgs} args - Arguments to filter Incidencias to delete.
     * @example
     * // Delete a few Incidencias
     * const { count } = await prisma.incidencias.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends incidenciasDeleteManyArgs>(args?: Prisma.SelectSubset<T, incidenciasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Incidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidenciasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Incidencias
     * const incidencias = await prisma.incidencias.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends incidenciasUpdateManyArgs>(args: Prisma.SelectSubset<T, incidenciasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Incidencias and returns the data updated in the database.
     * @param {incidenciasUpdateManyAndReturnArgs} args - Arguments to update many Incidencias.
     * @example
     * // Update many Incidencias
     * const incidencias = await prisma.incidencias.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Incidencias and only return the `id_incidencia`
     * const incidenciasWithId_incidenciaOnly = await prisma.incidencias.updateManyAndReturn({
     *   select: { id_incidencia: true },
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
    updateManyAndReturn<T extends incidenciasUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, incidenciasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Incidencias.
     * @param {incidenciasUpsertArgs} args - Arguments to update or create a Incidencias.
     * @example
     * // Update or create a Incidencias
     * const incidencias = await prisma.incidencias.upsert({
     *   create: {
     *     // ... data to create a Incidencias
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Incidencias we want to update
     *   }
     * })
     */
    upsert<T extends incidenciasUpsertArgs>(args: Prisma.SelectSubset<T, incidenciasUpsertArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Incidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidenciasCountArgs} args - Arguments to filter Incidencias to count.
     * @example
     * // Count the number of Incidencias
     * const count = await prisma.incidencias.count({
     *   where: {
     *     // ... the filter for the Incidencias we want to count
     *   }
     * })
    **/
    count<T extends incidenciasCountArgs>(args?: Prisma.Subset<T, incidenciasCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IncidenciasCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Incidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidenciasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IncidenciasAggregateArgs>(args: Prisma.Subset<T, IncidenciasAggregateArgs>): Prisma.PrismaPromise<GetIncidenciasAggregateType<T>>;
    /**
     * Group by Incidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidenciasGroupByArgs} args - Group by arguments.
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
    groupBy<T extends incidenciasGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: incidenciasGroupByArgs['orderBy'];
    } : {
        orderBy?: incidenciasGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, incidenciasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncidenciasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the incidencias model
     */
    readonly fields: incidenciasFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for incidencias.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__incidenciasClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    evidencias<T extends Prisma.incidencias$evidenciasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.incidencias$evidenciasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    areas<T extends Prisma.incidencias$areasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.incidencias$areasArgs<ExtArgs>>): Prisma.Prisma__areasClient<runtime.Types.Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    estaciones<T extends Prisma.incidencias$estacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.incidencias$estacionesArgs<ExtArgs>>): Prisma.Prisma__estacionesClient<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.incidencias$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.incidencias$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    investigaciones<T extends Prisma.incidencias$investigacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.incidencias$investigacionesArgs<ExtArgs>>): Prisma.Prisma__investigacionesClient<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    solicitudes_prorroga<T extends Prisma.incidencias$solicitudes_prorrogaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.incidencias$solicitudes_prorrogaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the incidencias model
 */
export interface incidenciasFieldRefs {
    readonly id_incidencia: Prisma.FieldRef<"incidencias", 'Int'>;
    readonly codigo_incidencia: Prisma.FieldRef<"incidencias", 'String'>;
    readonly tipo_evento: Prisma.FieldRef<"incidencias", 'String'>;
    readonly descripcion: Prisma.FieldRef<"incidencias", 'String'>;
    readonly nivel_riesgo: Prisma.FieldRef<"incidencias", 'String'>;
    readonly estado: Prisma.FieldRef<"incidencias", 'String'>;
    readonly fecha_registro: Prisma.FieldRef<"incidencias", 'DateTime'>;
    readonly fecha_limite: Prisma.FieldRef<"incidencias", 'DateTime'>;
    readonly id_usuario_reporta: Prisma.FieldRef<"incidencias", 'Int'>;
    readonly id_estacion: Prisma.FieldRef<"incidencias", 'Int'>;
    readonly id_area_responsable: Prisma.FieldRef<"incidencias", 'Int'>;
}
/**
 * incidencias findUnique
 */
export type incidenciasFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which incidencias to fetch.
     */
    where: Prisma.incidenciasWhereUniqueInput;
};
/**
 * incidencias findUniqueOrThrow
 */
export type incidenciasFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which incidencias to fetch.
     */
    where: Prisma.incidenciasWhereUniqueInput;
};
/**
 * incidencias findFirst
 */
export type incidenciasFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which incidencias to fetch.
     */
    where?: Prisma.incidenciasWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of incidencias to fetch.
     */
    orderBy?: Prisma.incidenciasOrderByWithRelationInput | Prisma.incidenciasOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for incidencias.
     */
    cursor?: Prisma.incidenciasWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` incidencias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` incidencias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of incidencias.
     */
    distinct?: Prisma.IncidenciasScalarFieldEnum | Prisma.IncidenciasScalarFieldEnum[];
};
/**
 * incidencias findFirstOrThrow
 */
export type incidenciasFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which incidencias to fetch.
     */
    where?: Prisma.incidenciasWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of incidencias to fetch.
     */
    orderBy?: Prisma.incidenciasOrderByWithRelationInput | Prisma.incidenciasOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for incidencias.
     */
    cursor?: Prisma.incidenciasWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` incidencias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` incidencias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of incidencias.
     */
    distinct?: Prisma.IncidenciasScalarFieldEnum | Prisma.IncidenciasScalarFieldEnum[];
};
/**
 * incidencias findMany
 */
export type incidenciasFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which incidencias to fetch.
     */
    where?: Prisma.incidenciasWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of incidencias to fetch.
     */
    orderBy?: Prisma.incidenciasOrderByWithRelationInput | Prisma.incidenciasOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing incidencias.
     */
    cursor?: Prisma.incidenciasWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` incidencias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` incidencias.
     */
    skip?: number;
    distinct?: Prisma.IncidenciasScalarFieldEnum | Prisma.IncidenciasScalarFieldEnum[];
};
/**
 * incidencias create
 */
export type incidenciasCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a incidencias.
     */
    data: Prisma.XOR<Prisma.incidenciasCreateInput, Prisma.incidenciasUncheckedCreateInput>;
};
/**
 * incidencias createMany
 */
export type incidenciasCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many incidencias.
     */
    data: Prisma.incidenciasCreateManyInput | Prisma.incidenciasCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * incidencias createManyAndReturn
 */
export type incidenciasCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidencias
     */
    select?: Prisma.incidenciasSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the incidencias
     */
    omit?: Prisma.incidenciasOmit<ExtArgs> | null;
    /**
     * The data used to create many incidencias.
     */
    data: Prisma.incidenciasCreateManyInput | Prisma.incidenciasCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.incidenciasIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * incidencias update
 */
export type incidenciasUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a incidencias.
     */
    data: Prisma.XOR<Prisma.incidenciasUpdateInput, Prisma.incidenciasUncheckedUpdateInput>;
    /**
     * Choose, which incidencias to update.
     */
    where: Prisma.incidenciasWhereUniqueInput;
};
/**
 * incidencias updateMany
 */
export type incidenciasUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update incidencias.
     */
    data: Prisma.XOR<Prisma.incidenciasUpdateManyMutationInput, Prisma.incidenciasUncheckedUpdateManyInput>;
    /**
     * Filter which incidencias to update
     */
    where?: Prisma.incidenciasWhereInput;
    /**
     * Limit how many incidencias to update.
     */
    limit?: number;
};
/**
 * incidencias updateManyAndReturn
 */
export type incidenciasUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidencias
     */
    select?: Prisma.incidenciasSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the incidencias
     */
    omit?: Prisma.incidenciasOmit<ExtArgs> | null;
    /**
     * The data used to update incidencias.
     */
    data: Prisma.XOR<Prisma.incidenciasUpdateManyMutationInput, Prisma.incidenciasUncheckedUpdateManyInput>;
    /**
     * Filter which incidencias to update
     */
    where?: Prisma.incidenciasWhereInput;
    /**
     * Limit how many incidencias to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.incidenciasIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * incidencias upsert
 */
export type incidenciasUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the incidencias to update in case it exists.
     */
    where: Prisma.incidenciasWhereUniqueInput;
    /**
     * In case the incidencias found by the `where` argument doesn't exist, create a new incidencias with this data.
     */
    create: Prisma.XOR<Prisma.incidenciasCreateInput, Prisma.incidenciasUncheckedCreateInput>;
    /**
     * In case the incidencias was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.incidenciasUpdateInput, Prisma.incidenciasUncheckedUpdateInput>;
};
/**
 * incidencias delete
 */
export type incidenciasDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which incidencias to delete.
     */
    where: Prisma.incidenciasWhereUniqueInput;
};
/**
 * incidencias deleteMany
 */
export type incidenciasDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which incidencias to delete
     */
    where?: Prisma.incidenciasWhereInput;
    /**
     * Limit how many incidencias to delete.
     */
    limit?: number;
};
/**
 * incidencias.evidencias
 */
export type incidencias$evidenciasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    where?: Prisma.evidenciasWhereInput;
    orderBy?: Prisma.evidenciasOrderByWithRelationInput | Prisma.evidenciasOrderByWithRelationInput[];
    cursor?: Prisma.evidenciasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EvidenciasScalarFieldEnum | Prisma.EvidenciasScalarFieldEnum[];
};
/**
 * incidencias.areas
 */
export type incidencias$areasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * incidencias.estaciones
 */
export type incidencias$estacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    where?: Prisma.estacionesWhereInput;
};
/**
 * incidencias.usuarios
 */
export type incidencias$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * incidencias.investigaciones
 */
export type incidencias$investigacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * incidencias.solicitudes_prorroga
 */
export type incidencias$solicitudes_prorrogaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_prorrogaWhereInput;
    orderBy?: Prisma.solicitudes_prorrogaOrderByWithRelationInput | Prisma.solicitudes_prorrogaOrderByWithRelationInput[];
    cursor?: Prisma.solicitudes_prorrogaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitudes_prorrogaScalarFieldEnum | Prisma.Solicitudes_prorrogaScalarFieldEnum[];
};
/**
 * incidencias without action
 */
export type incidenciasDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=incidencias.d.ts.map