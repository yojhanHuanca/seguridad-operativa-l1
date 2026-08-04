import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model indicadores
 *
 */
export type indicadoresModel = runtime.Types.Result.DefaultSelection<Prisma.$indicadoresPayload>;
export type AggregateIndicadores = {
    _count: IndicadoresCountAggregateOutputType | null;
    _avg: IndicadoresAvgAggregateOutputType | null;
    _sum: IndicadoresSumAggregateOutputType | null;
    _min: IndicadoresMinAggregateOutputType | null;
    _max: IndicadoresMaxAggregateOutputType | null;
};
export type IndicadoresAvgAggregateOutputType = {
    id_indicador: number | null;
};
export type IndicadoresSumAggregateOutputType = {
    id_indicador: number | null;
};
export type IndicadoresMinAggregateOutputType = {
    id_indicador: number | null;
    nombre: string | null;
    descripcion: string | null;
    tipo: string | null;
    unidad_medida: string | null;
    formula: string | null;
    activo: boolean | null;
};
export type IndicadoresMaxAggregateOutputType = {
    id_indicador: number | null;
    nombre: string | null;
    descripcion: string | null;
    tipo: string | null;
    unidad_medida: string | null;
    formula: string | null;
    activo: boolean | null;
};
export type IndicadoresCountAggregateOutputType = {
    id_indicador: number;
    nombre: number;
    descripcion: number;
    tipo: number;
    unidad_medida: number;
    formula: number;
    activo: number;
    _all: number;
};
export type IndicadoresAvgAggregateInputType = {
    id_indicador?: true;
};
export type IndicadoresSumAggregateInputType = {
    id_indicador?: true;
};
export type IndicadoresMinAggregateInputType = {
    id_indicador?: true;
    nombre?: true;
    descripcion?: true;
    tipo?: true;
    unidad_medida?: true;
    formula?: true;
    activo?: true;
};
export type IndicadoresMaxAggregateInputType = {
    id_indicador?: true;
    nombre?: true;
    descripcion?: true;
    tipo?: true;
    unidad_medida?: true;
    formula?: true;
    activo?: true;
};
export type IndicadoresCountAggregateInputType = {
    id_indicador?: true;
    nombre?: true;
    descripcion?: true;
    tipo?: true;
    unidad_medida?: true;
    formula?: true;
    activo?: true;
    _all?: true;
};
export type IndicadoresAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which indicadores to aggregate.
     */
    where?: Prisma.indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of indicadores to fetch.
     */
    orderBy?: Prisma.indicadoresOrderByWithRelationInput | Prisma.indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned indicadores
    **/
    _count?: true | IndicadoresCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: IndicadoresAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: IndicadoresSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: IndicadoresMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: IndicadoresMaxAggregateInputType;
};
export type GetIndicadoresAggregateType<T extends IndicadoresAggregateArgs> = {
    [P in keyof T & keyof AggregateIndicadores]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIndicadores[P]> : Prisma.GetScalarType<T[P], AggregateIndicadores[P]>;
};
export type indicadoresGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.indicadoresWhereInput;
    orderBy?: Prisma.indicadoresOrderByWithAggregationInput | Prisma.indicadoresOrderByWithAggregationInput[];
    by: Prisma.IndicadoresScalarFieldEnum[] | Prisma.IndicadoresScalarFieldEnum;
    having?: Prisma.indicadoresScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IndicadoresCountAggregateInputType | true;
    _avg?: IndicadoresAvgAggregateInputType;
    _sum?: IndicadoresSumAggregateInputType;
    _min?: IndicadoresMinAggregateInputType;
    _max?: IndicadoresMaxAggregateInputType;
};
export type IndicadoresGroupByOutputType = {
    id_indicador: number;
    nombre: string;
    descripcion: string | null;
    tipo: string | null;
    unidad_medida: string | null;
    formula: string | null;
    activo: boolean | null;
    _count: IndicadoresCountAggregateOutputType | null;
    _avg: IndicadoresAvgAggregateOutputType | null;
    _sum: IndicadoresSumAggregateOutputType | null;
    _min: IndicadoresMinAggregateOutputType | null;
    _max: IndicadoresMaxAggregateOutputType | null;
};
type GetIndicadoresGroupByPayload<T extends indicadoresGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IndicadoresGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IndicadoresGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IndicadoresGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IndicadoresGroupByOutputType[P]>;
}>>;
export type indicadoresWhereInput = {
    AND?: Prisma.indicadoresWhereInput | Prisma.indicadoresWhereInput[];
    OR?: Prisma.indicadoresWhereInput[];
    NOT?: Prisma.indicadoresWhereInput | Prisma.indicadoresWhereInput[];
    id_indicador?: Prisma.IntFilter<"indicadores"> | number;
    nombre?: Prisma.StringFilter<"indicadores"> | string;
    descripcion?: Prisma.StringNullableFilter<"indicadores"> | string | null;
    tipo?: Prisma.StringNullableFilter<"indicadores"> | string | null;
    unidad_medida?: Prisma.StringNullableFilter<"indicadores"> | string | null;
    formula?: Prisma.StringNullableFilter<"indicadores"> | string | null;
    activo?: Prisma.BoolNullableFilter<"indicadores"> | boolean | null;
    dashboard_indicadores?: Prisma.Dashboard_indicadoresListRelationFilter;
    historial_indicadores?: Prisma.Historial_indicadoresListRelationFilter;
    metas_indicadores?: Prisma.Metas_indicadoresListRelationFilter;
};
export type indicadoresOrderByWithRelationInput = {
    id_indicador?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo?: Prisma.SortOrderInput | Prisma.SortOrder;
    unidad_medida?: Prisma.SortOrderInput | Prisma.SortOrder;
    formula?: Prisma.SortOrderInput | Prisma.SortOrder;
    activo?: Prisma.SortOrderInput | Prisma.SortOrder;
    dashboard_indicadores?: Prisma.dashboard_indicadoresOrderByRelationAggregateInput;
    historial_indicadores?: Prisma.historial_indicadoresOrderByRelationAggregateInput;
    metas_indicadores?: Prisma.metas_indicadoresOrderByRelationAggregateInput;
};
export type indicadoresWhereUniqueInput = Prisma.AtLeast<{
    id_indicador?: number;
    AND?: Prisma.indicadoresWhereInput | Prisma.indicadoresWhereInput[];
    OR?: Prisma.indicadoresWhereInput[];
    NOT?: Prisma.indicadoresWhereInput | Prisma.indicadoresWhereInput[];
    nombre?: Prisma.StringFilter<"indicadores"> | string;
    descripcion?: Prisma.StringNullableFilter<"indicadores"> | string | null;
    tipo?: Prisma.StringNullableFilter<"indicadores"> | string | null;
    unidad_medida?: Prisma.StringNullableFilter<"indicadores"> | string | null;
    formula?: Prisma.StringNullableFilter<"indicadores"> | string | null;
    activo?: Prisma.BoolNullableFilter<"indicadores"> | boolean | null;
    dashboard_indicadores?: Prisma.Dashboard_indicadoresListRelationFilter;
    historial_indicadores?: Prisma.Historial_indicadoresListRelationFilter;
    metas_indicadores?: Prisma.Metas_indicadoresListRelationFilter;
}, "id_indicador">;
export type indicadoresOrderByWithAggregationInput = {
    id_indicador?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo?: Prisma.SortOrderInput | Prisma.SortOrder;
    unidad_medida?: Prisma.SortOrderInput | Prisma.SortOrder;
    formula?: Prisma.SortOrderInput | Prisma.SortOrder;
    activo?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.indicadoresCountOrderByAggregateInput;
    _avg?: Prisma.indicadoresAvgOrderByAggregateInput;
    _max?: Prisma.indicadoresMaxOrderByAggregateInput;
    _min?: Prisma.indicadoresMinOrderByAggregateInput;
    _sum?: Prisma.indicadoresSumOrderByAggregateInput;
};
export type indicadoresScalarWhereWithAggregatesInput = {
    AND?: Prisma.indicadoresScalarWhereWithAggregatesInput | Prisma.indicadoresScalarWhereWithAggregatesInput[];
    OR?: Prisma.indicadoresScalarWhereWithAggregatesInput[];
    NOT?: Prisma.indicadoresScalarWhereWithAggregatesInput | Prisma.indicadoresScalarWhereWithAggregatesInput[];
    id_indicador?: Prisma.IntWithAggregatesFilter<"indicadores"> | number;
    nombre?: Prisma.StringWithAggregatesFilter<"indicadores"> | string;
    descripcion?: Prisma.StringNullableWithAggregatesFilter<"indicadores"> | string | null;
    tipo?: Prisma.StringNullableWithAggregatesFilter<"indicadores"> | string | null;
    unidad_medida?: Prisma.StringNullableWithAggregatesFilter<"indicadores"> | string | null;
    formula?: Prisma.StringNullableWithAggregatesFilter<"indicadores"> | string | null;
    activo?: Prisma.BoolNullableWithAggregatesFilter<"indicadores"> | boolean | null;
};
export type indicadoresCreateInput = {
    nombre: string;
    descripcion?: string | null;
    tipo?: string | null;
    unidad_medida?: string | null;
    formula?: string | null;
    activo?: boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresCreateNestedManyWithoutIndicadoresInput;
    historial_indicadores?: Prisma.historial_indicadoresCreateNestedManyWithoutIndicadoresInput;
    metas_indicadores?: Prisma.metas_indicadoresCreateNestedManyWithoutIndicadoresInput;
};
export type indicadoresUncheckedCreateInput = {
    id_indicador?: number;
    nombre: string;
    descripcion?: string | null;
    tipo?: string | null;
    unidad_medida?: string | null;
    formula?: string | null;
    activo?: boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput;
    historial_indicadores?: Prisma.historial_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput;
    metas_indicadores?: Prisma.metas_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput;
};
export type indicadoresUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUpdateManyWithoutIndicadoresNestedInput;
    historial_indicadores?: Prisma.historial_indicadoresUpdateManyWithoutIndicadoresNestedInput;
    metas_indicadores?: Prisma.metas_indicadoresUpdateManyWithoutIndicadoresNestedInput;
};
export type indicadoresUncheckedUpdateInput = {
    id_indicador?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput;
    historial_indicadores?: Prisma.historial_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput;
    metas_indicadores?: Prisma.metas_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput;
};
export type indicadoresCreateManyInput = {
    id_indicador?: number;
    nombre: string;
    descripcion?: string | null;
    tipo?: string | null;
    unidad_medida?: string | null;
    formula?: string | null;
    activo?: boolean | null;
};
export type indicadoresUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type indicadoresUncheckedUpdateManyInput = {
    id_indicador?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type IndicadoresScalarRelationFilter = {
    is?: Prisma.indicadoresWhereInput;
    isNot?: Prisma.indicadoresWhereInput;
};
export type IndicadoresNullableScalarRelationFilter = {
    is?: Prisma.indicadoresWhereInput | null;
    isNot?: Prisma.indicadoresWhereInput | null;
};
export type indicadoresCountOrderByAggregateInput = {
    id_indicador?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    unidad_medida?: Prisma.SortOrder;
    formula?: Prisma.SortOrder;
    activo?: Prisma.SortOrder;
};
export type indicadoresAvgOrderByAggregateInput = {
    id_indicador?: Prisma.SortOrder;
};
export type indicadoresMaxOrderByAggregateInput = {
    id_indicador?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    unidad_medida?: Prisma.SortOrder;
    formula?: Prisma.SortOrder;
    activo?: Prisma.SortOrder;
};
export type indicadoresMinOrderByAggregateInput = {
    id_indicador?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    unidad_medida?: Prisma.SortOrder;
    formula?: Prisma.SortOrder;
    activo?: Prisma.SortOrder;
};
export type indicadoresSumOrderByAggregateInput = {
    id_indicador?: Prisma.SortOrder;
};
export type indicadoresCreateNestedOneWithoutDashboard_indicadoresInput = {
    create?: Prisma.XOR<Prisma.indicadoresCreateWithoutDashboard_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutDashboard_indicadoresInput>;
    connectOrCreate?: Prisma.indicadoresCreateOrConnectWithoutDashboard_indicadoresInput;
    connect?: Prisma.indicadoresWhereUniqueInput;
};
export type indicadoresUpdateOneRequiredWithoutDashboard_indicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.indicadoresCreateWithoutDashboard_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutDashboard_indicadoresInput>;
    connectOrCreate?: Prisma.indicadoresCreateOrConnectWithoutDashboard_indicadoresInput;
    upsert?: Prisma.indicadoresUpsertWithoutDashboard_indicadoresInput;
    connect?: Prisma.indicadoresWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.indicadoresUpdateToOneWithWhereWithoutDashboard_indicadoresInput, Prisma.indicadoresUpdateWithoutDashboard_indicadoresInput>, Prisma.indicadoresUncheckedUpdateWithoutDashboard_indicadoresInput>;
};
export type indicadoresCreateNestedOneWithoutHistorial_indicadoresInput = {
    create?: Prisma.XOR<Prisma.indicadoresCreateWithoutHistorial_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutHistorial_indicadoresInput>;
    connectOrCreate?: Prisma.indicadoresCreateOrConnectWithoutHistorial_indicadoresInput;
    connect?: Prisma.indicadoresWhereUniqueInput;
};
export type indicadoresUpdateOneWithoutHistorial_indicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.indicadoresCreateWithoutHistorial_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutHistorial_indicadoresInput>;
    connectOrCreate?: Prisma.indicadoresCreateOrConnectWithoutHistorial_indicadoresInput;
    upsert?: Prisma.indicadoresUpsertWithoutHistorial_indicadoresInput;
    disconnect?: Prisma.indicadoresWhereInput | boolean;
    delete?: Prisma.indicadoresWhereInput | boolean;
    connect?: Prisma.indicadoresWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.indicadoresUpdateToOneWithWhereWithoutHistorial_indicadoresInput, Prisma.indicadoresUpdateWithoutHistorial_indicadoresInput>, Prisma.indicadoresUncheckedUpdateWithoutHistorial_indicadoresInput>;
};
export type indicadoresCreateNestedOneWithoutMetas_indicadoresInput = {
    create?: Prisma.XOR<Prisma.indicadoresCreateWithoutMetas_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutMetas_indicadoresInput>;
    connectOrCreate?: Prisma.indicadoresCreateOrConnectWithoutMetas_indicadoresInput;
    connect?: Prisma.indicadoresWhereUniqueInput;
};
export type indicadoresUpdateOneWithoutMetas_indicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.indicadoresCreateWithoutMetas_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutMetas_indicadoresInput>;
    connectOrCreate?: Prisma.indicadoresCreateOrConnectWithoutMetas_indicadoresInput;
    upsert?: Prisma.indicadoresUpsertWithoutMetas_indicadoresInput;
    disconnect?: Prisma.indicadoresWhereInput | boolean;
    delete?: Prisma.indicadoresWhereInput | boolean;
    connect?: Prisma.indicadoresWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.indicadoresUpdateToOneWithWhereWithoutMetas_indicadoresInput, Prisma.indicadoresUpdateWithoutMetas_indicadoresInput>, Prisma.indicadoresUncheckedUpdateWithoutMetas_indicadoresInput>;
};
export type indicadoresCreateWithoutDashboard_indicadoresInput = {
    nombre: string;
    descripcion?: string | null;
    tipo?: string | null;
    unidad_medida?: string | null;
    formula?: string | null;
    activo?: boolean | null;
    historial_indicadores?: Prisma.historial_indicadoresCreateNestedManyWithoutIndicadoresInput;
    metas_indicadores?: Prisma.metas_indicadoresCreateNestedManyWithoutIndicadoresInput;
};
export type indicadoresUncheckedCreateWithoutDashboard_indicadoresInput = {
    id_indicador?: number;
    nombre: string;
    descripcion?: string | null;
    tipo?: string | null;
    unidad_medida?: string | null;
    formula?: string | null;
    activo?: boolean | null;
    historial_indicadores?: Prisma.historial_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput;
    metas_indicadores?: Prisma.metas_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput;
};
export type indicadoresCreateOrConnectWithoutDashboard_indicadoresInput = {
    where: Prisma.indicadoresWhereUniqueInput;
    create: Prisma.XOR<Prisma.indicadoresCreateWithoutDashboard_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutDashboard_indicadoresInput>;
};
export type indicadoresUpsertWithoutDashboard_indicadoresInput = {
    update: Prisma.XOR<Prisma.indicadoresUpdateWithoutDashboard_indicadoresInput, Prisma.indicadoresUncheckedUpdateWithoutDashboard_indicadoresInput>;
    create: Prisma.XOR<Prisma.indicadoresCreateWithoutDashboard_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutDashboard_indicadoresInput>;
    where?: Prisma.indicadoresWhereInput;
};
export type indicadoresUpdateToOneWithWhereWithoutDashboard_indicadoresInput = {
    where?: Prisma.indicadoresWhereInput;
    data: Prisma.XOR<Prisma.indicadoresUpdateWithoutDashboard_indicadoresInput, Prisma.indicadoresUncheckedUpdateWithoutDashboard_indicadoresInput>;
};
export type indicadoresUpdateWithoutDashboard_indicadoresInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    historial_indicadores?: Prisma.historial_indicadoresUpdateManyWithoutIndicadoresNestedInput;
    metas_indicadores?: Prisma.metas_indicadoresUpdateManyWithoutIndicadoresNestedInput;
};
export type indicadoresUncheckedUpdateWithoutDashboard_indicadoresInput = {
    id_indicador?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    historial_indicadores?: Prisma.historial_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput;
    metas_indicadores?: Prisma.metas_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput;
};
export type indicadoresCreateWithoutHistorial_indicadoresInput = {
    nombre: string;
    descripcion?: string | null;
    tipo?: string | null;
    unidad_medida?: string | null;
    formula?: string | null;
    activo?: boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresCreateNestedManyWithoutIndicadoresInput;
    metas_indicadores?: Prisma.metas_indicadoresCreateNestedManyWithoutIndicadoresInput;
};
export type indicadoresUncheckedCreateWithoutHistorial_indicadoresInput = {
    id_indicador?: number;
    nombre: string;
    descripcion?: string | null;
    tipo?: string | null;
    unidad_medida?: string | null;
    formula?: string | null;
    activo?: boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput;
    metas_indicadores?: Prisma.metas_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput;
};
export type indicadoresCreateOrConnectWithoutHistorial_indicadoresInput = {
    where: Prisma.indicadoresWhereUniqueInput;
    create: Prisma.XOR<Prisma.indicadoresCreateWithoutHistorial_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutHistorial_indicadoresInput>;
};
export type indicadoresUpsertWithoutHistorial_indicadoresInput = {
    update: Prisma.XOR<Prisma.indicadoresUpdateWithoutHistorial_indicadoresInput, Prisma.indicadoresUncheckedUpdateWithoutHistorial_indicadoresInput>;
    create: Prisma.XOR<Prisma.indicadoresCreateWithoutHistorial_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutHistorial_indicadoresInput>;
    where?: Prisma.indicadoresWhereInput;
};
export type indicadoresUpdateToOneWithWhereWithoutHistorial_indicadoresInput = {
    where?: Prisma.indicadoresWhereInput;
    data: Prisma.XOR<Prisma.indicadoresUpdateWithoutHistorial_indicadoresInput, Prisma.indicadoresUncheckedUpdateWithoutHistorial_indicadoresInput>;
};
export type indicadoresUpdateWithoutHistorial_indicadoresInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUpdateManyWithoutIndicadoresNestedInput;
    metas_indicadores?: Prisma.metas_indicadoresUpdateManyWithoutIndicadoresNestedInput;
};
export type indicadoresUncheckedUpdateWithoutHistorial_indicadoresInput = {
    id_indicador?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput;
    metas_indicadores?: Prisma.metas_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput;
};
export type indicadoresCreateWithoutMetas_indicadoresInput = {
    nombre: string;
    descripcion?: string | null;
    tipo?: string | null;
    unidad_medida?: string | null;
    formula?: string | null;
    activo?: boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresCreateNestedManyWithoutIndicadoresInput;
    historial_indicadores?: Prisma.historial_indicadoresCreateNestedManyWithoutIndicadoresInput;
};
export type indicadoresUncheckedCreateWithoutMetas_indicadoresInput = {
    id_indicador?: number;
    nombre: string;
    descripcion?: string | null;
    tipo?: string | null;
    unidad_medida?: string | null;
    formula?: string | null;
    activo?: boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput;
    historial_indicadores?: Prisma.historial_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput;
};
export type indicadoresCreateOrConnectWithoutMetas_indicadoresInput = {
    where: Prisma.indicadoresWhereUniqueInput;
    create: Prisma.XOR<Prisma.indicadoresCreateWithoutMetas_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutMetas_indicadoresInput>;
};
export type indicadoresUpsertWithoutMetas_indicadoresInput = {
    update: Prisma.XOR<Prisma.indicadoresUpdateWithoutMetas_indicadoresInput, Prisma.indicadoresUncheckedUpdateWithoutMetas_indicadoresInput>;
    create: Prisma.XOR<Prisma.indicadoresCreateWithoutMetas_indicadoresInput, Prisma.indicadoresUncheckedCreateWithoutMetas_indicadoresInput>;
    where?: Prisma.indicadoresWhereInput;
};
export type indicadoresUpdateToOneWithWhereWithoutMetas_indicadoresInput = {
    where?: Prisma.indicadoresWhereInput;
    data: Prisma.XOR<Prisma.indicadoresUpdateWithoutMetas_indicadoresInput, Prisma.indicadoresUncheckedUpdateWithoutMetas_indicadoresInput>;
};
export type indicadoresUpdateWithoutMetas_indicadoresInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUpdateManyWithoutIndicadoresNestedInput;
    historial_indicadores?: Prisma.historial_indicadoresUpdateManyWithoutIndicadoresNestedInput;
};
export type indicadoresUncheckedUpdateWithoutMetas_indicadoresInput = {
    id_indicador?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unidad_medida?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput;
    historial_indicadores?: Prisma.historial_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput;
};
/**
 * Count Type IndicadoresCountOutputType
 */
