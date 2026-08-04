import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model anexos_caso
 *
 */
export type anexos_casoModel = runtime.Types.Result.DefaultSelection<Prisma.$anexos_casoPayload>;
export type AggregateAnexos_caso = {
    _count: Anexos_casoCountAggregateOutputType | null;
    _avg: Anexos_casoAvgAggregateOutputType | null;
    _sum: Anexos_casoSumAggregateOutputType | null;
    _min: Anexos_casoMinAggregateOutputType | null;
    _max: Anexos_casoMaxAggregateOutputType | null;
};
export type Anexos_casoAvgAggregateOutputType = {
    id_anexo: number | null;
    id_caso: number | null;
    peso: runtime.Decimal | null;
    usuario_subida: number | null;
};
export type Anexos_casoSumAggregateOutputType = {
    id_anexo: number | null;
    id_caso: number | null;
    peso: runtime.Decimal | null;
    usuario_subida: number | null;
};
export type Anexos_casoMinAggregateOutputType = {
    id_anexo: number | null;
    id_caso: number | null;
    nombre_archivo: string | null;
    ruta_archivo: string | null;
    tipo_archivo: string | null;
    peso: runtime.Decimal | null;
    fecha_subida: Date | null;
    usuario_subida: number | null;
};
export type Anexos_casoMaxAggregateOutputType = {
    id_anexo: number | null;
    id_caso: number | null;
    nombre_archivo: string | null;
    ruta_archivo: string | null;
    tipo_archivo: string | null;
    peso: runtime.Decimal | null;
    fecha_subida: Date | null;
    usuario_subida: number | null;
};
export type Anexos_casoCountAggregateOutputType = {
    id_anexo: number;
    id_caso: number;
    nombre_archivo: number;
    ruta_archivo: number;
    tipo_archivo: number;
    peso: number;
    fecha_subida: number;
    usuario_subida: number;
    _all: number;
};
export type Anexos_casoAvgAggregateInputType = {
    id_anexo?: true;
    id_caso?: true;
    peso?: true;
    usuario_subida?: true;
};
export type Anexos_casoSumAggregateInputType = {
    id_anexo?: true;
    id_caso?: true;
    peso?: true;
    usuario_subida?: true;
};
export type Anexos_casoMinAggregateInputType = {
    id_anexo?: true;
    id_caso?: true;
    nombre_archivo?: true;
    ruta_archivo?: true;
    tipo_archivo?: true;
    peso?: true;
    fecha_subida?: true;
    usuario_subida?: true;
};
export type Anexos_casoMaxAggregateInputType = {
    id_anexo?: true;
    id_caso?: true;
    nombre_archivo?: true;
    ruta_archivo?: true;
    tipo_archivo?: true;
    peso?: true;
    fecha_subida?: true;
    usuario_subida?: true;
};
export type Anexos_casoCountAggregateInputType = {
    id_anexo?: true;
    id_caso?: true;
    nombre_archivo?: true;
    ruta_archivo?: true;
    tipo_archivo?: true;
    peso?: true;
    fecha_subida?: true;
    usuario_subida?: true;
    _all?: true;
};
export type Anexos_casoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which anexos_caso to aggregate.
     */
    where?: Prisma.anexos_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of anexos_casos to fetch.
     */
    orderBy?: Prisma.anexos_casoOrderByWithRelationInput | Prisma.anexos_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.anexos_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` anexos_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` anexos_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned anexos_casos
    **/
    _count?: true | Anexos_casoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Anexos_casoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Anexos_casoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Anexos_casoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Anexos_casoMaxAggregateInputType;
};
export type GetAnexos_casoAggregateType<T extends Anexos_casoAggregateArgs> = {
    [P in keyof T & keyof AggregateAnexos_caso]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAnexos_caso[P]> : Prisma.GetScalarType<T[P], AggregateAnexos_caso[P]>;
};
export type anexos_casoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.anexos_casoWhereInput;
    orderBy?: Prisma.anexos_casoOrderByWithAggregationInput | Prisma.anexos_casoOrderByWithAggregationInput[];
    by: Prisma.Anexos_casoScalarFieldEnum[] | Prisma.Anexos_casoScalarFieldEnum;
    having?: Prisma.anexos_casoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Anexos_casoCountAggregateInputType | true;
    _avg?: Anexos_casoAvgAggregateInputType;
    _sum?: Anexos_casoSumAggregateInputType;
    _min?: Anexos_casoMinAggregateInputType;
    _max?: Anexos_casoMaxAggregateInputType;
};
export type Anexos_casoGroupByOutputType = {
    id_anexo: number;
    id_caso: number;
    nombre_archivo: string | null;
    ruta_archivo: string | null;
    tipo_archivo: string | null;
    peso: runtime.Decimal | null;
    fecha_subida: Date | null;
    usuario_subida: number | null;
    _count: Anexos_casoCountAggregateOutputType | null;
    _avg: Anexos_casoAvgAggregateOutputType | null;
    _sum: Anexos_casoSumAggregateOutputType | null;
    _min: Anexos_casoMinAggregateOutputType | null;
    _max: Anexos_casoMaxAggregateOutputType | null;
};
type GetAnexos_casoGroupByPayload<T extends anexos_casoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Anexos_casoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Anexos_casoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Anexos_casoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Anexos_casoGroupByOutputType[P]>;
}>>;
export type anexos_casoWhereInput = {
    AND?: Prisma.anexos_casoWhereInput | Prisma.anexos_casoWhereInput[];
    OR?: Prisma.anexos_casoWhereInput[];
    NOT?: Prisma.anexos_casoWhereInput | Prisma.anexos_casoWhereInput[];
    id_anexo?: Prisma.IntFilter<"anexos_caso"> | number;
    id_caso?: Prisma.IntFilter<"anexos_caso"> | number;
    nombre_archivo?: Prisma.StringNullableFilter<"anexos_caso"> | string | null;
    ruta_archivo?: Prisma.StringNullableFilter<"anexos_caso"> | string | null;
    tipo_archivo?: Prisma.StringNullableFilter<"anexos_caso"> | string | null;
    peso?: Prisma.DecimalNullableFilter<"anexos_caso"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.DateTimeNullableFilter<"anexos_caso"> | Date | string | null;
    usuario_subida?: Prisma.IntNullableFilter<"anexos_caso"> | number | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type anexos_casoOrderByWithRelationInput = {
    id_anexo?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    peso?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario_subida?: Prisma.SortOrderInput | Prisma.SortOrder;
    casos_sop?: Prisma.casos_sopOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type anexos_casoWhereUniqueInput = Prisma.AtLeast<{
    id_anexo?: number;
    AND?: Prisma.anexos_casoWhereInput | Prisma.anexos_casoWhereInput[];
    OR?: Prisma.anexos_casoWhereInput[];
    NOT?: Prisma.anexos_casoWhereInput | Prisma.anexos_casoWhereInput[];
    id_caso?: Prisma.IntFilter<"anexos_caso"> | number;
    nombre_archivo?: Prisma.StringNullableFilter<"anexos_caso"> | string | null;
    ruta_archivo?: Prisma.StringNullableFilter<"anexos_caso"> | string | null;
    tipo_archivo?: Prisma.StringNullableFilter<"anexos_caso"> | string | null;
    peso?: Prisma.DecimalNullableFilter<"anexos_caso"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.DateTimeNullableFilter<"anexos_caso"> | Date | string | null;
    usuario_subida?: Prisma.IntNullableFilter<"anexos_caso"> | number | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id_anexo">;
export type anexos_casoOrderByWithAggregationInput = {
    id_anexo?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    peso?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario_subida?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.anexos_casoCountOrderByAggregateInput;
    _avg?: Prisma.anexos_casoAvgOrderByAggregateInput;
    _max?: Prisma.anexos_casoMaxOrderByAggregateInput;
    _min?: Prisma.anexos_casoMinOrderByAggregateInput;
    _sum?: Prisma.anexos_casoSumOrderByAggregateInput;
};
export type anexos_casoScalarWhereWithAggregatesInput = {
    AND?: Prisma.anexos_casoScalarWhereWithAggregatesInput | Prisma.anexos_casoScalarWhereWithAggregatesInput[];
    OR?: Prisma.anexos_casoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.anexos_casoScalarWhereWithAggregatesInput | Prisma.anexos_casoScalarWhereWithAggregatesInput[];
    id_anexo?: Prisma.IntWithAggregatesFilter<"anexos_caso"> | number;
    id_caso?: Prisma.IntWithAggregatesFilter<"anexos_caso"> | number;
    nombre_archivo?: Prisma.StringNullableWithAggregatesFilter<"anexos_caso"> | string | null;
    ruta_archivo?: Prisma.StringNullableWithAggregatesFilter<"anexos_caso"> | string | null;
    tipo_archivo?: Prisma.StringNullableWithAggregatesFilter<"anexos_caso"> | string | null;
    peso?: Prisma.DecimalNullableWithAggregatesFilter<"anexos_caso"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.DateTimeNullableWithAggregatesFilter<"anexos_caso"> | Date | string | null;
    usuario_subida?: Prisma.IntNullableWithAggregatesFilter<"anexos_caso"> | number | null;
};
export type anexos_casoCreateInput = {
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutAnexos_casoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutAnexos_casoInput;
};
export type anexos_casoUncheckedCreateInput = {
    id_anexo?: number;
    id_caso: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    usuario_subida?: number | null;
};
export type anexos_casoUpdateInput = {
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutAnexos_casoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutAnexos_casoNestedInput;
};
export type anexos_casoUncheckedUpdateInput = {
    id_anexo?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario_subida?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type anexos_casoCreateManyInput = {
    id_anexo?: number;
    id_caso: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    usuario_subida?: number | null;
};
export type anexos_casoUpdateManyMutationInput = {
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type anexos_casoUncheckedUpdateManyInput = {
    id_anexo?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario_subida?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type anexos_casoCountOrderByAggregateInput = {
    id_anexo?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrder;
    usuario_subida?: Prisma.SortOrder;
};
export type anexos_casoAvgOrderByAggregateInput = {
    id_anexo?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    usuario_subida?: Prisma.SortOrder;
};
export type anexos_casoMaxOrderByAggregateInput = {
    id_anexo?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrder;
    usuario_subida?: Prisma.SortOrder;
};
export type anexos_casoMinOrderByAggregateInput = {
    id_anexo?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    nombre_archivo?: Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrder;
    usuario_subida?: Prisma.SortOrder;
};
export type anexos_casoSumOrderByAggregateInput = {
    id_anexo?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    usuario_subida?: Prisma.SortOrder;
};
export type Anexos_casoListRelationFilter = {
    every?: Prisma.anexos_casoWhereInput;
    some?: Prisma.anexos_casoWhereInput;
    none?: Prisma.anexos_casoWhereInput;
};
export type anexos_casoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type anexos_casoCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.anexos_casoCreateWithoutCasos_sopInput, Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.anexos_casoCreateWithoutCasos_sopInput[] | Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.anexos_casoCreateOrConnectWithoutCasos_sopInput | Prisma.anexos_casoCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.anexos_casoCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
};
export type anexos_casoUncheckedCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.anexos_casoCreateWithoutCasos_sopInput, Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.anexos_casoCreateWithoutCasos_sopInput[] | Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.anexos_casoCreateOrConnectWithoutCasos_sopInput | Prisma.anexos_casoCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.anexos_casoCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
};
export type anexos_casoUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.anexos_casoCreateWithoutCasos_sopInput, Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.anexos_casoCreateWithoutCasos_sopInput[] | Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.anexos_casoCreateOrConnectWithoutCasos_sopInput | Prisma.anexos_casoCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.anexos_casoUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.anexos_casoUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.anexos_casoCreateManyCasos_sopInputEnvelope;
    set?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    disconnect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    delete?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    connect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    update?: Prisma.anexos_casoUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.anexos_casoUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.anexos_casoUpdateManyWithWhereWithoutCasos_sopInput | Prisma.anexos_casoUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.anexos_casoScalarWhereInput | Prisma.anexos_casoScalarWhereInput[];
};
export type anexos_casoUncheckedUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.anexos_casoCreateWithoutCasos_sopInput, Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput> | Prisma.anexos_casoCreateWithoutCasos_sopInput[] | Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.anexos_casoCreateOrConnectWithoutCasos_sopInput | Prisma.anexos_casoCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.anexos_casoUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.anexos_casoUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.anexos_casoCreateManyCasos_sopInputEnvelope;
    set?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    disconnect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    delete?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    connect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    update?: Prisma.anexos_casoUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.anexos_casoUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.anexos_casoUpdateManyWithWhereWithoutCasos_sopInput | Prisma.anexos_casoUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.anexos_casoScalarWhereInput | Prisma.anexos_casoScalarWhereInput[];
};
export type anexos_casoCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.anexos_casoCreateWithoutUsuariosInput, Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput> | Prisma.anexos_casoCreateWithoutUsuariosInput[] | Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.anexos_casoCreateOrConnectWithoutUsuariosInput | Prisma.anexos_casoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.anexos_casoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
};
export type anexos_casoUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.anexos_casoCreateWithoutUsuariosInput, Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput> | Prisma.anexos_casoCreateWithoutUsuariosInput[] | Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.anexos_casoCreateOrConnectWithoutUsuariosInput | Prisma.anexos_casoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.anexos_casoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
};
export type anexos_casoUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.anexos_casoCreateWithoutUsuariosInput, Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput> | Prisma.anexos_casoCreateWithoutUsuariosInput[] | Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.anexos_casoCreateOrConnectWithoutUsuariosInput | Prisma.anexos_casoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.anexos_casoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.anexos_casoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.anexos_casoCreateManyUsuariosInputEnvelope;
    set?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    disconnect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    delete?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    connect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    update?: Prisma.anexos_casoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.anexos_casoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.anexos_casoUpdateManyWithWhereWithoutUsuariosInput | Prisma.anexos_casoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.anexos_casoScalarWhereInput | Prisma.anexos_casoScalarWhereInput[];
};
export type anexos_casoUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.anexos_casoCreateWithoutUsuariosInput, Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput> | Prisma.anexos_casoCreateWithoutUsuariosInput[] | Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.anexos_casoCreateOrConnectWithoutUsuariosInput | Prisma.anexos_casoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.anexos_casoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.anexos_casoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.anexos_casoCreateManyUsuariosInputEnvelope;
    set?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    disconnect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    delete?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    connect?: Prisma.anexos_casoWhereUniqueInput | Prisma.anexos_casoWhereUniqueInput[];
    update?: Prisma.anexos_casoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.anexos_casoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.anexos_casoUpdateManyWithWhereWithoutUsuariosInput | Prisma.anexos_casoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.anexos_casoScalarWhereInput | Prisma.anexos_casoScalarWhereInput[];
};
export type anexos_casoCreateWithoutCasos_sopInput = {
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutAnexos_casoInput;
};
export type anexos_casoUncheckedCreateWithoutCasos_sopInput = {
    id_anexo?: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    usuario_subida?: number | null;
};
export type anexos_casoCreateOrConnectWithoutCasos_sopInput = {
    where: Prisma.anexos_casoWhereUniqueInput;
    create: Prisma.XOR<Prisma.anexos_casoCreateWithoutCasos_sopInput, Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput>;
};
export type anexos_casoCreateManyCasos_sopInputEnvelope = {
    data: Prisma.anexos_casoCreateManyCasos_sopInput | Prisma.anexos_casoCreateManyCasos_sopInput[];
    skipDuplicates?: boolean;
};
export type anexos_casoUpsertWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.anexos_casoWhereUniqueInput;
    update: Prisma.XOR<Prisma.anexos_casoUpdateWithoutCasos_sopInput, Prisma.anexos_casoUncheckedUpdateWithoutCasos_sopInput>;
    create: Prisma.XOR<Prisma.anexos_casoCreateWithoutCasos_sopInput, Prisma.anexos_casoUncheckedCreateWithoutCasos_sopInput>;
};
export type anexos_casoUpdateWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.anexos_casoWhereUniqueInput;
    data: Prisma.XOR<Prisma.anexos_casoUpdateWithoutCasos_sopInput, Prisma.anexos_casoUncheckedUpdateWithoutCasos_sopInput>;
};
export type anexos_casoUpdateManyWithWhereWithoutCasos_sopInput = {
    where: Prisma.anexos_casoScalarWhereInput;
    data: Prisma.XOR<Prisma.anexos_casoUpdateManyMutationInput, Prisma.anexos_casoUncheckedUpdateManyWithoutCasos_sopInput>;
};
export type anexos_casoScalarWhereInput = {
    AND?: Prisma.anexos_casoScalarWhereInput | Prisma.anexos_casoScalarWhereInput[];
    OR?: Prisma.anexos_casoScalarWhereInput[];
    NOT?: Prisma.anexos_casoScalarWhereInput | Prisma.anexos_casoScalarWhereInput[];
    id_anexo?: Prisma.IntFilter<"anexos_caso"> | number;
    id_caso?: Prisma.IntFilter<"anexos_caso"> | number;
    nombre_archivo?: Prisma.StringNullableFilter<"anexos_caso"> | string | null;
    ruta_archivo?: Prisma.StringNullableFilter<"anexos_caso"> | string | null;
    tipo_archivo?: Prisma.StringNullableFilter<"anexos_caso"> | string | null;
    peso?: Prisma.DecimalNullableFilter<"anexos_caso"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.DateTimeNullableFilter<"anexos_caso"> | Date | string | null;
    usuario_subida?: Prisma.IntNullableFilter<"anexos_caso"> | number | null;
};
export type anexos_casoCreateWithoutUsuariosInput = {
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutAnexos_casoInput;
};
export type anexos_casoUncheckedCreateWithoutUsuariosInput = {
    id_anexo?: number;
    id_caso: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
};
export type anexos_casoCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.anexos_casoWhereUniqueInput;
    create: Prisma.XOR<Prisma.anexos_casoCreateWithoutUsuariosInput, Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput>;
};
export type anexos_casoCreateManyUsuariosInputEnvelope = {
    data: Prisma.anexos_casoCreateManyUsuariosInput | Prisma.anexos_casoCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type anexos_casoUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.anexos_casoWhereUniqueInput;
    update: Prisma.XOR<Prisma.anexos_casoUpdateWithoutUsuariosInput, Prisma.anexos_casoUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.anexos_casoCreateWithoutUsuariosInput, Prisma.anexos_casoUncheckedCreateWithoutUsuariosInput>;
};
export type anexos_casoUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.anexos_casoWhereUniqueInput;
    data: Prisma.XOR<Prisma.anexos_casoUpdateWithoutUsuariosInput, Prisma.anexos_casoUncheckedUpdateWithoutUsuariosInput>;
};
export type anexos_casoUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.anexos_casoScalarWhereInput;
    data: Prisma.XOR<Prisma.anexos_casoUpdateManyMutationInput, Prisma.anexos_casoUncheckedUpdateManyWithoutUsuariosInput>;
};
export type anexos_casoCreateManyCasos_sopInput = {
    id_anexo?: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
    usuario_subida?: number | null;
};
export type anexos_casoUpdateWithoutCasos_sopInput = {
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuarios?: Prisma.usuariosUpdateOneWithoutAnexos_casoNestedInput;
};
export type anexos_casoUncheckedUpdateWithoutCasos_sopInput = {
    id_anexo?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario_subida?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type anexos_casoUncheckedUpdateManyWithoutCasos_sopInput = {
    id_anexo?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario_subida?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type anexos_casoCreateManyUsuariosInput = {
    id_anexo?: number;
    id_caso: number;
    nombre_archivo?: string | null;
    ruta_archivo?: string | null;
    tipo_archivo?: string | null;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Date | string | null;
};
export type anexos_casoUpdateWithoutUsuariosInput = {
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutAnexos_casoNestedInput;
};
export type anexos_casoUncheckedUpdateWithoutUsuariosInput = {
    id_anexo?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type anexos_casoUncheckedUpdateManyWithoutUsuariosInput = {
    id_anexo?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruta_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type anexos_casoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_anexo?: boolean;
    id_caso?: boolean;
    nombre_archivo?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    peso?: boolean;
    fecha_subida?: boolean;
    usuario_subida?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.anexos_caso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["anexos_caso"]>;
export type anexos_casoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_anexo?: boolean;
    id_caso?: boolean;
    nombre_archivo?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    peso?: boolean;
    fecha_subida?: boolean;
    usuario_subida?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.anexos_caso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["anexos_caso"]>;
export type anexos_casoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_anexo?: boolean;
    id_caso?: boolean;
    nombre_archivo?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    peso?: boolean;
    fecha_subida?: boolean;
    usuario_subida?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.anexos_caso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["anexos_caso"]>;
export type anexos_casoSelectScalar = {
    id_anexo?: boolean;
    id_caso?: boolean;
    nombre_archivo?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    peso?: boolean;
    fecha_subida?: boolean;
    usuario_subida?: boolean;
};
export type anexos_casoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_anexo" | "id_caso" | "nombre_archivo" | "ruta_archivo" | "tipo_archivo" | "peso" | "fecha_subida" | "usuario_subida", ExtArgs["result"]["anexos_caso"]>;
export type anexos_casoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.anexos_caso$usuariosArgs<ExtArgs>;
};
export type anexos_casoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.anexos_caso$usuariosArgs<ExtArgs>;
};
export type anexos_casoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.anexos_caso$usuariosArgs<ExtArgs>;
};
export type $anexos_casoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "anexos_caso";
    objects: {
        casos_sop: Prisma.$casos_sopPayload<ExtArgs>;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_anexo: number;
        id_caso: number;
        nombre_archivo: string | null;
        ruta_archivo: string | null;
        tipo_archivo: string | null;
        peso: runtime.Decimal | null;
        fecha_subida: Date | null;
        usuario_subida: number | null;
    }, ExtArgs["result"]["anexos_caso"]>;
    composites: {};
};
export type anexos_casoGetPayload<S extends boolean | null | undefined | anexos_casoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload, S>;
export type anexos_casoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<anexos_casoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Anexos_casoCountAggregateInputType | true;
};
export interface anexos_casoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['anexos_caso'];
        meta: {
            name: 'anexos_caso';
        };
    };
    /**
     * Find zero or one Anexos_caso that matches the filter.
     * @param {anexos_casoFindUniqueArgs} args - Arguments to find a Anexos_caso
     * @example
     * // Get one Anexos_caso
     * const anexos_caso = await prisma.anexos_caso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends anexos_casoFindUniqueArgs>(args: Prisma.SelectSubset<T, anexos_casoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__anexos_casoClient<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Anexos_caso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {anexos_casoFindUniqueOrThrowArgs} args - Arguments to find a Anexos_caso
     * @example
     * // Get one Anexos_caso
     * const anexos_caso = await prisma.anexos_caso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends anexos_casoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, anexos_casoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__anexos_casoClient<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Anexos_caso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {anexos_casoFindFirstArgs} args - Arguments to find a Anexos_caso
     * @example
     * // Get one Anexos_caso
     * const anexos_caso = await prisma.anexos_caso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends anexos_casoFindFirstArgs>(args?: Prisma.SelectSubset<T, anexos_casoFindFirstArgs<ExtArgs>>): Prisma.Prisma__anexos_casoClient<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Anexos_caso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {anexos_casoFindFirstOrThrowArgs} args - Arguments to find a Anexos_caso
     * @example
     * // Get one Anexos_caso
     * const anexos_caso = await prisma.anexos_caso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends anexos_casoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, anexos_casoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__anexos_casoClient<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Anexos_casos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {anexos_casoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Anexos_casos
     * const anexos_casos = await prisma.anexos_caso.findMany()
     *
     * // Get first 10 Anexos_casos
     * const anexos_casos = await prisma.anexos_caso.findMany({ take: 10 })
     *
     * // Only select the `id_anexo`
     * const anexos_casoWithId_anexoOnly = await prisma.anexos_caso.findMany({ select: { id_anexo: true } })
     *
     */
    findMany<T extends anexos_casoFindManyArgs>(args?: Prisma.SelectSubset<T, anexos_casoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Anexos_caso.
     * @param {anexos_casoCreateArgs} args - Arguments to create a Anexos_caso.
     * @example
     * // Create one Anexos_caso
     * const Anexos_caso = await prisma.anexos_caso.create({
     *   data: {
     *     // ... data to create a Anexos_caso
     *   }
     * })
     *
     */
    create<T extends anexos_casoCreateArgs>(args: Prisma.SelectSubset<T, anexos_casoCreateArgs<ExtArgs>>): Prisma.Prisma__anexos_casoClient<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Anexos_casos.
     * @param {anexos_casoCreateManyArgs} args - Arguments to create many Anexos_casos.
     * @example
     * // Create many Anexos_casos
     * const anexos_caso = await prisma.anexos_caso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends anexos_casoCreateManyArgs>(args?: Prisma.SelectSubset<T, anexos_casoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Anexos_casos and returns the data saved in the database.
     * @param {anexos_casoCreateManyAndReturnArgs} args - Arguments to create many Anexos_casos.
     * @example
     * // Create many Anexos_casos
     * const anexos_caso = await prisma.anexos_caso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Anexos_casos and only return the `id_anexo`
     * const anexos_casoWithId_anexoOnly = await prisma.anexos_caso.createManyAndReturn({
     *   select: { id_anexo: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends anexos_casoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, anexos_casoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Anexos_caso.
     * @param {anexos_casoDeleteArgs} args - Arguments to delete one Anexos_caso.
     * @example
     * // Delete one Anexos_caso
     * const Anexos_caso = await prisma.anexos_caso.delete({
     *   where: {
     *     // ... filter to delete one Anexos_caso
     *   }
     * })
     *
     */
    delete<T extends anexos_casoDeleteArgs>(args: Prisma.SelectSubset<T, anexos_casoDeleteArgs<ExtArgs>>): Prisma.Prisma__anexos_casoClient<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Anexos_caso.
     * @param {anexos_casoUpdateArgs} args - Arguments to update one Anexos_caso.
     * @example
     * // Update one Anexos_caso
     * const anexos_caso = await prisma.anexos_caso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends anexos_casoUpdateArgs>(args: Prisma.SelectSubset<T, anexos_casoUpdateArgs<ExtArgs>>): Prisma.Prisma__anexos_casoClient<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Anexos_casos.
     * @param {anexos_casoDeleteManyArgs} args - Arguments to filter Anexos_casos to delete.
     * @example
     * // Delete a few Anexos_casos
     * const { count } = await prisma.anexos_caso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends anexos_casoDeleteManyArgs>(args?: Prisma.SelectSubset<T, anexos_casoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Anexos_casos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {anexos_casoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Anexos_casos
     * const anexos_caso = await prisma.anexos_caso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends anexos_casoUpdateManyArgs>(args: Prisma.SelectSubset<T, anexos_casoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Anexos_casos and returns the data updated in the database.
     * @param {anexos_casoUpdateManyAndReturnArgs} args - Arguments to update many Anexos_casos.
     * @example
     * // Update many Anexos_casos
     * const anexos_caso = await prisma.anexos_caso.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Anexos_casos and only return the `id_anexo`
     * const anexos_casoWithId_anexoOnly = await prisma.anexos_caso.updateManyAndReturn({
     *   select: { id_anexo: true },
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
    updateManyAndReturn<T extends anexos_casoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, anexos_casoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Anexos_caso.
     * @param {anexos_casoUpsertArgs} args - Arguments to update or create a Anexos_caso.
     * @example
     * // Update or create a Anexos_caso
     * const anexos_caso = await prisma.anexos_caso.upsert({
     *   create: {
     *     // ... data to create a Anexos_caso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Anexos_caso we want to update
     *   }
     * })
     */
    upsert<T extends anexos_casoUpsertArgs>(args: Prisma.SelectSubset<T, anexos_casoUpsertArgs<ExtArgs>>): Prisma.Prisma__anexos_casoClient<runtime.Types.Result.GetResult<Prisma.$anexos_casoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Anexos_casos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {anexos_casoCountArgs} args - Arguments to filter Anexos_casos to count.
     * @example
     * // Count the number of Anexos_casos
     * const count = await prisma.anexos_caso.count({
     *   where: {
     *     // ... the filter for the Anexos_casos we want to count
     *   }
     * })
    **/
    count<T extends anexos_casoCountArgs>(args?: Prisma.Subset<T, anexos_casoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Anexos_casoCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Anexos_caso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Anexos_casoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Anexos_casoAggregateArgs>(args: Prisma.Subset<T, Anexos_casoAggregateArgs>): Prisma.PrismaPromise<GetAnexos_casoAggregateType<T>>;
    /**
     * Group by Anexos_caso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {anexos_casoGroupByArgs} args - Group by arguments.
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
    groupBy<T extends anexos_casoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: anexos_casoGroupByArgs['orderBy'];
    } : {
        orderBy?: anexos_casoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, anexos_casoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnexos_casoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the anexos_caso model
     */
    readonly fields: anexos_casoFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for anexos_caso.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__anexos_casoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    casos_sop<T extends Prisma.casos_sopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sopDefaultArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.anexos_caso$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.anexos_caso$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the anexos_caso model
 */
export interface anexos_casoFieldRefs {
    readonly id_anexo: Prisma.FieldRef<"anexos_caso", 'Int'>;
    readonly id_caso: Prisma.FieldRef<"anexos_caso", 'Int'>;
    readonly nombre_archivo: Prisma.FieldRef<"anexos_caso", 'String'>;
    readonly ruta_archivo: Prisma.FieldRef<"anexos_caso", 'String'>;
    readonly tipo_archivo: Prisma.FieldRef<"anexos_caso", 'String'>;
    readonly peso: Prisma.FieldRef<"anexos_caso", 'Decimal'>;
    readonly fecha_subida: Prisma.FieldRef<"anexos_caso", 'DateTime'>;
    readonly usuario_subida: Prisma.FieldRef<"anexos_caso", 'Int'>;
}
/**
 * anexos_caso findUnique
 */
export type anexos_casoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    /**
     * Filter, which anexos_caso to fetch.
     */
    where: Prisma.anexos_casoWhereUniqueInput;
};
/**
 * anexos_caso findUniqueOrThrow
 */
export type anexos_casoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    /**
     * Filter, which anexos_caso to fetch.
     */
    where: Prisma.anexos_casoWhereUniqueInput;
};
/**
 * anexos_caso findFirst
 */
export type anexos_casoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    /**
     * Filter, which anexos_caso to fetch.
     */
    where?: Prisma.anexos_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of anexos_casos to fetch.
     */
    orderBy?: Prisma.anexos_casoOrderByWithRelationInput | Prisma.anexos_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for anexos_casos.
     */
    cursor?: Prisma.anexos_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` anexos_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` anexos_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of anexos_casos.
     */
    distinct?: Prisma.Anexos_casoScalarFieldEnum | Prisma.Anexos_casoScalarFieldEnum[];
};
/**
 * anexos_caso findFirstOrThrow
 */
export type anexos_casoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    /**
     * Filter, which anexos_caso to fetch.
     */
    where?: Prisma.anexos_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of anexos_casos to fetch.
     */
    orderBy?: Prisma.anexos_casoOrderByWithRelationInput | Prisma.anexos_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for anexos_casos.
     */
    cursor?: Prisma.anexos_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` anexos_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` anexos_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of anexos_casos.
     */
    distinct?: Prisma.Anexos_casoScalarFieldEnum | Prisma.Anexos_casoScalarFieldEnum[];
};
/**
 * anexos_caso findMany
 */
export type anexos_casoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    /**
     * Filter, which anexos_casos to fetch.
     */
    where?: Prisma.anexos_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of anexos_casos to fetch.
     */
    orderBy?: Prisma.anexos_casoOrderByWithRelationInput | Prisma.anexos_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing anexos_casos.
     */
    cursor?: Prisma.anexos_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` anexos_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` anexos_casos.
     */
    skip?: number;
    distinct?: Prisma.Anexos_casoScalarFieldEnum | Prisma.Anexos_casoScalarFieldEnum[];
};
/**
 * anexos_caso create
 */
export type anexos_casoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    /**
     * The data needed to create a anexos_caso.
     */
    data: Prisma.XOR<Prisma.anexos_casoCreateInput, Prisma.anexos_casoUncheckedCreateInput>;
};
/**
 * anexos_caso createMany
 */
export type anexos_casoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many anexos_casos.
     */
    data: Prisma.anexos_casoCreateManyInput | Prisma.anexos_casoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * anexos_caso createManyAndReturn
 */
export type anexos_casoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * The data used to create many anexos_casos.
     */
    data: Prisma.anexos_casoCreateManyInput | Prisma.anexos_casoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * anexos_caso update
 */
export type anexos_casoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    /**
     * The data needed to update a anexos_caso.
     */
    data: Prisma.XOR<Prisma.anexos_casoUpdateInput, Prisma.anexos_casoUncheckedUpdateInput>;
    /**
     * Choose, which anexos_caso to update.
     */
    where: Prisma.anexos_casoWhereUniqueInput;
};
/**
 * anexos_caso updateMany
 */
export type anexos_casoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update anexos_casos.
     */
    data: Prisma.XOR<Prisma.anexos_casoUpdateManyMutationInput, Prisma.anexos_casoUncheckedUpdateManyInput>;
    /**
     * Filter which anexos_casos to update
     */
    where?: Prisma.anexos_casoWhereInput;
    /**
     * Limit how many anexos_casos to update.
     */
    limit?: number;
};
/**
 * anexos_caso updateManyAndReturn
 */
export type anexos_casoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * The data used to update anexos_casos.
     */
    data: Prisma.XOR<Prisma.anexos_casoUpdateManyMutationInput, Prisma.anexos_casoUncheckedUpdateManyInput>;
    /**
     * Filter which anexos_casos to update
     */
    where?: Prisma.anexos_casoWhereInput;
    /**
     * Limit how many anexos_casos to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * anexos_caso upsert
 */
export type anexos_casoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    /**
     * The filter to search for the anexos_caso to update in case it exists.
     */
    where: Prisma.anexos_casoWhereUniqueInput;
    /**
     * In case the anexos_caso found by the `where` argument doesn't exist, create a new anexos_caso with this data.
     */
    create: Prisma.XOR<Prisma.anexos_casoCreateInput, Prisma.anexos_casoUncheckedCreateInput>;
    /**
     * In case the anexos_caso was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.anexos_casoUpdateInput, Prisma.anexos_casoUncheckedUpdateInput>;
};
/**
 * anexos_caso delete
 */
export type anexos_casoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
    /**
     * Filter which anexos_caso to delete.
     */
    where: Prisma.anexos_casoWhereUniqueInput;
};
/**
 * anexos_caso deleteMany
 */
export type anexos_casoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which anexos_casos to delete
     */
    where?: Prisma.anexos_casoWhereInput;
    /**
     * Limit how many anexos_casos to delete.
     */
    limit?: number;
};
/**
 * anexos_caso.usuarios
 */
export type anexos_caso$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * anexos_caso without action
 */
export type anexos_casoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anexos_caso
     */
    select?: Prisma.anexos_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anexos_caso
     */
    omit?: Prisma.anexos_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anexos_casoInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=anexos_caso.d.ts.map