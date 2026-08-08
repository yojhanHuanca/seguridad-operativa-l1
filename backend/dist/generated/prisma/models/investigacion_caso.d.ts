import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model investigacion_caso
 *
 */
export type investigacion_casoModel = runtime.Types.Result.DefaultSelection<Prisma.$investigacion_casoPayload>;
export type AggregateInvestigacion_caso = {
    _count: Investigacion_casoCountAggregateOutputType | null;
    _avg: Investigacion_casoAvgAggregateOutputType | null;
    _sum: Investigacion_casoSumAggregateOutputType | null;
    _min: Investigacion_casoMinAggregateOutputType | null;
    _max: Investigacion_casoMaxAggregateOutputType | null;
};
export type Investigacion_casoAvgAggregateOutputType = {
    id_investigacion: number | null;
    id_caso: number | null;
    investigador: number | null;
};
export type Investigacion_casoSumAggregateOutputType = {
    id_investigacion: number | null;
    id_caso: number | null;
    investigador: number | null;
};
export type Investigacion_casoMinAggregateOutputType = {
    id_investigacion: number | null;
    id_caso: number | null;
    hallazgos: string | null;
    causa_raiz: string | null;
    conclusiones: string | null;
    observaciones: string | null;
    investigador: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Investigacion_casoMaxAggregateOutputType = {
    id_investigacion: number | null;
    id_caso: number | null;
    hallazgos: string | null;
    causa_raiz: string | null;
    conclusiones: string | null;
    observaciones: string | null;
    investigador: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Investigacion_casoCountAggregateOutputType = {
    id_investigacion: number;
    id_caso: number;
    hallazgos: number;
    causa_raiz: number;
    conclusiones: number;
    observaciones: number;
    investigador: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Investigacion_casoAvgAggregateInputType = {
    id_investigacion?: true;
    id_caso?: true;
    investigador?: true;
};
export type Investigacion_casoSumAggregateInputType = {
    id_investigacion?: true;
    id_caso?: true;
    investigador?: true;
};
export type Investigacion_casoMinAggregateInputType = {
    id_investigacion?: true;
    id_caso?: true;
    hallazgos?: true;
    causa_raiz?: true;
    conclusiones?: true;
    observaciones?: true;
    investigador?: true;
    created_at?: true;
    updated_at?: true;
};
export type Investigacion_casoMaxAggregateInputType = {
    id_investigacion?: true;
    id_caso?: true;
    hallazgos?: true;
    causa_raiz?: true;
    conclusiones?: true;
    observaciones?: true;
    investigador?: true;
    created_at?: true;
    updated_at?: true;
};
export type Investigacion_casoCountAggregateInputType = {
    id_investigacion?: true;
    id_caso?: true;
    hallazgos?: true;
    causa_raiz?: true;
    conclusiones?: true;
    observaciones?: true;
    investigador?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Investigacion_casoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which investigacion_caso to aggregate.
     */
    where?: Prisma.investigacion_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of investigacion_casos to fetch.
     */
    orderBy?: Prisma.investigacion_casoOrderByWithRelationInput | Prisma.investigacion_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.investigacion_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` investigacion_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` investigacion_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned investigacion_casos
    **/
    _count?: true | Investigacion_casoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Investigacion_casoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Investigacion_casoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Investigacion_casoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Investigacion_casoMaxAggregateInputType;
};
export type GetInvestigacion_casoAggregateType<T extends Investigacion_casoAggregateArgs> = {
    [P in keyof T & keyof AggregateInvestigacion_caso]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvestigacion_caso[P]> : Prisma.GetScalarType<T[P], AggregateInvestigacion_caso[P]>;
};
export type investigacion_casoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.investigacion_casoWhereInput;
    orderBy?: Prisma.investigacion_casoOrderByWithAggregationInput | Prisma.investigacion_casoOrderByWithAggregationInput[];
    by: Prisma.Investigacion_casoScalarFieldEnum[] | Prisma.Investigacion_casoScalarFieldEnum;
    having?: Prisma.investigacion_casoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Investigacion_casoCountAggregateInputType | true;
    _avg?: Investigacion_casoAvgAggregateInputType;
    _sum?: Investigacion_casoSumAggregateInputType;
    _min?: Investigacion_casoMinAggregateInputType;
    _max?: Investigacion_casoMaxAggregateInputType;
};
export type Investigacion_casoGroupByOutputType = {
    id_investigacion: number;
    id_caso: number;
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones: string | null;
    investigador: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Investigacion_casoCountAggregateOutputType | null;
    _avg: Investigacion_casoAvgAggregateOutputType | null;
    _sum: Investigacion_casoSumAggregateOutputType | null;
    _min: Investigacion_casoMinAggregateOutputType | null;
    _max: Investigacion_casoMaxAggregateOutputType | null;
};
type GetInvestigacion_casoGroupByPayload<T extends investigacion_casoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Investigacion_casoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Investigacion_casoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Investigacion_casoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Investigacion_casoGroupByOutputType[P]>;
}>>;
export type investigacion_casoWhereInput = {
    AND?: Prisma.investigacion_casoWhereInput | Prisma.investigacion_casoWhereInput[];
    OR?: Prisma.investigacion_casoWhereInput[];
    NOT?: Prisma.investigacion_casoWhereInput | Prisma.investigacion_casoWhereInput[];
    id_investigacion?: Prisma.IntFilter<"investigacion_caso"> | number;
    id_caso?: Prisma.IntFilter<"investigacion_caso"> | number;
    hallazgos?: Prisma.StringFilter<"investigacion_caso"> | string;
    causa_raiz?: Prisma.StringFilter<"investigacion_caso"> | string;
    conclusiones?: Prisma.StringFilter<"investigacion_caso"> | string;
    observaciones?: Prisma.StringNullableFilter<"investigacion_caso"> | string | null;
    investigador?: Prisma.IntNullableFilter<"investigacion_caso"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"investigacion_caso"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"investigacion_caso"> | Date | string | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type investigacion_casoOrderByWithRelationInput = {
    id_investigacion?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    hallazgos?: Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    conclusiones?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    investigador?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    casos_sop?: Prisma.casos_sopOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type investigacion_casoWhereUniqueInput = Prisma.AtLeast<{
    id_investigacion?: number;
    id_caso?: number;
    AND?: Prisma.investigacion_casoWhereInput | Prisma.investigacion_casoWhereInput[];
    OR?: Prisma.investigacion_casoWhereInput[];
    NOT?: Prisma.investigacion_casoWhereInput | Prisma.investigacion_casoWhereInput[];
    hallazgos?: Prisma.StringFilter<"investigacion_caso"> | string;
    causa_raiz?: Prisma.StringFilter<"investigacion_caso"> | string;
    conclusiones?: Prisma.StringFilter<"investigacion_caso"> | string;
    observaciones?: Prisma.StringNullableFilter<"investigacion_caso"> | string | null;
    investigador?: Prisma.IntNullableFilter<"investigacion_caso"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"investigacion_caso"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"investigacion_caso"> | Date | string | null;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id_investigacion" | "id_caso">;
export type investigacion_casoOrderByWithAggregationInput = {
    id_investigacion?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    hallazgos?: Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    conclusiones?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    investigador?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.investigacion_casoCountOrderByAggregateInput;
    _avg?: Prisma.investigacion_casoAvgOrderByAggregateInput;
    _max?: Prisma.investigacion_casoMaxOrderByAggregateInput;
    _min?: Prisma.investigacion_casoMinOrderByAggregateInput;
    _sum?: Prisma.investigacion_casoSumOrderByAggregateInput;
};
export type investigacion_casoScalarWhereWithAggregatesInput = {
    AND?: Prisma.investigacion_casoScalarWhereWithAggregatesInput | Prisma.investigacion_casoScalarWhereWithAggregatesInput[];
    OR?: Prisma.investigacion_casoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.investigacion_casoScalarWhereWithAggregatesInput | Prisma.investigacion_casoScalarWhereWithAggregatesInput[];
    id_investigacion?: Prisma.IntWithAggregatesFilter<"investigacion_caso"> | number;
    id_caso?: Prisma.IntWithAggregatesFilter<"investigacion_caso"> | number;
    hallazgos?: Prisma.StringWithAggregatesFilter<"investigacion_caso"> | string;
    causa_raiz?: Prisma.StringWithAggregatesFilter<"investigacion_caso"> | string;
    conclusiones?: Prisma.StringWithAggregatesFilter<"investigacion_caso"> | string;
    observaciones?: Prisma.StringNullableWithAggregatesFilter<"investigacion_caso"> | string | null;
    investigador?: Prisma.IntNullableWithAggregatesFilter<"investigacion_caso"> | number | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"investigacion_caso"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"investigacion_caso"> | Date | string | null;
};
export type investigacion_casoCreateInput = {
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutInvestigacion_casoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutInvestigacion_casoInput;
};
export type investigacion_casoUncheckedCreateInput = {
    id_investigacion?: number;
    id_caso: number;
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones?: string | null;
    investigador?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type investigacion_casoUpdateInput = {
    hallazgos?: Prisma.StringFieldUpdateOperationsInput | string;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    conclusiones?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutInvestigacion_casoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutInvestigacion_casoNestedInput;
};
export type investigacion_casoUncheckedUpdateInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    hallazgos?: Prisma.StringFieldUpdateOperationsInput | string;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    conclusiones?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    investigador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacion_casoCreateManyInput = {
    id_investigacion?: number;
    id_caso: number;
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones?: string | null;
    investigador?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type investigacion_casoUpdateManyMutationInput = {
    hallazgos?: Prisma.StringFieldUpdateOperationsInput | string;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    conclusiones?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacion_casoUncheckedUpdateManyInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    hallazgos?: Prisma.StringFieldUpdateOperationsInput | string;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    conclusiones?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    investigador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Investigacion_casoNullableScalarRelationFilter = {
    is?: Prisma.investigacion_casoWhereInput | null;
    isNot?: Prisma.investigacion_casoWhereInput | null;
};
export type investigacion_casoCountOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    hallazgos?: Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    conclusiones?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    investigador?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type investigacion_casoAvgOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    investigador?: Prisma.SortOrder;
};
export type investigacion_casoMaxOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    hallazgos?: Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    conclusiones?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    investigador?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type investigacion_casoMinOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    hallazgos?: Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    conclusiones?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    investigador?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type investigacion_casoSumOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    investigador?: Prisma.SortOrder;
};
export type Investigacion_casoListRelationFilter = {
    every?: Prisma.investigacion_casoWhereInput;
    some?: Prisma.investigacion_casoWhereInput;
    none?: Prisma.investigacion_casoWhereInput;
};
export type investigacion_casoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type investigacion_casoCreateNestedOneWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.investigacion_casoCreateWithoutCasos_sopInput, Prisma.investigacion_casoUncheckedCreateWithoutCasos_sopInput>;
    connectOrCreate?: Prisma.investigacion_casoCreateOrConnectWithoutCasos_sopInput;
    connect?: Prisma.investigacion_casoWhereUniqueInput;
};
export type investigacion_casoUncheckedCreateNestedOneWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.investigacion_casoCreateWithoutCasos_sopInput, Prisma.investigacion_casoUncheckedCreateWithoutCasos_sopInput>;
    connectOrCreate?: Prisma.investigacion_casoCreateOrConnectWithoutCasos_sopInput;
    connect?: Prisma.investigacion_casoWhereUniqueInput;
};
export type investigacion_casoUpdateOneWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.investigacion_casoCreateWithoutCasos_sopInput, Prisma.investigacion_casoUncheckedCreateWithoutCasos_sopInput>;
    connectOrCreate?: Prisma.investigacion_casoCreateOrConnectWithoutCasos_sopInput;
    upsert?: Prisma.investigacion_casoUpsertWithoutCasos_sopInput;
    disconnect?: Prisma.investigacion_casoWhereInput | boolean;
    delete?: Prisma.investigacion_casoWhereInput | boolean;
    connect?: Prisma.investigacion_casoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.investigacion_casoUpdateToOneWithWhereWithoutCasos_sopInput, Prisma.investigacion_casoUpdateWithoutCasos_sopInput>, Prisma.investigacion_casoUncheckedUpdateWithoutCasos_sopInput>;
};
export type investigacion_casoUncheckedUpdateOneWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.investigacion_casoCreateWithoutCasos_sopInput, Prisma.investigacion_casoUncheckedCreateWithoutCasos_sopInput>;
    connectOrCreate?: Prisma.investigacion_casoCreateOrConnectWithoutCasos_sopInput;
    upsert?: Prisma.investigacion_casoUpsertWithoutCasos_sopInput;
    disconnect?: Prisma.investigacion_casoWhereInput | boolean;
    delete?: Prisma.investigacion_casoWhereInput | boolean;
    connect?: Prisma.investigacion_casoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.investigacion_casoUpdateToOneWithWhereWithoutCasos_sopInput, Prisma.investigacion_casoUpdateWithoutCasos_sopInput>, Prisma.investigacion_casoUncheckedUpdateWithoutCasos_sopInput>;
};
export type investigacion_casoCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.investigacion_casoCreateWithoutUsuariosInput, Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput> | Prisma.investigacion_casoCreateWithoutUsuariosInput[] | Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.investigacion_casoCreateOrConnectWithoutUsuariosInput | Prisma.investigacion_casoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.investigacion_casoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
};
export type investigacion_casoUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.investigacion_casoCreateWithoutUsuariosInput, Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput> | Prisma.investigacion_casoCreateWithoutUsuariosInput[] | Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.investigacion_casoCreateOrConnectWithoutUsuariosInput | Prisma.investigacion_casoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.investigacion_casoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
};
export type investigacion_casoUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.investigacion_casoCreateWithoutUsuariosInput, Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput> | Prisma.investigacion_casoCreateWithoutUsuariosInput[] | Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.investigacion_casoCreateOrConnectWithoutUsuariosInput | Prisma.investigacion_casoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.investigacion_casoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.investigacion_casoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.investigacion_casoCreateManyUsuariosInputEnvelope;
    set?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
    disconnect?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
    delete?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
    connect?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
    update?: Prisma.investigacion_casoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.investigacion_casoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.investigacion_casoUpdateManyWithWhereWithoutUsuariosInput | Prisma.investigacion_casoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.investigacion_casoScalarWhereInput | Prisma.investigacion_casoScalarWhereInput[];
};
export type investigacion_casoUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.investigacion_casoCreateWithoutUsuariosInput, Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput> | Prisma.investigacion_casoCreateWithoutUsuariosInput[] | Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.investigacion_casoCreateOrConnectWithoutUsuariosInput | Prisma.investigacion_casoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.investigacion_casoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.investigacion_casoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.investigacion_casoCreateManyUsuariosInputEnvelope;
    set?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
    disconnect?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
    delete?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
    connect?: Prisma.investigacion_casoWhereUniqueInput | Prisma.investigacion_casoWhereUniqueInput[];
    update?: Prisma.investigacion_casoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.investigacion_casoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.investigacion_casoUpdateManyWithWhereWithoutUsuariosInput | Prisma.investigacion_casoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.investigacion_casoScalarWhereInput | Prisma.investigacion_casoScalarWhereInput[];
};
export type investigacion_casoCreateWithoutCasos_sopInput = {
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutInvestigacion_casoInput;
};
export type investigacion_casoUncheckedCreateWithoutCasos_sopInput = {
    id_investigacion?: number;
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones?: string | null;
    investigador?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type investigacion_casoCreateOrConnectWithoutCasos_sopInput = {
    where: Prisma.investigacion_casoWhereUniqueInput;
    create: Prisma.XOR<Prisma.investigacion_casoCreateWithoutCasos_sopInput, Prisma.investigacion_casoUncheckedCreateWithoutCasos_sopInput>;
};
export type investigacion_casoUpsertWithoutCasos_sopInput = {
    update: Prisma.XOR<Prisma.investigacion_casoUpdateWithoutCasos_sopInput, Prisma.investigacion_casoUncheckedUpdateWithoutCasos_sopInput>;
    create: Prisma.XOR<Prisma.investigacion_casoCreateWithoutCasos_sopInput, Prisma.investigacion_casoUncheckedCreateWithoutCasos_sopInput>;
    where?: Prisma.investigacion_casoWhereInput;
};
export type investigacion_casoUpdateToOneWithWhereWithoutCasos_sopInput = {
    where?: Prisma.investigacion_casoWhereInput;
    data: Prisma.XOR<Prisma.investigacion_casoUpdateWithoutCasos_sopInput, Prisma.investigacion_casoUncheckedUpdateWithoutCasos_sopInput>;
};
export type investigacion_casoUpdateWithoutCasos_sopInput = {
    hallazgos?: Prisma.StringFieldUpdateOperationsInput | string;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    conclusiones?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuarios?: Prisma.usuariosUpdateOneWithoutInvestigacion_casoNestedInput;
};
export type investigacion_casoUncheckedUpdateWithoutCasos_sopInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    hallazgos?: Prisma.StringFieldUpdateOperationsInput | string;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    conclusiones?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    investigador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacion_casoCreateWithoutUsuariosInput = {
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutInvestigacion_casoInput;
};
export type investigacion_casoUncheckedCreateWithoutUsuariosInput = {
    id_investigacion?: number;
    id_caso: number;
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type investigacion_casoCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.investigacion_casoWhereUniqueInput;
    create: Prisma.XOR<Prisma.investigacion_casoCreateWithoutUsuariosInput, Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput>;
};
export type investigacion_casoCreateManyUsuariosInputEnvelope = {
    data: Prisma.investigacion_casoCreateManyUsuariosInput | Prisma.investigacion_casoCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type investigacion_casoUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.investigacion_casoWhereUniqueInput;
    update: Prisma.XOR<Prisma.investigacion_casoUpdateWithoutUsuariosInput, Prisma.investigacion_casoUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.investigacion_casoCreateWithoutUsuariosInput, Prisma.investigacion_casoUncheckedCreateWithoutUsuariosInput>;
};
export type investigacion_casoUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.investigacion_casoWhereUniqueInput;
    data: Prisma.XOR<Prisma.investigacion_casoUpdateWithoutUsuariosInput, Prisma.investigacion_casoUncheckedUpdateWithoutUsuariosInput>;
};
export type investigacion_casoUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.investigacion_casoScalarWhereInput;
    data: Prisma.XOR<Prisma.investigacion_casoUpdateManyMutationInput, Prisma.investigacion_casoUncheckedUpdateManyWithoutUsuariosInput>;
};
export type investigacion_casoScalarWhereInput = {
    AND?: Prisma.investigacion_casoScalarWhereInput | Prisma.investigacion_casoScalarWhereInput[];
    OR?: Prisma.investigacion_casoScalarWhereInput[];
    NOT?: Prisma.investigacion_casoScalarWhereInput | Prisma.investigacion_casoScalarWhereInput[];
    id_investigacion?: Prisma.IntFilter<"investigacion_caso"> | number;
    id_caso?: Prisma.IntFilter<"investigacion_caso"> | number;
    hallazgos?: Prisma.StringFilter<"investigacion_caso"> | string;
    causa_raiz?: Prisma.StringFilter<"investigacion_caso"> | string;
    conclusiones?: Prisma.StringFilter<"investigacion_caso"> | string;
    observaciones?: Prisma.StringNullableFilter<"investigacion_caso"> | string | null;
    investigador?: Prisma.IntNullableFilter<"investigacion_caso"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"investigacion_caso"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"investigacion_caso"> | Date | string | null;
};
export type investigacion_casoCreateManyUsuariosInput = {
    id_investigacion?: number;
    id_caso: number;
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type investigacion_casoUpdateWithoutUsuariosInput = {
    hallazgos?: Prisma.StringFieldUpdateOperationsInput | string;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    conclusiones?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutInvestigacion_casoNestedInput;
};
export type investigacion_casoUncheckedUpdateWithoutUsuariosInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    hallazgos?: Prisma.StringFieldUpdateOperationsInput | string;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    conclusiones?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacion_casoUncheckedUpdateManyWithoutUsuariosInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    hallazgos?: Prisma.StringFieldUpdateOperationsInput | string;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    conclusiones?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacion_casoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_investigacion?: boolean;
    id_caso?: boolean;
    hallazgos?: boolean;
    causa_raiz?: boolean;
    conclusiones?: boolean;
    observaciones?: boolean;
    investigador?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigacion_caso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["investigacion_caso"]>;
export type investigacion_casoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_investigacion?: boolean;
    id_caso?: boolean;
    hallazgos?: boolean;
    causa_raiz?: boolean;
    conclusiones?: boolean;
    observaciones?: boolean;
    investigador?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigacion_caso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["investigacion_caso"]>;
export type investigacion_casoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_investigacion?: boolean;
    id_caso?: boolean;
    hallazgos?: boolean;
    causa_raiz?: boolean;
    conclusiones?: boolean;
    observaciones?: boolean;
    investigador?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigacion_caso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["investigacion_caso"]>;
export type investigacion_casoSelectScalar = {
    id_investigacion?: boolean;
    id_caso?: boolean;
    hallazgos?: boolean;
    causa_raiz?: boolean;
    conclusiones?: boolean;
    observaciones?: boolean;
    investigador?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type investigacion_casoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_investigacion" | "id_caso" | "hallazgos" | "causa_raiz" | "conclusiones" | "observaciones" | "investigador" | "created_at" | "updated_at", ExtArgs["result"]["investigacion_caso"]>;
export type investigacion_casoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigacion_caso$usuariosArgs<ExtArgs>;
};
export type investigacion_casoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigacion_caso$usuariosArgs<ExtArgs>;
};
export type investigacion_casoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigacion_caso$usuariosArgs<ExtArgs>;
};
export type $investigacion_casoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "investigacion_caso";
    objects: {
        casos_sop: Prisma.$casos_sopPayload<ExtArgs>;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_investigacion: number;
        id_caso: number;
        hallazgos: string;
        causa_raiz: string;
        conclusiones: string;
        observaciones: string | null;
        investigador: number | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["investigacion_caso"]>;
    composites: {};
};
export type investigacion_casoGetPayload<S extends boolean | null | undefined | investigacion_casoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload, S>;
export type investigacion_casoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<investigacion_casoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Investigacion_casoCountAggregateInputType | true;
};
export interface investigacion_casoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['investigacion_caso'];
        meta: {
            name: 'investigacion_caso';
        };
    };
    /**
     * Find zero or one Investigacion_caso that matches the filter.
     * @param {investigacion_casoFindUniqueArgs} args - Arguments to find a Investigacion_caso
     * @example
     * // Get one Investigacion_caso
     * const investigacion_caso = await prisma.investigacion_caso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends investigacion_casoFindUniqueArgs>(args: Prisma.SelectSubset<T, investigacion_casoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__investigacion_casoClient<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Investigacion_caso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {investigacion_casoFindUniqueOrThrowArgs} args - Arguments to find a Investigacion_caso
     * @example
     * // Get one Investigacion_caso
     * const investigacion_caso = await prisma.investigacion_caso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends investigacion_casoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, investigacion_casoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__investigacion_casoClient<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Investigacion_caso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacion_casoFindFirstArgs} args - Arguments to find a Investigacion_caso
     * @example
     * // Get one Investigacion_caso
     * const investigacion_caso = await prisma.investigacion_caso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends investigacion_casoFindFirstArgs>(args?: Prisma.SelectSubset<T, investigacion_casoFindFirstArgs<ExtArgs>>): Prisma.Prisma__investigacion_casoClient<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Investigacion_caso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacion_casoFindFirstOrThrowArgs} args - Arguments to find a Investigacion_caso
     * @example
     * // Get one Investigacion_caso
     * const investigacion_caso = await prisma.investigacion_caso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends investigacion_casoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, investigacion_casoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__investigacion_casoClient<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Investigacion_casos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacion_casoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investigacion_casos
     * const investigacion_casos = await prisma.investigacion_caso.findMany()
     *
     * // Get first 10 Investigacion_casos
     * const investigacion_casos = await prisma.investigacion_caso.findMany({ take: 10 })
     *
     * // Only select the `id_investigacion`
     * const investigacion_casoWithId_investigacionOnly = await prisma.investigacion_caso.findMany({ select: { id_investigacion: true } })
     *
     */
    findMany<T extends investigacion_casoFindManyArgs>(args?: Prisma.SelectSubset<T, investigacion_casoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Investigacion_caso.
     * @param {investigacion_casoCreateArgs} args - Arguments to create a Investigacion_caso.
     * @example
     * // Create one Investigacion_caso
     * const Investigacion_caso = await prisma.investigacion_caso.create({
     *   data: {
     *     // ... data to create a Investigacion_caso
     *   }
     * })
     *
     */
    create<T extends investigacion_casoCreateArgs>(args: Prisma.SelectSubset<T, investigacion_casoCreateArgs<ExtArgs>>): Prisma.Prisma__investigacion_casoClient<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Investigacion_casos.
     * @param {investigacion_casoCreateManyArgs} args - Arguments to create many Investigacion_casos.
     * @example
     * // Create many Investigacion_casos
     * const investigacion_caso = await prisma.investigacion_caso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends investigacion_casoCreateManyArgs>(args?: Prisma.SelectSubset<T, investigacion_casoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Investigacion_casos and returns the data saved in the database.
     * @param {investigacion_casoCreateManyAndReturnArgs} args - Arguments to create many Investigacion_casos.
     * @example
     * // Create many Investigacion_casos
     * const investigacion_caso = await prisma.investigacion_caso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Investigacion_casos and only return the `id_investigacion`
     * const investigacion_casoWithId_investigacionOnly = await prisma.investigacion_caso.createManyAndReturn({
     *   select: { id_investigacion: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends investigacion_casoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, investigacion_casoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Investigacion_caso.
     * @param {investigacion_casoDeleteArgs} args - Arguments to delete one Investigacion_caso.
     * @example
     * // Delete one Investigacion_caso
     * const Investigacion_caso = await prisma.investigacion_caso.delete({
     *   where: {
     *     // ... filter to delete one Investigacion_caso
     *   }
     * })
     *
     */
    delete<T extends investigacion_casoDeleteArgs>(args: Prisma.SelectSubset<T, investigacion_casoDeleteArgs<ExtArgs>>): Prisma.Prisma__investigacion_casoClient<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Investigacion_caso.
     * @param {investigacion_casoUpdateArgs} args - Arguments to update one Investigacion_caso.
     * @example
     * // Update one Investigacion_caso
     * const investigacion_caso = await prisma.investigacion_caso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends investigacion_casoUpdateArgs>(args: Prisma.SelectSubset<T, investigacion_casoUpdateArgs<ExtArgs>>): Prisma.Prisma__investigacion_casoClient<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Investigacion_casos.
     * @param {investigacion_casoDeleteManyArgs} args - Arguments to filter Investigacion_casos to delete.
     * @example
     * // Delete a few Investigacion_casos
     * const { count } = await prisma.investigacion_caso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends investigacion_casoDeleteManyArgs>(args?: Prisma.SelectSubset<T, investigacion_casoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Investigacion_casos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacion_casoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investigacion_casos
     * const investigacion_caso = await prisma.investigacion_caso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends investigacion_casoUpdateManyArgs>(args: Prisma.SelectSubset<T, investigacion_casoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Investigacion_casos and returns the data updated in the database.
     * @param {investigacion_casoUpdateManyAndReturnArgs} args - Arguments to update many Investigacion_casos.
     * @example
     * // Update many Investigacion_casos
     * const investigacion_caso = await prisma.investigacion_caso.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Investigacion_casos and only return the `id_investigacion`
     * const investigacion_casoWithId_investigacionOnly = await prisma.investigacion_caso.updateManyAndReturn({
     *   select: { id_investigacion: true },
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
    updateManyAndReturn<T extends investigacion_casoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, investigacion_casoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Investigacion_caso.
     * @param {investigacion_casoUpsertArgs} args - Arguments to update or create a Investigacion_caso.
     * @example
     * // Update or create a Investigacion_caso
     * const investigacion_caso = await prisma.investigacion_caso.upsert({
     *   create: {
     *     // ... data to create a Investigacion_caso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investigacion_caso we want to update
     *   }
     * })
     */
    upsert<T extends investigacion_casoUpsertArgs>(args: Prisma.SelectSubset<T, investigacion_casoUpsertArgs<ExtArgs>>): Prisma.Prisma__investigacion_casoClient<runtime.Types.Result.GetResult<Prisma.$investigacion_casoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Investigacion_casos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacion_casoCountArgs} args - Arguments to filter Investigacion_casos to count.
     * @example
     * // Count the number of Investigacion_casos
     * const count = await prisma.investigacion_caso.count({
     *   where: {
     *     // ... the filter for the Investigacion_casos we want to count
     *   }
     * })
    **/
    count<T extends investigacion_casoCountArgs>(args?: Prisma.Subset<T, investigacion_casoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Investigacion_casoCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Investigacion_caso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Investigacion_casoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Investigacion_casoAggregateArgs>(args: Prisma.Subset<T, Investigacion_casoAggregateArgs>): Prisma.PrismaPromise<GetInvestigacion_casoAggregateType<T>>;
    /**
     * Group by Investigacion_caso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacion_casoGroupByArgs} args - Group by arguments.
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
    groupBy<T extends investigacion_casoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: investigacion_casoGroupByArgs['orderBy'];
    } : {
        orderBy?: investigacion_casoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, investigacion_casoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestigacion_casoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the investigacion_caso model
     */
    readonly fields: investigacion_casoFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for investigacion_caso.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__investigacion_casoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    casos_sop<T extends Prisma.casos_sopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sopDefaultArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.investigacion_caso$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.investigacion_caso$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the investigacion_caso model
 */
export interface investigacion_casoFieldRefs {
    readonly id_investigacion: Prisma.FieldRef<"investigacion_caso", 'Int'>;
    readonly id_caso: Prisma.FieldRef<"investigacion_caso", 'Int'>;
    readonly hallazgos: Prisma.FieldRef<"investigacion_caso", 'String'>;
    readonly causa_raiz: Prisma.FieldRef<"investigacion_caso", 'String'>;
    readonly conclusiones: Prisma.FieldRef<"investigacion_caso", 'String'>;
    readonly observaciones: Prisma.FieldRef<"investigacion_caso", 'String'>;
    readonly investigador: Prisma.FieldRef<"investigacion_caso", 'Int'>;
    readonly created_at: Prisma.FieldRef<"investigacion_caso", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"investigacion_caso", 'DateTime'>;
}
/**
 * investigacion_caso findUnique
 */
export type investigacion_casoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    /**
     * Filter, which investigacion_caso to fetch.
     */
    where: Prisma.investigacion_casoWhereUniqueInput;
};
/**
 * investigacion_caso findUniqueOrThrow
 */
export type investigacion_casoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    /**
     * Filter, which investigacion_caso to fetch.
     */
    where: Prisma.investigacion_casoWhereUniqueInput;
};
/**
 * investigacion_caso findFirst
 */
export type investigacion_casoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    /**
     * Filter, which investigacion_caso to fetch.
     */
    where?: Prisma.investigacion_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of investigacion_casos to fetch.
     */
    orderBy?: Prisma.investigacion_casoOrderByWithRelationInput | Prisma.investigacion_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for investigacion_casos.
     */
    cursor?: Prisma.investigacion_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` investigacion_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` investigacion_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of investigacion_casos.
     */
    distinct?: Prisma.Investigacion_casoScalarFieldEnum | Prisma.Investigacion_casoScalarFieldEnum[];
};
/**
 * investigacion_caso findFirstOrThrow
 */
export type investigacion_casoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    /**
     * Filter, which investigacion_caso to fetch.
     */
    where?: Prisma.investigacion_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of investigacion_casos to fetch.
     */
    orderBy?: Prisma.investigacion_casoOrderByWithRelationInput | Prisma.investigacion_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for investigacion_casos.
     */
    cursor?: Prisma.investigacion_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` investigacion_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` investigacion_casos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of investigacion_casos.
     */
    distinct?: Prisma.Investigacion_casoScalarFieldEnum | Prisma.Investigacion_casoScalarFieldEnum[];
};
/**
 * investigacion_caso findMany
 */
export type investigacion_casoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    /**
     * Filter, which investigacion_casos to fetch.
     */
    where?: Prisma.investigacion_casoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of investigacion_casos to fetch.
     */
    orderBy?: Prisma.investigacion_casoOrderByWithRelationInput | Prisma.investigacion_casoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing investigacion_casos.
     */
    cursor?: Prisma.investigacion_casoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` investigacion_casos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` investigacion_casos.
     */
    skip?: number;
    distinct?: Prisma.Investigacion_casoScalarFieldEnum | Prisma.Investigacion_casoScalarFieldEnum[];
};
/**
 * investigacion_caso create
 */
export type investigacion_casoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    /**
     * The data needed to create a investigacion_caso.
     */
    data: Prisma.XOR<Prisma.investigacion_casoCreateInput, Prisma.investigacion_casoUncheckedCreateInput>;
};
/**
 * investigacion_caso createMany
 */
export type investigacion_casoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many investigacion_casos.
     */
    data: Prisma.investigacion_casoCreateManyInput | Prisma.investigacion_casoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * investigacion_caso createManyAndReturn
 */
export type investigacion_casoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * The data used to create many investigacion_casos.
     */
    data: Prisma.investigacion_casoCreateManyInput | Prisma.investigacion_casoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * investigacion_caso update
 */
export type investigacion_casoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    /**
     * The data needed to update a investigacion_caso.
     */
    data: Prisma.XOR<Prisma.investigacion_casoUpdateInput, Prisma.investigacion_casoUncheckedUpdateInput>;
    /**
     * Choose, which investigacion_caso to update.
     */
    where: Prisma.investigacion_casoWhereUniqueInput;
};
/**
 * investigacion_caso updateMany
 */
export type investigacion_casoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update investigacion_casos.
     */
    data: Prisma.XOR<Prisma.investigacion_casoUpdateManyMutationInput, Prisma.investigacion_casoUncheckedUpdateManyInput>;
    /**
     * Filter which investigacion_casos to update
     */
    where?: Prisma.investigacion_casoWhereInput;
    /**
     * Limit how many investigacion_casos to update.
     */
    limit?: number;
};
/**
 * investigacion_caso updateManyAndReturn
 */
export type investigacion_casoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * The data used to update investigacion_casos.
     */
    data: Prisma.XOR<Prisma.investigacion_casoUpdateManyMutationInput, Prisma.investigacion_casoUncheckedUpdateManyInput>;
    /**
     * Filter which investigacion_casos to update
     */
    where?: Prisma.investigacion_casoWhereInput;
    /**
     * Limit how many investigacion_casos to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * investigacion_caso upsert
 */
export type investigacion_casoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    /**
     * The filter to search for the investigacion_caso to update in case it exists.
     */
    where: Prisma.investigacion_casoWhereUniqueInput;
    /**
     * In case the investigacion_caso found by the `where` argument doesn't exist, create a new investigacion_caso with this data.
     */
    create: Prisma.XOR<Prisma.investigacion_casoCreateInput, Prisma.investigacion_casoUncheckedCreateInput>;
    /**
     * In case the investigacion_caso was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.investigacion_casoUpdateInput, Prisma.investigacion_casoUncheckedUpdateInput>;
};
/**
 * investigacion_caso delete
 */
export type investigacion_casoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
    /**
     * Filter which investigacion_caso to delete.
     */
    where: Prisma.investigacion_casoWhereUniqueInput;
};
/**
 * investigacion_caso deleteMany
 */
export type investigacion_casoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which investigacion_casos to delete
     */
    where?: Prisma.investigacion_casoWhereInput;
    /**
     * Limit how many investigacion_casos to delete.
     */
    limit?: number;
};
/**
 * investigacion_caso.usuarios
 */
export type investigacion_caso$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * investigacion_caso without action
 */
export type investigacion_casoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigacion_caso
     */
    select?: Prisma.investigacion_casoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigacion_caso
     */
    omit?: Prisma.investigacion_casoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacion_casoInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=investigacion_caso.d.ts.map