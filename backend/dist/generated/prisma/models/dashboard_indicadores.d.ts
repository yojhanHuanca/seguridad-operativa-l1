import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model dashboard_indicadores
 *
 */
export type dashboard_indicadoresModel = runtime.Types.Result.DefaultSelection<Prisma.$dashboard_indicadoresPayload>;
export type AggregateDashboard_indicadores = {
    _count: Dashboard_indicadoresCountAggregateOutputType | null;
    _avg: Dashboard_indicadoresAvgAggregateOutputType | null;
    _sum: Dashboard_indicadoresSumAggregateOutputType | null;
    _min: Dashboard_indicadoresMinAggregateOutputType | null;
    _max: Dashboard_indicadoresMaxAggregateOutputType | null;
};
export type Dashboard_indicadoresAvgAggregateOutputType = {
    id: number | null;
    id_dashboard: number | null;
    id_indicador: number | null;
    posicion: number | null;
};
export type Dashboard_indicadoresSumAggregateOutputType = {
    id: number | null;
    id_dashboard: number | null;
    id_indicador: number | null;
    posicion: number | null;
};
export type Dashboard_indicadoresMinAggregateOutputType = {
    id: number | null;
    id_dashboard: number | null;
    id_indicador: number | null;
    posicion: number | null;
};
export type Dashboard_indicadoresMaxAggregateOutputType = {
    id: number | null;
    id_dashboard: number | null;
    id_indicador: number | null;
    posicion: number | null;
};
export type Dashboard_indicadoresCountAggregateOutputType = {
    id: number;
    id_dashboard: number;
    id_indicador: number;
    posicion: number;
    _all: number;
};
export type Dashboard_indicadoresAvgAggregateInputType = {
    id?: true;
    id_dashboard?: true;
    id_indicador?: true;
    posicion?: true;
};
export type Dashboard_indicadoresSumAggregateInputType = {
    id?: true;
    id_dashboard?: true;
    id_indicador?: true;
    posicion?: true;
};
export type Dashboard_indicadoresMinAggregateInputType = {
    id?: true;
    id_dashboard?: true;
    id_indicador?: true;
    posicion?: true;
};
export type Dashboard_indicadoresMaxAggregateInputType = {
    id?: true;
    id_dashboard?: true;
    id_indicador?: true;
    posicion?: true;
};
export type Dashboard_indicadoresCountAggregateInputType = {
    id?: true;
    id_dashboard?: true;
    id_indicador?: true;
    posicion?: true;
    _all?: true;
};
export type Dashboard_indicadoresAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which dashboard_indicadores to aggregate.
     */
    where?: Prisma.dashboard_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of dashboard_indicadores to fetch.
     */
    orderBy?: Prisma.dashboard_indicadoresOrderByWithRelationInput | Prisma.dashboard_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.dashboard_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` dashboard_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` dashboard_indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned dashboard_indicadores
    **/
    _count?: true | Dashboard_indicadoresCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Dashboard_indicadoresAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Dashboard_indicadoresSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Dashboard_indicadoresMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Dashboard_indicadoresMaxAggregateInputType;
};
export type GetDashboard_indicadoresAggregateType<T extends Dashboard_indicadoresAggregateArgs> = {
    [P in keyof T & keyof AggregateDashboard_indicadores]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDashboard_indicadores[P]> : Prisma.GetScalarType<T[P], AggregateDashboard_indicadores[P]>;
};
export type dashboard_indicadoresGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.dashboard_indicadoresWhereInput;
    orderBy?: Prisma.dashboard_indicadoresOrderByWithAggregationInput | Prisma.dashboard_indicadoresOrderByWithAggregationInput[];
    by: Prisma.Dashboard_indicadoresScalarFieldEnum[] | Prisma.Dashboard_indicadoresScalarFieldEnum;
    having?: Prisma.dashboard_indicadoresScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Dashboard_indicadoresCountAggregateInputType | true;
    _avg?: Dashboard_indicadoresAvgAggregateInputType;
    _sum?: Dashboard_indicadoresSumAggregateInputType;
    _min?: Dashboard_indicadoresMinAggregateInputType;
    _max?: Dashboard_indicadoresMaxAggregateInputType;
};
export type Dashboard_indicadoresGroupByOutputType = {
    id: number;
    id_dashboard: number;
    id_indicador: number;
    posicion: number | null;
    _count: Dashboard_indicadoresCountAggregateOutputType | null;
    _avg: Dashboard_indicadoresAvgAggregateOutputType | null;
    _sum: Dashboard_indicadoresSumAggregateOutputType | null;
    _min: Dashboard_indicadoresMinAggregateOutputType | null;
    _max: Dashboard_indicadoresMaxAggregateOutputType | null;
};
type GetDashboard_indicadoresGroupByPayload<T extends dashboard_indicadoresGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Dashboard_indicadoresGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Dashboard_indicadoresGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Dashboard_indicadoresGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Dashboard_indicadoresGroupByOutputType[P]>;
}>>;
export type dashboard_indicadoresWhereInput = {
    AND?: Prisma.dashboard_indicadoresWhereInput | Prisma.dashboard_indicadoresWhereInput[];
    OR?: Prisma.dashboard_indicadoresWhereInput[];
    NOT?: Prisma.dashboard_indicadoresWhereInput | Prisma.dashboard_indicadoresWhereInput[];
    id?: Prisma.IntFilter<"dashboard_indicadores"> | number;
    id_dashboard?: Prisma.IntFilter<"dashboard_indicadores"> | number;
    id_indicador?: Prisma.IntFilter<"dashboard_indicadores"> | number;
    posicion?: Prisma.IntNullableFilter<"dashboard_indicadores"> | number | null;
    dashboards?: Prisma.XOR<Prisma.DashboardsScalarRelationFilter, Prisma.dashboardsWhereInput>;
    indicadores?: Prisma.XOR<Prisma.IndicadoresScalarRelationFilter, Prisma.indicadoresWhereInput>;
};
export type dashboard_indicadoresOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    id_dashboard?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    posicion?: Prisma.SortOrderInput | Prisma.SortOrder;
    dashboards?: Prisma.dashboardsOrderByWithRelationInput;
    indicadores?: Prisma.indicadoresOrderByWithRelationInput;
};
export type dashboard_indicadoresWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.dashboard_indicadoresWhereInput | Prisma.dashboard_indicadoresWhereInput[];
    OR?: Prisma.dashboard_indicadoresWhereInput[];
    NOT?: Prisma.dashboard_indicadoresWhereInput | Prisma.dashboard_indicadoresWhereInput[];
    id_dashboard?: Prisma.IntFilter<"dashboard_indicadores"> | number;
    id_indicador?: Prisma.IntFilter<"dashboard_indicadores"> | number;
    posicion?: Prisma.IntNullableFilter<"dashboard_indicadores"> | number | null;
    dashboards?: Prisma.XOR<Prisma.DashboardsScalarRelationFilter, Prisma.dashboardsWhereInput>;
    indicadores?: Prisma.XOR<Prisma.IndicadoresScalarRelationFilter, Prisma.indicadoresWhereInput>;
}, "id">;
export type dashboard_indicadoresOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    id_dashboard?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    posicion?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.dashboard_indicadoresCountOrderByAggregateInput;
    _avg?: Prisma.dashboard_indicadoresAvgOrderByAggregateInput;
    _max?: Prisma.dashboard_indicadoresMaxOrderByAggregateInput;
    _min?: Prisma.dashboard_indicadoresMinOrderByAggregateInput;
    _sum?: Prisma.dashboard_indicadoresSumOrderByAggregateInput;
};
export type dashboard_indicadoresScalarWhereWithAggregatesInput = {
    AND?: Prisma.dashboard_indicadoresScalarWhereWithAggregatesInput | Prisma.dashboard_indicadoresScalarWhereWithAggregatesInput[];
    OR?: Prisma.dashboard_indicadoresScalarWhereWithAggregatesInput[];
    NOT?: Prisma.dashboard_indicadoresScalarWhereWithAggregatesInput | Prisma.dashboard_indicadoresScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"dashboard_indicadores"> | number;
    id_dashboard?: Prisma.IntWithAggregatesFilter<"dashboard_indicadores"> | number;
    id_indicador?: Prisma.IntWithAggregatesFilter<"dashboard_indicadores"> | number;
    posicion?: Prisma.IntNullableWithAggregatesFilter<"dashboard_indicadores"> | number | null;
};
export type dashboard_indicadoresCreateInput = {
    posicion?: number | null;
    dashboards: Prisma.dashboardsCreateNestedOneWithoutDashboard_indicadoresInput;
    indicadores: Prisma.indicadoresCreateNestedOneWithoutDashboard_indicadoresInput;
};
export type dashboard_indicadoresUncheckedCreateInput = {
    id?: number;
    id_dashboard: number;
    id_indicador: number;
    posicion?: number | null;
};
export type dashboard_indicadoresUpdateInput = {
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dashboards?: Prisma.dashboardsUpdateOneRequiredWithoutDashboard_indicadoresNestedInput;
    indicadores?: Prisma.indicadoresUpdateOneRequiredWithoutDashboard_indicadoresNestedInput;
};
export type dashboard_indicadoresUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_dashboard?: Prisma.IntFieldUpdateOperationsInput | number;
    id_indicador?: Prisma.IntFieldUpdateOperationsInput | number;
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type dashboard_indicadoresCreateManyInput = {
    id?: number;
    id_dashboard: number;
    id_indicador: number;
    posicion?: number | null;
};
export type dashboard_indicadoresUpdateManyMutationInput = {
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type dashboard_indicadoresUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_dashboard?: Prisma.IntFieldUpdateOperationsInput | number;
    id_indicador?: Prisma.IntFieldUpdateOperationsInput | number;
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type dashboard_indicadoresCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_dashboard?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    posicion?: Prisma.SortOrder;
};
export type dashboard_indicadoresAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_dashboard?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    posicion?: Prisma.SortOrder;
};
export type dashboard_indicadoresMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_dashboard?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    posicion?: Prisma.SortOrder;
};
export type dashboard_indicadoresMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_dashboard?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    posicion?: Prisma.SortOrder;
};
export type dashboard_indicadoresSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_dashboard?: Prisma.SortOrder;
    id_indicador?: Prisma.SortOrder;
    posicion?: Prisma.SortOrder;
};
export type Dashboard_indicadoresListRelationFilter = {
    every?: Prisma.dashboard_indicadoresWhereInput;
    some?: Prisma.dashboard_indicadoresWhereInput;
    none?: Prisma.dashboard_indicadoresWhereInput;
};
export type dashboard_indicadoresOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type dashboard_indicadoresCreateNestedManyWithoutDashboardsInput = {
    create?: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutDashboardsInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput> | Prisma.dashboard_indicadoresCreateWithoutDashboardsInput[] | Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput[];
    connectOrCreate?: Prisma.dashboard_indicadoresCreateOrConnectWithoutDashboardsInput | Prisma.dashboard_indicadoresCreateOrConnectWithoutDashboardsInput[];
    createMany?: Prisma.dashboard_indicadoresCreateManyDashboardsInputEnvelope;
    connect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
};
export type dashboard_indicadoresUncheckedCreateNestedManyWithoutDashboardsInput = {
    create?: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutDashboardsInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput> | Prisma.dashboard_indicadoresCreateWithoutDashboardsInput[] | Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput[];
    connectOrCreate?: Prisma.dashboard_indicadoresCreateOrConnectWithoutDashboardsInput | Prisma.dashboard_indicadoresCreateOrConnectWithoutDashboardsInput[];
    createMany?: Prisma.dashboard_indicadoresCreateManyDashboardsInputEnvelope;
    connect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
};
export type dashboard_indicadoresUpdateManyWithoutDashboardsNestedInput = {
    create?: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutDashboardsInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput> | Prisma.dashboard_indicadoresCreateWithoutDashboardsInput[] | Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput[];
    connectOrCreate?: Prisma.dashboard_indicadoresCreateOrConnectWithoutDashboardsInput | Prisma.dashboard_indicadoresCreateOrConnectWithoutDashboardsInput[];
    upsert?: Prisma.dashboard_indicadoresUpsertWithWhereUniqueWithoutDashboardsInput | Prisma.dashboard_indicadoresUpsertWithWhereUniqueWithoutDashboardsInput[];
    createMany?: Prisma.dashboard_indicadoresCreateManyDashboardsInputEnvelope;
    set?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    disconnect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    delete?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    connect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    update?: Prisma.dashboard_indicadoresUpdateWithWhereUniqueWithoutDashboardsInput | Prisma.dashboard_indicadoresUpdateWithWhereUniqueWithoutDashboardsInput[];
    updateMany?: Prisma.dashboard_indicadoresUpdateManyWithWhereWithoutDashboardsInput | Prisma.dashboard_indicadoresUpdateManyWithWhereWithoutDashboardsInput[];
    deleteMany?: Prisma.dashboard_indicadoresScalarWhereInput | Prisma.dashboard_indicadoresScalarWhereInput[];
};
export type dashboard_indicadoresUncheckedUpdateManyWithoutDashboardsNestedInput = {
    create?: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutDashboardsInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput> | Prisma.dashboard_indicadoresCreateWithoutDashboardsInput[] | Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput[];
    connectOrCreate?: Prisma.dashboard_indicadoresCreateOrConnectWithoutDashboardsInput | Prisma.dashboard_indicadoresCreateOrConnectWithoutDashboardsInput[];
    upsert?: Prisma.dashboard_indicadoresUpsertWithWhereUniqueWithoutDashboardsInput | Prisma.dashboard_indicadoresUpsertWithWhereUniqueWithoutDashboardsInput[];
    createMany?: Prisma.dashboard_indicadoresCreateManyDashboardsInputEnvelope;
    set?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    disconnect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    delete?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    connect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    update?: Prisma.dashboard_indicadoresUpdateWithWhereUniqueWithoutDashboardsInput | Prisma.dashboard_indicadoresUpdateWithWhereUniqueWithoutDashboardsInput[];
    updateMany?: Prisma.dashboard_indicadoresUpdateManyWithWhereWithoutDashboardsInput | Prisma.dashboard_indicadoresUpdateManyWithWhereWithoutDashboardsInput[];
    deleteMany?: Prisma.dashboard_indicadoresScalarWhereInput | Prisma.dashboard_indicadoresScalarWhereInput[];
};
export type dashboard_indicadoresCreateNestedManyWithoutIndicadoresInput = {
    create?: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput[] | Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.dashboard_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.dashboard_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    createMany?: Prisma.dashboard_indicadoresCreateManyIndicadoresInputEnvelope;
    connect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
};
export type dashboard_indicadoresUncheckedCreateNestedManyWithoutIndicadoresInput = {
    create?: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput[] | Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.dashboard_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.dashboard_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    createMany?: Prisma.dashboard_indicadoresCreateManyIndicadoresInputEnvelope;
    connect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
};
export type dashboard_indicadoresUpdateManyWithoutIndicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput[] | Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.dashboard_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.dashboard_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    upsert?: Prisma.dashboard_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput | Prisma.dashboard_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput[];
    createMany?: Prisma.dashboard_indicadoresCreateManyIndicadoresInputEnvelope;
    set?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    disconnect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    delete?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    connect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    update?: Prisma.dashboard_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput | Prisma.dashboard_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput[];
    updateMany?: Prisma.dashboard_indicadoresUpdateManyWithWhereWithoutIndicadoresInput | Prisma.dashboard_indicadoresUpdateManyWithWhereWithoutIndicadoresInput[];
    deleteMany?: Prisma.dashboard_indicadoresScalarWhereInput | Prisma.dashboard_indicadoresScalarWhereInput[];
};
export type dashboard_indicadoresUncheckedUpdateManyWithoutIndicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput> | Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput[] | Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput[];
    connectOrCreate?: Prisma.dashboard_indicadoresCreateOrConnectWithoutIndicadoresInput | Prisma.dashboard_indicadoresCreateOrConnectWithoutIndicadoresInput[];
    upsert?: Prisma.dashboard_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput | Prisma.dashboard_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput[];
    createMany?: Prisma.dashboard_indicadoresCreateManyIndicadoresInputEnvelope;
    set?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    disconnect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    delete?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    connect?: Prisma.dashboard_indicadoresWhereUniqueInput | Prisma.dashboard_indicadoresWhereUniqueInput[];
    update?: Prisma.dashboard_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput | Prisma.dashboard_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput[];
    updateMany?: Prisma.dashboard_indicadoresUpdateManyWithWhereWithoutIndicadoresInput | Prisma.dashboard_indicadoresUpdateManyWithWhereWithoutIndicadoresInput[];
    deleteMany?: Prisma.dashboard_indicadoresScalarWhereInput | Prisma.dashboard_indicadoresScalarWhereInput[];
};
export type dashboard_indicadoresCreateWithoutDashboardsInput = {
    posicion?: number | null;
    indicadores: Prisma.indicadoresCreateNestedOneWithoutDashboard_indicadoresInput;
};
export type dashboard_indicadoresUncheckedCreateWithoutDashboardsInput = {
    id?: number;
    id_indicador: number;
    posicion?: number | null;
};
export type dashboard_indicadoresCreateOrConnectWithoutDashboardsInput = {
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
    create: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutDashboardsInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput>;
};
export type dashboard_indicadoresCreateManyDashboardsInputEnvelope = {
    data: Prisma.dashboard_indicadoresCreateManyDashboardsInput | Prisma.dashboard_indicadoresCreateManyDashboardsInput[];
    skipDuplicates?: boolean;
};
export type dashboard_indicadoresUpsertWithWhereUniqueWithoutDashboardsInput = {
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
    update: Prisma.XOR<Prisma.dashboard_indicadoresUpdateWithoutDashboardsInput, Prisma.dashboard_indicadoresUncheckedUpdateWithoutDashboardsInput>;
    create: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutDashboardsInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutDashboardsInput>;
};
export type dashboard_indicadoresUpdateWithWhereUniqueWithoutDashboardsInput = {
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
    data: Prisma.XOR<Prisma.dashboard_indicadoresUpdateWithoutDashboardsInput, Prisma.dashboard_indicadoresUncheckedUpdateWithoutDashboardsInput>;
};
export type dashboard_indicadoresUpdateManyWithWhereWithoutDashboardsInput = {
    where: Prisma.dashboard_indicadoresScalarWhereInput;
    data: Prisma.XOR<Prisma.dashboard_indicadoresUpdateManyMutationInput, Prisma.dashboard_indicadoresUncheckedUpdateManyWithoutDashboardsInput>;
};
export type dashboard_indicadoresScalarWhereInput = {
    AND?: Prisma.dashboard_indicadoresScalarWhereInput | Prisma.dashboard_indicadoresScalarWhereInput[];
    OR?: Prisma.dashboard_indicadoresScalarWhereInput[];
    NOT?: Prisma.dashboard_indicadoresScalarWhereInput | Prisma.dashboard_indicadoresScalarWhereInput[];
    id?: Prisma.IntFilter<"dashboard_indicadores"> | number;
    id_dashboard?: Prisma.IntFilter<"dashboard_indicadores"> | number;
    id_indicador?: Prisma.IntFilter<"dashboard_indicadores"> | number;
    posicion?: Prisma.IntNullableFilter<"dashboard_indicadores"> | number | null;
};
export type dashboard_indicadoresCreateWithoutIndicadoresInput = {
    posicion?: number | null;
    dashboards: Prisma.dashboardsCreateNestedOneWithoutDashboard_indicadoresInput;
};
export type dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput = {
    id?: number;
    id_dashboard: number;
    posicion?: number | null;
};
export type dashboard_indicadoresCreateOrConnectWithoutIndicadoresInput = {
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
    create: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput>;
};
export type dashboard_indicadoresCreateManyIndicadoresInputEnvelope = {
    data: Prisma.dashboard_indicadoresCreateManyIndicadoresInput | Prisma.dashboard_indicadoresCreateManyIndicadoresInput[];
    skipDuplicates?: boolean;
};
export type dashboard_indicadoresUpsertWithWhereUniqueWithoutIndicadoresInput = {
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
    update: Prisma.XOR<Prisma.dashboard_indicadoresUpdateWithoutIndicadoresInput, Prisma.dashboard_indicadoresUncheckedUpdateWithoutIndicadoresInput>;
    create: Prisma.XOR<Prisma.dashboard_indicadoresCreateWithoutIndicadoresInput, Prisma.dashboard_indicadoresUncheckedCreateWithoutIndicadoresInput>;
};
export type dashboard_indicadoresUpdateWithWhereUniqueWithoutIndicadoresInput = {
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
    data: Prisma.XOR<Prisma.dashboard_indicadoresUpdateWithoutIndicadoresInput, Prisma.dashboard_indicadoresUncheckedUpdateWithoutIndicadoresInput>;
};
export type dashboard_indicadoresUpdateManyWithWhereWithoutIndicadoresInput = {
    where: Prisma.dashboard_indicadoresScalarWhereInput;
    data: Prisma.XOR<Prisma.dashboard_indicadoresUpdateManyMutationInput, Prisma.dashboard_indicadoresUncheckedUpdateManyWithoutIndicadoresInput>;
};
export type dashboard_indicadoresCreateManyDashboardsInput = {
    id?: number;
    id_indicador: number;
    posicion?: number | null;
};
export type dashboard_indicadoresUpdateWithoutDashboardsInput = {
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    indicadores?: Prisma.indicadoresUpdateOneRequiredWithoutDashboard_indicadoresNestedInput;
};
export type dashboard_indicadoresUncheckedUpdateWithoutDashboardsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_indicador?: Prisma.IntFieldUpdateOperationsInput | number;
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type dashboard_indicadoresUncheckedUpdateManyWithoutDashboardsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_indicador?: Prisma.IntFieldUpdateOperationsInput | number;
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type dashboard_indicadoresCreateManyIndicadoresInput = {
    id?: number;
    id_dashboard: number;
    posicion?: number | null;
};
export type dashboard_indicadoresUpdateWithoutIndicadoresInput = {
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dashboards?: Prisma.dashboardsUpdateOneRequiredWithoutDashboard_indicadoresNestedInput;
};
export type dashboard_indicadoresUncheckedUpdateWithoutIndicadoresInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_dashboard?: Prisma.IntFieldUpdateOperationsInput | number;
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type dashboard_indicadoresUncheckedUpdateManyWithoutIndicadoresInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_dashboard?: Prisma.IntFieldUpdateOperationsInput | number;
    posicion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type dashboard_indicadoresSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    id_dashboard?: boolean;
    id_indicador?: boolean;
    posicion?: boolean;
    dashboards?: boolean | Prisma.dashboardsDefaultArgs<ExtArgs>;
    indicadores?: boolean | Prisma.indicadoresDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["dashboard_indicadores"]>;