export type IndicadoresCountOutputType = {
    dashboard_indicadores: number;
    historial_indicadores: number;
    metas_indicadores: number;
};
export type IndicadoresCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dashboard_indicadores?: boolean | IndicadoresCountOutputTypeCountDashboard_indicadoresArgs;
    historial_indicadores?: boolean | IndicadoresCountOutputTypeCountHistorial_indicadoresArgs;
    metas_indicadores?: boolean | IndicadoresCountOutputTypeCountMetas_indicadoresArgs;
};
/**
 * IndicadoresCountOutputType without action
 */
export type IndicadoresCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndicadoresCountOutputType
     */
    select?: Prisma.IndicadoresCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * IndicadoresCountOutputType without action
 */
export type IndicadoresCountOutputTypeCountDashboard_indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.dashboard_indicadoresWhereInput;
};
/**
 * IndicadoresCountOutputType without action
 */
export type IndicadoresCountOutputTypeCountHistorial_indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.historial_indicadoresWhereInput;
};
/**
 * IndicadoresCountOutputType without action
 */
export type IndicadoresCountOutputTypeCountMetas_indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.metas_indicadoresWhereInput;
};
export type indicadoresSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_indicador?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    tipo?: boolean;
    unidad_medida?: boolean;
    formula?: boolean;
    activo?: boolean;
    dashboard_indicadores?: boolean | Prisma.indicadores$dashboard_indicadoresArgs<ExtArgs>;
    historial_indicadores?: boolean | Prisma.indicadores$historial_indicadoresArgs<ExtArgs>;
    metas_indicadores?: boolean | Prisma.indicadores$metas_indicadoresArgs<ExtArgs>;
    _count?: boolean | Prisma.IndicadoresCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["indicadores"]>;
