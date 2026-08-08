import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model timeline_caso
 * Bitácora del expediente: un registro por cada acción del workflow.
 * Equivale a `CaseFile.timeline` del prototipo (pushTimeline en cada acción).
 * Es distinta de `bitacora`, que es auditoría técnica del sistema y exige
 * usuario — aquí el actor puede ser un rol sin login todavía.
 */
export type timeline_casoModel = runtime.Types.Result.DefaultSelection<Prisma.$timeline_casoPayload>;
export type AggregateTimeline_caso = {
    _count: Timeline_casoCountAggregateOutputType | null;
    _avg: Timeline_casoAvgAggregateOutputType | null;
    _sum: Timeline_casoSumAggregateOutputType | null;
    _min: Timeline_casoMinAggregateOutputType | null;
    _max: Timeline_casoMaxAggregateOutputType | null;
};
export type Timeline_casoAvgAggregateOutputType = {
    id_evento: number | null;
    id_caso: number | null;
};
export type Timeline_casoSumAggregateOutputType = {
    id_evento: number | null;
    id_caso: number | null;
};
export type Timeline_casoMinAggregateOutputType = {
    id_evento: number | null;
    id_caso: number | null;
    kind: string | null;
    actor: string | null;
    actor_rol: string | null;
    titulo: string | null;
    detalle: string | null;
    fecha: Date | null;
};
export type Timeline_casoMaxAggregateOutputType = {
    id_evento: number | null;
    id_caso: number | null;
    kind: string | null;
    actor: string | null;
    actor_rol: string | null;
    titulo: string | null;
    detalle: string | null;
    fecha: Date | null;
};
export type Timeline_casoCountAggregateOutputType = {
    id_evento: number;
    id_caso: number;
    kind: number;
    actor: number;
    actor_rol: number;
    titulo: number;
    detalle: number;
    fecha: number;
    _all: number;
};
export type Timeline_casoAvgAggregateInputType = {
    id_evento?: true;
    id_caso?: true;
};
export type Timeline_casoSumAggregateInputType = {
    id_evento?: true;
    id_caso?: true;
};
export type Timeline_casoMinAggregateInputType = {
    id_evento?: true;
    id_caso?: true;
    kind?: true;
    actor?: true;
    actor_rol?: true;
    titulo?: true;
    detalle?: true;
    fecha?: true;
};
export type Timeline_casoMaxAggregateInputType = {
    id_evento?: true;
    id_caso?: true;
    kind?: true;
    actor?: true;
    actor_rol?: true;
    titulo?: true;
    detalle?: true;
    fecha?: true;
};
export type Timeline_casoCountAggregateInputType = {
    id_evento?: true;
    id_caso?: true;
    kind?: true;
    actor?: true;
    actor_rol?: true;
    titulo?: true;
    detalle?: true;
    fecha?: true;
    _all?: true;
};
export type Timeline_casoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which timeline_caso to aggregate.
     */
    where?: Prisma.timeline_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of timeline_casos to fetch.
     */
    orderBy?: Prisma.timeline_casoOrderByWithRelationInput | Prisma.timeline_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.timeline_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` timeline_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` timeline_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned timeline_casos
    **/
    _count?: true | Timeline_casoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Timeline_casoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Timeline_casoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Timeline_casoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Timeline_casoMaxAggregateInputType;
};
export type GetTimeline_casoAggregateType<T extends Timeline_casoAggregateArgs> = {
    [P in keyof T & keyof AggregateTimeline_caso]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTimeline_caso[P]> : Prisma.GetScalarType<T[P], AggregateTimeline_caso[P]>;
};
export type timeline_casoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.timeline_casoWhereInput;
    orderBy?: Prisma.timeline_casoOrderByWithAggregationInput | Prisma.timeline_casoOrderByWithAggregationInput[];
    by: Prisma.Timeline_casoScalarFieldEnum[] | Prisma.Timeline_casoScalarFieldEnum;
    having?: Prisma.timeline_casoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Timeline_casoCountAggregateInputType | true;
    _avg?: Timeline_casoAvgAggregateInputType;
    _sum?: Timeline_casoSumAggregateInputType;
    _min?: Timeline_casoMinAggregateInputType;
    _max?: Timeline_casoMaxAggregateInputType;
};
export type Timeline_casoGroupByOutputType = {
    id_evento: number;
    id_caso: number;
    kind: string;
    actor: string;
    actor_rol: string;
    titulo: string;
    detalle: string | null;
    fecha: Date | null;
    _count: Timeline_casoCountAggregateOutputType | null;
    _avg: Timeline_casoAvgAggregateOutputType | null;
    _sum: Timeline_casoSumAggregateOutputType | null;
    _min: Timeline_casoMinAggregateOutputType | null;
    _max: Timeline_casoMaxAggregateOutputType | null;
};
type GetTimeline_casoGroupByPayload<T extends timeline_casoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Timeline_casoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Timeline_casoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Timeline_casoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Timeline_casoGroupByOutputType[P]>;
}>>;
export type timeline_casoWhereInput = {
    AND?: Prisma.timeline_casoWhereInput | Prisma.timeline_casoWhereInput[];
    OR?: Prisma.timeline_casoWhereInput[];
    NOT?: Prisma.timeline_casoWhereInput | Prisma.timeline_casoWhereInput[];
    id_evento?: Prisma.IntFilter<"timeline_caso"> | number;
    id_caso?: Prisma.IntFilter<"timeline_caso"> | number;
    kind?: Prisma.StringFilter<"timeline_caso"> | string;
    actor?: Prisma.StringFilter<"timeline_caso"> | string;
    actor_rol?: Prisma.StringFilter<"timeline_caso"> | string;
    titulo?: Prisma.StringFilter<"timeline_caso"> | string;
    detalle?: Prisma.StringNullableFilter<"timeline_caso"> | string | null;
    fecha?: Prisma.DateTimeNullableFilter<"timeline_caso"> | Date | string | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
};
export type timeline_casoOrderByWithRelationInput = {
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    actor_rol?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    detalle?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    casos_sop?: Prisma.casos_sopOrderByWithRelationInput;
};
export type timeline_casoWhereUniqueInput = Prisma.AtLeast<{
    id_evento?: number;
    AND?: Prisma.timeline_casoWhereInput | Prisma.timeline_casoWhereInput[];
    OR?: Prisma.timeline_casoWhereInput[];
    NOT?: Prisma.timeline_casoWhereInput | Prisma.timeline_casoWhereInput[];
    id_caso?: Prisma.IntFilter<"timeline_caso"> | number;
    kind?: Prisma.StringFilter<"timeline_caso"> | string;
    actor?: Prisma.StringFilter<"timeline_caso"> | string;
    actor_rol?: Prisma.StringFilter<"timeline_caso"> | string;
    titulo?: Prisma.StringFilter<"timeline_caso"> | string;
    detalle?: Prisma.StringNullableFilter<"timeline_caso"> | string | null;
    fecha?: Prisma.DateTimeNullableFilter<"timeline_caso"> | Date | string | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
}, "id_evento">;
export type timeline_casoOrderByWithAggregationInput = {
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    actor_rol?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    detalle?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.timeline_casoCountOrderByAggregateInput;
    _avg?: Prisma.timeline_casoAvgOrderByAggregateInput;
    _max?: Prisma.timeline_casoMaxOrderByAggregateInput;
    _min?: Prisma.timeline_casoMinOrderByAggregateInput;
    _sum?: Prisma.timeline_casoSumOrderByAggregateInput;
};
export type timeline_casoScalarWhereWithAggregatesInput = {
    AND?: Prisma.timeline_casoScalarWhereWithAggregatesInput | Prisma.timeline_casoScalarWhereWithAggregatesInput[];
    OR?: Prisma.timeline_casoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.timeline_casoScalarWhereWithAggregatesInput | Prisma.timeline_casoScalarWhereWithAggregatesInput[];
    id_evento?: Prisma.IntWithAggregatesFilter<"timeline_caso"> | number;
    id_caso?: Prisma.IntWithAggregatesFilter<"timeline_caso"> | number;
    kind?: Prisma.StringWithAggregatesFilter<"timeline_caso"> | string;
    actor?: Prisma.StringWithAggregatesFilter<"timeline_caso"> | string;
    actor_rol?: Prisma.StringWithAggregatesFilter<"timeline_caso"> | string;
    titulo?: Prisma.StringWithAggregatesFilter<"timeline_caso"> | string;
    detalle?: Prisma.StringNullableWithAggregatesFilter<"timeline_caso"> | string | null;
    fecha?: Prisma.DateTimeNullableWithAggregatesFilter<"timeline_caso"> | Date | string | null;
};
export type timeline_casoCreateInput = {
    kind: string;
    actor: string;
    actor_rol: string;
    titulo: string;
    detalle?: string | null;
    fecha?: Date | string | null;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutTimeline_casoInput;
};
export type timeline_casoUncheckedCreateInput = {
    id_evento?: number;
    id_caso: number;
    kind: string;
    actor: string;
    actor_rol: string;
    titulo: string;
    detalle?: string | null;
    fecha?: Date | string | null;
};
export type timeline_casoUpdateInput = {
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    actor_rol?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    detalle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutTimeline_casoNestedInput;
};
export type timeline_casoUncheckedUpdateInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    actor_rol?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    detalle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type timeline_casoCreateManyInput = {
    id_evento?: number;
    id_caso: number;
    kind: string;
    actor: string;
    actor_rol: string;
    titulo: string;
    detalle?: string | null;
    fecha?: Date | string | null;
};
export type timeline_casoUpdateManyMutationInput = {
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    actor_rol?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    detalle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type timeline_casoUncheckedUpdateManyInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    actor_rol?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    detalle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Timeline_casoListRelationFilter = {
    every?: Prisma.timeline_casoWhereInput;
    some?: Prisma.timeline_casoWhereInput;
    none?: Prisma.timeline_casoWhereInput;
};
export type timeline_casoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type timeline_casoCountOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    actor_rol?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    detalle?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
};
export type timeline_casoAvgOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
};
export type timeline_casoMaxOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    actor_rol?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    detalle?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
};
export type timeline_casoMinOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    actor_rol?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    detalle?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
};
export type timeline_casoSumOrderByAggregateInput = {
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
};
export type timeline_casoCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.timeline_casoCreateWithoutCasos_sopInput, Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.timeline_casoCreateWithoutCasos_sopInput[] | Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.timeline_casoCreateOrConnectWithoutCasos_sopInput | Prisma.timeline_casoCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.timeline_casoCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
};
export type timeline_casoUncheckedCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.timeline_casoCreateWithoutCasos_sopInput, Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.timeline_casoCreateWithoutCasos_sopInput[] | Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.timeline_casoCreateOrConnectWithoutCasos_sopInput | Prisma.timeline_casoCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.timeline_casoCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
};
export type timeline_casoUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.timeline_casoCreateWithoutCasos_sopInput, Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.timeline_casoCreateWithoutCasos_sopInput[] | Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.timeline_casoCreateOrConnectWithoutCasos_sopInput | Prisma.timeline_casoCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.timeline_casoUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.timeline_casoUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.timeline_casoCreateManyCasos_sopInputEnvelope;
    set?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
    disconnect?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
    delete?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
    connect?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
    update?: Prisma.timeline_casoUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.timeline_casoUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.timeline_casoUpdateManyWithWhereWithoutCasos_sopInput | Prisma.timeline_casoUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.timeline_casoScalarWhereInput | Prisma.timeline_casoScalarWhereInput[];
};
export type timeline_casoUncheckedUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.timeline_casoCreateWithoutCasos_sopInput, Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.timeline_casoCreateWithoutCasos_sopInput[] | Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.timeline_casoCreateOrConnectWithoutCasos_sopInput | Prisma.timeline_casoCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.timeline_casoUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.timeline_casoUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.timeline_casoCreateManyCasos_sopInputEnvelope;
    set?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
    disconnect?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
    delete?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
    connect?: Prisma.timeline_casoWhereUniqueInput | Prisma.timeline_casoWhereUniqueInput[];
    update?: Prisma.timeline_casoUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.timeline_casoUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.timeline_casoUpdateManyWithWhereWithoutCasos_sopInput | Prisma.timeline_casoUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.timeline_casoScalarWhereInput | Prisma.timeline_casoScalarWhereInput[];
};
export type timeline_casoCreateWithoutCasos_sopInput = {
    kind: string;
    actor: string;
    actor_rol: string;
    titulo: string;
    detalle?: string | null;
    fecha?: Date | string | null;
};
export type timeline_casoUncheckedCreateWithoutCasos_sopInput = {
    id_evento?: number;
    kind: string;
    actor: string;
    actor_rol: string;
    titulo: string;
    detalle?: string | null;
    fecha?: Date | string | null;
};
export type timeline_casoCreateOrConnectWithoutCasos_sopInput = {
    where: Prisma.timeline_casoWhereUniqueInput;
    create: Prisma.XOR<Prisma.timeline_casoCreateWithoutCasos_sopInput, Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput>;
};
export type timeline_casoCreateManyCasos_sopInputEnvelope = {
    data: Prisma.timeline_casoCreateManyCasos_sopInput | Prisma.timeline_casoCreateManyCasos_sopInput[];
    skipDuplicates?: boolean;
};
export type timeline_casoUpsertWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.timeline_casoWhereUniqueInput;
    update: Prisma.XOR<Prisma.timeline_casoUpdateWithoutCasos_sopInput, Prisma.timeline_casoUncheckedUpdateWithoutCasos_sopInput>;
    create: Prisma.XOR<Prisma.timeline_casoCreateWithoutCasos_sopInput, Prisma.timeline_casoUncheckedCreateWithoutCasos_sopInput>;
};
export type timeline_casoUpdateWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.timeline_casoWhereUniqueInput;
    data: Prisma.XOR<Prisma.timeline_casoUpdateWithoutCasos_sopInput, Prisma.timeline_casoUncheckedUpdateWithoutCasos_sopInput>;
};
export type timeline_casoUpdateManyWithWhereWithoutCasos_sopInput = {
    where: Prisma.timeline_casoScalarWhereInput;
    data: Prisma.XOR<Prisma.timeline_casoUpdateManyMutationInput, Prisma.timeline_casoUncheckedUpdateManyWithoutCasos_sopInput>;
};
export type timeline_casoScalarWhereInput = {
    AND?: Prisma.timeline_casoScalarWhereInput | Prisma.timeline_casoScalarWhereInput[];
    OR?: Prisma.timeline_casoScalarWhereInput[];
    NOT?: Prisma.timeline_casoScalarWhereInput | Prisma.timeline_casoScalarWhereInput[];
    id_evento?: Prisma.IntFilter<"timeline_caso"> | number;
    id_caso?: Prisma.IntFilter<"timeline_caso"> | number;
    kind?: Prisma.StringFilter<"timeline_caso"> | string;
    actor?: Prisma.StringFilter<"timeline_caso"> | string;
    actor_rol?: Prisma.StringFilter<"timeline_caso"> | string;
    titulo?: Prisma.StringFilter<"timeline_caso"> | string;
    detalle?: Prisma.StringNullableFilter<"timeline_caso"> | string | null;
    fecha?: Prisma.DateTimeNullableFilter<"timeline_caso"> | Date | string | null;
};
export type timeline_casoCreateManyCasos_sopInput = {
    id_evento?: number;
    kind: string;
    actor: string;
    actor_rol: string;
    titulo: string;
    detalle?: string | null;
    fecha?: Date | string | null;
};
export type timeline_casoUpdateWithoutCasos_sopInput = {
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    actor_rol?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    detalle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type timeline_casoUncheckedUpdateWithoutCasos_sopInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    actor_rol?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    detalle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type timeline_casoUncheckedUpdateManyWithoutCasos_sopInput = {
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    actor_rol?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    detalle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type timeline_casoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evento?: boolean;
    id_caso?: boolean;
    kind?: boolean;
    actor?: boolean;
    actor_rol?: boolean;
    titulo?: boolean;
    detalle?: boolean;
    fecha?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeline_caso"]>;
export type timeline_casoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evento?: boolean;
    id_caso?: boolean;
    kind?: boolean;
    actor?: boolean;
    actor_rol?: boolean;
    titulo?: boolean;
    detalle?: boolean;
    fecha?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeline_caso"]>;
export type timeline_casoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evento?: boolean;
    id_caso?: boolean;
    kind?: boolean;
    actor?: boolean;
    actor_rol?: boolean;
    titulo?: boolean;
    detalle?: boolean;
    fecha?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeline_caso"]>;
export type timeline_casoSelectScalar = {
    id_evento?: boolean;
    id_caso?: boolean;
    kind?: boolean;
    actor?: boolean;
    actor_rol?: boolean;
    titulo?: boolean;
    detalle?: boolean;
    fecha?: boolean;
};
export type timeline_casoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_evento" | "id_caso" | "kind" | "actor" | "actor_rol" | "titulo" | "detalle" | "fecha", ExtArgs["result"]["timeline_caso"]>;
export type timeline_casoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
};
export type timeline_casoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
};
export type timeline_casoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
};
export type $timeline_casoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "timeline_caso";
    objects: {
        casos_sop: Prisma.$casos_sopPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_evento: number;
        id_caso: number;
        kind: string;
        actor: string;
        actor_rol: string;
        titulo: string;
        detalle: string | null;
        fecha: Date | null;
    }, ExtArgs["result"]["timeline_caso"]>;
    composites: {};
};
export type timeline_casoGetPayload<S extends boolean | null | undefined | timeline_casoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload, S>;
export type timeline_casoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<timeline_casoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Timeline_casoCountAggregateInputType | true;
};
export interface timeline_casoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['timeline_caso'];
        meta: {
            name: 'timeline_caso';
        };
    };
    /**
     * Find zero or one Timeline_caso that matches the filter.
     * @param {timeline_casoFindUniqueArgs} args - Arguments to find a Timeline_caso
     * @example
     * // Get one Timeline_caso
     * const timeline_caso = await prisma.timeline_caso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends timeline_casoFindUniqueArgs>(args: Prisma.SelectSubset<T, timeline_casoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__timeline_casoClient<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Timeline_caso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {timeline_casoFindUniqueOrThrowArgs} args - Arguments to find a Timeline_caso
     * @example
     * // Get one Timeline_caso
     * const timeline_caso = await prisma.timeline_caso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends timeline_casoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, timeline_casoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__timeline_casoClient<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Timeline_caso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timeline_casoFindFirstArgs} args - Arguments to find a Timeline_caso
     * @example
     * // Get one Timeline_caso
     * const timeline_caso = await prisma.timeline_caso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends timeline_casoFindFirstArgs>(args?: Prisma.SelectSubset<T, timeline_casoFindFirstArgs<ExtArgs>>): Prisma.Prisma__timeline_casoClient<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Timeline_caso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timeline_casoFindFirstOrThrowArgs} args - Arguments to find a Timeline_caso
     * @example
     * // Get one Timeline_caso
     * const timeline_caso = await prisma.timeline_caso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends timeline_casoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, timeline_casoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__timeline_casoClient<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Timeline_casos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timeline_casoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Timeline_casos
     * const timeline_casos = await prisma.timeline_caso.findMany()
     *
     * // Get first 10 Timeline_casos
     * const timeline_casos = await prisma.timeline_caso.findMany({ take: 10 })
     *
     * // Only select the `id_evento`
     * const timeline_casoWithId_eventoOnly = await prisma.timeline_caso.findMany({ select: { id_evento: true } })
     *
     */
    findMany<T extends timeline_casoFindManyArgs>(args?: Prisma.SelectSubset<T, timeline_casoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Timeline_caso.
     * @param {timeline_casoCreateArgs} args - Arguments to create a Timeline_caso.
     * @example
     * // Create one Timeline_caso
     * const Timeline_caso = await prisma.timeline_caso.create({
     *   data: {
     *     // ... data to create a Timeline_caso
     *   }
     * })
     *
     */
    create<T extends timeline_casoCreateArgs>(args: Prisma.SelectSubset<T, timeline_casoCreateArgs<ExtArgs>>): Prisma.Prisma__timeline_casoClient<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Timeline_casos.
     * @param {timeline_casoCreateManyArgs} args - Arguments to create many Timeline_casos.
     * @example
     * // Create many Timeline_casos
     * const timeline_caso = await prisma.timeline_caso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends timeline_casoCreateManyArgs>(args?: Prisma.SelectSubset<T, timeline_casoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Timeline_casos and returns the data saved in the database.
     * @param {timeline_casoCreateManyAndReturnArgs} args - Arguments to create many Timeline_casos.
     * @example
     * // Create many Timeline_casos
     * const timeline_caso = await prisma.timeline_caso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Timeline_casos and only return the `id_evento`
     * const timeline_casoWithId_eventoOnly = await prisma.timeline_caso.createManyAndReturn({
     *   select: { id_evento: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends timeline_casoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, timeline_casoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Timeline_caso.
     * @param {timeline_casoDeleteArgs} args - Arguments to delete one Timeline_caso.
     * @example
     * // Delete one Timeline_caso
     * const Timeline_caso = await prisma.timeline_caso.delete({
     *   where: {
     *     // ... filter to delete one Timeline_caso
     *   }
     * })
     *
     */
    delete<T extends timeline_casoDeleteArgs>(args: Prisma.SelectSubset<T, timeline_casoDeleteArgs<ExtArgs>>): Prisma.Prisma__timeline_casoClient<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Timeline_caso.
     * @param {timeline_casoUpdateArgs} args - Arguments to update one Timeline_caso.
     * @example
     * // Update one Timeline_caso
     * const timeline_caso = await prisma.timeline_caso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends timeline_casoUpdateArgs>(args: Prisma.SelectSubset<T, timeline_casoUpdateArgs<ExtArgs>>): Prisma.Prisma__timeline_casoClient<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Timeline_casos.
     * @param {timeline_casoDeleteManyArgs} args - Arguments to filter Timeline_casos to delete.
     * @example
     * // Delete a few Timeline_casos
     * const { count } = await prisma.timeline_caso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends timeline_casoDeleteManyArgs>(args?: Prisma.SelectSubset<T, timeline_casoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Timeline_casos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timeline_casoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Timeline_casos
     * const timeline_caso = await prisma.timeline_caso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends timeline_casoUpdateManyArgs>(args: Prisma.SelectSubset<T, timeline_casoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Timeline_casos and returns the data updated in the database.
     * @param {timeline_casoUpdateManyAndReturnArgs} args - Arguments to update many Timeline_casos.
     * @example
     * // Update many Timeline_casos
     * const timeline_caso = await prisma.timeline_caso.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Timeline_casos and only return the `id_evento`
     * const timeline_casoWithId_eventoOnly = await prisma.timeline_caso.updateManyAndReturn({
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
    updateManyAndReturn<T extends timeline_casoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, timeline_casoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Timeline_caso.
     * @param {timeline_casoUpsertArgs} args - Arguments to update or create a Timeline_caso.
     * @example
     * // Update or create a Timeline_caso
     * const timeline_caso = await prisma.timeline_caso.upsert({
     *   create: {
     *     // ... data to create a Timeline_caso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Timeline_caso we want to update
     *   }
     * })
     */
    upsert<T extends timeline_casoUpsertArgs>(args: Prisma.SelectSubset<T, timeline_casoUpsertArgs<ExtArgs>>): Prisma.Prisma__timeline_casoClient<runtime.Types.Result.GetResult<Prisma.$timeline_casoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Timeline_casos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timeline_casoCountArgs} args - Arguments to filter Timeline_casos to count.
     * @example
     * // Count the number of Timeline_casos
     * const count = await prisma.timeline_caso.count({
     *   where: {
     *     // ... the filter for the Timeline_casos we want to count
     *   }
     * })
    **/
    count<T extends timeline_casoCountArgs>(args?: Prisma.Subset<T, timeline_casoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Timeline_casoCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Timeline_caso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Timeline_casoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Timeline_casoAggregateArgs>(args: Prisma.Subset<T, Timeline_casoAggregateArgs>): Prisma.PrismaPromise<GetTimeline_casoAggregateType<T>>;
    /**
     * Group by Timeline_caso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timeline_casoGroupByArgs} args - Group by arguments.
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
    groupBy<T extends timeline_casoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: timeline_casoGroupByArgs['orderBy'];
    } : {
        orderBy?: timeline_casoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, timeline_casoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeline_casoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the timeline_caso model
     */
    readonly fields: timeline_casoFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for timeline_caso.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__timeline_casoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    casos_sop<T extends Prisma.casos_sopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sopDefaultArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the timeline_caso model
 */
export interface timeline_casoFieldRefs {
    readonly id_evento: Prisma.FieldRef<"timeline_caso", 'Int'>;
    readonly id_caso: Prisma.FieldRef<"timeline_caso", 'Int'>;
    readonly kind: Prisma.FieldRef<"timeline_caso", 'String'>;
    readonly actor: Prisma.FieldRef<"timeline_caso", 'String'>;
    readonly actor_rol: Prisma.FieldRef<"timeline_caso", 'String'>;
    readonly titulo: Prisma.FieldRef<"timeline_caso", 'String'>;
    readonly detalle: Prisma.FieldRef<"timeline_caso", 'String'>;
    readonly fecha: Prisma.FieldRef<"timeline_caso", 'DateTime'>;
}
/**
 * timeline_caso findUnique
 */
export type timeline_casoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which timeline_caso to fetch.
     */
    where: Prisma.timeline_casoWhereUniqueInput;
};
/**
 * timeline_caso findUniqueOrThrow
 */
export type timeline_casoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which timeline_caso to fetch.
     */
    where: Prisma.timeline_casoWhereUniqueInput;
};
/**
 * timeline_caso findFirst
 */
export type timeline_casoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which timeline_caso to fetch.
     */
    where?: Prisma.timeline_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of timeline_casos to fetch.
     */
    orderBy?: Prisma.timeline_casoOrderByWithRelationInput | Prisma.timeline_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for timeline_casos.
     */
    cursor?: Prisma.timeline_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` timeline_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` timeline_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of timeline_casos.
     */
    distinct?: Prisma.Timeline_casoScalarFieldEnum | Prisma.Timeline_casoScalarFieldEnum[];
};
/**
 * timeline_caso findFirstOrThrow
 */
export type timeline_casoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which timeline_caso to fetch.
     */
    where?: Prisma.timeline_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of timeline_casos to fetch.
     */
    orderBy?: Prisma.timeline_casoOrderByWithRelationInput | Prisma.timeline_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for timeline_casos.
     */
    cursor?: Prisma.timeline_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` timeline_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` timeline_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of timeline_casos.
     */
    distinct?: Prisma.Timeline_casoScalarFieldEnum | Prisma.Timeline_casoScalarFieldEnum[];
};
/**
 * timeline_caso findMany
 */
export type timeline_casoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which timeline_casos to fetch.
     */
    where?: Prisma.timeline_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of timeline_casos to fetch.
     */
    orderBy?: Prisma.timeline_casoOrderByWithRelationInput | Prisma.timeline_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing timeline_casos.
     */
    cursor?: Prisma.timeline_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` timeline_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` timeline_casos.
     */
    skip?: number;
    distinct?: Prisma.Timeline_casoScalarFieldEnum | Prisma.Timeline_casoScalarFieldEnum[];
};
/**
 * timeline_caso create
 */
export type timeline_casoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a timeline_caso.
     */
    data: Prisma.XOR<Prisma.timeline_casoCreateInput, Prisma.timeline_casoUncheckedCreateInput>;
};
/**
 * timeline_caso createMany
 */
export type timeline_casoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many timeline_casos.
     */
    data: Prisma.timeline_casoCreateManyInput | Prisma.timeline_casoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * timeline_caso createManyAndReturn
 */
export type timeline_casoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the timeline_caso
     */
    select?: Prisma.timeline_casoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the timeline_caso
     */
    omit?: Prisma.timeline_casoOmit<ExtArgs> | null;
    /**
     * The data used to create many timeline_casos.
     */
    data: Prisma.timeline_casoCreateManyInput | Prisma.timeline_casoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.timeline_casoIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * timeline_caso update
 */
export type timeline_casoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a timeline_caso.
     */
    data: Prisma.XOR<Prisma.timeline_casoUpdateInput, Prisma.timeline_casoUncheckedUpdateInput>;
    /**
     * Choose, which timeline_caso to update.
     */
    where: Prisma.timeline_casoWhereUniqueInput;
};
/**
 * timeline_caso updateMany
 */
export type timeline_casoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update timeline_casos.
     */
    data: Prisma.XOR<Prisma.timeline_casoUpdateManyMutationInput, Prisma.timeline_casoUncheckedUpdateManyInput>;
    /**
     * Filter which timeline_casos to update
     */
    where?: Prisma.timeline_casoWhereInput;
    /**
     * Limit how many timeline_casos to update.
     */
    limit?: number;
};
/**
 * timeline_caso updateManyAndReturn
 */
export type timeline_casoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the timeline_caso
     */
    select?: Prisma.timeline_casoSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the timeline_caso
     */
    omit?: Prisma.timeline_casoOmit<ExtArgs> | null;
    /**
     * The data used to update timeline_casos.
     */
    data: Prisma.XOR<Prisma.timeline_casoUpdateManyMutationInput, Prisma.timeline_casoUncheckedUpdateManyInput>;
    /**
     * Filter which timeline_casos to update
     */
    where?: Prisma.timeline_casoWhereInput;
    /**
     * Limit how many timeline_casos to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.timeline_casoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * timeline_caso upsert
 */
export type timeline_casoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the timeline_caso to update in case it exists.
     */
    where: Prisma.timeline_casoWhereUniqueInput;
    /**
     * In case the timeline_caso found by the `where` argument doesn't exist, create a new timeline_caso with this data.
     */
    create: Prisma.XOR<Prisma.timeline_casoCreateInput, Prisma.timeline_casoUncheckedCreateInput>;
    /**
     * In case the timeline_caso was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.timeline_casoUpdateInput, Prisma.timeline_casoUncheckedUpdateInput>;
};
/**
 * timeline_caso delete
 */
export type timeline_casoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which timeline_caso to delete.
     */
    where: Prisma.timeline_casoWhereUniqueInput;
};
/**
 * timeline_caso deleteMany
 */
export type timeline_casoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which timeline_casos to delete
     */
    where?: Prisma.timeline_casoWhereInput;
    /**
     * Limit how many timeline_casos to delete.
     */
    limit?: number;
};
/**
 * timeline_caso without action
 */
export type timeline_casoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=timeline_caso.d.ts.map