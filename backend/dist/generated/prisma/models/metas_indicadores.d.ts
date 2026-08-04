import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model metas_indicadores
 *
 */
export type metas_indicadoresModel = runtime.Types.Result.DefaultSelection<Prisma.$metas_indicadoresPayload>;
export type AggregateMetas_indicadores = {
    _count: Metas_indicadoresCountAggregateOutputType | null;
    _avg: Metas_indicadoresAvgAggregateOutputType | null;
    _sum: Metas_indicadoresSumAggregateOutputType | null;
    _min: Metas_indicadoresMinAggregateOutputType | null;
    _max: Metas_indicadoresMaxAggregateOutputType | null;
};
export type Metas_indicadoresAvgAggregateOutputType = {
    id_meta: number | null;
    id_indicador: number | null;
    anio: number | null;
    mes: number | null;
    valor_meta: runtime.Decimal | null;
};
export type Metas_indicadoresSumAggregateOutputType = {
    id_meta: number | null;
    id_indicador: number | null;
    anio: number | null;
    mes: number | null;
    valor_meta: runtime.Decimal | null;
};
export type Metas_indicadoresMinAggregateOutputType = {
    id_meta: number | null;
    id_indicador: number | null;
    anio: number | null;
    mes: number | null;
    valor_meta: runtime.Decimal | null;
};
export type Metas_indicadoresMaxAggregateOutputType = {
    id_meta: number | null;
    id_indicador: number | null;
    anio: number | null;
    mes: number | null;
    valor_meta: runtime.Decimal | null;
};
export type Metas_indicadoresCountAggregateOutputType = {
    id_meta: number;
    id_indicador: number;
    anio: number;
    mes: number;
    valor_meta: number;
    _all: number;
};
export type Metas_indicadoresAvgAggregateInputType = {
    id_meta?: true;
    id_indicador?: true;
    anio?: true;
    mes?: true;
    valor_meta?: true;
};
export type Metas_indicadoresSumAggregateInputType = {
    id_meta?: true;
    id_indicador?: true;
    anio?: true;
    mes?: true;
    valor_meta?: true;
};
export type Metas_indicadoresMinAggregateInputType = {
    id_meta?: true;
    id_indicador?: true;
    anio?: true;
    mes?: true;
    valor_meta?: true;
};
export type Metas_indicadoresMaxAggregateInputType = {
    id_meta?: true;
    id_indicador?: true;
    anio?: true;
    mes?: true;
    valor_meta?: true;
};
export type Metas_indicadoresCountAggregateInputType = {
    id_meta?: true;
    id_indicador?: true;
    anio?: true;
    mes?: true;
    valor_meta?: true;
    _all?: true;
};
export type Metas_indicadoresAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which metas_indicadores to aggregate.
     */
    where?: Prisma.metas_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of metas_indicadores to fetch.
     */
    orderBy?: Prisma.metas_indicadoresOrderByWithRelationInput | Prisma.metas_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.metas_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` metas_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` metas_indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned metas_indicadores
    **/
    _count?: true | Metas_indicadoresCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Metas_indicadoresAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Metas_indicadoresSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Metas_indicadoresMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Metas_indicadoresMaxAggregateInputType;
};
export type GetMetas_indicadoresAggregateType<T extends Metas_indicadoresAggregateArgs> = {
    [P in keyof T & keyof AggregateMetas_indicadores]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMetas_indicadores[P]> : Prisma.GetScalarType<T[P], AggregateMetas_indicadores[P]>;
};
export type metas_indicadoresGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.metas_indicadoresWhereInput;
    orderBy?: Prisma.metas_indicadoresOrderByWithAggregationInput | Prisma.metas_indicadoresOrderByWithAggregationInput[];
    by: Prisma.Metas_indicadoresScalarFieldEnum[] | Prisma.Metas_indicadoresScalarFieldEnum;
    having?: Prisma.metas_indicadoresScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Metas_indicadoresCountAggregateInputType | true;
    _avg?: Metas_indicadoresAvgAggregateInputType;
    _sum?: Metas_indicadoresSumAggregateInputType;
    _min?: Metas_indicadoresMinAggregateInputType;
    _max?: Metas_indicadoresMaxAggregateInputType;
};
export type Metas_indicadoresGroupByOutputType = {
    id_meta: number;
    id_indicador: number | null;
    anio: number | null;
    mes: number | null;
    valor_meta: runtime.Decimal | null;
    _count: Metas_indicadoresCountAggregateOutputType | null;
    _avg: Metas_indicadoresAvgAggregateOutputType | null;
    _sum: Metas_indicadoresSumAggregateOutputType | null;
    _min: Metas_indicadoresMinAggregateOutputType | null;
    _max: Metas_indicadoresMaxAggregateOutputType | null;
};
type GetMetas_indicadoresGroupByPayload<T extends metas_indicadoresGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Metas_indicadoresGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Metas_indicadoresGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Metas_indicadoresGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Metas_indicadoresGroupByOutputType[P]>;
}>>;
export type metas_indicadoresWhereInput = {
    AND?: Prisma.metas_indicadoresWhereInput | Prisma.metas_indicadoresWhereInput[];
    OR?: Prisma.metas_indicadoresWhereInput[];
    NOT?: Prisma.metas_indicadoresWhereInput | Prisma.metas_indicadoresWhereInput[];
    id_meta?: Prisma.IntFilter<"metas_indicadores"> | number;
    id_indicador?: Prisma.IntNullableFilter<"metas_indicadores"> | number | null;
    anio?: Prisma.IntNullableFilter<"metas_indicadores"> | number | null;
    mes?: Prisma.IntNullableFilter<"metas_indicadores"> | number | null;
    valor_meta?: Prisma.DecimalNullableFilter<"metas_indicadores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    indicadores?: Prisma.XOR<Prisma.IndicadoresNullableScalarRelationFilter, Prisma.indicadoresWhereInput> | null;
};
export type metas_indicadoresOrderByWithRelationInput = {
    id_meta?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrderInput | Prisma.SortOrder;
    anio?: Prisma.SortOrderInput | Prisma.SortOrder;
    mes?: Prisma.SortOrderInput | Prisma.SortOrder;
    valor_meta?: Prisma.SortOrderInput | Prisma.SortOrder;
    indicadores?: Prisma.indicadoresOrderByWithRelationInput;
};
export type metas_indicadoresWhereUniqueInput = Prisma.AtLeast<{
    id_meta?: number;
    AND?: Prisma.metas_indicadoresWhereInput | Prisma.metas_indicadoresWhereInput[];
    OR?: Prisma.metas_indicadoresWhereInput[];
    NOT?: Prisma.metas_indicadoresWhereInput | Prisma.metas_indicadoresWhereInput[];
    id_indicador?: Prisma.IntNullableFilter<"metas_indicadores"> | number | null;
    anio?: Prisma.IntNullableFilter<"metas_indicadores"> | number | null;
    mes?: Prisma.IntNullableFilter<"metas_indicadores"> | number | null;
    valor_meta?: Prisma.DecimalNullableFilter<"metas_indicadores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    indicadores?: Prisma.XOR<Prisma.IndicadoresNullableScalarRelationFilter, Prisma.indicadoresWhereInput> | null;
}, "id_meta">;
export type metas_indicadoresOrderByWithAggregationInput = {
    id_meta?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrderInput | Prisma.SortOrder;
    anio?: Prisma.SortOrderInput | Prisma.SortOrder;
    mes?: Prisma.SortOrderInput | Prisma.SortOrder;
    valor_meta?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.metas_indicadoresCountOrderByAggregateInput;
    _avg?: Prisma.metas_indicadoresAvgOrderByAggregateInput;
    _max?: Prisma.metas_indicadoresMaxOrderByAggregateInput;
    _min?: Prisma.metas_indicadoresMinOrderByAggregateInput;
    _sum?: Prisma.metas_indicadoresSumOrderByAggregateInput;
};
export type metas_indicadoresScalarWhereWithAggregatesInput = {
    AND?: Prisma.metas_indicadoresScalarWhereWithAggregatesInput | Prisma.metas_indicadoresScalarWhereWithAggregatesInput[];
    OR?: Prisma.metas_indicadoresScalarWhereWithAggregatesInput[];
    NOT?: Prisma.metas_indicadoresScalarWhereWithAggregatesInput | Prisma.metas_indicadoresScalarWhereWithAggregatesInput[];
    id_meta?: Prisma.IntWithAggregatesFilter<"metas_indicadores"> | number;
    id_indicador?: Prisma.IntNullableWithAggregatesFilter<"metas_indicadores"> | number | null;
    anio?: Prisma.IntNullableWithAggregatesFilter<"metas_indicadores"> | number | null;
    mes?: Prisma.IntNullableWithAggregatesFilter<"metas_indicadores"> | number | null;
    valor_meta?: Prisma.DecimalNullableWithAggregatesFilter<"metas_indicadores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresCreateInput = {
    anio?: number | null;
    mes?: number | null;
    valor_meta?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    indicadores?: Prisma.indicadoresCreateNestedOneWithoutMetas_indicadoresInput;
};
export type metas_indicadoresUncheckedCreateInput = {
    id_meta?: number;
    id_indicador?: number | null;
    anio?: number | null;
    mes?: number | null;
    valor_meta?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresUpdateInput = {
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valor_meta?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    indicadores?: Prisma.indicadoresUpdateOneWithoutMetas_indicadoresNestedInput;
};
export type metas_indicadoresUncheckedUpdateInput = {
    id_meta?: Prisma.IntFieldUpdateOperationsInput | number;
    id_indicador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valor_meta?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresCreateManyInput = {
    id_meta?: number;
    id_indicador?: number | null;
    anio?: number | null;
    mes?: number | null;
    valor_meta?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresUpdateManyMutationInput = {
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valor_meta?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresUncheckedUpdateManyInput = {
    id_meta?: Prisma.IntFieldUpdateOperationsInput | number;
    id_indicador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valor_meta?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type Metas_indicadoresListRelationFilter = {
    every?: Prisma.metas_indicadoresWhereInput;
    some?: Prisma.metas_indicadoresWhereInput;
    none?: Prisma.metas_indicadoresWhereInput;
};
export type metas_indicadoresOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type metas_indicadoresCountOrderByAggregateInput = {
    id_meta?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    valor_meta?: Prisma.SortOrder;
};
export type metas_indicadoresAvgOrderByAggregateInput = {
    id_meta?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    valor_meta?: Prisma.SortOrder;
};
export type metas_indicadoresMaxOrderByAggregateInput = {
    id_meta?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    valor_meta?: Prisma.SortOrder;
};
export type metas_indicadoresMinOrderByAggregateInput = {
    id_meta?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    valor_meta?: Prisma.SortOrder;
};
export type metas_indicadoresSumOrderByAggregateInput = {
    id_meta?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    mes?: Prisma.SortOrder;
    valor_meta?: Prisma.SortOrder;
};
export type metas_indicadoresCreateNestedManyWithoutIndicadoresInput = {
    create?: Prisma.XOR<Prisma.metas_indicadoresCreateWithoutIndicadoresInput, Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.metas_indicadoresCreateWithoutIndicadoresInput[] | Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.metas_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.metas_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    createMany?: Prisma.metas_indicadoresCreateManyIndicadoresInputEnvelope;
    connect?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
};
export type metas_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput = {
    create?: Prisma.XOR<Prisma.metas_indicadoresCreateWithoutIndicadoresInput, Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.metas_indicadoresCreateWithoutIndicadoresInput[] | Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.metas_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.metas_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    createMany?: Prisma.metas_indicadoresCreateManyIndicadoresInputEnvelope;
    connect?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
};
export type metas_indicadoresUpdateManyWithoutIndicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.metas_indicadoresCreateWithoutIndicadoresInput, Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.metas_indicadoresCreateWithoutIndicadoresInput[] | Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.metas_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.metas_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    upsert?: Prisma.metas_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput | Prisma.metas_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput[];
    createMany?: Prisma.metas_indicadoresCreateManyIndicadoresInputEnvelope;
    set?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
    disconnect?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
    delete?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
    connect?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
    update?: Prisma.metas_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput | Prisma.metas_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput[];
    updateMany?: Prisma.metas_indicadoresUpdateManyWithWhereWithoutIndicadoresInput | Prisma.metas_indicadoresUpdateManyWithWhereWithoutIndicadoresInput[];
    deleteMany?: Prisma.metas_indicadoresScalarWhereInput | Prisma.metas_indicadoresScalarWhereInput[];
};
export type metas_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.metas_indicadoresCreateWithoutIndicadoresInput, Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.metas_indicadoresCreateWithoutIndicadoresInput[] | Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.metas_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.metas_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    upsert?: Prisma.metas_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput | Prisma.metas_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput[];
    createMany?: Prisma.metas_indicadoresCreateManyIndicadoresInputEnvelope;
    set?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
    disconnect?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
    delete?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
    connect?: Prisma.metas_indicadoresWhereUniqueInput | Prisma.metas_indicadoresWhereUniqueInput[];
    update?: Prisma.metas_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput | Prisma.metas_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput[];
    updateMany?: Prisma.metas_indicadoresUpdateManyWithWhereWithoutIndicadoresInput | Prisma.metas_indicadoresUpdateManyWithWhereWithoutIndicadoresInput[];
    deleteMany?: Prisma.metas_indicadoresScalarWhereInput | Prisma.metas_indicadoresScalarWhereInput[];
};
export type metas_indicadoresCreateWithoutIndicadoresInput = {
    anio?: number | null;
    mes?: number | null;
    valor_meta?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresUncheckedCreateWithoutIndicadoresInput = {
    id_meta?: number;
    anio?: number | null;
    mes?: number | null;
    valor_meta?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresCreateOrConnectWithoutIndicadoresInput = {
    where: Prisma.metas_indicadoresWhereUniqueInput;
    create: Prisma.XOR<Prisma.metas_indicadoresCreateWithoutIndicadoresInput, Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput>;
};
export type metas_indicadoresCreateManyIndicadoresInputEnvelope = {
    data: Prisma.metas_indicadoresCreateManyIndicadoresInput | Prisma.metas_indicadoresCreateManyIndicadoresInput[];
    skipDuplicates?: boolean;
};
export type metas_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput = {
    where: Prisma.metas_indicadoresWhereUniqueInput;
    update: Prisma.XOR<Prisma.metas_indicadoresUpdateWithoutIndicadoresInput, Prisma.metas_indicadoresUncheckedUpdateWithoutIndicadoresInput>;
    create: Prisma.XOR<Prisma.metas_indicadoresCreateWithoutIndicadoresInput, Prisma.metas_indicadoresUncheckedCreateWithoutIndicadoresInput>;
};
export type metas_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput = {
    where: Prisma.metas_indicadoresWhereUniqueInput;
    data: Prisma.XOR<Prisma.metas_indicadoresUpdateWithoutIndicadoresInput, Prisma.metas_indicadoresUncheckedUpdateWithoutIndicadoresInput>;
};
export type metas_indicadoresUpdateManyWithWhereWithoutIndicadoresInput = {
    where: Prisma.metas_indicadoresScalarWhereInput;
    data: Prisma.XOR<Prisma.metas_indicadoresUpdateManyMutationInput, Prisma.metas_indicadoresUncheckedUpdateManyWithoutIndicadoresInput>;
};
export type metas_indicadoresScalarWhereInput = {
    AND?: Prisma.metas_indicadoresScalarWhereInput | Prisma.metas_indicadoresScalarWhereInput[];
    OR?: Prisma.metas_indicadoresScalarWhereInput[];
    NOT?: Prisma.metas_indicadoresScalarWhereInput | Prisma.metas_indicadoresScalarWhereInput[];
    id_meta?: Prisma.IntFilter<"metas_indicadores"> | number;
    id_indicador?: Prisma.IntNullableFilter<"metas_indicadores"> | number | null;
    anio?: Prisma.IntNullableFilter<"metas_indicadores"> | number | null;
    mes?: Prisma.IntNullableFilter<"metas_indicadores"> | number | null;
    valor_meta?: Prisma.DecimalNullableFilter<"metas_indicadores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresCreateManyIndicadoresInput = {
    id_meta?: number;
    anio?: number | null;
    mes?: number | null;
    valor_meta?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresUpdateWithoutIndicadoresInput = {
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valor_meta?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresUncheckedUpdateWithoutIndicadoresInput = {
    id_meta?: Prisma.IntFieldUpdateOperationsInput | number;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valor_meta?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresUncheckedUpdateManyWithoutIndicadoresInput = {
    id_meta?: Prisma.IntFieldUpdateOperationsInput | number;
    anio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valor_meta?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type metas_indicadoresSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_meta?: boolean;
    id_indicador?: boolean;
    anio?: boolean;
    mes?: boolean;
    valor_meta?: boolean;
    indicadores?: boolean | Prisma.metas_indicadores$indicadoresArgs<ExtArgs>;
}, ExtArgs["result"]["metas_indicadores"]>;
export type metas_indicadoresSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_meta?: boolean;
    id_indicador?: boolean;
    anio?: boolean;
    mes?: boolean;
    valor_meta?: boolean;
    indicadores?: boolean | Prisma.metas_indicadores$indicadoresArgs<ExtArgs>;
}, ExtArgs["result"]["metas_indicadores"]>;
export type metas_indicadoresSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_meta?: boolean;
    id_indicador?: boolean;
    anio?: boolean;
    mes?: boolean;
    valor_meta?: boolean;
    indicadores?: boolean | Prisma.metas_indicadores$indicadoresArgs<ExtArgs>;
}, ExtArgs["result"]["metas_indicadores"]>;
export type metas_indicadoresSelectScalar = {
    id_meta?: boolean;
    id_indicador?: boolean;
    anio?: boolean;
    mes?: boolean;
    valor_meta?: boolean;
};
export type metas_indicadoresOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_meta" | "id_indicador" | "anio" | "mes" | "valor_meta", ExtArgs["result"]["metas_indicadores"]>;
export type metas_indicadoresInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    indicadores?: boolean | Prisma.metas_indicadores$indicadoresArgs<ExtArgs>;
};
export type metas_indicadoresIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    indicadores?: boolean | Prisma.metas_indicadores$indicadoresArgs<ExtArgs>;
};
export type metas_indicadoresIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    indicadores?: boolean | Prisma.metas_indicadores$indicadoresArgs<ExtArgs>;
};
export type $metas_indicadoresPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "metas_indicadores";
    objects: {
        indicadores: Prisma.$indicadoresPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_meta: number;
        id_indicador: number | null;
        anio: number | null;
        mes: number | null;
        valor_meta: runtime.Decimal | null;
    }, ExtArgs["result"]["metas_indicadores"]>;
    composites: {};
};
export type metas_indicadoresGetPayload<S extends boolean | null | undefined | metas_indicadoresDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload, S>;
export type metas_indicadoresCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<metas_indicadoresFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Metas_indicadoresCountAggregateInputType | true;
};
export interface metas_indicadoresDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['metas_indicadores'];
        meta: {
            name: 'metas_indicadores';
        };
    };
    /**
     * Find zero or one Metas_indicadores that matches the filter.
     * @param {metas_indicadoresFindUniqueArgs} args - Arguments to find a Metas_indicadores
     * @example
     * // Get one Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends metas_indicadoresFindUniqueArgs>(args: Prisma.SelectSubset<T, metas_indicadoresFindUniqueArgs<ExtArgs>>): Prisma.Prisma__metas_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Metas_indicadores that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {metas_indicadoresFindUniqueOrThrowArgs} args - Arguments to find a Metas_indicadores
     * @example
     * // Get one Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends metas_indicadoresFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, metas_indicadoresFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__metas_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Metas_indicadores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metas_indicadoresFindFirstArgs} args - Arguments to find a Metas_indicadores
     * @example
     * // Get one Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends metas_indicadoresFindFirstArgs>(args?: Prisma.SelectSubset<T, metas_indicadoresFindFirstArgs<ExtArgs>>): Prisma.Prisma__metas_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Metas_indicadores that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metas_indicadoresFindFirstOrThrowArgs} args - Arguments to find a Metas_indicadores
     * @example
     * // Get one Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends metas_indicadoresFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, metas_indicadoresFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__metas_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Metas_indicadores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metas_indicadoresFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.findMany()
     *
     * // Get first 10 Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.findMany({ take: 10 })
     *
     * // Only select the `id_meta`
     * const metas_indicadoresWithId_metaOnly = await prisma.metas_indicadores.findMany({ select: { id_meta: true } })
     *
     */
    findMany<T extends metas_indicadoresFindManyArgs>(args?: Prisma.SelectSubset<T, metas_indicadoresFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Metas_indicadores.
     * @param {metas_indicadoresCreateArgs} args - Arguments to create a Metas_indicadores.
     * @example
     * // Create one Metas_indicadores
     * const Metas_indicadores = await prisma.metas_indicadores.create({
     *   data: {
     *     // ... data to create a Metas_indicadores
     *   }
     * })
     *
     */
    create<T extends metas_indicadoresCreateArgs>(args: Prisma.SelectSubset<T, metas_indicadoresCreateArgs<ExtArgs>>): Prisma.Prisma__metas_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Metas_indicadores.
     * @param {metas_indicadoresCreateManyArgs} args - Arguments to create many Metas_indicadores.
     * @example
     * // Create many Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends metas_indicadoresCreateManyArgs>(args?: Prisma.SelectSubset<T, metas_indicadoresCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Metas_indicadores and returns the data saved in the database.
     * @param {metas_indicadoresCreateManyAndReturnArgs} args - Arguments to create many Metas_indicadores.
     * @example
     * // Create many Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Metas_indicadores and only return the `id_meta`
     * const metas_indicadoresWithId_metaOnly = await prisma.metas_indicadores.createManyAndReturn({
     *   select: { id_meta: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends metas_indicadoresCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, metas_indicadoresCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Metas_indicadores.
     * @param {metas_indicadoresDeleteArgs} args - Arguments to delete one Metas_indicadores.
     * @example
     * // Delete one Metas_indicadores
     * const Metas_indicadores = await prisma.metas_indicadores.delete({
     *   where: {
     *     // ... filter to delete one Metas_indicadores
     *   }
     * })
     *
     */
    delete<T extends metas_indicadoresDeleteArgs>(args: Prisma.SelectSubset<T, metas_indicadoresDeleteArgs<ExtArgs>>): Prisma.Prisma__metas_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Metas_indicadores.
     * @param {metas_indicadoresUpdateArgs} args - Arguments to update one Metas_indicadores.
     * @example
     * // Update one Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends metas_indicadoresUpdateArgs>(args: Prisma.SelectSubset<T, metas_indicadoresUpdateArgs<ExtArgs>>): Prisma.Prisma__metas_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Metas_indicadores.
     * @param {metas_indicadoresDeleteManyArgs} args - Arguments to filter Metas_indicadores to delete.
     * @example
     * // Delete a few Metas_indicadores
     * const { count } = await prisma.metas_indicadores.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends metas_indicadoresDeleteManyArgs>(args?: Prisma.SelectSubset<T, metas_indicadoresDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Metas_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metas_indicadoresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends metas_indicadoresUpdateManyArgs>(args: Prisma.SelectSubset<T, metas_indicadoresUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Metas_indicadores and returns the data updated in the database.
     * @param {metas_indicadoresUpdateManyAndReturnArgs} args - Arguments to update many Metas_indicadores.
     * @example
     * // Update many Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Metas_indicadores and only return the `id_meta`
     * const metas_indicadoresWithId_metaOnly = await prisma.metas_indicadores.updateManyAndReturn({
     *   select: { id_meta: true },
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
    updateManyAndReturn<T extends metas_indicadoresUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, metas_indicadoresUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Metas_indicadores.
     * @param {metas_indicadoresUpsertArgs} args - Arguments to update or create a Metas_indicadores.
     * @example
     * // Update or create a Metas_indicadores
     * const metas_indicadores = await prisma.metas_indicadores.upsert({
     *   create: {
     *     // ... data to create a Metas_indicadores
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Metas_indicadores we want to update
     *   }
     * })
     */
    upsert<T extends metas_indicadoresUpsertArgs>(args: Prisma.SelectSubset<T, metas_indicadoresUpsertArgs<ExtArgs>>): Prisma.Prisma__metas_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Metas_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metas_indicadoresCountArgs} args - Arguments to filter Metas_indicadores to count.
     * @example
     * // Count the number of Metas_indicadores
     * const count = await prisma.metas_indicadores.count({
     *   where: {
     *     // ... the filter for the Metas_indicadores we want to count
     *   }
     * })
    **/
    count<T extends metas_indicadoresCountArgs>(args?: Prisma.Subset<T, metas_indicadoresCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Metas_indicadoresCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Metas_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Metas_indicadoresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Metas_indicadoresAggregateArgs>(args: Prisma.Subset<T, Metas_indicadoresAggregateArgs>): Prisma.PrismaPromise<GetMetas_indicadoresAggregateType<T>>;
    /**
     * Group by Metas_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metas_indicadoresGroupByArgs} args - Group by arguments.
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
    groupBy<T extends metas_indicadoresGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: metas_indicadoresGroupByArgs['orderBy'];
    } : {
        orderBy?: metas_indicadoresGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, metas_indicadoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetas_indicadoresGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the metas_indicadores model
     */
    readonly fields: metas_indicadoresFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for metas_indicadores.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__metas_indicadoresClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    indicadores<T extends Prisma.metas_indicadores$indicadoresArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.metas_indicadores$indicadoresArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the metas_indicadores model
 */
export interface metas_indicadoresFieldRefs {
    readonly id_meta: Prisma.FieldRef<"metas_indicadores", 'Int'>;
    readonly id_indicador: Prisma.FieldRef<"metas_indicadores", 'Int'>;
    readonly anio: Prisma.FieldRef<"metas_indicadores", 'Int'>;
    readonly mes: Prisma.FieldRef<"metas_indicadores", 'Int'>;
    readonly valor_meta: Prisma.FieldRef<"metas_indicadores", 'Decimal'>;
}
/**
 * metas_indicadores findUnique
 */
export type metas_indicadoresFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which metas_indicadores to fetch.
     */
    where: Prisma.metas_indicadoresWhereUniqueInput;
};
/**
 * metas_indicadores findUniqueOrThrow
 */
export type metas_indicadoresFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which metas_indicadores to fetch.
     */
    where: Prisma.metas_indicadoresWhereUniqueInput;
};
/**
 * metas_indicadores findFirst
 */
export type metas_indicadoresFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which metas_indicadores to fetch.
     */
    where?: Prisma.metas_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of metas_indicadores to fetch.
     */
    orderBy?: Prisma.metas_indicadoresOrderByWithRelationInput | Prisma.metas_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for metas_indicadores.
     */
    cursor?: Prisma.metas_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` metas_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` metas_indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of metas_indicadores.
     */
    distinct?: Prisma.Metas_indicadoresScalarFieldEnum | Prisma.Metas_indicadoresScalarFieldEnum[];
};
/**
 * metas_indicadores findFirstOrThrow
 */
export type metas_indicadoresFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which metas_indicadores to fetch.
     */
    where?: Prisma.metas_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of metas_indicadores to fetch.
     */
    orderBy?: Prisma.metas_indicadoresOrderByWithRelationInput | Prisma.metas_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for metas_indicadores.
     */
    cursor?: Prisma.metas_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` metas_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` metas_indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of metas_indicadores.
     */
    distinct?: Prisma.Metas_indicadoresScalarFieldEnum | Prisma.Metas_indicadoresScalarFieldEnum[];
};
/**
 * metas_indicadores findMany
 */
export type metas_indicadoresFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter, which metas_indicadores to fetch.
     */
    where?: Prisma.metas_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of metas_indicadores to fetch.
     */
    orderBy?: Prisma.metas_indicadoresOrderByWithRelationInput | Prisma.metas_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing metas_indicadores.
     */
    cursor?: Prisma.metas_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` metas_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` metas_indicadores.
     */
    skip?: number;
    distinct?: Prisma.Metas_indicadoresScalarFieldEnum | Prisma.Metas_indicadoresScalarFieldEnum[];
};
/**
 * metas_indicadores create
 */
export type metas_indicadoresCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
    /**
     * The data needed to create a metas_indicadores.
     */
    data?: Prisma.XOR<Prisma.metas_indicadoresCreateInput, Prisma.metas_indicadoresUncheckedCreateInput>;
};
/**
 * metas_indicadores createMany
 */
export type metas_indicadoresCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many metas_indicadores.
     */
    data: Prisma.metas_indicadoresCreateManyInput | Prisma.metas_indicadoresCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * metas_indicadores createManyAndReturn
 */
export type metas_indicadoresCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * The data used to create many metas_indicadores.
     */
    data: Prisma.metas_indicadoresCreateManyInput | Prisma.metas_indicadoresCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * metas_indicadores update
 */
export type metas_indicadoresUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
    /**
     * The data needed to update a metas_indicadores.
     */
    data: Prisma.XOR<Prisma.metas_indicadoresUpdateInput, Prisma.metas_indicadoresUncheckedUpdateInput>;
    /**
     * Choose, which metas_indicadores to update.
     */
    where: Prisma.metas_indicadoresWhereUniqueInput;
};
/**
 * metas_indicadores updateMany
 */
export type metas_indicadoresUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update metas_indicadores.
     */
    data: Prisma.XOR<Prisma.metas_indicadoresUpdateManyMutationInput, Prisma.metas_indicadoresUncheckedUpdateManyInput>;
    /**
     * Filter which metas_indicadores to update
     */
    where?: Prisma.metas_indicadoresWhereInput;
    /**
     * Limit how many metas_indicadores to update.
     */
    limit?: number;
};
/**
 * metas_indicadores updateManyAndReturn
 */
