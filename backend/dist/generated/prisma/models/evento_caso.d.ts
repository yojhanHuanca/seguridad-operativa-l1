import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model evento_caso
 *
 */
export type evento_casoModel = runtime.Types.Result.DefaultSelection<Prisma.$evento_casoPayload>;
export type AggregateEvento_caso = {
    _count: Evento_casoCountAggregateOutputType | null;
    _avg: Evento_casoAvgAggregateOutputType | null;
    _sum: Evento_casoSumAggregateOutputType | null;
    _min: Evento_casoMinAggregateOutputType | null;
    _max: Evento_casoMaxAggregateOutputType | null;
};
export type Evento_casoAvgAggregateOutputType = {
    id: number | null;
    id_evento: number | null;
    id_caso: number | null;
    usuario: number | null;
};
export type Evento_casoSumAggregateOutputType = {
    id: number | null;
    id_evento: number | null;
    id_caso: number | null;
    usuario: number | null;
};
export type Evento_casoMinAggregateOutputType = {
    id: number | null;
    id_evento: number | null;
    id_caso: number | null;
    fecha_conversion: Date | null;
    usuario: number | null;
};
export type Evento_casoMaxAggregateOutputType = {
    id: number | null;
    id_evento: number | null;
    id_caso: number | null;
    fecha_conversion: Date | null;
    usuario: number | null;
};
export type Evento_casoCountAggregateOutputType = {
    id: number;
    id_evento: number;
    id_caso: number;
    fecha_conversion: number;
    usuario: number;
    _all: number;
};
export type Evento_casoAvgAggregateInputType = {
    id?: true;
    id_evento?: true;
    id_caso?: true;
    usuario?: true;
};
export type Evento_casoSumAggregateInputType = {
    id?: true;
    id_evento?: true;
    id_caso?: true;
    usuario?: true;
};
export type Evento_casoMinAggregateInputType = {
    id?: true;
    id_evento?: true;
    id_caso?: true;
    fecha_conversion?: true;
    usuario?: true;
};
export type Evento_casoMaxAggregateInputType = {
    id?: true;
    id_evento?: true;
    id_caso?: true;
    fecha_conversion?: true;
    usuario?: true;
};
export type Evento_casoCountAggregateInputType = {
    id?: true;
    id_evento?: true;
    id_caso?: true;
    fecha_conversion?: true;
    usuario?: true;
    _all?: true;
};
export type Evento_casoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which evento_caso to aggregate.
     */
    where?: Prisma.evento_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evento_casos to fetch.
     */
    orderBy?: Prisma.evento_casoOrderByWithRelationInput | Prisma.evento_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.evento_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evento_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evento_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned evento_casos
    **/
    _count?: true | Evento_casoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Evento_casoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Evento_casoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Evento_casoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Evento_casoMaxAggregateInputType;
};
export type GetEvento_casoAggregateType<T extends Evento_casoAggregateArgs> = {
    [P in keyof T & keyof AggregateEvento_caso]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEvento_caso[P]> : Prisma.GetScalarType<T[P], AggregateEvento_caso[P]>;
};
export type evento_casoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.evento_casoWhereInput;
    orderBy?: Prisma.evento_casoOrderByWithAggregationInput | Prisma.evento_casoOrderByWithAggregationInput[];
    by: Prisma.Evento_casoScalarFieldEnum[] | Prisma.Evento_casoScalarFieldEnum;
    having?: Prisma.evento_casoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Evento_casoCountAggregateInputType | true;
    _avg?: Evento_casoAvgAggregateInputType;
    _sum?: Evento_casoSumAggregateInputType;
    _min?: Evento_casoMinAggregateInputType;
    _max?: Evento_casoMaxAggregateInputType;
};
export type Evento_casoGroupByOutputType = {
    id: number;
    id_evento: number;
    id_caso: number;
    fecha_conversion: Date | null;
    usuario: number | null;
    _count: Evento_casoCountAggregateOutputType | null;
    _avg: Evento_casoAvgAggregateOutputType | null;
    _sum: Evento_casoSumAggregateOutputType | null;
    _min: Evento_casoMinAggregateOutputType | null;
    _max: Evento_casoMaxAggregateOutputType | null;
};
type GetEvento_casoGroupByPayload<T extends evento_casoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Evento_casoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Evento_casoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Evento_casoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Evento_casoGroupByOutputType[P]>;
}>>;
export type evento_casoWhereInput = {
    AND?: Prisma.evento_casoWhereInput | Prisma.evento_casoWhereInput[];
    OR?: Prisma.evento_casoWhereInput[];
    NOT?: Prisma.evento_casoWhereInput | Prisma.evento_casoWhereInput[];
    id?: Prisma.IntFilter<"evento_caso"> | number;
    id_evento?: Prisma.IntFilter<"evento_caso"> | number;
    id_caso?: Prisma.IntFilter<"evento_caso"> | number;
    fecha_conversion?: Prisma.DateTimeNullableFilter<"evento_caso"> | Date | string | null;
    usuario?: Prisma.IntNullableFilter<"evento_caso"> | number | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
    eventos_operativos?: Prisma.XOR<Prisma.Eventos_operativosScalarRelationFilter, Prisma.eventos_operativosWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type evento_casoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    fecha_conversion?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.SortOrderInput | Prisma.SortOrder;
    casos_sop?: Prisma.casos_sopOrderByWithRelationInput;
    eventos_operativos?: Prisma.eventos_operativosOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type evento_casoWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.evento_casoWhereInput | Prisma.evento_casoWhereInput[];
    OR?: Prisma.evento_casoWhereInput[];
    NOT?: Prisma.evento_casoWhereInput | Prisma.evento_casoWhereInput[];
    id_evento?: Prisma.IntFilter<"evento_caso"> | number;
    id_caso?: Prisma.IntFilter<"evento_caso"> | number;
    fecha_conversion?: Prisma.DateTimeNullableFilter<"evento_caso"> | Date | string | null;
    usuario?: Prisma.IntNullableFilter<"evento_caso"> | number | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
    eventos_operativos?: Prisma.XOR<Prisma.Eventos_operativosScalarRelationFilter, Prisma.eventos_operativosWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id">;
export type evento_casoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    fecha_conversion?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.evento_casoCountOrderByAggregateInput;
    _avg?: Prisma.evento_casoAvgOrderByAggregateInput;
    _max?: Prisma.evento_casoMaxOrderByAggregateInput;
    _min?: Prisma.evento_casoMinOrderByAggregateInput;
    _sum?: Prisma.evento_casoSumOrderByAggregateInput;
};
export type evento_casoScalarWhereWithAggregatesInput = {
    AND?: Prisma.evento_casoScalarWhereWithAggregatesInput | Prisma.evento_casoScalarWhereWithAggregatesInput[];
    OR?: Prisma.evento_casoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.evento_casoScalarWhereWithAggregatesInput | Prisma.evento_casoScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"evento_caso"> | number;
    id_evento?: Prisma.IntWithAggregatesFilter<"evento_caso"> | number;
    id_caso?: Prisma.IntWithAggregatesFilter<"evento_caso"> | number;
    fecha_conversion?: Prisma.DateTimeNullableWithAggregatesFilter<"evento_caso"> | Date | string | null;
    usuario?: Prisma.IntNullableWithAggregatesFilter<"evento_caso"> | number | null;
};
export type evento_casoCreateInput = {
    fecha_conversion?: Date | string | null;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutEvento_casoInput;
    eventos_operativos: Prisma.eventos_operativosCreateNestedOneWithoutEvento_casoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEvento_casoInput;
};
export type evento_casoUncheckedCreateInput = {
    id?: number;
    id_evento: number;
    id_caso: number;
    fecha_conversion?: Date | string | null;
    usuario?: number | null;
};
export type evento_casoUpdateInput = {
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutEvento_casoNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateOneRequiredWithoutEvento_casoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEvento_casoNestedInput;
};
export type evento_casoUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type evento_casoCreateManyInput = {
    id?: number;
    id_evento: number;
    id_caso: number;
    fecha_conversion?: Date | string | null;
    usuario?: number | null;
};
export type evento_casoUpdateManyMutationInput = {
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evento_casoUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type Evento_casoListRelationFilter = {
    every?: Prisma.evento_casoWhereInput;
    some?: Prisma.evento_casoWhereInput;
    none?: Prisma.evento_casoWhereInput;
};
export type evento_casoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type evento_casoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    fecha_conversion?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type evento_casoAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type evento_casoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    fecha_conversion?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type evento_casoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    fecha_conversion?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type evento_casoSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type evento_casoCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutCasos_sopInput, Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.evento_casoCreateWithoutCasos_sopInput[] | Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutCasos_sopInput | Prisma.evento_casoCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.evento_casoCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
};
export type evento_casoUncheckedCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutCasos_sopInput, Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.evento_casoCreateWithoutCasos_sopInput[] | Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutCasos_sopInput | Prisma.evento_casoCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.evento_casoCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
};
export type evento_casoUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutCasos_sopInput, Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.evento_casoCreateWithoutCasos_sopInput[] | Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutCasos_sopInput | Prisma.evento_casoCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.evento_casoUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.evento_casoUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.evento_casoCreateManyCasos_sopInputEnvelope;
    set?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    disconnect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    delete?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    update?: Prisma.evento_casoUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.evento_casoUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.evento_casoUpdateManyWithWhereWithoutCasos_sopInput | Prisma.evento_casoUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.evento_casoScalarWhereInput | Prisma.evento_casoScalarWhereInput[];
};
export type evento_casoUncheckedUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutCasos_sopInput, Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.evento_casoCreateWithoutCasos_sopInput[] | Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutCasos_sopInput | Prisma.evento_casoCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.evento_casoUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.evento_casoUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.evento_casoCreateManyCasos_sopInputEnvelope;
    set?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    disconnect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    delete?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    update?: Prisma.evento_casoUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.evento_casoUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.evento_casoUpdateManyWithWhereWithoutCasos_sopInput | Prisma.evento_casoUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.evento_casoScalarWhereInput | Prisma.evento_casoScalarWhereInput[];
};
export type evento_casoCreateNestedManyWithoutEventos_operativosInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutEventos_operativosInput, Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput> | Prisma.evento_casoCreateWithoutEventos_operativosInput[] | Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutEventos_operativosInput | Prisma.evento_casoCreateOrConnectWithoutEventos_operativosInput[];
    createMany?: Prisma.evento_casoCreateManyEventos_operativosInputEnvelope;
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
};
export type evento_casoUncheckedCreateNestedManyWithoutEventos_operativosInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutEventos_operativosInput, Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput> | Prisma.evento_casoCreateWithoutEventos_operativosInput[] | Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutEventos_operativosInput | Prisma.evento_casoCreateOrConnectWithoutEventos_operativosInput[];
    createMany?: Prisma.evento_casoCreateManyEventos_operativosInputEnvelope;
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
};
export type evento_casoUpdateManyWithoutEventos_operativosNestedInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutEventos_operativosInput, Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput> | Prisma.evento_casoCreateWithoutEventos_operativosInput[] | Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutEventos_operativosInput | Prisma.evento_casoCreateOrConnectWithoutEventos_operativosInput[];
    upsert?: Prisma.evento_casoUpsertWithWhereUniqueWithoutEventos_operativosInput | Prisma.evento_casoUpsertWithWhereUniqueWithoutEventos_operativosInput[];
    createMany?: Prisma.evento_casoCreateManyEventos_operativosInputEnvelope;
    set?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    disconnect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    delete?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    update?: Prisma.evento_casoUpdateWithWhereUniqueWithoutEventos_operativosInput | Prisma.evento_casoUpdateWithWhereUniqueWithoutEventos_operativosInput[];
    updateMany?: Prisma.evento_casoUpdateManyWithWhereWithoutEventos_operativosInput | Prisma.evento_casoUpdateManyWithWhereWithoutEventos_operativosInput[];
    deleteMany?: Prisma.evento_casoScalarWhereInput | Prisma.evento_casoScalarWhereInput[];
};
export type evento_casoUncheckedUpdateManyWithoutEventos_operativosNestedInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutEventos_operativosInput, Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput> | Prisma.evento_casoCreateWithoutEventos_operativosInput[] | Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutEventos_operativosInput | Prisma.evento_casoCreateOrConnectWithoutEventos_operativosInput[];
    upsert?: Prisma.evento_casoUpsertWithWhereUniqueWithoutEventos_operativosInput | Prisma.evento_casoUpsertWithWhereUniqueWithoutEventos_operativosInput[];
    createMany?: Prisma.evento_casoCreateManyEventos_operativosInputEnvelope;
    set?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    disconnect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    delete?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    update?: Prisma.evento_casoUpdateWithWhereUniqueWithoutEventos_operativosInput | Prisma.evento_casoUpdateWithWhereUniqueWithoutEventos_operativosInput[];
    updateMany?: Prisma.evento_casoUpdateManyWithWhereWithoutEventos_operativosInput | Prisma.evento_casoUpdateManyWithWhereWithoutEventos_operativosInput[];
    deleteMany?: Prisma.evento_casoScalarWhereInput | Prisma.evento_casoScalarWhereInput[];
};
export type evento_casoCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutUsuariosInput, Prisma.evento_casoUncheckedCreateWithoutUsuariosInput> | Prisma.evento_casoCreateWithoutUsuariosInput[] | Prisma.evento_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutUsuariosInput | Prisma.evento_casoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.evento_casoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
};
export type evento_casoUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutUsuariosInput, Prisma.evento_casoUncheckedCreateWithoutUsuariosInput> | Prisma.evento_casoCreateWithoutUsuariosInput[] | Prisma.evento_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutUsuariosInput | Prisma.evento_casoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.evento_casoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
};
export type evento_casoUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutUsuariosInput, Prisma.evento_casoUncheckedCreateWithoutUsuariosInput> | Prisma.evento_casoCreateWithoutUsuariosInput[] | Prisma.evento_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutUsuariosInput | Prisma.evento_casoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.evento_casoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.evento_casoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.evento_casoCreateManyUsuariosInputEnvelope;
    set?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    disconnect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    delete?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    update?: Prisma.evento_casoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.evento_casoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.evento_casoUpdateManyWithWhereWithoutUsuariosInput | Prisma.evento_casoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.evento_casoScalarWhereInput | Prisma.evento_casoScalarWhereInput[];
};
export type evento_casoUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.evento_casoCreateWithoutUsuariosInput, Prisma.evento_casoUncheckedCreateWithoutUsuariosInput> | Prisma.evento_casoCreateWithoutUsuariosInput[] | Prisma.evento_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.evento_casoCreateOrConnectWithoutUsuariosInput | Prisma.evento_casoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.evento_casoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.evento_casoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.evento_casoCreateManyUsuariosInputEnvelope;
    set?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    disconnect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    delete?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    connect?: Prisma.evento_casoWhereUniqueInput | Prisma.evento_casoWhereUniqueInput[];
    update?: Prisma.evento_casoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.evento_casoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.evento_casoUpdateManyWithWhereWithoutUsuariosInput | Prisma.evento_casoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.evento_casoScalarWhereInput | Prisma.evento_casoScalarWhereInput[];
};
export type evento_casoCreateWithoutCasos_sopInput = {
    fecha_conversion?: Date | string | null;
    eventos_operativos: Prisma.eventos_operativosCreateNestedOneWithoutEvento_casoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEvento_casoInput;
};
export type evento_casoUncheckedCreateWithoutCasos_sopInput = {
    id?: number;
    id_evento: number;
    fecha_conversion?: Date | string | null;
    usuario?: number | null;
};
export type evento_casoCreateOrConnectWithoutCasos_sopInput = {
    where: Prisma.evento_casoWhereUniqueInput;
    create: Prisma.XOR<Prisma.evento_casoCreateWithoutCasos_sopInput, Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput>;
};
export type evento_casoCreateManyCasos_sopInputEnvelope = {
    data: Prisma.evento_casoCreateManyCasos_sopInput | Prisma.evento_casoCreateManyCasos_sopInput[];
    skipDuplicates?: boolean;
};
export type evento_casoUpsertWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.evento_casoWhereUniqueInput;
    update: Prisma.XOR<Prisma.evento_casoUpdateWithoutCasos_sopInput, Prisma.evento_casoUncheckedUpdateWithoutCasos_sopInput>;
    create: Prisma.XOR<Prisma.evento_casoCreateWithoutCasos_sopInput, Prisma.evento_casoUncheckedCreateWithoutCasos_sopInput>;
};
export type evento_casoUpdateWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.evento_casoWhereUniqueInput;
    data: Prisma.XOR<Prisma.evento_casoUpdateWithoutCasos_sopInput, Prisma.evento_casoUncheckedUpdateWithoutCasos_sopInput>;
};
export type evento_casoUpdateManyWithWhereWithoutCasos_sopInput = {
    where: Prisma.evento_casoScalarWhereInput;
    data: Prisma.XOR<Prisma.evento_casoUpdateManyMutationInput, Prisma.evento_casoUncheckedUpdateManyWithoutCasos_sopInput>;
};
export type evento_casoScalarWhereInput = {
    AND?: Prisma.evento_casoScalarWhereInput | Prisma.evento_casoScalarWhereInput[];
    OR?: Prisma.evento_casoScalarWhereInput[];
    NOT?: Prisma.evento_casoScalarWhereInput | Prisma.evento_casoScalarWhereInput[];
    id?: Prisma.IntFilter<"evento_caso"> | number;
    id_evento?: Prisma.IntFilter<"evento_caso"> | number;
    id_caso?: Prisma.IntFilter<"evento_caso"> | number;
    fecha_conversion?: Prisma.DateTimeNullableFilter<"evento_caso"> | Date | string | null;
    usuario?: Prisma.IntNullableFilter<"evento_caso"> | number | null;
};
export type evento_casoCreateWithoutEventos_operativosInput = {
    fecha_conversion?: Date | string | null;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutEvento_casoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEvento_casoInput;
};
export type evento_casoUncheckedCreateWithoutEventos_operativosInput = {
    id?: number;
    id_caso: number;
    fecha_conversion?: Date | string | null;
    usuario?: number | null;
};
export type evento_casoCreateOrConnectWithoutEventos_operativosInput = {
    where: Prisma.evento_casoWhereUniqueInput;
    create: Prisma.XOR<Prisma.evento_casoCreateWithoutEventos_operativosInput, Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput>;
};
export type evento_casoCreateManyEventos_operativosInputEnvelope = {
    data: Prisma.evento_casoCreateManyEventos_operativosInput | Prisma.evento_casoCreateManyEventos_operativosInput[];
    skipDuplicates?: boolean;
};
export type evento_casoUpsertWithWhereUniqueWithoutEventos_operativosInput = {
    where: Prisma.evento_casoWhereUniqueInput;
    update: Prisma.XOR<Prisma.evento_casoUpdateWithoutEventos_operativosInput, Prisma.evento_casoUncheckedUpdateWithoutEventos_operativosInput>;
    create: Prisma.XOR<Prisma.evento_casoCreateWithoutEventos_operativosInput, Prisma.evento_casoUncheckedCreateWithoutEventos_operativosInput>;
};
export type evento_casoUpdateWithWhereUniqueWithoutEventos_operativosInput = {
    where: Prisma.evento_casoWhereUniqueInput;
    data: Prisma.XOR<Prisma.evento_casoUpdateWithoutEventos_operativosInput, Prisma.evento_casoUncheckedUpdateWithoutEventos_operativosInput>;
};
export type evento_casoUpdateManyWithWhereWithoutEventos_operativosInput = {
    where: Prisma.evento_casoScalarWhereInput;
    data: Prisma.XOR<Prisma.evento_casoUpdateManyMutationInput, Prisma.evento_casoUncheckedUpdateManyWithoutEventos_operativosInput>;
};
export type evento_casoCreateWithoutUsuariosInput = {
    fecha_conversion?: Date | string | null;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutEvento_casoInput;
    eventos_operativos: Prisma.eventos_operativosCreateNestedOneWithoutEvento_casoInput;
};
export type evento_casoUncheckedCreateWithoutUsuariosInput = {
    id?: number;
    id_evento: number;
    id_caso: number;
    fecha_conversion?: Date | string | null;
};
export type evento_casoCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.evento_casoWhereUniqueInput;
    create: Prisma.XOR<Prisma.evento_casoCreateWithoutUsuariosInput, Prisma.evento_casoUncheckedCreateWithoutUsuariosInput>;
};
export type evento_casoCreateManyUsuariosInputEnvelope = {
    data: Prisma.evento_casoCreateManyUsuariosInput | Prisma.evento_casoCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type evento_casoUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.evento_casoWhereUniqueInput;
    update: Prisma.XOR<Prisma.evento_casoUpdateWithoutUsuariosInput, Prisma.evento_casoUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.evento_casoCreateWithoutUsuariosInput, Prisma.evento_casoUncheckedCreateWithoutUsuariosInput>;
};
export type evento_casoUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.evento_casoWhereUniqueInput;
    data: Prisma.XOR<Prisma.evento_casoUpdateWithoutUsuariosInput, Prisma.evento_casoUncheckedUpdateWithoutUsuariosInput>;
};
export type evento_casoUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.evento_casoScalarWhereInput;
    data: Prisma.XOR<Prisma.evento_casoUpdateManyMutationInput, Prisma.evento_casoUncheckedUpdateManyWithoutUsuariosInput>;
};
export type evento_casoCreateManyCasos_sopInput = {
    id?: number;
    id_evento: number;
    fecha_conversion?: Date | string | null;
    usuario?: number | null;
};
export type evento_casoUpdateWithoutCasos_sopInput = {
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eventos_operativos?: Prisma.eventos_operativosUpdateOneRequiredWithoutEvento_casoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEvento_casoNestedInput;
};
export type evento_casoUncheckedUpdateWithoutCasos_sopInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type evento_casoUncheckedUpdateManyWithoutCasos_sopInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type evento_casoCreateManyEventos_operativosInput = {
    id?: number;
    id_caso: number;
    fecha_conversion?: Date | string | null;
    usuario?: number | null;
};
export type evento_casoUpdateWithoutEventos_operativosInput = {
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutEvento_casoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEvento_casoNestedInput;
};
export type evento_casoUncheckedUpdateWithoutEventos_operativosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type evento_casoUncheckedUpdateManyWithoutEventos_operativosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type evento_casoCreateManyUsuariosInput = {
    id?: number;
    id_evento: number;
    id_caso: number;
    fecha_conversion?: Date | string | null;
};
export type evento_casoUpdateWithoutUsuariosInput = {
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutEvento_casoNestedInput;
    eventos_operativos?: Prisma.eventos_operativosUpdateOneRequiredWithoutEvento_casoNestedInput;
};
export type evento_casoUncheckedUpdateWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evento_casoUncheckedUpdateManyWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_conversion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evento_casoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    id_evento?: boolean;
    id_caso?: boolean;
    fecha_conversion?: boolean;
    usuario?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evento_caso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["evento_caso"]>;
