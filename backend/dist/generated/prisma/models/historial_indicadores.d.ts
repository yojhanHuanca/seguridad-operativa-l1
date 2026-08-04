import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model historial_indicadores
 *
 */
export type historial_indicadoresModel = runtime.Types.Result.DefaultSelection<Prisma.$historial_indicadoresPayload>;
export type AggregateHistorial_indicadores = {
    _count: Historial_indicadoresCountAggregateOutputType | null;
    _avg: Historial_indicadoresAvgAggregateOutputType | null;
    _sum: Historial_indicadoresSumAggregateOutputType | null;
    _min: Historial_indicadoresMinAggregateOutputType | null;
    _max: Historial_indicadoresMaxAggregateOutputType | null;
};
export type Historial_indicadoresAvgAggregateOutputType = {
    id_historial: number | null;
    id_indicador: number | null;
    valor: runtime.Decimal | null;
};
export type Historial_indicadoresSumAggregateOutputType = {
    id_historial: number | null;
    id_indicador: number | null;
    valor: runtime.Decimal | null;
};
export type Historial_indicadoresMinAggregateOutputType = {
    id_historial: number | null;
    id_indicador: number | null;
    fecha: Date | null;
    valor: runtime.Decimal | null;
    observacion: string | null;
};
export type Historial_indicadoresMaxAggregateOutputType = {
    id_historial: number | null;
    id_indicador: number | null;
    fecha: Date | null;
    valor: runtime.Decimal | null;
    observacion: string | null;
};
export type Historial_indicadoresCountAggregateOutputType = {
    id_historial: number;
    id_indicador: number;
    fecha: number;
    valor: number;
    observacion: number;
    _all: number;
};
export type Historial_indicadoresAvgAggregateInputType = {
    id_historial?: true;
    id_indicador?: true;
    valor?: true;
};
export type Historial_indicadoresSumAggregateInputType = {
    id_historial?: true;
    id_indicador?: true;
    valor?: true;
};
export type Historial_indicadoresMinAggregateInputType = {
    id_historial?: true;
    id_indicador?: true;
    fecha?: true;
    valor?: true;
    observacion?: true;
};
export type Historial_indicadoresMaxAggregateInputType = {
    id_historial?: true;
    id_indicador?: true;
    fecha?: true;
    valor?: true;
    observacion?: true;
};
export type Historial_indicadoresCountAggregateInputType = {
    id_historial?: true;
    id_indicador?: true;
    fecha?: true;
    valor?: true;
    observacion?: true;
    _all?: true;
};
export type Historial_indicadoresAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which historial_indicadores to aggregate.
     */
    where?: Prisma.historial_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of historial_indicadores to fetch.
     */
    orderBy?: Prisma.historial_indicadoresOrderByWithRelationInput | Prisma.historial_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.historial_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` historial_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` historial_indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned historial_indicadores
    **/
    _count?: true | Historial_indicadoresCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Historial_indicadoresAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Historial_indicadoresSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Historial_indicadoresMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Historial_indicadoresMaxAggregateInputType;
};
export type GetHistorial_indicadoresAggregateType<T extends Historial_indicadoresAggregateArgs> = {
    [P in keyof T & keyof AggregateHistorial_indicadores]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHistorial_indicadores[P]> : Prisma.GetScalarType<T[P], AggregateHistorial_indicadores[P]>;
};
export type historial_indicadoresGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.historial_indicadoresWhereInput;
    orderBy?: Prisma.historial_indicadoresOrderByWithAggregationInput | Prisma.historial_indicadoresOrderByWithAggregationInput[];
    by: Prisma.Historial_indicadoresScalarFieldEnum[] | Prisma.Historial_indicadoresScalarFieldEnum;
    having?: Prisma.historial_indicadoresScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Historial_indicadoresCountAggregateInputType | true;
    _avg?: Historial_indicadoresAvgAggregateInputType;
    _sum?: Historial_indicadoresSumAggregateInputType;
    _min?: Historial_indicadoresMinAggregateInputType;
    _max?: Historial_indicadoresMaxAggregateInputType;
};
export type Historial_indicadoresGroupByOutputType = {
    id_historial: number;
    id_indicador: number | null;
    fecha: Date | null;
    valor: runtime.Decimal | null;
    observacion: string | null;
    _count: Historial_indicadoresCountAggregateOutputType | null;
    _avg: Historial_indicadoresAvgAggregateOutputType | null;
    _sum: Historial_indicadoresSumAggregateOutputType | null;
    _min: Historial_indicadoresMinAggregateOutputType | null;
    _max: Historial_indicadoresMaxAggregateOutputType | null;
};
type GetHistorial_indicadoresGroupByPayload<T extends historial_indicadoresGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Historial_indicadoresGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Historial_indicadoresGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Historial_indicadoresGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Historial_indicadoresGroupByOutputType[P]>;
}>>;
export type historial_indicadoresWhereInput = {
    AND?: Prisma.historial_indicadoresWhereInput | Prisma.historial_indicadoresWhereInput[];
    OR?: Prisma.historial_indicadoresWhereInput[];
    NOT?: Prisma.historial_indicadoresWhereInput | Prisma.historial_indicadoresWhereInput[];
    id_historial?: Prisma.IntFilter<"historial_indicadores"> | number;
    id_indicador?: Prisma.IntNullableFilter<"historial_indicadores"> | number | null;
    fecha?: Prisma.DateTimeNullableFilter<"historial_indicadores"> | Date | string | null;
    valor?: Prisma.DecimalNullableFilter<"historial_indicadores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.StringNullableFilter<"historial_indicadores"> | string | null;
    indicadores?: Prisma.XOR<Prisma.IndicadoresNullableScalarRelationFilter, Prisma.indicadoresWhereInput> | null;
};
export type historial_indicadoresOrderByWithRelationInput = {
    id_historial?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    valor?: Prisma.SortOrderInput | Prisma.SortOrder;
    observacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    indicadores?: Prisma.indicadoresOrderByWithRelationInput;
};
export type historial_indicadoresWhereUniqueInput = Prisma.AtLeast<{
    id_historial?: number;
    AND?: Prisma.historial_indicadoresWhereInput | Prisma.historial_indicadoresWhereInput[];
    OR?: Prisma.historial_indicadoresWhereInput[];
    NOT?: Prisma.historial_indicadoresWhereInput | Prisma.historial_indicadoresWhereInput[];
    id_indicador?: Prisma.IntNullableFilter<"historial_indicadores"> | number | null;
    fecha?: Prisma.DateTimeNullableFilter<"historial_indicadores"> | Date | string | null;
    valor?: Prisma.DecimalNullableFilter<"historial_indicadores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.StringNullableFilter<"historial_indicadores"> | string | null;
    indicadores?: Prisma.XOR<Prisma.IndicadoresNullableScalarRelationFilter, Prisma.indicadoresWhereInput> | null;
}, "id_historial">;
export type historial_indicadoresOrderByWithAggregationInput = {
    id_historial?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    valor?: Prisma.SortOrderInput | Prisma.SortOrder;
    observacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.historial_indicadoresCountOrderByAggregateInput;
    _avg?: Prisma.historial_indicadoresAvgOrderByAggregateInput;
    _max?: Prisma.historial_indicadoresMaxOrderByAggregateInput;
    _min?: Prisma.historial_indicadoresMinOrderByAggregateInput;
    _sum?: Prisma.historial_indicadoresSumOrderByAggregateInput;
};
export type historial_indicadoresScalarWhereWithAggregatesInput = {
    AND?: Prisma.historial_indicadoresScalarWhereWithAggregatesInput | Prisma.historial_indicadoresScalarWhereWithAggregatesInput[];
    OR?: Prisma.historial_indicadoresScalarWhereWithAggregatesInput[];
    NOT?: Prisma.historial_indicadoresScalarWhereWithAggregatesInput | Prisma.historial_indicadoresScalarWhereWithAggregatesInput[];
    id_historial?: Prisma.IntWithAggregatesFilter<"historial_indicadores"> | number;
    id_indicador?: Prisma.IntNullableWithAggregatesFilter<"historial_indicadores"> | number | null;
    fecha?: Prisma.DateTimeNullableWithAggregatesFilter<"historial_indicadores"> | Date | string | null;
    valor?: Prisma.DecimalNullableWithAggregatesFilter<"historial_indicadores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.StringNullableWithAggregatesFilter<"historial_indicadores"> | string | null;
};
export type historial_indicadoresCreateInput = {
    fecha?: Date | string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
    indicadores?: Prisma.indicadoresCreateNestedOneWithoutHistorial_indicadoresInput;
};
export type historial_indicadoresUncheckedCreateInput = {
    id_historial?: number;
    id_indicador?: number | null;
    fecha?: Date | string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type historial_indicadoresUpdateInput = {
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    indicadores?: Prisma.indicadoresUpdateOneWithoutHistorial_indicadoresNestedInput;
};
export type historial_indicadoresUncheckedUpdateInput = {
    id_historial?: Prisma.IntFieldUpdateOperationsInput | number;
    id_indicador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type historial_indicadoresCreateManyInput = {
    id_historial?: number;
    id_indicador?: number | null;
    fecha?: Date | string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type historial_indicadoresUpdateManyMutationInput = {
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type historial_indicadoresUncheckedUpdateManyInput = {
    id_historial?: Prisma.IntFieldUpdateOperationsInput | number;
    id_indicador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type historial_indicadoresCountOrderByAggregateInput = {
    id_historial?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    observacion?: Prisma.SortOrder;
};
export type historial_indicadoresAvgOrderByAggregateInput = {
    id_historial?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
};
export type historial_indicadoresMaxOrderByAggregateInput = {
    id_historial?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    observacion?: Prisma.SortOrder;
};
export type historial_indicadoresMinOrderByAggregateInput = {
    id_historial?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    observacion?: Prisma.SortOrder;
};
export type historial_indicadoresSumOrderByAggregateInput = {
    id_historial?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
};
export type Historial_indicadoresListRelationFilter = {
    every?: Prisma.historial_indicadoresWhereInput;
    some?: Prisma.historial_indicadoresWhereInput;
    none?: Prisma.historial_indicadoresWhereInput;
};
export type historial_indicadoresOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type historial_indicadoresCreateNestedManyWithoutIndicadoresInput = {
    create?: Prisma.XOR<Prisma.historial_indicadoresCreateWithoutIndicadoresInput, Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.historial_indicadoresCreateWithoutIndicadoresInput[] | Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.historial_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.historial_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    createMany?: Prisma.historial_indicadoresCreateManyIndicadoresInputEnvelope;
    connect?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
};
export type historial_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput = {
    create?: Prisma.XOR<Prisma.historial_indicadoresCreateWithoutIndicadoresInput, Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.historial_indicadoresCreateWithoutIndicadoresInput[] | Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.historial_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.historial_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    createMany?: Prisma.historial_indicadoresCreateManyIndicadoresInputEnvelope;
    connect?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
};
export type historial_indicadoresUpdateManyWithoutIndicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.historial_indicadoresCreateWithoutIndicadoresInput, Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.historial_indicadoresCreateWithoutIndicadoresInput[] | Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.historial_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.historial_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    upsert?: Prisma.historial_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput | Prisma.historial_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput[];
    createMany?: Prisma.historial_indicadoresCreateManyIndicadoresInputEnvelope;
    set?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
    disconnect?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
    delete?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
    connect?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
    update?: Prisma.historial_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput | Prisma.historial_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput[];
    updateMany?: Prisma.historial_indicadoresUpdateManyWithWhereWithoutIndicadoresInput | Prisma.historial_indicadoresUpdateManyWithWhereWithoutIndicadoresInput[];
    deleteMany?: Prisma.historial_indicadoresScalarWhereInput | Prisma.historial_indicadoresScalarWhereInput[];
};
export type historial_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.historial_indicadoresCreateWithoutIndicadoresInput, Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.historial_indicadoresCreateWithoutIndicadoresInput[] | Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.historial_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.historial_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    upsert?: Prisma.historial_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput | Prisma.historial_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput[];
    createMany?: Prisma.historial_indicadoresCreateManyIndicadoresInputEnvelope;
    set?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
    disconnect?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
    delete?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
    connect?: Prisma.historial_indicadoresWhereUniqueInput | Prisma.historial_indicadoresWhereUniqueInput[];
    update?: Prisma.historial_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput | Prisma.historial_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput[];
    updateMany?: Prisma.historial_indicadoresUpdateManyWithWhereWithoutIndicadoresInput | Prisma.historial_indicadoresUpdateManyWithWhereWithoutIndicadoresInput[];
    deleteMany?: Prisma.historial_indicadoresScalarWhereInput | Prisma.historial_indicadoresScalarWhereInput[];
};
export type historial_indicadoresCreateWithoutIndicadoresInput = {
    fecha?: Date | string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type historial_indicadoresUncheckedCreateWithoutIndicadoresInput = {
    id_historial?: number;
    fecha?: Date | string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type historial_indicadoresCreateOrConnectWithoutIndicadoresInput = {
    where: Prisma.historial_indicadoresWhereUniqueInput;
    create: Prisma.XOR<Prisma.historial_indicadoresCreateWithoutIndicadoresInput, Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput>;
};
export type historial_indicadoresCreateManyIndicadoresInputEnvelope = {
    data: Prisma.historial_indicadoresCreateManyIndicadoresInput | Prisma.historial_indicadoresCreateManyIndicadoresInput[];
    skipDuplicates?: boolean;
};
export type historial_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput = {
    where: Prisma.historial_indicadoresWhereUniqueInput;
    update: Prisma.XOR<Prisma.historial_indicadoresUpdateWithoutIndicadoresInput, Prisma.historial_indicadoresUncheckedUpdateWithoutIndicadoresInput>;
    create: Prisma.XOR<Prisma.historial_indicadoresCreateWithoutIndicadoresInput, Prisma.historial_indicadoresUncheckedCreateWithoutIndicadoresInput>;
};
export type historial_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput = {
    where: Prisma.historial_indicadoresWhereUniqueInput;
    data: Prisma.XOR<Prisma.historial_indicadoresUpdateWithoutIndicadoresInput, Prisma.historial_indicadoresUncheckedUpdateWithoutIndicadoresInput>;
};
export type historial_indicadoresUpdateManyWithWhereWithoutIndicadoresInput = {
    where: Prisma.historial_indicadoresScalarWhereInput;
    data: Prisma.XOR<Prisma.historial_indicadoresUpdateManyMutationInput, Prisma.historial_indicadoresUncheckedUpdateManyWithoutIndicadoresInput>;
};
export type historial_indicadoresScalarWhereInput = {
    AND?: Prisma.historial_indicadoresScalarWhereInput | Prisma.historial_indicadoresScalarWhereInput[];
    OR?: Prisma.historial_indicadoresScalarWhereInput[];
    NOT?: Prisma.historial_indicadoresScalarWhereInput | Prisma.historial_indicadoresScalarWhereInput[];
    id_historial?: Prisma.IntFilter<"historial_indicadores"> | number;
    id_indicador?: Prisma.IntNullableFilter<"historial_indicadores"> | number | null;
    fecha?: Prisma.DateTimeNullableFilter<"historial_indicadores"> | Date | string | null;
    valor?: Prisma.DecimalNullableFilter<"historial_indicadores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.StringNullableFilter<"historial_indicadores"> | string | null;
};
export type historial_indicadoresCreateManyIndicadoresInput = {
    id_historial?: number;
    fecha?: Date | string | null;
    valor?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: string | null;
};
export type historial_indicadoresUpdateWithoutIndicadoresInput = {
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type historial_indicadoresUncheckedUpdateWithoutIndicadoresInput = {
    id_historial?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type historial_indicadoresUncheckedUpdateManyWithoutIndicadoresInput = {
    id_historial?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    valor?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    observacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type historial_indicadoresSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_historial?: boolean;
    id_indicador?: boolean;
    fecha?: boolean;
    valor?: boolean;
    observacion?: boolean;
    indicadores?: boolean | Prisma.historial_indicadores$indicadoresArgs<ExtArgs>;
}, ExtArgs["result"]["historial_indicadores"]>;
export type historial_indicadoresSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_historial?: boolean;
    id_indicador?: boolean;
    fecha?: boolean;
    valor?: boolean;
    observacion?: boolean;
    indicadores?: boolean | Prisma.historial_indicadores$indicadoresArgs<ExtArgs>;
}, ExtArgs["result"]["historial_indicadores"]>;
export type historial_indicadoresSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_historial?: boolean;
    id_indicador?: boolean;
    fecha?: boolean;
    valor?: boolean;
    observacion?: boolean;
    indicadores?: boolean | Prisma.historial_indicadores$indicadoresArgs<ExtArgs>;
}, ExtArgs["result"]["historial_indicadores"]>;
export type historial_indicadoresSelectScalar = {
    id_historial?: boolean;
    id_indicador?: boolean;
    fecha?: boolean;
    valor?: boolean;
    observacion?: boolean;
};
export type historial_indicadoresOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_historial" | "id_indicador" | "fecha" | "valor" | "observacion", ExtArgs["result"]["historial_indicadores"]>;
export type historial_indicadoresInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    indicadores?: boolean | Prisma.historial_indicadores$indicadoresArgs<ExtArgs>;
};
export type historial_indicadoresIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    indicadores?: boolean | Prisma.historial_indicadores$indicadoresArgs<ExtArgs>;
};
export type historial_indicadoresIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    indicadores?: boolean | Prisma.historial_indicadores$indicadoresArgs<ExtArgs>;
};
export type $historial_indicadoresPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "historial_indicadores";
    objects: {
        indicadores: Prisma.$indicadoresPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_historial: number;
        id_indicador: number | null;
        fecha: Date | null;
        valor: runtime.Decimal | null;
        observacion: string | null;
    }, ExtArgs["result"]["historial_indicadores"]>;
    composites: {};
};
export type historial_indicadoresGetPayload<S extends boolean | null | undefined | historial_indicadoresDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload, S>;
export type historial_indicadoresCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<historial_indicadoresFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Historial_indicadoresCountAggregateInputType | true;
};
export interface historial_indicadoresDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['historial_indicadores'];
        meta: {
            name: 'historial_indicadores';
        };
    };
    /**
     * Find zero or one Historial_indicadores that matches the filter.
     * @param {historial_indicadoresFindUniqueArgs} args - Arguments to find a Historial_indicadores
     * @example
     * // Get one Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends historial_indicadoresFindUniqueArgs>(args: Prisma.SelectSubset<T, historial_indicadoresFindUniqueArgs<ExtArgs>>): Prisma.Prisma__historial_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Historial_indicadores that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {historial_indicadoresFindUniqueOrThrowArgs} args - Arguments to find a Historial_indicadores
     * @example
     * // Get one Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends historial_indicadoresFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, historial_indicadoresFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__historial_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Historial_indicadores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historial_indicadoresFindFirstArgs} args - Arguments to find a Historial_indicadores
     * @example
     * // Get one Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends historial_indicadoresFindFirstArgs>(args?: Prisma.SelectSubset<T, historial_indicadoresFindFirstArgs<ExtArgs>>): Prisma.Prisma__historial_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Historial_indicadores that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historial_indicadoresFindFirstOrThrowArgs} args - Arguments to find a Historial_indicadores
     * @example
     * // Get one Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends historial_indicadoresFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, historial_indicadoresFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__historial_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Historial_indicadores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historial_indicadoresFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.findMany()
     *
     * // Get first 10 Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.findMany({ take: 10 })
     *
     * // Only select the `id_historial`
     * const historial_indicadoresWithId_historialOnly = await prisma.historial_indicadores.findMany({ select: { id_historial: true } })
     *
     */
    findMany<T extends historial_indicadoresFindManyArgs>(args?: Prisma.SelectSubset<T, historial_indicadoresFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Historial_indicadores.
     * @param {historial_indicadoresCreateArgs} args - Arguments to create a Historial_indicadores.
     * @example
     * // Create one Historial_indicadores
     * const Historial_indicadores = await prisma.historial_indicadores.create({
     *   data: {
     *     // ... data to create a Historial_indicadores
     *   }
     * })
     *
     */
    create<T extends historial_indicadoresCreateArgs>(args: Prisma.SelectSubset<T, historial_indicadoresCreateArgs<ExtArgs>>): Prisma.Prisma__historial_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Historial_indicadores.
     * @param {historial_indicadoresCreateManyArgs} args - Arguments to create many Historial_indicadores.
     * @example
     * // Create many Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends historial_indicadoresCreateManyArgs>(args?: Prisma.SelectSubset<T, historial_indicadoresCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Historial_indicadores and returns the data saved in the database.
     * @param {historial_indicadoresCreateManyAndReturnArgs} args - Arguments to create many Historial_indicadores.
     * @example
     * // Create many Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Historial_indicadores and only return the `id_historial`
     * const historial_indicadoresWithId_historialOnly = await prisma.historial_indicadores.createManyAndReturn({
     *   select: { id_historial: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends historial_indicadoresCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, historial_indicadoresCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Historial_indicadores.
     * @param {historial_indicadoresDeleteArgs} args - Arguments to delete one Historial_indicadores.
     * @example
     * // Delete one Historial_indicadores
     * const Historial_indicadores = await prisma.historial_indicadores.delete({
     *   where: {
     *     // ... filter to delete one Historial_indicadores
     *   }
     * })
     *
     */
    delete<T extends historial_indicadoresDeleteArgs>(args: Prisma.SelectSubset<T, historial_indicadoresDeleteArgs<ExtArgs>>): Prisma.Prisma__historial_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Historial_indicadores.
     * @param {historial_indicadoresUpdateArgs} args - Arguments to update one Historial_indicadores.
     * @example
     * // Update one Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends historial_indicadoresUpdateArgs>(args: Prisma.SelectSubset<T, historial_indicadoresUpdateArgs<ExtArgs>>): Prisma.Prisma__historial_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Historial_indicadores.
     * @param {historial_indicadoresDeleteManyArgs} args - Arguments to filter Historial_indicadores to delete.
     * @example
     * // Delete a few Historial_indicadores
     * const { count } = await prisma.historial_indicadores.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends historial_indicadoresDeleteManyArgs>(args?: Prisma.SelectSubset<T, historial_indicadoresDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Historial_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historial_indicadoresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends historial_indicadoresUpdateManyArgs>(args: Prisma.SelectSubset<T, historial_indicadoresUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Historial_indicadores and returns the data updated in the database.
     * @param {historial_indicadoresUpdateManyAndReturnArgs} args - Arguments to update many Historial_indicadores.
     * @example
     * // Update many Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Historial_indicadores and only return the `id_historial`
     * const historial_indicadoresWithId_historialOnly = await prisma.historial_indicadores.updateManyAndReturn({
     *   select: { id_historial: true },
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
    updateManyAndReturn<T extends historial_indicadoresUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, historial_indicadoresUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Historial_indicadores.
     * @param {historial_indicadoresUpsertArgs} args - Arguments to update or create a Historial_indicadores.
     * @example
     * // Update or create a Historial_indicadores
     * const historial_indicadores = await prisma.historial_indicadores.upsert({
     *   create: {
     *     // ... data to create a Historial_indicadores
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Historial_indicadores we want to update
     *   }
     * })
     */
    upsert<T extends historial_indicadoresUpsertArgs>(args: Prisma.SelectSubset<T, historial_indicadoresUpsertArgs<ExtArgs>>): Prisma.Prisma__historial_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Historial_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historial_indicadoresCountArgs} args - Arguments to filter Historial_indicadores to count.
     * @example
     * // Count the number of Historial_indicadores
     * const count = await prisma.historial_indicadores.count({
     *   where: {
     *     // ... the filter for the Historial_indicadores we want to count
     *   }
     * })
    **/
    count<T extends historial_indicadoresCountArgs>(args?: Prisma.Subset<T, historial_indicadoresCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Historial_indicadoresCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Historial_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Historial_indicadoresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Historial_indicadoresAggregateArgs>(args: Prisma.Subset<T, Historial_indicadoresAggregateArgs>): Prisma.PrismaPromise<GetHistorial_indicadoresAggregateType<T>>;
    /**
     * Group by Historial_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historial_indicadoresGroupByArgs} args - Group by arguments.
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
    groupBy<T extends historial_indicadoresGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: historial_indicadoresGroupByArgs['orderBy'];
    } : {
        orderBy?: historial_indicadoresGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, historial_indicadoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistorial_indicadoresGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the historial_indicadores model
     */
    readonly fields: historial_indicadoresFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for historial_indicadores.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__historial_indicadoresClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    indicadores<T extends Prisma.historial_indicadores$indicadoresArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.historial_indicadores$indicadoresArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the historial_indicadores model
 */
export interface historial_indicadoresFieldRefs {
    readonly id_historial: Prisma.FieldRef<"historial_indicadores", 'Int'>;
    readonly id_indicador: Prisma.FieldRef<"historial_indicadores", 'Int'>;
    readonly fecha: Prisma.FieldRef<"historial_indicadores", 'DateTime'>;
    readonly valor: Prisma.FieldRef<"historial_indicadores", 'Decimal'>;
    readonly observacion: Prisma.FieldRef<"historial_indicadores", 'String'>;
}
/**
 * historial_indicadores findUnique
 */
export type historial_indicadoresFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which historial_indicadores to fetch.
     */
    where: Prisma.historial_indicadoresWhereUniqueInput;
};
/**
 * historial_indicadores findUniqueOrThrow
 */
export type historial_indicadoresFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which historial_indicadores to fetch.
     */
    where: Prisma.historial_indicadoresWhereUniqueInput;
};
/**
 * historial_indicadores findFirst
 */
export type historial_indicadoresFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which historial_indicadores to fetch.
     */
    where?: Prisma.historial_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of historial_indicadores to fetch.
     */
    orderBy?: Prisma.historial_indicadoresOrderByWithRelationInput | Prisma.historial_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for historial_indicadores.
     */
    cursor?: Prisma.historial_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` historial_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` historial_indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of historial_indicadores.
     */
    distinct?: Prisma.Historial_indicadoresScalarFieldEnum | Prisma.Historial_indicadoresScalarFieldEnum[];
};
/**
 * historial_indicadores findFirstOrThrow
 */
export type historial_indicadoresFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which historial_indicadores to fetch.
     */
    where?: Prisma.historial_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of historial_indicadores to fetch.
     */
    orderBy?: Prisma.historial_indicadoresOrderByWithRelationInput | Prisma.historial_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for historial_indicadores.
     */
    cursor?: Prisma.historial_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` historial_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` historial_indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of historial_indicadores.
     */
    distinct?: Prisma.Historial_indicadoresScalarFieldEnum | Prisma.Historial_indicadoresScalarFieldEnum[];
};
/**
 * historial_indicadores findMany
 */
export type historial_indicadoresFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which historial_indicadores to fetch.
     */
    where?: Prisma.historial_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of historial_indicadores to fetch.
     */
    orderBy?: Prisma.historial_indicadoresOrderByWithRelationInput | Prisma.historial_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing historial_indicadores.
     */
    cursor?: Prisma.historial_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` historial_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` historial_indicadores.
     */
    skip?: number;
    distinct?: Prisma.Historial_indicadoresScalarFieldEnum | Prisma.Historial_indicadoresScalarFieldEnum[];
};
/**
 * historial_indicadores create
 */
export type historial_indicadoresCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    /**
     * The data needed to create a historial_indicadores.
     */
    data?: Prisma.XOR<Prisma.historial_indicadoresCreateInput, Prisma.historial_indicadoresUncheckedCreateInput>;
};
/**
 * historial_indicadores createMany
 */
export type historial_indicadoresCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many historial_indicadores.
     */
    data: Prisma.historial_indicadoresCreateManyInput | Prisma.historial_indicadoresCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * historial_indicadores createManyAndReturn
 */
export type historial_indicadoresCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * The data used to create many historial_indicadores.
     */
    data: Prisma.historial_indicadoresCreateManyInput | Prisma.historial_indicadoresCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * historial_indicadores update
 */
export type historial_indicadoresUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    /**
     * The data needed to update a historial_indicadores.
     */
    data: Prisma.XOR<Prisma.historial_indicadoresUpdateInput, Prisma.historial_indicadoresUncheckedUpdateInput>;
    /**
     * Choose, which historial_indicadores to update.
     */
    where: Prisma.historial_indicadoresWhereUniqueInput;
};
/**
 * historial_indicadores updateMany
 */
export type historial_indicadoresUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update historial_indicadores.
     */
    data: Prisma.XOR<Prisma.historial_indicadoresUpdateManyMutationInput, Prisma.historial_indicadoresUncheckedUpdateManyInput>;
    /**
     * Filter which historial_indicadores to update
     */
    where?: Prisma.historial_indicadoresWhereInput;
    /**
     * Limit how many historial_indicadores to update.
     */
    limit?: number;
};
/**
 * historial_indicadores updateManyAndReturn
 */