export type dashboard_indicadoresSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    id_dashboard?: boolean;
    id_indicador?: boolean;
    posicion?: boolean;
    dashboards?: boolean | Prisma.dashboardsDefaultArgs<ExtArgs>;
    indicadores?: boolean | Prisma.indicadoresDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["dashboard_indicadores"]>;
export type dashboard_indicadoresSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    id_dashboard?: boolean;
    id_indicador?: boolean;
    posicion?: boolean;
    dashboards?: boolean | Prisma.dashboardsDefaultArgs<ExtArgs>;
    indicadores?: boolean | Prisma.indicadoresDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["dashboard_indicadores"]>;
export type dashboard_indicadoresSelectScalar = {
    id?: boolean;
    id_dashboard?: boolean;
    id_indicador?: boolean;
    posicion?: boolean;
};
export type dashboard_indicadoresOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "id_dashboard" | "id_indicador" | "posicion", ExtArgs["result"]["dashboard_indicadores"]>;
export type dashboard_indicadoresInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dashboards?: boolean | Prisma.dashboardsDefaultArgs<ExtArgs>;
    indicadores?: boolean | Prisma.indicadoresDefaultArgs<ExtArgs>;
};
export type dashboard_indicadoresIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dashboards?: boolean | Prisma.dashboardsDefaultArgs<ExtArgs>;
    indicadores?: boolean | Prisma.indicadoresDefaultArgs<ExtArgs>;
};
export type dashboard_indicadoresIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dashboards?: boolean | Prisma.dashboardsDefaultArgs<ExtArgs>;
    indicadores?: boolean | Prisma.indicadoresDefaultArgs<ExtArgs>;
};
export type $dashboard_indicadoresPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "dashboard_indicadores";
    objects: {
        dashboards: Prisma.$dashboardsPayload<ExtArgs>;
        indicadores: Prisma.$indicadoresPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        id_dashboard: number;
        id_indicador: number;
        posicion: number | null;
    }, ExtArgs["result"]["dashboard_indicadores"]>;
    composites: {};
};
export type dashboard_indicadoresGetPayload<S extends boolean | null | undefined | dashboard_indicadoresDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload, S>;
export type dashboard_indicadoresCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<dashboard_indicadoresFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Dashboard_indicadoresCountAggregateInputType | true;
};
export interface dashboard_indicadoresDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['dashboard_indicadores'];
        meta: {
            name: 'dashboard_indicadores';
        };
    };
    /**
     * Find zero or one Dashboard_indicadores that matches the filter.
     * @param {dashboard_indicadoresFindUniqueArgs} args - Arguments to find a Dashboard_indicadores
     * @example
     * // Get one Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends dashboard_indicadoresFindUniqueArgs>(args: Prisma.SelectSubset<T, dashboard_indicadoresFindUniqueArgs<ExtArgs>>): Prisma.Prisma__dashboard_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Dashboard_indicadores that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {dashboard_indicadoresFindUniqueOrThrowArgs} args - Arguments to find a Dashboard_indicadores
     * @example
     * // Get one Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends dashboard_indicadoresFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, dashboard_indicadoresFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__dashboard_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Dashboard_indicadores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_indicadoresFindFirstArgs} args - Arguments to find a Dashboard_indicadores
     * @example
     * // Get one Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends dashboard_indicadoresFindFirstArgs>(args?: Prisma.SelectSubset<T, dashboard_indicadoresFindFirstArgs<ExtArgs>>): Prisma.Prisma__dashboard_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Dashboard_indicadores that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_indicadoresFindFirstOrThrowArgs} args - Arguments to find a Dashboard_indicadores
     * @example
     * // Get one Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends dashboard_indicadoresFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, dashboard_indicadoresFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__dashboard_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Dashboard_indicadores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_indicadoresFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.findMany()
     *
     * // Get first 10 Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const dashboard_indicadoresWithIdOnly = await prisma.dashboard_indicadores.findMany({ select: { id: true } })
     *
     */
    findMany<T extends dashboard_indicadoresFindManyArgs>(args?: Prisma.SelectSubset<T, dashboard_indicadoresFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Dashboard_indicadores.
     * @param {dashboard_indicadoresCreateArgs} args - Arguments to create a Dashboard_indicadores.
     * @example
     * // Create one Dashboard_indicadores
     * const Dashboard_indicadores = await prisma.dashboard_indicadores.create({
     *   data: {
     *     // ... data to create a Dashboard_indicadores
     *   }
     * })
     *
     */
    create<T extends dashboard_indicadoresCreateArgs>(args: Prisma.SelectSubset<T, dashboard_indicadoresCreateArgs<ExtArgs>>): Prisma.Prisma__dashboard_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Dashboard_indicadores.
     * @param {dashboard_indicadoresCreateManyArgs} args - Arguments to create many Dashboard_indicadores.
     * @example
     * // Create many Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends dashboard_indicadoresCreateManyArgs>(args?: Prisma.SelectSubset<T, dashboard_indicadoresCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Dashboard_indicadores and returns the data saved in the database.
     * @param {dashboard_indicadoresCreateManyAndReturnArgs} args - Arguments to create many Dashboard_indicadores.
     * @example
     * // Create many Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Dashboard_indicadores and only return the `id`
     * const dashboard_indicadoresWithIdOnly = await prisma.dashboard_indicadores.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends dashboard_indicadoresCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, dashboard_indicadoresCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Dashboard_indicadores.
     * @param {dashboard_indicadoresDeleteArgs} args - Arguments to delete one Dashboard_indicadores.
     * @example
     * // Delete one Dashboard_indicadores
     * const Dashboard_indicadores = await prisma.dashboard_indicadores.delete({
     *   where: {
     *     // ... filter to delete one Dashboard_indicadores
     *   }
     * })
     *
     */
    delete<T extends dashboard_indicadoresDeleteArgs>(args: Prisma.SelectSubset<T, dashboard_indicadoresDeleteArgs<ExtArgs>>): Prisma.Prisma__dashboard_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Dashboard_indicadores.
     * @param {dashboard_indicadoresUpdateArgs} args - Arguments to update one Dashboard_indicadores.
     * @example
     * // Update one Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends dashboard_indicadoresUpdateArgs>(args: Prisma.SelectSubset<T, dashboard_indicadoresUpdateArgs<ExtArgs>>): Prisma.Prisma__dashboard_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Dashboard_indicadores.
     * @param {dashboard_indicadoresDeleteManyArgs} args - Arguments to filter Dashboard_indicadores to delete.
     * @example
     * // Delete a few Dashboard_indicadores
     * const { count } = await prisma.dashboard_indicadores.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends dashboard_indicadoresDeleteManyArgs>(args?: Prisma.SelectSubset<T, dashboard_indicadoresDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Dashboard_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_indicadoresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends dashboard_indicadoresUpdateManyArgs>(args: Prisma.SelectSubset<T, dashboard_indicadoresUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Dashboard_indicadores and returns the data updated in the database.
     * @param {dashboard_indicadoresUpdateManyAndReturnArgs} args - Arguments to update many Dashboard_indicadores.
     * @example
     * // Update many Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Dashboard_indicadores and only return the `id`
     * const dashboard_indicadoresWithIdOnly = await prisma.dashboard_indicadores.updateManyAndReturn({
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
    updateManyAndReturn<T extends dashboard_indicadoresUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, dashboard_indicadoresUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Dashboard_indicadores.
     * @param {dashboard_indicadoresUpsertArgs} args - Arguments to update or create a Dashboard_indicadores.
     * @example
     * // Update or create a Dashboard_indicadores
     * const dashboard_indicadores = await prisma.dashboard_indicadores.upsert({
     *   create: {
     *     // ... data to create a Dashboard_indicadores
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dashboard_indicadores we want to update
     *   }
     * })
     */
    upsert<T extends dashboard_indicadoresUpsertArgs>(args: Prisma.SelectSubset<T, dashboard_indicadoresUpsertArgs<ExtArgs>>): Prisma.Prisma__dashboard_indicadoresClient<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Dashboard_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_indicadoresCountArgs} args - Arguments to filter Dashboard_indicadores to count.
     * @example
     * // Count the number of Dashboard_indicadores
     * const count = await prisma.dashboard_indicadores.count({
     *   where: {
     *     // ... the filter for the Dashboard_indicadores we want to count
     *   }
     * })
    **/
    count<T extends dashboard_indicadoresCountArgs>(args?: Prisma.Subset<T, dashboard_indicadoresCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Dashboard_indicadoresCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Dashboard_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dashboard_indicadoresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Dashboard_indicadoresAggregateArgs>(args: Prisma.Subset<T, Dashboard_indicadoresAggregateArgs>): Prisma.PrismaPromise<GetDashboard_indicadoresAggregateType<T>>;
    /**
     * Group by Dashboard_indicadores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_indicadoresGroupByArgs} args - Group by arguments.
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
    groupBy<T extends dashboard_indicadoresGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: dashboard_indicadoresGroupByArgs['orderBy'];
    } : {
        orderBy?: dashboard_indicadoresGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, dashboard_indicadoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDashboard_indicadoresGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the dashboard_indicadores model
     */
    readonly fields: dashboard_indicadoresFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for dashboard_indicadores.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__dashboard_indicadoresClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    dashboards<T extends Prisma.dashboardsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.dashboardsDefaultArgs<ExtArgs>>): Prisma.Prisma__dashboardsClient<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    indicadores<T extends Prisma.indicadoresDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.indicadoresDefaultArgs<ExtArgs>>): Prisma.Prisma__indicadoresClient<runtime.Types.Result.GetResult<Prisma.$indicadoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the dashboard_indicadores model
 */
export interface dashboard_indicadoresFieldRefs {
    readonly id: Prisma.FieldRef<"dashboard_indicadores", 'Int'>;
    readonly id_dashboard: Prisma.FieldRef<"dashboard_indicadores", 'Int'>;
    readonly id_indicador: Prisma.FieldRef<"dashboard_indicadores", 'Int'>;
    readonly posicion: Prisma.FieldRef<"dashboard_indicadores", 'Int'>;
}
/**
 * dashboard_indicadores findUnique
 */
export type dashboard_indicadoresFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which dashboard_indicadores to fetch.
     */
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
};
/**
 * dashboard_indicadores findUniqueOrThrow
 */
export type dashboard_indicadoresFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which dashboard_indicadores to fetch.
     */
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
};
/**
 * dashboard_indicadores findFirst
 */
export type dashboard_indicadoresFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which dashboard_indicadores to fetch.
     */
    where?: Prisma.dashboard_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of dashboard_indicadores to fetch.
     */
    orderBy?: Prisma.dashboard_indicadoresOrderByWithRelationInput | Prisma.dashboard_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for dashboard_indicadores.
     */
    cursor?: Prisma.dashboard_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` dashboard_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` dashboard_indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of dashboard_indicadores.
     */
    distinct?: Prisma.Dashboard_indicadoresScalarFieldEnum | Prisma.Dashboard_indicadoresScalarFieldEnum[];
};
/**
 * dashboard_indicadores findFirstOrThrow
 */
