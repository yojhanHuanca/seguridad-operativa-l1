import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model estaciones
 *
 */
export type estacionesModel = runtime.Types.Result.DefaultSelection<Prisma.$estacionesPayload>;
export type AggregateEstaciones = {
    _count: EstacionesCountAggregateOutputType | null;
    _avg: EstacionesAvgAggregateOutputType | null;
    _sum: EstacionesSumAggregateOutputType | null;
    _min: EstacionesMinAggregateOutputType | null;
    _max: EstacionesMaxAggregateOutputType | null;
};
export type EstacionesAvgAggregateOutputType = {
    id_estacion: number | null;
};
export type EstacionesSumAggregateOutputType = {
    id_estacion: number | null;
};
export type EstacionesMinAggregateOutputType = {
    id_estacion: number | null;
    nombre_estacion: string | null;
};
export type EstacionesMaxAggregateOutputType = {
    id_estacion: number | null;
    nombre_estacion: string | null;
};
export type EstacionesCountAggregateOutputType = {
    id_estacion: number;
    nombre_estacion: number;
    _all: number;
};
export type EstacionesAvgAggregateInputType = {
    id_estacion?: true;
};
export type EstacionesSumAggregateInputType = {
    id_estacion?: true;
};
export type EstacionesMinAggregateInputType = {
    id_estacion?: true;
    nombre_estacion?: true;
};
export type EstacionesMaxAggregateInputType = {
    id_estacion?: true;
    nombre_estacion?: true;
};
export type EstacionesCountAggregateInputType = {
    id_estacion?: true;
    nombre_estacion?: true;
    _all?: true;
};
export type EstacionesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which estaciones to aggregate.
     */
    where?: Prisma.estacionesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of estaciones to fetch.
     */
    orderBy?: Prisma.estacionesOrderByWithRelationInput | Prisma.estacionesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.estacionesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` estaciones from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` estaciones.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned estaciones
    **/
    _count?: true | EstacionesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: EstacionesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: EstacionesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EstacionesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EstacionesMaxAggregateInputType;
};
export type GetEstacionesAggregateType<T extends EstacionesAggregateArgs> = {
    [P in keyof T & keyof AggregateEstaciones]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEstaciones[P]> : Prisma.GetScalarType<T[P], AggregateEstaciones[P]>;
};
export type estacionesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.estacionesWhereInput;
    orderBy?: Prisma.estacionesOrderByWithAggregationInput | Prisma.estacionesOrderByWithAggregationInput[];
    by: Prisma.EstacionesScalarFieldEnum[] | Prisma.EstacionesScalarFieldEnum;
    having?: Prisma.estacionesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EstacionesCountAggregateInputType | true;
    _avg?: EstacionesAvgAggregateInputType;
    _sum?: EstacionesSumAggregateInputType;
    _min?: EstacionesMinAggregateInputType;
    _max?: EstacionesMaxAggregateInputType;
};
export type EstacionesGroupByOutputType = {
    id_estacion: number;
    nombre_estacion: string;
    _count: EstacionesCountAggregateOutputType | null;
    _avg: EstacionesAvgAggregateOutputType | null;
    _sum: EstacionesSumAggregateOutputType | null;
    _min: EstacionesMinAggregateOutputType | null;
    _max: EstacionesMaxAggregateOutputType | null;
};
type GetEstacionesGroupByPayload<T extends estacionesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EstacionesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EstacionesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EstacionesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EstacionesGroupByOutputType[P]>;
}>>;
export type estacionesWhereInput = {
    AND?: Prisma.estacionesWhereInput | Prisma.estacionesWhereInput[];
    OR?: Prisma.estacionesWhereInput[];
    NOT?: Prisma.estacionesWhereInput | Prisma.estacionesWhereInput[];
    id_estacion?: Prisma.IntFilter<"estaciones"> | number;
    nombre_estacion?: Prisma.StringFilter<"estaciones"> | string;
    incidencias?: Prisma.IncidenciasListRelationFilter;
};
export type estacionesOrderByWithRelationInput = {
    id_estacion?: Prisma.SortOrder;
    nombre_estacion?: Prisma.SortOrder;
    incidencias?: Prisma.incidenciasOrderByRelationAggregateInput;
};
export type estacionesWhereUniqueInput = Prisma.AtLeast<{
    id_estacion?: number;
    nombre_estacion?: string;
    AND?: Prisma.estacionesWhereInput | Prisma.estacionesWhereInput[];
    OR?: Prisma.estacionesWhereInput[];
    NOT?: Prisma.estacionesWhereInput | Prisma.estacionesWhereInput[];
    incidencias?: Prisma.IncidenciasListRelationFilter;
}, "id_estacion" | "nombre_estacion">;
export type estacionesOrderByWithAggregationInput = {
    id_estacion?: Prisma.SortOrder;
    nombre_estacion?: Prisma.SortOrder;
    _count?: Prisma.estacionesCountOrderByAggregateInput;
    _avg?: Prisma.estacionesAvgOrderByAggregateInput;
    _max?: Prisma.estacionesMaxOrderByAggregateInput;
    _min?: Prisma.estacionesMinOrderByAggregateInput;
    _sum?: Prisma.estacionesSumOrderByAggregateInput;
};
export type estacionesScalarWhereWithAggregatesInput = {
    AND?: Prisma.estacionesScalarWhereWithAggregatesInput | Prisma.estacionesScalarWhereWithAggregatesInput[];
    OR?: Prisma.estacionesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.estacionesScalarWhereWithAggregatesInput | Prisma.estacionesScalarWhereWithAggregatesInput[];
    id_estacion?: Prisma.IntWithAggregatesFilter<"estaciones"> | number;
    nombre_estacion?: Prisma.StringWithAggregatesFilter<"estaciones"> | string;
};
export type estacionesCreateInput = {
    nombre_estacion: string;
    incidencias?: Prisma.incidenciasCreateNestedManyWithoutEstacionesInput;
};
export type estacionesUncheckedCreateInput = {
    id_estacion?: number;
    nombre_estacion: string;
    incidencias?: Prisma.incidenciasUncheckedCreateNestedManyWithoutEstacionesInput;
};
export type estacionesUpdateInput = {
    nombre_estacion?: Prisma.StringFieldUpdateOperationsInput | string;
    incidencias?: Prisma.incidenciasUpdateManyWithoutEstacionesNestedInput;
};
export type estacionesUncheckedUpdateInput = {
    id_estacion?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_estacion?: Prisma.StringFieldUpdateOperationsInput | string;
    incidencias?: Prisma.incidenciasUncheckedUpdateManyWithoutEstacionesNestedInput;
};
export type estacionesCreateManyInput = {
    id_estacion?: number;
    nombre_estacion: string;
};
export type estacionesUpdateManyMutationInput = {
    nombre_estacion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type estacionesUncheckedUpdateManyInput = {
    id_estacion?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_estacion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type estacionesCountOrderByAggregateInput = {
    id_estacion?: Prisma.SortOrder;
    nombre_estacion?: Prisma.SortOrder;
};
export type estacionesAvgOrderByAggregateInput = {
    id_estacion?: Prisma.SortOrder;
};
export type estacionesMaxOrderByAggregateInput = {
    id_estacion?: Prisma.SortOrder;
    nombre_estacion?: Prisma.SortOrder;
};
export type estacionesMinOrderByAggregateInput = {
    id_estacion?: Prisma.SortOrder;
    nombre_estacion?: Prisma.SortOrder;
};
export type estacionesSumOrderByAggregateInput = {
    id_estacion?: Prisma.SortOrder;
};
export type EstacionesNullableScalarRelationFilter = {
    is?: Prisma.estacionesWhereInput | null;
    isNot?: Prisma.estacionesWhereInput | null;
};
export type estacionesCreateNestedOneWithoutIncidenciasInput = {
    create?: Prisma.XOR<Prisma.estacionesCreateWithoutIncidenciasInput, Prisma.estacionesUncheckedCreateWithoutIncidenciasInput>;
    connectOrCreate?: Prisma.estacionesCreateOrConnectWithoutIncidenciasInput;
    connect?: Prisma.estacionesWhereUniqueInput;
};
export type estacionesUpdateOneWithoutIncidenciasNestedInput = {
    create?: Prisma.XOR<Prisma.estacionesCreateWithoutIncidenciasInput, Prisma.estacionesUncheckedCreateWithoutIncidenciasInput>;
    connectOrCreate?: Prisma.estacionesCreateOrConnectWithoutIncidenciasInput;
    upsert?: Prisma.estacionesUpsertWithoutIncidenciasInput;
    disconnect?: Prisma.estacionesWhereInput | boolean;
    delete?: Prisma.estacionesWhereInput | boolean;
    connect?: Prisma.estacionesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.estacionesUpdateToOneWithWhereWithoutIncidenciasInput, Prisma.estacionesUpdateWithoutIncidenciasInput>, Prisma.estacionesUncheckedUpdateWithoutIncidenciasInput>;
};
export type estacionesCreateWithoutIncidenciasInput = {
    nombre_estacion: string;
};
export type estacionesUncheckedCreateWithoutIncidenciasInput = {
    id_estacion?: number;
    nombre_estacion: string;
};
export type estacionesCreateOrConnectWithoutIncidenciasInput = {
    where: Prisma.estacionesWhereUniqueInput;
    create: Prisma.XOR<Prisma.estacionesCreateWithoutIncidenciasInput, Prisma.estacionesUncheckedCreateWithoutIncidenciasInput>;
};
export type estacionesUpsertWithoutIncidenciasInput = {
    update: Prisma.XOR<Prisma.estacionesUpdateWithoutIncidenciasInput, Prisma.estacionesUncheckedUpdateWithoutIncidenciasInput>;
    create: Prisma.XOR<Prisma.estacionesCreateWithoutIncidenciasInput, Prisma.estacionesUncheckedCreateWithoutIncidenciasInput>;
    where?: Prisma.estacionesWhereInput;
};
export type estacionesUpdateToOneWithWhereWithoutIncidenciasInput = {
    where?: Prisma.estacionesWhereInput;
    data: Prisma.XOR<Prisma.estacionesUpdateWithoutIncidenciasInput, Prisma.estacionesUncheckedUpdateWithoutIncidenciasInput>;
};
export type estacionesUpdateWithoutIncidenciasInput = {
    nombre_estacion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type estacionesUncheckedUpdateWithoutIncidenciasInput = {
    id_estacion?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre_estacion?: Prisma.StringFieldUpdateOperationsInput | string;
};
/**
 * Count Type EstacionesCountOutputType
 */
export type EstacionesCountOutputType = {
    incidencias: number;
};
export type EstacionesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | EstacionesCountOutputTypeCountIncidenciasArgs;
};
/**
 * EstacionesCountOutputType without action
 */
export type EstacionesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EstacionesCountOutputType
     */
    select?: Prisma.EstacionesCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * EstacionesCountOutputType without action
 */
export type EstacionesCountOutputTypeCountIncidenciasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.incidenciasWhereInput;
};
export type estacionesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_estacion?: boolean;
    nombre_estacion?: boolean;
    incidencias?: boolean | Prisma.estaciones$incidenciasArgs<ExtArgs>;
    _count?: boolean | Prisma.EstacionesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["estaciones"]>;
export type estacionesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_estacion?: boolean;
    nombre_estacion?: boolean;
}, ExtArgs["result"]["estaciones"]>;
export type estacionesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_estacion?: boolean;
    nombre_estacion?: boolean;
}, ExtArgs["result"]["estaciones"]>;
export type estacionesSelectScalar = {
    id_estacion?: boolean;
    nombre_estacion?: boolean;
};
export type estacionesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_estacion" | "nombre_estacion", ExtArgs["result"]["estaciones"]>;
export type estacionesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.estaciones$incidenciasArgs<ExtArgs>;
    _count?: boolean | Prisma.EstacionesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type estacionesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type estacionesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $estacionesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "estaciones";
    objects: {
        incidencias: Prisma.$incidenciasPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_estacion: number;
        nombre_estacion: string;
    }, ExtArgs["result"]["estaciones"]>;
    composites: {};
};
export type estacionesGetPayload<S extends boolean | null | undefined | estacionesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$estacionesPayload, S>;
export type estacionesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<estacionesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EstacionesCountAggregateInputType | true;
};
export interface estacionesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['estaciones'];
        meta: {
            name: 'estaciones';
        };
    };
    /**
     * Find zero or one Estaciones that matches the filter.
     * @param {estacionesFindUniqueArgs} args - Arguments to find a Estaciones
     * @example
     * // Get one Estaciones
     * const estaciones = await prisma.estaciones.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends estacionesFindUniqueArgs>(args: Prisma.SelectSubset<T, estacionesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__estacionesClient<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Estaciones that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {estacionesFindUniqueOrThrowArgs} args - Arguments to find a Estaciones
     * @example
     * // Get one Estaciones
     * const estaciones = await prisma.estaciones.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends estacionesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, estacionesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__estacionesClient<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Estaciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estacionesFindFirstArgs} args - Arguments to find a Estaciones
     * @example
     * // Get one Estaciones
     * const estaciones = await prisma.estaciones.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends estacionesFindFirstArgs>(args?: Prisma.SelectSubset<T, estacionesFindFirstArgs<ExtArgs>>): Prisma.Prisma__estacionesClient<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Estaciones that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estacionesFindFirstOrThrowArgs} args - Arguments to find a Estaciones
     * @example
     * // Get one Estaciones
     * const estaciones = await prisma.estaciones.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends estacionesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, estacionesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__estacionesClient<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Estaciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estacionesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Estaciones
     * const estaciones = await prisma.estaciones.findMany()
     *
     * // Get first 10 Estaciones
     * const estaciones = await prisma.estaciones.findMany({ take: 10 })
     *
     * // Only select the `id_estacion`
     * const estacionesWithId_estacionOnly = await prisma.estaciones.findMany({ select: { id_estacion: true } })
     *
     */
    findMany<T extends estacionesFindManyArgs>(args?: Prisma.SelectSubset<T, estacionesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Estaciones.
     * @param {estacionesCreateArgs} args - Arguments to create a Estaciones.
     * @example
     * // Create one Estaciones
     * const Estaciones = await prisma.estaciones.create({
     *   data: {
     *     // ... data to create a Estaciones
     *   }
     * })
     *
     */
    create<T extends estacionesCreateArgs>(args: Prisma.SelectSubset<T, estacionesCreateArgs<ExtArgs>>): Prisma.Prisma__estacionesClient<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Estaciones.
     * @param {estacionesCreateManyArgs} args - Arguments to create many Estaciones.
     * @example
     * // Create many Estaciones
     * const estaciones = await prisma.estaciones.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends estacionesCreateManyArgs>(args?: Prisma.SelectSubset<T, estacionesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Estaciones and returns the data saved in the database.
     * @param {estacionesCreateManyAndReturnArgs} args - Arguments to create many Estaciones.
     * @example
     * // Create many Estaciones
     * const estaciones = await prisma.estaciones.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Estaciones and only return the `id_estacion`
     * const estacionesWithId_estacionOnly = await prisma.estaciones.createManyAndReturn({
     *   select: { id_estacion: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends estacionesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, estacionesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Estaciones.
     * @param {estacionesDeleteArgs} args - Arguments to delete one Estaciones.
     * @example
     * // Delete one Estaciones
     * const Estaciones = await prisma.estaciones.delete({
     *   where: {
     *     // ... filter to delete one Estaciones
     *   }
     * })
     *
     */
    delete<T extends estacionesDeleteArgs>(args: Prisma.SelectSubset<T, estacionesDeleteArgs<ExtArgs>>): Prisma.Prisma__estacionesClient<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Estaciones.
     * @param {estacionesUpdateArgs} args - Arguments to update one Estaciones.
     * @example
     * // Update one Estaciones
     * const estaciones = await prisma.estaciones.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends estacionesUpdateArgs>(args: Prisma.SelectSubset<T, estacionesUpdateArgs<ExtArgs>>): Prisma.Prisma__estacionesClient<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Estaciones.
     * @param {estacionesDeleteManyArgs} args - Arguments to filter Estaciones to delete.
     * @example
     * // Delete a few Estaciones
     * const { count } = await prisma.estaciones.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends estacionesDeleteManyArgs>(args?: Prisma.SelectSubset<T, estacionesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Estaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estacionesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Estaciones
     * const estaciones = await prisma.estaciones.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends estacionesUpdateManyArgs>(args: Prisma.SelectSubset<T, estacionesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Estaciones and returns the data updated in the database.
     * @param {estacionesUpdateManyAndReturnArgs} args - Arguments to update many Estaciones.
     * @example
     * // Update many Estaciones
     * const estaciones = await prisma.estaciones.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Estaciones and only return the `id_estacion`
     * const estacionesWithId_estacionOnly = await prisma.estaciones.updateManyAndReturn({
     *   select: { id_estacion: true },
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
    updateManyAndReturn<T extends estacionesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, estacionesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Estaciones.
     * @param {estacionesUpsertArgs} args - Arguments to update or create a Estaciones.
     * @example
     * // Update or create a Estaciones
     * const estaciones = await prisma.estaciones.upsert({
     *   create: {
     *     // ... data to create a Estaciones
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Estaciones we want to update
     *   }
     * })
     */
    upsert<T extends estacionesUpsertArgs>(args: Prisma.SelectSubset<T, estacionesUpsertArgs<ExtArgs>>): Prisma.Prisma__estacionesClient<runtime.Types.Result.GetResult<Prisma.$estacionesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Estaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estacionesCountArgs} args - Arguments to filter Estaciones to count.
     * @example
     * // Count the number of Estaciones
     * const count = await prisma.estaciones.count({
     *   where: {
     *     // ... the filter for the Estaciones we want to count
     *   }
     * })
    **/
    count<T extends estacionesCountArgs>(args?: Prisma.Subset<T, estacionesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EstacionesCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Estaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstacionesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EstacionesAggregateArgs>(args: Prisma.Subset<T, EstacionesAggregateArgs>): Prisma.PrismaPromise<GetEstacionesAggregateType<T>>;
    /**
     * Group by Estaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estacionesGroupByArgs} args - Group by arguments.
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
    groupBy<T extends estacionesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: estacionesGroupByArgs['orderBy'];
    } : {
        orderBy?: estacionesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, estacionesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEstacionesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the estaciones model
     */
    readonly fields: estacionesFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for estaciones.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__estacionesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    incidencias<T extends Prisma.estaciones$incidenciasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.estaciones$incidenciasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the estaciones model
 */
export interface estacionesFieldRefs {
    readonly id_estacion: Prisma.FieldRef<"estaciones", 'Int'>;
    readonly nombre_estacion: Prisma.FieldRef<"estaciones", 'String'>;
}
/**
 * estaciones findUnique
 */
export type estacionesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    /**
     * Filter, which estaciones to fetch.
     */
    where: Prisma.estacionesWhereUniqueInput;
};
/**
 * estaciones findUniqueOrThrow
 */
export type estacionesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    /**
     * Filter, which estaciones to fetch.
     */
    where: Prisma.estacionesWhereUniqueInput;
};
/**
 * estaciones findFirst
 */
export type estacionesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    /**
     * Filter, which estaciones to fetch.
     */
    where?: Prisma.estacionesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of estaciones to fetch.
     */
    orderBy?: Prisma.estacionesOrderByWithRelationInput | Prisma.estacionesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for estaciones.
     */
    cursor?: Prisma.estacionesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` estaciones from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` estaciones.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of estaciones.
     */
    distinct?: Prisma.EstacionesScalarFieldEnum | Prisma.EstacionesScalarFieldEnum[];
};
/**
 * estaciones findFirstOrThrow
 */
export type estacionesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    /**
     * Filter, which estaciones to fetch.
     */
    where?: Prisma.estacionesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of estaciones to fetch.
     */
    orderBy?: Prisma.estacionesOrderByWithRelationInput | Prisma.estacionesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for estaciones.
     */
    cursor?: Prisma.estacionesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` estaciones from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` estaciones.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of estaciones.
     */
    distinct?: Prisma.EstacionesScalarFieldEnum | Prisma.EstacionesScalarFieldEnum[];
};
/**
 * estaciones findMany
 */
export type estacionesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    /**
     * Filter, which estaciones to fetch.
     */
    where?: Prisma.estacionesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of estaciones to fetch.
     */
    orderBy?: Prisma.estacionesOrderByWithRelationInput | Prisma.estacionesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing estaciones.
     */
    cursor?: Prisma.estacionesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` estaciones from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` estaciones.
     */
    skip?: number;
    distinct?: Prisma.EstacionesScalarFieldEnum | Prisma.EstacionesScalarFieldEnum[];
};
/**
 * estaciones create
 */
export type estacionesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    /**
     * The data needed to create a estaciones.
     */
    data: Prisma.XOR<Prisma.estacionesCreateInput, Prisma.estacionesUncheckedCreateInput>;
};
/**
 * estaciones createMany
 */
export type estacionesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many estaciones.
     */
    data: Prisma.estacionesCreateManyInput | Prisma.estacionesCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * estaciones createManyAndReturn
 */
export type estacionesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * The data used to create many estaciones.
     */
    data: Prisma.estacionesCreateManyInput | Prisma.estacionesCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * estaciones update
 */
export type estacionesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    /**
     * The data needed to update a estaciones.
     */
    data: Prisma.XOR<Prisma.estacionesUpdateInput, Prisma.estacionesUncheckedUpdateInput>;
    /**
     * Choose, which estaciones to update.
     */
    where: Prisma.estacionesWhereUniqueInput;
};
/**
 * estaciones updateMany
 */
export type estacionesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update estaciones.
     */
    data: Prisma.XOR<Prisma.estacionesUpdateManyMutationInput, Prisma.estacionesUncheckedUpdateManyInput>;
    /**
     * Filter which estaciones to update
     */
    where?: Prisma.estacionesWhereInput;
    /**
     * Limit how many estaciones to update.
     */
    limit?: number;
};
/**
 * estaciones updateManyAndReturn
 */
export type estacionesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * The data used to update estaciones.
     */
    data: Prisma.XOR<Prisma.estacionesUpdateManyMutationInput, Prisma.estacionesUncheckedUpdateManyInput>;
    /**
     * Filter which estaciones to update
     */
    where?: Prisma.estacionesWhereInput;
    /**
     * Limit how many estaciones to update.
     */
    limit?: number;
};
/**
 * estaciones upsert
 */
