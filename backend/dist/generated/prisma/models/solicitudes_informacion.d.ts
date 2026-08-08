import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model solicitudes_informacion
 *
 */
export type solicitudes_informacionModel = runtime.Types.Result.DefaultSelection<Prisma.$solicitudes_informacionPayload>;
export type AggregateSolicitudes_informacion = {
    _count: Solicitudes_informacionCountAggregateOutputType | null;
    _avg: Solicitudes_informacionAvgAggregateOutputType | null;
    _sum: Solicitudes_informacionSumAggregateOutputType | null;
    _min: Solicitudes_informacionMinAggregateOutputType | null;
    _max: Solicitudes_informacionMaxAggregateOutputType | null;
};
export type Solicitudes_informacionAvgAggregateOutputType = {
    id_solicitud: number | null;
    id_caso: number | null;
};
export type Solicitudes_informacionSumAggregateOutputType = {
    id_solicitud: number | null;
    id_caso: number | null;
};
export type Solicitudes_informacionMinAggregateOutputType = {
    id_solicitud: number | null;
    id_caso: number | null;
    mensaje: string | null;
    respuesta: string | null;
    respondida: boolean | null;
    estado_previo: string | null;
    fecha_solicitud: Date | null;
    fecha_respuesta: Date | null;
};
export type Solicitudes_informacionMaxAggregateOutputType = {
    id_solicitud: number | null;
    id_caso: number | null;
    mensaje: string | null;
    respuesta: string | null;
    respondida: boolean | null;
    estado_previo: string | null;
    fecha_solicitud: Date | null;
    fecha_respuesta: Date | null;
};
export type Solicitudes_informacionCountAggregateOutputType = {
    id_solicitud: number;
    id_caso: number;
    mensaje: number;
    respuesta: number;
    respondida: number;
    estado_previo: number;
    fecha_solicitud: number;
    fecha_respuesta: number;
    _all: number;
};
export type Solicitudes_informacionAvgAggregateInputType = {
    id_solicitud?: true;
    id_caso?: true;
};
export type Solicitudes_informacionSumAggregateInputType = {
    id_solicitud?: true;
    id_caso?: true;
};
export type Solicitudes_informacionMinAggregateInputType = {
    id_solicitud?: true;
    id_caso?: true;
    mensaje?: true;
    respuesta?: true;
    respondida?: true;
    estado_previo?: true;
    fecha_solicitud?: true;
    fecha_respuesta?: true;
};
export type Solicitudes_informacionMaxAggregateInputType = {
    id_solicitud?: true;
    id_caso?: true;
    mensaje?: true;
    respuesta?: true;
    respondida?: true;
    estado_previo?: true;
    fecha_solicitud?: true;
    fecha_respuesta?: true;
};
export type Solicitudes_informacionCountAggregateInputType = {
    id_solicitud?: true;
    id_caso?: true;
    mensaje?: true;
    respuesta?: true;
    respondida?: true;
    estado_previo?: true;
    fecha_solicitud?: true;
    fecha_respuesta?: true;
    _all?: true;
};
export type Solicitudes_informacionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which solicitudes_informacion to aggregate.
     */
    where?: Prisma.solicitudes_informacionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of solicitudes_informacions to fetch.
     */
    orderBy?: Prisma.solicitudes_informacionOrderByWithRelationInput | Prisma.solicitudes_informacionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.solicitudes_informacionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` solicitudes_informacions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` solicitudes_informacions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned solicitudes_informacions
    **/
    _count?: true | Solicitudes_informacionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Solicitudes_informacionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Solicitudes_informacionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Solicitudes_informacionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Solicitudes_informacionMaxAggregateInputType;
};
export type GetSolicitudes_informacionAggregateType<T extends Solicitudes_informacionAggregateArgs> = {
    [P in keyof T & keyof AggregateSolicitudes_informacion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSolicitudes_informacion[P]> : Prisma.GetScalarType<T[P], AggregateSolicitudes_informacion[P]>;
};
export type solicitudes_informacionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitudes_informacionWhereInput;
    orderBy?: Prisma.solicitudes_informacionOrderByWithAggregationInput | Prisma.solicitudes_informacionOrderByWithAggregationInput[];
    by: Prisma.Solicitudes_informacionScalarFieldEnum[] | Prisma.Solicitudes_informacionScalarFieldEnum;
    having?: Prisma.solicitudes_informacionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Solicitudes_informacionCountAggregateInputType | true;
    _avg?: Solicitudes_informacionAvgAggregateInputType;
    _sum?: Solicitudes_informacionSumAggregateInputType;
    _min?: Solicitudes_informacionMinAggregateInputType;
    _max?: Solicitudes_informacionMaxAggregateInputType;
};
export type Solicitudes_informacionGroupByOutputType = {
    id_solicitud: number;
    id_caso: number;
    mensaje: string;
    respuesta: string | null;
    respondida: boolean;
    estado_previo: string | null;
    fecha_solicitud: Date | null;
    fecha_respuesta: Date | null;
    _count: Solicitudes_informacionCountAggregateOutputType | null;
    _avg: Solicitudes_informacionAvgAggregateOutputType | null;
    _sum: Solicitudes_informacionSumAggregateOutputType | null;
    _min: Solicitudes_informacionMinAggregateOutputType | null;
    _max: Solicitudes_informacionMaxAggregateOutputType | null;
};
type GetSolicitudes_informacionGroupByPayload<T extends solicitudes_informacionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Solicitudes_informacionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Solicitudes_informacionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Solicitudes_informacionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Solicitudes_informacionGroupByOutputType[P]>;
}>>;
export type solicitudes_informacionWhereInput = {
    AND?: Prisma.solicitudes_informacionWhereInput | Prisma.solicitudes_informacionWhereInput[];
    OR?: Prisma.solicitudes_informacionWhereInput[];
    NOT?: Prisma.solicitudes_informacionWhereInput | Prisma.solicitudes_informacionWhereInput[];
    id_solicitud?: Prisma.IntFilter<"solicitudes_informacion"> | number;
    id_caso?: Prisma.IntFilter<"solicitudes_informacion"> | number;
    mensaje?: Prisma.StringFilter<"solicitudes_informacion"> | string;
    respuesta?: Prisma.StringNullableFilter<"solicitudes_informacion"> | string | null;
    respondida?: Prisma.BoolFilter<"solicitudes_informacion"> | boolean;
    estado_previo?: Prisma.StringNullableFilter<"solicitudes_informacion"> | string | null;
    fecha_solicitud?: Prisma.DateTimeNullableFilter<"solicitudes_informacion"> | Date | string | null;
    fecha_respuesta?: Prisma.DateTimeNullableFilter<"solicitudes_informacion"> | Date | string | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
};
export type solicitudes_informacionOrderByWithRelationInput = {
    id_solicitud?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    mensaje?: Prisma.SortOrder;
    respuesta?: Prisma.SortOrderInput | Prisma.SortOrder;
    respondida?: Prisma.SortOrder;
    estado_previo?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_respuesta?: Prisma.SortOrderInput | Prisma.SortOrder;
    casos_sop?: Prisma.casos_sopOrderByWithRelationInput;
};
export type solicitudes_informacionWhereUniqueInput = Prisma.AtLeast<{
    id_solicitud?: number;
    AND?: Prisma.solicitudes_informacionWhereInput | Prisma.solicitudes_informacionWhereInput[];
    OR?: Prisma.solicitudes_informacionWhereInput[];
    NOT?: Prisma.solicitudes_informacionWhereInput | Prisma.solicitudes_informacionWhereInput[];
    id_caso?: Prisma.IntFilter<"solicitudes_informacion"> | number;
    mensaje?: Prisma.StringFilter<"solicitudes_informacion"> | string;
    respuesta?: Prisma.StringNullableFilter<"solicitudes_informacion"> | string | null;
    respondida?: Prisma.BoolFilter<"solicitudes_informacion"> | boolean;
    estado_previo?: Prisma.StringNullableFilter<"solicitudes_informacion"> | string | null;
    fecha_solicitud?: Prisma.DateTimeNullableFilter<"solicitudes_informacion"> | Date | string | null;
    fecha_respuesta?: Prisma.DateTimeNullableFilter<"solicitudes_informacion"> | Date | string | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
}, "id_solicitud">;
export type solicitudes_informacionOrderByWithAggregationInput = {
    id_solicitud?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    mensaje?: Prisma.SortOrder;
    respuesta?: Prisma.SortOrderInput | Prisma.SortOrder;
    respondida?: Prisma.SortOrder;
    estado_previo?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_respuesta?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.solicitudes_informacionCountOrderByAggregateInput;
    _avg?: Prisma.solicitudes_informacionAvgOrderByAggregateInput;
    _max?: Prisma.solicitudes_informacionMaxOrderByAggregateInput;
    _min?: Prisma.solicitudes_informacionMinOrderByAggregateInput;
    _sum?: Prisma.solicitudes_informacionSumOrderByAggregateInput;
};
export type solicitudes_informacionScalarWhereWithAggregatesInput = {
    AND?: Prisma.solicitudes_informacionScalarWhereWithAggregatesInput | Prisma.solicitudes_informacionScalarWhereWithAggregatesInput[];
    OR?: Prisma.solicitudes_informacionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.solicitudes_informacionScalarWhereWithAggregatesInput | Prisma.solicitudes_informacionScalarWhereWithAggregatesInput[];
    id_solicitud?: Prisma.IntWithAggregatesFilter<"solicitudes_informacion"> | number;
    id_caso?: Prisma.IntWithAggregatesFilter<"solicitudes_informacion"> | number;
    mensaje?: Prisma.StringWithAggregatesFilter<"solicitudes_informacion"> | string;
    respuesta?: Prisma.StringNullableWithAggregatesFilter<"solicitudes_informacion"> | string | null;
    respondida?: Prisma.BoolWithAggregatesFilter<"solicitudes_informacion"> | boolean;
    estado_previo?: Prisma.StringNullableWithAggregatesFilter<"solicitudes_informacion"> | string | null;
    fecha_solicitud?: Prisma.DateTimeNullableWithAggregatesFilter<"solicitudes_informacion"> | Date | string | null;
    fecha_respuesta?: Prisma.DateTimeNullableWithAggregatesFilter<"solicitudes_informacion"> | Date | string | null;
};
export type solicitudes_informacionCreateInput = {
    mensaje: string;
    respuesta?: string | null;
    respondida?: boolean;
    estado_previo?: string | null;
    fecha_solicitud?: Date | string | null;
    fecha_respuesta?: Date | string | null;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutSolicitudes_informacionInput;
};
export type solicitudes_informacionUncheckedCreateInput = {
    id_solicitud?: number;
    id_caso: number;
    mensaje: string;
    respuesta?: string | null;
    respondida?: boolean;
    estado_previo?: string | null;
    fecha_solicitud?: Date | string | null;
    fecha_respuesta?: Date | string | null;
};
export type solicitudes_informacionUpdateInput = {
    mensaje?: Prisma.StringFieldUpdateOperationsInput | string;
    respuesta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondida?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    estado_previo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_respuesta?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutSolicitudes_informacionNestedInput;
};
export type solicitudes_informacionUncheckedUpdateInput = {
    id_solicitud?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    mensaje?: Prisma.StringFieldUpdateOperationsInput | string;
    respuesta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondida?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    estado_previo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_respuesta?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_informacionCreateManyInput = {
    id_solicitud?: number;
    id_caso: number;
    mensaje: string;
    respuesta?: string | null;
    respondida?: boolean;
    estado_previo?: string | null;
    fecha_solicitud?: Date | string | null;
    fecha_respuesta?: Date | string | null;
};
export type solicitudes_informacionUpdateManyMutationInput = {
    mensaje?: Prisma.StringFieldUpdateOperationsInput | string;
    respuesta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondida?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    estado_previo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_respuesta?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_informacionUncheckedUpdateManyInput = {
    id_solicitud?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    mensaje?: Prisma.StringFieldUpdateOperationsInput | string;
    respuesta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondida?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    estado_previo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_respuesta?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Solicitudes_informacionListRelationFilter = {
    every?: Prisma.solicitudes_informacionWhereInput;
    some?: Prisma.solicitudes_informacionWhereInput;
    none?: Prisma.solicitudes_informacionWhereInput;
};
export type solicitudes_informacionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type solicitudes_informacionCountOrderByAggregateInput = {
    id_solicitud?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    mensaje?: Prisma.SortOrder;
    respuesta?: Prisma.SortOrder;
    respondida?: Prisma.SortOrder;
    estado_previo?: Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrder;
    fecha_respuesta?: Prisma.SortOrder;
};
export type solicitudes_informacionAvgOrderByAggregateInput = {
    id_solicitud?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
};
export type solicitudes_informacionMaxOrderByAggregateInput = {
    id_solicitud?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    mensaje?: Prisma.SortOrder;
    respuesta?: Prisma.SortOrder;
    respondida?: Prisma.SortOrder;
    estado_previo?: Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrder;
    fecha_respuesta?: Prisma.SortOrder;
};
export type solicitudes_informacionMinOrderByAggregateInput = {
    id_solicitud?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    mensaje?: Prisma.SortOrder;
    respuesta?: Prisma.SortOrder;
    respondida?: Prisma.SortOrder;
    estado_previo?: Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrder;
    fecha_respuesta?: Prisma.SortOrder;
};
export type solicitudes_informacionSumOrderByAggregateInput = {
    id_solicitud?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
};
export type solicitudes_informacionCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.solicitudes_informacionCreateWithoutCasos_sopInput, Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput> | Prisma.solicitudes_informacionCreateWithoutCasos_sopInput[] | Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.solicitudes_informacionCreateOrConnectWithoutCasos_sopInput | Prisma.solicitudes_informacionCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.solicitudes_informacionCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
};
export type solicitudes_informacionUncheckedCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.solicitudes_informacionCreateWithoutCasos_sopInput, Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput> | Prisma.solicitudes_informacionCreateWithoutCasos_sopInput[] | Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.solicitudes_informacionCreateOrConnectWithoutCasos_sopInput | Prisma.solicitudes_informacionCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.solicitudes_informacionCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
};
export type solicitudes_informacionUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_informacionCreateWithoutCasos_sopInput, Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput> | Prisma.solicitudes_informacionCreateWithoutCasos_sopInput[] | Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.solicitudes_informacionCreateOrConnectWithoutCasos_sopInput | Prisma.solicitudes_informacionCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.solicitudes_informacionUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.solicitudes_informacionUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.solicitudes_informacionCreateManyCasos_sopInputEnvelope;
    set?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
    disconnect?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
    delete?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
    connect?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
    update?: Prisma.solicitudes_informacionUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.solicitudes_informacionUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.solicitudes_informacionUpdateManyWithWhereWithoutCasos_sopInput | Prisma.solicitudes_informacionUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.solicitudes_informacionScalarWhereInput | Prisma.solicitudes_informacionScalarWhereInput[];
};
export type solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_informacionCreateWithoutCasos_sopInput, Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput> | Prisma.solicitudes_informacionCreateWithoutCasos_sopInput[] | Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.solicitudes_informacionCreateOrConnectWithoutCasos_sopInput | Prisma.solicitudes_informacionCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.solicitudes_informacionUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.solicitudes_informacionUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.solicitudes_informacionCreateManyCasos_sopInputEnvelope;
    set?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
    disconnect?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
    delete?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
    connect?: Prisma.solicitudes_informacionWhereUniqueInput | Prisma.solicitudes_informacionWhereUniqueInput[];
    update?: Prisma.solicitudes_informacionUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.solicitudes_informacionUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.solicitudes_informacionUpdateManyWithWhereWithoutCasos_sopInput | Prisma.solicitudes_informacionUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.solicitudes_informacionScalarWhereInput | Prisma.solicitudes_informacionScalarWhereInput[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type solicitudes_informacionCreateWithoutCasos_sopInput = {
    mensaje: string;
    respuesta?: string | null;
    respondida?: boolean;
    estado_previo?: string | null;
    fecha_solicitud?: Date | string | null;
    fecha_respuesta?: Date | string | null;
};
export type solicitudes_informacionUncheckedCreateWithoutCasos_sopInput = {
    id_solicitud?: number;
    mensaje: string;
    respuesta?: string | null;
    respondida?: boolean;
    estado_previo?: string | null;
    fecha_solicitud?: Date | string | null;
    fecha_respuesta?: Date | string | null;
};
export type solicitudes_informacionCreateOrConnectWithoutCasos_sopInput = {
    where: Prisma.solicitudes_informacionWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_informacionCreateWithoutCasos_sopInput, Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput>;
};
export type solicitudes_informacionCreateManyCasos_sopInputEnvelope = {
    data: Prisma.solicitudes_informacionCreateManyCasos_sopInput | Prisma.solicitudes_informacionCreateManyCasos_sopInput[];
    skipDuplicates?: boolean;
};
export type solicitudes_informacionUpsertWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.solicitudes_informacionWhereUniqueInput;
    update: Prisma.XOR<Prisma.solicitudes_informacionUpdateWithoutCasos_sopInput, Prisma.solicitudes_informacionUncheckedUpdateWithoutCasos_sopInput>;
    create: Prisma.XOR<Prisma.solicitudes_informacionCreateWithoutCasos_sopInput, Prisma.solicitudes_informacionUncheckedCreateWithoutCasos_sopInput>;
};
export type solicitudes_informacionUpdateWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.solicitudes_informacionWhereUniqueInput;
    data: Prisma.XOR<Prisma.solicitudes_informacionUpdateWithoutCasos_sopInput, Prisma.solicitudes_informacionUncheckedUpdateWithoutCasos_sopInput>;
};
export type solicitudes_informacionUpdateManyWithWhereWithoutCasos_sopInput = {
    where: Prisma.solicitudes_informacionScalarWhereInput;
    data: Prisma.XOR<Prisma.solicitudes_informacionUpdateManyMutationInput, Prisma.solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopInput>;
};
export type solicitudes_informacionScalarWhereInput = {
    AND?: Prisma.solicitudes_informacionScalarWhereInput | Prisma.solicitudes_informacionScalarWhereInput[];
    OR?: Prisma.solicitudes_informacionScalarWhereInput[];
    NOT?: Prisma.solicitudes_informacionScalarWhereInput | Prisma.solicitudes_informacionScalarWhereInput[];
    id_solicitud?: Prisma.IntFilter<"solicitudes_informacion"> | number;
    id_caso?: Prisma.IntFilter<"solicitudes_informacion"> | number;
    mensaje?: Prisma.StringFilter<"solicitudes_informacion"> | string;
    respuesta?: Prisma.StringNullableFilter<"solicitudes_informacion"> | string | null;
    respondida?: Prisma.BoolFilter<"solicitudes_informacion"> | boolean;
    estado_previo?: Prisma.StringNullableFilter<"solicitudes_informacion"> | string | null;
    fecha_solicitud?: Prisma.DateTimeNullableFilter<"solicitudes_informacion"> | Date | string | null;
    fecha_respuesta?: Prisma.DateTimeNullableFilter<"solicitudes_informacion"> | Date | string | null;
};
export type solicitudes_informacionCreateManyCasos_sopInput = {
    id_solicitud?: number;
    mensaje: string;
    respuesta?: string | null;
    respondida?: boolean;
    estado_previo?: string | null;
    fecha_solicitud?: Date | string | null;
    fecha_respuesta?: Date | string | null;
};
export type solicitudes_informacionUpdateWithoutCasos_sopInput = {
    mensaje?: Prisma.StringFieldUpdateOperationsInput | string;
    respuesta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondida?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    estado_previo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_respuesta?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_informacionUncheckedUpdateWithoutCasos_sopInput = {
    id_solicitud?: Prisma.IntFieldUpdateOperationsInput | number;
    mensaje?: Prisma.StringFieldUpdateOperationsInput | string;
    respuesta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondida?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    estado_previo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_respuesta?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_informacionUncheckedUpdateManyWithoutCasos_sopInput = {
    id_solicitud?: Prisma.IntFieldUpdateOperationsInput | number;
    mensaje?: Prisma.StringFieldUpdateOperationsInput | string;
    respuesta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondida?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    estado_previo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_respuesta?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_informacionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_solicitud?: boolean;
    id_caso?: boolean;
    mensaje?: boolean;
    respuesta?: boolean;
    respondida?: boolean;
    estado_previo?: boolean;
    fecha_solicitud?: boolean;
    fecha_respuesta?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["solicitudes_informacion"]>;
export type solicitudes_informacionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_solicitud?: boolean;
    id_caso?: boolean;
    mensaje?: boolean;
    respuesta?: boolean;
    respondida?: boolean;
    estado_previo?: boolean;
    fecha_solicitud?: boolean;
    fecha_respuesta?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["solicitudes_informacion"]>;
export type solicitudes_informacionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_solicitud?: boolean;
    id_caso?: boolean;
    mensaje?: boolean;
    respuesta?: boolean;
    respondida?: boolean;
    estado_previo?: boolean;
    fecha_solicitud?: boolean;
    fecha_respuesta?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["solicitudes_informacion"]>;
export type solicitudes_informacionSelectScalar = {
    id_solicitud?: boolean;
    id_caso?: boolean;
    mensaje?: boolean;
    respuesta?: boolean;
    respondida?: boolean;
    estado_previo?: boolean;
    fecha_solicitud?: boolean;
    fecha_respuesta?: boolean;
};
export type solicitudes_informacionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_solicitud" | "id_caso" | "mensaje" | "respuesta" | "respondida" | "estado_previo" | "fecha_solicitud" | "fecha_respuesta", ExtArgs["result"]["solicitudes_informacion"]>;
export type solicitudes_informacionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
};
export type solicitudes_informacionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
};
export type solicitudes_informacionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
};
export type $solicitudes_informacionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "solicitudes_informacion";
    objects: {
        casos_sop: Prisma.$casos_sopPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_solicitud: number;
        id_caso: number;
        mensaje: string;
        respuesta: string | null;
        respondida: boolean;
        estado_previo: string | null;
        fecha_solicitud: Date | null;
        fecha_respuesta: Date | null;
    }, ExtArgs["result"]["solicitudes_informacion"]>;
    composites: {};
};
export type solicitudes_informacionGetPayload<S extends boolean | null | undefined | solicitudes_informacionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload, S>;
export type solicitudes_informacionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<solicitudes_informacionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Solicitudes_informacionCountAggregateInputType | true;
};
export interface solicitudes_informacionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['solicitudes_informacion'];
        meta: {
            name: 'solicitudes_informacion';
        };
    };
    /**
     * Find zero or one Solicitudes_informacion that matches the filter.
     * @param {solicitudes_informacionFindUniqueArgs} args - Arguments to find a Solicitudes_informacion
     * @example
     * // Get one Solicitudes_informacion
     * const solicitudes_informacion = await prisma.solicitudes_informacion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends solicitudes_informacionFindUniqueArgs>(args: Prisma.SelectSubset<T, solicitudes_informacionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__solicitudes_informacionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Solicitudes_informacion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {solicitudes_informacionFindUniqueOrThrowArgs} args - Arguments to find a Solicitudes_informacion
     * @example
     * // Get one Solicitudes_informacion
     * const solicitudes_informacion = await prisma.solicitudes_informacion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends solicitudes_informacionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, solicitudes_informacionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitudes_informacionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Solicitudes_informacion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_informacionFindFirstArgs} args - Arguments to find a Solicitudes_informacion
     * @example
     * // Get one Solicitudes_informacion
     * const solicitudes_informacion = await prisma.solicitudes_informacion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends solicitudes_informacionFindFirstArgs>(args?: Prisma.SelectSubset<T, solicitudes_informacionFindFirstArgs<ExtArgs>>): Prisma.Prisma__solicitudes_informacionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Solicitudes_informacion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_informacionFindFirstOrThrowArgs} args - Arguments to find a Solicitudes_informacion
     * @example
     * // Get one Solicitudes_informacion
     * const solicitudes_informacion = await prisma.solicitudes_informacion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends solicitudes_informacionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, solicitudes_informacionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitudes_informacionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Solicitudes_informacions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_informacionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Solicitudes_informacions
     * const solicitudes_informacions = await prisma.solicitudes_informacion.findMany()
     *
     * // Get first 10 Solicitudes_informacions
     * const solicitudes_informacions = await prisma.solicitudes_informacion.findMany({ take: 10 })
     *
     * // Only select the `id_solicitud`
     * const solicitudes_informacionWithId_solicitudOnly = await prisma.solicitudes_informacion.findMany({ select: { id_solicitud: true } })
     *
     */
    findMany<T extends solicitudes_informacionFindManyArgs>(args?: Prisma.SelectSubset<T, solicitudes_informacionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Solicitudes_informacion.
     * @param {solicitudes_informacionCreateArgs} args - Arguments to create a Solicitudes_informacion.
     * @example
     * // Create one Solicitudes_informacion
     * const Solicitudes_informacion = await prisma.solicitudes_informacion.create({
     *   data: {
     *     // ... data to create a Solicitudes_informacion
     *   }
     * })
     *
     */
    create<T extends solicitudes_informacionCreateArgs>(args: Prisma.SelectSubset<T, solicitudes_informacionCreateArgs<ExtArgs>>): Prisma.Prisma__solicitudes_informacionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Solicitudes_informacions.
     * @param {solicitudes_informacionCreateManyArgs} args - Arguments to create many Solicitudes_informacions.
     * @example
     * // Create many Solicitudes_informacions
     * const solicitudes_informacion = await prisma.solicitudes_informacion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends solicitudes_informacionCreateManyArgs>(args?: Prisma.SelectSubset<T, solicitudes_informacionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Solicitudes_informacions and returns the data saved in the database.
     * @param {solicitudes_informacionCreateManyAndReturnArgs} args - Arguments to create many Solicitudes_informacions.
     * @example
     * // Create many Solicitudes_informacions
     * const solicitudes_informacion = await prisma.solicitudes_informacion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Solicitudes_informacions and only return the `id_solicitud`
     * const solicitudes_informacionWithId_solicitudOnly = await prisma.solicitudes_informacion.createManyAndReturn({
     *   select: { id_solicitud: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends solicitudes_informacionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, solicitudes_informacionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Solicitudes_informacion.
     * @param {solicitudes_informacionDeleteArgs} args - Arguments to delete one Solicitudes_informacion.
     * @example
     * // Delete one Solicitudes_informacion
     * const Solicitudes_informacion = await prisma.solicitudes_informacion.delete({
     *   where: {
     *     // ... filter to delete one Solicitudes_informacion
     *   }
     * })
     *
     */
    delete<T extends solicitudes_informacionDeleteArgs>(args: Prisma.SelectSubset<T, solicitudes_informacionDeleteArgs<ExtArgs>>): Prisma.Prisma__solicitudes_informacionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Solicitudes_informacion.
     * @param {solicitudes_informacionUpdateArgs} args - Arguments to update one Solicitudes_informacion.
     * @example
     * // Update one Solicitudes_informacion
     * const solicitudes_informacion = await prisma.solicitudes_informacion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends solicitudes_informacionUpdateArgs>(args: Prisma.SelectSubset<T, solicitudes_informacionUpdateArgs<ExtArgs>>): Prisma.Prisma__solicitudes_informacionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Solicitudes_informacions.
     * @param {solicitudes_informacionDeleteManyArgs} args - Arguments to filter Solicitudes_informacions to delete.
     * @example
     * // Delete a few Solicitudes_informacions
     * const { count } = await prisma.solicitudes_informacion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends solicitudes_informacionDeleteManyArgs>(args?: Prisma.SelectSubset<T, solicitudes_informacionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Solicitudes_informacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_informacionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Solicitudes_informacions
     * const solicitudes_informacion = await prisma.solicitudes_informacion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends solicitudes_informacionUpdateManyArgs>(args: Prisma.SelectSubset<T, solicitudes_informacionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Solicitudes_informacions and returns the data updated in the database.
     * @param {solicitudes_informacionUpdateManyAndReturnArgs} args - Arguments to update many Solicitudes_informacions.
     * @example
     * // Update many Solicitudes_informacions
     * const solicitudes_informacion = await prisma.solicitudes_informacion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Solicitudes_informacions and only return the `id_solicitud`
     * const solicitudes_informacionWithId_solicitudOnly = await prisma.solicitudes_informacion.updateManyAndReturn({
     *   select: { id_solicitud: true },
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
    updateManyAndReturn<T extends solicitudes_informacionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, solicitudes_informacionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Solicitudes_informacion.
     * @param {solicitudes_informacionUpsertArgs} args - Arguments to update or create a Solicitudes_informacion.
     * @example
     * // Update or create a Solicitudes_informacion
     * const solicitudes_informacion = await prisma.solicitudes_informacion.upsert({
     *   create: {
     *     // ... data to create a Solicitudes_informacion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Solicitudes_informacion we want to update
     *   }
     * })
     */
    upsert<T extends solicitudes_informacionUpsertArgs>(args: Prisma.SelectSubset<T, solicitudes_informacionUpsertArgs<ExtArgs>>): Prisma.Prisma__solicitudes_informacionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_informacionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Solicitudes_informacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_informacionCountArgs} args - Arguments to filter Solicitudes_informacions to count.
     * @example
     * // Count the number of Solicitudes_informacions
     * const count = await prisma.solicitudes_informacion.count({
     *   where: {
     *     // ... the filter for the Solicitudes_informacions we want to count
     *   }
     * })
    **/
    count<T extends solicitudes_informacionCountArgs>(args?: Prisma.Subset<T, solicitudes_informacionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Solicitudes_informacionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Solicitudes_informacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Solicitudes_informacionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Solicitudes_informacionAggregateArgs>(args: Prisma.Subset<T, Solicitudes_informacionAggregateArgs>): Prisma.PrismaPromise<GetSolicitudes_informacionAggregateType<T>>;
    /**
     * Group by Solicitudes_informacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_informacionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends solicitudes_informacionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: solicitudes_informacionGroupByArgs['orderBy'];
    } : {
        orderBy?: solicitudes_informacionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, solicitudes_informacionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitudes_informacionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the solicitudes_informacion model
     */
    readonly fields: solicitudes_informacionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for solicitudes_informacion.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__solicitudes_informacionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the solicitudes_informacion model
 */
export interface solicitudes_informacionFieldRefs {
    readonly id_solicitud: Prisma.FieldRef<"solicitudes_informacion", 'Int'>;
    readonly id_caso: Prisma.FieldRef<"solicitudes_informacion", 'Int'>;
    readonly mensaje: Prisma.FieldRef<"solicitudes_informacion", 'String'>;
    readonly respuesta: Prisma.FieldRef<"solicitudes_informacion", 'String'>;
    readonly respondida: Prisma.FieldRef<"solicitudes_informacion", 'Boolean'>;
    readonly estado_previo: Prisma.FieldRef<"solicitudes_informacion", 'String'>;
    readonly fecha_solicitud: Prisma.FieldRef<"solicitudes_informacion", 'DateTime'>;
    readonly fecha_respuesta: Prisma.FieldRef<"solicitudes_informacion", 'DateTime'>;
}
/**
 * solicitudes_informacion findUnique
 */
export type solicitudes_informacionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which solicitudes_informacion to fetch.
     */
    where: Prisma.solicitudes_informacionWhereUniqueInput;
};
/**
 * solicitudes_informacion findUniqueOrThrow
 */
export type solicitudes_informacionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which solicitudes_informacion to fetch.
     */
    where: Prisma.solicitudes_informacionWhereUniqueInput;
};
/**
 * solicitudes_informacion findFirst
 */
export type solicitudes_informacionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which solicitudes_informacion to fetch.
     */
    where?: Prisma.solicitudes_informacionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of solicitudes_informacions to fetch.
     */
    orderBy?: Prisma.solicitudes_informacionOrderByWithRelationInput | Prisma.solicitudes_informacionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for solicitudes_informacions.
     */
    cursor?: Prisma.solicitudes_informacionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` solicitudes_informacions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` solicitudes_informacions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of solicitudes_informacions.
     */
    distinct?: Prisma.Solicitudes_informacionScalarFieldEnum | Prisma.Solicitudes_informacionScalarFieldEnum[];
};
/**
 * solicitudes_informacion findFirstOrThrow
 */
export type solicitudes_informacionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which solicitudes_informacion to fetch.
     */
    where?: Prisma.solicitudes_informacionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of solicitudes_informacions to fetch.
     */
    orderBy?: Prisma.solicitudes_informacionOrderByWithRelationInput | Prisma.solicitudes_informacionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for solicitudes_informacions.
     */
    cursor?: Prisma.solicitudes_informacionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` solicitudes_informacions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` solicitudes_informacions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of solicitudes_informacions.
     */
    distinct?: Prisma.Solicitudes_informacionScalarFieldEnum | Prisma.Solicitudes_informacionScalarFieldEnum[];
};
/**
 * solicitudes_informacion findMany
 */
export type solicitudes_informacionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which solicitudes_informacions to fetch.
     */
    where?: Prisma.solicitudes_informacionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of solicitudes_informacions to fetch.
     */
    orderBy?: Prisma.solicitudes_informacionOrderByWithRelationInput | Prisma.solicitudes_informacionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing solicitudes_informacions.
     */
    cursor?: Prisma.solicitudes_informacionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` solicitudes_informacions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` solicitudes_informacions.
     */
    skip?: number;
    distinct?: Prisma.Solicitudes_informacionScalarFieldEnum | Prisma.Solicitudes_informacionScalarFieldEnum[];
};
/**
 * solicitudes_informacion create
 */
export type solicitudes_informacionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a solicitudes_informacion.
     */
    data: Prisma.XOR<Prisma.solicitudes_informacionCreateInput, Prisma.solicitudes_informacionUncheckedCreateInput>;
};
/**
 * solicitudes_informacion createMany
 */
export type solicitudes_informacionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many solicitudes_informacions.
     */
    data: Prisma.solicitudes_informacionCreateManyInput | Prisma.solicitudes_informacionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * solicitudes_informacion createManyAndReturn
 */
export type solicitudes_informacionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_informacion
     */
    select?: Prisma.solicitudes_informacionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_informacion
     */
    omit?: Prisma.solicitudes_informacionOmit<ExtArgs> | null;
    /**
     * The data used to create many solicitudes_informacions.
     */
    data: Prisma.solicitudes_informacionCreateManyInput | Prisma.solicitudes_informacionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_informacionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * solicitudes_informacion update
 */
export type solicitudes_informacionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a solicitudes_informacion.
     */
    data: Prisma.XOR<Prisma.solicitudes_informacionUpdateInput, Prisma.solicitudes_informacionUncheckedUpdateInput>;
    /**
     * Choose, which solicitudes_informacion to update.
     */
    where: Prisma.solicitudes_informacionWhereUniqueInput;
};
/**
 * solicitudes_informacion updateMany
 */
export type solicitudes_informacionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update solicitudes_informacions.
     */
    data: Prisma.XOR<Prisma.solicitudes_informacionUpdateManyMutationInput, Prisma.solicitudes_informacionUncheckedUpdateManyInput>;
    /**
     * Filter which solicitudes_informacions to update
     */
    where?: Prisma.solicitudes_informacionWhereInput;
    /**
     * Limit how many solicitudes_informacions to update.
     */
    limit?: number;
};
/**
 * solicitudes_informacion updateManyAndReturn
 */
export type solicitudes_informacionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_informacion
     */
    select?: Prisma.solicitudes_informacionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_informacion
     */
    omit?: Prisma.solicitudes_informacionOmit<ExtArgs> | null;
    /**
     * The data used to update solicitudes_informacions.
     */
    data: Prisma.XOR<Prisma.solicitudes_informacionUpdateManyMutationInput, Prisma.solicitudes_informacionUncheckedUpdateManyInput>;
    /**
     * Filter which solicitudes_informacions to update
     */
    where?: Prisma.solicitudes_informacionWhereInput;
    /**
     * Limit how many solicitudes_informacions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_informacionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * solicitudes_informacion upsert
 */
export type solicitudes_informacionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the solicitudes_informacion to update in case it exists.
     */
    where: Prisma.solicitudes_informacionWhereUniqueInput;
    /**
     * In case the solicitudes_informacion found by the `where` argument doesn't exist, create a new solicitudes_informacion with this data.
     */
    create: Prisma.XOR<Prisma.solicitudes_informacionCreateInput, Prisma.solicitudes_informacionUncheckedCreateInput>;
    /**
     * In case the solicitudes_informacion was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.solicitudes_informacionUpdateInput, Prisma.solicitudes_informacionUncheckedUpdateInput>;
};
/**
 * solicitudes_informacion delete
 */
export type solicitudes_informacionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which solicitudes_informacion to delete.
     */
    where: Prisma.solicitudes_informacionWhereUniqueInput;
};
/**
 * solicitudes_informacion deleteMany
 */
export type solicitudes_informacionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which solicitudes_informacions to delete
     */
    where?: Prisma.solicitudes_informacionWhereInput;
    /**
     * Limit how many solicitudes_informacions to delete.
     */
    limit?: number;
};
/**
 * solicitudes_informacion without action
 */
export type solicitudes_informacionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=solicitudes_informacion.d.ts.map