export type dashboard_indicadoresFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which dashboard_indicadores to fetch.
     */
    where?: Prisma.dashboard_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of dashboard_indicadores to fetch.
     */
    orderBy?: Prisma.dashboard_indicadoresOrderByWithRelationInput | Prisma.dashboard_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for dashboard_indicadores.
     */
    cursor?: Prisma.dashboard_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` dashboard_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` dashboard_indicadores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of dashboard_indicadores.
     */
    distinct?: Prisma.Dashboard_indicadoresScalarFieldEnum | Prisma.Dashboard_indicadoresScalarFieldEnum[];
};
/**
 * dashboard_indicadores findMany
 */
export type dashboard_indicadoresFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which dashboard_indicadores to fetch.
     */
    where?: Prisma.dashboard_indicadoresWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of dashboard_indicadores to fetch.
     */
    orderBy?: Prisma.dashboard_indicadoresOrderByWithRelationInput | Prisma.dashboard_indicadoresOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing dashboard_indicadores.
     */
    cursor?: Prisma.dashboard_indicadoresWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` dashboard_indicadores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` dashboard_indicadores.
     */
    skip?: number;
    distinct?: Prisma.Dashboard_indicadoresScalarFieldEnum | Prisma.Dashboard_indicadoresScalarFieldEnum[];
};
/**
 * dashboard_indicadores create
 */