export type evento_casoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    id_evento?: boolean;
    id_caso?: boolean;
    fecha_conversion?: boolean;
    usuario?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evento_caso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["evento_caso"]>;
export type evento_casoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    id_evento?: boolean;
    id_caso?: boolean;
    fecha_conversion?: boolean;
    usuario?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evento_caso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["evento_caso"]>;
export type evento_casoSelectScalar = {
    id?: boolean;
    id_evento?: boolean;
    id_caso?: boolean;
    fecha_conversion?: boolean;
    usuario?: boolean;
};
export type evento_casoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "id_evento" | "id_caso" | "fecha_conversion" | "usuario", ExtArgs["result"]["evento_caso"]>;
export type evento_casoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evento_caso$usuariosArgs<ExtArgs>;
};
export type evento_casoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evento_caso$usuariosArgs<ExtArgs>;
};
export type evento_casoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evento_caso$usuariosArgs<ExtArgs>;
};
export type $evento_casoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "evento_caso";
    objects: {
        casos_sop: Prisma.$casos_sopPayload<ExtArgs>;
        eventos_operativos: Prisma.$eventos_operativosPayload<ExtArgs>;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        id_evento: number;
        id_caso: number;
        fecha_conversion: Date | null;
        usuario: number | null;
    }, ExtArgs["result"]["evento_caso"]>;
    composites: {};
};
export type evento_casoGetPayload<S extends boolean | null | undefined | evento_casoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$evento_casoPayload, S>;
export type evento_casoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<evento_casoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Evento_casoCountAggregateInputType | true;
};
export interface evento_casoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['evento_caso'];
        meta: {
            name: 'evento_caso';
        };
    };
    /**
     * Find zero or one Evento_caso that matches the filter.
     * @param {evento_casoFindUniqueArgs} args - Arguments to find a Evento_caso
     * @example
     * // Get one Evento_caso
     * const evento_caso = await prisma.evento_caso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends evento_casoFindUniqueArgs>(args: Prisma.SelectSubset<T, evento_casoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__evento_casoClient<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Evento_caso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {evento_casoFindUniqueOrThrowArgs} args - Arguments to find a Evento_caso
     * @example
     * // Get one Evento_caso
     * const evento_caso = await prisma.evento_caso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends evento_casoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, evento_casoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__evento_casoClient<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Evento_caso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evento_casoFindFirstArgs} args - Arguments to find a Evento_caso
     * @example
     * // Get one Evento_caso
     * const evento_caso = await prisma.evento_caso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends evento_casoFindFirstArgs>(args?: Prisma.SelectSubset<T, evento_casoFindFirstArgs<ExtArgs>>): Prisma.Prisma__evento_casoClient<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Evento_caso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evento_casoFindFirstOrThrowArgs} args - Arguments to find a Evento_caso
     * @example
     * // Get one Evento_caso
     * const evento_caso = await prisma.evento_caso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends evento_casoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, evento_casoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__evento_casoClient<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Evento_casos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evento_casoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Evento_casos
     * const evento_casos = await prisma.evento_caso.findMany()
     *
     * // Get first 10 Evento_casos
     * const evento_casos = await prisma.evento_caso.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const evento_casoWithIdOnly = await prisma.evento_caso.findMany({ select: { id: true } })
     *
     */
    findMany<T extends evento_casoFindManyArgs>(args?: Prisma.SelectSubset<T, evento_casoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Evento_caso.
     * @param {evento_casoCreateArgs} args - Arguments to create a Evento_caso.
     * @example
     * // Create one Evento_caso
     * const Evento_caso = await prisma.evento_caso.create({
     *   data: {
     *     // ... data to create a Evento_caso
     *   }
     * })
     *
     */
    create<T extends evento_casoCreateArgs>(args: Prisma.SelectSubset<T, evento_casoCreateArgs<ExtArgs>>): Prisma.Prisma__evento_casoClient<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Evento_casos.
     * @param {evento_casoCreateManyArgs} args - Arguments to create many Evento_casos.
     * @example
     * // Create many Evento_casos
     * const evento_caso = await prisma.evento_caso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends evento_casoCreateManyArgs>(args?: Prisma.SelectSubset<T, evento_casoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Evento_casos and returns the data saved in the database.
     * @param {evento_casoCreateManyAndReturnArgs} args - Arguments to create many Evento_casos.
     * @example
     * // Create many Evento_casos
     * const evento_caso = await prisma.evento_caso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Evento_casos and only return the `id`
     * const evento_casoWithIdOnly = await prisma.evento_caso.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends evento_casoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, evento_casoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Evento_caso.
     * @param {evento_casoDeleteArgs} args - Arguments to delete one Evento_caso.
     * @example
     * // Delete one Evento_caso
     * const Evento_caso = await prisma.evento_caso.delete({
     *   where: {
     *     // ... filter to delete one Evento_caso
     *   }
     * })
     *
     */
    delete<T extends evento_casoDeleteArgs>(args: Prisma.SelectSubset<T, evento_casoDeleteArgs<ExtArgs>>): Prisma.Prisma__evento_casoClient<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Evento_caso.
     * @param {evento_casoUpdateArgs} args - Arguments to update one Evento_caso.
     * @example
     * // Update one Evento_caso
     * const evento_caso = await prisma.evento_caso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends evento_casoUpdateArgs>(args: Prisma.SelectSubset<T, evento_casoUpdateArgs<ExtArgs>>): Prisma.Prisma__evento_casoClient<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Evento_casos.
     * @param {evento_casoDeleteManyArgs} args - Arguments to filter Evento_casos to delete.
     * @example
     * // Delete a few Evento_casos
     * const { count } = await prisma.evento_caso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends evento_casoDeleteManyArgs>(args?: Prisma.SelectSubset<T, evento_casoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Evento_casos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evento_casoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Evento_casos
     * const evento_caso = await prisma.evento_caso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends evento_casoUpdateManyArgs>(args: Prisma.SelectSubset<T, evento_casoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Evento_casos and returns the data updated in the database.
     * @param {evento_casoUpdateManyAndReturnArgs} args - Arguments to update many Evento_casos.
     * @example
     * // Update many Evento_casos
     * const evento_caso = await prisma.evento_caso.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Evento_casos and only return the `id`
     * const evento_casoWithIdOnly = await prisma.evento_caso.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends evento_casoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, evento_casoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Evento_caso.
     * @param {evento_casoUpsertArgs} args - Arguments to update or create a Evento_caso.
     * @example
     * // Update or create a Evento_caso
     * const evento_caso = await prisma.evento_caso.upsert({
     *   create: {
     *     // ... data to create a Evento_caso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evento_caso we want to update
     *   }
     * })
     */
    upsert<T extends evento_casoUpsertArgs>(args: Prisma.SelectSubset<T, evento_casoUpsertArgs<ExtArgs>>): Prisma.Prisma__evento_casoClient<runtime.Types.Result.GetResult<Prisma.$evento_casoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Evento_casos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evento_casoCountArgs} args - Arguments to filter Evento_casos to count.
     * @example
     * // Count the number of Evento_casos
     * const count = await prisma.evento_caso.count({
     *   where: {
     *     // ... the filter for the Evento_casos we want to count
     *   }
     * })
    **/
    count<T extends evento_casoCountArgs>(args?: Prisma.Subset<T, evento_casoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Evento_casoCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Evento_caso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Evento_casoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Evento_casoAggregateArgs>(args: Prisma.Subset<T, Evento_casoAggregateArgs>): Prisma.PrismaPromise<GetEvento_casoAggregateType<T>>;
    /**
     * Group by Evento_caso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evento_casoGroupByArgs} args - Group by arguments.
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
    groupBy<T extends evento_casoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: evento_casoGroupByArgs['orderBy'];
    } : {
        orderBy?: evento_casoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, evento_casoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvento_casoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the evento_caso model
     */
    readonly fields: evento_casoFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for evento_caso.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__evento_casoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    casos_sop<T extends Prisma.casos_sopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sopDefaultArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    eventos_operativos<T extends Prisma.eventos_operativosDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativosDefaultArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.evento_caso$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.evento_caso$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the evento_caso model
 */
export interface evento_casoFieldRefs {
    readonly id: Prisma.FieldRef<"evento_caso", 'Int'>;
    readonly id_evento: Prisma.FieldRef<"evento_caso", 'Int'>;
    readonly id_caso: Prisma.FieldRef<"evento_caso", 'Int'>;
    readonly fecha_conversion: Prisma.FieldRef<"evento_caso", 'DateTime'>;
    readonly usuario: Prisma.FieldRef<"evento_caso", 'Int'>;
}
/**
 * evento_caso findUnique
 */
export type evento_casoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evento_caso to fetch.
     */
    where: Prisma.evento_casoWhereUniqueInput;
};
/**
 * evento_caso findUniqueOrThrow
 */
export type evento_casoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evento_caso to fetch.
     */
    where: Prisma.evento_casoWhereUniqueInput;
};
/**
 * evento_caso findFirst
 */
export type evento_casoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evento_caso to fetch.
     */
    where?: Prisma.evento_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evento_casos to fetch.
     */
    orderBy?: Prisma.evento_casoOrderByWithRelationInput | Prisma.evento_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for evento_casos.
     */
    cursor?: Prisma.evento_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evento_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evento_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of evento_casos.
     */
    distinct?: Prisma.Evento_casoScalarFieldEnum | Prisma.Evento_casoScalarFieldEnum[];
};
/**
 * evento_caso findFirstOrThrow
 */
export type evento_casoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evento_caso to fetch.
     */
    where?: Prisma.evento_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evento_casos to fetch.
     */
    orderBy?: Prisma.evento_casoOrderByWithRelationInput | Prisma.evento_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for evento_casos.
     */
    cursor?: Prisma.evento_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evento_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evento_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of evento_casos.
     */
    distinct?: Prisma.Evento_casoScalarFieldEnum | Prisma.Evento_casoScalarFieldEnum[];
};
/**
 * evento_caso findMany
 */
