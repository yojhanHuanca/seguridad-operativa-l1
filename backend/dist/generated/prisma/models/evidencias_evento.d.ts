import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model evidencias_evento
 *
 */
export type evidencias_eventoModel = runtime.Types.Result.DefaultSelection<Prisma.$evidencias_eventoPayload>;
export type AggregateEvidencias_evento = {
    _count: Evidencias_eventoCountAggregateOutputType | null;
    _avg: Evidencias_eventoAvgAggregateOutputType | null;
    _sum: Evidencias_eventoSumAggregateOutputType | null;
    _min: Evidencias_eventoMinAggregateOutputType | null;
    _max: Evidencias_eventoMaxAggregateOutputType | null;
};
export type Evidencias_eventoAvgAggregateOutputType = {
    id_evidencia: number | null;
    id_evento: number | null;
    peso: runtime.Decimal | null;
    usuario: number | null;
};
export type Evidencias_eventoSumAggregateOutputType = {
    id_evidencia: number | null;
    id_evento: number | null;
    peso: runtime.Decimal | null;
    usuario: number | null;
};
export type Evidencias_eventoMinAggregateOutputType = {
    id_evidencia: number | null;
    id_evento: number | null;
    nombre_archivo: string | null;
    ruta_archivo: string | null;
    tipo_archivo: string | null;
    peso: runtime.Decimal | null;
    usuario: number | null;
    fecha_subida: Date | null;
};
export type Evidencias_eventoMaxAggregateOutputType = {
    id_evidencia: number | null;
    id_evento: number | null;
    nombre_archivo: string | null;
    ruta_archivo: string | null;
    tipo_archivo: string | null;
    peso: runtime.Decimal | null;
    usuario: number | null;
    fecha_subida: Date | null;
};
export type Evidencias_eventoCountAggregateOutputType = {
    id_evidencia: number;
    id_evento: number;
    nombre_archivo: number;
    ruta_archivo: number;
    tipo_archivo: number;
    peso: number;
    usuario: number;
    fecha_subida: number;
    _all: number;
};
export type Evidencias_eventoAvgAggregateInputType = {
    id_evidencia?: true;
    id_evento?: true;
    peso?: true;
    usuario?: true;
};
export type Evidencias_eventoSumAggregateInputType = {
    id_evidencia?: true;
    id_evento?: true;
    peso?: true;
    usuario?: true;
};
export type Evidencias_eventoMinAggregateInputType = {
    id_evidencia?: true;
    id_evento?: true;
    nombre_archivo?: true;
    ruta_archivo?: true;
    tipo_archivo?: true;
    peso?: true;
    usuario?: true;
    fecha_subida?: true;
};
export type Evidencias_eventoMaxAggregateInputType = {
    id_evidencia?: true;
    id_evento?: true;
    nombre_archivo?: true;
    ruta_archivo?: true;
    tipo_archivo?: true;
    peso?: true;
    usuario?: true;
    fecha_subida?: true;
};
export type Evidencias_eventoCountAggregateInputType = {
    id_evidencia?: true;
    id_evento?: true;
    nombre_archivo?: true;
    ruta_archivo?: true;
    tipo_archivo?: true;
    peso?: true;
    usuario?: true;
    fecha_subida?: true;
    _all?: true;
};
export type Evidencias_eventoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which evidencias_evento to aggregate.
     */
    where?: Prisma.evidencias_eventoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evidencias_eventos to fetch.
     */
    orderBy?: Prisma.evidencias_eventoOrderByWithRelationInput | Prisma.evidencias_eventoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.evidencias_eventoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evidencias_eventos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evidencias_eventos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned evidencias_eventos
    **/
    _count?: true | Evidencias_eventoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Evidencias_eventoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Evidencias_eventoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Evidencias_eventoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Evidencias_eventoMaxAggregateInputType;
};
export type GetEvidencias_eventoAggregateType<T extends Evidencias_eventoAggregateArgs> = {
    [P in keyof T & keyof AggregateEvidencias_evento]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEvidencias_evento[P]> : Prisma.GetScalarType<T[P], AggregateEvidencias_evento[P]>;
};
export type evidencias_eventoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.evidencias_eventoWhereInput;
    orderBy?: Prisma.evidencias_eventoOrderByWithAggregationInput | Prisma.evidencias_eventoOrderByWithAggregationInput[];
    by: Prisma.Evidencias_eventoScalarFieldEnum[] | Prisma.Evidencias_eventoScalarFieldEnum;
    having?: Prisma.evidencias_eventoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Evidencias_eventoCountAggregateInputType | true;
    _avg?: Evidencias_eventoAvgAggregateInputType;
    _sum?: Evidencias_eventoSumAggregateInputType;
    _min?: Evidencias_eventoMinAggregateInputType;
    _max?: Evidencias_eventoMaxAggregateInputType;
};
export type Evidencias_eventoGroupByOutputType = {
    id_evidencia: number;
    id_evento: number;
    nombre_archivo: string | null;
    ruta_archivo: string | null;
    tipo_archivo: string | null;
    peso: runtime.Decimal | null;
    usuario: number | null;
    fecha_subida: Date | null;
    _count: Evidencias_eventoCountAggregateOutputType | null;
    _avg: Evidencias_eventoAvgAggregateOutputType | null;
    _sum: Evidencias_eventoSumAggregateOutputType | null;
    _min: Evidencias_eventoMinAggregateOutputType | null;
    _max: Evidencias_eventoMaxAggregateOutputType | null;
};
type GetEvidencias_eventoGroupByPayload<T extends evidencias_eventoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Evidencias_eventoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Evidencias_eventoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Evidencias_eventoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Evidencias_eventoGroupByOutputType[P]>;
}>>;
export type evidencias_eventoWhereInput = {
    AND?: Prisma.evidencias_eventoWhereInput | Prisma.evidencias_eventoWhereInput[];
    OR?: Prisma.evidencias_eventoWhereInput[];
    NOT?: Prisma.evidencias_eventoWhereInput | Prisma.evidencias_eventoWhereInput[];
    id_evidencia?: Prisma.IntFilter<"evidencias_evento"> | number;
    id_evento?: Prisma.IntFilter<"evidencias_evento"> | number;
    nombre_archivo?: Prisma.StringNullableFilter<"evidencias_evento"> | string | null;
    ruta_archivo?: Prisma.StringNullableFilter<"evidencias_evento"> | string | null;
    tipo_archivo?: Prisma.StringNullableFilter<"evidencias_evento"> | string | null;
    peso?: Prisma.DecimalNullableFilter<"evidencias_evento"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: Prisma.IntNullableFilter<"evidencias_evento"> | number | null;
    fecha_subida?: Prisma.DateTimeNullableFilter<"evidencias_evento"> | Date | string | null;
    eventos_operativos?: Prisma.XOR<Prisma.Eventos_operativosScalarRelationFilter, Prisma.eventos_operativosWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type evidencias_eventoOrderByWithRelationInput = {
    id_evidencia?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    peso?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventos_operativos?: Prisma.eventos_operativosOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type evidencias_eventoWhereUniqueInput = Prisma.AtLeast<{
    id_evidencia?: number;
    AND?: Prisma.evidencias_eventoWhereInput | Prisma.evidencias_eventoWhereInput[];
    OR?: Prisma.evidencias_eventoWhereInput[];
    NOT?: Prisma.evidencias_eventoWhereInput | Prisma.evidencias_eventoWhereInput[];
    id_evento?: Prisma.IntFilter<"evidencias_evento"> | number;
    nombre_archivo?: Prisma.StringNullableFilter<"evidencias_evento"> | string | null;
    ruta_archivo?: Prisma.StringNullableFilter<"evidencias_evento"> | string | null;
    tipo_archivo?: Prisma.StringNullableFilter<"evidencias_evento"> | string | null;
    peso?: Prisma.DecimalNullableFilter<"evidencias_evento"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: Prisma.IntNullableFilter<"evidencias_evento"> | number | null;
    fecha_subida?: Prisma.DateTimeNullableFilter<"evidencias_evento"> | Date | string | null;
    eventos_operativos?: Prisma.XOR<Prisma.Eventos_operativosScalarRelationFilter, Prisma.eventos_operativosWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id_evidencia">;
export type evidencias_eventoOrderByWithAggregationInput = {
    id_evidencia?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    peso?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.evidencias_eventoCountOrderByAggregateInput;
    _avg?: Prisma.evidencias_eventoAvgOrderByAggregateInput;
    _max?: Prisma.evidencias_eventoMaxOrderByAggregateInput;
    _min?: Prisma.evidencias_eventoMinOrderByAggregateInput;
    _sum?: Prisma.evidencias_eventoSumOrderByAggregateInput;
};
export type evidencias_eventoScalarWhereWithAggregatesInput = {
    AND?: Prisma.evidencias_eventoScalarWhereWithAggregatesInput | Prisma.evidencias_eventoScalarWhereWithAggregatesInput[];
    OR?: Prisma.evidencias_eventoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.evidencias_eventoScalarWhereWithAggregatesInput | Prisma.evidencias_eventoScalarWhereWithAggregatesInput[];
    id_evidencia?: Prisma.IntWithAggregatesFilter<"evidencias_evento"> | number;
    id_evento?: Prisma.IntWithAggregatesFilter<"evidencias_evento"> | number;
    nombre_archivo?: Prisma.StringNullableWithAggregatesFilter<"evidencias_evento"> | string | null;
    ruta_archivo?: Prisma.StringNullableWithAggregatesFilter<"evidencias_evento"> | string | null;
    tipo_archivo?: Prisma.StringNullableWithAggregatesFilter<"evidencias_evento"> | string | null;
    peso?: Prisma.DecimalNullableWithAggregatesFilter<"evidencias_evento"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: Prisma.IntNullableWithAggregatesFilter<"evidencias_evento"> | number | null;
    fecha_subida?: Prisma.DateTimeNullableWithAggregatesFilter<"evidencias_evento"> | Date | string | null;
};
export type evidencias_eventoCreateInput = {
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    eventos_operativos: Prisma.eventos_operativosCreateNestedOneWithoutEvidencias_eventoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEvidencias_eventoInput;
};
export type evidencias_eventoUncheckedCreateInput = {
    id_evidencia?: number;
    id_evento: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: number | null;
    fecha_subida?: Date | string | null;
};
export type evidencias_eventoUpdateInput = {
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eventos_operativos?: Prisma.eventos_operativosUpdateOneRequiredWithoutEvidencias_eventoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutEvidencias_eventoNestedInput;
};
export type evidencias_eventoUncheckedUpdateInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidencias_eventoCreateManyInput = {
    id_evidencia?: number;
    id_evento: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: number | null;
    fecha_subida?: Date | string | null;
};
export type evidencias_eventoUpdateManyMutationInput = {
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidencias_eventoUncheckedUpdateManyInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Evidencias_eventoListRelationFilter = {
    every?: Prisma.evidencias_eventoWhereInput;
    some?: Prisma.evidencias_eventoWhereInput;
    none?: Prisma.evidencias_eventoWhereInput;
};
export type evidencias_eventoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type evidencias_eventoCountOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrder;
};
export type evidencias_eventoAvgOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type evidencias_eventoMaxOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrder;
};
export type evidencias_eventoMinOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrder;
};
export type evidencias_eventoSumOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_evento?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type evidencias_eventoCreateNestedManyWithoutEventos_operativosInput = {
    create?: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutEventos_operativosInput, Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput> | Prisma.evidencias_eventoCreateWithoutEventos_operativosInput[] | Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput[];
    connectOrCreate?: Prisma.evidencias_eventoCreateOrConnectWithoutEventos_operativosInput | Prisma.evidencias_eventoCreateOrConnectWithoutEventos_operativosInput[];
    createMany?: Prisma.evidencias_eventoCreateManyEventos_operativosInputEnvelope;
    connect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
};
export type evidencias_eventoUncheckedCreateNestedManyWithoutEventos_operativosInput = {
    create?: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutEventos_operativosInput, Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput> | Prisma.evidencias_eventoCreateWithoutEventos_operativosInput[] | Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput[];
    connectOrCreate?: Prisma.evidencias_eventoCreateOrConnectWithoutEventos_operativosInput | Prisma.evidencias_eventoCreateOrConnectWithoutEventos_operativosInput[];
    createMany?: Prisma.evidencias_eventoCreateManyEventos_operativosInputEnvelope;
    connect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
};
export type evidencias_eventoUpdateManyWithoutEventos_operativosNestedInput = {
    create?: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutEventos_operativosInput, Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput> | Prisma.evidencias_eventoCreateWithoutEventos_operativosInput[] | Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput[];
    connectOrCreate?: Prisma.evidencias_eventoCreateOrConnectWithoutEventos_operativosInput | Prisma.evidencias_eventoCreateOrConnectWithoutEventos_operativosInput[];
    upsert?: Prisma.evidencias_eventoUpsertWithWhereUniqueWithoutEventos_operativosInput | Prisma.evidencias_eventoUpsertWithWhereUniqueWithoutEventos_operativosInput[];
    createMany?: Prisma.evidencias_eventoCreateManyEventos_operativosInputEnvelope;
    set?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    disconnect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    delete?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    connect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    update?: Prisma.evidencias_eventoUpdateWithWhereUniqueWithoutEventos_operativosInput | Prisma.evidencias_eventoUpdateWithWhereUniqueWithoutEventos_operativosInput[];
    updateMany?: Prisma.evidencias_eventoUpdateManyWithWhereWithoutEventos_operativosInput | Prisma.evidencias_eventoUpdateManyWithWhereWithoutEventos_operativosInput[];
    deleteMany?: Prisma.evidencias_eventoScalarWhereInput | Prisma.evidencias_eventoScalarWhereInput[];
};
export type evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosNestedInput = {
    create?: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutEventos_operativosInput, Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput> | Prisma.evidencias_eventoCreateWithoutEventos_operativosInput[] | Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput[];
    connectOrCreate?: Prisma.evidencias_eventoCreateOrConnectWithoutEventos_operativosInput | Prisma.evidencias_eventoCreateOrConnectWithoutEventos_operativosInput[];
    upsert?: Prisma.evidencias_eventoUpsertWithWhereUniqueWithoutEventos_operativosInput | Prisma.evidencias_eventoUpsertWithWhereUniqueWithoutEventos_operativosInput[];
    createMany?: Prisma.evidencias_eventoCreateManyEventos_operativosInputEnvelope;
    set?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    disconnect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    delete?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    connect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    update?: Prisma.evidencias_eventoUpdateWithWhereUniqueWithoutEventos_operativosInput | Prisma.evidencias_eventoUpdateWithWhereUniqueWithoutEventos_operativosInput[];
    updateMany?: Prisma.evidencias_eventoUpdateManyWithWhereWithoutEventos_operativosInput | Prisma.evidencias_eventoUpdateManyWithWhereWithoutEventos_operativosInput[];
    deleteMany?: Prisma.evidencias_eventoScalarWhereInput | Prisma.evidencias_eventoScalarWhereInput[];
};
export type evidencias_eventoCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutUsuariosInput, Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput> | Prisma.evidencias_eventoCreateWithoutUsuariosInput[] | Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.evidencias_eventoCreateOrConnectWithoutUsuariosInput | Prisma.evidencias_eventoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.evidencias_eventoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
};
export type evidencias_eventoUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutUsuariosInput, Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput> | Prisma.evidencias_eventoCreateWithoutUsuariosInput[] | Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.evidencias_eventoCreateOrConnectWithoutUsuariosInput | Prisma.evidencias_eventoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.evidencias_eventoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
};
export type evidencias_eventoUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutUsuariosInput, Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput> | Prisma.evidencias_eventoCreateWithoutUsuariosInput[] | Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.evidencias_eventoCreateOrConnectWithoutUsuariosInput | Prisma.evidencias_eventoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.evidencias_eventoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.evidencias_eventoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.evidencias_eventoCreateManyUsuariosInputEnvelope;
    set?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    disconnect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    delete?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    connect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    update?: Prisma.evidencias_eventoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.evidencias_eventoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.evidencias_eventoUpdateManyWithWhereWithoutUsuariosInput | Prisma.evidencias_eventoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.evidencias_eventoScalarWhereInput | Prisma.evidencias_eventoScalarWhereInput[];
};
export type evidencias_eventoUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutUsuariosInput, Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput> | Prisma.evidencias_eventoCreateWithoutUsuariosInput[] | Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.evidencias_eventoCreateOrConnectWithoutUsuariosInput | Prisma.evidencias_eventoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.evidencias_eventoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.evidencias_eventoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.evidencias_eventoCreateManyUsuariosInputEnvelope;
    set?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    disconnect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    delete?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    connect?: Prisma.evidencias_eventoWhereUniqueInput | Prisma.evidencias_eventoWhereUniqueInput[];
    update?: Prisma.evidencias_eventoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.evidencias_eventoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.evidencias_eventoUpdateManyWithWhereWithoutUsuariosInput | Prisma.evidencias_eventoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.evidencias_eventoScalarWhereInput | Prisma.evidencias_eventoScalarWhereInput[];
};
export type evidencias_eventoCreateWithoutEventos_operativosInput = {
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutEvidencias_eventoInput;
};
export type evidencias_eventoUncheckedCreateWithoutEventos_operativosInput = {
    id_evidencia?: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: number | null;
    fecha_subida?: Date | string | null;
};
export type evidencias_eventoCreateOrConnectWithoutEventos_operativosInput = {
    where: Prisma.evidencias_eventoWhereUniqueInput;
    create: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutEventos_operativosInput, Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput>;
};
export type evidencias_eventoCreateManyEventos_operativosInputEnvelope = {
    data: Prisma.evidencias_eventoCreateManyEventos_operativosInput | Prisma.evidencias_eventoCreateManyEventos_operativosInput[];
    skipDuplicates?: boolean;
};
export type evidencias_eventoUpsertWithWhereUniqueWithoutEventos_operativosInput = {
    where: Prisma.evidencias_eventoWhereUniqueInput;
    update: Prisma.XOR<Prisma.evidencias_eventoUpdateWithoutEventos_operativosInput, Prisma.evidencias_eventoUncheckedUpdateWithoutEventos_operativosInput>;
    create: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutEventos_operativosInput, Prisma.evidencias_eventoUncheckedCreateWithoutEventos_operativosInput>;
};
export type evidencias_eventoUpdateWithWhereUniqueWithoutEventos_operativosInput = {
    where: Prisma.evidencias_eventoWhereUniqueInput;
    data: Prisma.XOR<Prisma.evidencias_eventoUpdateWithoutEventos_operativosInput, Prisma.evidencias_eventoUncheckedUpdateWithoutEventos_operativosInput>;
};
export type evidencias_eventoUpdateManyWithWhereWithoutEventos_operativosInput = {
    where: Prisma.evidencias_eventoScalarWhereInput;
    data: Prisma.XOR<Prisma.evidencias_eventoUpdateManyMutationInput, Prisma.evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosInput>;
};
export type evidencias_eventoScalarWhereInput = {
    AND?: Prisma.evidencias_eventoScalarWhereInput | Prisma.evidencias_eventoScalarWhereInput[];
    OR?: Prisma.evidencias_eventoScalarWhereInput[];
    NOT?: Prisma.evidencias_eventoScalarWhereInput | Prisma.evidencias_eventoScalarWhereInput[];
    id_evidencia?: Prisma.IntFilter<"evidencias_evento"> | number;
    id_evento?: Prisma.IntFilter<"evidencias_evento"> | number;
    nombre_archivo?: Prisma.StringNullableFilter<"evidencias_evento"> | string | null;
    ruta_archivo?: Prisma.StringNullableFilter<"evidencias_evento"> | string | null;
    tipo_archivo?: Prisma.StringNullableFilter<"evidencias_evento"> | string | null;
    peso?: Prisma.DecimalNullableFilter<"evidencias_evento"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: Prisma.IntNullableFilter<"evidencias_evento"> | number | null;
    fecha_subida?: Prisma.DateTimeNullableFilter<"evidencias_evento"> | Date | string | null;
};
export type evidencias_eventoCreateWithoutUsuariosInput = {
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    eventos_operativos: Prisma.eventos_operativosCreateNestedOneWithoutEvidencias_eventoInput;
};
export type evidencias_eventoUncheckedCreateWithoutUsuariosInput = {
    id_evidencia?: number;
    id_evento: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
};
export type evidencias_eventoCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.evidencias_eventoWhereUniqueInput;
    create: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutUsuariosInput, Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput>;
};
export type evidencias_eventoCreateManyUsuariosInputEnvelope = {
    data: Prisma.evidencias_eventoCreateManyUsuariosInput | Prisma.evidencias_eventoCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type evidencias_eventoUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.evidencias_eventoWhereUniqueInput;
    update: Prisma.XOR<Prisma.evidencias_eventoUpdateWithoutUsuariosInput, Prisma.evidencias_eventoUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.evidencias_eventoCreateWithoutUsuariosInput, Prisma.evidencias_eventoUncheckedCreateWithoutUsuariosInput>;
};
export type evidencias_eventoUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.evidencias_eventoWhereUniqueInput;
    data: Prisma.XOR<Prisma.evidencias_eventoUpdateWithoutUsuariosInput, Prisma.evidencias_eventoUncheckedUpdateWithoutUsuariosInput>;
};
export type evidencias_eventoUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.evidencias_eventoScalarWhereInput;
    data: Prisma.XOR<Prisma.evidencias_eventoUpdateManyMutationInput, Prisma.evidencias_eventoUncheckedUpdateManyWithoutUsuariosInput>;
};
export type evidencias_eventoCreateManyEventos_operativosInput = {
    id_evidencia?: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: number | null;
    fecha_subida?: Date | string | null;
};
export type evidencias_eventoUpdateWithoutEventos_operativosInput = {
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuarios?: Prisma.usuariosUpdateOneWithoutEvidencias_eventoNestedInput;
};
export type evidencias_eventoUncheckedUpdateWithoutEventos_operativosInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidencias_eventoUncheckedUpdateManyWithoutEventos_operativosInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidencias_eventoCreateManyUsuariosInput = {
    id_evidencia?: number;
    id_evento: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
};
export type evidencias_eventoUpdateWithoutUsuariosInput = {
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eventos_operativos?: Prisma.eventos_operativosUpdateOneRequiredWithoutEvidencias_eventoNestedInput;
};
export type evidencias_eventoUncheckedUpdateWithoutUsuariosInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidencias_eventoUncheckedUpdateManyWithoutUsuariosInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    id_evento?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidencias_eventoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evidencia?: boolean;
    id_evento?: boolean;
    nombre_archivo?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    peso?: boolean;
    usuario?: boolean;
    fecha_subida?: boolean;
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evidencias_evento$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["evidencias_evento"]>;
export type evidencias_eventoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evidencia?: boolean;
    id_evento?: boolean;
    nombre_archivo?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    peso?: boolean;
    usuario?: boolean;
    fecha_subida?: boolean;
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evidencias_evento$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["evidencias_evento"]>;
export type evidencias_eventoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evidencia?: boolean;
    id_evento?: boolean;
    nombre_archivo?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    peso?: boolean;
    usuario?: boolean;
    fecha_subida?: boolean;
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evidencias_evento$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["evidencias_evento"]>;
export type evidencias_eventoSelectScalar = {
    id_evidencia?: boolean;
    id_evento?: boolean;
    nombre_archivo?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    peso?: boolean;
    usuario?: boolean;
    fecha_subida?: boolean;
};
export type evidencias_eventoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_evidencia" | "id_evento" | "nombre_archivo" | "ruta_archivo" | "tipo_archivo" | "peso" | "usuario" | "fecha_subida", ExtArgs["result"]["evidencias_evento"]>;
export type evidencias_eventoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evidencias_evento$usuariosArgs<ExtArgs>;
};
export type evidencias_eventoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evidencias_evento$usuariosArgs<ExtArgs>;
};
export type evidencias_eventoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    eventos_operativos?: boolean | Prisma.eventos_operativosDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.evidencias_evento$usuariosArgs<ExtArgs>;
};
export type $evidencias_eventoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "evidencias_evento";
    objects: {
        eventos_operativos: Prisma.$eventos_operativosPayload<ExtArgs>;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_evidencia: number;
        id_evento: number;
        nombre_archivo: string | null;
        ruta_archivo: string | null;
        tipo_archivo: string | null;
        peso: runtime.Decimal | null;
        usuario: number | null;
        fecha_subida: Date | null;
    }, ExtArgs["result"]["evidencias_evento"]>;
    composites: {};
};
export type evidencias_eventoGetPayload<S extends boolean | null | undefined | evidencias_eventoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload, S>;
export type evidencias_eventoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<evidencias_eventoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Evidencias_eventoCountAggregateInputType | true;
};
export interface evidencias_eventoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['evidencias_evento'];
        meta: {
            name: 'evidencias_evento';
        };
    };
    /**
     * Find zero or one Evidencias_evento that matches the filter.
     * @param {evidencias_eventoFindUniqueArgs} args - Arguments to find a Evidencias_evento
     * @example
     * // Get one Evidencias_evento
     * const evidencias_evento = await prisma.evidencias_evento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends evidencias_eventoFindUniqueArgs>(args: Prisma.SelectSubset<T, evidencias_eventoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__evidencias_eventoClient<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Evidencias_evento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {evidencias_eventoFindUniqueOrThrowArgs} args - Arguments to find a Evidencias_evento
     * @example
     * // Get one Evidencias_evento
     * const evidencias_evento = await prisma.evidencias_evento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends evidencias_eventoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, evidencias_eventoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__evidencias_eventoClient<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Evidencias_evento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidencias_eventoFindFirstArgs} args - Arguments to find a Evidencias_evento
     * @example
     * // Get one Evidencias_evento
     * const evidencias_evento = await prisma.evidencias_evento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends evidencias_eventoFindFirstArgs>(args?: Prisma.SelectSubset<T, evidencias_eventoFindFirstArgs<ExtArgs>>): Prisma.Prisma__evidencias_eventoClient<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Evidencias_evento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidencias_eventoFindFirstOrThrowArgs} args - Arguments to find a Evidencias_evento
     * @example
     * // Get one Evidencias_evento
     * const evidencias_evento = await prisma.evidencias_evento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends evidencias_eventoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, evidencias_eventoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__evidencias_eventoClient<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Evidencias_eventos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidencias_eventoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Evidencias_eventos
     * const evidencias_eventos = await prisma.evidencias_evento.findMany()
     *
     * // Get first 10 Evidencias_eventos
     * const evidencias_eventos = await prisma.evidencias_evento.findMany({ take: 10 })
     *
     * // Only select the `id_evidencia`
     * const evidencias_eventoWithId_evidenciaOnly = await prisma.evidencias_evento.findMany({ select: { id_evidencia: true } })
     *
     */
    findMany<T extends evidencias_eventoFindManyArgs>(args?: Prisma.SelectSubset<T, evidencias_eventoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Evidencias_evento.
     * @param {evidencias_eventoCreateArgs} args - Arguments to create a Evidencias_evento.
     * @example
     * // Create one Evidencias_evento
     * const Evidencias_evento = await prisma.evidencias_evento.create({
     *   data: {
     *     // ... data to create a Evidencias_evento
     *   }
     * })
     *
     */
    create<T extends evidencias_eventoCreateArgs>(args: Prisma.SelectSubset<T, evidencias_eventoCreateArgs<ExtArgs>>): Prisma.Prisma__evidencias_eventoClient<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Evidencias_eventos.
     * @param {evidencias_eventoCreateManyArgs} args - Arguments to create many Evidencias_eventos.
     * @example
     * // Create many Evidencias_eventos
     * const evidencias_evento = await prisma.evidencias_evento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends evidencias_eventoCreateManyArgs>(args?: Prisma.SelectSubset<T, evidencias_eventoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Evidencias_eventos and returns the data saved in the database.
     * @param {evidencias_eventoCreateManyAndReturnArgs} args - Arguments to create many Evidencias_eventos.
     * @example
     * // Create many Evidencias_eventos
     * const evidencias_evento = await prisma.evidencias_evento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Evidencias_eventos and only return the `id_evidencia`
     * const evidencias_eventoWithId_evidenciaOnly = await prisma.evidencias_evento.createManyAndReturn({
     *   select: { id_evidencia: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends evidencias_eventoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, evidencias_eventoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Evidencias_evento.
     * @param {evidencias_eventoDeleteArgs} args - Arguments to delete one Evidencias_evento.
     * @example
     * // Delete one Evidencias_evento
     * const Evidencias_evento = await prisma.evidencias_evento.delete({
     *   where: {
     *     // ... filter to delete one Evidencias_evento
     *   }
     * })
     *
     */
    delete<T extends evidencias_eventoDeleteArgs>(args: Prisma.SelectSubset<T, evidencias_eventoDeleteArgs<ExtArgs>>): Prisma.Prisma__evidencias_eventoClient<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Evidencias_evento.
     * @param {evidencias_eventoUpdateArgs} args - Arguments to update one Evidencias_evento.
     * @example
     * // Update one Evidencias_evento
     * const evidencias_evento = await prisma.evidencias_evento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends evidencias_eventoUpdateArgs>(args: Prisma.SelectSubset<T, evidencias_eventoUpdateArgs<ExtArgs>>): Prisma.Prisma__evidencias_eventoClient<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Evidencias_eventos.
     * @param {evidencias_eventoDeleteManyArgs} args - Arguments to filter Evidencias_eventos to delete.
     * @example
     * // Delete a few Evidencias_eventos
     * const { count } = await prisma.evidencias_evento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends evidencias_eventoDeleteManyArgs>(args?: Prisma.SelectSubset<T, evidencias_eventoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Evidencias_eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidencias_eventoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Evidencias_eventos
     * const evidencias_evento = await prisma.evidencias_evento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends evidencias_eventoUpdateManyArgs>(args: Prisma.SelectSubset<T, evidencias_eventoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Evidencias_eventos and returns the data updated in the database.
     * @param {evidencias_eventoUpdateManyAndReturnArgs} args - Arguments to update many Evidencias_eventos.
     * @example
     * // Update many Evidencias_eventos
     * const evidencias_evento = await prisma.evidencias_evento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Evidencias_eventos and only return the `id_evidencia`
     * const evidencias_eventoWithId_evidenciaOnly = await prisma.evidencias_evento.updateManyAndReturn({
     *   select: { id_evidencia: true },
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
    updateManyAndReturn<T extends evidencias_eventoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, evidencias_eventoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Evidencias_evento.
     * @param {evidencias_eventoUpsertArgs} args - Arguments to update or create a Evidencias_evento.
     * @example
     * // Update or create a Evidencias_evento
     * const evidencias_evento = await prisma.evidencias_evento.upsert({
     *   create: {
     *     // ... data to create a Evidencias_evento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evidencias_evento we want to update
     *   }
     * })
     */
    upsert<T extends evidencias_eventoUpsertArgs>(args: Prisma.SelectSubset<T, evidencias_eventoUpsertArgs<ExtArgs>>): Prisma.Prisma__evidencias_eventoClient<runtime.Types.Result.GetResult<Prisma.$evidencias_eventoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Evidencias_eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidencias_eventoCountArgs} args - Arguments to filter Evidencias_eventos to count.
     * @example
     * // Count the number of Evidencias_eventos
     * const count = await prisma.evidencias_evento.count({
     *   where: {
     *     // ... the filter for the Evidencias_eventos we want to count
     *   }
     * })
    **/
    count<T extends evidencias_eventoCountArgs>(args?: Prisma.Subset<T, evidencias_eventoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Evidencias_eventoCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Evidencias_evento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Evidencias_eventoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Evidencias_eventoAggregateArgs>(args: Prisma.Subset<T, Evidencias_eventoAggregateArgs>): Prisma.PrismaPromise<GetEvidencias_eventoAggregateType<T>>;
    /**
     * Group by Evidencias_evento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidencias_eventoGroupByArgs} args - Group by arguments.
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
    groupBy<T extends evidencias_eventoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: evidencias_eventoGroupByArgs['orderBy'];
    } : {
        orderBy?: evidencias_eventoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, evidencias_eventoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvidencias_eventoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the evidencias_evento model
     */
    readonly fields: evidencias_eventoFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for evidencias_evento.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__evidencias_eventoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    eventos_operativos<T extends Prisma.eventos_operativosDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.eventos_operativosDefaultArgs<ExtArgs>>): Prisma.Prisma__eventos_operativosClient<runtime.Types.Result.GetResult<Prisma.$eventos_operativosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.evidencias_evento$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.evidencias_evento$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the evidencias_evento model
 */
export interface evidencias_eventoFieldRefs {
    readonly id_evidencia: Prisma.FieldRef<"evidencias_evento", 'Int'>;
    readonly id_evento: Prisma.FieldRef<"evidencias_evento", 'Int'>;
    readonly nombre_archivo: Prisma.FieldRef<"evidencias_evento", 'String'>;
    readonly ruta_archivo: Prisma.FieldRef<"evidencias_evento", 'String'>;
    readonly tipo_archivo: Prisma.FieldRef<"evidencias_evento", 'String'>;
    readonly peso: Prisma.FieldRef<"evidencias_evento", 'Decimal'>;
    readonly usuario: Prisma.FieldRef<"evidencias_evento", 'Int'>;
    readonly fecha_subida: Prisma.FieldRef<"evidencias_evento", 'DateTime'>;
}
/**
 * evidencias_evento findUnique
 */
export type evidencias_eventoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evidencias_evento to fetch.
     */
    where: Prisma.evidencias_eventoWhereUniqueInput;
};
/**
 * evidencias_evento findUniqueOrThrow
 */
export type evidencias_eventoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evidencias_evento to fetch.
     */
    where: Prisma.evidencias_eventoWhereUniqueInput;
};
/**
 * evidencias_evento findFirst
 */
export type evidencias_eventoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evidencias_evento to fetch.
     */
    where?: Prisma.evidencias_eventoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evidencias_eventos to fetch.
     */
    orderBy?: Prisma.evidencias_eventoOrderByWithRelationInput | Prisma.evidencias_eventoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for evidencias_eventos.
     */
    cursor?: Prisma.evidencias_eventoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evidencias_eventos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evidencias_eventos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of evidencias_eventos.
     */
    distinct?: Prisma.Evidencias_eventoScalarFieldEnum | Prisma.Evidencias_eventoScalarFieldEnum[];
};
/**
 * evidencias_evento findFirstOrThrow
 */
export type evidencias_eventoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evidencias_evento to fetch.
     */
    where?: Prisma.evidencias_eventoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evidencias_eventos to fetch.
     */
    orderBy?: Prisma.evidencias_eventoOrderByWithRelationInput | Prisma.evidencias_eventoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for evidencias_eventos.
     */
    cursor?: Prisma.evidencias_eventoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evidencias_eventos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evidencias_eventos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of evidencias_eventos.
     */
    distinct?: Prisma.Evidencias_eventoScalarFieldEnum | Prisma.Evidencias_eventoScalarFieldEnum[];
};
/**
 * evidencias_evento findMany
 */
export type evidencias_eventoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which evidencias_eventos to fetch.
     */
    where?: Prisma.evidencias_eventoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evidencias_eventos to fetch.
     */
    orderBy?: Prisma.evidencias_eventoOrderByWithRelationInput | Prisma.evidencias_eventoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing evidencias_eventos.
     */
    cursor?: Prisma.evidencias_eventoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evidencias_eventos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evidencias_eventos.
     */
    skip?: number;
    distinct?: Prisma.Evidencias_eventoScalarFieldEnum | Prisma.Evidencias_eventoScalarFieldEnum[];
};
/**
 * evidencias_evento create
 */
export type evidencias_eventoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a evidencias_evento.
     */
    data: Prisma.XOR<Prisma.evidencias_eventoCreateInput, Prisma.evidencias_eventoUncheckedCreateInput>;
};
/**
 * evidencias_evento createMany
 */
export type evidencias_eventoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many evidencias_eventos.
     */
    data: Prisma.evidencias_eventoCreateManyInput | Prisma.evidencias_eventoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * evidencias_evento createManyAndReturn
 */
export type evidencias_eventoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias_evento
     */
    select?: Prisma.evidencias_eventoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias_evento
     */
    omit?: Prisma.evidencias_eventoOmit<ExtArgs> | null;
    /**
     * The data used to create many evidencias_eventos.
     */
    data: Prisma.evidencias_eventoCreateManyInput | Prisma.evidencias_eventoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidencias_eventoIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * evidencias_evento update
 */
export type evidencias_eventoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a evidencias_evento.
     */
    data: Prisma.XOR<Prisma.evidencias_eventoUpdateInput, Prisma.evidencias_eventoUncheckedUpdateInput>;
    /**
     * Choose, which evidencias_evento to update.
     */
    where: Prisma.evidencias_eventoWhereUniqueInput;
};
/**
 * evidencias_evento updateMany
 */
export type evidencias_eventoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update evidencias_eventos.
     */
    data: Prisma.XOR<Prisma.evidencias_eventoUpdateManyMutationInput, Prisma.evidencias_eventoUncheckedUpdateManyInput>;
    /**
     * Filter which evidencias_eventos to update
     */
    where?: Prisma.evidencias_eventoWhereInput;
    /**
     * Limit how many evidencias_eventos to update.
     */
    limit?: number;
};
/**
 * evidencias_evento updateManyAndReturn
 */