export type dashboard_indicadoresCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a dashboard_indicadores.
     */
    data: Prisma.XOR<Prisma.dashboard_indicadoresCreateInput, Prisma.dashboard_indicadoresUncheckedCreateInput>;
};
/**
 * dashboard_indicadores createMany
 */
export type dashboard_indicadoresCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many dashboard_indicadores.
     */
    data: Prisma.dashboard_indicadoresCreateManyInput | Prisma.dashboard_indicadoresCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * dashboard_indicadores createManyAndReturn
 */
export type dashboard_indicadoresCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_indicadores
     */
    select?: Prisma.dashboard_indicadoresSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboard_indicadores
     */
    omit?: Prisma.dashboard_indicadoresOmit<ExtArgs> | null;
    /**
     * The data used to create many dashboard_indicadores.
     */
    data: Prisma.dashboard_indicadoresCreateManyInput | Prisma.dashboard_indicadoresCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboard_indicadoresIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * dashboard_indicadores update
 */
export type dashboard_indicadoresUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a dashboard_indicadores.
     */
    data: Prisma.XOR<Prisma.dashboard_indicadoresUpdateInput, Prisma.dashboard_indicadoresUncheckedUpdateInput>;
    /**
     * Choose, which dashboard_indicadores to update.
     */
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
};
/**
 * dashboard_indicadores updateMany
 */
