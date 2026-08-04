import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model planes_accion
 *
 */
export type planes_accionModel = runtime.Types.Result.DefaultSelection<Prisma.$planes_accionPayload>;
export type AggregatePlanes_accion = {
    _count: Planes_accionCountAggregateOutputType | null;
    _avg: Planes_accionAvgAggregateOutputType | null;
    _sum: Planes_accionSumAggregateOutputType | null;
    _min: Planes_accionMinAggregateOutputType | null;
    _max: Planes_accionMaxAggregateOutputType | null;
};
export type Planes_accionAvgAggregateOutputType = {
    id_plan: number | null;
    id_caso: number | null;
    id_area: number | null;
    responsable: number | null;
    estado: number | null;
    dias_abierto: number | null;
};
export type Planes_accionSumAggregateOutputType = {
    id_plan: number | null;
    id_caso: number | null;
    id_area: number | null;
    responsable: number | null;
    estado: number | null;
    dias_abierto: number | null;
};
export type Planes_accionMinAggregateOutputType = {
    id_plan: number | null;
    id_caso: number | null;
    codigo_plan: string | null;
    descripcion: string | null;
    id_area: number | null;
    responsable: number | null;
    estado: number | null;
    fecha_plan: Date | null;
    fecha_reprogramada: Date | null;
    dias_abierto: number | null;
    observaciones: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Planes_accionMaxAggregateOutputType = {
    id_plan: number | null;
    id_caso: number | null;
    codigo_plan: string | null;
    descripcion: string | null;
    id_area: number | null;
    responsable: number | null;
    estado: number | null;
    fecha_plan: Date | null;
    fecha_reprogramada: Date | null;
    dias_abierto: number | null;
    observaciones: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Planes_accionCountAggregateOutputType = {
    id_plan: number;
    id_caso: number;
    codigo_plan: number;
    descripcion: number;
    id_area: number;
    responsable: number;
    estado: number;
    fecha_plan: number;
    fecha_reprogramada: number;
    dias_abierto: number;
    observaciones: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Planes_accionAvgAggregateInputType = {
    id_plan?: true;
    id_caso?: true;
    id_area?: true;
    responsable?: true;
    estado?: true;
    dias_abierto?: true;
};
export type Planes_accionSumAggregateInputType = {
    id_plan?: true;
    id_caso?: true;
    id_area?: true;
    responsable?: true;
    estado?: true;
    dias_abierto?: true;
};
export type Planes_accionMinAggregateInputType = {
    id_plan?: true;
    id_caso?: true;
    codigo_plan?: true;
    descripcion?: true;
    id_area?: true;
    responsable?: true;
    estado?: true;
    fecha_plan?: true;
    fecha_reprogramada?: true;
    dias_abierto?: true;
    observaciones?: true;
    created_at?: true;
    updated_at?: true;
};
export type Planes_accionMaxAggregateInputType = {
    id_plan?: true;
    id_caso?: true;
    codigo_plan?: true;
    descripcion?: true;
    id_area?: true;
    responsable?: true;
    estado?: true;
    fecha_plan?: true;
    fecha_reprogramada?: true;
    dias_abierto?: true;
    observaciones?: true;
    created_at?: true;
    updated_at?: true;
};
export type Planes_accionCountAggregateInputType = {
    id_plan?: true;
    id_caso?: true;
    codigo_plan?: true;
    descripcion?: true;
    id_area?: true;
    responsable?: true;
    estado?: true;
    fecha_plan?: true;
    fecha_reprogramada?: true;
    dias_abierto?: true;
    observaciones?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Planes_accionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which planes_accion to aggregate.
     */
    where?: Prisma.planes_accionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of planes_accions to fetch.
     */
    orderBy?: Prisma.planes_accionOrderByWithRelationInput | Prisma.planes_accionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.planes_accionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` planes_accions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` planes_accions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned planes_accions
    **/
    _count?: true | Planes_accionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Planes_accionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Planes_accionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Planes_accionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Planes_accionMaxAggregateInputType;
};
export type GetPlanes_accionAggregateType<T extends Planes_accionAggregateArgs> = {
    [P in keyof T & keyof AggregatePlanes_accion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlanes_accion[P]> : Prisma.GetScalarType<T[P], AggregatePlanes_accion[P]>;
};
export type planes_accionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.planes_accionWhereInput;
    orderBy?: Prisma.planes_accionOrderByWithAggregationInput | Prisma.planes_accionOrderByWithAggregationInput[];
    by: Prisma.Planes_accionScalarFieldEnum[] | Prisma.Planes_accionScalarFieldEnum;
    having?: Prisma.planes_accionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Planes_accionCountAggregateInputType | true;
    _avg?: Planes_accionAvgAggregateInputType;
    _sum?: Planes_accionSumAggregateInputType;
    _min?: Planes_accionMinAggregateInputType;
    _max?: Planes_accionMaxAggregateInputType;
};
export type Planes_accionGroupByOutputType = {
    id_plan: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    responsable: number;
    estado: number;
    fecha_plan: Date;
    fecha_reprogramada: Date | null;
    dias_abierto: number | null;
    observaciones: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Planes_accionCountAggregateOutputType | null;
    _avg: Planes_accionAvgAggregateOutputType | null;
    _sum: Planes_accionSumAggregateOutputType | null;
    _min: Planes_accionMinAggregateOutputType | null;
    _max: Planes_accionMaxAggregateOutputType | null;
};
type GetPlanes_accionGroupByPayload<T extends planes_accionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Planes_accionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Planes_accionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Planes_accionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Planes_accionGroupByOutputType[P]>;
}>>;
export type planes_accionWhereInput = {
    AND?: Prisma.planes_accionWhereInput | Prisma.planes_accionWhereInput[];
    OR?: Prisma.planes_accionWhereInput[];
    NOT?: Prisma.planes_accionWhereInput | Prisma.planes_accionWhereInput[];
    id_plan?: Prisma.IntFilter<"planes_accion"> | number;
    id_caso?: Prisma.IntFilter<"planes_accion"> | number;
    codigo_plan?: Prisma.StringFilter<"planes_accion"> | string;
    descripcion?: Prisma.StringFilter<"planes_accion"> | string;
    id_area?: Prisma.IntFilter<"planes_accion"> | number;
    responsable?: Prisma.IntFilter<"planes_accion"> | number;
    estado?: Prisma.IntFilter<"planes_accion"> | number;
    fecha_plan?: Prisma.DateTimeFilter<"planes_accion"> | Date | string;
    fecha_reprogramada?: Prisma.DateTimeNullableFilter<"planes_accion"> | Date | string | null;
    dias_abierto?: Prisma.IntNullableFilter<"planes_accion"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"planes_accion"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"planes_accion"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"planes_accion"> | Date | string | null;
    actividades_plan?: Prisma.Actividades_planListRelationFilter;
    areas?: Prisma.XOR<Prisma.AreasScalarRelationFilter, Prisma.areasWhereInput>;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
    catalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosScalarRelationFilter, Prisma.usuariosWhereInput>;
};
export type planes_accionOrderByWithRelationInput = {
    id_plan?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    codigo_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrderInput | Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrderInput | Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    actividades_plan?: Prisma.actividades_planOrderByRelationAggregateInput;
    areas?: Prisma.areasOrderByWithRelationInput;
    casos_sop?: Prisma.casos_sopOrderByWithRelationInput;
    catalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type planes_accionWhereUniqueInput = Prisma.AtLeast<{
    id_plan?: number;
    codigo_plan?: string;
    AND?: Prisma.planes_accionWhereInput | Prisma.planes_accionWhereInput[];
    OR?: Prisma.planes_accionWhereInput[];
    NOT?: Prisma.planes_accionWhereInput | Prisma.planes_accionWhereInput[];
    id_caso?: Prisma.IntFilter<"planes_accion"> | number;
    descripcion?: Prisma.StringFilter<"planes_accion"> | string;
    id_area?: Prisma.IntFilter<"planes_accion"> | number;
    responsable?: Prisma.IntFilter<"planes_accion"> | number;
    estado?: Prisma.IntFilter<"planes_accion"> | number;
    fecha_plan?: Prisma.DateTimeFilter<"planes_accion"> | Date | string;
    fecha_reprogramada?: Prisma.DateTimeNullableFilter<"planes_accion"> | Date | string | null;
    dias_abierto?: Prisma.IntNullableFilter<"planes_accion"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"planes_accion"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"planes_accion"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"planes_accion"> | Date | string | null;
    actividades_plan?: Prisma.Actividades_planListRelationFilter;
    areas?: Prisma.XOR<Prisma.AreasScalarRelationFilter, Prisma.areasWhereInput>;
    casos_sop?: Prisma.XOR<Prisma.Casos_sopScalarRelationFilter, Prisma.casos_sopWhereInput>;
    catalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleScalarRelationFilter, Prisma.catalogo_detalleWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosScalarRelationFilter, Prisma.usuariosWhereInput>;
}, "id_plan" | "codigo_plan">;
export type planes_accionOrderByWithAggregationInput = {
    id_plan?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    codigo_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrderInput | Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrderInput | Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.planes_accionCountOrderByAggregateInput;
    _avg?: Prisma.planes_accionAvgOrderByAggregateInput;
    _max?: Prisma.planes_accionMaxOrderByAggregateInput;
    _min?: Prisma.planes_accionMinOrderByAggregateInput;
    _sum?: Prisma.planes_accionSumOrderByAggregateInput;
};
export type planes_accionScalarWhereWithAggregatesInput = {
    AND?: Prisma.planes_accionScalarWhereWithAggregatesInput | Prisma.planes_accionScalarWhereWithAggregatesInput[];
    OR?: Prisma.planes_accionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.planes_accionScalarWhereWithAggregatesInput | Prisma.planes_accionScalarWhereWithAggregatesInput[];
    id_plan?: Prisma.IntWithAggregatesFilter<"planes_accion"> | number;
    id_caso?: Prisma.IntWithAggregatesFilter<"planes_accion"> | number;
    codigo_plan?: Prisma.StringWithAggregatesFilter<"planes_accion"> | string;
    descripcion?: Prisma.StringWithAggregatesFilter<"planes_accion"> | string;
    id_area?: Prisma.IntWithAggregatesFilter<"planes_accion"> | number;
    responsable?: Prisma.IntWithAggregatesFilter<"planes_accion"> | number;
    estado?: Prisma.IntWithAggregatesFilter<"planes_accion"> | number;
    fecha_plan?: Prisma.DateTimeWithAggregatesFilter<"planes_accion"> | Date | string;
    fecha_reprogramada?: Prisma.DateTimeNullableWithAggregatesFilter<"planes_accion"> | Date | string | null;
    dias_abierto?: Prisma.IntNullableWithAggregatesFilter<"planes_accion"> | number | null;
    observaciones?: Prisma.StringNullableWithAggregatesFilter<"planes_accion"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"planes_accion"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"planes_accion"> | Date | string | null;
};
export type planes_accionCreateInput = {
    codigo_plan: string;
    descripcion: string;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutPlanes_accionInput;
    areas: Prisma.areasCreateNestedOneWithoutPlanes_accionInput;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutPlanes_accionInput;
    catalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutPlanes_accionInput;
    usuarios: Prisma.usuariosCreateNestedOneWithoutPlanes_accionInput;
};
export type planes_accionUncheckedCreateInput = {
    id_plan?: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    responsable: number;
    estado: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutPlanes_accionInput;
};
export type planes_accionUpdateInput = {
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutPlanes_accionNestedInput;
    areas?: Prisma.areasUpdateOneRequiredWithoutPlanes_accionNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutPlanes_accionNestedInput;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutPlanes_accionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneRequiredWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_area?: Prisma.IntFieldUpdateOperationsInput | number;
    responsable?: Prisma.IntFieldUpdateOperationsInput | number;
    estado?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutPlanes_accionNestedInput;
};
export type planes_accionCreateManyInput = {
    id_plan?: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    responsable: number;
    estado: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type planes_accionUpdateManyMutationInput = {
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type planes_accionUncheckedUpdateManyInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_area?: Prisma.IntFieldUpdateOperationsInput | number;
    responsable?: Prisma.IntFieldUpdateOperationsInput | number;
    estado?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Planes_accionScalarRelationFilter = {
    is?: Prisma.planes_accionWhereInput;
    isNot?: Prisma.planes_accionWhereInput;
};
export type Planes_accionListRelationFilter = {
    every?: Prisma.planes_accionWhereInput;
    some?: Prisma.planes_accionWhereInput;
    none?: Prisma.planes_accionWhereInput;
};
export type planes_accionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type planes_accionCountOrderByAggregateInput = {
    id_plan?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    codigo_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type planes_accionAvgOrderByAggregateInput = {
    id_plan?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
};
export type planes_accionMaxOrderByAggregateInput = {
    id_plan?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    codigo_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type planes_accionMinOrderByAggregateInput = {
    id_plan?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    codigo_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fecha_plan?: Prisma.SortOrder;
    fecha_reprogramada?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type planes_accionSumOrderByAggregateInput = {
    id_plan?: Prisma.SortOrder;
    id_caso?: Prisma.SortOrder;
    id_area?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    dias_abierto?: Prisma.SortOrder;
};
export type planes_accionCreateNestedOneWithoutActividades_planInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutActividades_planInput, Prisma.planes_accionUncheckedCreateWithoutActividades_planInput>;
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutActividades_planInput;
    connect?: Prisma.planes_accionWhereUniqueInput;
};
export type planes_accionUpdateOneRequiredWithoutActividades_planNestedInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutActividades_planInput, Prisma.planes_accionUncheckedCreateWithoutActividades_planInput>;
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutActividades_planInput;
    upsert?: Prisma.planes_accionUpsertWithoutActividades_planInput;
    connect?: Prisma.planes_accionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.planes_accionUpdateToOneWithWhereWithoutActividades_planInput, Prisma.planes_accionUpdateWithoutActividades_planInput>, Prisma.planes_accionUncheckedUpdateWithoutActividades_planInput>;
};
export type planes_accionCreateNestedManyWithoutAreasInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutAreasInput, Prisma.planes_accionUncheckedCreateWithoutAreasInput> | Prisma.planes_accionCreateWithoutAreasInput[] | Prisma.planes_accionUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutAreasInput | Prisma.planes_accionCreateOrConnectWithoutAreasInput[];
    createMany?: Prisma.planes_accionCreateManyAreasInputEnvelope;
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
};
export type planes_accionUncheckedCreateNestedManyWithoutAreasInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutAreasInput, Prisma.planes_accionUncheckedCreateWithoutAreasInput> | Prisma.planes_accionCreateWithoutAreasInput[] | Prisma.planes_accionUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutAreasInput | Prisma.planes_accionCreateOrConnectWithoutAreasInput[];
    createMany?: Prisma.planes_accionCreateManyAreasInputEnvelope;
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
};
export type planes_accionUpdateManyWithoutAreasNestedInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutAreasInput, Prisma.planes_accionUncheckedCreateWithoutAreasInput> | Prisma.planes_accionCreateWithoutAreasInput[] | Prisma.planes_accionUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutAreasInput | Prisma.planes_accionCreateOrConnectWithoutAreasInput[];
    upsert?: Prisma.planes_accionUpsertWithWhereUniqueWithoutAreasInput | Prisma.planes_accionUpsertWithWhereUniqueWithoutAreasInput[];
    createMany?: Prisma.planes_accionCreateManyAreasInputEnvelope;
    set?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    disconnect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    delete?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    update?: Prisma.planes_accionUpdateWithWhereUniqueWithoutAreasInput | Prisma.planes_accionUpdateWithWhereUniqueWithoutAreasInput[];
    updateMany?: Prisma.planes_accionUpdateManyWithWhereWithoutAreasInput | Prisma.planes_accionUpdateManyWithWhereWithoutAreasInput[];
    deleteMany?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
};
export type planes_accionUncheckedUpdateManyWithoutAreasNestedInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutAreasInput, Prisma.planes_accionUncheckedCreateWithoutAreasInput> | Prisma.planes_accionCreateWithoutAreasInput[] | Prisma.planes_accionUncheckedCreateWithoutAreasInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutAreasInput | Prisma.planes_accionCreateOrConnectWithoutAreasInput[];
    upsert?: Prisma.planes_accionUpsertWithWhereUniqueWithoutAreasInput | Prisma.planes_accionUpsertWithWhereUniqueWithoutAreasInput[];
    createMany?: Prisma.planes_accionCreateManyAreasInputEnvelope;
    set?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    disconnect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    delete?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    update?: Prisma.planes_accionUpdateWithWhereUniqueWithoutAreasInput | Prisma.planes_accionUpdateWithWhereUniqueWithoutAreasInput[];
    updateMany?: Prisma.planes_accionUpdateManyWithWhereWithoutAreasInput | Prisma.planes_accionUpdateManyWithWhereWithoutAreasInput[];
    deleteMany?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
};
export type planes_accionCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutCasos_sopInput, Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput> | Prisma.planes_accionCreateWithoutCasos_sopInput[] | Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutCasos_sopInput | Prisma.planes_accionCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.planes_accionCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
};
export type planes_accionUncheckedCreateNestedManyWithoutCasos_sopInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutCasos_sopInput, Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput> | Prisma.planes_accionCreateWithoutCasos_sopInput[] | Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutCasos_sopInput | Prisma.planes_accionCreateOrConnectWithoutCasos_sopInput[];
    createMany?: Prisma.planes_accionCreateManyCasos_sopInputEnvelope;
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
};
export type planes_accionUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutCasos_sopInput, Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput> | Prisma.planes_accionCreateWithoutCasos_sopInput[] | Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutCasos_sopInput | Prisma.planes_accionCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.planes_accionUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.planes_accionUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.planes_accionCreateManyCasos_sopInputEnvelope;
    set?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    disconnect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    delete?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    update?: Prisma.planes_accionUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.planes_accionUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.planes_accionUpdateManyWithWhereWithoutCasos_sopInput | Prisma.planes_accionUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
};
export type planes_accionUncheckedUpdateManyWithoutCasos_sopNestedInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutCasos_sopInput, Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput> | Prisma.planes_accionCreateWithoutCasos_sopInput[] | Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutCasos_sopInput | Prisma.planes_accionCreateOrConnectWithoutCasos_sopInput[];
    upsert?: Prisma.planes_accionUpsertWithWhereUniqueWithoutCasos_sopInput | Prisma.planes_accionUpsertWithWhereUniqueWithoutCasos_sopInput[];
    createMany?: Prisma.planes_accionCreateManyCasos_sopInputEnvelope;
    set?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    disconnect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    delete?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    update?: Prisma.planes_accionUpdateWithWhereUniqueWithoutCasos_sopInput | Prisma.planes_accionUpdateWithWhereUniqueWithoutCasos_sopInput[];
    updateMany?: Prisma.planes_accionUpdateManyWithWhereWithoutCasos_sopInput | Prisma.planes_accionUpdateManyWithWhereWithoutCasos_sopInput[];
    deleteMany?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
};
export type planes_accionCreateNestedManyWithoutCatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutCatalogo_detalleInput, Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput> | Prisma.planes_accionCreateWithoutCatalogo_detalleInput[] | Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutCatalogo_detalleInput | Prisma.planes_accionCreateOrConnectWithoutCatalogo_detalleInput[];
    createMany?: Prisma.planes_accionCreateManyCatalogo_detalleInputEnvelope;
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
};
export type planes_accionUncheckedCreateNestedManyWithoutCatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutCatalogo_detalleInput, Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput> | Prisma.planes_accionCreateWithoutCatalogo_detalleInput[] | Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutCatalogo_detalleInput | Prisma.planes_accionCreateOrConnectWithoutCatalogo_detalleInput[];
    createMany?: Prisma.planes_accionCreateManyCatalogo_detalleInputEnvelope;
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
};
export type planes_accionUpdateManyWithoutCatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutCatalogo_detalleInput, Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput> | Prisma.planes_accionCreateWithoutCatalogo_detalleInput[] | Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutCatalogo_detalleInput | Prisma.planes_accionCreateOrConnectWithoutCatalogo_detalleInput[];
    upsert?: Prisma.planes_accionUpsertWithWhereUniqueWithoutCatalogo_detalleInput | Prisma.planes_accionUpsertWithWhereUniqueWithoutCatalogo_detalleInput[];
    createMany?: Prisma.planes_accionCreateManyCatalogo_detalleInputEnvelope;
    set?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    disconnect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    delete?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    update?: Prisma.planes_accionUpdateWithWhereUniqueWithoutCatalogo_detalleInput | Prisma.planes_accionUpdateWithWhereUniqueWithoutCatalogo_detalleInput[];
    updateMany?: Prisma.planes_accionUpdateManyWithWhereWithoutCatalogo_detalleInput | Prisma.planes_accionUpdateManyWithWhereWithoutCatalogo_detalleInput[];
    deleteMany?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
};
export type planes_accionUncheckedUpdateManyWithoutCatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutCatalogo_detalleInput, Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput> | Prisma.planes_accionCreateWithoutCatalogo_detalleInput[] | Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutCatalogo_detalleInput | Prisma.planes_accionCreateOrConnectWithoutCatalogo_detalleInput[];
    upsert?: Prisma.planes_accionUpsertWithWhereUniqueWithoutCatalogo_detalleInput | Prisma.planes_accionUpsertWithWhereUniqueWithoutCatalogo_detalleInput[];
    createMany?: Prisma.planes_accionCreateManyCatalogo_detalleInputEnvelope;
    set?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    disconnect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    delete?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    update?: Prisma.planes_accionUpdateWithWhereUniqueWithoutCatalogo_detalleInput | Prisma.planes_accionUpdateWithWhereUniqueWithoutCatalogo_detalleInput[];
    updateMany?: Prisma.planes_accionUpdateManyWithWhereWithoutCatalogo_detalleInput | Prisma.planes_accionUpdateManyWithWhereWithoutCatalogo_detalleInput[];
    deleteMany?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
};
export type planes_accionCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutUsuariosInput, Prisma.planes_accionUncheckedCreateWithoutUsuariosInput> | Prisma.planes_accionCreateWithoutUsuariosInput[] | Prisma.planes_accionUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutUsuariosInput | Prisma.planes_accionCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.planes_accionCreateManyUsuariosInputEnvelope;
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
};
export type planes_accionUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutUsuariosInput, Prisma.planes_accionUncheckedCreateWithoutUsuariosInput> | Prisma.planes_accionCreateWithoutUsuariosInput[] | Prisma.planes_accionUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutUsuariosInput | Prisma.planes_accionCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.planes_accionCreateManyUsuariosInputEnvelope;
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
};
export type planes_accionUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutUsuariosInput, Prisma.planes_accionUncheckedCreateWithoutUsuariosInput> | Prisma.planes_accionCreateWithoutUsuariosInput[] | Prisma.planes_accionUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutUsuariosInput | Prisma.planes_accionCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.planes_accionUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.planes_accionUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.planes_accionCreateManyUsuariosInputEnvelope;
    set?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    disconnect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    delete?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    update?: Prisma.planes_accionUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.planes_accionUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.planes_accionUpdateManyWithWhereWithoutUsuariosInput | Prisma.planes_accionUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
};
export type planes_accionUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.planes_accionCreateWithoutUsuariosInput, Prisma.planes_accionUncheckedCreateWithoutUsuariosInput> | Prisma.planes_accionCreateWithoutUsuariosInput[] | Prisma.planes_accionUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.planes_accionCreateOrConnectWithoutUsuariosInput | Prisma.planes_accionCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.planes_accionUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.planes_accionUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.planes_accionCreateManyUsuariosInputEnvelope;
    set?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    disconnect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    delete?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    connect?: Prisma.planes_accionWhereUniqueInput | Prisma.planes_accionWhereUniqueInput[];
    update?: Prisma.planes_accionUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.planes_accionUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.planes_accionUpdateManyWithWhereWithoutUsuariosInput | Prisma.planes_accionUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
};
export type planes_accionCreateWithoutActividades_planInput = {
    codigo_plan: string;
    descripcion: string;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    areas: Prisma.areasCreateNestedOneWithoutPlanes_accionInput;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutPlanes_accionInput;
    catalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutPlanes_accionInput;
    usuarios: Prisma.usuariosCreateNestedOneWithoutPlanes_accionInput;
};
export type planes_accionUncheckedCreateWithoutActividades_planInput = {
    id_plan?: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    responsable: number;
    estado: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type planes_accionCreateOrConnectWithoutActividades_planInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutActividades_planInput, Prisma.planes_accionUncheckedCreateWithoutActividades_planInput>;
};
export type planes_accionUpsertWithoutActividades_planInput = {
    update: Prisma.XOR<Prisma.planes_accionUpdateWithoutActividades_planInput, Prisma.planes_accionUncheckedUpdateWithoutActividades_planInput>;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutActividades_planInput, Prisma.planes_accionUncheckedCreateWithoutActividades_planInput>;
    where?: Prisma.planes_accionWhereInput;
};
export type planes_accionUpdateToOneWithWhereWithoutActividades_planInput = {
    where?: Prisma.planes_accionWhereInput;
    data: Prisma.XOR<Prisma.planes_accionUpdateWithoutActividades_planInput, Prisma.planes_accionUncheckedUpdateWithoutActividades_planInput>;
};
export type planes_accionUpdateWithoutActividades_planInput = {
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    areas?: Prisma.areasUpdateOneRequiredWithoutPlanes_accionNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutPlanes_accionNestedInput;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutPlanes_accionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneRequiredWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateWithoutActividades_planInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_area?: Prisma.IntFieldUpdateOperationsInput | number;
    responsable?: Prisma.IntFieldUpdateOperationsInput | number;
    estado?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type planes_accionCreateWithoutAreasInput = {
    codigo_plan: string;
    descripcion: string;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutPlanes_accionInput;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutPlanes_accionInput;
    catalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutPlanes_accionInput;
    usuarios: Prisma.usuariosCreateNestedOneWithoutPlanes_accionInput;
};
export type planes_accionUncheckedCreateWithoutAreasInput = {
    id_plan?: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    responsable: number;
    estado: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutPlanes_accionInput;
};
export type planes_accionCreateOrConnectWithoutAreasInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutAreasInput, Prisma.planes_accionUncheckedCreateWithoutAreasInput>;
};
export type planes_accionCreateManyAreasInputEnvelope = {
    data: Prisma.planes_accionCreateManyAreasInput | Prisma.planes_accionCreateManyAreasInput[];
    skipDuplicates?: boolean;
};
export type planes_accionUpsertWithWhereUniqueWithoutAreasInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    update: Prisma.XOR<Prisma.planes_accionUpdateWithoutAreasInput, Prisma.planes_accionUncheckedUpdateWithoutAreasInput>;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutAreasInput, Prisma.planes_accionUncheckedCreateWithoutAreasInput>;
};
export type planes_accionUpdateWithWhereUniqueWithoutAreasInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    data: Prisma.XOR<Prisma.planes_accionUpdateWithoutAreasInput, Prisma.planes_accionUncheckedUpdateWithoutAreasInput>;
};
export type planes_accionUpdateManyWithWhereWithoutAreasInput = {
    where: Prisma.planes_accionScalarWhereInput;
    data: Prisma.XOR<Prisma.planes_accionUpdateManyMutationInput, Prisma.planes_accionUncheckedUpdateManyWithoutAreasInput>;
};
export type planes_accionScalarWhereInput = {
    AND?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
    OR?: Prisma.planes_accionScalarWhereInput[];
    NOT?: Prisma.planes_accionScalarWhereInput | Prisma.planes_accionScalarWhereInput[];
    id_plan?: Prisma.IntFilter<"planes_accion"> | number;
    id_caso?: Prisma.IntFilter<"planes_accion"> | number;
    codigo_plan?: Prisma.StringFilter<"planes_accion"> | string;
    descripcion?: Prisma.StringFilter<"planes_accion"> | string;
    id_area?: Prisma.IntFilter<"planes_accion"> | number;
    responsable?: Prisma.IntFilter<"planes_accion"> | number;
    estado?: Prisma.IntFilter<"planes_accion"> | number;
    fecha_plan?: Prisma.DateTimeFilter<"planes_accion"> | Date | string;
    fecha_reprogramada?: Prisma.DateTimeNullableFilter<"planes_accion"> | Date | string | null;
    dias_abierto?: Prisma.IntNullableFilter<"planes_accion"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"planes_accion"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"planes_accion"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"planes_accion"> | Date | string | null;
};
export type planes_accionCreateWithoutCasos_sopInput = {
    codigo_plan: string;
    descripcion: string;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutPlanes_accionInput;
    areas: Prisma.areasCreateNestedOneWithoutPlanes_accionInput;
    catalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutPlanes_accionInput;
    usuarios: Prisma.usuariosCreateNestedOneWithoutPlanes_accionInput;
};
export type planes_accionUncheckedCreateWithoutCasos_sopInput = {
    id_plan?: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    responsable: number;
    estado: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutPlanes_accionInput;
};
export type planes_accionCreateOrConnectWithoutCasos_sopInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutCasos_sopInput, Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput>;
};
export type planes_accionCreateManyCasos_sopInputEnvelope = {
    data: Prisma.planes_accionCreateManyCasos_sopInput | Prisma.planes_accionCreateManyCasos_sopInput[];
    skipDuplicates?: boolean;
};
export type planes_accionUpsertWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    update: Prisma.XOR<Prisma.planes_accionUpdateWithoutCasos_sopInput, Prisma.planes_accionUncheckedUpdateWithoutCasos_sopInput>;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutCasos_sopInput, Prisma.planes_accionUncheckedCreateWithoutCasos_sopInput>;
};
export type planes_accionUpdateWithWhereUniqueWithoutCasos_sopInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    data: Prisma.XOR<Prisma.planes_accionUpdateWithoutCasos_sopInput, Prisma.planes_accionUncheckedUpdateWithoutCasos_sopInput>;
};
export type planes_accionUpdateManyWithWhereWithoutCasos_sopInput = {
    where: Prisma.planes_accionScalarWhereInput;
    data: Prisma.XOR<Prisma.planes_accionUpdateManyMutationInput, Prisma.planes_accionUncheckedUpdateManyWithoutCasos_sopInput>;
};
export type planes_accionCreateWithoutCatalogo_detalleInput = {
    codigo_plan: string;
    descripcion: string;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutPlanes_accionInput;
    areas: Prisma.areasCreateNestedOneWithoutPlanes_accionInput;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutPlanes_accionInput;
    usuarios: Prisma.usuariosCreateNestedOneWithoutPlanes_accionInput;
};
export type planes_accionUncheckedCreateWithoutCatalogo_detalleInput = {
    id_plan?: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    responsable: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutPlanes_accionInput;
};
export type planes_accionCreateOrConnectWithoutCatalogo_detalleInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutCatalogo_detalleInput, Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput>;
};
export type planes_accionCreateManyCatalogo_detalleInputEnvelope = {
    data: Prisma.planes_accionCreateManyCatalogo_detalleInput | Prisma.planes_accionCreateManyCatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type planes_accionUpsertWithWhereUniqueWithoutCatalogo_detalleInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    update: Prisma.XOR<Prisma.planes_accionUpdateWithoutCatalogo_detalleInput, Prisma.planes_accionUncheckedUpdateWithoutCatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutCatalogo_detalleInput, Prisma.planes_accionUncheckedCreateWithoutCatalogo_detalleInput>;
};
export type planes_accionUpdateWithWhereUniqueWithoutCatalogo_detalleInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    data: Prisma.XOR<Prisma.planes_accionUpdateWithoutCatalogo_detalleInput, Prisma.planes_accionUncheckedUpdateWithoutCatalogo_detalleInput>;
};
export type planes_accionUpdateManyWithWhereWithoutCatalogo_detalleInput = {
    where: Prisma.planes_accionScalarWhereInput;
    data: Prisma.XOR<Prisma.planes_accionUpdateManyMutationInput, Prisma.planes_accionUncheckedUpdateManyWithoutCatalogo_detalleInput>;
};
export type planes_accionCreateWithoutUsuariosInput = {
    codigo_plan: string;
    descripcion: string;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planCreateNestedManyWithoutPlanes_accionInput;
    areas: Prisma.areasCreateNestedOneWithoutPlanes_accionInput;
    casos_sop: Prisma.casos_sopCreateNestedOneWithoutPlanes_accionInput;
    catalogo_detalle: Prisma.catalogo_detalleCreateNestedOneWithoutPlanes_accionInput;
};
export type planes_accionUncheckedCreateWithoutUsuariosInput = {
    id_plan?: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    estado: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedCreateNestedManyWithoutPlanes_accionInput;
};
export type planes_accionCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutUsuariosInput, Prisma.planes_accionUncheckedCreateWithoutUsuariosInput>;
};
export type planes_accionCreateManyUsuariosInputEnvelope = {
    data: Prisma.planes_accionCreateManyUsuariosInput | Prisma.planes_accionCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type planes_accionUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    update: Prisma.XOR<Prisma.planes_accionUpdateWithoutUsuariosInput, Prisma.planes_accionUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.planes_accionCreateWithoutUsuariosInput, Prisma.planes_accionUncheckedCreateWithoutUsuariosInput>;
};
export type planes_accionUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.planes_accionWhereUniqueInput;
    data: Prisma.XOR<Prisma.planes_accionUpdateWithoutUsuariosInput, Prisma.planes_accionUncheckedUpdateWithoutUsuariosInput>;
};
export type planes_accionUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.planes_accionScalarWhereInput;
    data: Prisma.XOR<Prisma.planes_accionUpdateManyMutationInput, Prisma.planes_accionUncheckedUpdateManyWithoutUsuariosInput>;
};
export type planes_accionCreateManyAreasInput = {
    id_plan?: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    responsable: number;
    estado: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type planes_accionUpdateWithoutAreasInput = {
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutPlanes_accionNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutPlanes_accionNestedInput;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutPlanes_accionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneRequiredWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateWithoutAreasInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable?: Prisma.IntFieldUpdateOperationsInput | number;
    estado?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateManyWithoutAreasInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable?: Prisma.IntFieldUpdateOperationsInput | number;
    estado?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type planes_accionCreateManyCasos_sopInput = {
    id_plan?: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    responsable: number;
    estado: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type planes_accionUpdateWithoutCasos_sopInput = {
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutPlanes_accionNestedInput;
    areas?: Prisma.areasUpdateOneRequiredWithoutPlanes_accionNestedInput;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutPlanes_accionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneRequiredWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateWithoutCasos_sopInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_area?: Prisma.IntFieldUpdateOperationsInput | number;
    responsable?: Prisma.IntFieldUpdateOperationsInput | number;
    estado?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateManyWithoutCasos_sopInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_area?: Prisma.IntFieldUpdateOperationsInput | number;
    responsable?: Prisma.IntFieldUpdateOperationsInput | number;
    estado?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type planes_accionCreateManyCatalogo_detalleInput = {
    id_plan?: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    responsable: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type planes_accionUpdateWithoutCatalogo_detalleInput = {
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutPlanes_accionNestedInput;
    areas?: Prisma.areasUpdateOneRequiredWithoutPlanes_accionNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutPlanes_accionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneRequiredWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateWithoutCatalogo_detalleInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_area?: Prisma.IntFieldUpdateOperationsInput | number;
    responsable?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateManyWithoutCatalogo_detalleInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_area?: Prisma.IntFieldUpdateOperationsInput | number;
    responsable?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type planes_accionCreateManyUsuariosInput = {
    id_plan?: number;
    id_caso: number;
    codigo_plan: string;
    descripcion: string;
    id_area: number;
    estado: number;
    fecha_plan: Date | string;
    fecha_reprogramada?: Date | string | null;
    dias_abierto?: number | null;
    observaciones?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type planes_accionUpdateWithoutUsuariosInput = {
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUpdateManyWithoutPlanes_accionNestedInput;
    areas?: Prisma.areasUpdateOneRequiredWithoutPlanes_accionNestedInput;
    casos_sop?: Prisma.casos_sopUpdateOneRequiredWithoutPlanes_accionNestedInput;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateOneRequiredWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateWithoutUsuariosInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_area?: Prisma.IntFieldUpdateOperationsInput | number;
    estado?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actividades_plan?: Prisma.actividades_planUncheckedUpdateManyWithoutPlanes_accionNestedInput;
};
export type planes_accionUncheckedUpdateManyWithoutUsuariosInput = {
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    id_caso?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo_plan?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_area?: Prisma.IntFieldUpdateOperationsInput | number;
    estado?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_plan?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fecha_reprogramada?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dias_abierto?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type Planes_accionCountOutputType
 */
export type Planes_accionCountOutputType = {
    actividades_plan: number;
};
export type Planes_accionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actividades_plan?: boolean | Planes_accionCountOutputTypeCountActividades_planArgs;
};
/**
 * Planes_accionCountOutputType without action
 */
export type Planes_accionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Planes_accionCountOutputType
     */
    select?: Prisma.Planes_accionCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * Planes_accionCountOutputType without action
 */
export type Planes_accionCountOutputTypeCountActividades_planArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.actividades_planWhereInput;
};
export type planes_accionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_plan?: boolean;
    id_caso?: boolean;
    codigo_plan?: boolean;
    descripcion?: boolean;
    id_area?: boolean;
    responsable?: boolean;
    estado?: boolean;
    fecha_plan?: boolean;
    fecha_reprogramada?: boolean;
    dias_abierto?: boolean;
    observaciones?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    actividades_plan?: boolean | Prisma.planes_accion$actividades_planArgs<ExtArgs>;
    areas?: boolean | Prisma.areasDefaultArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Planes_accionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["planes_accion"]>;
export type planes_accionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_plan?: boolean;
    id_caso?: boolean;
    codigo_plan?: boolean;
    descripcion?: boolean;
    id_area?: boolean;
    responsable?: boolean;
    estado?: boolean;
    fecha_plan?: boolean;
    fecha_reprogramada?: boolean;
    dias_abierto?: boolean;
    observaciones?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    areas?: boolean | Prisma.areasDefaultArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["planes_accion"]>;
export type planes_accionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_plan?: boolean;
    id_caso?: boolean;
    codigo_plan?: boolean;
    descripcion?: boolean;
    id_area?: boolean;
    responsable?: boolean;
    estado?: boolean;
    fecha_plan?: boolean;
    fecha_reprogramada?: boolean;
    dias_abierto?: boolean;
    observaciones?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    areas?: boolean | Prisma.areasDefaultArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["planes_accion"]>;
export type planes_accionSelectScalar = {
    id_plan?: boolean;
    id_caso?: boolean;
    codigo_plan?: boolean;
    descripcion?: boolean;
    id_area?: boolean;
    responsable?: boolean;
    estado?: boolean;
    fecha_plan?: boolean;
    fecha_reprogramada?: boolean;
    dias_abierto?: boolean;
    observaciones?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type planes_accionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_plan" | "id_caso" | "codigo_plan" | "descripcion" | "id_area" | "responsable" | "estado" | "fecha_plan" | "fecha_reprogramada" | "dias_abierto" | "observaciones" | "created_at" | "updated_at", ExtArgs["result"]["planes_accion"]>;
export type planes_accionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actividades_plan?: boolean | Prisma.planes_accion$actividades_planArgs<ExtArgs>;
    areas?: boolean | Prisma.areasDefaultArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Planes_accionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type planes_accionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    areas?: boolean | Prisma.areasDefaultArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
};
export type planes_accionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    areas?: boolean | Prisma.areasDefaultArgs<ExtArgs>;
    casos_sop?: boolean | Prisma.casos_sopDefaultArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.catalogo_detalleDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuariosDefaultArgs<ExtArgs>;
};
export type $planes_accionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "planes_accion";
    objects: {
        actividades_plan: Prisma.$actividades_planPayload<ExtArgs>[];
        areas: Prisma.$areasPayload<ExtArgs>;
        casos_sop: Prisma.$casos_sopPayload<ExtArgs>;
        catalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs>;
        usuarios: Prisma.$usuariosPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_plan: number;
        id_caso: number;
        codigo_plan: string;
        descripcion: string;
        id_area: number;
        responsable: number;
        estado: number;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        dias_abierto: number | null;
        observaciones: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["planes_accion"]>;
    composites: {};
};
export type planes_accionGetPayload<S extends boolean | null | undefined | planes_accionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$planes_accionPayload, S>;
export type planes_accionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<planes_accionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Planes_accionCountAggregateInputType | true;
};
export interface planes_accionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['planes_accion'];
        meta: {
            name: 'planes_accion';
        };
    };
    /**
     * Find zero or one Planes_accion that matches the filter.
     * @param {planes_accionFindUniqueArgs} args - Arguments to find a Planes_accion
     * @example
     * // Get one Planes_accion
     * const planes_accion = await prisma.planes_accion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends planes_accionFindUniqueArgs>(args: Prisma.SelectSubset<T, planes_accionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__planes_accionClient<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Planes_accion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {planes_accionFindUniqueOrThrowArgs} args - Arguments to find a Planes_accion
     * @example
     * // Get one Planes_accion
     * const planes_accion = await prisma.planes_accion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends planes_accionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, planes_accionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__planes_accionClient<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Planes_accion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planes_accionFindFirstArgs} args - Arguments to find a Planes_accion
     * @example
     * // Get one Planes_accion
     * const planes_accion = await prisma.planes_accion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends planes_accionFindFirstArgs>(args?: Prisma.SelectSubset<T, planes_accionFindFirstArgs<ExtArgs>>): Prisma.Prisma__planes_accionClient<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Planes_accion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planes_accionFindFirstOrThrowArgs} args - Arguments to find a Planes_accion
     * @example
     * // Get one Planes_accion
     * const planes_accion = await prisma.planes_accion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends planes_accionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, planes_accionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__planes_accionClient<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Planes_accions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planes_accionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Planes_accions
     * const planes_accions = await prisma.planes_accion.findMany()
     *
     * // Get first 10 Planes_accions
     * const planes_accions = await prisma.planes_accion.findMany({ take: 10 })
     *
     * // Only select the `id_plan`
     * const planes_accionWithId_planOnly = await prisma.planes_accion.findMany({ select: { id_plan: true } })
     *
     */
    findMany<T extends planes_accionFindManyArgs>(args?: Prisma.SelectSubset<T, planes_accionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Planes_accion.
     * @param {planes_accionCreateArgs} args - Arguments to create a Planes_accion.
     * @example
     * // Create one Planes_accion
     * const Planes_accion = await prisma.planes_accion.create({
     *   data: {
     *     // ... data to create a Planes_accion
     *   }
     * })
     *
     */
    create<T extends planes_accionCreateArgs>(args: Prisma.SelectSubset<T, planes_accionCreateArgs<ExtArgs>>): Prisma.Prisma__planes_accionClient<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Planes_accions.
     * @param {planes_accionCreateManyArgs} args - Arguments to create many Planes_accions.
     * @example
     * // Create many Planes_accions
     * const planes_accion = await prisma.planes_accion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends planes_accionCreateManyArgs>(args?: Prisma.SelectSubset<T, planes_accionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Planes_accions and returns the data saved in the database.
     * @param {planes_accionCreateManyAndReturnArgs} args - Arguments to create many Planes_accions.
     * @example
     * // Create many Planes_accions
     * const planes_accion = await prisma.planes_accion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Planes_accions and only return the `id_plan`
     * const planes_accionWithId_planOnly = await prisma.planes_accion.createManyAndReturn({
     *   select: { id_plan: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends planes_accionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, planes_accionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Planes_accion.
     * @param {planes_accionDeleteArgs} args - Arguments to delete one Planes_accion.
     * @example
     * // Delete one Planes_accion
     * const Planes_accion = await prisma.planes_accion.delete({
     *   where: {
     *     // ... filter to delete one Planes_accion
     *   }
     * })
     *
     */
    delete<T extends planes_accionDeleteArgs>(args: Prisma.SelectSubset<T, planes_accionDeleteArgs<ExtArgs>>): Prisma.Prisma__planes_accionClient<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Planes_accion.
     * @param {planes_accionUpdateArgs} args - Arguments to update one Planes_accion.
     * @example
     * // Update one Planes_accion
     * const planes_accion = await prisma.planes_accion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends planes_accionUpdateArgs>(args: Prisma.SelectSubset<T, planes_accionUpdateArgs<ExtArgs>>): Prisma.Prisma__planes_accionClient<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Planes_accions.
     * @param {planes_accionDeleteManyArgs} args - Arguments to filter Planes_accions to delete.
     * @example
     * // Delete a few Planes_accions
     * const { count } = await prisma.planes_accion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends planes_accionDeleteManyArgs>(args?: Prisma.SelectSubset<T, planes_accionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Planes_accions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planes_accionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Planes_accions
     * const planes_accion = await prisma.planes_accion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends planes_accionUpdateManyArgs>(args: Prisma.SelectSubset<T, planes_accionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Planes_accions and returns the data updated in the database.
     * @param {planes_accionUpdateManyAndReturnArgs} args - Arguments to update many Planes_accions.
     * @example
     * // Update many Planes_accions
     * const planes_accion = await prisma.planes_accion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Planes_accions and only return the `id_plan`
     * const planes_accionWithId_planOnly = await prisma.planes_accion.updateManyAndReturn({
     *   select: { id_plan: true },
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
    updateManyAndReturn<T extends planes_accionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, planes_accionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Planes_accion.
     * @param {planes_accionUpsertArgs} args - Arguments to update or create a Planes_accion.
     * @example
     * // Update or create a Planes_accion
     * const planes_accion = await prisma.planes_accion.upsert({
     *   create: {
     *     // ... data to create a Planes_accion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Planes_accion we want to update
     *   }
     * })
     */
    upsert<T extends planes_accionUpsertArgs>(args: Prisma.SelectSubset<T, planes_accionUpsertArgs<ExtArgs>>): Prisma.Prisma__planes_accionClient<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Planes_accions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planes_accionCountArgs} args - Arguments to filter Planes_accions to count.
     * @example
     * // Count the number of Planes_accions
     * const count = await prisma.planes_accion.count({
     *   where: {
     *     // ... the filter for the Planes_accions we want to count
     *   }
     * })
    **/
    count<T extends planes_accionCountArgs>(args?: Prisma.Subset<T, planes_accionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Planes_accionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Planes_accion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Planes_accionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Planes_accionAggregateArgs>(args: Prisma.Subset<T, Planes_accionAggregateArgs>): Prisma.PrismaPromise<GetPlanes_accionAggregateType<T>>;
    /**
     * Group by Planes_accion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planes_accionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends planes_accionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: planes_accionGroupByArgs['orderBy'];
    } : {
        orderBy?: planes_accionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, planes_accionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanes_accionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the planes_accion model
     */
    readonly fields: planes_accionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for planes_accion.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__planes_accionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    actividades_plan<T extends Prisma.planes_accion$actividades_planArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.planes_accion$actividades_planArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    areas<T extends Prisma.areasDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.areasDefaultArgs<ExtArgs>>): Prisma.Prisma__areasClient<runtime.Types.Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    casos_sop<T extends Prisma.casos_sopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.casos_sopDefaultArgs<ExtArgs>>): Prisma.Prisma__casos_sopClient<runtime.Types.Result.GetResult<Prisma.$casos_sopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle<T extends Prisma.catalogo_detalleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.catalogo_detalleDefaultArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the planes_accion model
 */
export interface planes_accionFieldRefs {
    readonly id_plan: Prisma.FieldRef<"planes_accion", 'Int'>;
    readonly id_caso: Prisma.FieldRef<"planes_accion", 'Int'>;
    readonly codigo_plan: Prisma.FieldRef<"planes_accion", 'String'>;
    readonly descripcion: Prisma.FieldRef<"planes_accion", 'String'>;
    readonly id_area: Prisma.FieldRef<"planes_accion", 'Int'>;
    readonly responsable: Prisma.FieldRef<"planes_accion", 'Int'>;
    readonly estado: Prisma.FieldRef<"planes_accion", 'Int'>;
    readonly fecha_plan: Prisma.FieldRef<"planes_accion", 'DateTime'>;
    readonly fecha_reprogramada: Prisma.FieldRef<"planes_accion", 'DateTime'>;
    readonly dias_abierto: Prisma.FieldRef<"planes_accion", 'Int'>;
    readonly observaciones: Prisma.FieldRef<"planes_accion", 'String'>;
    readonly created_at: Prisma.FieldRef<"planes_accion", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"planes_accion", 'DateTime'>;
}
/**
 * planes_accion findUnique
 */
export type planes_accionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    /**
     * Filter, which planes_accion to fetch.
     */
    where: Prisma.planes_accionWhereUniqueInput;
};
/**
 * planes_accion findUniqueOrThrow
 */
export type planes_accionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    /**
     * Filter, which planes_accion to fetch.
     */
    where: Prisma.planes_accionWhereUniqueInput;
};
/**
 * planes_accion findFirst
 */
export type planes_accionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    /**
     * Filter, which planes_accion to fetch.
     */
    where?: Prisma.planes_accionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of planes_accions to fetch.
     */
    orderBy?: Prisma.planes_accionOrderByWithRelationInput | Prisma.planes_accionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for planes_accions.
     */
    cursor?: Prisma.planes_accionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` planes_accions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` planes_accions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of planes_accions.
     */
    distinct?: Prisma.Planes_accionScalarFieldEnum | Prisma.Planes_accionScalarFieldEnum[];
};
/**
 * planes_accion findFirstOrThrow
 */
export type planes_accionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    /**
     * Filter, which planes_accion to fetch.
     */
    where?: Prisma.planes_accionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of planes_accions to fetch.
     */
    orderBy?: Prisma.planes_accionOrderByWithRelationInput | Prisma.planes_accionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for planes_accions.
     */
    cursor?: Prisma.planes_accionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` planes_accions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` planes_accions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of planes_accions.
     */
    distinct?: Prisma.Planes_accionScalarFieldEnum | Prisma.Planes_accionScalarFieldEnum[];
};
/**
 * planes_accion findMany
 */
export type planes_accionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    /**
     * Filter, which planes_accions to fetch.
     */
    where?: Prisma.planes_accionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of planes_accions to fetch.
     */
    orderBy?: Prisma.planes_accionOrderByWithRelationInput | Prisma.planes_accionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing planes_accions.
     */
    cursor?: Prisma.planes_accionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` planes_accions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` planes_accions.
     */
    skip?: number;
    distinct?: Prisma.Planes_accionScalarFieldEnum | Prisma.Planes_accionScalarFieldEnum[];
};
/**
 * planes_accion create
 */
export type planes_accionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    /**
     * The data needed to create a planes_accion.
     */
    data: Prisma.XOR<Prisma.planes_accionCreateInput, Prisma.planes_accionUncheckedCreateInput>;
};
/**
 * planes_accion createMany
 */
export type planes_accionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many planes_accions.
     */
    data: Prisma.planes_accionCreateManyInput | Prisma.planes_accionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * planes_accion createManyAndReturn
 */
export type planes_accionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * The data used to create many planes_accions.
     */
    data: Prisma.planes_accionCreateManyInput | Prisma.planes_accionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * planes_accion update
 */
export type planes_accionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    /**
     * The data needed to update a planes_accion.
     */
    data: Prisma.XOR<Prisma.planes_accionUpdateInput, Prisma.planes_accionUncheckedUpdateInput>;
    /**
     * Choose, which planes_accion to update.
     */
    where: Prisma.planes_accionWhereUniqueInput;
};
/**
 * planes_accion updateMany
 */
export type planes_accionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update planes_accions.
     */
    data: Prisma.XOR<Prisma.planes_accionUpdateManyMutationInput, Prisma.planes_accionUncheckedUpdateManyInput>;
    /**
     * Filter which planes_accions to update
     */
    where?: Prisma.planes_accionWhereInput;
    /**
     * Limit how many planes_accions to update.
     */
    limit?: number;
};
/**
 * planes_accion updateManyAndReturn
 */
export type planes_accionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * The data used to update planes_accions.
     */
    data: Prisma.XOR<Prisma.planes_accionUpdateManyMutationInput, Prisma.planes_accionUncheckedUpdateManyInput>;
    /**
     * Filter which planes_accions to update
     */
    where?: Prisma.planes_accionWhereInput;
    /**
     * Limit how many planes_accions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * planes_accion upsert
 */
export type planes_accionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    /**
     * The filter to search for the planes_accion to update in case it exists.
     */
    where: Prisma.planes_accionWhereUniqueInput;
    /**
     * In case the planes_accion found by the `where` argument doesn't exist, create a new planes_accion with this data.
     */
    create: Prisma.XOR<Prisma.planes_accionCreateInput, Prisma.planes_accionUncheckedCreateInput>;
    /**
     * In case the planes_accion was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.planes_accionUpdateInput, Prisma.planes_accionUncheckedUpdateInput>;
};
/**
 * planes_accion delete
 */
export type planes_accionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
    /**
     * Filter which planes_accion to delete.
     */
    where: Prisma.planes_accionWhereUniqueInput;
};
/**
 * planes_accion deleteMany
 */
export type planes_accionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which planes_accions to delete
     */
    where?: Prisma.planes_accionWhereInput;
    /**
     * Limit how many planes_accions to delete.
     */
    limit?: number;
};
/**
 * planes_accion.actividades_plan
 */
export type planes_accion$actividades_planArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the actividades_plan
     */
    select?: Prisma.actividades_planSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the actividades_plan
     */
    omit?: Prisma.actividades_planOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.actividades_planInclude<ExtArgs> | null;
    where?: Prisma.actividades_planWhereInput;
    orderBy?: Prisma.actividades_planOrderByWithRelationInput | Prisma.actividades_planOrderByWithRelationInput[];
    cursor?: Prisma.actividades_planWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Actividades_planScalarFieldEnum | Prisma.Actividades_planScalarFieldEnum[];
};
/**
 * planes_accion without action
 */
export type planes_accionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the planes_accion
     */
    select?: Prisma.planes_accionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the planes_accion
     */
    omit?: Prisma.planes_accionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.planes_accionInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=planes_accion.d.ts.map