export type historial_indicadoresUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * The data used to update historial_indicadores.
     */
    data: Prisma.XOR<Prisma.historial_indicadoresUpdateManyMutationInput, Prisma.historial_indicadoresUncheckedUpdateManyInput>;
    /**
     * Filter which historial_indicadores to update
     */
    where?: Prisma.historial_indicadoresWhereInput;
    /**
     * Limit how many historial_indicadores to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * historial_indicadores upsert
 */
export type historial_indicadoresUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    /**
     * The filter to search for the historial_indicadores to update in case it exists.
     */
    where: Prisma.historial_indicadoresWhereUniqueInput;
    /**
     * In case the historial_indicadores found by the `where` argument doesn't exist, create a new historial_indicadores with this data.
     */
    create: Prisma.XOR<Prisma.historial_indicadoresCreateInput, Prisma.historial_indicadoresUncheckedCreateInput>;
    /**
     * In case the historial_indicadores was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.historial_indicadoresUpdateInput, Prisma.historial_indicadoresUncheckedUpdateInput>;
};
/**
 * historial_indicadores delete
 */
export type historial_indicadoresDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter which historial_indicadores to delete.
     */
    where: Prisma.historial_indicadoresWhereUniqueInput;
};
/**
 * historial_indicadores deleteMany
 */
export type historial_indicadoresDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which historial_indicadores to delete
     */
    where?: Prisma.historial_indicadoresWhereInput;
    /**
     * Limit how many historial_indicadores to delete.
     */
    limit?: number;
};
/**
 * historial_indicadores.indicadores
 */
export type historial_indicadores$indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the indicadores
     */
    select?: Prisma.indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the indicadores
     */
    omit?: Prisma.indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.indicadoresInclude<ExtArgs> | null;
    where?: Prisma.indicadoresWhereInput;
};
/**
 * historial_indicadores without action
 */
export type historial_indicadoresDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=historial_indicadores.d.ts.map