export type dashboard_indicadoresUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update dashboard_indicadores.
     */
    data: Prisma.XOR<Prisma.dashboard_indicadoresUpdateManyMutationInput, Prisma.dashboard_indicadoresUncheckedUpdateManyInput>;
    /**
     * Filter which dashboard_indicadores to update
     */
    where?: Prisma.dashboard_indicadoresWhereInput;
    /**
     * Limit how many dashboard_indicadores to update.
     */
    limit?: number;
};
/**
 * dashboard_indicadores updateManyAndReturn
 */
export type dashboard_indicadoresUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_indicadores
     */
    select?: Prisma.dashboard_indicadoresSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboard_indicadores
     */
    omit?: Prisma.dashboard_indicadoresOmit<ExtArgs> | null;
    /**
     * The data used to update dashboard_indicadores.
     */
    data: Prisma.XOR<Prisma.dashboard_indicadoresUpdateManyMutationInput, Prisma.dashboard_indicadoresUncheckedUpdateManyInput>;
    /**
     * Filter which dashboard_indicadores to update
     */
    where?: Prisma.dashboard_indicadoresWhereInput;
    /**
     * Limit how many dashboard_indicadores to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboard_indicadoresIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * dashboard_indicadores upsert
 */
export type dashboard_indicadoresUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the dashboard_indicadores to update in case it exists.
     */
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
    /**
     * In case the dashboard_indicadores found by the `where` argument doesn't exist, create a new dashboard_indicadores with this data.
     */
    create: Prisma.XOR<Prisma.dashboard_indicadoresCreateInput, Prisma.dashboard_indicadoresUncheckedCreateInput>;
    /**
     * In case the dashboard_indicadores was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.dashboard_indicadoresUpdateInput, Prisma.dashboard_indicadoresUncheckedUpdateInput>;
};
/**
 * dashboard_indicadores delete
 */
export type dashboard_indicadoresDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which dashboard_indicadores to delete.
     */
    where: Prisma.dashboard_indicadoresWhereUniqueInput;
};
/**
 * dashboard_indicadores deleteMany
 */
export type dashboard_indicadoresDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which dashboard_indicadores to delete
     */
    where?: Prisma.dashboard_indicadoresWhereInput;
    /**
     * Limit how many dashboard_indicadores to delete.
     */
    limit?: number;
};
/**
 * dashboard_indicadores without action
 */
export type dashboard_indicadoresDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=dashboard_indicadores.d.ts.map