export type metas_indicadoresUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * The data used to update metas_indicadores.
     */
    data: Prisma.XOR<Prisma.metas_indicadoresUpdateManyMutationInput, Prisma.metas_indicadoresUncheckedUpdateManyInput>;
    /**
     * Filter which metas_indicadores to update
     */
    where?: Prisma.metas_indicadoresWhereInput;
    /**
     * Limit how many metas_indicadores to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * metas_indicadores upsert
 */
export type metas_indicadoresUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
    /**
     * The filter to search for the metas_indicadores to update in case it exists.
     */
    where: Prisma.metas_indicadoresWhereUniqueInput;
    /**
     * In case the metas_indicadores found by the `where` argument doesn't exist, create a new metas_indicadores with this data.
     */
    create: Prisma.XOR<Prisma.metas_indicadoresCreateInput, Prisma.metas_indicadoresUncheckedCreateInput>;
    /**
     * In case the metas_indicadores was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.metas_indicadoresUpdateInput, Prisma.metas_indicadoresUncheckedUpdateInput>;
};
/**
 * metas_indicadores delete
 */
export type metas_indicadoresDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
    /**
     * Filter which metas_indicadores to delete.
     */
    where: Prisma.metas_indicadoresWhereUniqueInput;
};
/**
 * metas_indicadores deleteMany
 */
export type metas_indicadoresDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which metas_indicadores to delete
     */
    where?: Prisma.metas_indicadoresWhereInput;
    /**
     * Limit how many metas_indicadores to delete.
     */
    limit?: number;
};
/**
 * metas_indicadores.indicadores
 */
export type metas_indicadores$indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * metas_indicadores without action
 */
export type metas_indicadoresDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the metas_indicadores
     */
    select?: Prisma.metas_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the metas_indicadores
     */
    omit?: Prisma.metas_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.metas_indicadoresInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=metas_indicadores.d.ts.map