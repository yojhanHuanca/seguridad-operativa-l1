import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model reporte_estadistico
 *
 */
export type reporte_estadisticoModel = runtime.Types.Result.DefaultSelection<Prisma.$reporte_estadisticoPayload>;
export type AggregateReporte_estadistico = {
    _count: Reporte_estadisticoCountAggregateOutputType | null;
    _avg: Reporte_estadisticoAvgAggregateOutputType | null;
    _sum: Reporte_estadisticoSumAggregateOutputType | null;
    _min: Reporte_estadisticoMinAggregateOutputType | null;
    _max: Reporte_estadisticoMaxAggregateOutputType | null;
};
export type Reporte_estadisticoAvgAggregateOutputType = {
    id_reporte: number | null;
    generado_por: number | null;
};
export type Reporte_estadisticoSumAggregateOutputType = {
    id_reporte: number | null;
    generado_por: number | null;
};
export type Reporte_estadisticoMinAggregateOutputType = {
    id_reporte: number | null;
    nombre: string | null;
    descripcion: string | null;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    generado_por: number | null;
    fecha_generacion: Date | null;
};
export type Reporte_estadisticoMaxAggregateOutputType = {
    id_reporte: number | null;
    nombre: string | null;
    descripcion: string | null;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    generado_por: number | null;
    fecha_generacion: Date | null;
};
export type Reporte_estadisticoCountAggregateOutputType = {
    id_reporte: number;
    nombre: number;
    descripcion: number;
    fecha_inicio: number;
    fecha_fin: number;
    generado_por: number;
    fecha_generacion: number;
    _all: number;
};
export type Reporte_estadisticoAvgAggregateInputType = {
    id_reporte?: true;
    generado_por?: true;
};
export type Reporte_estadisticoSumAggregateInputType = {
    id_reporte?: true;
    generado_por?: true;
};
export type Reporte_estadisticoMinAggregateInputType = {
    id_reporte?: true;
    nombre?: true;
    descripcion?: true;
    fecha_inicio?: true;
    fecha_fin?: true;
    generado_por?: true;
    fecha_generacion?: true;
};
export type Reporte_estadisticoMaxAggregateInputType = {
    id_reporte?: true;
    nombre?: true;
    descripcion?: true;
    fecha_inicio?: true;
    fecha_fin?: true;
    generado_por?: true;
    fecha_generacion?: true;
};
export type Reporte_estadisticoCountAggregateInputType = {
    id_reporte?: true;
    nombre?: true;
    descripcion?: true;
    fecha_inicio?: true;
    fecha_fin?: true;
    generado_por?: true;
    fecha_generacion?: true;
    _all?: true;
};
export type Reporte_estadisticoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which reporte_estadistico to aggregate.
     */
    where?: Prisma.reporte_estadisticoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reporte_estadisticos to fetch.
     */
    orderBy?: Prisma.reporte_estadisticoOrderByWithRelationInput | Prisma.reporte_estadisticoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.reporte_estadisticoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reporte_estadisticos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reporte_estadisticos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned reporte_estadisticos
    **/
    _count?: true | Reporte_estadisticoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Reporte_estadisticoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Reporte_estadisticoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Reporte_estadisticoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Reporte_estadisticoMaxAggregateInputType;
};
export type GetReporte_estadisticoAggregateType<T extends Reporte_estadisticoAggregateArgs> = {
    [P in keyof T & keyof AggregateReporte_estadistico]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReporte_estadistico[P]> : Prisma.GetScalarType<T[P], AggregateReporte_estadistico[P]>;
};
export type reporte_estadisticoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.reporte_estadisticoWhereInput;
    orderBy?: Prisma.reporte_estadisticoOrderByWithAggregationInput | Prisma.reporte_estadisticoOrderByWithAggregationInput[];
    by: Prisma.Reporte_estadisticoScalarFieldEnum[] | Prisma.Reporte_estadisticoScalarFieldEnum;
    having?: Prisma.reporte_estadisticoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Reporte_estadisticoCountAggregateInputType | true;
    _avg?: Reporte_estadisticoAvgAggregateInputType;
    _sum?: Reporte_estadisticoSumAggregateInputType;
    _min?: Reporte_estadisticoMinAggregateInputType;
    _max?: Reporte_estadisticoMaxAggregateInputType;
};
export type Reporte_estadisticoGroupByOutputType = {
    id_reporte: number;
    nombre: string | null;
    descripcion: string | null;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    generado_por: number | null;
    fecha_generacion: Date | null;
    _count: Reporte_estadisticoCountAggregateOutputType | null;
    _avg: Reporte_estadisticoAvgAggregateOutputType | null;
    _sum: Reporte_estadisticoSumAggregateOutputType | null;
    _min: Reporte_estadisticoMinAggregateOutputType | null;
    _max: Reporte_estadisticoMaxAggregateOutputType | null;
};
type GetReporte_estadisticoGroupByPayload<T extends reporte_estadisticoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Reporte_estadisticoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Reporte_estadisticoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Reporte_estadisticoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Reporte_estadisticoGroupByOutputType[P]>;
}>>;
export type reporte_estadisticoWhereInput = {
    AND?: Prisma.reporte_estadisticoWhereInput | Prisma.reporte_estadisticoWhereInput[];
    OR?: Prisma.reporte_estadisticoWhereInput[];
    NOT?: Prisma.reporte_estadisticoWhereInput | Prisma.reporte_estadisticoWhereInput[];
    id_reporte?: Prisma.IntFilter<"reporte_estadistico"> | number;
    nombre?: Prisma.StringNullableFilter<"reporte_estadistico"> | string | null;
    descripcion?: Prisma.StringNullableFilter<"reporte_estadistico"> | string | null;
    fecha_inicio?: Prisma.DateTimeNullableFilter<"reporte_estadistico"> | Date | string | null;
    fecha_fin?: Prisma.DateTimeNullableFilter<"reporte_estadistico"> | Date | string | null;
    generado_por?: Prisma.IntNullableFilter<"reporte_estadistico"> | number | null;
    fecha_generacion?: Prisma.DateTimeNullableFilter<"reporte_estadistico"> | Date | string | null;
    reporte_detalle?: Prisma.Reporte_detalleListRelationFilter;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type reporte_estadisticoOrderByWithRelationInput = {
    id_reporte?: Prisma.SortOrder;
    nombre?: Prisma.SortOrderInput | Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrderInput | Prisma.SortOrder;
    generado_por?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_generacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    reporte_detalle?: Prisma.reporte_detalleOrderByRelationAggregateInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type reporte_estadisticoWhereUniqueInput = Prisma.AtLeast<{
    id_reporte?: number;
    AND?: Prisma.reporte_estadisticoWhereInput | Prisma.reporte_estadisticoWhereInput[];
    OR?: Prisma.reporte_estadisticoWhereInput[];
    NOT?: Prisma.reporte_estadisticoWhereInput | Prisma.reporte_estadisticoWhereInput[];
    nombre?: Prisma.StringNullableFilter<"reporte_estadistico"> | string | null;
    descripcion?: Prisma.StringNullableFilter<"reporte_estadistico"> | string | null;
    fecha_inicio?: Prisma.DateTimeNullableFilter<"reporte_estadistico"> | Date | string | null;
    fecha_fin?: Prisma.DateTimeNullableFilter<"reporte_estadistico"> | Date | string | null;
    generado_por?: Prisma.IntNullableFilter<"reporte_estadistico"> | number | null;
    fecha_generacion?: Prisma.DateTimeNullableFilter<"reporte_estadistico"> | Date | string | null;
    reporte_detalle?: Prisma.Reporte_detalleListRelationFilter;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id_reporte">;
export type reporte_estadisticoOrderByWithAggregationInput = {
    id_reporte?: Prisma.SortOrder;
    nombre?: Prisma.SortOrderInput | Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrderInput | Prisma.SortOrder;
    generado_por?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_generacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.reporte_estadisticoCountOrderByAggregateInput;
    _avg?: Prisma.reporte_estadisticoAvgOrderByAggregateInput;
    _max?: Prisma.reporte_estadisticoMaxOrderByAggregateInput;
    _min?: Prisma.reporte_estadisticoMinOrderByAggregateInput;
    _sum?: Prisma.reporte_estadisticoSumOrderByAggregateInput;
};
export type reporte_estadisticoScalarWhereWithAggregatesInput = {
    AND?: Prisma.reporte_estadisticoScalarWhereWithAggregatesInput | Prisma.reporte_estadisticoScalarWhereWithAggregatesInput[];
    OR?: Prisma.reporte_estadisticoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.reporte_estadisticoScalarWhereWithAggregatesInput | Prisma.reporte_estadisticoScalarWhereWithAggregatesInput[];
    id_reporte?: Prisma.IntWithAggregatesFilter<"reporte_estadistico"> | number;
    nombre?: Prisma.StringNullableWithAggregatesFilter<"reporte_estadistico"> | string | null;
    descripcion?: Prisma.StringNullableWithAggregatesFilter<"reporte_estadistico"> | string | null;
    fecha_inicio?: Prisma.DateTimeNullableWithAggregatesFilter<"reporte_estadistico"> | Date | string | null;
    fecha_fin?: Prisma.DateTimeNullableWithAggregatesFilter<"reporte_estadistico"> | Date | string | null;
    generado_por?: Prisma.IntNullableWithAggregatesFilter<"reporte_estadistico"> | number | null;
    fecha_generacion?: Prisma.DateTimeNullableWithAggregatesFilter<"reporte_estadistico"> | Date | string | null;
};
export type reporte_estadisticoCreateInput = {
    nombre?: string | null;
    descripcion?: string | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    fecha_generacion?: Date | string | null;
    reporte_detalle?: Prisma.reporte_detalleCreateNestedManyWithoutReporte_estadisticoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutReporte_estadisticoInput;
};
export type reporte_estadisticoUncheckedCreateInput = {
    id_reporte?: number;
    nombre?: string | null;
    descripcion?: string | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    generado_por?: number | null;
    fecha_generacion?: Date | string | null;
    reporte_detalle?: Prisma.reporte_detalleUncheckedCreateNestedManyWithoutReporte_estadisticoInput;
};
export type reporte_estadisticoUpdateInput = {
    nombre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_generacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reporte_detalle?: Prisma.reporte_detalleUpdateManyWithoutReporte_estadisticoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutReporte_estadisticoNestedInput;
};
export type reporte_estadisticoUncheckedUpdateInput = {
    id_reporte?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    generado_por?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_generacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reporte_detalle?: Prisma.reporte_detalleUncheckedUpdateManyWithoutReporte_estadisticoNestedInput;
};
export type reporte_estadisticoCreateManyInput = {
    id_reporte?: number;
    nombre?: string | null;
    descripcion?: string | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    generado_por?: number | null;
    fecha_generacion?: Date | string | null;
};
export type reporte_estadisticoUpdateManyMutationInput = {
    nombre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_generacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type reporte_estadisticoUncheckedUpdateManyInput = {
    id_reporte?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    generado_por?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_generacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Reporte_estadisticoScalarRelationFilter = {
    is?: Prisma.reporte_estadisticoWhereInput;
    isNot?: Prisma.reporte_estadisticoWhereInput;
};
export type reporte_estadisticoCountOrderByAggregateInput = {
    id_reporte?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrder;
    generado_por?: Prisma.SortOrder;
    fecha_generacion?: Prisma.SortOrder;
};
export type reporte_estadisticoAvgOrderByAggregateInput = {
    id_reporte?: Prisma.SortOrder;
    generado_por?: Prisma.SortOrder;
};
export type reporte_estadisticoMaxOrderByAggregateInput = {
    id_reporte?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrder;
    generado_por?: Prisma.SortOrder;
    fecha_generacion?: Prisma.SortOrder;
};
export type reporte_estadisticoMinOrderByAggregateInput = {
    id_reporte?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrder;
    generado_por?: Prisma.SortOrder;
    fecha_generacion?: Prisma.SortOrder;
};
export type reporte_estadisticoSumOrderByAggregateInput = {
    id_reporte?: Prisma.SortOrder;
    generado_por?: Prisma.SortOrder;
};
export type Reporte_estadisticoListRelationFilter = {
    every?: Prisma.reporte_estadisticoWhereInput;
    some?: Prisma.reporte_estadisticoWhereInput;
    none?: Prisma.reporte_estadisticoWhereInput;
};
export type reporte_estadisticoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type reporte_estadisticoCreateNestedOneWithoutReporte_detalleInput = {
    create?: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutReporte_detalleInput, Prisma.reporte_estadisticoUncheckedCreateWithoutReporte_detalleInput>;
    connectOrCreate?: Prisma.reporte_estadisticoCreateOrConnectWithoutReporte_detalleInput;
    connect?: Prisma.reporte_estadisticoWhereUniqueInput;
};
export type reporte_estadisticoUpdateOneRequiredWithoutReporte_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutReporte_detalleInput, Prisma.reporte_estadisticoUncheckedCreateWithoutReporte_detalleInput>;
    connectOrCreate?: Prisma.reporte_estadisticoCreateOrConnectWithoutReporte_detalleInput;
    upsert?: Prisma.reporte_estadisticoUpsertWithoutReporte_detalleInput;
    connect?: Prisma.reporte_estadisticoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.reporte_estadisticoUpdateToOneWithWhereWithoutReporte_detalleInput, Prisma.reporte_estadisticoUpdateWithoutReporte_detalleInput>, Prisma.reporte_estadisticoUncheckedUpdateWithoutReporte_detalleInput>;
};
export type reporte_estadisticoCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutUsuariosInput, Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput> | Prisma.reporte_estadisticoCreateWithoutUsuariosInput[] | Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.reporte_estadisticoCreateOrConnectWithoutUsuariosInput | Prisma.reporte_estadisticoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.reporte_estadisticoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
};
export type reporte_estadisticoUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutUsuariosInput, Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput> | Prisma.reporte_estadisticoCreateWithoutUsuariosInput[] | Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.reporte_estadisticoCreateOrConnectWithoutUsuariosInput | Prisma.reporte_estadisticoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.reporte_estadisticoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
};
export type reporte_estadisticoUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutUsuariosInput, Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput> | Prisma.reporte_estadisticoCreateWithoutUsuariosInput[] | Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.reporte_estadisticoCreateOrConnectWithoutUsuariosInput | Prisma.reporte_estadisticoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.reporte_estadisticoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.reporte_estadisticoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.reporte_estadisticoCreateManyUsuariosInputEnvelope;
    set?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
    disconnect?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
    delete?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
    connect?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
    update?: Prisma.reporte_estadisticoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.reporte_estadisticoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.reporte_estadisticoUpdateManyWithWhereWithoutUsuariosInput | Prisma.reporte_estadisticoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.reporte_estadisticoScalarWhereInput | Prisma.reporte_estadisticoScalarWhereInput[];
};
export type reporte_estadisticoUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutUsuariosInput, Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput> | Prisma.reporte_estadisticoCreateWithoutUsuariosInput[] | Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.reporte_estadisticoCreateOrConnectWithoutUsuariosInput | Prisma.reporte_estadisticoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.reporte_estadisticoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.reporte_estadisticoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.reporte_estadisticoCreateManyUsuariosInputEnvelope;
    set?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
    disconnect?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
    delete?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
    connect?: Prisma.reporte_estadisticoWhereUniqueInput | Prisma.reporte_estadisticoWhereUniqueInput[];
    update?: Prisma.reporte_estadisticoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.reporte_estadisticoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.reporte_estadisticoUpdateManyWithWhereWithoutUsuariosInput | Prisma.reporte_estadisticoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.reporte_estadisticoScalarWhereInput | Prisma.reporte_estadisticoScalarWhereInput[];
};
export type reporte_estadisticoCreateWithoutReporte_detalleInput = {
    nombre?: string | null;
    descripcion?: string | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    fecha_generacion?: Date | string | null;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutReporte_estadisticoInput;
};
export type reporte_estadisticoUncheckedCreateWithoutReporte_detalleInput = {
    id_reporte?: number;
    nombre?: string | null;
    descripcion?: string | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    generado_por?: number | null;
    fecha_generacion?: Date | string | null;
};
export type reporte_estadisticoCreateOrConnectWithoutReporte_detalleInput = {
    where: Prisma.reporte_estadisticoWhereUniqueInput;
    create: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutReporte_detalleInput, Prisma.reporte_estadisticoUncheckedCreateWithoutReporte_detalleInput>;
};
export type reporte_estadisticoUpsertWithoutReporte_detalleInput = {
    update: Prisma.XOR<Prisma.reporte_estadisticoUpdateWithoutReporte_detalleInput, Prisma.reporte_estadisticoUncheckedUpdateWithoutReporte_detalleInput>;
    create: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutReporte_detalleInput, Prisma.reporte_estadisticoUncheckedCreateWithoutReporte_detalleInput>;
    where?: Prisma.reporte_estadisticoWhereInput;
};
export type reporte_estadisticoUpdateToOneWithWhereWithoutReporte_detalleInput = {
    where?: Prisma.reporte_estadisticoWhereInput;
    data: Prisma.XOR<Prisma.reporte_estadisticoUpdateWithoutReporte_detalleInput, Prisma.reporte_estadisticoUncheckedUpdateWithoutReporte_detalleInput>;
};
export type reporte_estadisticoUpdateWithoutReporte_detalleInput = {
    nombre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_generacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuarios?: Prisma.usuariosUpdateOneWithoutReporte_estadisticoNestedInput;
};
export type reporte_estadisticoUncheckedUpdateWithoutReporte_detalleInput = {
    id_reporte?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    generado_por?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_generacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type reporte_estadisticoCreateWithoutUsuariosInput = {
    nombre?: string | null;
    descripcion?: string | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    fecha_generacion?: Date | string | null;
    reporte_detalle?: Prisma.reporte_detalleCreateNestedManyWithoutReporte_estadisticoInput;
};
export type reporte_estadisticoUncheckedCreateWithoutUsuariosInput = {
    id_reporte?: number;
    nombre?: string | null;
    descripcion?: string | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    fecha_generacion?: Date | string | null;
    reporte_detalle?: Prisma.reporte_detalleUncheckedCreateNestedManyWithoutReporte_estadisticoInput;
};
export type reporte_estadisticoCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.reporte_estadisticoWhereUniqueInput;
    create: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutUsuariosInput, Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput>;
};
export type reporte_estadisticoCreateManyUsuariosInputEnvelope = {
    data: Prisma.reporte_estadisticoCreateManyUsuariosInput | Prisma.reporte_estadisticoCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type reporte_estadisticoUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.reporte_estadisticoWhereUniqueInput;
    update: Prisma.XOR<Prisma.reporte_estadisticoUpdateWithoutUsuariosInput, Prisma.reporte_estadisticoUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.reporte_estadisticoCreateWithoutUsuariosInput, Prisma.reporte_estadisticoUncheckedCreateWithoutUsuariosInput>;
};
export type reporte_estadisticoUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.reporte_estadisticoWhereUniqueInput;
    data: Prisma.XOR<Prisma.reporte_estadisticoUpdateWithoutUsuariosInput, Prisma.reporte_estadisticoUncheckedUpdateWithoutUsuariosInput>;
};
export type reporte_estadisticoUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.reporte_estadisticoScalarWhereInput;
    data: Prisma.XOR<Prisma.reporte_estadisticoUpdateManyMutationInput, Prisma.reporte_estadisticoUncheckedUpdateManyWithoutUsuariosInput>;
};
export type reporte_estadisticoScalarWhereInput = {
    AND?: Prisma.reporte_estadisticoScalarWhereInput | Prisma.reporte_estadisticoScalarWhereInput[];
    OR?: Prisma.reporte_estadisticoScalarWhereInput[];
    NOT?: Prisma.reporte_estadisticoScalarWhereInput | Prisma.reporte_estadisticoScalarWhereInput[];
    id_reporte?: Prisma.IntFilter<"reporte_estadistico"> | number;
    nombre?: Prisma.StringNullableFilter<"reporte_estadistico"> | string | null;
    descripcion?: Prisma.StringNullableFilter<"reporte_estadistico"> | string | null;
    fecha_inicio?: Prisma.DateTimeNullableFilter<"reporte_estadistico"> | Date | string | null;
    fecha_fin?: Prisma.DateTimeNullableFilter<"reporte_estadistico"> | Date | string | null;
    generado_por?: Prisma.IntNullableFilter<"reporte_estadistico"> | number | null;
    fecha_generacion?: Prisma.DateTimeNullableFilter<"reporte_estadistico"> | Date | string | null;
};
export type reporte_estadisticoCreateManyUsuariosInput = {
    id_reporte?: number;
    nombre?: string | null;
    descripcion?: string | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    fecha_generacion?: Date | string | null;
};
export type reporte_estadisticoUpdateWithoutUsuariosInput = {
    nombre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_generacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reporte_detalle?: Prisma.reporte_detalleUpdateManyWithoutReporte_estadisticoNestedInput;
};
export type reporte_estadisticoUncheckedUpdateWithoutUsuariosInput = {
    id_reporte?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_generacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reporte_detalle?: Prisma.reporte_detalleUncheckedUpdateManyWithoutReporte_estadisticoNestedInput;
};
export type reporte_estadisticoUncheckedUpdateManyWithoutUsuariosInput = {
    id_reporte?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_generacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type Reporte_estadisticoCountOutputType
 */
export type Reporte_estadisticoCountOutputType = {
    reporte_detalle: number;
};
export type Reporte_estadisticoCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporte_detalle?: boolean | Reporte_estadisticoCountOutputTypeCountReporte_detalleArgs;
};
/**
 * Reporte_estadisticoCountOutputType without action
 */