export type evento_casoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evento_casos to fetch.
     */
    where?: Prisma.evento_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evento_casos to fetch.
     */
    orderBy?: Prisma.evento_casoOrderByWithRelationInput | Prisma.evento_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing evento_casos.
     */
    cursor?: Prisma.evento_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evento_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evento_casos.
     */
    skip?: number;
    distinct?: Prisma.Evento_casoScalarFieldEnum | Prisma.Evento_casoScalarFieldEnum[];
};
/**
 * evento_caso create
 */
export type evento_casoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a evento_caso.
     */
    data: Prisma.XOR<Prisma.evento_casoCreateInput, Prisma.evento_casoUncheckedCreateInput>;
};
/**
 * evento_caso createMany
 */
export type evento_casoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many evento_casos.
     */
    data: Prisma.evento_casoCreateManyInput | Prisma.evento_casoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * evento_caso createManyAndReturn
 */
export type evento_casoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evento_caso
     */
    select?: Prisma.evento_casoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the evento_caso
     */
    omit?: Prisma.evento_casoOmit<ExtArgs> | null;
    /**
     * The data used to create many evento_casos.
     */
    data: Prisma.evento_casoCreateManyInput | Prisma.evento_casoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evento_casoIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * evento_caso update
 */
export type evento_casoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a evento_caso.
     */
    data: Prisma.XOR<Prisma.evento_casoUpdateInput, Prisma.evento_casoUncheckedUpdateInput>;
    /**
     * Choose, which evento_caso to update.
     */
    where: Prisma.evento_casoWhereUniqueInput;
};
/**
 * evento_caso updateMany
 */