export type evidencias_eventoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias_evento
     */
    select?: Prisma.evidencias_eventoSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias_evento
     */
    omit?: Prisma.evidencias_eventoOmit<ExtArgs> | null;
    /**
     * The data used to update evidencias_eventos.
     */
    data: Prisma.XOR<Prisma.evidencias_eventoUpdateManyMutationInput, Prisma.evidencias_eventoUncheckedUpdateManyInput>;
    /**
     * Filter which evidencias_eventos to update
     */
    where?: Prisma.evidencias_eventoWhereInput;
    /**
     * Limit how many evidencias_eventos to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidencias_eventoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * evidencias_evento upsert
 */
export type evidencias_eventoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the evidencias_evento to update in case it exists.
     */
    where: Prisma.evidencias_eventoWhereUniqueInput;
    /**
     * In case the evidencias_evento found by the `where` argument doesn't exist, create a new evidencias_evento with this data.
     */
    create: Prisma.XOR<Prisma.evidencias_eventoCreateInput, Prisma.evidencias_eventoUncheckedCreateInput>;
    /**
     * In case the evidencias_evento was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.evidencias_eventoUpdateInput, Prisma.evidencias_eventoUncheckedUpdateInput>;
};
/**
 * evidencias_evento delete
 */
export type evidencias_eventoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which evidencias_evento to delete.
     */
    where: Prisma.evidencias_eventoWhereUniqueInput;
};
/**
 * evidencias_evento deleteMany
 */
export type evidencias_eventoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which evidencias_eventos to delete
     */
    where?: Prisma.evidencias_eventoWhereInput;
    /**
     * Limit how many evidencias_eventos to delete.
     */
    limit?: number;
};
/**
 * evidencias_evento.usuarios
 */
export type evidencias_evento$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * evidencias_evento without action
 */
export type evidencias_eventoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=evidencias_evento.d.ts.map