export type estacionesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    /**
     * The filter to search for the estaciones to update in case it exists.
     */
    where: Prisma.estacionesWhereUniqueInput;
    /**
     * In case the estaciones found by the `where` argument doesn't exist, create a new estaciones with this data.
     */
    create: Prisma.XOR<Prisma.estacionesCreateInput, Prisma.estacionesUncheckedCreateInput>;
    /**
     * In case the estaciones was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.estacionesUpdateInput, Prisma.estacionesUncheckedUpdateInput>;
};
/**
 * estaciones delete
 */
export type estacionesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
    /**
     * Filter which estaciones to delete.
     */
    where: Prisma.estacionesWhereUniqueInput;
};
/**
 * estaciones deleteMany
 */
export type estacionesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which estaciones to delete
     */
    where?: Prisma.estacionesWhereInput;
    /**
     * Limit how many estaciones to delete.
     */
    limit?: number;
};
/**
 * estaciones.incidencias
 */
export type estaciones$incidenciasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    orderBy?: Prisma.incidenciasOrderByWithRelationInput | Prisma.incidenciasOrderByWithRelationInput[];
    cursor?: Prisma.incidenciasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IncidenciasScalarFieldEnum | Prisma.IncidenciasScalarFieldEnum[];
};
/**
 * estaciones without action
 */
export type estacionesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estaciones
     */
    select?: Prisma.estacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the estaciones
     */
    omit?: Prisma.estacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.estacionesInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=estaciones.d.ts.map