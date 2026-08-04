import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model evidencias
 *
 */
export type evidenciasModel = runtime.Types.Result.DefaultSelection<Prisma.$evidenciasPayload>;
export type AggregateEvidencias = {
    _count: EvidenciasCountAggregateOutputType | null;
    _avg: EvidenciasAvgAggregateOutputType | null;
    _sum: EvidenciasSumAggregateOutputType | null;
    _min: EvidenciasMinAggregateOutputType | null;
    _max: EvidenciasMaxAggregateOutputType | null;
};
export type EvidenciasAvgAggregateOutputType = {
    id_evidencia: number | null;
    id_incidencia: number | null;
};
export type EvidenciasSumAggregateOutputType = {
    id_evidencia: number | null;
    id_incidencia: number | null;
};
export type EvidenciasMinAggregateOutputType = {
    id_evidencia: number | null;
    id_incidencia: number | null;
    ruta_archivo: string | null;
    tipo_archivo: string | null;
    fecha_subida: Date | null;
};
export type EvidenciasMaxAggregateOutputType = {
    id_evidencia: number | null;
    id_incidencia: number | null;
    ruta_archivo: string | null;
    tipo_archivo: string | null;
    fecha_subida: Date | null;
};
export type EvidenciasCountAggregateOutputType = {
    id_evidencia: number;
    id_incidencia: number;
    ruta_archivo: number;
    tipo_archivo: number;
    fecha_subida: number;
    _all: number;
};
export type EvidenciasAvgAggregateInputType = {
    id_evidencia?: true;
    id_incidencia?: true;
};
export type EvidenciasSumAggregateInputType = {
    id_evidencia?: true;
    id_incidencia?: true;
};
export type EvidenciasMinAggregateInputType = {
    id_evidencia?: true;
    id_incidencia?: true;
    ruta_archivo?: true;
    tipo_archivo?: true;
    fecha_subida?: true;
};
export type EvidenciasMaxAggregateInputType = {
    id_evidencia?: true;
    id_incidencia?: true;
    ruta_archivo?: true;
    tipo_archivo?: true;
    fecha_subida?: true;
};
export type EvidenciasCountAggregateInputType = {
    id_evidencia?: true;
    id_incidencia?: true;
    ruta_archivo?: true;
    tipo_archivo?: true;
    fecha_subida?: true;
    _all?: true;
};
export type EvidenciasAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which evidencias to aggregate.
     */
    where?: Prisma.evidenciasWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evidencias to fetch.
     */
    orderBy?: Prisma.evidenciasOrderByWithRelationInput | Prisma.evidenciasOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.evidenciasWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evidencias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evidencias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned evidencias
    **/
    _count?: true | EvidenciasCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: EvidenciasAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: EvidenciasSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EvidenciasMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EvidenciasMaxAggregateInputType;
};
export type GetEvidenciasAggregateType<T extends EvidenciasAggregateArgs> = {
    [P in keyof T & keyof AggregateEvidencias]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEvidencias[P]> : Prisma.GetScalarType<T[P], AggregateEvidencias[P]>;
};
export type evidenciasGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.evidenciasWhereInput;
    orderBy?: Prisma.evidenciasOrderByWithAggregationInput | Prisma.evidenciasOrderByWithAggregationInput[];
    by: Prisma.EvidenciasScalarFieldEnum[] | Prisma.EvidenciasScalarFieldEnum;
    having?: Prisma.evidenciasScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EvidenciasCountAggregateInputType | true;
    _avg?: EvidenciasAvgAggregateInputType;
    _sum?: EvidenciasSumAggregateInputType;
    _min?: EvidenciasMinAggregateInputType;
    _max?: EvidenciasMaxAggregateInputType;
};
export type EvidenciasGroupByOutputType = {
    id_evidencia: number;
    id_incidencia: number | null;
    ruta_archivo: string;
    tipo_archivo: string | null;
    fecha_subida: Date | null;
    _count: EvidenciasCountAggregateOutputType | null;
    _avg: EvidenciasAvgAggregateOutputType | null;
    _sum: EvidenciasSumAggregateOutputType | null;
    _min: EvidenciasMinAggregateOutputType | null;
    _max: EvidenciasMaxAggregateOutputType | null;
};
type GetEvidenciasGroupByPayload<T extends evidenciasGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EvidenciasGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EvidenciasGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EvidenciasGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EvidenciasGroupByOutputType[P]>;
}>>;
export type evidenciasWhereInput = {
    AND?: Prisma.evidenciasWhereInput | Prisma.evidenciasWhereInput[];
    OR?: Prisma.evidenciasWhereInput[];
    NOT?: Prisma.evidenciasWhereInput | Prisma.evidenciasWhereInput[];
    id_evidencia?: Prisma.IntFilter<"evidencias"> | number;
    id_incidencia?: Prisma.IntNullableFilter<"evidencias"> | number | null;
    ruta_archivo?: Prisma.StringFilter<"evidencias"> | string;
    tipo_archivo?: Prisma.StringNullableFilter<"evidencias"> | string | null;
    fecha_subida?: Prisma.DateTimeNullableFilter<"evidencias"> | Date | string | null;
    incidencias?: Prisma.XOR<Prisma.IncidenciasNullableScalarRelationFilter, Prisma.incidenciasWhereInput> | null;
};
export type evidenciasOrderByWithRelationInput = {
    id_evidencia?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrderInput | Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrderInput | Prisma.SortOrder;
    incidencias?: Prisma.incidenciasOrderByWithRelationInput;
};
export type evidenciasWhereUniqueInput = Prisma.AtLeast<{
    id_evidencia?: number;
    AND?: Prisma.evidenciasWhereInput | Prisma.evidenciasWhereInput[];
    OR?: Prisma.evidenciasWhereInput[];
    NOT?: Prisma.evidenciasWhereInput | Prisma.evidenciasWhereInput[];
    id_incidencia?: Prisma.IntNullableFilter<"evidencias"> | number | null;
    ruta_archivo?: Prisma.StringFilter<"evidencias"> | string;
    tipo_archivo?: Prisma.StringNullableFilter<"evidencias"> | string | null;
    fecha_subida?: Prisma.DateTimeNullableFilter<"evidencias"> | Date | string | null;
    incidencias?: Prisma.XOR<Prisma.IncidenciasNullableScalarRelationFilter, Prisma.incidenciasWhereInput> | null;
}, "id_evidencia">;
export type evidenciasOrderByWithAggregationInput = {
    id_evidencia?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrderInput | Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.evidenciasCountOrderByAggregateInput;
    _avg?: Prisma.evidenciasAvgOrderByAggregateInput;
    _max?: Prisma.evidenciasMaxOrderByAggregateInput;
    _min?: Prisma.evidenciasMinOrderByAggregateInput;
    _sum?: Prisma.evidenciasSumOrderByAggregateInput;
};
export type evidenciasScalarWhereWithAggregatesInput = {
    AND?: Prisma.evidenciasScalarWhereWithAggregatesInput | Prisma.evidenciasScalarWhereWithAggregatesInput[];
    OR?: Prisma.evidenciasScalarWhereWithAggregatesInput[];
    NOT?: Prisma.evidenciasScalarWhereWithAggregatesInput | Prisma.evidenciasScalarWhereWithAggregatesInput[];
    id_evidencia?: Prisma.IntWithAggregatesFilter<"evidencias"> | number;
    id_incidencia?: Prisma.IntNullableWithAggregatesFilter<"evidencias"> | number | null;
    ruta_archivo?: Prisma.StringWithAggregatesFilter<"evidencias"> | string;
    tipo_archivo?: Prisma.StringNullableWithAggregatesFilter<"evidencias"> | string | null;
    fecha_subida?: Prisma.DateTimeNullableWithAggregatesFilter<"evidencias"> | Date | string | null;
};
export type evidenciasCreateInput = {
    ruta_archivo: string;
    tipo_archivo?: string | null;
    fecha_subida?: Date | string | null;
    incidencias?: Prisma.incidenciasCreateNestedOneWithoutEvidenciasInput;
};
export type evidenciasUncheckedCreateInput = {
    id_evidencia?: number;
    id_incidencia?: number | null;
    ruta_archivo: string;
    tipo_archivo?: string | null;
    fecha_subida?: Date | string | null;
};
export type evidenciasUpdateInput = {
    ruta_archivo?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    incidencias?: Prisma.incidenciasUpdateOneWithoutEvidenciasNestedInput;
};
export type evidenciasUncheckedUpdateInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    id_incidencia?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ruta_archivo?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidenciasCreateManyInput = {
    id_evidencia?: number;
    id_incidencia?: number | null;
    ruta_archivo: string;
    tipo_archivo?: string | null;
    fecha_subida?: Date | string | null;
};
export type evidenciasUpdateManyMutationInput = {
    ruta_archivo?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidenciasUncheckedUpdateManyInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    id_incidencia?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ruta_archivo?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidenciasCountOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrder;
};
export type evidenciasAvgOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
};
export type evidenciasMaxOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrder;
};
export type evidenciasMinOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    ruta_archivo?: Prisma.SortOrder;
    tipo_archivo?: Prisma.SortOrder;
    fecha_subida?: Prisma.SortOrder;
};
export type evidenciasSumOrderByAggregateInput = {
    id_evidencia?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
};
export type EvidenciasListRelationFilter = {
    every?: Prisma.evidenciasWhereInput;
    some?: Prisma.evidenciasWhereInput;
    none?: Prisma.evidenciasWhereInput;
};
export type evidenciasOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type evidenciasCreateNestedManyWithoutIncidenciasInput = {
    create?: Prisma.XOR<Prisma.evidenciasCreateWithoutIncidenciasInput, Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput> | Prisma.evidenciasCreateWithoutIncidenciasInput[] | Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput[];
    connectOrCreate?: Prisma.evidenciasCreateOrConnectWithoutIncidenciasInput | Prisma.evidenciasCreateOrConnectWithoutIncidenciasInput[];
    createMany?: Prisma.evidenciasCreateManyIncidenciasInputEnvelope;
    connect?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
};
export type evidenciasUncheckedCreateNestedManyWithoutIncidenciasInput = {
    create?: Prisma.XOR<Prisma.evidenciasCreateWithoutIncidenciasInput, Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput> | Prisma.evidenciasCreateWithoutIncidenciasInput[] | Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput[];
    connectOrCreate?: Prisma.evidenciasCreateOrConnectWithoutIncidenciasInput | Prisma.evidenciasCreateOrConnectWithoutIncidenciasInput[];
    createMany?: Prisma.evidenciasCreateManyIncidenciasInputEnvelope;
    connect?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
};
export type evidenciasUpdateManyWithoutIncidenciasNestedInput = {
    create?: Prisma.XOR<Prisma.evidenciasCreateWithoutIncidenciasInput, Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput> | Prisma.evidenciasCreateWithoutIncidenciasInput[] | Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput[];
    connectOrCreate?: Prisma.evidenciasCreateOrConnectWithoutIncidenciasInput | Prisma.evidenciasCreateOrConnectWithoutIncidenciasInput[];
    upsert?: Prisma.evidenciasUpsertWithWhereUniqueWithoutIncidenciasInput | Prisma.evidenciasUpsertWithWhereUniqueWithoutIncidenciasInput[];
    createMany?: Prisma.evidenciasCreateManyIncidenciasInputEnvelope;
    set?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
    disconnect?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
    delete?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
    connect?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
    update?: Prisma.evidenciasUpdateWithWhereUniqueWithoutIncidenciasInput | Prisma.evidenciasUpdateWithWhereUniqueWithoutIncidenciasInput[];
    updateMany?: Prisma.evidenciasUpdateManyWithWhereWithoutIncidenciasInput | Prisma.evidenciasUpdateManyWithWhereWithoutIncidenciasInput[];
    deleteMany?: Prisma.evidenciasScalarWhereInput | Prisma.evidenciasScalarWhereInput[];
};
export type evidenciasUncheckedUpdateManyWithoutIncidenciasNestedInput = {
    create?: Prisma.XOR<Prisma.evidenciasCreateWithoutIncidenciasInput, Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput> | Prisma.evidenciasCreateWithoutIncidenciasInput[] | Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput[];
    connectOrCreate?: Prisma.evidenciasCreateOrConnectWithoutIncidenciasInput | Prisma.evidenciasCreateOrConnectWithoutIncidenciasInput[];
    upsert?: Prisma.evidenciasUpsertWithWhereUniqueWithoutIncidenciasInput | Prisma.evidenciasUpsertWithWhereUniqueWithoutIncidenciasInput[];
    createMany?: Prisma.evidenciasCreateManyIncidenciasInputEnvelope;
    set?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
    disconnect?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
    delete?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
    connect?: Prisma.evidenciasWhereUniqueInput | Prisma.evidenciasWhereUniqueInput[];
    update?: Prisma.evidenciasUpdateWithWhereUniqueWithoutIncidenciasInput | Prisma.evidenciasUpdateWithWhereUniqueWithoutIncidenciasInput[];
    updateMany?: Prisma.evidenciasUpdateManyWithWhereWithoutIncidenciasInput | Prisma.evidenciasUpdateManyWithWhereWithoutIncidenciasInput[];
    deleteMany?: Prisma.evidenciasScalarWhereInput | Prisma.evidenciasScalarWhereInput[];
};
export type evidenciasCreateWithoutIncidenciasInput = {
    ruta_archivo: string;
    tipo_archivo?: string | null;
    fecha_subida?: Date | string | null;
};
export type evidenciasUncheckedCreateWithoutIncidenciasInput = {
    id_evidencia?: number;
    ruta_archivo: string;
    tipo_archivo?: string | null;
    fecha_subida?: Date | string | null;
};
export type evidenciasCreateOrConnectWithoutIncidenciasInput = {
    where: Prisma.evidenciasWhereUniqueInput;
    create: Prisma.XOR<Prisma.evidenciasCreateWithoutIncidenciasInput, Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput>;
};
export type evidenciasCreateManyIncidenciasInputEnvelope = {
    data: Prisma.evidenciasCreateManyIncidenciasInput | Prisma.evidenciasCreateManyIncidenciasInput[];
    skipDuplicates?: boolean;
};
export type evidenciasUpsertWithWhereUniqueWithoutIncidenciasInput = {
    where: Prisma.evidenciasWhereUniqueInput;
    update: Prisma.XOR<Prisma.evidenciasUpdateWithoutIncidenciasInput, Prisma.evidenciasUncheckedUpdateWithoutIncidenciasInput>;
    create: Prisma.XOR<Prisma.evidenciasCreateWithoutIncidenciasInput, Prisma.evidenciasUncheckedCreateWithoutIncidenciasInput>;
};
export type evidenciasUpdateWithWhereUniqueWithoutIncidenciasInput = {
    where: Prisma.evidenciasWhereUniqueInput;
    data: Prisma.XOR<Prisma.evidenciasUpdateWithoutIncidenciasInput, Prisma.evidenciasUncheckedUpdateWithoutIncidenciasInput>;
};
export type evidenciasUpdateManyWithWhereWithoutIncidenciasInput = {
    where: Prisma.evidenciasScalarWhereInput;
    data: Prisma.XOR<Prisma.evidenciasUpdateManyMutationInput, Prisma.evidenciasUncheckedUpdateManyWithoutIncidenciasInput>;
};
export type evidenciasScalarWhereInput = {
    AND?: Prisma.evidenciasScalarWhereInput | Prisma.evidenciasScalarWhereInput[];
    OR?: Prisma.evidenciasScalarWhereInput[];
    NOT?: Prisma.evidenciasScalarWhereInput | Prisma.evidenciasScalarWhereInput[];
    id_evidencia?: Prisma.IntFilter<"evidencias"> | number;
    id_incidencia?: Prisma.IntNullableFilter<"evidencias"> | number | null;
    ruta_archivo?: Prisma.StringFilter<"evidencias"> | string;
    tipo_archivo?: Prisma.StringNullableFilter<"evidencias"> | string | null;
    fecha_subida?: Prisma.DateTimeNullableFilter<"evidencias"> | Date | string | null;
};
export type evidenciasCreateManyIncidenciasInput = {
    id_evidencia?: number;
    ruta_archivo: string;
    tipo_archivo?: string | null;
    fecha_subida?: Date | string | null;
};
export type evidenciasUpdateWithoutIncidenciasInput = {
    ruta_archivo?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidenciasUncheckedUpdateWithoutIncidenciasInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    ruta_archivo?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidenciasUncheckedUpdateManyWithoutIncidenciasInput = {
    id_evidencia?: Prisma.IntFieldUpdateOperationsInput | number;
    ruta_archivo?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo_archivo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_subida?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type evidenciasSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evidencia?: boolean;
    id_incidencia?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    fecha_subida?: boolean;
    incidencias?: boolean | Prisma.evidencias$incidenciasArgs<ExtArgs>;
}, ExtArgs["result"]["evidencias"]>;
export type evidenciasSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evidencia?: boolean;
    id_incidencia?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    fecha_subida?: boolean;
    incidencias?: boolean | Prisma.evidencias$incidenciasArgs<ExtArgs>;
}, ExtArgs["result"]["evidencias"]>;
export type evidenciasSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_evidencia?: boolean;
    id_incidencia?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    fecha_subida?: boolean;
    incidencias?: boolean | Prisma.evidencias$incidenciasArgs<ExtArgs>;
}, ExtArgs["result"]["evidencias"]>;
export type evidenciasSelectScalar = {
    id_evidencia?: boolean;
    id_incidencia?: boolean;
    ruta_archivo?: boolean;
    tipo_archivo?: boolean;
    fecha_subida?: boolean;
};
export type evidenciasOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_evidencia" | "id_incidencia" | "ruta_archivo" | "tipo_archivo" | "fecha_subida", ExtArgs["result"]["evidencias"]>;
export type evidenciasInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.evidencias$incidenciasArgs<ExtArgs>;
};
export type evidenciasIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.evidencias$incidenciasArgs<ExtArgs>;
};
export type evidenciasIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.evidencias$incidenciasArgs<ExtArgs>;
};
export type $evidenciasPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "evidencias";
    objects: {
        incidencias: Prisma.$incidenciasPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_evidencia: number;
        id_incidencia: number | null;
        ruta_archivo: string;
        tipo_archivo: string | null;
        fecha_subida: Date | null;
    }, ExtArgs["result"]["evidencias"]>;
    composites: {};
};
export type evidenciasGetPayload<S extends boolean | null | undefined | evidenciasDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$evidenciasPayload, S>;
export type evidenciasCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<evidenciasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EvidenciasCountAggregateInputType | true;
};
export interface evidenciasDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['evidencias'];
        meta: {
            name: 'evidencias';
        };
    };
    /**
     * Find zero or one Evidencias that matches the filter.
     * @param {evidenciasFindUniqueArgs} args - Arguments to find a Evidencias
     * @example
     * // Get one Evidencias
     * const evidencias = await prisma.evidencias.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends evidenciasFindUniqueArgs>(args: Prisma.SelectSubset<T, evidenciasFindUniqueArgs<ExtArgs>>): Prisma.Prisma__evidenciasClient<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Evidencias that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {evidenciasFindUniqueOrThrowArgs} args - Arguments to find a Evidencias
     * @example
     * // Get one Evidencias
     * const evidencias = await prisma.evidencias.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends evidenciasFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, evidenciasFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__evidenciasClient<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Evidencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidenciasFindFirstArgs} args - Arguments to find a Evidencias
     * @example
     * // Get one Evidencias
     * const evidencias = await prisma.evidencias.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends evidenciasFindFirstArgs>(args?: Prisma.SelectSubset<T, evidenciasFindFirstArgs<ExtArgs>>): Prisma.Prisma__evidenciasClient<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Evidencias that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidenciasFindFirstOrThrowArgs} args - Arguments to find a Evidencias
     * @example
     * // Get one Evidencias
     * const evidencias = await prisma.evidencias.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends evidenciasFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, evidenciasFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__evidenciasClient<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Evidencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidenciasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Evidencias
     * const evidencias = await prisma.evidencias.findMany()
     *
     * // Get first 10 Evidencias
     * const evidencias = await prisma.evidencias.findMany({ take: 10 })
     *
     * // Only select the `id_evidencia`
     * const evidenciasWithId_evidenciaOnly = await prisma.evidencias.findMany({ select: { id_evidencia: true } })
     *
     */
    findMany<T extends evidenciasFindManyArgs>(args?: Prisma.SelectSubset<T, evidenciasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Evidencias.
     * @param {evidenciasCreateArgs} args - Arguments to create a Evidencias.
     * @example
     * // Create one Evidencias
     * const Evidencias = await prisma.evidencias.create({
     *   data: {
     *     // ... data to create a Evidencias
     *   }
     * })
     *
     */
    create<T extends evidenciasCreateArgs>(args: Prisma.SelectSubset<T, evidenciasCreateArgs<ExtArgs>>): Prisma.Prisma__evidenciasClient<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Evidencias.
     * @param {evidenciasCreateManyArgs} args - Arguments to create many Evidencias.
     * @example
     * // Create many Evidencias
     * const evidencias = await prisma.evidencias.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends evidenciasCreateManyArgs>(args?: Prisma.SelectSubset<T, evidenciasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Evidencias and returns the data saved in the database.
     * @param {evidenciasCreateManyAndReturnArgs} args - Arguments to create many Evidencias.
     * @example
     * // Create many Evidencias
     * const evidencias = await prisma.evidencias.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Evidencias and only return the `id_evidencia`
     * const evidenciasWithId_evidenciaOnly = await prisma.evidencias.createManyAndReturn({
     *   select: { id_evidencia: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends evidenciasCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, evidenciasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Evidencias.
     * @param {evidenciasDeleteArgs} args - Arguments to delete one Evidencias.
     * @example
     * // Delete one Evidencias
     * const Evidencias = await prisma.evidencias.delete({
     *   where: {
     *     // ... filter to delete one Evidencias
     *   }
     * })
     *
     */
    delete<T extends evidenciasDeleteArgs>(args: Prisma.SelectSubset<T, evidenciasDeleteArgs<ExtArgs>>): Prisma.Prisma__evidenciasClient<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Evidencias.
     * @param {evidenciasUpdateArgs} args - Arguments to update one Evidencias.
     * @example
     * // Update one Evidencias
     * const evidencias = await prisma.evidencias.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends evidenciasUpdateArgs>(args: Prisma.SelectSubset<T, evidenciasUpdateArgs<ExtArgs>>): Prisma.Prisma__evidenciasClient<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Evidencias.
     * @param {evidenciasDeleteManyArgs} args - Arguments to filter Evidencias to delete.
     * @example
     * // Delete a few Evidencias
     * const { count } = await prisma.evidencias.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends evidenciasDeleteManyArgs>(args?: Prisma.SelectSubset<T, evidenciasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Evidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidenciasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Evidencias
     * const evidencias = await prisma.evidencias.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends evidenciasUpdateManyArgs>(args: Prisma.SelectSubset<T, evidenciasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Evidencias and returns the data updated in the database.
     * @param {evidenciasUpdateManyAndReturnArgs} args - Arguments to update many Evidencias.
     * @example
     * // Update many Evidencias
     * const evidencias = await prisma.evidencias.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Evidencias and only return the `id_evidencia`
     * const evidenciasWithId_evidenciaOnly = await prisma.evidencias.updateManyAndReturn({
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
    updateManyAndReturn<T extends evidenciasUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, evidenciasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Evidencias.
     * @param {evidenciasUpsertArgs} args - Arguments to update or create a Evidencias.
     * @example
     * // Update or create a Evidencias
     * const evidencias = await prisma.evidencias.upsert({
     *   create: {
     *     // ... data to create a Evidencias
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evidencias we want to update
     *   }
     * })
     */
    upsert<T extends evidenciasUpsertArgs>(args: Prisma.SelectSubset<T, evidenciasUpsertArgs<ExtArgs>>): Prisma.Prisma__evidenciasClient<runtime.Types.Result.GetResult<Prisma.$evidenciasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Evidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidenciasCountArgs} args - Arguments to filter Evidencias to count.
     * @example
     * // Count the number of Evidencias
     * const count = await prisma.evidencias.count({
     *   where: {
     *     // ... the filter for the Evidencias we want to count
     *   }
     * })
    **/
    count<T extends evidenciasCountArgs>(args?: Prisma.Subset<T, evidenciasCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EvidenciasCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Evidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenciasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EvidenciasAggregateArgs>(args: Prisma.Subset<T, EvidenciasAggregateArgs>): Prisma.PrismaPromise<GetEvidenciasAggregateType<T>>;
    /**
     * Group by Evidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {evidenciasGroupByArgs} args - Group by arguments.
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
    groupBy<T extends evidenciasGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: evidenciasGroupByArgs['orderBy'];
    } : {
        orderBy?: evidenciasGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, evidenciasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvidenciasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the evidencias model
     */
    readonly fields: evidenciasFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for evidencias.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__evidenciasClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    incidencias<T extends Prisma.evidencias$incidenciasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.evidencias$incidenciasArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the evidencias model
 */
export interface evidenciasFieldRefs {
    readonly id_evidencia: Prisma.FieldRef<"evidencias", 'Int'>;
    readonly id_incidencia: Prisma.FieldRef<"evidencias", 'Int'>;
    readonly ruta_archivo: Prisma.FieldRef<"evidencias", 'String'>;
    readonly tipo_archivo: Prisma.FieldRef<"evidencias", 'String'>;
    readonly fecha_subida: Prisma.FieldRef<"evidencias", 'DateTime'>;
}
/**
 * evidencias findUnique
 */
export type evidenciasFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    /**
     * Filter, which evidencias to fetch.
     */
    where: Prisma.evidenciasWhereUniqueInput;
};
/**
 * evidencias findUniqueOrThrow
 */
export type evidenciasFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    /**
     * Filter, which evidencias to fetch.
     */
    where: Prisma.evidenciasWhereUniqueInput;
};
/**
 * evidencias findFirst
 */
export type evidenciasFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    /**
     * Filter, which evidencias to fetch.
     */
    where?: Prisma.evidenciasWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evidencias to fetch.
     */
    orderBy?: Prisma.evidenciasOrderByWithRelationInput | Prisma.evidenciasOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for evidencias.
     */
    cursor?: Prisma.evidenciasWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evidencias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evidencias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of evidencias.
     */
    distinct?: Prisma.EvidenciasScalarFieldEnum | Prisma.EvidenciasScalarFieldEnum[];
};
/**
 * evidencias findFirstOrThrow
 */
export type evidenciasFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    /**
     * Filter, which evidencias to fetch.
     */
    where?: Prisma.evidenciasWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evidencias to fetch.
     */
    orderBy?: Prisma.evidenciasOrderByWithRelationInput | Prisma.evidenciasOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for evidencias.
     */
    cursor?: Prisma.evidenciasWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evidencias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evidencias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of evidencias.
     */
    distinct?: Prisma.EvidenciasScalarFieldEnum | Prisma.EvidenciasScalarFieldEnum[];
};
/**
 * evidencias findMany
 */
export type evidenciasFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    /**
     * Filter, which evidencias to fetch.
     */
    where?: Prisma.evidenciasWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of evidencias to fetch.
     */
    orderBy?: Prisma.evidenciasOrderByWithRelationInput | Prisma.evidenciasOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing evidencias.
     */
    cursor?: Prisma.evidenciasWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` evidencias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` evidencias.
     */
    skip?: number;
    distinct?: Prisma.EvidenciasScalarFieldEnum | Prisma.EvidenciasScalarFieldEnum[];
};
/**
 * evidencias create
 */
export type evidenciasCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    /**
     * The data needed to create a evidencias.
     */
    data: Prisma.XOR<Prisma.evidenciasCreateInput, Prisma.evidenciasUncheckedCreateInput>;
};
/**
 * evidencias createMany
 */
export type evidenciasCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many evidencias.
     */
    data: Prisma.evidenciasCreateManyInput | Prisma.evidenciasCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * evidencias createManyAndReturn
 */
export type evidenciasCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * The data used to create many evidencias.
     */
    data: Prisma.evidenciasCreateManyInput | Prisma.evidenciasCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * evidencias update
 */
export type evidenciasUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    /**
     * The data needed to update a evidencias.
     */
    data: Prisma.XOR<Prisma.evidenciasUpdateInput, Prisma.evidenciasUncheckedUpdateInput>;
    /**
     * Choose, which evidencias to update.
     */
    where: Prisma.evidenciasWhereUniqueInput;
};
/**
 * evidencias updateMany
 */
export type evidenciasUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update evidencias.
     */
    data: Prisma.XOR<Prisma.evidenciasUpdateManyMutationInput, Prisma.evidenciasUncheckedUpdateManyInput>;
    /**
     * Filter which evidencias to update
     */
    where?: Prisma.evidenciasWhereInput;
    /**
     * Limit how many evidencias to update.
     */
    limit?: number;
};
/**
 * evidencias updateManyAndReturn
 */
export type evidenciasUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * The data used to update evidencias.
     */
    data: Prisma.XOR<Prisma.evidenciasUpdateManyMutationInput, Prisma.evidenciasUncheckedUpdateManyInput>;
    /**
     * Filter which evidencias to update
     */
    where?: Prisma.evidenciasWhereInput;
    /**
     * Limit how many evidencias to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * evidencias upsert
 */
export type evidenciasUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    /**
     * The filter to search for the evidencias to update in case it exists.
     */
    where: Prisma.evidenciasWhereUniqueInput;
    /**
     * In case the evidencias found by the `where` argument doesn't exist, create a new evidencias with this data.
     */
    create: Prisma.XOR<Prisma.evidenciasCreateInput, Prisma.evidenciasUncheckedCreateInput>;
    /**
     * In case the evidencias was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.evidenciasUpdateInput, Prisma.evidenciasUncheckedUpdateInput>;
};
/**
 * evidencias delete
 */
export type evidenciasDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
    /**
     * Filter which evidencias to delete.
     */
    where: Prisma.evidenciasWhereUniqueInput;
};
/**
 * evidencias deleteMany
 */
export type evidenciasDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which evidencias to delete
     */
    where?: Prisma.evidenciasWhereInput;
    /**
     * Limit how many evidencias to delete.
     */
    limit?: number;
};
/**
 * evidencias.incidencias
 */
export type evidencias$incidenciasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidencias
     */
    select?: Prisma.incidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the incidencias
     */
    omit?: Prisma.incidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.incidenciasInclude<ExtArgs> | null;
    where?: Prisma.incidenciasWhereInput;
};
/**
 * evidencias without action
 */
export type evidenciasDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the evidencias
     */
    select?: Prisma.evidenciasSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the evidencias
     */
    omit?: Prisma.evidenciasOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.evidenciasInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=evidencias.d.ts.map