export type Reporte_estadisticoCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reporte_estadisticoCountOutputType
     */
    select?: Prisma.Reporte_estadisticoCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * Reporte_estadisticoCountOutputType without action
 */
export type Reporte_estadisticoCountOutputTypeCountReporte_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.reporte_detalleWhereInput;
};
export type reporte_estadisticoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_reporte?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    fecha_inicio?: boolean;
    fecha_fin?: boolean;
    generado_por?: boolean;
    fecha_generacion?: boolean;
    reporte_detalle?: boolean | Prisma.reporte_estadistico$reporte_detalleArgs<ExtArgs>;
    usuarios?: boolean | Prisma.reporte_estadistico$usuariosArgs<ExtArgs>;
    _count?: boolean | Prisma.Reporte_estadisticoCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reporte_estadistico"]>;
export type reporte_estadisticoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_reporte?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    fecha_inicio?: boolean;
    fecha_fin?: boolean;
    generado_por?: boolean;
    fecha_generacion?: boolean;
    usuarios?: boolean | Prisma.reporte_estadistico$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["reporte_estadistico"]>;
export type reporte_estadisticoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_reporte?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    fecha_inicio?: boolean;
    fecha_fin?: boolean;
    generado_por?: boolean;
    fecha_generacion?: boolean;
    usuarios?: boolean | Prisma.reporte_estadistico$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["reporte_estadistico"]>;
