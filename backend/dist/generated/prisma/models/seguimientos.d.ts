import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model seguimientos
 *
 */
export type seguimientosModel = runtime.Types.Result.DefaultSelection<Prisma.$seguimientosPayload>;
export type AggregateSeguimientos = {
    _count: SeguimientosCountAggregateOutputType | null;
    _avg: SeguimientosAvgAggregateOutputType | null;
    _sum: SeguimientosSumAggregateOutputType | null;
    _min: SeguimientosMinAggregateOutputType | null;
    _max: SeguimientosMaxAggregateOutputType | null;
};
export type SeguimientosAvgAggregateOutputType = {
    id_seguimiento: number | null;
    id_actividad: number | null;
    porcentaje: runtime.Decimal | null;
    usuario: number | null;
};
export type SeguimientosSumAggregateOutputType = {
    id_seguimiento: number | null;
    id_actividad: number | null;
    porcentaje: runtime.Decimal | null;
    usuario: number | null;
};
export type SeguimientosMinAggregateOutputType = {
    id_seguimiento: number | null;
    id_actividad: number | null;
    comentario: string | null;
    porcentaje: runtime.Decimal | null;
    fecha: Date | null;
    usuario: number | null;
};
export type SeguimientosMaxAggregateOutputType = {
    id_seguimiento: number | null;
    id_actividad: number | null;
    comentario: string | null;
    porcentaje: runtime.Decimal | null;
    fecha: Date | null;
    usuario: number | null;
};
export type SeguimientosCountAggregateOutputType = {
    id_seguimiento: number;
    id_actividad: number;
    comentario: number;
    porcentaje: number;
    fecha: number;
    usuario: number;
    _all: number;
};
export type SeguimientosAvgAggregateInputType = {
    id_seguimiento?: true;
    id_actividad?: true;
    porcentaje?: true;
    usuario?: true;
};
export type SeguimientosSumAggregateInputType = {
    id_seguimiento?: true;
    id_actividad?: true;
    porcentaje?: true;
    usuario?: true;
};
export type SeguimientosMinAggregateInputType = {
    id_seguimiento?: true;
    id_actividad?: true;
    comentario?: true;
    porcentaje?: true;
    fecha?: true;
    usuario?: true;
};
export type SeguimientosMaxAggregateInputType = {
    id_seguimiento?: true;
    id_actividad?: true;
    comentario?: true;
    porcentaje?: true;
    fecha?: true;
    usuario?: true;
};
export type SeguimientosCountAggregateInputType = {
    id_seguimiento?: true;
    id_actividad?: true;
    comentario?: true;
    porcentaje?: true;
    fecha?: true;
    usuario?: true;
    _all?: true;
};
export type SeguimientosAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which seguimientos to aggregate.
     */
    where?: Prisma.seguimientosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of seguimientos to fetch.
     */
    orderBy?: Prisma.seguimientosOrderByWithRelationInput | Prisma.seguimientosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.seguimientosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` seguimientos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` seguimientos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned seguimientos
    **/
    _count?: true | SeguimientosCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SeguimientosAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SeguimientosSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SeguimientosMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SeguimientosMaxAggregateInputType;
};
export type GetSeguimientosAggregateType<T extends SeguimientosAggregateArgs> = {
    [P in keyof T & keyof AggregateSeguimientos]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSeguimientos[P]> : Prisma.GetScalarType<T[P], AggregateSeguimientos[P]>;
};
export type seguimientosGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.seguimientosWhereInput;
    orderBy?: Prisma.seguimientosOrderByWithAggregationInput | Prisma.seguimientosOrderByWithAggregationInput[];
    by: Prisma.SeguimientosScalarFieldEnum[] | Prisma.SeguimientosScalarFieldEnum;
    having?: Prisma.seguimientosScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SeguimientosCountAggregateInputType | true;
    _avg?: SeguimientosAvgAggregateInputType;
    _sum?: SeguimientosSumAggregateInputType;
    _min?: SeguimientosMinAggregateInputType;
    _max?: SeguimientosMaxAggregateInputType;
};
export type SeguimientosGroupByOutputType = {
    id_seguimiento: number;
    id_actividad: number;
    comentario: string | null;
    porcentaje: runtime.Decimal | null;
    fecha: Date | null;
    usuario: number | null;
    _count: SeguimientosCountAggregateOutputType | null;
    _avg: SeguimientosAvgAggregateOutputType | null;
    _sum: SeguimientosSumAggregateOutputType | null;
    _min: SeguimientosMinAggregateOutputType | null;
    _max: SeguimientosMaxAggregateOutputType | null;
};
type GetSeguimientosGroupByPayload<T extends seguimientosGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SeguimientosGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SeguimientosGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SeguimientosGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SeguimientosGroupByOutputType[P]>;
}>>;
export type seguimientosWhereInput = {
    AND?: Prisma.seguimientosWhereInput | Prisma.seguimientosWhereInput[];
    OR?: Prisma.seguimientosWhereInput[];
    NOT?: Prisma.seguimientosWhereInput | Prisma.seguimientosWhereInput[];
    id_seguimiento?: Prisma.IntFilter<"seguimientos"> | number;
    id_actividad?: Prisma.IntFilter<"seguimientos"> | number;
    comentario?: Prisma.StringNullableFilter<"seguimientos"> | string | null;
    porcentaje?: Prisma.DecimalNullableFilter<"seguimientos"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.DateTimeNullableFilter<"seguimientos"> | Date | string | null;
    usuario?: Prisma.IntNullableFilter<"seguimientos"> | number | null;
    actividades_plan?: Prisma.XOR<Prisma.Actividades_planScalarRelationFilter, Prisma.actividades_planWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type seguimientosOrderByWithRelationInput = {
    id_seguimiento?: Prisma.SortOrder;
    id_actividad?: Prisma.SortOrder;
    comentario?: Prisma.SortOrderInput | Prisma.SortOrder;
    porcentaje?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.SortOrderInput | Prisma.SortOrder;
    actividades_plan?: Prisma.actividades_planOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type seguimientosWhereUniqueInput = Prisma.AtLeast<{
    id_seguimiento?: number;
    AND?: Prisma.seguimientosWhereInput | Prisma.seguimientosWhereInput[];
    OR?: Prisma.seguimientosWhereInput[];
    NOT?: Prisma.seguimientosWhereInput | Prisma.seguimientosWhereInput[];
    id_actividad?: Prisma.IntFilter<"seguimientos"> | number;
    comentario?: Prisma.StringNullableFilter<"seguimientos"> | string | null;
    porcentaje?: Prisma.DecimalNullableFilter<"seguimientos"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.DateTimeNullableFilter<"seguimientos"> | Date | string | null;
    usuario?: Prisma.IntNullableFilter<"seguimientos"> | number | null;
    actividades_plan?: Prisma.XOR<Prisma.Actividades_planScalarRelationFilter, Prisma.actividades_planWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id_seguimiento">;
export type seguimientosOrderByWithAggregationInput = {
    id_seguimiento?: Prisma.SortOrder;
    id_actividad?: Prisma.SortOrder;
    comentario?: Prisma.SortOrderInput | Prisma.SortOrder;
    porcentaje?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.seguimientosCountOrderByAggregateInput;
    _avg?: Prisma.seguimientosAvgOrderByAggregateInput;
    _max?: Prisma.seguimientosMaxOrderByAggregateInput;
    _min?: Prisma.seguimientosMinOrderByAggregateInput;
    _sum?: Prisma.seguimientosSumOrderByAggregateInput;
};
export type seguimientosScalarWhereWithAggregatesInput = {
    AND?: Prisma.seguimientosScalarWhereWithAggregatesInput | Prisma.seguimientosScalarWhereWithAggregatesInput[];
    OR?: Prisma.seguimientosScalarWhereWithAggregatesInput[];
    NOT?: Prisma.seguimientosScalarWhereWithAggregatesInput | Prisma.seguimientosScalarWhereWithAggregatesInput[];
    id_seguimiento?: Prisma.IntWithAggregatesFilter<"seguimientos"> | number;
    id_actividad?: Prisma.IntWithAggregatesFilter<"seguimientos"> | number;
    comentario?: Prisma.StringNullableWithAggregatesFilter<"seguimientos"> | string | null;
    porcentaje?: Prisma.DecimalNullableWithAggregatesFilter<"seguimientos"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.DateTimeNullableWithAggregatesFilter<"seguimientos"> | Date | string | null;
    usuario?: Prisma.IntNullableWithAggregatesFilter<"seguimientos"> | number | null;
};
export type seguimientosCreateInput = {
    comentario?: string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Date | string | null;
    actividades_plan: Prisma.actividades_planCreateNestedOneWithoutSeguimientosInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutSeguimientosInput;
};
export type seguimientosUncheckedCreateInput = {
    id_seguimiento?: number;
    id_actividad: number;
    comentario?: string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Date | string | null;
    usuario?: number | null;
};
export type seguimientosUpdateInput = {
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUpdateOneRequiredWithoutSeguimientosNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutSeguimientosNestedInput;
};
export type seguimientosUncheckedUpdateInput = {
    id_seguimiento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type seguimientosCreateManyInput = {
    id_seguimiento?: number;
    id_actividad: number;
    comentario?: string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Date | string | null;
    usuario?: number | null;
};
export type seguimientosUpdateManyMutationInput = {
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type seguimientosUncheckedUpdateManyInput = {
    id_seguimiento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type SeguimientosListRelationFilter = {
    every?: Prisma.seguimientosWhereInput;
    some?: Prisma.seguimientosWhereInput;
    none?: Prisma.seguimientosWhereInput;
};
export type seguimientosOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type seguimientosCountOrderByAggregateInput = {
    id_seguimiento?: Prisma.SortOrder;
    id_actividad?: Prisma.SortOrder;
    comentario?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type seguimientosAvgOrderByAggregateInput = {
    id_seguimiento?: Prisma.SortOrder;
    id_actividad?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type seguimientosMaxOrderByAggregateInput = {
    id_seguimiento?: Prisma.SortOrder;
    id_actividad?: Prisma.SortOrder;
    comentario?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type seguimientosMinOrderByAggregateInput = {
    id_seguimiento?: Prisma.SortOrder;
    id_actividad?: Prisma.SortOrder;
    comentario?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type seguimientosSumOrderByAggregateInput = {
    id_seguimiento?: Prisma.SortOrder;
    id_actividad?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type seguimientosCreateNestedManyWithoutActividades_planInput = {
    create?: Prisma.XOR<Prisma.seguimientosCreateWithoutActividades_planInput, Prisma.seguimientosUncheckedCreateWithoutActividades_planInput> | Prisma.seguimientosCreateWithoutActividades_planInput[] | Prisma.seguimientosUncheckedCreateWithoutActividades_planInput[];
    connectOrCreate?: Prisma.seguimientosCreateOrConnectWithoutActividades_planInput | Prisma.seguimientosCreateOrConnectWithoutActividades_planInput[];
    createMany?: Prisma.seguimientosCreateManyActividades_planInputEnvelope;
    connect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
};
export type seguimientosUncheckedCreateNestedManyWithoutActividades_planInput = {
    create?: Prisma.XOR<Prisma.seguimientosCreateWithoutActividades_planInput, Prisma.seguimientosUncheckedCreateWithoutActividades_planInput> | Prisma.seguimientosCreateWithoutActividades_planInput[] | Prisma.seguimientosUncheckedCreateWithoutActividades_planInput[];
    connectOrCreate?: Prisma.seguimientosCreateOrConnectWithoutActividades_planInput | Prisma.seguimientosCreateOrConnectWithoutActividades_planInput[];
    createMany?: Prisma.seguimientosCreateManyActividades_planInputEnvelope;
    connect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
};
export type seguimientosUpdateManyWithoutActividades_planNestedInput = {
    create?: Prisma.XOR<Prisma.seguimientosCreateWithoutActividades_planInput, Prisma.seguimientosUncheckedCreateWithoutActividades_planInput> | Prisma.seguimientosCreateWithoutActividades_planInput[] | Prisma.seguimientosUncheckedCreateWithoutActividades_planInput[];
    connectOrCreate?: Prisma.seguimientosCreateOrConnectWithoutActividades_planInput | Prisma.seguimientosCreateOrConnectWithoutActividades_planInput[];
    upsert?: Prisma.seguimientosUpsertWithWhereUniqueWithoutActividades_planInput | Prisma.seguimientosUpsertWithWhereUniqueWithoutActividades_planInput[];
    createMany?: Prisma.seguimientosCreateManyActividades_planInputEnvelope;
    set?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    disconnect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    delete?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    connect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    update?: Prisma.seguimientosUpdateWithWhereUniqueWithoutActividades_planInput | Prisma.seguimientosUpdateWithWhereUniqueWithoutActividades_planInput[];
    updateMany?: Prisma.seguimientosUpdateManyWithWhereWithoutActividades_planInput | Prisma.seguimientosUpdateManyWithWhereWithoutActividades_planInput[];
    deleteMany?: Prisma.seguimientosScalarWhereInput | Prisma.seguimientosScalarWhereInput[];
};
export type seguimientosUncheckedUpdateManyWithoutActividades_planNestedInput = {
    create?: Prisma.XOR<Prisma.seguimientosCreateWithoutActividades_planInput, Prisma.seguimientosUncheckedCreateWithoutActividades_planInput> | Prisma.seguimientosCreateWithoutActividades_planInput[] | Prisma.seguimientosUncheckedCreateWithoutActividades_planInput[];
    connectOrCreate?: Prisma.seguimientosCreateOrConnectWithoutActividades_planInput | Prisma.seguimientosCreateOrConnectWithoutActividades_planInput[];
    upsert?: Prisma.seguimientosUpsertWithWhereUniqueWithoutActividades_planInput | Prisma.seguimientosUpsertWithWhereUniqueWithoutActividades_planInput[];
    createMany?: Prisma.seguimientosCreateManyActividades_planInputEnvelope;
    set?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    disconnect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    delete?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    connect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    update?: Prisma.seguimientosUpdateWithWhereUniqueWithoutActividades_planInput | Prisma.seguimientosUpdateWithWhereUniqueWithoutActividades_planInput[];
    updateMany?: Prisma.seguimientosUpdateManyWithWhereWithoutActividades_planInput | Prisma.seguimientosUpdateManyWithWhereWithoutActividades_planInput[];
    deleteMany?: Prisma.seguimientosScalarWhereInput | Prisma.seguimientosScalarWhereInput[];
};
export type seguimientosCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.seguimientosCreateWithoutUsuariosInput, Prisma.seguimientosUncheckedCreateWithoutUsuariosInput> | Prisma.seguimientosCreateWithoutUsuariosInput[] | Prisma.seguimientosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.seguimientosCreateOrConnectWithoutUsuariosInput | Prisma.seguimientosCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.seguimientosCreateManyUsuariosInputEnvelope;
    connect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
};
export type seguimientosUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.seguimientosCreateWithoutUsuariosInput, Prisma.seguimientosUncheckedCreateWithoutUsuariosInput> | Prisma.seguimientosCreateWithoutUsuariosInput[] | Prisma.seguimientosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.seguimientosCreateOrConnectWithoutUsuariosInput | Prisma.seguimientosCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.seguimientosCreateManyUsuariosInputEnvelope;
    connect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
};
export type seguimientosUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.seguimientosCreateWithoutUsuariosInput, Prisma.seguimientosUncheckedCreateWithoutUsuariosInput> | Prisma.seguimientosCreateWithoutUsuariosInput[] | Prisma.seguimientosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.seguimientosCreateOrConnectWithoutUsuariosInput | Prisma.seguimientosCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.seguimientosUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.seguimientosUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.seguimientosCreateManyUsuariosInputEnvelope;
    set?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    disconnect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    delete?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    connect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    update?: Prisma.seguimientosUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.seguimientosUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.seguimientosUpdateManyWithWhereWithoutUsuariosInput | Prisma.seguimientosUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.seguimientosScalarWhereInput | Prisma.seguimientosScalarWhereInput[];
};
export type seguimientosUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.seguimientosCreateWithoutUsuariosInput, Prisma.seguimientosUncheckedCreateWithoutUsuariosInput> | Prisma.seguimientosCreateWithoutUsuariosInput[] | Prisma.seguimientosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.seguimientosCreateOrConnectWithoutUsuariosInput | Prisma.seguimientosCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.seguimientosUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.seguimientosUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.seguimientosCreateManyUsuariosInputEnvelope;
    set?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    disconnect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    delete?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    connect?: Prisma.seguimientosWhereUniqueInput | Prisma.seguimientosWhereUniqueInput[];
    update?: Prisma.seguimientosUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.seguimientosUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.seguimientosUpdateManyWithWhereWithoutUsuariosInput | Prisma.seguimientosUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.seguimientosScalarWhereInput | Prisma.seguimientosScalarWhereInput[];
};
export type seguimientosCreateWithoutActividades_planInput = {
    comentario?: string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Date | string | null;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutSeguimientosInput;
};
export type seguimientosUncheckedCreateWithoutActividades_planInput = {
    id_seguimiento?: number;
    comentario?: string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Date | string | null;
    usuario?: number | null;
};
export type seguimientosCreateOrConnectWithoutActividades_planInput = {
    where: Prisma.seguimientosWhereUniqueInput;
    create: Prisma.XOR<Prisma.seguimientosCreateWithoutActividades_planInput, Prisma.seguimientosUncheckedCreateWithoutActividades_planInput>;
};
export type seguimientosCreateManyActividades_planInputEnvelope = {
    data: Prisma.seguimientosCreateManyActividades_planInput | Prisma.seguimientosCreateManyActividades_planInput[];
    skipDuplicates?: boolean;
};
export type seguimientosUpsertWithWhereUniqueWithoutActividades_planInput = {
    where: Prisma.seguimientosWhereUniqueInput;
    update: Prisma.XOR<Prisma.seguimientosUpdateWithoutActividades_planInput, Prisma.seguimientosUncheckedUpdateWithoutActividades_planInput>;
    create: Prisma.XOR<Prisma.seguimientosCreateWithoutActividades_planInput, Prisma.seguimientosUncheckedCreateWithoutActividades_planInput>;
};
export type seguimientosUpdateWithWhereUniqueWithoutActividades_planInput = {
    where: Prisma.seguimientosWhereUniqueInput;
    data: Prisma.XOR<Prisma.seguimientosUpdateWithoutActividades_planInput, Prisma.seguimientosUncheckedUpdateWithoutActividades_planInput>;
};
export type seguimientosUpdateManyWithWhereWithoutActividades_planInput = {
    where: Prisma.seguimientosScalarWhereInput;
    data: Prisma.XOR<Prisma.seguimientosUpdateManyMutationInput, Prisma.seguimientosUncheckedUpdateManyWithoutActividades_planInput>;
};
export type seguimientosScalarWhereInput = {
    AND?: Prisma.seguimientosScalarWhereInput | Prisma.seguimientosScalarWhereInput[];
    OR?: Prisma.seguimientosScalarWhereInput[];
    NOT?: Prisma.seguimientosScalarWhereInput | Prisma.seguimientosScalarWhereInput[];
    id_seguimiento?: Prisma.IntFilter<"seguimientos"> | number;
    id_actividad?: Prisma.IntFilter<"seguimientos"> | number;
    comentario?: Prisma.StringNullableFilter<"seguimientos"> | string | null;
    porcentaje?: Prisma.DecimalNullableFilter<"seguimientos"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.DateTimeNullableFilter<"seguimientos"> | Date | string | null;
    usuario?: Prisma.IntNullableFilter<"seguimientos"> | number | null;
};
export type seguimientosCreateWithoutUsuariosInput = {
    comentario?: string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Date | string | null;
    actividades_plan: Prisma.actividades_planCreateNestedOneWithoutSeguimientosInput;
};
export type seguimientosUncheckedCreateWithoutUsuariosInput = {
    id_seguimiento?: number;
    id_actividad: number;
    comentario?: string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Date | string | null;
};
export type seguimientosCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.seguimientosWhereUniqueInput;
    create: Prisma.XOR<Prisma.seguimientosCreateWithoutUsuariosInput, Prisma.seguimientosUncheckedCreateWithoutUsuariosInput>;
};
export type seguimientosCreateManyUsuariosInputEnvelope = {
    data: Prisma.seguimientosCreateManyUsuariosInput | Prisma.seguimientosCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type seguimientosUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.seguimientosWhereUniqueInput;
    update: Prisma.XOR<Prisma.seguimientosUpdateWithoutUsuariosInput, Prisma.seguimientosUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.seguimientosCreateWithoutUsuariosInput, Prisma.seguimientosUncheckedCreateWithoutUsuariosInput>;
};
export type seguimientosUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.seguimientosWhereUniqueInput;
    data: Prisma.XOR<Prisma.seguimientosUpdateWithoutUsuariosInput, Prisma.seguimientosUncheckedUpdateWithoutUsuariosInput>;
};
export type seguimientosUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.seguimientosScalarWhereInput;
    data: Prisma.XOR<Prisma.seguimientosUpdateManyMutationInput, Prisma.seguimientosUncheckedUpdateManyWithoutUsuariosInput>;
};
export type seguimientosCreateManyActividades_planInput = {
    id_seguimiento?: number;
    comentario?: string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Date | string | null;
    usuario?: number | null;
};
export type seguimientosUpdateWithoutActividades_planInput = {
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuarios?: Prisma.usuariosUpdateOneWithoutSeguimientosNestedInput;
};
export type seguimientosUncheckedUpdateWithoutActividades_planInput = {
    id_seguimiento?: Prisma.IntFieldUpdateOperationsInput | number;
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type seguimientosUncheckedUpdateManyWithoutActividades_planInput = {
    id_seguimiento?: Prisma.IntFieldUpdateOperationsInput | number;
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type seguimientosCreateManyUsuariosInput = {
    id_seguimiento?: number;
    id_actividad: number;
    comentario?: string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Date | string | null;
};
export type seguimientosUpdateWithoutUsuariosInput = {
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUpdateOneRequiredWithoutSeguimientosNestedInput;
};
export type seguimientosUncheckedUpdateWithoutUsuariosInput = {
    id_seguimiento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type seguimientosUncheckedUpdateManyWithoutUsuariosInput = {
    id_seguimiento?: Prisma.IntFieldUpdateOperationsInput | number;
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    comentario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type seguimientosSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_seguimiento?: boolean;
    id_actividad?: boolean;
    comentario?: boolean;
    porcentaje?: boolean;
    fecha?: boolean;
    usuario?: boolean;
    actividades_plan?: boolean | Prisma.actividades_planDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.seguimientos$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["seguimientos"]>;
export type seguimientosSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_seguimiento?: boolean;
    id_actividad?: boolean;
    comentario?: boolean;
    porcentaje?: boolean;
    fecha?: boolean;
    usuario?: boolean;
    actividades_plan?: boolean | Prisma.actividades_planDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.seguimientos$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["seguimientos"]>;
export type seguimientosSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_seguimiento?: boolean;
    id_actividad?: boolean;
    comentario?: boolean;
    porcentaje?: boolean;
    fecha?: boolean;
    usuario?: boolean;
    actividades_plan?: boolean | Prisma.actividades_planDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.seguimientos$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["seguimientos"]>;
export type seguimientosSelectScalar = {
    id_seguimiento?: boolean;
    id_actividad?: boolean;
    comentario?: boolean;
    porcentaje?: boolean;
    fecha?: boolean;
    usuario?: boolean;
};
export type seguimientosOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_seguimiento" | "id_actividad" | "comentario" | "porcentaje" | "fecha" | "usuario", ExtArgs["result"]["seguimientos"]>;
export type seguimientosInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actividades_plan?: boolean | Prisma.actividades_planDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.seguimientos$usuariosArgs<ExtArgs>;
};
export type seguimientosIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actividades_plan?: boolean | Prisma.actividades_planDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.seguimientos$usuariosArgs<ExtArgs>;
};
export type seguimientosIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actividades_plan?: boolean | Prisma.actividades_planDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.seguimientos$usuariosArgs<ExtArgs>;
};
export type $seguimientosPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "seguimientos";
    objects: {
        actividades_plan: Prisma.$actividades_planPayload<ExtArgs>;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_seguimiento: number;
        id_actividad: number;
        comentario: string | null;
        porcentaje: runtime.Decimal | null;
        fecha: Date | null;
        usuario: number | null;
    }, ExtArgs["result"]["seguimientos"]>;
    composites: {};
};
export type seguimientosGetPayload<S extends boolean | null | undefined | seguimientosDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$seguimientosPayload, S>;
export type seguimientosCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<seguimientosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SeguimientosCountAggregateInputType | true;
};
export interface seguimientosDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['seguimientos'];
        meta: {
            name: 'seguimientos';
        };
    };
    /**
     * Find zero or one Seguimientos that matches the filter.
     * @param {seguimientosFindUniqueArgs} args - Arguments to find a Seguimientos
     * @example
     * // Get one Seguimientos
     * const seguimientos = await prisma.seguimientos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends seguimientosFindUniqueArgs>(args: Prisma.SelectSubset<T, seguimientosFindUniqueArgs<ExtArgs>>): Prisma.Prisma__seguimientosClient<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Seguimientos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {seguimientosFindUniqueOrThrowArgs} args - Arguments to find a Seguimientos
     * @example
     * // Get one Seguimientos
     * const seguimientos = await prisma.seguimientos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends seguimientosFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, seguimientosFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__seguimientosClient<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Seguimientos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {seguimientosFindFirstArgs} args - Arguments to find a Seguimientos
     * @example
     * // Get one Seguimientos
     * const seguimientos = await prisma.seguimientos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends seguimientosFindFirstArgs>(args?: Prisma.SelectSubset<T, seguimientosFindFirstArgs<ExtArgs>>): Prisma.Prisma__seguimientosClient<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Seguimientos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {seguimientosFindFirstOrThrowArgs} args - Arguments to find a Seguimientos
     * @example
     * // Get one Seguimientos
     * const seguimientos = await prisma.seguimientos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends seguimientosFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, seguimientosFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__seguimientosClient<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Seguimientos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {seguimientosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Seguimientos
     * const seguimientos = await prisma.seguimientos.findMany()
     *
     * // Get first 10 Seguimientos
     * const seguimientos = await prisma.seguimientos.findMany({ take: 10 })
     *
     * // Only select the `id_seguimiento`
     * const seguimientosWithId_seguimientoOnly = await prisma.seguimientos.findMany({ select: { id_seguimiento: true } })
     *
     */
    findMany<T extends seguimientosFindManyArgs>(args?: Prisma.SelectSubset<T, seguimientosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Seguimientos.
     * @param {seguimientosCreateArgs} args - Arguments to create a Seguimientos.
     * @example
     * // Create one Seguimientos
     * const Seguimientos = await prisma.seguimientos.create({
     *   data: {
     *     // ... data to create a Seguimientos
     *   }
     * })
     *
     */
    create<T extends seguimientosCreateArgs>(args: Prisma.SelectSubset<T, seguimientosCreateArgs<ExtArgs>>): Prisma.Prisma__seguimientosClient<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Seguimientos.
     * @param {seguimientosCreateManyArgs} args - Arguments to create many Seguimientos.
     * @example
     * // Create many Seguimientos
     * const seguimientos = await prisma.seguimientos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends seguimientosCreateManyArgs>(args?: Prisma.SelectSubset<T, seguimientosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Seguimientos and returns the data saved in the database.
     * @param {seguimientosCreateManyAndReturnArgs} args - Arguments to create many Seguimientos.
     * @example
     * // Create many Seguimientos
     * const seguimientos = await prisma.seguimientos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Seguimientos and only return the `id_seguimiento`
     * const seguimientosWithId_seguimientoOnly = await prisma.seguimientos.createManyAndReturn({
     *   select: { id_seguimiento: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends seguimientosCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, seguimientosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Seguimientos.
     * @param {seguimientosDeleteArgs} args - Arguments to delete one Seguimientos.
     * @example
     * // Delete one Seguimientos
     * const Seguimientos = await prisma.seguimientos.delete({
     *   where: {
     *     // ... filter to delete one Seguimientos
     *   }
     * })
     *
     */
    delete<T extends seguimientosDeleteArgs>(args: Prisma.SelectSubset<T, seguimientosDeleteArgs<ExtArgs>>): Prisma.Prisma__seguimientosClient<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Seguimientos.
     * @param {seguimientosUpdateArgs} args - Arguments to update one Seguimientos.
     * @example
     * // Update one Seguimientos
     * const seguimientos = await prisma.seguimientos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends seguimientosUpdateArgs>(args: Prisma.SelectSubset<T, seguimientosUpdateArgs<ExtArgs>>): Prisma.Prisma__seguimientosClient<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Seguimientos.
     * @param {seguimientosDeleteManyArgs} args - Arguments to filter Seguimientos to delete.
     * @example
     * // Delete a few Seguimientos
     * const { count } = await prisma.seguimientos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends seguimientosDeleteManyArgs>(args?: Prisma.SelectSubset<T, seguimientosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Seguimientos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {seguimientosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Seguimientos
     * const seguimientos = await prisma.seguimientos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends seguimientosUpdateManyArgs>(args: Prisma.SelectSubset<T, seguimientosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Seguimientos and returns the data updated in the database.
     * @param {seguimientosUpdateManyAndReturnArgs} args - Arguments to update many Seguimientos.
     * @example
     * // Update many Seguimientos
     * const seguimientos = await prisma.seguimientos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Seguimientos and only return the `id_seguimiento`
     * const seguimientosWithId_seguimientoOnly = await prisma.seguimientos.updateManyAndReturn({
     *   select: { id_seguimiento: true },
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
    updateManyAndReturn<T extends seguimientosUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, seguimientosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Seguimientos.
     * @param {seguimientosUpsertArgs} args - Arguments to update or create a Seguimientos.
     * @example
     * // Update or create a Seguimientos
     * const seguimientos = await prisma.seguimientos.upsert({
     *   create: {
     *     // ... data to create a Seguimientos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Seguimientos we want to update
     *   }
     * })
     */
    upsert<T extends seguimientosUpsertArgs>(args: Prisma.SelectSubset<T, seguimientosUpsertArgs<ExtArgs>>): Prisma.Prisma__seguimientosClient<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Seguimientos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {seguimientosCountArgs} args - Arguments to filter Seguimientos to count.
     * @example
     * // Count the number of Seguimientos
     * const count = await prisma.seguimientos.count({
     *   where: {
     *     // ... the filter for the Seguimientos we want to count
     *   }
     * })
    **/
    count<T extends seguimientosCountArgs>(args?: Prisma.Subset<T, seguimientosCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SeguimientosCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Seguimientos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeguimientosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SeguimientosAggregateArgs>(args: Prisma.Subset<T, SeguimientosAggregateArgs>): Prisma.PrismaPromise<GetSeguimientosAggregateType<T>>;
    /**
     * Group by Seguimientos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {seguimientosGroupByArgs} args - Group by arguments.
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
    groupBy<T extends seguimientosGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: seguimientosGroupByArgs['orderBy'];
    } : {
        orderBy?: seguimientosGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, seguimientosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSeguimientosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the seguimientos model
     */
    readonly fields: seguimientosFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for seguimientos.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__seguimientosClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    actividades_plan<T extends Prisma.actividades_planDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.actividades_planDefaultArgs<ExtArgs>>): Prisma.Prisma__actividades_planClient<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.seguimientos$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.seguimientos$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the seguimientos model
 */
export interface seguimientosFieldRefs {
    readonly id_seguimiento: Prisma.FieldRef<"seguimientos", 'Int'>;
    readonly id_actividad: Prisma.FieldRef<"seguimientos", 'Int'>;
    readonly comentario: Prisma.FieldRef<"seguimientos", 'String'>;
    readonly porcentaje: Prisma.FieldRef<"seguimientos", 'Decimal'>;
    readonly fecha: Prisma.FieldRef<"seguimientos", 'DateTime'>;
    readonly usuario: Prisma.FieldRef<"seguimientos", 'Int'>;
}
/**
 * seguimientos findUnique
 */
export type seguimientosFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    /**
     * Filter, which seguimientos to fetch.
     */
    where: Prisma.seguimientosWhereUniqueInput;
};
/**
 * seguimientos findUniqueOrThrow
 */
export type seguimientosFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    /**
     * Filter, which seguimientos to fetch.
     */
    where: Prisma.seguimientosWhereUniqueInput;
};
/**
 * seguimientos findFirst
 */
export type seguimientosFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    /**
     * Filter, which seguimientos to fetch.
     */
    where?: Prisma.seguimientosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of seguimientos to fetch.
     */
    orderBy?: Prisma.seguimientosOrderByWithRelationInput | Prisma.seguimientosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for seguimientos.
     */
    cursor?: Prisma.seguimientosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` seguimientos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` seguimientos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of seguimientos.
     */
    distinct?: Prisma.SeguimientosScalarFieldEnum | Prisma.SeguimientosScalarFieldEnum[];
};
/**
 * seguimientos findFirstOrThrow
 */
export type seguimientosFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    /**
     * Filter, which seguimientos to fetch.
     */
    where?: Prisma.seguimientosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of seguimientos to fetch.
     */
    orderBy?: Prisma.seguimientosOrderByWithRelationInput | Prisma.seguimientosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for seguimientos.
     */
    cursor?: Prisma.seguimientosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` seguimientos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` seguimientos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of seguimientos.
     */
    distinct?: Prisma.SeguimientosScalarFieldEnum | Prisma.SeguimientosScalarFieldEnum[];
};
/**
 * seguimientos findMany
 */
export type seguimientosFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    /**
     * Filter, which seguimientos to fetch.
     */
    where?: Prisma.seguimientosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of seguimientos to fetch.
     */
    orderBy?: Prisma.seguimientosOrderByWithRelationInput | Prisma.seguimientosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing seguimientos.
     */
    cursor?: Prisma.seguimientosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` seguimientos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` seguimientos.
     */
    skip?: number;
    distinct?: Prisma.SeguimientosScalarFieldEnum | Prisma.SeguimientosScalarFieldEnum[];
};
/**
 * seguimientos create
 */
export type seguimientosCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    /**
     * The data needed to create a seguimientos.
     */
    data: Prisma.XOR<Prisma.seguimientosCreateInput, Prisma.seguimientosUncheckedCreateInput>;
};
/**
 * seguimientos createMany
 */
export type seguimientosCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many seguimientos.
     */
    data: Prisma.seguimientosCreateManyInput | Prisma.seguimientosCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * seguimientos createManyAndReturn
 */
export type seguimientosCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * The data used to create many seguimientos.
     */
    data: Prisma.seguimientosCreateManyInput | Prisma.seguimientosCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * seguimientos update
 */
export type seguimientosUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    /**
     * The data needed to update a seguimientos.
     */
    data: Prisma.XOR<Prisma.seguimientosUpdateInput, Prisma.seguimientosUncheckedUpdateInput>;
    /**
     * Choose, which seguimientos to update.
     */
    where: Prisma.seguimientosWhereUniqueInput;
};
/**
 * seguimientos updateMany
 */
export type seguimientosUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update seguimientos.
     */
    data: Prisma.XOR<Prisma.seguimientosUpdateManyMutationInput, Prisma.seguimientosUncheckedUpdateManyInput>;
    /**
     * Filter which seguimientos to update
     */
    where?: Prisma.seguimientosWhereInput;
    /**
     * Limit how many seguimientos to update.
     */
    limit?: number;
};
/**
 * seguimientos updateManyAndReturn
 */
export type seguimientosUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * The data used to update seguimientos.
     */
    data: Prisma.XOR<Prisma.seguimientosUpdateManyMutationInput, Prisma.seguimientosUncheckedUpdateManyInput>;
    /**
     * Filter which seguimientos to update
     */
    where?: Prisma.seguimientosWhereInput;
    /**
     * Limit how many seguimientos to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * seguimientos upsert
 */
export type seguimientosUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    /**
     * The filter to search for the seguimientos to update in case it exists.
     */
    where: Prisma.seguimientosWhereUniqueInput;
    /**
     * In case the seguimientos found by the `where` argument doesn't exist, create a new seguimientos with this data.
     */
    create: Prisma.XOR<Prisma.seguimientosCreateInput, Prisma.seguimientosUncheckedCreateInput>;
    /**
     * In case the seguimientos was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.seguimientosUpdateInput, Prisma.seguimientosUncheckedUpdateInput>;
};
/**
 * seguimientos delete
 */
export type seguimientosDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
    /**
     * Filter which seguimientos to delete.
     */
    where: Prisma.seguimientosWhereUniqueInput;
};
/**
 * seguimientos deleteMany
 */
export type seguimientosDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which seguimientos to delete
     */
    where?: Prisma.seguimientosWhereInput;
    /**
     * Limit how many seguimientos to delete.
     */
    limit?: number;
};
/**
 * seguimientos.usuarios
 */
export type seguimientos$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * seguimientos without action
 */
export type seguimientosDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seguimientos
     */
    select?: Prisma.seguimientosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seguimientos
     */
    omit?: Prisma.seguimientosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seguimientosInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=seguimientos.d.ts.map