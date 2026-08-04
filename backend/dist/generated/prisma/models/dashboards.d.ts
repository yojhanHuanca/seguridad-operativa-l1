import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model dashboards
 *
 */
export type dashboardsModel = runtime.Types.Result.DefaultSelection<Prisma.$dashboardsPayload>;
export type AggregateDashboards = {
    _count: DashboardsCountAggregateOutputType | null;
    _avg: DashboardsAvgAggregateOutputType | null;
    _sum: DashboardsSumAggregateOutputType | null;
    _min: DashboardsMinAggregateOutputType | null;
    _max: DashboardsMaxAggregateOutputType | null;
};
export type DashboardsAvgAggregateOutputType = {
    id_dashboard: number | null;
};
export type DashboardsSumAggregateOutputType = {
    id_dashboard: number | null;
};
export type DashboardsMinAggregateOutputType = {
    id_dashboard: number | null;
    nombre: string | null;
    descripcion: string | null;
    activo: boolean | null;
    created_at: Date | null;
};
export type DashboardsMaxAggregateOutputType = {
    id_dashboard: number | null;
    nombre: string | null;
    descripcion: string | null;
    activo: boolean | null;
    created_at: Date | null;
};
export type DashboardsCountAggregateOutputType = {
    id_dashboard: number;
    nombre: number;
    descripcion: number;
    activo: number;
    created_at: number;
    _all: number;
};
export type DashboardsAvgAggregateInputType = {
    id_dashboard?: true;
};
export type DashboardsSumAggregateInputType = {
    id_dashboard?: true;
};
export type DashboardsMinAggregateInputType = {
    id_dashboard?: true;
    nombre?: true;
    descripcion?: true;
    activo?: true;
    created_at?: true;
};
export type DashboardsMaxAggregateInputType = {
    id_dashboard?: true;
    nombre?: true;
    descripcion?: true;
    activo?: true;
    created_at?: true;
};
export type DashboardsCountAggregateInputType = {
    id_dashboard?: true;
    nombre?: true;
    descripcion?: true;
    activo?: true;
    created_at?: true;
    _all?: true;
};
export type DashboardsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which dashboards to aggregate.
     */
    where?: Prisma.dashboardsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of dashboards to fetch.
     */
    orderBy?: Prisma.dashboardsOrderByWithRelationInput | Prisma.dashboardsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.dashboardsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` dashboards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` dashboards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned dashboards
    **/
    _count?: true | DashboardsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DashboardsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DashboardsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DashboardsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DashboardsMaxAggregateInputType;
};
export type GetDashboardsAggregateType<T extends DashboardsAggregateArgs> = {
    [P in keyof T & keyof AggregateDashboards]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDashboards[P]> : Prisma.GetScalarType<T[P], AggregateDashboards[P]>;
};
export type dashboardsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.dashboardsWhereInput;
    orderBy?: Prisma.dashboardsOrderByWithAggregationInput | Prisma.dashboardsOrderByWithAggregationInput[];
    by: Prisma.DashboardsScalarFieldEnum[] | Prisma.DashboardsScalarFieldEnum;
    having?: Prisma.dashboardsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DashboardsCountAggregateInputType | true;
    _avg?: DashboardsAvgAggregateInputType;
    _sum?: DashboardsSumAggregateInputType;
    _min?: DashboardsMinAggregateInputType;
    _max?: DashboardsMaxAggregateInputType;
};
export type DashboardsGroupByOutputType = {
    id_dashboard: number;
    nombre: string;
    descripcion: string | null;
    activo: boolean | null;
    created_at: Date | null;
    _count: DashboardsCountAggregateOutputType | null;
    _avg: DashboardsAvgAggregateOutputType | null;
    _sum: DashboardsSumAggregateOutputType | null;
    _min: DashboardsMinAggregateOutputType | null;
    _max: DashboardsMaxAggregateOutputType | null;
};
type GetDashboardsGroupByPayload<T extends dashboardsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DashboardsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DashboardsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DashboardsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DashboardsGroupByOutputType[P]>;
}>>;
export type dashboardsWhereInput = {
    AND?: Prisma.dashboardsWhereInput | Prisma.dashboardsWhereInput[];
    OR?: Prisma.dashboardsWhereInput[];
    NOT?: Prisma.dashboardsWhereInput | Prisma.dashboardsWhereInput[];
    id_dashboard?: Prisma.IntFilter<"dashboards"> | number;
    nombre?: Prisma.StringFilter<"dashboards"> | string;
    descripcion?: Prisma.StringNullableFilter<"dashboards"> | string | null;
    activo?: Prisma.BoolNullableFilter<"dashboards"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"dashboards"> | Date | string | null;
    dashboard_indicadores?: Prisma.Dashboard_indicadoresListRelationFilter;
};
export type dashboardsOrderByWithRelationInput = {
    id_dashboard?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    activo?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    dashboard_indicadores?: Prisma.dashboard_indicadoresOrderByRelationAggregateInput;
};
export type dashboardsWhereUniqueInput = Prisma.AtLeast<{
    id_dashboard?: number;
    AND?: Prisma.dashboardsWhereInput | Prisma.dashboardsWhereInput[];
    OR?: Prisma.dashboardsWhereInput[];
    NOT?: Prisma.dashboardsWhereInput | Prisma.dashboardsWhereInput[];
    nombre?: Prisma.StringFilter<"dashboards"> | string;
    descripcion?: Prisma.StringNullableFilter<"dashboards"> | string | null;
    activo?: Prisma.BoolNullableFilter<"dashboards"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"dashboards"> | Date | string | null;
    dashboard_indicadores?: Prisma.Dashboard_indicadoresListRelationFilter;
}, "id_dashboard">;
export type dashboardsOrderByWithAggregationInput = {
    id_dashboard?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    activo?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.dashboardsCountOrderByAggregateInput;
    _avg?: Prisma.dashboardsAvgOrderByAggregateInput;
    _max?: Prisma.dashboardsMaxOrderByAggregateInput;
    _min?: Prisma.dashboardsMinOrderByAggregateInput;
    _sum?: Prisma.dashboardsSumOrderByAggregateInput;
};
export type dashboardsScalarWhereWithAggregatesInput = {
    AND?: Prisma.dashboardsScalarWhereWithAggregatesInput | Prisma.dashboardsScalarWhereWithAggregatesInput[];
    OR?: Prisma.dashboardsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.dashboardsScalarWhereWithAggregatesInput | Prisma.dashboardsScalarWhereWithAggregatesInput[];
    id_dashboard?: Prisma.IntWithAggregatesFilter<"dashboards"> | number;
    nombre?: Prisma.StringWithAggregatesFilter<"dashboards"> | string;
    descripcion?: Prisma.StringNullableWithAggregatesFilter<"dashboards"> | string | null;
    activo?: Prisma.BoolNullableWithAggregatesFilter<"dashboards"> | boolean | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"dashboards"> | Date | string | null;
};
export type dashboardsCreateInput = {
    nombre: string;
    descripcion?: string | null;
    activo?: boolean | null;
    created_at?: Date | string | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresCreateNestedManyWithoutDashboardsInput;
};
export type dashboardsUncheckedCreateInput = {
    id_dashboard?: number;
    nombre: string;
    descripcion?: string | null;
    activo?: boolean | null;
    created_at?: Date | string | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUncheckedCreateNestedManyWithoutDashboardsInput;
};
export type dashboardsUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUpdateManyWithoutDashboardsNestedInput;
};
export type dashboardsUncheckedUpdateInput = {
    id_dashboard?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dashboard_indicadores?: Prisma.dashboard_indicadoresUncheckedUpdateManyWithoutDashboardsNestedInput;
};
export type dashboardsCreateManyInput = {
    id_dashboard?: number;
    nombre: string;
    descripcion?: string | null;
    activo?: boolean | null;
    created_at?: Date | string | null;
};
export type dashboardsUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type dashboardsUncheckedUpdateManyInput = {
    id_dashboard?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type DashboardsScalarRelationFilter = {
    is?: Prisma.dashboardsWhereInput;
    isNot?: Prisma.dashboardsWhereInput;
};
export type dashboardsCountOrderByAggregateInput = {
    id_dashboard?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    activo?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type dashboardsAvgOrderByAggregateInput = {
    id_dashboard?: Prisma.SortOrder;
};
export type dashboardsMaxOrderByAggregateInput = {
    id_dashboard?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    activo?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type dashboardsMinOrderByAggregateInput = {
    id_dashboard?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    activo?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type dashboardsSumOrderByAggregateInput = {
    id_dashboard?: Prisma.SortOrder;
};
export type dashboardsCreateNestedOneWithoutDashboard_indicadoresInput = {
    create?: Prisma.XOR<Prisma.dashboardsCreateWithoutDashboard_indicadoresInput, Prisma.dashboardsUncheckedCreateWithoutDashboard_indicadoresInput>;
    connectOrCreate?: Prisma.dashboardsCreateOrConnectWithoutDashboard_indicadoresInput;
    connect?: Prisma.dashboardsWhereUniqueInput;
};
export type dashboardsUpdateOneRequiredWithoutDashboard_indicadoresNestedInput = {
    create?: Prisma.XOR<Prisma.dashboardsCreateWithoutDashboard_indicadoresInput, Prisma.dashboardsUncheckedCreateWithoutDashboard_indicadoresInput>;
    connectOrCreate?: Prisma.dashboardsCreateOrConnectWithoutDashboard_indicadoresInput;
    upsert?: Prisma.dashboardsUpsertWithoutDashboard_indicadoresInput;
    connect?: Prisma.dashboardsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.dashboardsUpdateToOneWithWhereWithoutDashboard_indicadoresInput, Prisma.dashboardsUpdateWithoutDashboard_indicadoresInput>, Prisma.dashboardsUncheckedUpdateWithoutDashboard_indicadoresInput>;
};
export type dashboardsCreateWithoutDashboard_indicadoresInput = {
    nombre: string;
    descripcion?: string | null;
    activo?: boolean | null;
    created_at?: Date | string | null;
};
export type dashboardsUncheckedCreateWithoutDashboard_indicadoresInput = {
    id_dashboard?: number;
    nombre: string;
    descripcion?: string | null;
    activo?: boolean | null;
    created_at?: Date | string | null;
};
export type dashboardsCreateOrConnectWithoutDashboard_indicadoresInput = {
    where: Prisma.dashboardsWhereUniqueInput;
    create: Prisma.XOR<Prisma.dashboardsCreateWithoutDashboard_indicadoresInput, Prisma.dashboardsUncheckedCreateWithoutDashboard_indicadoresInput>;
};
export type dashboardsUpsertWithoutDashboard_indicadoresInput = {
    update: Prisma.XOR<Prisma.dashboardsUpdateWithoutDashboard_indicadoresInput, Prisma.dashboardsUncheckedUpdateWithoutDashboard_indicadoresInput>;
    create: Prisma.XOR<Prisma.dashboardsCreateWithoutDashboard_indicadoresInput, Prisma.dashboardsUncheckedCreateWithoutDashboard_indicadoresInput>;
    where?: Prisma.dashboardsWhereInput;
};
export type dashboardsUpdateToOneWithWhereWithoutDashboard_indicadoresInput = {
    where?: Prisma.dashboardsWhereInput;
    data: Prisma.XOR<Prisma.dashboardsUpdateWithoutDashboard_indicadoresInput, Prisma.dashboardsUncheckedUpdateWithoutDashboard_indicadoresInput>;
};
export type dashboardsUpdateWithoutDashboard_indicadoresInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type dashboardsUncheckedUpdateWithoutDashboard_indicadoresInput = {
    id_dashboard?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type DashboardsCountOutputType
 */
export type DashboardsCountOutputType = {
    dashboard_indicadores: number;
};
export type DashboardsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dashboard_indicadores?: boolean | DashboardsCountOutputTypeCountDashboard_indicadoresArgs;
};
/**
 * DashboardsCountOutputType without action
 */
export type DashboardsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardsCountOutputType
     */
    select?: Prisma.DashboardsCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * DashboardsCountOutputType without action
 */
export type DashboardsCountOutputTypeCountDashboard_indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.dashboard_indicadoresWhereInput;
};
export type dashboardsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_dashboard?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    activo?: boolean;
    created_at?: boolean;
    dashboard_indicadores?: boolean | Prisma.dashboards$dashboard_indicadoresArgs<ExtArgs>;
    _count?: boolean | Prisma.DashboardsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["dashboards"]>;
export type dashboardsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_dashboard?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    activo?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["dashboards"]>;
export type dashboardsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_dashboard?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    activo?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["dashboards"]>;
export type dashboardsSelectScalar = {
    id_dashboard?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    activo?: boolean;
    created_at?: boolean;
};
export type dashboardsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_dashboard" | "nombre" | "descripcion" | "activo" | "created_at", ExtArgs["result"]["dashboards"]>;
export type dashboardsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dashboard_indicadores?: boolean | Prisma.dashboards$dashboard_indicadoresArgs<ExtArgs>;
    _count?: boolean | Prisma.DashboardsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type dashboardsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type dashboardsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $dashboardsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "dashboards";
    objects: {
        dashboard_indicadores: Prisma.$dashboard_indicadoresPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_dashboard: number;
        nombre: string;
        descripcion: string | null;
        activo: boolean | null;
        created_at: Date | null;
    }, ExtArgs["result"]["dashboards"]>;
    composites: {};
};
export type dashboardsGetPayload<S extends boolean | null | undefined | dashboardsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$dashboardsPayload, S>;
export type dashboardsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<dashboardsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DashboardsCountAggregateInputType | true;
};
export interface dashboardsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['dashboards'];
        meta: {
            name: 'dashboards';
        };
    };
    /**
     * Find zero or one Dashboards that matches the filter.
     * @param {dashboardsFindUniqueArgs} args - Arguments to find a Dashboards
     * @example
     * // Get one Dashboards
     * const dashboards = await prisma.dashboards.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends dashboardsFindUniqueArgs>(args: Prisma.SelectSubset<T, dashboardsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__dashboardsClient<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Dashboards that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {dashboardsFindUniqueOrThrowArgs} args - Arguments to find a Dashboards
     * @example
     * // Get one Dashboards
     * const dashboards = await prisma.dashboards.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends dashboardsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, dashboardsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__dashboardsClient<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Dashboards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboardsFindFirstArgs} args - Arguments to find a Dashboards
     * @example
     * // Get one Dashboards
     * const dashboards = await prisma.dashboards.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends dashboardsFindFirstArgs>(args?: Prisma.SelectSubset<T, dashboardsFindFirstArgs<ExtArgs>>): Prisma.Prisma__dashboardsClient<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Dashboards that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboardsFindFirstOrThrowArgs} args - Arguments to find a Dashboards
     * @example
     * // Get one Dashboards
     * const dashboards = await prisma.dashboards.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends dashboardsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, dashboardsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__dashboardsClient<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Dashboards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboardsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dashboards
     * const dashboards = await prisma.dashboards.findMany()
     *
     * // Get first 10 Dashboards
     * const dashboards = await prisma.dashboards.findMany({ take: 10 })
     *
     * // Only select the `id_dashboard`
     * const dashboardsWithId_dashboardOnly = await prisma.dashboards.findMany({ select: { id_dashboard: true } })
     *
     */
    findMany<T extends dashboardsFindManyArgs>(args?: Prisma.SelectSubset<T, dashboardsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Dashboards.
     * @param {dashboardsCreateArgs} args - Arguments to create a Dashboards.
     * @example
     * // Create one Dashboards
     * const Dashboards = await prisma.dashboards.create({
     *   data: {
     *     // ... data to create a Dashboards
     *   }
     * })
     *
     */
    create<T extends dashboardsCreateArgs>(args: Prisma.SelectSubset<T, dashboardsCreateArgs<ExtArgs>>): Prisma.Prisma__dashboardsClient<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Dashboards.
     * @param {dashboardsCreateManyArgs} args - Arguments to create many Dashboards.
     * @example
     * // Create many Dashboards
     * const dashboards = await prisma.dashboards.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends dashboardsCreateManyArgs>(args?: Prisma.SelectSubset<T, dashboardsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Dashboards and returns the data saved in the database.
     * @param {dashboardsCreateManyAndReturnArgs} args - Arguments to create many Dashboards.
     * @example
     * // Create many Dashboards
     * const dashboards = await prisma.dashboards.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Dashboards and only return the `id_dashboard`
     * const dashboardsWithId_dashboardOnly = await prisma.dashboards.createManyAndReturn({
     *   select: { id_dashboard: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends dashboardsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, dashboardsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Dashboards.
     * @param {dashboardsDeleteArgs} args - Arguments to delete one Dashboards.
     * @example
     * // Delete one Dashboards
     * const Dashboards = await prisma.dashboards.delete({
     *   where: {
     *     // ... filter to delete one Dashboards
     *   }
     * })
     *
     */
    delete<T extends dashboardsDeleteArgs>(args: Prisma.SelectSubset<T, dashboardsDeleteArgs<ExtArgs>>): Prisma.Prisma__dashboardsClient<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Dashboards.
     * @param {dashboardsUpdateArgs} args - Arguments to update one Dashboards.
     * @example
     * // Update one Dashboards
     * const dashboards = await prisma.dashboards.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends dashboardsUpdateArgs>(args: Prisma.SelectSubset<T, dashboardsUpdateArgs<ExtArgs>>): Prisma.Prisma__dashboardsClient<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Dashboards.
     * @param {dashboardsDeleteManyArgs} args - Arguments to filter Dashboards to delete.
     * @example
     * // Delete a few Dashboards
     * const { count } = await prisma.dashboards.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends dashboardsDeleteManyArgs>(args?: Prisma.SelectSubset<T, dashboardsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Dashboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboardsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dashboards
     * const dashboards = await prisma.dashboards.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends dashboardsUpdateManyArgs>(args: Prisma.SelectSubset<T, dashboardsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Dashboards and returns the data updated in the database.
     * @param {dashboardsUpdateManyAndReturnArgs} args - Arguments to update many Dashboards.
     * @example
     * // Update many Dashboards
     * const dashboards = await prisma.dashboards.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Dashboards and only return the `id_dashboard`
     * const dashboardsWithId_dashboardOnly = await prisma.dashboards.updateManyAndReturn({
     *   select: { id_dashboard: true },
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
    updateManyAndReturn<T extends dashboardsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, dashboardsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Dashboards.
     * @param {dashboardsUpsertArgs} args - Arguments to update or create a Dashboards.
     * @example
     * // Update or create a Dashboards
     * const dashboards = await prisma.dashboards.upsert({
     *   create: {
     *     // ... data to create a Dashboards
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dashboards we want to update
     *   }
     * })
     */
    upsert<T extends dashboardsUpsertArgs>(args: Prisma.SelectSubset<T, dashboardsUpsertArgs<ExtArgs>>): Prisma.Prisma__dashboardsClient<runtime.Types.Result.GetResult<Prisma.$dashboardsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Dashboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboardsCountArgs} args - Arguments to filter Dashboards to count.
     * @example
     * // Count the number of Dashboards
     * const count = await prisma.dashboards.count({
     *   where: {
     *     // ... the filter for the Dashboards we want to count
     *   }
     * })
    **/
    count<T extends dashboardsCountArgs>(args?: Prisma.Subset<T, dashboardsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DashboardsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Dashboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DashboardsAggregateArgs>(args: Prisma.Subset<T, DashboardsAggregateArgs>): Prisma.PrismaPromise<GetDashboardsAggregateType<T>>;
    /**
     * Group by Dashboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboardsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends dashboardsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: dashboardsGroupByArgs['orderBy'];
    } : {
        orderBy?: dashboardsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, dashboardsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDashboardsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the dashboards model
     */
    readonly fields: dashboardsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for dashboards.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__dashboardsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    dashboard_indicadores<T extends Prisma.dashboards$dashboard_indicadoresArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.dashboards$dashboard_indicadoresArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$dashboard_indicadoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the dashboards model
 */
export interface dashboardsFieldRefs {
    readonly id_dashboard: Prisma.FieldRef<"dashboards", 'Int'>;
    readonly nombre: Prisma.FieldRef<"dashboards", 'String'>;
    readonly descripcion: Prisma.FieldRef<"dashboards", 'String'>;
    readonly activo: Prisma.FieldRef<"dashboards", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"dashboards", 'DateTime'>;
}
/**
 * dashboards findUnique
 */
export type dashboardsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
    /**
     * Filter, which dashboards to fetch.
     */
    where: Prisma.dashboardsWhereUniqueInput;
};
/**
 * dashboards findUniqueOrThrow
 */
export type dashboardsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
    /**
     * Filter, which dashboards to fetch.
     */
    where: Prisma.dashboardsWhereUniqueInput;
};
/**
 * dashboards findFirst
 */
export type dashboardsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
    /**
     * Filter, which dashboards to fetch.
     */
    where?: Prisma.dashboardsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of dashboards to fetch.
     */
    orderBy?: Prisma.dashboardsOrderByWithRelationInput | Prisma.dashboardsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for dashboards.
     */
    cursor?: Prisma.dashboardsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` dashboards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` dashboards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of dashboards.
     */
    distinct?: Prisma.DashboardsScalarFieldEnum | Prisma.DashboardsScalarFieldEnum[];
};
/**
 * dashboards findFirstOrThrow
 */
export type dashboardsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
    /**
     * Filter, which dashboards to fetch.
     */
    where?: Prisma.dashboardsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of dashboards to fetch.
     */
    orderBy?: Prisma.dashboardsOrderByWithRelationInput | Prisma.dashboardsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for dashboards.
     */
    cursor?: Prisma.dashboardsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` dashboards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` dashboards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of dashboards.
     */
    distinct?: Prisma.DashboardsScalarFieldEnum | Prisma.DashboardsScalarFieldEnum[];
};
/**
 * dashboards findMany
 */
export type dashboardsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
    /**
     * Filter, which dashboards to fetch.
     */
    where?: Prisma.dashboardsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of dashboards to fetch.
     */
    orderBy?: Prisma.dashboardsOrderByWithRelationInput | Prisma.dashboardsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing dashboards.
     */
    cursor?: Prisma.dashboardsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` dashboards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` dashboards.
     */
    skip?: number;
    distinct?: Prisma.DashboardsScalarFieldEnum | Prisma.DashboardsScalarFieldEnum[];
};
/**
 * dashboards create
 */
export type dashboardsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
    /**
     * The data needed to create a dashboards.
     */
    data: Prisma.XOR<Prisma.dashboardsCreateInput, Prisma.dashboardsUncheckedCreateInput>;
};
/**
 * dashboards createMany
 */
export type dashboardsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many dashboards.
     */
    data: Prisma.dashboardsCreateManyInput | Prisma.dashboardsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * dashboards createManyAndReturn
 */
export type dashboardsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * The data used to create many dashboards.
     */
    data: Prisma.dashboardsCreateManyInput | Prisma.dashboardsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * dashboards update
 */
export type dashboardsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
    /**
     * The data needed to update a dashboards.
     */
    data: Prisma.XOR<Prisma.dashboardsUpdateInput, Prisma.dashboardsUncheckedUpdateInput>;
    /**
     * Choose, which dashboards to update.
     */
    where: Prisma.dashboardsWhereUniqueInput;
};
/**
 * dashboards updateMany
 */
export type dashboardsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update dashboards.
     */
    data: Prisma.XOR<Prisma.dashboardsUpdateManyMutationInput, Prisma.dashboardsUncheckedUpdateManyInput>;
    /**
     * Filter which dashboards to update
     */
    where?: Prisma.dashboardsWhereInput;
    /**
     * Limit how many dashboards to update.
     */
    limit?: number;
};
/**
 * dashboards updateManyAndReturn
 */
export type dashboardsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * The data used to update dashboards.
     */
    data: Prisma.XOR<Prisma.dashboardsUpdateManyMutationInput, Prisma.dashboardsUncheckedUpdateManyInput>;
    /**
     * Filter which dashboards to update
     */
    where?: Prisma.dashboardsWhereInput;
    /**
     * Limit how many dashboards to update.
     */
    limit?: number;
};
/**
 * dashboards upsert
 */
export type dashboardsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
    /**
     * The filter to search for the dashboards to update in case it exists.
     */
    where: Prisma.dashboardsWhereUniqueInput;
    /**
     * In case the dashboards found by the `where` argument doesn't exist, create a new dashboards with this data.
     */
    create: Prisma.XOR<Prisma.dashboardsCreateInput, Prisma.dashboardsUncheckedCreateInput>;
    /**
     * In case the dashboards was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.dashboardsUpdateInput, Prisma.dashboardsUncheckedUpdateInput>;
};
/**
 * dashboards delete
 */
export type dashboardsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
    /**
     * Filter which dashboards to delete.
     */
    where: Prisma.dashboardsWhereUniqueInput;
};
/**
 * dashboards deleteMany
 */
export type dashboardsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which dashboards to delete
     */
    where?: Prisma.dashboardsWhereInput;
    /**
     * Limit how many dashboards to delete.
     */
    limit?: number;
};
/**
 * dashboards.dashboard_indicadores
 */
export type dashboards$dashboard_indicadoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * dashboards without action
 */
export type dashboardsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboards
     */
    select?: Prisma.dashboardsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the dashboards
     */
    omit?: Prisma.dashboardsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.dashboardsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=dashboards.d.ts.map