export type reporte_estadisticoSelectScalar = {
    id_reporte?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    fecha_inicio?: boolean;
    fecha_fin?: boolean;
    generado_por?: boolean;
    fecha_generacion?: boolean;
};
export type reporte_estadisticoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_reporte" | "nombre" | "descripcion" | "fecha_inicio" | "fecha_fin" | "generado_por" | "fecha_generacion", ExtArgs["result"]["reporte_estadistico"]>;
export type reporte_estadisticoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporte_detalle?: boolean | Prisma.reporte_estadistico$reporte_detalleArgs<ExtArgs>;
    usuarios?: boolean | Prisma.reporte_estadistico$usuariosArgs<ExtArgs>;
    _count?: boolean | Prisma.Reporte_estadisticoCountOutputTypeDefaultArgs<ExtArgs>;
};
export type reporte_estadisticoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuarios?: boolean | Prisma.reporte_estadistico$usuariosArgs<ExtArgs>;
};
export type reporte_estadisticoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuarios?: boolean | Prisma.reporte_estadistico$usuariosArgs<ExtArgs>;
};
export type $reporte_estadisticoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "reporte_estadistico";
    objects: {
        reporte_detalle: Prisma.$reporte_detallePayload<ExtArgs>[];
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_reporte: number;
        nombre: string | null;
        descripcion: string | null;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        generado_por: number | null;
        fecha_generacion: Date | null;
    }, ExtArgs["result"]["reporte_estadistico"]>;
    composites: {};
};
export type reporte_estadisticoGetPayload<S extends boolean | null | undefined | reporte_estadisticoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload, S>;
export type reporte_estadisticoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<reporte_estadisticoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Reporte_estadisticoCountAggregateInputType | true;
};
export interface reporte_estadisticoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['reporte_estadistico'];
        meta: {
            name: 'reporte_estadistico';
        };
    };
    /**
     * Find zero or one Reporte_estadistico that matches the filter.
     * @param {reporte_estadisticoFindUniqueArgs} args - Arguments to find a Reporte_estadistico
     * @example
     * // Get one Reporte_estadistico
     * const reporte_estadistico = await prisma.reporte_estadistico.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reporte_estadisticoFindUniqueArgs>(args: Prisma.SelectSubset<T, reporte_estadisticoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__reporte_estadisticoClient<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Reporte_estadistico that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reporte_estadisticoFindUniqueOrThrowArgs} args - Arguments to find a Reporte_estadistico
     * @example
     * // Get one Reporte_estadistico
     * const reporte_estadistico = await prisma.reporte_estadistico.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reporte_estadisticoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, reporte_estadisticoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__reporte_estadisticoClient<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Reporte_estadistico that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_estadisticoFindFirstArgs} args - Arguments to find a Reporte_estadistico
     * @example
     * // Get one Reporte_estadistico
     * const reporte_estadistico = await prisma.reporte_estadistico.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reporte_estadisticoFindFirstArgs>(args?: Prisma.SelectSubset<T, reporte_estadisticoFindFirstArgs<ExtArgs>>): Prisma.Prisma__reporte_estadisticoClient<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Reporte_estadistico that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_estadisticoFindFirstOrThrowArgs} args - Arguments to find a Reporte_estadistico
     * @example
     * // Get one Reporte_estadistico
     * const reporte_estadistico = await prisma.reporte_estadistico.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reporte_estadisticoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, reporte_estadisticoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__reporte_estadisticoClient<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Reporte_estadisticos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_estadisticoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reporte_estadisticos
     * const reporte_estadisticos = await prisma.reporte_estadistico.findMany()
     *
     * // Get first 10 Reporte_estadisticos
     * const reporte_estadisticos = await prisma.reporte_estadistico.findMany({ take: 10 })
     *
     * // Only select the `id_reporte`
     * const reporte_estadisticoWithId_reporteOnly = await prisma.reporte_estadistico.findMany({ select: { id_reporte: true } })
     *
     */
    findMany<T extends reporte_estadisticoFindManyArgs>(args?: Prisma.SelectSubset<T, reporte_estadisticoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Reporte_estadistico.
     * @param {reporte_estadisticoCreateArgs} args - Arguments to create a Reporte_estadistico.
     * @example
     * // Create one Reporte_estadistico
     * const Reporte_estadistico = await prisma.reporte_estadistico.create({
     *   data: {
     *     // ... data to create a Reporte_estadistico
     *   }
     * })
     *
     */
    create<T extends reporte_estadisticoCreateArgs>(args: Prisma.SelectSubset<T, reporte_estadisticoCreateArgs<ExtArgs>>): Prisma.Prisma__reporte_estadisticoClient<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Reporte_estadisticos.
     * @param {reporte_estadisticoCreateManyArgs} args - Arguments to create many Reporte_estadisticos.
     * @example
     * // Create many Reporte_estadisticos
     * const reporte_estadistico = await prisma.reporte_estadistico.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends reporte_estadisticoCreateManyArgs>(args?: Prisma.SelectSubset<T, reporte_estadisticoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Reporte_estadisticos and returns the data saved in the database.
     * @param {reporte_estadisticoCreateManyAndReturnArgs} args - Arguments to create many Reporte_estadisticos.
     * @example
     * // Create many Reporte_estadisticos
     * const reporte_estadistico = await prisma.reporte_estadistico.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Reporte_estadisticos and only return the `id_reporte`
     * const reporte_estadisticoWithId_reporteOnly = await prisma.reporte_estadistico.createManyAndReturn({
     *   select: { id_reporte: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends reporte_estadisticoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, reporte_estadisticoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Reporte_estadistico.
     * @param {reporte_estadisticoDeleteArgs} args - Arguments to delete one Reporte_estadistico.
     * @example
     * // Delete one Reporte_estadistico
     * const Reporte_estadistico = await prisma.reporte_estadistico.delete({
     *   where: {
     *     // ... filter to delete one Reporte_estadistico
     *   }
     * })
     *
     */
    delete<T extends reporte_estadisticoDeleteArgs>(args: Prisma.SelectSubset<T, reporte_estadisticoDeleteArgs<ExtArgs>>): Prisma.Prisma__reporte_estadisticoClient<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Reporte_estadistico.
     * @param {reporte_estadisticoUpdateArgs} args - Arguments to update one Reporte_estadistico.
     * @example
     * // Update one Reporte_estadistico
     * const reporte_estadistico = await prisma.reporte_estadistico.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends reporte_estadisticoUpdateArgs>(args: Prisma.SelectSubset<T, reporte_estadisticoUpdateArgs<ExtArgs>>): Prisma.Prisma__reporte_estadisticoClient<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Reporte_estadisticos.
     * @param {reporte_estadisticoDeleteManyArgs} args - Arguments to filter Reporte_estadisticos to delete.
     * @example
     * // Delete a few Reporte_estadisticos
     * const { count } = await prisma.reporte_estadistico.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends reporte_estadisticoDeleteManyArgs>(args?: Prisma.SelectSubset<T, reporte_estadisticoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Reporte_estadisticos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_estadisticoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reporte_estadisticos
     * const reporte_estadistico = await prisma.reporte_estadistico.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends reporte_estadisticoUpdateManyArgs>(args: Prisma.SelectSubset<T, reporte_estadisticoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Reporte_estadisticos and returns the data updated in the database.
     * @param {reporte_estadisticoUpdateManyAndReturnArgs} args - Arguments to update many Reporte_estadisticos.
     * @example
     * // Update many Reporte_estadisticos
     * const reporte_estadistico = await prisma.reporte_estadistico.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Reporte_estadisticos and only return the `id_reporte`
     * const reporte_estadisticoWithId_reporteOnly = await prisma.reporte_estadistico.updateManyAndReturn({
     *   select: { id_reporte: true },
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
    updateManyAndReturn<T extends reporte_estadisticoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, reporte_estadisticoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Reporte_estadistico.
     * @param {reporte_estadisticoUpsertArgs} args - Arguments to update or create a Reporte_estadistico.
     * @example
     * // Update or create a Reporte_estadistico
     * const reporte_estadistico = await prisma.reporte_estadistico.upsert({
     *   create: {
     *     // ... data to create a Reporte_estadistico
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reporte_estadistico we want to update
     *   }
     * })
     */
    upsert<T extends reporte_estadisticoUpsertArgs>(args: Prisma.SelectSubset<T, reporte_estadisticoUpsertArgs<ExtArgs>>): Prisma.Prisma__reporte_estadisticoClient<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Reporte_estadisticos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_estadisticoCountArgs} args - Arguments to filter Reporte_estadisticos to count.
     * @example
     * // Count the number of Reporte_estadisticos
     * const count = await prisma.reporte_estadistico.count({
     *   where: {
     *     // ... the filter for the Reporte_estadisticos we want to count
     *   }
     * })
    **/
    count<T extends reporte_estadisticoCountArgs>(args?: Prisma.Subset<T, reporte_estadisticoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Reporte_estadisticoCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Reporte_estadistico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Reporte_estadisticoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Reporte_estadisticoAggregateArgs>(args: Prisma.Subset<T, Reporte_estadisticoAggregateArgs>): Prisma.PrismaPromise<GetReporte_estadisticoAggregateType<T>>;
    /**
     * Group by Reporte_estadistico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_estadisticoGroupByArgs} args - Group by arguments.
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
    groupBy<T extends reporte_estadisticoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: reporte_estadisticoGroupByArgs['orderBy'];
    } : {
        orderBy?: reporte_estadisticoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, reporte_estadisticoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReporte_estadisticoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the reporte_estadistico model
     */
    readonly fields: reporte_estadisticoFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for reporte_estadistico.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__reporte_estadisticoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    reporte_detalle<T extends Prisma.reporte_estadistico$reporte_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.reporte_estadistico$reporte_detalleArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    usuarios<T extends Prisma.reporte_estadistico$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.reporte_estadistico$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the reporte_estadistico model
 */
export interface reporte_estadisticoFieldRefs {
    readonly id_reporte: Prisma.FieldRef<"reporte_estadistico", 'Int'>;
    readonly nombre: Prisma.FieldRef<"reporte_estadistico", 'String'>;
    readonly descripcion: Prisma.FieldRef<"reporte_estadistico", 'String'>;
    readonly fecha_inicio: Prisma.FieldRef<"reporte_estadistico", 'DateTime'>;
    readonly fecha_fin: Prisma.FieldRef<"reporte_estadistico", 'DateTime'>;
    readonly generado_por: Prisma.FieldRef<"reporte_estadistico", 'Int'>;
    readonly fecha_generacion: Prisma.FieldRef<"reporte_estadistico", 'DateTime'>;
}
/**
 * reporte_estadistico findUnique
 */
export type reporte_estadisticoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_estadistico to fetch.
     */
    where: Prisma.reporte_estadisticoWhereUniqueInput;
};
/**
 * reporte_estadistico findUniqueOrThrow
 */
export type reporte_estadisticoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_estadistico to fetch.
     */
    where: Prisma.reporte_estadisticoWhereUniqueInput;
};
/**
 * reporte_estadistico findFirst
 */
export type reporte_estadisticoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_estadistico to fetch.
     */
    where?: Prisma.reporte_estadisticoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reporte_estadisticos to fetch.
     */
    orderBy?: Prisma.reporte_estadisticoOrderByWithRelationInput | Prisma.reporte_estadisticoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for reporte_estadisticos.
     */
    cursor?: Prisma.reporte_estadisticoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reporte_estadisticos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reporte_estadisticos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of reporte_estadisticos.
     */
    distinct?: Prisma.Reporte_estadisticoScalarFieldEnum | Prisma.Reporte_estadisticoScalarFieldEnum[];
};
/**
 * reporte_estadistico findFirstOrThrow
 */
export type reporte_estadisticoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_estadistico to fetch.
     */
    where?: Prisma.reporte_estadisticoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reporte_estadisticos to fetch.
     */
    orderBy?: Prisma.reporte_estadisticoOrderByWithRelationInput | Prisma.reporte_estadisticoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for reporte_estadisticos.
     */
    cursor?: Prisma.reporte_estadisticoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reporte_estadisticos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reporte_estadisticos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of reporte_estadisticos.
     */
    distinct?: Prisma.Reporte_estadisticoScalarFieldEnum | Prisma.Reporte_estadisticoScalarFieldEnum[];
};
/**
 * reporte_estadistico findMany
 */
export type reporte_estadisticoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_estadisticos to fetch.
     */
    where?: Prisma.reporte_estadisticoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reporte_estadisticos to fetch.
     */
    orderBy?: Prisma.reporte_estadisticoOrderByWithRelationInput | Prisma.reporte_estadisticoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing reporte_estadisticos.
     */
    cursor?: Prisma.reporte_estadisticoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reporte_estadisticos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reporte_estadisticos.
     */
    skip?: number;
    distinct?: Prisma.Reporte_estadisticoScalarFieldEnum | Prisma.Reporte_estadisticoScalarFieldEnum[];
};
/**
 * reporte_estadistico create
 */
export type reporte_estadisticoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a reporte_estadistico.
     */
    data?: Prisma.XOR<Prisma.reporte_estadisticoCreateInput, Prisma.reporte_estadisticoUncheckedCreateInput>;
};
/**
 * reporte_estadistico createMany
 */
export type reporte_estadisticoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many reporte_estadisticos.
     */
    data: Prisma.reporte_estadisticoCreateManyInput | Prisma.reporte_estadisticoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * reporte_estadistico createManyAndReturn
 */
export type reporte_estadisticoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reporte_estadistico
     */
    select?: Prisma.reporte_estadisticoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the reporte_estadistico
     */
    omit?: Prisma.reporte_estadisticoOmit<ExtArgs> | null;
    /**
     * The data used to create many reporte_estadisticos.
     */
    data: Prisma.reporte_estadisticoCreateManyInput | Prisma.reporte_estadisticoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.reporte_estadisticoIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * reporte_estadistico update
 */
export type reporte_estadisticoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a reporte_estadistico.
     */
    data: Prisma.XOR<Prisma.reporte_estadisticoUpdateInput, Prisma.reporte_estadisticoUncheckedUpdateInput>;
    /**
     * Choose, which reporte_estadistico to update.
     */
    where: Prisma.reporte_estadisticoWhereUniqueInput;
};
/**
 * reporte_estadistico updateMany
 */
export type reporte_estadisticoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update reporte_estadisticos.
     */
    data: Prisma.XOR<Prisma.reporte_estadisticoUpdateManyMutationInput, Prisma.reporte_estadisticoUncheckedUpdateManyInput>;
    /**
     * Filter which reporte_estadisticos to update
     */
    where?: Prisma.reporte_estadisticoWhereInput;
    /**
     * Limit how many reporte_estadisticos to update.
     */
    limit?: number;
};
/**
 * reporte_estadistico updateManyAndReturn
 */
export type reporte_estadisticoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reporte_estadistico
     */
    select?: Prisma.reporte_estadisticoSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the reporte_estadistico
     */
    omit?: Prisma.reporte_estadisticoOmit<ExtArgs> | null;
    /**
     * The data used to update reporte_estadisticos.
     */
    data: Prisma.XOR<Prisma.reporte_estadisticoUpdateManyMutationInput, Prisma.reporte_estadisticoUncheckedUpdateManyInput>;
    /**
     * Filter which reporte_estadisticos to update
     */
    where?: Prisma.reporte_estadisticoWhereInput;
    /**
     * Limit how many reporte_estadisticos to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.reporte_estadisticoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * reporte_estadistico upsert
 */
export type reporte_estadisticoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the reporte_estadistico to update in case it exists.
     */
    where: Prisma.reporte_estadisticoWhereUniqueInput;
    /**
     * In case the reporte_estadistico found by the `where` argument doesn't exist, create a new reporte_estadistico with this data.
     */
    create: Prisma.XOR<Prisma.reporte_estadisticoCreateInput, Prisma.reporte_estadisticoUncheckedCreateInput>;
    /**
     * In case the reporte_estadistico was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.reporte_estadisticoUpdateInput, Prisma.reporte_estadisticoUncheckedUpdateInput>;
};
/**
 * reporte_estadistico delete
 */
export type reporte_estadisticoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which reporte_estadistico to delete.
     */
    where: Prisma.reporte_estadisticoWhereUniqueInput;
};
/**
 * reporte_estadistico deleteMany
 */
export type reporte_estadisticoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which reporte_estadisticos to delete
     */
    where?: Prisma.reporte_estadisticoWhereInput;
    /**
     * Limit how many reporte_estadisticos to delete.
     */
    limit?: number;
};
/**
 * reporte_estadistico.reporte_detalle
 */
export type reporte_estadistico$reporte_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reporte_detalle
     */
    select?: Prisma.reporte_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the reporte_detalle
     */
    omit?: Prisma.reporte_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.reporte_detalleInclude<ExtArgs> | null;
    where?: Prisma.reporte_detalleWhereInput;
    orderBy?: Prisma.reporte_detalleOrderByWithRelationInput | Prisma.reporte_detalleOrderByWithRelationInput[];
    cursor?: Prisma.reporte_detalleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Reporte_detalleScalarFieldEnum | Prisma.Reporte_detalleScalarFieldEnum[];
};
/**
 * reporte_estadistico.usuarios
 */
export type reporte_estadistico$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * reporte_estadistico without action
 */
export type reporte_estadisticoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=reporte_estadistico.d.ts.map