export type indicadoresSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_indicador?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    tipo?: boolean;
    unidad_medida?: boolean;
    formula?: boolean;
    activo?: boolean;
}, ExtArgs["result"]["indicadores"]>;
export type indicadoresSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_indicador?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    tipo?: boolean;
    unidad_medida?: boolean;
    formula?: boolean;
    activo?: boolean;
}, ExtArgs["result"]["indicadores"]>;
export type indicadoresSelectScalar = {
    id_indicador?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    tipo?: boolean;
    unidad_medida?: boolean;
    formula?: boolean;
    activo?: boolean;
};
export type indicadoresOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_indicador" | "nombre" | "descripcion" | "tipo" | "unidad_medida" | "formula" | "activo", ExtArgs["result"]["indicadores"]>;
export type indicadoresInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dashboard_indicadores?: boolean | Prisma.indicadores$dashboard_indicadoresArgs<ExtArgs>;
    historial_indicadores?: boolean | Prisma.indicadores$historial_indicadoresArgs<ExtArgs>;
    metas_indicadores?: boolean | Prisma.indicadores$metas_indicadoresArgs<ExtArgs>;
    _count?: boolean | Prisma.IndicadoresCountOutputTypeDefaultArgs<ExtArgs>;
};
export type indicadoresIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type indicadoresIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $indicadoresPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "indicadores";
    objects: {
        dashboard_indicadores: Prisma.$dashboard_indicadoresPayload<ExtArgs>[];
        historial_indicadores: Prisma.$historial_indicadoresPayload<ExtArgs>[];
        metas_indicadores: Prisma.$metas_indicadoresPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_indicador: number;
        nombre: string;
        descripcion: string | null;
        tipo: string | null;
        unidad_medida: string | null;
        formula: string | null;
        activo: boolean | null;
    }, ExtArgs["result"]["indicadores"]>;
    composites: {};
};
export type indicadoresGetPayload<S extends boolean | null | undefined | indicadoresDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$indicadoresPayload, S>;
export type indicadoresCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<indicadoresFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IndicadoresCountAggregateInputType | true;
};
export interface indicadoresDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['indicadores'];
        meta: {
            name: 'indicadores';
        };
    };
    /**
     * Find zero or one Indicadores that matches the filter.
     * @param {indicadoresFindUniqueArgs} args - Arguments to find a Indicadores
     * @example
     * // Get one Indicadores
     * const indicadores = await prisma.indicadores.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends indicadoresFindUniqueArgs>(args: Prisma.SelectSubset<T, indicadoresFindUniqueArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Indicadores that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {indicadoresFindUniqueOrThrowArgs} args - Arguments to find a Indicadores
     * @example
     * // Get one Indicadores
     * const indicadores = await prisma.indicadores.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends indicadoresFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, indicadoresFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Indicadores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {indicadoresFindFirstArgs} args - Arguments to find a Indicadores
     * @example
     * // Get one Indicadores
     * const indicadores = await prisma.indicadores.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends indicadoresFindFirstArgs>(args?: Prisma.SelectSubset<T, indicadoresFindFirstArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Indicadores that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {indicadoresFindFirstOrThrowArgs} args - Arguments to find a Indicadores
     * @example
     * // Get one Indicadores
     * const indicadores = await prisma.indicadores.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends indicadoresFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, indicadoresFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Indicadores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {indicadoresFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Indicadores
     * const indicadores = await prisma.indicadores.findMany()
     *
     * // Get first 10 Indicadores
     * const indicadores = await prisma.indicadores.findMany({ take: 10 })
     *
     * // Only select the `id_indicador`
     * const indicadoresWithId_indicadorOnly = await prisma.indicadores.findMany({ select: { id_indicador: true } })
     *
     */
    findMany<T extends indicadoresFindManyArgs>(args?: Prisma.SelectSubset<T, indicadoresFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Indicadores.
     * @param {indicadoresCreateArgs} args - Arguments to create a Indicadores.
     * @example
     * // Create one Indicadores
     * const Indicadores = await prisma.indicadores.create({
     *   data: {
     *     // ... data to create a Indicadores
     *   }
     * })
     *
     */
    create<T extends indicadoresCreateArgs>(args: Prisma.SelectSubset<T, indicadoresCreateArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Indicadores.
     * @param {indicadoresCreateManyArgs} args - Arguments to create many Indicadores.
     * @example
     * // Create many Indicadores
     * const indicadores = await prisma.indicadores.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends indicadoresCreateManyArgs>(args?: Prisma.SelectSubset<T, indicadoresCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Indicadores and returns the data saved in the database.
     * @param {indicadoresCreateManyAndReturnArgs} args - Arguments to create many Indicadores.
     * @example
     * // Create many Indicadores
     * const indicadores = await prisma.indicadores.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Indicadores and only return the `id_indicador`
     * const indicadoresWithId_indicadorOnly = await prisma.indicadores.createManyAndReturn({
     *   select: { id_indicador: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends indicadoresCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, indicadoresCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Indicadores.
     * @param {indicadoresDeleteArgs} args - Arguments to delete one Indicadores.
     * @example
     * // Delete one Indicadores
     * const Indicadores = await prisma.indicadores.delete({
     *   where: {
     *     // ... filter to delete one Indicadores
     *   }
     * })
     *
     */
    delete<T extends indicadoresDeleteArgs>(args: Prisma.SelectSubset<T, indicadoresDeleteArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Indicadores.
     * @param {indicadoresUpdateArgs} args - Arguments to update one Indicadores.
     * @example
     * // Update one Indicadores
     * const indicadores = await prisma.indicadores.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends indicadoresUpdateArgs>(args: Prisma.SelectSubset<T, indicadoresUpdateArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Indicadores.
     * @param {indicadoresDeleteManyArgs} args - Arguments to filter Indicadores to delete.
     * @example
     * // Delete a few Indicadores
     * const { count } = await prisma.indicadores.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends indicadoresDeleteManyArgs>(args?: Prisma.SelectSubset<T, indicadoresDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {indicadoresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Indicadores
     * const indicadores = await prisma.indicadores.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends indicadoresUpdateManyArgs>(args: Prisma.SelectSubset<T, indicadoresUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Indicadores and returns the data updated in the database.
     * @param {indicadoresUpdateManyAndReturnArgs} args - Arguments to update many Indicadores.
     * @example
     * // Update many Indicadores
     * const indicadores = await prisma.indicadores.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Indicadores and only return the `id_indicador`
     * const indicadoresWithId_indicadorOnly = await prisma.indicadores.updateManyAndReturn({
     *   select: { id_indicador: true },
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
    updateManyAndReturn<T extends indicadoresUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, indicadoresUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Indicadores.
     * @param {indicadoresUpsertArgs} args - Arguments to update or create a Indicadores.
     * @example
     * // Update or create a Indicadores
     * const indicadores = await prisma.indicadores.upsert({
     *   create: {
     *     // ... data to create a Indicadores
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Indicadores we want to update
     *   }
     * })
     */
    upsert<T extends indicadoresUpsertArgs>(args: Prisma.SelectSubset<T, indicadoresUpsertArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {indicadoresCountArgs} args - Arguments to filter Indicadores to count.
     * @example
     * // Count the number of Indicadores
     * const count = await prisma.indicadores.count({
     *   where: {
     *     // ... the filter for the Indicadores we want to count
     *   }
     * })
    **/
    count<T extends indicadoresCountArgs>(args?: Prisma.Subset<T, indicadoresCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IndicadoresCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndicadoresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IndicadoresAggregateArgs>(args: Prisma.Subset<T, IndicadoresAggregateArgs>): Prisma.PrismaPromise<GetIndicadoresAggregateType<T>>;
    /**
     * Group by Indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {indicadoresGroupByArgs} args - Group by arguments.
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
    groupBy<T extends indicadoresGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: indicadoresGroupByArgs['orderBy'];
    } : {
        orderBy?: indicadoresGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, indicadoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIndicadoresGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the indicadores model
     */
    readonly fields: indicadoresFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for indicadores.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__indicadoresClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    dashboard_indicadores<T extends Prisma.indicadores$dashboard_indicadoresArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.indicadores$dashboard_indicadoresArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    historial_indicadores<T extends Prisma.indicadores$historial_indicadoresArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.indicadores$historial_indicadoresArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$historial_indicadoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    metas_indicadores<T extends Prisma.indicadores$metas_indicadoresArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.indicadores$metas_indicadoresArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$metas_indicadoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the indicadores model
 */
export interface indicadoresFieldRefs {
    readonly id_indicador: Prisma.FieldRef<"indicadores", 'Int'>;
    readonly nombre: Prisma.FieldRef<"indicadores", 'String'>;
    readonly descripcion: Prisma.FieldRef<"indicadores", 'String'>;
    readonly tipo: Prisma.FieldRef<"indicadores", 'String'>;
    readonly unidad_medida: Prisma.FieldRef<"indicadores", 'String'>;
    readonly formula: Prisma.FieldRef<"indicadores", 'String'>;
    readonly activo: Prisma.FieldRef<"indicadores", 'Boolean'>;
}
/**
 * indicadores findUnique
 */
export type indicadoresFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which indicadores to fetch.
     */
    where: Prisma.indicadoresWhereUniqueInput;
};
/**
 * indicadores findUniqueOrThrow
 */
export type indicadoresFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which indicadores to fetch.
     */
    where: Prisma.indicadoresWhereUniqueInput;
};
/**
 * indicadores findFirst
 */
export type indicadoresFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which indicadores to fetch.
     */
    where?: Prisma.indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of indicadores to fetch.
     */
    orderBy?: Prisma.indicadoresOrderByWithRelationInput | Prisma.indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for indicadores.
     */
    cursor?: Prisma.indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of indicadores.
     */
    distinct?: Prisma.IndicadoresScalarFieldEnum | Prisma.IndicadoresScalarFieldEnum[];
};
/**
 * indicadores findFirstOrThrow
 */
export type indicadoresFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which indicadores to fetch.
     */
    where?: Prisma.indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of indicadores to fetch.
     */
    orderBy?: Prisma.indicadoresOrderByWithRelationInput | Prisma.indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for indicadores.
     */
    cursor?: Prisma.indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of indicadores.
     */
    distinct?: Prisma.IndicadoresScalarFieldEnum | Prisma.IndicadoresScalarFieldEnum[];
};
/**
 * indicadores findMany
 */
export type indicadoresFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which indicadores to fetch.
     */
    where?: Prisma.indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of indicadores to fetch.
     */
    orderBy?: Prisma.indicadoresOrderByWithRelationInput | Prisma.indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing indicadores.
     */
    cursor?: Prisma.indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` indicadores.
     */
    skip?: number;
    distinct?: Prisma.IndicadoresScalarFieldEnum | Prisma.IndicadoresScalarFieldEnum[];
};
/**
 * indicadores create
 */
export type indicadoresCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a indicadores.
     */
    data: Prisma.XOR<Prisma.indicadoresCreateInput, Prisma.indicadoresUncheckedCreateInput>;
};
/**
 * indicadores createMany
 */
export type indicadoresCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many indicadores.
     */
    data: Prisma.indicadoresCreateManyInput | Prisma.indicadoresCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * indicadores createManyAndReturn
 */
export type indicadoresCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the indicadores
     */
    select?: Prisma.indicadoresSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the indicadores
     */
    omit?: Prisma.indicadoresOmit<ExtArgs> | null;
    /**
     * The data used to create many indicadores.
     */
    data: Prisma.indicadoresCreateManyInput | Prisma.indicadoresCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * indicadores update
 */
export type indicadoresUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a indicadores.
     */
    data: Prisma.XOR<Prisma.indicadoresUpdateInput, Prisma.indicadoresUncheckedUpdateInput>;
    /**
     * Choose, which indicadores to update.
     */
    where: Prisma.indicadoresWhereUniqueInput;
};
/**
 * indicadores updateMany
 */
export type indicadoresUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update indicadores.
     */
    data: Prisma.XOR<Prisma.indicadoresUpdateManyMutationInput, Prisma.indicadoresUncheckedUpdateManyInput>;
    /**
     * Filter which indicadores to update
     */
    where?: Prisma.indicadoresWhereInput;
    /**
     * Limit how many indicadores to update.
     */
    limit?: number;
};
/**
 * indicadores updateManyAndReturn
 */
export type indicadoresUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the indicadores
     */
    select?: Prisma.indicadoresSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the indicadores
     */
    omit?: Prisma.indicadoresOmit<ExtArgs> | null;
    /**
     * The data used to update indicadores.
     */
    data: Prisma.XOR<Prisma.indicadoresUpdateManyMutationInput, Prisma.indicadoresUncheckedUpdateManyInput>;
    /**
     * Filter which indicadores to update
     */
    where?: Prisma.indicadoresWhereInput;
    /**
     * Limit how many indicadores to update.
     */
    limit?: number;
};
/**
 * indicadores upsert
 */
export type indicadoresUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the indicadores to update in case it exists.
     */
    where: Prisma.indicadoresWhereUniqueInput;
    /**
     * In case the indicadores found by the `where` argument doesn't exist, create a new indicadores with this data.
     */
    create: Prisma.XOR<Prisma.indicadoresCreateInput, Prisma.indicadoresUncheckedCreateInput>;
    /**
     * In case the indicadores was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.indicadoresUpdateInput, Prisma.indicadoresUncheckedUpdateInput>;
};
/**
 * indicadores delete
 */
export type indicadoresDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which indicadores to delete.
     */
    where: Prisma.indicadoresWhereUniqueInput;
};
/**
 * indicadores deleteMany
 */
export type indicadoresDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which indicadores to delete
     */
    where?: Prisma.indicadoresWhereInput;
    /**
     * Limit how many indicadores to delete.
     */
    limit?: number;
};
/**
 * indicadores.dashboard_indicadores
 */
export type indicadores$dashboard_indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_indicadores
     */
    select?: Prisma.dashboard_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboard_indicadores
     */
    omit?: Prisma.dashboard_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboard_indicadoresInclude<ExtArgs> | null;
    where?: Prisma.dashboard_indicadoresWhereInput;
    orderBy?: Prisma.dashboard_indicadoresOrderByWithRelationInput | Prisma.dashboard_indicadoresOrderByWithRelationInput[];
    cursor?: Prisma.dashboard_indicadoresWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Dashboard_indicadoresScalarFieldEnum | Prisma.Dashboard_indicadoresScalarFieldEnum[];
};
/**
 * indicadores.historial_indicadores
 */
export type indicadores$historial_indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historial_indicadores
     */
    select?: Prisma.historial_indicadoresSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the historial_indicadores
     */
    omit?: Prisma.historial_indicadoresOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.historial_indicadoresInclude<ExtArgs> | null;
    where?: Prisma.historial_indicadoresWhereInput;
    orderBy?: Prisma.historial_indicadoresOrderByWithRelationInput | Prisma.historial_indicadoresOrderByWithRelationInput[];
    cursor?: Prisma.historial_indicadoresWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Historial_indicadoresScalarFieldEnum | Prisma.Historial_indicadoresScalarFieldEnum[];
};
/**
 * indicadores.metas_indicadores
 */
export type indicadores$metas_indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.metas_indicadoresWhereInput;
    orderBy?: Prisma.metas_indicadoresOrderByWithRelationInput | Prisma.metas_indicadoresOrderByWithRelationInput[];
    cursor?: Prisma.metas_indicadoresWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Metas_indicadoresScalarFieldEnum | Prisma.Metas_indicadoresScalarFieldEnum[];
};
/**
 * indicadores without action
 */
export type indicadoresDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=indicadores.d.ts.map