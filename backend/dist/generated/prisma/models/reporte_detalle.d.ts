import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model reporte_detalle
 *
 */
export type reporte_detalleModel = runtime.Types.Result.DefaultSelection<Prisma.$reporte_detallePayload>;
export type AggregateReporte_detalle = {
    _count: Reporte_detalleCountAggregateOutputType | null;
    _avg: Reporte_detalleAvgAggregateOutputType | null;
    _sum: Reporte_detalleSumAggregateOutputType | null;
    _min: Reporte_detalleMinAggregateOutputType | null;
    _max: Reporte_detalleMaxAggregateOutputType | null;
};
export type Reporte_detalleAvgAggregateOutputType = {
    id_detalle: number | null;
    id_reporte: number | null;
    valor: runtime.Decimal | null;
};
export type Reporte_detalleSumAggregateOutputType = {
    id_detalle: number | null;
    id_reporte: number | null;
    valor: runtime.Decimal | null;
};
export type Reporte_detalleMinAggregateOutputType = {
    id_detalle: number | null;
    id_reporte: number | null;
    indicador: string | null;
    valor: runtime.Decimal | null;
    observacion: string | null;
};
export type Reporte_detalleMaxAggregateOutputType = {
    id_detalle: number | null;
    id_reporte: number | null;
    indicador: string | null;
    valor: runtime.Decimal | null;
    observacion: string | null;
};
export type Reporte_detalleCountAggregateOutputType = {
    id_detalle: number;
    id_reporte: number;
    indicador: number;
    valor: number;
    observacion: number;
    _all: number;
};
export type Reporte_detalleAvgAggregateInputType = {
    id_detalle?: true;
    id_reporte?: true;
    valor?: true;
};
export type Reporte_detalleSumAggregateInputType = {
    id_detalle?: true;
    id_reporte?: true;
    valor?: true;
};
export type Reporte_detalleMinAggregateInputType = {
    id_detalle?: true;
    id_reporte?: true;
    indicador?: true;
    valor?: true;
    observacion?: true;
};
export type Reporte_detalleMaxAggregateInputType = {
    id_detalle?: true;
    id_reporte?: true;
    indicador?: true;
    valor?: true;
    observacion?: true;
};
export type Reporte_detalleCountAggregateInputType = {
    id_detalle?: true;
    id_reporte?: true;
    indicador?: true;
    valor?: true;
    observacion?: true;
    _all?: true;
};
export type Reporte_detalleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which reporte_detalle to aggregate.
     */
    where?: Prisma.reporte_detalleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reporte_detalles to fetch.
     */
    orderBy?: Prisma.reporte_detalleOrderByWithRelationInput | Prisma.reporte_detalleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.reporte_detalleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reporte_detalles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reporte_detalles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned reporte_detalles
    **/
    _count?: true | Reporte_detalleCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Reporte_detalleAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Reporte_detalleSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Reporte_detalleMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Reporte_detalleMaxAggregateInputType;
};
export type GetReporte_detalleAggregateType<T extends Reporte_detalleAggregateArgs> = {
    [P in keyof T & keyof AggregateReporte_detalle]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReporte_detalle[P]> : Prisma.GetScalarType<T[P], AggregateReporte_detalle[P]>;
};
export type reporte_detalleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.reporte_detalleWhereInput;
    orderBy?: Prisma.reporte_detalleOrderByWithAggregationInput | Prisma.reporte_detalleOrderByWithAggregationInput[];
    by: Prisma.Reporte_detalleScalarFieldEnum[] | Prisma.Reporte_detalleScalarFieldEnum;
    having?: Prisma.reporte_detalleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Reporte_detalleCountAggregateInputType | true;
    _avg?: Reporte_detalleAvgAggregateInputType;
    _sum?: Reporte_detalleSumAggregateInputType;
    _min?: Reporte_detalleMinAggregateInputType;
    _max?: Reporte_detalleMaxAggregateInputType;
};
export type Reporte_detalleGroupByOutputType = {
    id_detalle: number;
    id_reporte: number;
    indicador: string | null;
    valor: runtime.Decimal | null;
    observacion: string | null;
    _count: Reporte_detalleCountAggregateOutputType | null;
    _avg: Reporte_detalleAvgAggregateOutputType | null;
    _sum: Reporte_detalleSumAggregateOutputType | null;
    _min: Reporte_detalleMinAggregateOutputType | null;
    _max: Reporte_detalleMaxAggregateOutputType | null;
};
type GetReporte_detalleGroupByPayload<T extends reporte_detalleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Reporte_detalleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Reporte_detalleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Reporte_detalleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Reporte_detalleGroupByOutputType[P]>;
}>>;
export type reporte_detalleWhereInput = {
    AND?: Prisma.reporte_detalleWhereInput | Prisma.reporte_detalleWhereInput[];
    OR?: Prisma.reporte_detalleWhereInput[];
    NOT?: Prisma.reporte_detalleWhereInput | Prisma.reporte_detalleWhereInput[];
    id_detalle?: Prisma.IntFilter<"reporte_detalle"> | number;
    id_reporte?: Prisma.IntFilter<"reporte_detalle"> | number;
    indicador?: Prisma.StringNullableFilter<"reporte_detalle"> | string | null;
    valor?: Prisma.DecimalNullableFilter<"reporte_detalle"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.StringNullableFilter<"reporte_detalle"> | string | null;
    reporte_estadistico?: Prisma.XOR<Prisma.Reporte_estadisticoScalarRelationFilter, Prisma.reporte_estadisticoWhereInput>;
};
export type reporte_detalleOrderByWithRelationInput = {
    id_detalle?: Prisma.SortOrder;
    id_reporte?: Prisma.SortOrder;
    indicador?: Prisma.SortOrderInput | Prisma.SortOrder;
    valor?: Prisma.SortOrderInput | Prisma.SortOrder;
    observacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    reporte_estadistico?: Prisma.reporte_estadisticoOrderByWithRelationInput;
};
export type reporte_detalleWhereUniqueInput = Prisma.AtLeast<{
    id_detalle?: number;
    AND?: Prisma.reporte_detalleWhereInput | Prisma.reporte_detalleWhereInput[];
    OR?: Prisma.reporte_detalleWhereInput[];
    NOT?: Prisma.reporte_detalleWhereInput | Prisma.reporte_detalleWhereInput[];
    id_reporte?: Prisma.IntFilter<"reporte_detalle"> | number;
    indicador?: Prisma.StringNullableFilter<"reporte_detalle"> | string | null;
    valor?: Prisma.DecimalNullableFilter<"reporte_detalle"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.StringNullableFilter<"reporte_detalle"> | string | null;
    reporte_estadistico?: Prisma.XOR<Prisma.Reporte_estadisticoScalarRelationFilter, Prisma.reporte_estadisticoWhereInput>;
}, "id_detalle">;
export type reporte_detalleOrderByWithAggregationInput = {
    id_detalle?: Prisma.SortOrder;
    id_reporte?: Prisma.SortOrder;
    indicador?: Prisma.SortOrderInput | Prisma.SortOrder;
    valor?: Prisma.SortOrderInput | Prisma.SortOrder;
    observacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.reporte_detalleCountOrderByAggregateInput;
    _avg?: Prisma.reporte_detalleAvgOrderByAggregateInput;
    _max?: Prisma.reporte_detalleMaxOrderByAggregateInput;
    _min?: Prisma.reporte_detalleMinOrderByAggregateInput;
    _sum?: Prisma.reporte_detalleSumOrderByAggregateInput;
};
export type reporte_detalleScalarWhereWithAggregatesInput = {
    AND?: Prisma.reporte_detalleScalarWhereWithAggregatesInput | Prisma.reporte_detalleScalarWhereWithAggregatesInput[];
    OR?: Prisma.reporte_detalleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.reporte_detalleScalarWhereWithAggregatesInput | Prisma.reporte_detalleScalarWhereWithAggregatesInput[];
    id_detalle?: Prisma.IntWithAggregatesFilter<"reporte_detalle"> | number;
    id_reporte?: Prisma.IntWithAggregatesFilter<"reporte_detalle"> | number;
    indicador?: Prisma.StringNullableWithAggregatesFilter<"reporte_detalle"> | string | null;
    valor?: Prisma.DecimalNullableWithAggregatesFilter<"reporte_detalle"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.StringNullableWithAggregatesFilter<"reporte_detalle"> | string | null;
};
export type reporte_detalleCreateInput = {
    indicador?: string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
    reporte_estadistico: Prisma.reporte_estadisticoCreateNestedOneWithoutReporte_detalleInput;
};
export type reporte_detalleUncheckedCreateInput = {
    id_detalle?: number;
    id_reporte: number;
    indicador?: string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type reporte_detalleUpdateInput = {
    indicador?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporte_estadistico?: Prisma.reporte_estadisticoUpdateOneRequiredWithoutReporte_detalleNestedInput;
};
export type reporte_detalleUncheckedUpdateInput = {
    id_detalle?: Prisma.IntFieldUpdateOperationsInput | number;
    id_reporte?: Prisma.IntFieldUpdateOperationsInput | number;
    indicador?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type reporte_detalleCreateManyInput = {
    id_detalle?: number;
    id_reporte: number;
    indicador?: string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type reporte_detalleUpdateManyMutationInput = {
    indicador?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type reporte_detalleUncheckedUpdateManyInput = {
    id_detalle?: Prisma.IntFieldUpdateOperationsInput | number;
    id_reporte?: Prisma.IntFieldUpdateOperationsInput | number;
    indicador?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type reporte_detalleCountOrderByAggregateInput = {
    id_detalle?: Prisma.SortOrder;
    id_reporte?: Prisma.SortOrder;
    indicador?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    observacion?: Prisma.SortOrder;
};
export type reporte_detalleAvgOrderByAggregateInput = {
    id_detalle?: Prisma.SortOrder;
    id_reporte?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
};
export type reporte_detalleMaxOrderByAggregateInput = {
    id_detalle?: Prisma.SortOrder;
    id_reporte?: Prisma.SortOrder;
    indicador?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    observacion?: Prisma.SortOrder;
};
export type reporte_detalleMinOrderByAggregateInput = {
    id_detalle?: Prisma.SortOrder;
    id_reporte?: Prisma.SortOrder;
    indicador?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    observacion?: Prisma.SortOrder;
};
export type reporte_detalleSumOrderByAggregateInput = {
    id_detalle?: Prisma.SortOrder;
    id_reporte?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
};
export type Reporte_detalleListRelationFilter = {
    every?: Prisma.reporte_detalleWhereInput;
    some?: Prisma.reporte_detalleWhereInput;
    none?: Prisma.reporte_detalleWhereInput;
};
export type reporte_detalleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type reporte_detalleCreateNestedManyWithoutReporte_estadisticoInput = {
    create?: Prisma.XOR<Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput, Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput> | Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput[] | Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput[];
    connectOrCreate?: Prisma.reporte_detalleCreateOrConnectWithoutReporte_estadisticoInput | Prisma.reporte_detalleCreateOrConnectWithoutReporte_estadisticoInput[];
    createMany?: Prisma.reporte_detalleCreateManyReporte_estadisticoInputEnvelope;
    connect?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
};
export type reporte_detalleUncheckedCreateNestedManyWithoutReporte_estadisticoInput = {
    create?: Prisma.XOR<Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput, Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput> | Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput[] | Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput[];
    connectOrCreate?: Prisma.reporte_detalleCreateOrConnectWithoutReporte_estadisticoInput | Prisma.reporte_detalleCreateOrConnectWithoutReporte_estadisticoInput[];
    createMany?: Prisma.reporte_detalleCreateManyReporte_estadisticoInputEnvelope;
    connect?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
};
export type reporte_detalleUpdateManyWithoutReporte_estadisticoNestedInput = {
    create?: Prisma.XOR<Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput, Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput> | Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput[] | Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput[];
    connectOrCreate?: Prisma.reporte_detalleCreateOrConnectWithoutReporte_estadisticoInput | Prisma.reporte_detalleCreateOrConnectWithoutReporte_estadisticoInput[];
    upsert?: Prisma.reporte_detalleUpsertWithWhereUniqueWithoutReporte_estadisticoInput | Prisma.reporte_detalleUpsertWithWhereUniqueWithoutReporte_estadisticoInput[];
    createMany?: Prisma.reporte_detalleCreateManyReporte_estadisticoInputEnvelope;
    set?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
    disconnect?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
    delete?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
    connect?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
    update?: Prisma.reporte_detalleUpdateWithWhereUniqueWithoutReporte_estadisticoInput | Prisma.reporte_detalleUpdateWithWhereUniqueWithoutReporte_estadisticoInput[];
    updateMany?: Prisma.reporte_detalleUpdateManyWithWhereWithoutReporte_estadisticoInput | Prisma.reporte_detalleUpdateManyWithWhereWithoutReporte_estadisticoInput[];
    deleteMany?: Prisma.reporte_detalleScalarWhereInput | Prisma.reporte_detalleScalarWhereInput[];
};
export type reporte_detalleUncheckedUpdateManyWithoutReporte_estadisticoNestedInput = {
    create?: Prisma.XOR<Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput, Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput> | Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput[] | Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput[];
    connectOrCreate?: Prisma.reporte_detalleCreateOrConnectWithoutReporte_estadisticoInput | Prisma.reporte_detalleCreateOrConnectWithoutReporte_estadisticoInput[];
    upsert?: Prisma.reporte_detalleUpsertWithWhereUniqueWithoutReporte_estadisticoInput | Prisma.reporte_detalleUpsertWithWhereUniqueWithoutReporte_estadisticoInput[];
    createMany?: Prisma.reporte_detalleCreateManyReporte_estadisticoInputEnvelope;
    set?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
    disconnect?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
    delete?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
    connect?: Prisma.reporte_detalleWhereUniqueInput | Prisma.reporte_detalleWhereUniqueInput[];
    update?: Prisma.reporte_detalleUpdateWithWhereUniqueWithoutReporte_estadisticoInput | Prisma.reporte_detalleUpdateWithWhereUniqueWithoutReporte_estadisticoInput[];
    updateMany?: Prisma.reporte_detalleUpdateManyWithWhereWithoutReporte_estadisticoInput | Prisma.reporte_detalleUpdateManyWithWhereWithoutReporte_estadisticoInput[];
    deleteMany?: Prisma.reporte_detalleScalarWhereInput | Prisma.reporte_detalleScalarWhereInput[];
};
export type reporte_detalleCreateWithoutReporte_estadisticoInput = {
    indicador?: string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput = {
    id_detalle?: number;
    indicador?: string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type reporte_detalleCreateOrConnectWithoutReporte_estadisticoInput = {
    where: Prisma.reporte_detalleWhereUniqueInput;
    create: Prisma.XOR<Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput, Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput>;
};
export type reporte_detalleCreateManyReporte_estadisticoInputEnvelope = {
    data: Prisma.reporte_detalleCreateManyReporte_estadisticoInput | Prisma.reporte_detalleCreateManyReporte_estadisticoInput[];
    skipDuplicates?: boolean;
};
export type reporte_detalleUpsertWithWhereUniqueWithoutReporte_estadisticoInput = {
    where: Prisma.reporte_detalleWhereUniqueInput;
    update: Prisma.XOR<Prisma.reporte_detalleUpdateWithoutReporte_estadisticoInput, Prisma.reporte_detalleUncheckedUpdateWithoutReporte_estadisticoInput>;
    create: Prisma.XOR<Prisma.reporte_detalleCreateWithoutReporte_estadisticoInput, Prisma.reporte_detalleUncheckedCreateWithoutReporte_estadisticoInput>;
};
export type reporte_detalleUpdateWithWhereUniqueWithoutReporte_estadisticoInput = {
    where: Prisma.reporte_detalleWhereUniqueInput;
    data: Prisma.XOR<Prisma.reporte_detalleUpdateWithoutReporte_estadisticoInput, Prisma.reporte_detalleUncheckedUpdateWithoutReporte_estadisticoInput>;
};
export type reporte_detalleUpdateManyWithWhereWithoutReporte_estadisticoInput = {
    where: Prisma.reporte_detalleScalarWhereInput;
    data: Prisma.XOR<Prisma.reporte_detalleUpdateManyMutationInput, Prisma.reporte_detalleUncheckedUpdateManyWithoutReporte_estadisticoInput>;
};
export type reporte_detalleScalarWhereInput = {
    AND?: Prisma.reporte_detalleScalarWhereInput | Prisma.reporte_detalleScalarWhereInput[];
    OR?: Prisma.reporte_detalleScalarWhereInput[];
    NOT?: Prisma.reporte_detalleScalarWhereInput | Prisma.reporte_detalleScalarWhereInput[];
    id_detalle?: Prisma.IntFilter<"reporte_detalle"> | number;
    id_reporte?: Prisma.IntFilter<"reporte_detalle"> | number;
    indicador?: Prisma.StringNullableFilter<"reporte_detalle"> | string | null;
    valor?: Prisma.DecimalNullableFilter<"reporte_detalle"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.StringNullableFilter<"reporte_detalle"> | string | null;
};
export type reporte_detalleCreateManyReporte_estadisticoInput = {
    id_detalle?: number;
    indicador?: string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type reporte_detalleUpdateWithoutReporte_estadisticoInput = {
    indicador?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type reporte_detalleUncheckedUpdateWithoutReporte_estadisticoInput = {
    id_detalle?: Prisma.IntFieldUpdateOperationsInput | number;
    indicador?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type reporte_detalleUncheckedUpdateManyWithoutReporte_estadisticoInput = {
    id_detalle?: Prisma.IntFieldUpdateOperationsInput | number;
    indicador?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type reporte_detalleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_detalle?: boolean;
    id_reporte?: boolean;
    indicador?: boolean;
    valor?: boolean;
    observacion?: boolean;
    reporte_estadistico?: boolean | Prisma.reporte_estadisticoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reporte_detalle"]>;
export type reporte_detalleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_detalle?: boolean;
    id_reporte?: boolean;
    indicador?: boolean;
    valor?: boolean;
    observacion?: boolean;
    reporte_estadistico?: boolean | Prisma.reporte_estadisticoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reporte_detalle"]>;
export type reporte_detalleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_detalle?: boolean;
    id_reporte?: boolean;
    indicador?: boolean;
    valor?: boolean;
    observacion?: boolean;
    reporte_estadistico?: boolean | Prisma.reporte_estadisticoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reporte_detalle"]>;
export type reporte_detalleSelectScalar = {
    id_detalle?: boolean;
    id_reporte?: boolean;
    indicador?: boolean;
    valor?: boolean;
    observacion?: boolean;
};
export type reporte_detalleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_detalle" | "id_reporte" | "indicador" | "valor" | "observacion", ExtArgs["result"]["reporte_detalle"]>;
export type reporte_detalleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporte_estadistico?: boolean | Prisma.reporte_estadisticoDefaultArgs<ExtArgs>;
};
export type reporte_detalleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporte_estadistico?: boolean | Prisma.reporte_estadisticoDefaultArgs<ExtArgs>;
};
export type reporte_detalleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporte_estadistico?: boolean | Prisma.reporte_estadisticoDefaultArgs<ExtArgs>;
};
export type $reporte_detallePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "reporte_detalle";
    objects: {
        reporte_estadistico: Prisma.$reporte_estadisticoPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_detalle: number;
        id_reporte: number;
        indicador: string | null;
        valor: runtime.Decimal | null;
        observacion: string | null;
    }, ExtArgs["result"]["reporte_detalle"]>;
    composites: {};
};
export type reporte_detalleGetPayload<S extends boolean | null | undefined | reporte_detalleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload, S>;
export type reporte_detalleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<reporte_detalleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Reporte_detalleCountAggregateInputType | true;
};
export interface reporte_detalleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['reporte_detalle'];
        meta: {
            name: 'reporte_detalle';
        };
    };
    /**
     * Find zero or one Reporte_detalle that matches the filter.
     * @param {reporte_detalleFindUniqueArgs} args - Arguments to find a Reporte_detalle
     * @example
     * // Get one Reporte_detalle
     * const reporte_detalle = await prisma.reporte_detalle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reporte_detalleFindUniqueArgs>(args: Prisma.SelectSubset<T, reporte_detalleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__reporte_detalleClient<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Reporte_detalle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reporte_detalleFindUniqueOrThrowArgs} args - Arguments to find a Reporte_detalle
     * @example
     * // Get one Reporte_detalle
     * const reporte_detalle = await prisma.reporte_detalle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reporte_detalleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, reporte_detalleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__reporte_detalleClient<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Reporte_detalle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_detalleFindFirstArgs} args - Arguments to find a Reporte_detalle
     * @example
     * // Get one Reporte_detalle
     * const reporte_detalle = await prisma.reporte_detalle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reporte_detalleFindFirstArgs>(args?: Prisma.SelectSubset<T, reporte_detalleFindFirstArgs<ExtArgs>>): Prisma.Prisma__reporte_detalleClient<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Reporte_detalle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_detalleFindFirstOrThrowArgs} args - Arguments to find a Reporte_detalle
     * @example
     * // Get one Reporte_detalle
     * const reporte_detalle = await prisma.reporte_detalle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reporte_detalleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, reporte_detalleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__reporte_detalleClient<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Reporte_detalles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_detalleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reporte_detalles
     * const reporte_detalles = await prisma.reporte_detalle.findMany()
     *
     * // Get first 10 Reporte_detalles
     * const reporte_detalles = await prisma.reporte_detalle.findMany({ take: 10 })
     *
     * // Only select the `id_detalle`
     * const reporte_detalleWithId_detalleOnly = await prisma.reporte_detalle.findMany({ select: { id_detalle: true } })
     *
     */
    findMany<T extends reporte_detalleFindManyArgs>(args?: Prisma.SelectSubset<T, reporte_detalleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Reporte_detalle.
     * @param {reporte_detalleCreateArgs} args - Arguments to create a Reporte_detalle.
     * @example
     * // Create one Reporte_detalle
     * const Reporte_detalle = await prisma.reporte_detalle.create({
     *   data: {
     *     // ... data to create a Reporte_detalle
     *   }
     * })
     *
     */
    create<T extends reporte_detalleCreateArgs>(args: Prisma.SelectSubset<T, reporte_detalleCreateArgs<ExtArgs>>): Prisma.Prisma__reporte_detalleClient<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Reporte_detalles.
     * @param {reporte_detalleCreateManyArgs} args - Arguments to create many Reporte_detalles.
     * @example
     * // Create many Reporte_detalles
     * const reporte_detalle = await prisma.reporte_detalle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends reporte_detalleCreateManyArgs>(args?: Prisma.SelectSubset<T, reporte_detalleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Reporte_detalles and returns the data saved in the database.
     * @param {reporte_detalleCreateManyAndReturnArgs} args - Arguments to create many Reporte_detalles.
     * @example
     * // Create many Reporte_detalles
     * const reporte_detalle = await prisma.reporte_detalle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Reporte_detalles and only return the `id_detalle`
     * const reporte_detalleWithId_detalleOnly = await prisma.reporte_detalle.createManyAndReturn({
     *   select: { id_detalle: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends reporte_detalleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, reporte_detalleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Reporte_detalle.
     * @param {reporte_detalleDeleteArgs} args - Arguments to delete one Reporte_detalle.
     * @example
     * // Delete one Reporte_detalle
     * const Reporte_detalle = await prisma.reporte_detalle.delete({
     *   where: {
     *     // ... filter to delete one Reporte_detalle
     *   }
     * })
     *
     */
    delete<T extends reporte_detalleDeleteArgs>(args: Prisma.SelectSubset<T, reporte_detalleDeleteArgs<ExtArgs>>): Prisma.Prisma__reporte_detalleClient<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Reporte_detalle.
     * @param {reporte_detalleUpdateArgs} args - Arguments to update one Reporte_detalle.
     * @example
     * // Update one Reporte_detalle
     * const reporte_detalle = await prisma.reporte_detalle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends reporte_detalleUpdateArgs>(args: Prisma.SelectSubset<T, reporte_detalleUpdateArgs<ExtArgs>>): Prisma.Prisma__reporte_detalleClient<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Reporte_detalles.
     * @param {reporte_detalleDeleteManyArgs} args - Arguments to filter Reporte_detalles to delete.
     * @example
     * // Delete a few Reporte_detalles
     * const { count } = await prisma.reporte_detalle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends reporte_detalleDeleteManyArgs>(args?: Prisma.SelectSubset<T, reporte_detalleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Reporte_detalles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_detalleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reporte_detalles
     * const reporte_detalle = await prisma.reporte_detalle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends reporte_detalleUpdateManyArgs>(args: Prisma.SelectSubset<T, reporte_detalleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Reporte_detalles and returns the data updated in the database.
     * @param {reporte_detalleUpdateManyAndReturnArgs} args - Arguments to update many Reporte_detalles.
     * @example
     * // Update many Reporte_detalles
     * const reporte_detalle = await prisma.reporte_detalle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Reporte_detalles and only return the `id_detalle`
     * const reporte_detalleWithId_detalleOnly = await prisma.reporte_detalle.updateManyAndReturn({
     *   select: { id_detalle: true },
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
    updateManyAndReturn<T extends reporte_detalleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, reporte_detalleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Reporte_detalle.
     * @param {reporte_detalleUpsertArgs} args - Arguments to update or create a Reporte_detalle.
     * @example
     * // Update or create a Reporte_detalle
     * const reporte_detalle = await prisma.reporte_detalle.upsert({
     *   create: {
     *     // ... data to create a Reporte_detalle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reporte_detalle we want to update
     *   }
     * })
     */
    upsert<T extends reporte_detalleUpsertArgs>(args: Prisma.SelectSubset<T, reporte_detalleUpsertArgs<ExtArgs>>): Prisma.Prisma__reporte_detalleClient<runtime.Types.Result.GetResult<Prisma.$reporte_detallePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Reporte_detalles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_detalleCountArgs} args - Arguments to filter Reporte_detalles to count.
     * @example
     * // Count the number of Reporte_detalles
     * const count = await prisma.reporte_detalle.count({
     *   where: {
     *     // ... the filter for the Reporte_detalles we want to count
     *   }
     * })
    **/
    count<T extends reporte_detalleCountArgs>(args?: Prisma.Subset<T, reporte_detalleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Reporte_detalleCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Reporte_detalle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Reporte_detalleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Reporte_detalleAggregateArgs>(args: Prisma.Subset<T, Reporte_detalleAggregateArgs>): Prisma.PrismaPromise<GetReporte_detalleAggregateType<T>>;
    /**
     * Group by Reporte_detalle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reporte_detalleGroupByArgs} args - Group by arguments.
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
    groupBy<T extends reporte_detalleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: reporte_detalleGroupByArgs['orderBy'];
    } : {
        orderBy?: reporte_detalleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, reporte_detalleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReporte_detalleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the reporte_detalle model
     */
    readonly fields: reporte_detalleFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for reporte_detalle.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__reporte_detalleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    reporte_estadistico<T extends Prisma.reporte_estadisticoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.reporte_estadisticoDefaultArgs<ExtArgs>>): Prisma.Prisma__reporte_estadisticoClient<runtime.Types.Result.GetResult<Prisma.$reporte_estadisticoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the reporte_detalle model
 */
export interface reporte_detalleFieldRefs {
    readonly id_detalle: Prisma.FieldRef<"reporte_detalle", 'Int'>;
    readonly id_reporte: Prisma.FieldRef<"reporte_detalle", 'Int'>;
    readonly indicador: Prisma.FieldRef<"reporte_detalle", 'String'>;
    readonly valor: Prisma.FieldRef<"reporte_detalle", 'Decimal'>;
    readonly observacion: Prisma.FieldRef<"reporte_detalle", 'String'>;
}
/**
 * reporte_detalle findUnique
 */
export type reporte_detalleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_detalle to fetch.
     */
    where: Prisma.reporte_detalleWhereUniqueInput;
};
/**
 * reporte_detalle findUniqueOrThrow
 */
export type reporte_detalleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_detalle to fetch.
     */
    where: Prisma.reporte_detalleWhereUniqueInput;
};
/**
 * reporte_detalle findFirst
 */
export type reporte_detalleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_detalle to fetch.
     */
    where?: Prisma.reporte_detalleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reporte_detalles to fetch.
     */
    orderBy?: Prisma.reporte_detalleOrderByWithRelationInput | Prisma.reporte_detalleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for reporte_detalles.
     */
    cursor?: Prisma.reporte_detalleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reporte_detalles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reporte_detalles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of reporte_detalles.
     */
    distinct?: Prisma.Reporte_detalleScalarFieldEnum | Prisma.Reporte_detalleScalarFieldEnum[];
};
/**
 * reporte_detalle findFirstOrThrow
 */
export type reporte_detalleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_detalle to fetch.
     */
    where?: Prisma.reporte_detalleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reporte_detalles to fetch.
     */
    orderBy?: Prisma.reporte_detalleOrderByWithRelationInput | Prisma.reporte_detalleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for reporte_detalles.
     */
    cursor?: Prisma.reporte_detalleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reporte_detalles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reporte_detalles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of reporte_detalles.
     */
    distinct?: Prisma.Reporte_detalleScalarFieldEnum | Prisma.Reporte_detalleScalarFieldEnum[];
};
/**
 * reporte_detalle findMany
 */
export type reporte_detalleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which reporte_detalles to fetch.
     */
    where?: Prisma.reporte_detalleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reporte_detalles to fetch.
     */
    orderBy?: Prisma.reporte_detalleOrderByWithRelationInput | Prisma.reporte_detalleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing reporte_detalles.
     */
    cursor?: Prisma.reporte_detalleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reporte_detalles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reporte_detalles.
     */
    skip?: number;
    distinct?: Prisma.Reporte_detalleScalarFieldEnum | Prisma.Reporte_detalleScalarFieldEnum[];
};
/**
 * reporte_detalle create
 */
export type reporte_detalleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a reporte_detalle.
     */
    data: Prisma.XOR<Prisma.reporte_detalleCreateInput, Prisma.reporte_detalleUncheckedCreateInput>;
};
/**
 * reporte_detalle createMany
 */
export type reporte_detalleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many reporte_detalles.
     */
    data: Prisma.reporte_detalleCreateManyInput | Prisma.reporte_detalleCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * reporte_detalle createManyAndReturn
 */
export type reporte_detalleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reporte_detalle
     */
    select?: Prisma.reporte_detalleSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the reporte_detalle
     */
    omit?: Prisma.reporte_detalleOmit<ExtArgs> | null;
    /**
     * The data used to create many reporte_detalles.
     */
    data: Prisma.reporte_detalleCreateManyInput | Prisma.reporte_detalleCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.reporte_detalleIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * reporte_detalle update
 */
export type reporte_detalleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a reporte_detalle.
     */
    data: Prisma.XOR<Prisma.reporte_detalleUpdateInput, Prisma.reporte_detalleUncheckedUpdateInput>;
    /**
     * Choose, which reporte_detalle to update.
     */
    where: Prisma.reporte_detalleWhereUniqueInput;
};
/**
 * reporte_detalle updateMany
 */
export type reporte_detalleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update reporte_detalles.
     */
    data: Prisma.XOR<Prisma.reporte_detalleUpdateManyMutationInput, Prisma.reporte_detalleUncheckedUpdateManyInput>;
    /**
     * Filter which reporte_detalles to update
     */
    where?: Prisma.reporte_detalleWhereInput;
    /**
     * Limit how many reporte_detalles to update.
     */
    limit?: number;
};
/**
 * reporte_detalle updateManyAndReturn
 */
export type reporte_detalleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reporte_detalle
     */
    select?: Prisma.reporte_detalleSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the reporte_detalle
     */
    omit?: Prisma.reporte_detalleOmit<ExtArgs> | null;
    /**
     * The data used to update reporte_detalles.
     */
    data: Prisma.XOR<Prisma.reporte_detalleUpdateManyMutationInput, Prisma.reporte_detalleUncheckedUpdateManyInput>;
    /**
     * Filter which reporte_detalles to update
     */
    where?: Prisma.reporte_detalleWhereInput;
    /**
     * Limit how many reporte_detalles to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.reporte_detalleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * reporte_detalle upsert
 */
export type reporte_detalleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the reporte_detalle to update in case it exists.
     */
    where: Prisma.reporte_detalleWhereUniqueInput;
    /**
     * In case the reporte_detalle found by the `where` argument doesn't exist, create a new reporte_detalle with this data.
     */
    create: Prisma.XOR<Prisma.reporte_detalleCreateInput, Prisma.reporte_detalleUncheckedCreateInput>;
    /**
     * In case the reporte_detalle was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.reporte_detalleUpdateInput, Prisma.reporte_detalleUncheckedUpdateInput>;
};
/**
 * reporte_detalle delete
 */
export type reporte_detalleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which reporte_detalle to delete.
     */
    where: Prisma.reporte_detalleWhereUniqueInput;
};
/**
 * reporte_detalle deleteMany
 */
export type reporte_detalleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which reporte_detalles to delete
     */
    where?: Prisma.reporte_detalleWhereInput;
    /**
     * Limit how many reporte_detalles to delete.
     */
    limit?: number;
};
/**
 * reporte_detalle without action
 */
export type reporte_detalleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=reporte_detalle.d.ts.map