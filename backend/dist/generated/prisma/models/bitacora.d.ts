import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model bitacora
 *
 */
export type bitacoraModel = runtime.Types.Result.DefaultSelection<Prisma.$bitacoraPayload>;
export type AggregateBitacora = {
    _count: BitacoraCountAggregateOutputType | null;
    _avg: BitacoraAvgAggregateOutputType | null;
    _sum: BitacoraSumAggregateOutputType | null;
    _min: BitacoraMinAggregateOutputType | null;
    _max: BitacoraMaxAggregateOutputType | null;
};
export type BitacoraAvgAggregateOutputType = {
    id_bitacora: number | null;
    usuario: number | null;
};
export type BitacoraSumAggregateOutputType = {
    id_bitacora: number | null;
    usuario: number | null;
};
export type BitacoraMinAggregateOutputType = {
    id_bitacora: number | null;
    usuario: number | null;
    modulo: string | null;
    accion: string | null;
    descripcion: string | null;
    fecha: Date | null;
};
export type BitacoraMaxAggregateOutputType = {
    id_bitacora: number | null;
    usuario: number | null;
    modulo: string | null;
    accion: string | null;
    descripcion: string | null;
    fecha: Date | null;
};
export type BitacoraCountAggregateOutputType = {
    id_bitacora: number;
    usuario: number;
    modulo: number;
    accion: number;
    descripcion: number;
    fecha: number;
    datos_previos: number;
    datos_nuevos: number;
    _all: number;
};
export type BitacoraAvgAggregateInputType = {
    id_bitacora?: true;
    usuario?: true;
};
export type BitacoraSumAggregateInputType = {
    id_bitacora?: true;
    usuario?: true;
};
export type BitacoraMinAggregateInputType = {
    id_bitacora?: true;
    usuario?: true;
    modulo?: true;
    accion?: true;
    descripcion?: true;
    fecha?: true;
};
export type BitacoraMaxAggregateInputType = {
    id_bitacora?: true;
    usuario?: true;
    modulo?: true;
    accion?: true;
    descripcion?: true;
    fecha?: true;
};
export type BitacoraCountAggregateInputType = {
    id_bitacora?: true;
    usuario?: true;
    modulo?: true;
    accion?: true;
    descripcion?: true;
    fecha?: true;
    datos_previos?: true;
    datos_nuevos?: true;
    _all?: true;
};
export type BitacoraAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which bitacora to aggregate.
     */
    where?: Prisma.bitacoraWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of bitacoras to fetch.
     */
    orderBy?: Prisma.bitacoraOrderByWithRelationInput | Prisma.bitacoraOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.bitacoraWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` bitacoras from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` bitacoras.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned bitacoras
    **/
    _count?: true | BitacoraCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: BitacoraAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: BitacoraSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: BitacoraMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: BitacoraMaxAggregateInputType;
};
export type GetBitacoraAggregateType<T extends BitacoraAggregateArgs> = {
    [P in keyof T & keyof AggregateBitacora]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBitacora[P]> : Prisma.GetScalarType<T[P], AggregateBitacora[P]>;
};
export type bitacoraGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.bitacoraWhereInput;
    orderBy?: Prisma.bitacoraOrderByWithAggregationInput | Prisma.bitacoraOrderByWithAggregationInput[];
    by: Prisma.BitacoraScalarFieldEnum[] | Prisma.BitacoraScalarFieldEnum;
    having?: Prisma.bitacoraScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BitacoraCountAggregateInputType | true;
    _avg?: BitacoraAvgAggregateInputType;
    _sum?: BitacoraSumAggregateInputType;
    _min?: BitacoraMinAggregateInputType;
    _max?: BitacoraMaxAggregateInputType;
};
export type BitacoraGroupByOutputType = {
    id_bitacora: number;
    usuario: number;
    modulo: string | null;
    accion: string | null;
    descripcion: string | null;
    fecha: Date | null;
    datos_previos: runtime.JsonValue | null;
    datos_nuevos: runtime.JsonValue | null;
    _count: BitacoraCountAggregateOutputType | null;
    _avg: BitacoraAvgAggregateOutputType | null;
    _sum: BitacoraSumAggregateOutputType | null;
    _min: BitacoraMinAggregateOutputType | null;
    _max: BitacoraMaxAggregateOutputType | null;
};
type GetBitacoraGroupByPayload<T extends bitacoraGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BitacoraGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BitacoraGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BitacoraGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BitacoraGroupByOutputType[P]>;
}>>;
export type bitacoraWhereInput = {
    AND?: Prisma.bitacoraWhereInput | Prisma.bitacoraWhereInput[];
    OR?: Prisma.bitacoraWhereInput[];
    NOT?: Prisma.bitacoraWhereInput | Prisma.bitacoraWhereInput[];
    id_bitacora?: Prisma.IntFilter<"bitacora"> | number;
    usuario?: Prisma.IntFilter<"bitacora"> | number;
    modulo?: Prisma.StringNullableFilter<"bitacora"> | string | null;
    accion?: Prisma.StringNullableFilter<"bitacora"> | string | null;
    descripcion?: Prisma.StringNullableFilter<"bitacora"> | string | null;
    fecha?: Prisma.DateTimeNullableFilter<"bitacora"> | Date | string | null;
    datos_previos?: Prisma.JsonNullableFilter<"bitacora">;
    datos_nuevos?: Prisma.JsonNullableFilter<"bitacora">;
    usuarios?: Prisma.XOR<Prisma.UsuariosScalarRelationFilter, Prisma.usuariosWhereInput>;
};
export type bitacoraOrderByWithRelationInput = {
    id_bitacora?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    modulo?: Prisma.SortOrderInput | Prisma.SortOrder;
    accion?: Prisma.SortOrderInput | Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    datos_previos?: Prisma.SortOrderInput | Prisma.SortOrder;
    datos_nuevos?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type bitacoraWhereUniqueInput = Prisma.AtLeast<{
    id_bitacora?: number;
    AND?: Prisma.bitacoraWhereInput | Prisma.bitacoraWhereInput[];
    OR?: Prisma.bitacoraWhereInput[];
    NOT?: Prisma.bitacoraWhereInput | Prisma.bitacoraWhereInput[];
    usuario?: Prisma.IntFilter<"bitacora"> | number;
    modulo?: Prisma.StringNullableFilter<"bitacora"> | string | null;
    accion?: Prisma.StringNullableFilter<"bitacora"> | string | null;
    descripcion?: Prisma.StringNullableFilter<"bitacora"> | string | null;
    fecha?: Prisma.DateTimeNullableFilter<"bitacora"> | Date | string | null;
    datos_previos?: Prisma.JsonNullableFilter<"bitacora">;
    datos_nuevos?: Prisma.JsonNullableFilter<"bitacora">;
    usuarios?: Prisma.XOR<Prisma.UsuariosScalarRelationFilter, Prisma.usuariosWhereInput>;
}, "id_bitacora">;
export type bitacoraOrderByWithAggregationInput = {
    id_bitacora?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    modulo?: Prisma.SortOrderInput | Prisma.SortOrder;
    accion?: Prisma.SortOrderInput | Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    datos_previos?: Prisma.SortOrderInput | Prisma.SortOrder;
    datos_nuevos?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.bitacoraCountOrderByAggregateInput;
    _avg?: Prisma.bitacoraAvgOrderByAggregateInput;
    _max?: Prisma.bitacoraMaxOrderByAggregateInput;
    _min?: Prisma.bitacoraMinOrderByAggregateInput;
    _sum?: Prisma.bitacoraSumOrderByAggregateInput;
};
export type bitacoraScalarWhereWithAggregatesInput = {
    AND?: Prisma.bitacoraScalarWhereWithAggregatesInput | Prisma.bitacoraScalarWhereWithAggregatesInput[];
    OR?: Prisma.bitacoraScalarWhereWithAggregatesInput[];
    NOT?: Prisma.bitacoraScalarWhereWithAggregatesInput | Prisma.bitacoraScalarWhereWithAggregatesInput[];
    id_bitacora?: Prisma.IntWithAggregatesFilter<"bitacora"> | number;
    usuario?: Prisma.IntWithAggregatesFilter<"bitacora"> | number;
    modulo?: Prisma.StringNullableWithAggregatesFilter<"bitacora"> | string | null;
    accion?: Prisma.StringNullableWithAggregatesFilter<"bitacora"> | string | null;
    descripcion?: Prisma.StringNullableWithAggregatesFilter<"bitacora"> | string | null;
    fecha?: Prisma.DateTimeNullableWithAggregatesFilter<"bitacora"> | Date | string | null;
    datos_previos?: Prisma.JsonNullableWithAggregatesFilter<"bitacora">;
    datos_nuevos?: Prisma.JsonNullableWithAggregatesFilter<"bitacora">;
};
export type bitacoraCreateInput = {
    modulo?: string | null;
    accion?: string | null;
    descripcion?: string | null;
    fecha?: Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    usuarios: Prisma.usuariosCreateNestedOneWithoutBitacoraInput;
};
export type bitacoraUncheckedCreateInput = {
    id_bitacora?: number;
    usuario: number;
    modulo?: string | null;
    accion?: string | null;
    descripcion?: string | null;
    fecha?: Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraUpdateInput = {
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    usuarios?: Prisma.usuariosUpdateOneRequiredWithoutBitacoraNestedInput;
};
export type bitacoraUncheckedUpdateInput = {
    id_bitacora?: Prisma.IntFieldUpdateOperationsInput | number;
    usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraCreateManyInput = {
    id_bitacora?: number;
    usuario: number;
    modulo?: string | null;
    accion?: string | null;
    descripcion?: string | null;
    fecha?: Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraUpdateManyMutationInput = {
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraUncheckedUpdateManyInput = {
    id_bitacora?: Prisma.IntFieldUpdateOperationsInput | number;
    usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraCountOrderByAggregateInput = {
    id_bitacora?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    modulo?: Prisma.SortOrder;
    accion?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    datos_previos?: Prisma.SortOrder;
    datos_nuevos?: Prisma.SortOrder;
};
export type bitacoraAvgOrderByAggregateInput = {
    id_bitacora?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type bitacoraMaxOrderByAggregateInput = {
    id_bitacora?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    modulo?: Prisma.SortOrder;
    accion?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
};
export type bitacoraMinOrderByAggregateInput = {
    id_bitacora?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    modulo?: Prisma.SortOrder;
    accion?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
};
export type bitacoraSumOrderByAggregateInput = {
    id_bitacora?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type BitacoraListRelationFilter = {
    every?: Prisma.bitacoraWhereInput;
    some?: Prisma.bitacoraWhereInput;
    none?: Prisma.bitacoraWhereInput;
};
export type bitacoraOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type bitacoraCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.bitacoraCreateWithoutUsuariosInput, Prisma.bitacoraUncheckedCreateWithoutUsuariosInput> | Prisma.bitacoraCreateWithoutUsuariosInput[] | Prisma.bitacoraUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.bitacoraCreateOrConnectWithoutUsuariosInput | Prisma.bitacoraCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.bitacoraCreateManyUsuariosInputEnvelope;
    connect?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
};
export type bitacoraUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.bitacoraCreateWithoutUsuariosInput, Prisma.bitacoraUncheckedCreateWithoutUsuariosInput> | Prisma.bitacoraCreateWithoutUsuariosInput[] | Prisma.bitacoraUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.bitacoraCreateOrConnectWithoutUsuariosInput | Prisma.bitacoraCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.bitacoraCreateManyUsuariosInputEnvelope;
    connect?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
};
export type bitacoraUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.bitacoraCreateWithoutUsuariosInput, Prisma.bitacoraUncheckedCreateWithoutUsuariosInput> | Prisma.bitacoraCreateWithoutUsuariosInput[] | Prisma.bitacoraUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.bitacoraCreateOrConnectWithoutUsuariosInput | Prisma.bitacoraCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.bitacoraUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.bitacoraUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.bitacoraCreateManyUsuariosInputEnvelope;
    set?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
    disconnect?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
    delete?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
    connect?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
    update?: Prisma.bitacoraUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.bitacoraUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.bitacoraUpdateManyWithWhereWithoutUsuariosInput | Prisma.bitacoraUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.bitacoraScalarWhereInput | Prisma.bitacoraScalarWhereInput[];
};
export type bitacoraUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.bitacoraCreateWithoutUsuariosInput, Prisma.bitacoraUncheckedCreateWithoutUsuariosInput> | Prisma.bitacoraCreateWithoutUsuariosInput[] | Prisma.bitacoraUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.bitacoraCreateOrConnectWithoutUsuariosInput | Prisma.bitacoraCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.bitacoraUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.bitacoraUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.bitacoraCreateManyUsuariosInputEnvelope;
    set?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
    disconnect?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
    delete?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
    connect?: Prisma.bitacoraWhereUniqueInput | Prisma.bitacoraWhereUniqueInput[];
    update?: Prisma.bitacoraUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.bitacoraUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.bitacoraUpdateManyWithWhereWithoutUsuariosInput | Prisma.bitacoraUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.bitacoraScalarWhereInput | Prisma.bitacoraScalarWhereInput[];
};
export type bitacoraCreateWithoutUsuariosInput = {
    modulo?: string | null;
    accion?: string | null;
    descripcion?: string | null;
    fecha?: Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraUncheckedCreateWithoutUsuariosInput = {
    id_bitacora?: number;
    modulo?: string | null;
    accion?: string | null;
    descripcion?: string | null;
    fecha?: Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.bitacoraWhereUniqueInput;
    create: Prisma.XOR<Prisma.bitacoraCreateWithoutUsuariosInput, Prisma.bitacoraUncheckedCreateWithoutUsuariosInput>;
};
export type bitacoraCreateManyUsuariosInputEnvelope = {
    data: Prisma.bitacoraCreateManyUsuariosInput | Prisma.bitacoraCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type bitacoraUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.bitacoraWhereUniqueInput;
    update: Prisma.XOR<Prisma.bitacoraUpdateWithoutUsuariosInput, Prisma.bitacoraUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.bitacoraCreateWithoutUsuariosInput, Prisma.bitacoraUncheckedCreateWithoutUsuariosInput>;
};
export type bitacoraUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.bitacoraWhereUniqueInput;
    data: Prisma.XOR<Prisma.bitacoraUpdateWithoutUsuariosInput, Prisma.bitacoraUncheckedUpdateWithoutUsuariosInput>;
};
export type bitacoraUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.bitacoraScalarWhereInput;
    data: Prisma.XOR<Prisma.bitacoraUpdateManyMutationInput, Prisma.bitacoraUncheckedUpdateManyWithoutUsuariosInput>;
};
export type bitacoraScalarWhereInput = {
    AND?: Prisma.bitacoraScalarWhereInput | Prisma.bitacoraScalarWhereInput[];
    OR?: Prisma.bitacoraScalarWhereInput[];
    NOT?: Prisma.bitacoraScalarWhereInput | Prisma.bitacoraScalarWhereInput[];
    id_bitacora?: Prisma.IntFilter<"bitacora"> | number;
    usuario?: Prisma.IntFilter<"bitacora"> | number;
    modulo?: Prisma.StringNullableFilter<"bitacora"> | string | null;
    accion?: Prisma.StringNullableFilter<"bitacora"> | string | null;
    descripcion?: Prisma.StringNullableFilter<"bitacora"> | string | null;
    fecha?: Prisma.DateTimeNullableFilter<"bitacora"> | Date | string | null;
    datos_previos?: Prisma.JsonNullableFilter<"bitacora">;
    datos_nuevos?: Prisma.JsonNullableFilter<"bitacora">;
};
export type bitacoraCreateManyUsuariosInput = {
    id_bitacora?: number;
    modulo?: string | null;
    accion?: string | null;
    descripcion?: string | null;
    fecha?: Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraUpdateWithoutUsuariosInput = {
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraUncheckedUpdateWithoutUsuariosInput = {
    id_bitacora?: Prisma.IntFieldUpdateOperationsInput | number;
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraUncheckedUpdateManyWithoutUsuariosInput = {
    id_bitacora?: Prisma.IntFieldUpdateOperationsInput | number;
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datos_previos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    datos_nuevos?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type bitacoraSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_bitacora?: boolean;
    usuario?: boolean;
    modulo?: boolean;
    accion?: boolean;
    descripcion?: boolean;
    fecha?: boolean;
    datos_previos?: boolean;
    datos_nuevos?: boolean;
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bitacora"]>;
export type bitacoraSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_bitacora?: boolean;
    usuario?: boolean;
    modulo?: boolean;
    accion?: boolean;
    descripcion?: boolean;
    fecha?: boolean;
    datos_previos?: boolean;
    datos_nuevos?: boolean;
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bitacora"]>;
export type bitacoraSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_bitacora?: boolean;
    usuario?: boolean;
    modulo?: boolean;
    accion?: boolean;
    descripcion?: boolean;
    fecha?: boolean;
    datos_previos?: boolean;
    datos_nuevos?: boolean;
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bitacora"]>;
export type bitacoraSelectScalar = {
    id_bitacora?: boolean;
    usuario?: boolean;
    modulo?: boolean;
    accion?: boolean;
    descripcion?: boolean;
    fecha?: boolean;
    datos_previos?: boolean;
    datos_nuevos?: boolean;
};
export type bitacoraOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_bitacora" | "usuario" | "modulo" | "accion" | "descripcion" | "fecha" | "datos_previos" | "datos_nuevos", ExtArgs["result"]["bitacora"]>;
export type bitacoraInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
};
export type bitacoraIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
};
export type bitacoraIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
};
export type $bitacoraPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "bitacora";
    objects: {
        usuarios: Prisma.$usuariosPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_bitacora: number;
        usuario: number;
        modulo: string | null;
        accion: string | null;
        descripcion: string | null;
        fecha: Date | null;
        datos_previos: runtime.JsonValue | null;
        datos_nuevos: runtime.JsonValue | null;
    }, ExtArgs["result"]["bitacora"]>;
    composites: {};
};
export type bitacoraGetPayload<S extends boolean | null | undefined | bitacoraDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$bitacoraPayload, S>;
export type bitacoraCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<bitacoraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BitacoraCountAggregateInputType | true;
};
export interface bitacoraDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['bitacora'];
        meta: {
            name: 'bitacora';
        };
    };
    /**
     * Find zero or one Bitacora that matches the filter.
     * @param {bitacoraFindUniqueArgs} args - Arguments to find a Bitacora
     * @example
     * // Get one Bitacora
     * const bitacora = await prisma.bitacora.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bitacoraFindUniqueArgs>(args: Prisma.SelectSubset<T, bitacoraFindUniqueArgs<ExtArgs>>): Prisma.Prisma__bitacoraClient<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Bitacora that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bitacoraFindUniqueOrThrowArgs} args - Arguments to find a Bitacora
     * @example
     * // Get one Bitacora
     * const bitacora = await prisma.bitacora.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bitacoraFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, bitacoraFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__bitacoraClient<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Bitacora that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bitacoraFindFirstArgs} args - Arguments to find a Bitacora
     * @example
     * // Get one Bitacora
     * const bitacora = await prisma.bitacora.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bitacoraFindFirstArgs>(args?: Prisma.SelectSubset<T, bitacoraFindFirstArgs<ExtArgs>>): Prisma.Prisma__bitacoraClient<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Bitacora that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bitacoraFindFirstOrThrowArgs} args - Arguments to find a Bitacora
     * @example
     * // Get one Bitacora
     * const bitacora = await prisma.bitacora.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bitacoraFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, bitacoraFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__bitacoraClient<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Bitacoras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bitacoraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bitacoras
     * const bitacoras = await prisma.bitacora.findMany()
     *
     * // Get first 10 Bitacoras
     * const bitacoras = await prisma.bitacora.findMany({ take: 10 })
     *
     * // Only select the `id_bitacora`
     * const bitacoraWithId_bitacoraOnly = await prisma.bitacora.findMany({ select: { id_bitacora: true } })
     *
     */
    findMany<T extends bitacoraFindManyArgs>(args?: Prisma.SelectSubset<T, bitacoraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Bitacora.
     * @param {bitacoraCreateArgs} args - Arguments to create a Bitacora.
     * @example
     * // Create one Bitacora
     * const Bitacora = await prisma.bitacora.create({
     *   data: {
     *     // ... data to create a Bitacora
     *   }
     * })
     *
     */
    create<T extends bitacoraCreateArgs>(args: Prisma.SelectSubset<T, bitacoraCreateArgs<ExtArgs>>): Prisma.Prisma__bitacoraClient<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Bitacoras.
     * @param {bitacoraCreateManyArgs} args - Arguments to create many Bitacoras.
     * @example
     * // Create many Bitacoras
     * const bitacora = await prisma.bitacora.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends bitacoraCreateManyArgs>(args?: Prisma.SelectSubset<T, bitacoraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Bitacoras and returns the data saved in the database.
     * @param {bitacoraCreateManyAndReturnArgs} args - Arguments to create many Bitacoras.
     * @example
     * // Create many Bitacoras
     * const bitacora = await prisma.bitacora.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Bitacoras and only return the `id_bitacora`
     * const bitacoraWithId_bitacoraOnly = await prisma.bitacora.createManyAndReturn({
     *   select: { id_bitacora: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends bitacoraCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, bitacoraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Bitacora.
     * @param {bitacoraDeleteArgs} args - Arguments to delete one Bitacora.
     * @example
     * // Delete one Bitacora
     * const Bitacora = await prisma.bitacora.delete({
     *   where: {
     *     // ... filter to delete one Bitacora
     *   }
     * })
     *
     */
    delete<T extends bitacoraDeleteArgs>(args: Prisma.SelectSubset<T, bitacoraDeleteArgs<ExtArgs>>): Prisma.Prisma__bitacoraClient<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Bitacora.
     * @param {bitacoraUpdateArgs} args - Arguments to update one Bitacora.
     * @example
     * // Update one Bitacora
     * const bitacora = await prisma.bitacora.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends bitacoraUpdateArgs>(args: Prisma.SelectSubset<T, bitacoraUpdateArgs<ExtArgs>>): Prisma.Prisma__bitacoraClient<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Bitacoras.
     * @param {bitacoraDeleteManyArgs} args - Arguments to filter Bitacoras to delete.
     * @example
     * // Delete a few Bitacoras
     * const { count } = await prisma.bitacora.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends bitacoraDeleteManyArgs>(args?: Prisma.SelectSubset<T, bitacoraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Bitacoras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bitacoraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bitacoras
     * const bitacora = await prisma.bitacora.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends bitacoraUpdateManyArgs>(args: Prisma.SelectSubset<T, bitacoraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Bitacoras and returns the data updated in the database.
     * @param {bitacoraUpdateManyAndReturnArgs} args - Arguments to update many Bitacoras.
     * @example
     * // Update many Bitacoras
     * const bitacora = await prisma.bitacora.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Bitacoras and only return the `id_bitacora`
     * const bitacoraWithId_bitacoraOnly = await prisma.bitacora.updateManyAndReturn({
     *   select: { id_bitacora: true },
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
    updateManyAndReturn<T extends bitacoraUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, bitacoraUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Bitacora.
     * @param {bitacoraUpsertArgs} args - Arguments to update or create a Bitacora.
     * @example
     * // Update or create a Bitacora
     * const bitacora = await prisma.bitacora.upsert({
     *   create: {
     *     // ... data to create a Bitacora
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bitacora we want to update
     *   }
     * })
     */
    upsert<T extends bitacoraUpsertArgs>(args: Prisma.SelectSubset<T, bitacoraUpsertArgs<ExtArgs>>): Prisma.Prisma__bitacoraClient<runtime.Types.Result.GetResult<Prisma.$bitacoraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Bitacoras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bitacoraCountArgs} args - Arguments to filter Bitacoras to count.
     * @example
     * // Count the number of Bitacoras
     * const count = await prisma.bitacora.count({
     *   where: {
     *     // ... the filter for the Bitacoras we want to count
     *   }
     * })
    **/
    count<T extends bitacoraCountArgs>(args?: Prisma.Subset<T, bitacoraCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BitacoraCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Bitacora.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BitacoraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BitacoraAggregateArgs>(args: Prisma.Subset<T, BitacoraAggregateArgs>): Prisma.PrismaPromise<GetBitacoraAggregateType<T>>;
    /**
     * Group by Bitacora.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bitacoraGroupByArgs} args - Group by arguments.
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
    groupBy<T extends bitacoraGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: bitacoraGroupByArgs['orderBy'];
    } : {
        orderBy?: bitacoraGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, bitacoraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBitacoraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the bitacora model
     */
    readonly fields: bitacoraFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for bitacora.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__bitacoraClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuarios<T extends Prisma.usuariosDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuariosDefaultArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the bitacora model
 */
export interface bitacoraFieldRefs {
    readonly id_bitacora: Prisma.FieldRef<"bitacora", 'Int'>;
    readonly usuario: Prisma.FieldRef<"bitacora", 'Int'>;
    readonly modulo: Prisma.FieldRef<"bitacora", 'String'>;
    readonly accion: Prisma.FieldRef<"bitacora", 'String'>;
    readonly descripcion: Prisma.FieldRef<"bitacora", 'String'>;
    readonly fecha: Prisma.FieldRef<"bitacora", 'DateTime'>;
    readonly datos_previos: Prisma.FieldRef<"bitacora", 'Json'>;
    readonly datos_nuevos: Prisma.FieldRef<"bitacora", 'Json'>;
}
/**
 * bitacora findUnique
 */
export type bitacoraFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    /**
     * Filter, which bitacora to fetch.
     */
    where: Prisma.bitacoraWhereUniqueInput;
};
/**
 * bitacora findUniqueOrThrow
 */
export type bitacoraFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    /**
     * Filter, which bitacora to fetch.
     */
    where: Prisma.bitacoraWhereUniqueInput;
};
/**
 * bitacora findFirst
 */
export type bitacoraFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    /**
     * Filter, which bitacora to fetch.
     */
    where?: Prisma.bitacoraWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of bitacoras to fetch.
     */
    orderBy?: Prisma.bitacoraOrderByWithRelationInput | Prisma.bitacoraOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for bitacoras.
     */
    cursor?: Prisma.bitacoraWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` bitacoras from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` bitacoras.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of bitacoras.
     */
    distinct?: Prisma.BitacoraScalarFieldEnum | Prisma.BitacoraScalarFieldEnum[];
};
/**
 * bitacora findFirstOrThrow
 */
export type bitacoraFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    /**
     * Filter, which bitacora to fetch.
     */
    where?: Prisma.bitacoraWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of bitacoras to fetch.
     */
    orderBy?: Prisma.bitacoraOrderByWithRelationInput | Prisma.bitacoraOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for bitacoras.
     */
    cursor?: Prisma.bitacoraWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` bitacoras from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` bitacoras.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of bitacoras.
     */
    distinct?: Prisma.BitacoraScalarFieldEnum | Prisma.BitacoraScalarFieldEnum[];
};
/**
 * bitacora findMany
 */
export type bitacoraFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    /**
     * Filter, which bitacoras to fetch.
     */
    where?: Prisma.bitacoraWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of bitacoras to fetch.
     */
    orderBy?: Prisma.bitacoraOrderByWithRelationInput | Prisma.bitacoraOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing bitacoras.
     */
    cursor?: Prisma.bitacoraWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` bitacoras from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` bitacoras.
     */
    skip?: number;
    distinct?: Prisma.BitacoraScalarFieldEnum | Prisma.BitacoraScalarFieldEnum[];
};
/**
 * bitacora create
 */
export type bitacoraCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    /**
     * The data needed to create a bitacora.
     */
    data: Prisma.XOR<Prisma.bitacoraCreateInput, Prisma.bitacoraUncheckedCreateInput>;
};
/**
 * bitacora createMany
 */
export type bitacoraCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many bitacoras.
     */
    data: Prisma.bitacoraCreateManyInput | Prisma.bitacoraCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * bitacora createManyAndReturn
 */
export type bitacoraCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * The data used to create many bitacoras.
     */
    data: Prisma.bitacoraCreateManyInput | Prisma.bitacoraCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * bitacora update
 */
export type bitacoraUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    /**
     * The data needed to update a bitacora.
     */
    data: Prisma.XOR<Prisma.bitacoraUpdateInput, Prisma.bitacoraUncheckedUpdateInput>;
    /**
     * Choose, which bitacora to update.
     */
    where: Prisma.bitacoraWhereUniqueInput;
};
/**
 * bitacora updateMany
 */
export type bitacoraUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update bitacoras.
     */
    data: Prisma.XOR<Prisma.bitacoraUpdateManyMutationInput, Prisma.bitacoraUncheckedUpdateManyInput>;
    /**
     * Filter which bitacoras to update
     */
    where?: Prisma.bitacoraWhereInput;
    /**
     * Limit how many bitacoras to update.
     */
    limit?: number;
};
/**
 * bitacora updateManyAndReturn
 */
export type bitacoraUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * The data used to update bitacoras.
     */
    data: Prisma.XOR<Prisma.bitacoraUpdateManyMutationInput, Prisma.bitacoraUncheckedUpdateManyInput>;
    /**
     * Filter which bitacoras to update
     */
    where?: Prisma.bitacoraWhereInput;
    /**
     * Limit how many bitacoras to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * bitacora upsert
 */
export type bitacoraUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    /**
     * The filter to search for the bitacora to update in case it exists.
     */
    where: Prisma.bitacoraWhereUniqueInput;
    /**
     * In case the bitacora found by the `where` argument doesn't exist, create a new bitacora with this data.
     */
    create: Prisma.XOR<Prisma.bitacoraCreateInput, Prisma.bitacoraUncheckedCreateInput>;
    /**
     * In case the bitacora was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.bitacoraUpdateInput, Prisma.bitacoraUncheckedUpdateInput>;
};
/**
 * bitacora delete
 */
export type bitacoraDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
    /**
     * Filter which bitacora to delete.
     */
    where: Prisma.bitacoraWhereUniqueInput;
};
/**
 * bitacora deleteMany
 */
export type bitacoraDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which bitacoras to delete
     */
    where?: Prisma.bitacoraWhereInput;
    /**
     * Limit how many bitacoras to delete.
     */
    limit?: number;
};
/**
 * bitacora without action
 */
export type bitacoraDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bitacora
     */
    select?: Prisma.bitacoraSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the bitacora
     */
    omit?: Prisma.bitacoraOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.bitacoraInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=bitacora.d.ts.map