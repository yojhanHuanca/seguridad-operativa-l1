import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model catalogos
 *
 */
export type catalogosModel = runtime.Types.Result.DefaultSelection<Prisma.$catalogosPayload>;
export type AggregateCatalogos = {
    _count: CatalogosCountAggregateOutputType | null;
    _avg: CatalogosAvgAggregateOutputType | null;
    _sum: CatalogosSumAggregateOutputType | null;
    _min: CatalogosMinAggregateOutputType | null;
    _max: CatalogosMaxAggregateOutputType | null;
};
export type CatalogosAvgAggregateOutputType = {
    id_catalogo: number | null;
};
export type CatalogosSumAggregateOutputType = {
    id_catalogo: number | null;
};
export type CatalogosMinAggregateOutputType = {
    id_catalogo: number | null;
    codigo: string | null;
    nombre: string | null;
    descripcion: string | null;
    estado: boolean | null;
    created_at: Date | null;
};
export type CatalogosMaxAggregateOutputType = {
    id_catalogo: number | null;
    codigo: string | null;
    nombre: string | null;
    descripcion: string | null;
    estado: boolean | null;
    created_at: Date | null;
};
export type CatalogosCountAggregateOutputType = {
    id_catalogo: number;
    codigo: number;
    nombre: number;
    descripcion: number;
    estado: number;
    created_at: number;
    _all: number;
};
export type CatalogosAvgAggregateInputType = {
    id_catalogo?: true;
};
export type CatalogosSumAggregateInputType = {
    id_catalogo?: true;
};
export type CatalogosMinAggregateInputType = {
    id_catalogo?: true;
    codigo?: true;
    nombre?: true;
    descripcion?: true;
    estado?: true;
    created_at?: true;
};
export type CatalogosMaxAggregateInputType = {
    id_catalogo?: true;
    codigo?: true;
    nombre?: true;
    descripcion?: true;
    estado?: true;
    created_at?: true;
};
export type CatalogosCountAggregateInputType = {
    id_catalogo?: true;
    codigo?: true;
    nombre?: true;
    descripcion?: true;
    estado?: true;
    created_at?: true;
    _all?: true;
};
export type CatalogosAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which catalogos to aggregate.
     */
    where?: Prisma.catalogosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of catalogos to fetch.
     */
    orderBy?: Prisma.catalogosOrderByWithRelationInput | Prisma.catalogosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.catalogosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` catalogos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` catalogos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned catalogos
    **/
    _count?: true | CatalogosCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: CatalogosAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: CatalogosSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CatalogosMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CatalogosMaxAggregateInputType;
};
export type GetCatalogosAggregateType<T extends CatalogosAggregateArgs> = {
    [P in keyof T & keyof AggregateCatalogos]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCatalogos[P]> : Prisma.GetScalarType<T[P], AggregateCatalogos[P]>;
};
export type catalogosGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.catalogosWhereInput;
    orderBy?: Prisma.catalogosOrderByWithAggregationInput | Prisma.catalogosOrderByWithAggregationInput[];
    by: Prisma.CatalogosScalarFieldEnum[] | Prisma.CatalogosScalarFieldEnum;
    having?: Prisma.catalogosScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CatalogosCountAggregateInputType | true;
    _avg?: CatalogosAvgAggregateInputType;
    _sum?: CatalogosSumAggregateInputType;
    _min?: CatalogosMinAggregateInputType;
    _max?: CatalogosMaxAggregateInputType;
};
export type CatalogosGroupByOutputType = {
    id_catalogo: number;
    codigo: string;
    nombre: string;
    descripcion: string | null;
    estado: boolean | null;
    created_at: Date | null;
    _count: CatalogosCountAggregateOutputType | null;
    _avg: CatalogosAvgAggregateOutputType | null;
    _sum: CatalogosSumAggregateOutputType | null;
    _min: CatalogosMinAggregateOutputType | null;
    _max: CatalogosMaxAggregateOutputType | null;
};
type GetCatalogosGroupByPayload<T extends catalogosGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CatalogosGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CatalogosGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CatalogosGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CatalogosGroupByOutputType[P]>;
}>>;
export type catalogosWhereInput = {
    AND?: Prisma.catalogosWhereInput | Prisma.catalogosWhereInput[];
    OR?: Prisma.catalogosWhereInput[];
    NOT?: Prisma.catalogosWhereInput | Prisma.catalogosWhereInput[];
    id_catalogo?: Prisma.IntFilter<"catalogos"> | number;
    codigo?: Prisma.StringFilter<"catalogos"> | string;
    nombre?: Prisma.StringFilter<"catalogos"> | string;
    descripcion?: Prisma.StringNullableFilter<"catalogos"> | string | null;
    estado?: Prisma.BoolNullableFilter<"catalogos"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"catalogos"> | Date | string | null;
    catalogo_detalle?: Prisma.Catalogo_detalleListRelationFilter;
};
export type catalogosOrderByWithRelationInput = {
    id_catalogo?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    catalogo_detalle?: Prisma.catalogo_detalleOrderByRelationAggregateInput;
};
export type catalogosWhereUniqueInput = Prisma.AtLeast<{
    id_catalogo?: number;
    codigo?: string;
    nombre?: string;
    AND?: Prisma.catalogosWhereInput | Prisma.catalogosWhereInput[];
    OR?: Prisma.catalogosWhereInput[];
    NOT?: Prisma.catalogosWhereInput | Prisma.catalogosWhereInput[];
    descripcion?: Prisma.StringNullableFilter<"catalogos"> | string | null;
    estado?: Prisma.BoolNullableFilter<"catalogos"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"catalogos"> | Date | string | null;
    catalogo_detalle?: Prisma.Catalogo_detalleListRelationFilter;
}, "id_catalogo" | "codigo" | "nombre">;
export type catalogosOrderByWithAggregationInput = {
    id_catalogo?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.catalogosCountOrderByAggregateInput;
    _avg?: Prisma.catalogosAvgOrderByAggregateInput;
    _max?: Prisma.catalogosMaxOrderByAggregateInput;
    _min?: Prisma.catalogosMinOrderByAggregateInput;
    _sum?: Prisma.catalogosSumOrderByAggregateInput;
};
export type catalogosScalarWhereWithAggregatesInput = {
    AND?: Prisma.catalogosScalarWhereWithAggregatesInput | Prisma.catalogosScalarWhereWithAggregatesInput[];
    OR?: Prisma.catalogosScalarWhereWithAggregatesInput[];
    NOT?: Prisma.catalogosScalarWhereWithAggregatesInput | Prisma.catalogosScalarWhereWithAggregatesInput[];
    id_catalogo?: Prisma.IntWithAggregatesFilter<"catalogos"> | number;
    codigo?: Prisma.StringWithAggregatesFilter<"catalogos"> | string;
    nombre?: Prisma.StringWithAggregatesFilter<"catalogos"> | string;
    descripcion?: Prisma.StringNullableWithAggregatesFilter<"catalogos"> | string | null;
    estado?: Prisma.BoolNullableWithAggregatesFilter<"catalogos"> | boolean | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"catalogos"> | Date | string | null;
};
export type catalogosCreateInput = {
    codigo: string;
    nombre: string;
    descripcion?: string | null;
    estado?: boolean | null;
    created_at?: Date | string | null;
    catalogo_detalle?: Prisma.catalogo_detalleCreateNestedManyWithoutCatalogosInput;
};
export type catalogosUncheckedCreateInput = {
    id_catalogo?: number;
    codigo: string;
    nombre: string;
    descripcion?: string | null;
    estado?: boolean | null;
    created_at?: Date | string | null;
    catalogo_detalle?: Prisma.catalogo_detalleUncheckedCreateNestedManyWithoutCatalogosInput;
};
export type catalogosUpdateInput = {
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateManyWithoutCatalogosNestedInput;
};
export type catalogosUncheckedUpdateInput = {
    id_catalogo?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    catalogo_detalle?: Prisma.catalogo_detalleUncheckedUpdateManyWithoutCatalogosNestedInput;
};
export type catalogosCreateManyInput = {
    id_catalogo?: number;
    codigo: string;
    nombre: string;
    descripcion?: string | null;
    estado?: boolean | null;
    created_at?: Date | string | null;
};
export type catalogosUpdateManyMutationInput = {
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type catalogosUncheckedUpdateManyInput = {
    id_catalogo?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CatalogosScalarRelationFilter = {
    is?: Prisma.catalogosWhereInput;
    isNot?: Prisma.catalogosWhereInput;
};
export type catalogosCountOrderByAggregateInput = {
    id_catalogo?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type catalogosAvgOrderByAggregateInput = {
    id_catalogo?: Prisma.SortOrder;
};
export type catalogosMaxOrderByAggregateInput = {
    id_catalogo?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type catalogosMinOrderByAggregateInput = {
    id_catalogo?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type catalogosSumOrderByAggregateInput = {
    id_catalogo?: Prisma.SortOrder;
};
export type catalogosCreateNestedOneWithoutCatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.catalogosCreateWithoutCatalogo_detalleInput, Prisma.catalogosUncheckedCreateWithoutCatalogo_detalleInput>;
    connectOrCreate?: Prisma.catalogosCreateOrConnectWithoutCatalogo_detalleInput;
    connect?: Prisma.catalogosWhereUniqueInput;
};
export type catalogosUpdateOneRequiredWithoutCatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.catalogosCreateWithoutCatalogo_detalleInput, Prisma.catalogosUncheckedCreateWithoutCatalogo_detalleInput>;
    connectOrCreate?: Prisma.catalogosCreateOrConnectWithoutCatalogo_detalleInput;
    upsert?: Prisma.catalogosUpsertWithoutCatalogo_detalleInput;
    connect?: Prisma.catalogosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.catalogosUpdateToOneWithWhereWithoutCatalogo_detalleInput, Prisma.catalogosUpdateWithoutCatalogo_detalleInput>, Prisma.catalogosUncheckedUpdateWithoutCatalogo_detalleInput>;
};
export type catalogosCreateWithoutCatalogo_detalleInput = {
    codigo: string;
    nombre: string;
    descripcion?: string | null;
    estado?: boolean | null;
    created_at?: Date | string | null;
};
export type catalogosUncheckedCreateWithoutCatalogo_detalleInput = {
    id_catalogo?: number;
    codigo: string;
    nombre: string;
    descripcion?: string | null;
    estado?: boolean | null;
    created_at?: Date | string | null;
};
export type catalogosCreateOrConnectWithoutCatalogo_detalleInput = {
    where: Prisma.catalogosWhereUniqueInput;
    create: Prisma.XOR<Prisma.catalogosCreateWithoutCatalogo_detalleInput, Prisma.catalogosUncheckedCreateWithoutCatalogo_detalleInput>;
};
export type catalogosUpsertWithoutCatalogo_detalleInput = {
    update: Prisma.XOR<Prisma.catalogosUpdateWithoutCatalogo_detalleInput, Prisma.catalogosUncheckedUpdateWithoutCatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.catalogosCreateWithoutCatalogo_detalleInput, Prisma.catalogosUncheckedCreateWithoutCatalogo_detalleInput>;
    where?: Prisma.catalogosWhereInput;
};
export type catalogosUpdateToOneWithWhereWithoutCatalogo_detalleInput = {
    where?: Prisma.catalogosWhereInput;
    data: Prisma.XOR<Prisma.catalogosUpdateWithoutCatalogo_detalleInput, Prisma.catalogosUncheckedUpdateWithoutCatalogo_detalleInput>;
};
export type catalogosUpdateWithoutCatalogo_detalleInput = {
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type catalogosUncheckedUpdateWithoutCatalogo_detalleInput = {
    id_catalogo?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type CatalogosCountOutputType
 */
export type CatalogosCountOutputType = {
    catalogo_detalle: number;
};
export type CatalogosCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    catalogo_detalle?: boolean | CatalogosCountOutputTypeCountCatalogo_detalleArgs;
};
/**
 * CatalogosCountOutputType without action
 */
export type CatalogosCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogosCountOutputType
     */
    select?: Prisma.CatalogosCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * CatalogosCountOutputType without action
 */
export type CatalogosCountOutputTypeCountCatalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.catalogo_detalleWhereInput;
};
export type catalogosSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_catalogo?: boolean;
    codigo?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    estado?: boolean;
    created_at?: boolean;
    catalogo_detalle?: boolean | Prisma.catalogos$catalogo_detalleArgs<ExtArgs>;
    _count?: boolean | Prisma.CatalogosCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["catalogos"]>;
export type catalogosSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_catalogo?: boolean;
    codigo?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    estado?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["catalogos"]>;
export type catalogosSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_catalogo?: boolean;
    codigo?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    estado?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["catalogos"]>;
export type catalogosSelectScalar = {
    id_catalogo?: boolean;
    codigo?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    estado?: boolean;
    created_at?: boolean;
};
export type catalogosOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_catalogo" | "codigo" | "nombre" | "descripcion" | "estado" | "created_at", ExtArgs["result"]["catalogos"]>;
export type catalogosInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    catalogo_detalle?: boolean | Prisma.catalogos$catalogo_detalleArgs<ExtArgs>;
    _count?: boolean | Prisma.CatalogosCountOutputTypeDefaultArgs<ExtArgs>;
};
export type catalogosIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type catalogosIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $catalogosPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "catalogos";
    objects: {
        catalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_catalogo: number;
        codigo: string;
        nombre: string;
        descripcion: string | null;
        estado: boolean | null;
        created_at: Date | null;
    }, ExtArgs["result"]["catalogos"]>;
    composites: {};
};
export type catalogosGetPayload<S extends boolean | null | undefined | catalogosDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$catalogosPayload, S>;
export type catalogosCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<catalogosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CatalogosCountAggregateInputType | true;
};
export interface catalogosDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['catalogos'];
        meta: {
            name: 'catalogos';
        };
    };
    /**
     * Find zero or one Catalogos that matches the filter.
     * @param {catalogosFindUniqueArgs} args - Arguments to find a Catalogos
     * @example
     * // Get one Catalogos
     * const catalogos = await prisma.catalogos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends catalogosFindUniqueArgs>(args: Prisma.SelectSubset<T, catalogosFindUniqueArgs<ExtArgs>>): Prisma.Prisma__catalogosClient<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Catalogos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {catalogosFindUniqueOrThrowArgs} args - Arguments to find a Catalogos
     * @example
     * // Get one Catalogos
     * const catalogos = await prisma.catalogos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends catalogosFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, catalogosFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__catalogosClient<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Catalogos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {catalogosFindFirstArgs} args - Arguments to find a Catalogos
     * @example
     * // Get one Catalogos
     * const catalogos = await prisma.catalogos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends catalogosFindFirstArgs>(args?: Prisma.SelectSubset<T, catalogosFindFirstArgs<ExtArgs>>): Prisma.Prisma__catalogosClient<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Catalogos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {catalogosFindFirstOrThrowArgs} args - Arguments to find a Catalogos
     * @example
     * // Get one Catalogos
     * const catalogos = await prisma.catalogos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends catalogosFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, catalogosFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__catalogosClient<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Catalogos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {catalogosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Catalogos
     * const catalogos = await prisma.catalogos.findMany()
     *
     * // Get first 10 Catalogos
     * const catalogos = await prisma.catalogos.findMany({ take: 10 })
     *
     * // Only select the `id_catalogo`
     * const catalogosWithId_catalogoOnly = await prisma.catalogos.findMany({ select: { id_catalogo: true } })
     *
     */
    findMany<T extends catalogosFindManyArgs>(args?: Prisma.SelectSubset<T, catalogosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Catalogos.
     * @param {catalogosCreateArgs} args - Arguments to create a Catalogos.
     * @example
     * // Create one Catalogos
     * const Catalogos = await prisma.catalogos.create({
     *   data: {
     *     // ... data to create a Catalogos
     *   }
     * })
     *
     */
    create<T extends catalogosCreateArgs>(args: Prisma.SelectSubset<T, catalogosCreateArgs<ExtArgs>>): Prisma.Prisma__catalogosClient<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Catalogos.
     * @param {catalogosCreateManyArgs} args - Arguments to create many Catalogos.
     * @example
     * // Create many Catalogos
     * const catalogos = await prisma.catalogos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends catalogosCreateManyArgs>(args?: Prisma.SelectSubset<T, catalogosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Catalogos and returns the data saved in the database.
     * @param {catalogosCreateManyAndReturnArgs} args - Arguments to create many Catalogos.
     * @example
     * // Create many Catalogos
     * const catalogos = await prisma.catalogos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Catalogos and only return the `id_catalogo`
     * const catalogosWithId_catalogoOnly = await prisma.catalogos.createManyAndReturn({
     *   select: { id_catalogo: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends catalogosCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, catalogosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Catalogos.
     * @param {catalogosDeleteArgs} args - Arguments to delete one Catalogos.
     * @example
     * // Delete one Catalogos
     * const Catalogos = await prisma.catalogos.delete({
     *   where: {
     *     // ... filter to delete one Catalogos
     *   }
     * })
     *
     */
    delete<T extends catalogosDeleteArgs>(args: Prisma.SelectSubset<T, catalogosDeleteArgs<ExtArgs>>): Prisma.Prisma__catalogosClient<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Catalogos.
     * @param {catalogosUpdateArgs} args - Arguments to update one Catalogos.
     * @example
     * // Update one Catalogos
     * const catalogos = await prisma.catalogos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends catalogosUpdateArgs>(args: Prisma.SelectSubset<T, catalogosUpdateArgs<ExtArgs>>): Prisma.Prisma__catalogosClient<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Catalogos.
     * @param {catalogosDeleteManyArgs} args - Arguments to filter Catalogos to delete.
     * @example
     * // Delete a few Catalogos
     * const { count } = await prisma.catalogos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends catalogosDeleteManyArgs>(args?: Prisma.SelectSubset<T, catalogosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Catalogos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {catalogosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Catalogos
     * const catalogos = await prisma.catalogos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends catalogosUpdateManyArgs>(args: Prisma.SelectSubset<T, catalogosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Catalogos and returns the data updated in the database.
     * @param {catalogosUpdateManyAndReturnArgs} args - Arguments to update many Catalogos.
     * @example
     * // Update many Catalogos
     * const catalogos = await prisma.catalogos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Catalogos and only return the `id_catalogo`
     * const catalogosWithId_catalogoOnly = await prisma.catalogos.updateManyAndReturn({
     *   select: { id_catalogo: true },
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
    updateManyAndReturn<T extends catalogosUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, catalogosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Catalogos.
     * @param {catalogosUpsertArgs} args - Arguments to update or create a Catalogos.
     * @example
     * // Update or create a Catalogos
     * const catalogos = await prisma.catalogos.upsert({
     *   create: {
     *     // ... data to create a Catalogos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Catalogos we want to update
     *   }
     * })
     */
    upsert<T extends catalogosUpsertArgs>(args: Prisma.SelectSubset<T, catalogosUpsertArgs<ExtArgs>>): Prisma.Prisma__catalogosClient<runtime.Types.Result.GetResult<Prisma.$catalogosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Catalogos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {catalogosCountArgs} args - Arguments to filter Catalogos to count.
     * @example
     * // Count the number of Catalogos
     * const count = await prisma.catalogos.count({
     *   where: {
     *     // ... the filter for the Catalogos we want to count
     *   }
     * })
    **/
    count<T extends catalogosCountArgs>(args?: Prisma.Subset<T, catalogosCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CatalogosCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Catalogos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CatalogosAggregateArgs>(args: Prisma.Subset<T, CatalogosAggregateArgs>): Prisma.PrismaPromise<GetCatalogosAggregateType<T>>;
    /**
     * Group by Catalogos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {catalogosGroupByArgs} args - Group by arguments.
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
    groupBy<T extends catalogosGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: catalogosGroupByArgs['orderBy'];
    } : {
        orderBy?: catalogosGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, catalogosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCatalogosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the catalogos model
     */
    readonly fields: catalogosFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for catalogos.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__catalogosClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    catalogo_detalle<T extends Prisma.catalogos$catalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.catalogos$catalogo_detalleArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the catalogos model
 */
export interface catalogosFieldRefs {
    readonly id_catalogo: Prisma.FieldRef<"catalogos", 'Int'>;
    readonly codigo: Prisma.FieldRef<"catalogos", 'String'>;
    readonly nombre: Prisma.FieldRef<"catalogos", 'String'>;
    readonly descripcion: Prisma.FieldRef<"catalogos", 'String'>;
    readonly estado: Prisma.FieldRef<"catalogos", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"catalogos", 'DateTime'>;
}
/**
 * catalogos findUnique
 */
export type catalogosFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
    /**
     * Filter, which catalogos to fetch.
     */
    where: Prisma.catalogosWhereUniqueInput;
};
/**
 * catalogos findUniqueOrThrow
 */
export type catalogosFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
    /**
     * Filter, which catalogos to fetch.
     */
    where: Prisma.catalogosWhereUniqueInput;
};
/**
 * catalogos findFirst
 */
export type catalogosFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
    /**
     * Filter, which catalogos to fetch.
     */
    where?: Prisma.catalogosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of catalogos to fetch.
     */
    orderBy?: Prisma.catalogosOrderByWithRelationInput | Prisma.catalogosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for catalogos.
     */
    cursor?: Prisma.catalogosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` catalogos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` catalogos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of catalogos.
     */
    distinct?: Prisma.CatalogosScalarFieldEnum | Prisma.CatalogosScalarFieldEnum[];
};
/**
 * catalogos findFirstOrThrow
 */
export type catalogosFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
    /**
     * Filter, which catalogos to fetch.
     */
    where?: Prisma.catalogosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of catalogos to fetch.
     */
    orderBy?: Prisma.catalogosOrderByWithRelationInput | Prisma.catalogosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for catalogos.
     */
    cursor?: Prisma.catalogosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` catalogos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` catalogos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of catalogos.
     */
    distinct?: Prisma.CatalogosScalarFieldEnum | Prisma.CatalogosScalarFieldEnum[];
};
/**
 * catalogos findMany
 */
export type catalogosFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
    /**
     * Filter, which catalogos to fetch.
     */
    where?: Prisma.catalogosWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of catalogos to fetch.
     */
    orderBy?: Prisma.catalogosOrderByWithRelationInput | Prisma.catalogosOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing catalogos.
     */
    cursor?: Prisma.catalogosWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` catalogos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` catalogos.
     */
    skip?: number;
    distinct?: Prisma.CatalogosScalarFieldEnum | Prisma.CatalogosScalarFieldEnum[];
};
/**
 * catalogos create
 */
export type catalogosCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
    /**
     * The data needed to create a catalogos.
     */
    data: Prisma.XOR<Prisma.catalogosCreateInput, Prisma.catalogosUncheckedCreateInput>;
};
/**
 * catalogos createMany
 */
export type catalogosCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many catalogos.
     */
    data: Prisma.catalogosCreateManyInput | Prisma.catalogosCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * catalogos createManyAndReturn
 */
export type catalogosCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * The data used to create many catalogos.
     */
    data: Prisma.catalogosCreateManyInput | Prisma.catalogosCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * catalogos update
 */
export type catalogosUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
    /**
     * The data needed to update a catalogos.
     */
    data: Prisma.XOR<Prisma.catalogosUpdateInput, Prisma.catalogosUncheckedUpdateInput>;
    /**
     * Choose, which catalogos to update.
     */
    where: Prisma.catalogosWhereUniqueInput;
};
/**
 * catalogos updateMany
 */
export type catalogosUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update catalogos.
     */
    data: Prisma.XOR<Prisma.catalogosUpdateManyMutationInput, Prisma.catalogosUncheckedUpdateManyInput>;
    /**
     * Filter which catalogos to update
     */
    where?: Prisma.catalogosWhereInput;
    /**
     * Limit how many catalogos to update.
     */
    limit?: number;
};
/**
 * catalogos updateManyAndReturn
 */
export type catalogosUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * The data used to update catalogos.
     */
    data: Prisma.XOR<Prisma.catalogosUpdateManyMutationInput, Prisma.catalogosUncheckedUpdateManyInput>;
    /**
     * Filter which catalogos to update
     */
    where?: Prisma.catalogosWhereInput;
    /**
     * Limit how many catalogos to update.
     */
    limit?: number;
};
/**
 * catalogos upsert
 */
export type catalogosUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
    /**
     * The filter to search for the catalogos to update in case it exists.
     */
    where: Prisma.catalogosWhereUniqueInput;
    /**
     * In case the catalogos found by the `where` argument doesn't exist, create a new catalogos with this data.
     */
    create: Prisma.XOR<Prisma.catalogosCreateInput, Prisma.catalogosUncheckedCreateInput>;
    /**
     * In case the catalogos was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.catalogosUpdateInput, Prisma.catalogosUncheckedUpdateInput>;
};
/**
 * catalogos delete
 */
export type catalogosDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
    /**
     * Filter which catalogos to delete.
     */
    where: Prisma.catalogosWhereUniqueInput;
};
/**
 * catalogos deleteMany
 */
export type catalogosDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which catalogos to delete
     */
    where?: Prisma.catalogosWhereInput;
    /**
     * Limit how many catalogos to delete.
     */
    limit?: number;
};
/**
 * catalogos.catalogo_detalle
 */
export type catalogos$catalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogo_detalle
     */
    select?: Prisma.catalogo_detalleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogo_detalle
     */
    omit?: Prisma.catalogo_detalleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogo_detalleInclude<ExtArgs> | null;
    where?: Prisma.catalogo_detalleWhereInput;
    orderBy?: Prisma.catalogo_detalleOrderByWithRelationInput | Prisma.catalogo_detalleOrderByWithRelationInput[];
    cursor?: Prisma.catalogo_detalleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Catalogo_detalleScalarFieldEnum | Prisma.Catalogo_detalleScalarFieldEnum[];
};
/**
 * catalogos without action
 */
export type catalogosDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the catalogos
     */
    select?: Prisma.catalogosSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the catalogos
     */
    omit?: Prisma.catalogosOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.catalogosInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=catalogos.d.ts.map