export type evento_casoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update evento_casos.
     */
    data: Prisma.XOR<Prisma.evento_casoUpdateManyMutationInput, Prisma.evento_casoUncheckedUpdateManyInput>;
    /**
     * Filter which evento_casos to update
     */
    where?: Prisma.evento_casoWhereInput;
    /**
     * Limit how many evento_casos to update.
     */
    limit?: number;
};
/**
 * evento_caso updateManyAndReturn
 */
export type evento_casoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evento_caso
     */
    select?: Prisma.evento_casoSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the evento_caso
     */
    omit?: Prisma.evento_casoOmit<ExtArgs> | null;
    /**
     * The data used to update evento_casos.
     */
    data: Prisma.XOR<Prisma.evento_casoUpdateManyMutationInput, Prisma.evento_casoUncheckedUpdateManyInput>;
    /**
     * Filter which evento_casos to update
     */
    where?: Prisma.evento_casoWhereInput;
    /**
     * Limit how many evento_casos to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evento_casoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * evento_caso upsert
 */
export type evento_casoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the evento_caso to update in case it exists.
     */
    where: Prisma.evento_casoWhereUniqueInput;
    /**
     * In case the evento_caso found by the `where` argument doesn't exist, create a new evento_caso with this data.
     */
    create: Prisma.XOR<Prisma.evento_casoCreateInput, Prisma.evento_casoUncheckedCreateInput>;
    /**
     * In case the evento_caso was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.evento_casoUpdateInput, Prisma.evento_casoUncheckedUpdateInput>;
};
/**
 * evento_caso delete
 */
export type evento_casoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which evento_caso to delete.
     */
    where: Prisma.evento_casoWhereUniqueInput;
};
/**
 * evento_caso deleteMany
 */
export type evento_casoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which evento_casos to delete
     */
    where?: Prisma.evento_casoWhereInput;
    /**
     * Limit how many evento_casos to delete.
     */
    limit?: number;
};
/**
 * evento_caso.usuarios
 */
export type evento_caso$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * evento_caso without action
 */
export type evento_casoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=evento_caso.d.ts.map