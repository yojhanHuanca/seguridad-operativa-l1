import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model actividades_plan
 *
 */
export type actividades_planModel = runtime.Types.Result.DefaultSelection<Prisma.$actividades_planPayload>;
export type AggregateActividades_plan = {
    _count: Actividades_planCountAggregateOutputType | null;
    _avg: Actividades_planAvgAggregateOutputType | null;
    _sum: Actividades_planSumAggregateOutputType | null;
    _min: Actividades_planMinAggregateOutputType | null;
    _max: Actividades_planMaxAggregateOutputType | null;
};
export type Actividades_planAvgAggregateOutputType = {
    id_actividad: number | null;
    id_plan: number | null;
    responsable: number | null;
    porcentaje: runtime.Decimal | null;
    estado: number | null;
};
export type Actividades_planSumAggregateOutputType = {
    id_actividad: number | null;
    id_plan: number | null;
    responsable: number | null;
    porcentaje: runtime.Decimal | null;
    estado: number | null;
};
export type Actividades_planMinAggregateOutputType = {
    id_actividad: number | null;
    id_plan: number | null;
    descripcion: string | null;
    responsable: number | null;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    porcentaje: runtime.Decimal | null;
    estado: number | null;
    created_at: Date | null;
};
export type Actividades_planMaxAggregateOutputType = {
    id_actividad: number | null;
    id_plan: number | null;
    descripcion: string | null;
    responsable: number | null;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    porcentaje: runtime.Decimal | null;
    estado: number | null;
    created_at: Date | null;
};
export type Actividades_planCountAggregateOutputType = {
    id_actividad: number;
    id_plan: number;
    descripcion: number;
    responsable: number;
    fecha_inicio: number;
    fecha_fin: number;
    porcentaje: number;
    estado: number;
    created_at: number;
    _all: number;
};
export type Actividades_planAvgAggregateInputType = {
    id_actividad?: true;
    id_plan?: true;
    responsable?: true;
    porcentaje?: true;
    estado?: true;
};
export type Actividades_planSumAggregateInputType = {
    id_actividad?: true;
    id_plan?: true;
    responsable?: true;
    porcentaje?: true;
    estado?: true;
};
export type Actividades_planMinAggregateInputType = {
    id_actividad?: true;
    id_plan?: true;
    descripcion?: true;
    responsable?: true;
    fecha_inicio?: true;
    fecha_fin?: true;
    porcentaje?: true;
    estado?: true;
    created_at?: true;
};
export type Actividades_planMaxAggregateInputType = {
    id_actividad?: true;
    id_plan?: true;
    descripcion?: true;
    responsable?: true;
    fecha_inicio?: true;
    fecha_fin?: true;
    porcentaje?: true;
    estado?: true;
    created_at?: true;
};
export type Actividades_planCountAggregateInputType = {
    id_actividad?: true;
    id_plan?: true;
    descripcion?: true;
    responsable?: true;
    fecha_inicio?: true;
    fecha_fin?: true;
    porcentaje?: true;
    estado?: true;
    created_at?: true;
    _all?: true;
};
export type Actividades_planAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which actividades_plan to aggregate.
     */
    where?: Prisma.actividades_planWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of actividades_plans to fetch.
     */
    orderBy?: Prisma.actividades_planOrderByWithRelationInput | Prisma.actividades_planOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.actividades_planWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` actividades_plans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` actividades_plans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned actividades_plans
    **/
    _count?: true | Actividades_planCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Actividades_planAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Actividades_planSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Actividades_planMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Actividades_planMaxAggregateInputType;
};
export type GetActividades_planAggregateType<T extends Actividades_planAggregateArgs> = {
    [P in keyof T & keyof AggregateActividades_plan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateActividades_plan[P]> : Prisma.GetScalarType<T[P], AggregateActividades_plan[P]>;
};
export type actividades_planGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.actividades_planWhereInput;
    orderBy?: Prisma.actividades_planOrderByWithAggregationInput | Prisma.actividades_planOrderByWithAggregationInput[];
    by: Prisma.Actividades_planScalarFieldEnum[] | Prisma.Actividades_planScalarFieldEnum;
    having?: Prisma.actividades_planScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Actividades_planCountAggregateInputType | true;
    _avg?: Actividades_planAvgAggregateInputType;
    _sum?: Actividades_planSumAggregateInputType;
    _min?: Actividades_planMinAggregateInputType;
    _max?: Actividades_planMaxAggregateInputType;
};
export type Actividades_planGroupByOutputType = {
    id_actividad: number;
    id_plan: number;
    descripcion: string;
    responsable: number | null;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    porcentaje: runtime.Decimal | null;
    estado: number | null;
    created_at: Date | null;
    _count: Actividades_planCountAggregateOutputType | null;
    _avg: Actividades_planAvgAggregateOutputType | null;
    _sum: Actividades_planSumAggregateOutputType | null;
    _min: Actividades_planMinAggregateOutputType | null;
    _max: Actividades_planMaxAggregateOutputType | null;
};
type GetActividades_planGroupByPayload<T extends actividades_planGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Actividades_planGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Actividades_planGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Actividades_planGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Actividades_planGroupByOutputType[P]>;
}>>;
export type actividades_planWhereInput = {
    AND?: Prisma.actividades_planWhereInput | Prisma.actividades_planWhereInput[];
    OR?: Prisma.actividades_planWhereInput[];
    NOT?: Prisma.actividades_planWhereInput | Prisma.actividades_planWhereInput[];
    id_actividad?: Prisma.IntFilter<"actividades_plan"> | number;
    id_plan?: Prisma.IntFilter<"actividades_plan"> | number;
    descripcion?: Prisma.StringFilter<"actividades_plan"> | string;
    responsable?: Prisma.IntNullableFilter<"actividades_plan"> | number | null;
    fecha_inicio?: Prisma.DateTimeNullableFilter<"actividades_plan"> | Date | string | null;
    fecha_fin?: Prisma.DateTimeNullableFilter<"actividades_plan"> | Date | string | null;
    porcentaje?: Prisma.DecimalNullableFilter<"actividades_plan"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.IntNullableFilter<"actividades_plan"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"actividades_plan"> | Date | string | null;
    planes_accion?: Prisma.XOR<Prisma.Planes_accionScalarRelationFilter, Prisma.planes_accionWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    catalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    seguimientos?: Prisma.SeguimientosListRelationFilter;
};
export type actividades_planOrderByWithRelationInput = {
    id_actividad?: Prisma.SortOrder;
    id_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrderInput | Prisma.SortOrder;
    porcentaje?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    planes_accion?: Prisma.planes_accionOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
    catalogo_detalle?: Prisma.catalogo_detalleOrderByWithRelationInput;
    seguimientos?: Prisma.seguimientosOrderByRelationAggregateInput;
};
export type actividades_planWhereUniqueInput = Prisma.AtLeast<{
    id_actividad?: number;
    AND?: Prisma.actividades_planWhereInput | Prisma.actividades_planWhereInput[];
    OR?: Prisma.actividades_planWhereInput[];
    NOT?: Prisma.actividades_planWhereInput | Prisma.actividades_planWhereInput[];
    id_plan?: Prisma.IntFilter<"actividades_plan"> | number;
    descripcion?: Prisma.StringFilter<"actividades_plan"> | string;
    responsable?: Prisma.IntNullableFilter<"actividades_plan"> | number | null;
    fecha_inicio?: Prisma.DateTimeNullableFilter<"actividades_plan"> | Date | string | null;
    fecha_fin?: Prisma.DateTimeNullableFilter<"actividades_plan"> | Date | string | null;
    porcentaje?: Prisma.DecimalNullableFilter<"actividades_plan"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.IntNullableFilter<"actividades_plan"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"actividades_plan"> | Date | string | null;
    planes_accion?: Prisma.XOR<Prisma.Planes_accionScalarRelationFilter, Prisma.planes_accionWhereInput>;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    catalogo_detalle?: Prisma.XOR<Prisma.Catalogo_detalleNullableScalarRelationFilter, Prisma.catalogo_detalleWhereInput> | null;
    seguimientos?: Prisma.SeguimientosListRelationFilter;
}, "id_actividad">;
export type actividades_planOrderByWithAggregationInput = {
    id_actividad?: Prisma.SortOrder;
    id_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrderInput | Prisma.SortOrder;
    porcentaje?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.actividades_planCountOrderByAggregateInput;
    _avg?: Prisma.actividades_planAvgOrderByAggregateInput;
    _max?: Prisma.actividades_planMaxOrderByAggregateInput;
    _min?: Prisma.actividades_planMinOrderByAggregateInput;
    _sum?: Prisma.actividades_planSumOrderByAggregateInput;
};
export type actividades_planScalarWhereWithAggregatesInput = {
    AND?: Prisma.actividades_planScalarWhereWithAggregatesInput | Prisma.actividades_planScalarWhereWithAggregatesInput[];
    OR?: Prisma.actividades_planScalarWhereWithAggregatesInput[];
    NOT?: Prisma.actividades_planScalarWhereWithAggregatesInput | Prisma.actividades_planScalarWhereWithAggregatesInput[];
    id_actividad?: Prisma.IntWithAggregatesFilter<"actividades_plan"> | number;
    id_plan?: Prisma.IntWithAggregatesFilter<"actividades_plan"> | number;
    descripcion?: Prisma.StringWithAggregatesFilter<"actividades_plan"> | string;
    responsable?: Prisma.IntNullableWithAggregatesFilter<"actividades_plan"> | number | null;
    fecha_inicio?: Prisma.DateTimeNullableWithAggregatesFilter<"actividades_plan"> | Date | string | null;
    fecha_fin?: Prisma.DateTimeNullableWithAggregatesFilter<"actividades_plan"> | Date | string | null;
    porcentaje?: Prisma.DecimalNullableWithAggregatesFilter<"actividades_plan"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.IntNullableWithAggregatesFilter<"actividades_plan"> | number | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"actividades_plan"> | Date | string | null;
};
export type actividades_planCreateInput = {
    descripcion: string;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
    planes_accion: Prisma.planes_accionCreateNestedOneWithoutActividades_planInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutActividades_planInput;
    catalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutActividades_planInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutActividades_planInput;
};
export type actividades_planUncheckedCreateInput = {
    id_actividad?: number;
    id_plan: number;
    descripcion: string;
    responsable?: number | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: number | null;
    created_at?: Date | string | null;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutActividades_planInput;
};
export type actividades_planUpdateInput = {
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    planes_accion?: Prisma.planes_accionUpdateOneRequiredWithoutActividades_planNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutActividades_planNestedInput;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutActividades_planNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutActividades_planNestedInput;
};
export type actividades_planUncheckedUpdateInput = {
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutActividades_planNestedInput;
};
export type actividades_planCreateManyInput = {
    id_actividad?: number;
    id_plan: number;
    descripcion: string;
    responsable?: number | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: number | null;
    created_at?: Date | string | null;
};
export type actividades_planUpdateManyMutationInput = {
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type actividades_planUncheckedUpdateManyInput = {
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type actividades_planCountOrderByAggregateInput = {
    id_actividad?: Prisma.SortOrder;
    id_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type actividades_planAvgOrderByAggregateInput = {
    id_actividad?: Prisma.SortOrder;
    id_plan?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
};
export type actividades_planMaxOrderByAggregateInput = {
    id_actividad?: Prisma.SortOrder;
    id_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type actividades_planMinOrderByAggregateInput = {
    id_actividad?: Prisma.SortOrder;
    id_plan?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    fecha_fin?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type actividades_planSumOrderByAggregateInput = {
    id_actividad?: Prisma.SortOrder;
    id_plan?: Prisma.SortOrder;
    responsable?: Prisma.SortOrder;
    porcentaje?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
};
export type Actividades_planListRelationFilter = {
    every?: Prisma.actividades_planWhereInput;
    some?: Prisma.actividades_planWhereInput;
    none?: Prisma.actividades_planWhereInput;
};
export type actividades_planOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type Actividades_planScalarRelationFilter = {
    is?: Prisma.actividades_planWhereInput;
    isNot?: Prisma.actividades_planWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type actividades_planCreateNestedManyWithoutCatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutCatalogo_detalleInput, Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput> | Prisma.actividades_planCreateWithoutCatalogo_detalleInput[] | Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutCatalogo_detalleInput | Prisma.actividades_planCreateOrConnectWithoutCatalogo_detalleInput[];
    createMany?: Prisma.actividades_planCreateManyCatalogo_detalleInputEnvelope;
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
};
export type actividades_planUncheckedCreateNestedManyWithoutCatalogo_detalleInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutCatalogo_detalleInput, Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput> | Prisma.actividades_planCreateWithoutCatalogo_detalleInput[] | Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutCatalogo_detalleInput | Prisma.actividades_planCreateOrConnectWithoutCatalogo_detalleInput[];
    createMany?: Prisma.actividades_planCreateManyCatalogo_detalleInputEnvelope;
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
};
export type actividades_planUpdateManyWithoutCatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutCatalogo_detalleInput, Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput> | Prisma.actividades_planCreateWithoutCatalogo_detalleInput[] | Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutCatalogo_detalleInput | Prisma.actividades_planCreateOrConnectWithoutCatalogo_detalleInput[];
    upsert?: Prisma.actividades_planUpsertWithWhereUniqueWithoutCatalogo_detalleInput | Prisma.actividades_planUpsertWithWhereUniqueWithoutCatalogo_detalleInput[];
    createMany?: Prisma.actividades_planCreateManyCatalogo_detalleInputEnvelope;
    set?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    disconnect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    delete?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    update?: Prisma.actividades_planUpdateWithWhereUniqueWithoutCatalogo_detalleInput | Prisma.actividades_planUpdateWithWhereUniqueWithoutCatalogo_detalleInput[];
    updateMany?: Prisma.actividades_planUpdateManyWithWhereWithoutCatalogo_detalleInput | Prisma.actividades_planUpdateManyWithWhereWithoutCatalogo_detalleInput[];
    deleteMany?: Prisma.actividades_planScalarWhereInput | Prisma.actividades_planScalarWhereInput[];
};
export type actividades_planUncheckedUpdateManyWithoutCatalogo_detalleNestedInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutCatalogo_detalleInput, Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput> | Prisma.actividades_planCreateWithoutCatalogo_detalleInput[] | Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutCatalogo_detalleInput | Prisma.actividades_planCreateOrConnectWithoutCatalogo_detalleInput[];
    upsert?: Prisma.actividades_planUpsertWithWhereUniqueWithoutCatalogo_detalleInput | Prisma.actividades_planUpsertWithWhereUniqueWithoutCatalogo_detalleInput[];
    createMany?: Prisma.actividades_planCreateManyCatalogo_detalleInputEnvelope;
    set?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    disconnect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    delete?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    update?: Prisma.actividades_planUpdateWithWhereUniqueWithoutCatalogo_detalleInput | Prisma.actividades_planUpdateWithWhereUniqueWithoutCatalogo_detalleInput[];
    updateMany?: Prisma.actividades_planUpdateManyWithWhereWithoutCatalogo_detalleInput | Prisma.actividades_planUpdateManyWithWhereWithoutCatalogo_detalleInput[];
    deleteMany?: Prisma.actividades_planScalarWhereInput | Prisma.actividades_planScalarWhereInput[];
};
export type actividades_planCreateNestedManyWithoutPlanes_accionInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutPlanes_accionInput, Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput> | Prisma.actividades_planCreateWithoutPlanes_accionInput[] | Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutPlanes_accionInput | Prisma.actividades_planCreateOrConnectWithoutPlanes_accionInput[];
    createMany?: Prisma.actividades_planCreateManyPlanes_accionInputEnvelope;
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
};
export type actividades_planUncheckedCreateNestedManyWithoutPlanes_accionInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutPlanes_accionInput, Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput> | Prisma.actividades_planCreateWithoutPlanes_accionInput[] | Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutPlanes_accionInput | Prisma.actividades_planCreateOrConnectWithoutPlanes_accionInput[];
    createMany?: Prisma.actividades_planCreateManyPlanes_accionInputEnvelope;
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
};
export type actividades_planUpdateManyWithoutPlanes_accionNestedInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutPlanes_accionInput, Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput> | Prisma.actividades_planCreateWithoutPlanes_accionInput[] | Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutPlanes_accionInput | Prisma.actividades_planCreateOrConnectWithoutPlanes_accionInput[];
    upsert?: Prisma.actividades_planUpsertWithWhereUniqueWithoutPlanes_accionInput | Prisma.actividades_planUpsertWithWhereUniqueWithoutPlanes_accionInput[];
    createMany?: Prisma.actividades_planCreateManyPlanes_accionInputEnvelope;
    set?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    disconnect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    delete?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    update?: Prisma.actividades_planUpdateWithWhereUniqueWithoutPlanes_accionInput | Prisma.actividades_planUpdateWithWhereUniqueWithoutPlanes_accionInput[];
    updateMany?: Prisma.actividades_planUpdateManyWithWhereWithoutPlanes_accionInput | Prisma.actividades_planUpdateManyWithWhereWithoutPlanes_accionInput[];
    deleteMany?: Prisma.actividades_planScalarWhereInput | Prisma.actividades_planScalarWhereInput[];
};
export type actividades_planUncheckedUpdateManyWithoutPlanes_accionNestedInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutPlanes_accionInput, Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput> | Prisma.actividades_planCreateWithoutPlanes_accionInput[] | Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutPlanes_accionInput | Prisma.actividades_planCreateOrConnectWithoutPlanes_accionInput[];
    upsert?: Prisma.actividades_planUpsertWithWhereUniqueWithoutPlanes_accionInput | Prisma.actividades_planUpsertWithWhereUniqueWithoutPlanes_accionInput[];
    createMany?: Prisma.actividades_planCreateManyPlanes_accionInputEnvelope;
    set?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    disconnect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    delete?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    update?: Prisma.actividades_planUpdateWithWhereUniqueWithoutPlanes_accionInput | Prisma.actividades_planUpdateWithWhereUniqueWithoutPlanes_accionInput[];
    updateMany?: Prisma.actividades_planUpdateManyWithWhereWithoutPlanes_accionInput | Prisma.actividades_planUpdateManyWithWhereWithoutPlanes_accionInput[];
    deleteMany?: Prisma.actividades_planScalarWhereInput | Prisma.actividades_planScalarWhereInput[];
};
export type actividades_planCreateNestedOneWithoutSeguimientosInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutSeguimientosInput, Prisma.actividades_planUncheckedCreateWithoutSeguimientosInput>;
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutSeguimientosInput;
    connect?: Prisma.actividades_planWhereUniqueInput;
};
export type actividades_planUpdateOneRequiredWithoutSeguimientosNestedInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutSeguimientosInput, Prisma.actividades_planUncheckedCreateWithoutSeguimientosInput>;
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutSeguimientosInput;
    upsert?: Prisma.actividades_planUpsertWithoutSeguimientosInput;
    connect?: Prisma.actividades_planWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.actividades_planUpdateToOneWithWhereWithoutSeguimientosInput, Prisma.actividades_planUpdateWithoutSeguimientosInput>, Prisma.actividades_planUncheckedUpdateWithoutSeguimientosInput>;
};
export type actividades_planCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutUsuariosInput, Prisma.actividades_planUncheckedCreateWithoutUsuariosInput> | Prisma.actividades_planCreateWithoutUsuariosInput[] | Prisma.actividades_planUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutUsuariosInput | Prisma.actividades_planCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.actividades_planCreateManyUsuariosInputEnvelope;
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
};
export type actividades_planUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutUsuariosInput, Prisma.actividades_planUncheckedCreateWithoutUsuariosInput> | Prisma.actividades_planCreateWithoutUsuariosInput[] | Prisma.actividades_planUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutUsuariosInput | Prisma.actividades_planCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.actividades_planCreateManyUsuariosInputEnvelope;
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
};
export type actividades_planUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutUsuariosInput, Prisma.actividades_planUncheckedCreateWithoutUsuariosInput> | Prisma.actividades_planCreateWithoutUsuariosInput[] | Prisma.actividades_planUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutUsuariosInput | Prisma.actividades_planCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.actividades_planUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.actividades_planUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.actividades_planCreateManyUsuariosInputEnvelope;
    set?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    disconnect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    delete?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    update?: Prisma.actividades_planUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.actividades_planUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.actividades_planUpdateManyWithWhereWithoutUsuariosInput | Prisma.actividades_planUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.actividades_planScalarWhereInput | Prisma.actividades_planScalarWhereInput[];
};
export type actividades_planUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.actividades_planCreateWithoutUsuariosInput, Prisma.actividades_planUncheckedCreateWithoutUsuariosInput> | Prisma.actividades_planCreateWithoutUsuariosInput[] | Prisma.actividades_planUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.actividades_planCreateOrConnectWithoutUsuariosInput | Prisma.actividades_planCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.actividades_planUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.actividades_planUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.actividades_planCreateManyUsuariosInputEnvelope;
    set?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    disconnect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    delete?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    connect?: Prisma.actividades_planWhereUniqueInput | Prisma.actividades_planWhereUniqueInput[];
    update?: Prisma.actividades_planUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.actividades_planUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.actividades_planUpdateManyWithWhereWithoutUsuariosInput | Prisma.actividades_planUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.actividades_planScalarWhereInput | Prisma.actividades_planScalarWhereInput[];
};
export type actividades_planCreateWithoutCatalogo_detalleInput = {
    descripcion: string;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
    planes_accion: Prisma.planes_accionCreateNestedOneWithoutActividades_planInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutActividades_planInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutActividades_planInput;
};
export type actividades_planUncheckedCreateWithoutCatalogo_detalleInput = {
    id_actividad?: number;
    id_plan: number;
    descripcion: string;
    responsable?: number | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutActividades_planInput;
};
export type actividades_planCreateOrConnectWithoutCatalogo_detalleInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    create: Prisma.XOR<Prisma.actividades_planCreateWithoutCatalogo_detalleInput, Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput>;
};
export type actividades_planCreateManyCatalogo_detalleInputEnvelope = {
    data: Prisma.actividades_planCreateManyCatalogo_detalleInput | Prisma.actividades_planCreateManyCatalogo_detalleInput[];
    skipDuplicates?: boolean;
};
export type actividades_planUpsertWithWhereUniqueWithoutCatalogo_detalleInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    update: Prisma.XOR<Prisma.actividades_planUpdateWithoutCatalogo_detalleInput, Prisma.actividades_planUncheckedUpdateWithoutCatalogo_detalleInput>;
    create: Prisma.XOR<Prisma.actividades_planCreateWithoutCatalogo_detalleInput, Prisma.actividades_planUncheckedCreateWithoutCatalogo_detalleInput>;
};
export type actividades_planUpdateWithWhereUniqueWithoutCatalogo_detalleInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    data: Prisma.XOR<Prisma.actividades_planUpdateWithoutCatalogo_detalleInput, Prisma.actividades_planUncheckedUpdateWithoutCatalogo_detalleInput>;
};
export type actividades_planUpdateManyWithWhereWithoutCatalogo_detalleInput = {
    where: Prisma.actividades_planScalarWhereInput;
    data: Prisma.XOR<Prisma.actividades_planUpdateManyMutationInput, Prisma.actividades_planUncheckedUpdateManyWithoutCatalogo_detalleInput>;
};
export type actividades_planScalarWhereInput = {
    AND?: Prisma.actividades_planScalarWhereInput | Prisma.actividades_planScalarWhereInput[];
    OR?: Prisma.actividades_planScalarWhereInput[];
    NOT?: Prisma.actividades_planScalarWhereInput | Prisma.actividades_planScalarWhereInput[];
    id_actividad?: Prisma.IntFilter<"actividades_plan"> | number;
    id_plan?: Prisma.IntFilter<"actividades_plan"> | number;
    descripcion?: Prisma.StringFilter<"actividades_plan"> | string;
    responsable?: Prisma.IntNullableFilter<"actividades_plan"> | number | null;
    fecha_inicio?: Prisma.DateTimeNullableFilter<"actividades_plan"> | Date | string | null;
    fecha_fin?: Prisma.DateTimeNullableFilter<"actividades_plan"> | Date | string | null;
    porcentaje?: Prisma.DecimalNullableFilter<"actividades_plan"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.IntNullableFilter<"actividades_plan"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"actividades_plan"> | Date | string | null;
};
export type actividades_planCreateWithoutPlanes_accionInput = {
    descripcion: string;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutActividades_planInput;
    catalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutActividades_planInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutActividades_planInput;
};
export type actividades_planUncheckedCreateWithoutPlanes_accionInput = {
    id_actividad?: number;
    descripcion: string;
    responsable?: number | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: number | null;
    created_at?: Date | string | null;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutActividades_planInput;
};
export type actividades_planCreateOrConnectWithoutPlanes_accionInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    create: Prisma.XOR<Prisma.actividades_planCreateWithoutPlanes_accionInput, Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput>;
};
export type actividades_planCreateManyPlanes_accionInputEnvelope = {
    data: Prisma.actividades_planCreateManyPlanes_accionInput | Prisma.actividades_planCreateManyPlanes_accionInput[];
    skipDuplicates?: boolean;
};
export type actividades_planUpsertWithWhereUniqueWithoutPlanes_accionInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    update: Prisma.XOR<Prisma.actividades_planUpdateWithoutPlanes_accionInput, Prisma.actividades_planUncheckedUpdateWithoutPlanes_accionInput>;
    create: Prisma.XOR<Prisma.actividades_planCreateWithoutPlanes_accionInput, Prisma.actividades_planUncheckedCreateWithoutPlanes_accionInput>;
};
export type actividades_planUpdateWithWhereUniqueWithoutPlanes_accionInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    data: Prisma.XOR<Prisma.actividades_planUpdateWithoutPlanes_accionInput, Prisma.actividades_planUncheckedUpdateWithoutPlanes_accionInput>;
};
export type actividades_planUpdateManyWithWhereWithoutPlanes_accionInput = {
    where: Prisma.actividades_planScalarWhereInput;
    data: Prisma.XOR<Prisma.actividades_planUpdateManyMutationInput, Prisma.actividades_planUncheckedUpdateManyWithoutPlanes_accionInput>;
};
export type actividades_planCreateWithoutSeguimientosInput = {
    descripcion: string;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
    planes_accion: Prisma.planes_accionCreateNestedOneWithoutActividades_planInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutActividades_planInput;
    catalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutActividades_planInput;
};
export type actividades_planUncheckedCreateWithoutSeguimientosInput = {
    id_actividad?: number;
    id_plan: number;
    descripcion: string;
    responsable?: number | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: number | null;
    created_at?: Date | string | null;
};
export type actividades_planCreateOrConnectWithoutSeguimientosInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    create: Prisma.XOR<Prisma.actividades_planCreateWithoutSeguimientosInput, Prisma.actividades_planUncheckedCreateWithoutSeguimientosInput>;
};
export type actividades_planUpsertWithoutSeguimientosInput = {
    update: Prisma.XOR<Prisma.actividades_planUpdateWithoutSeguimientosInput, Prisma.actividades_planUncheckedUpdateWithoutSeguimientosInput>;
    create: Prisma.XOR<Prisma.actividades_planCreateWithoutSeguimientosInput, Prisma.actividades_planUncheckedCreateWithoutSeguimientosInput>;
    where?: Prisma.actividades_planWhereInput;
};
export type actividades_planUpdateToOneWithWhereWithoutSeguimientosInput = {
    where?: Prisma.actividades_planWhereInput;
    data: Prisma.XOR<Prisma.actividades_planUpdateWithoutSeguimientosInput, Prisma.actividades_planUncheckedUpdateWithoutSeguimientosInput>;
};
export type actividades_planUpdateWithoutSeguimientosInput = {
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    planes_accion?: Prisma.planes_accionUpdateOneRequiredWithoutActividades_planNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutActividades_planNestedInput;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutActividades_planNestedInput;
};
export type actividades_planUncheckedUpdateWithoutSeguimientosInput = {
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type actividades_planCreateWithoutUsuariosInput = {
    descripcion: string;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
    planes_accion: Prisma.planes_accionCreateNestedOneWithoutActividades_planInput;
    catalogo_detalle?: Prisma.catalogo_detalleCreateNestedOneWithoutActividades_planInput;
    seguimientos?: Prisma.seguimientosCreateNestedManyWithoutActividades_planInput;
};
export type actividades_planUncheckedCreateWithoutUsuariosInput = {
    id_actividad?: number;
    id_plan: number;
    descripcion: string;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: number | null;
    created_at?: Date | string | null;
    seguimientos?: Prisma.seguimientosUncheckedCreateNestedManyWithoutActividades_planInput;
};
export type actividades_planCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    create: Prisma.XOR<Prisma.actividades_planCreateWithoutUsuariosInput, Prisma.actividades_planUncheckedCreateWithoutUsuariosInput>;
};
export type actividades_planCreateManyUsuariosInputEnvelope = {
    data: Prisma.actividades_planCreateManyUsuariosInput | Prisma.actividades_planCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type actividades_planUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    update: Prisma.XOR<Prisma.actividades_planUpdateWithoutUsuariosInput, Prisma.actividades_planUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.actividades_planCreateWithoutUsuariosInput, Prisma.actividades_planUncheckedCreateWithoutUsuariosInput>;
};
export type actividades_planUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.actividades_planWhereUniqueInput;
    data: Prisma.XOR<Prisma.actividades_planUpdateWithoutUsuariosInput, Prisma.actividades_planUncheckedUpdateWithoutUsuariosInput>;
};
export type actividades_planUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.actividades_planScalarWhereInput;
    data: Prisma.XOR<Prisma.actividades_planUpdateManyMutationInput, Prisma.actividades_planUncheckedUpdateManyWithoutUsuariosInput>;
};
export type actividades_planCreateManyCatalogo_detalleInput = {
    id_actividad?: number;
    id_plan: number;
    descripcion: string;
    responsable?: number | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
};
export type actividades_planUpdateWithoutCatalogo_detalleInput = {
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    planes_accion?: Prisma.planes_accionUpdateOneRequiredWithoutActividades_planNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutActividades_planNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutActividades_planNestedInput;
};
export type actividades_planUncheckedUpdateWithoutCatalogo_detalleInput = {
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutActividades_planNestedInput;
};
export type actividades_planUncheckedUpdateManyWithoutCatalogo_detalleInput = {
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type actividades_planCreateManyPlanes_accionInput = {
    id_actividad?: number;
    descripcion: string;
    responsable?: number | null;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: number | null;
    created_at?: Date | string | null;
};
export type actividades_planUpdateWithoutPlanes_accionInput = {
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuarios?: Prisma.usuariosUpdateOneWithoutActividades_planNestedInput;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutActividades_planNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutActividades_planNestedInput;
};
export type actividades_planUncheckedUpdateWithoutPlanes_accionInput = {
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutActividades_planNestedInput;
};
export type actividades_planUncheckedUpdateManyWithoutPlanes_accionInput = {
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    responsable?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type actividades_planCreateManyUsuariosInput = {
    id_actividad?: number;
    id_plan: number;
    descripcion: string;
    fecha_inicio?: Date | string | null;
    fecha_fin?: Date | string | null;
    porcentaje?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: number | null;
    created_at?: Date | string | null;
};
export type actividades_planUpdateWithoutUsuariosInput = {
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    planes_accion?: Prisma.planes_accionUpdateOneRequiredWithoutActividades_planNestedInput;
    catalogo_detalle?: Prisma.catalogo_detalleUpdateOneWithoutActividades_planNestedInput;
    seguimientos?: Prisma.seguimientosUpdateManyWithoutActividades_planNestedInput;
};
export type actividades_planUncheckedUpdateWithoutUsuariosInput = {
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    seguimientos?: Prisma.seguimientosUncheckedUpdateManyWithoutActividades_planNestedInput;
};
export type actividades_planUncheckedUpdateManyWithoutUsuariosInput = {
    id_actividad?: Prisma.IntFieldUpdateOperationsInput | number;
    id_plan?: Prisma.IntFieldUpdateOperationsInput | number;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_fin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    porcentaje?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    estado?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type Actividades_planCountOutputType
 */
export type Actividades_planCountOutputType = {
    seguimientos: number;
};
export type Actividades_planCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    seguimientos?: boolean | Actividades_planCountOutputTypeCountSeguimientosArgs;
};
/**
 * Actividades_planCountOutputType without action
 */
export type Actividades_planCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividades_planCountOutputType
     */
    select?: Prisma.Actividades_planCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * Actividades_planCountOutputType without action
 */
export type Actividades_planCountOutputTypeCountSeguimientosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.seguimientosWhereInput;
};
export type actividades_planSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_actividad?: boolean;
    id_plan?: boolean;
    descripcion?: boolean;
    responsable?: boolean;
    fecha_inicio?: boolean;
    fecha_fin?: boolean;
    porcentaje?: boolean;
    estado?: boolean;
    created_at?: boolean;
    planes_accion?: boolean | Prisma.planes_accionDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.actividades_plan$usuariosArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.actividades_plan$catalogo_detalleArgs<ExtArgs>;
    seguimientos?: boolean | Prisma.actividades_plan$seguimientosArgs<ExtArgs>;
    _count?: boolean | Prisma.Actividades_planCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["actividades_plan"]>;
export type actividades_planSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_actividad?: boolean;
    id_plan?: boolean;
    descripcion?: boolean;
    responsable?: boolean;
    fecha_inicio?: boolean;
    fecha_fin?: boolean;
    porcentaje?: boolean;
    estado?: boolean;
    created_at?: boolean;
    planes_accion?: boolean | Prisma.planes_accionDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.actividades_plan$usuariosArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.actividades_plan$catalogo_detalleArgs<ExtArgs>;
}, ExtArgs["result"]["actividades_plan"]>;
export type actividades_planSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_actividad?: boolean;
    id_plan?: boolean;
    descripcion?: boolean;
    responsable?: boolean;
    fecha_inicio?: boolean;
    fecha_fin?: boolean;
    porcentaje?: boolean;
    estado?: boolean;
    created_at?: boolean;
    planes_accion?: boolean | Prisma.planes_accionDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.actividades_plan$usuariosArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.actividades_plan$catalogo_detalleArgs<ExtArgs>;
}, ExtArgs["result"]["actividades_plan"]>;
export type actividades_planSelectScalar = {
    id_actividad?: boolean;
    id_plan?: boolean;
    descripcion?: boolean;
    responsable?: boolean;
    fecha_inicio?: boolean;
    fecha_fin?: boolean;
    porcentaje?: boolean;
    estado?: boolean;
    created_at?: boolean;
};
export type actividades_planOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_actividad" | "id_plan" | "descripcion" | "responsable" | "fecha_inicio" | "fecha_fin" | "porcentaje" | "estado" | "created_at", ExtArgs["result"]["actividades_plan"]>;
export type actividades_planInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    planes_accion?: boolean | Prisma.planes_accionDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.actividades_plan$usuariosArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.actividades_plan$catalogo_detalleArgs<ExtArgs>;
    seguimientos?: boolean | Prisma.actividades_plan$seguimientosArgs<ExtArgs>;
    _count?: boolean | Prisma.Actividades_planCountOutputTypeDefaultArgs<ExtArgs>;
};
export type actividades_planIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    planes_accion?: boolean | Prisma.planes_accionDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.actividades_plan$usuariosArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.actividades_plan$catalogo_detalleArgs<ExtArgs>;
};
export type actividades_planIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    planes_accion?: boolean | Prisma.planes_accionDefaultArgs<ExtArgs>;
    usuarios?: boolean | Prisma.actividades_plan$usuariosArgs<ExtArgs>;
    catalogo_detalle?: boolean | Prisma.actividades_plan$catalogo_detalleArgs<ExtArgs>;
};
export type $actividades_planPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "actividades_plan";
    objects: {
        planes_accion: Prisma.$planes_accionPayload<ExtArgs>;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
        catalogo_detalle: Prisma.$catalogo_detallePayload<ExtArgs> | null;
        seguimientos: Prisma.$seguimientosPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_actividad: number;
        id_plan: number;
        descripcion: string;
        responsable: number | null;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        porcentaje: runtime.Decimal | null;
        estado: number | null;
        created_at: Date | null;
    }, ExtArgs["result"]["actividades_plan"]>;
    composites: {};
};
export type actividades_planGetPayload<S extends boolean | null | undefined | actividades_planDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$actividades_planPayload, S>;
export type actividades_planCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<actividades_planFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Actividades_planCountAggregateInputType | true;
};
export interface actividades_planDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['actividades_plan'];
        meta: {
            name: 'actividades_plan';
        };
    };
    /**
     * Find zero or one Actividades_plan that matches the filter.
     * @param {actividades_planFindUniqueArgs} args - Arguments to find a Actividades_plan
     * @example
     * // Get one Actividades_plan
     * const actividades_plan = await prisma.actividades_plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends actividades_planFindUniqueArgs>(args: Prisma.SelectSubset<T, actividades_planFindUniqueArgs<ExtArgs>>): Prisma.Prisma__actividades_planClient<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Actividades_plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {actividades_planFindUniqueOrThrowArgs} args - Arguments to find a Actividades_plan
     * @example
     * // Get one Actividades_plan
     * const actividades_plan = await prisma.actividades_plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends actividades_planFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, actividades_planFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__actividades_planClient<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Actividades_plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {actividades_planFindFirstArgs} args - Arguments to find a Actividades_plan
     * @example
     * // Get one Actividades_plan
     * const actividades_plan = await prisma.actividades_plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends actividades_planFindFirstArgs>(args?: Prisma.SelectSubset<T, actividades_planFindFirstArgs<ExtArgs>>): Prisma.Prisma__actividades_planClient<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Actividades_plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {actividades_planFindFirstOrThrowArgs} args - Arguments to find a Actividades_plan
     * @example
     * // Get one Actividades_plan
     * const actividades_plan = await prisma.actividades_plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends actividades_planFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, actividades_planFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__actividades_planClient<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Actividades_plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {actividades_planFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Actividades_plans
     * const actividades_plans = await prisma.actividades_plan.findMany()
     *
     * // Get first 10 Actividades_plans
     * const actividades_plans = await prisma.actividades_plan.findMany({ take: 10 })
     *
     * // Only select the `id_actividad`
     * const actividades_planWithId_actividadOnly = await prisma.actividades_plan.findMany({ select: { id_actividad: true } })
     *
     */
    findMany<T extends actividades_planFindManyArgs>(args?: Prisma.SelectSubset<T, actividades_planFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Actividades_plan.
     * @param {actividades_planCreateArgs} args - Arguments to create a Actividades_plan.
     * @example
     * // Create one Actividades_plan
     * const Actividades_plan = await prisma.actividades_plan.create({
     *   data: {
     *     // ... data to create a Actividades_plan
     *   }
     * })
     *
     */
    create<T extends actividades_planCreateArgs>(args: Prisma.SelectSubset<T, actividades_planCreateArgs<ExtArgs>>): Prisma.Prisma__actividades_planClient<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Actividades_plans.
     * @param {actividades_planCreateManyArgs} args - Arguments to create many Actividades_plans.
     * @example
     * // Create many Actividades_plans
     * const actividades_plan = await prisma.actividades_plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends actividades_planCreateManyArgs>(args?: Prisma.SelectSubset<T, actividades_planCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Actividades_plans and returns the data saved in the database.
     * @param {actividades_planCreateManyAndReturnArgs} args - Arguments to create many Actividades_plans.
     * @example
     * // Create many Actividades_plans
     * const actividades_plan = await prisma.actividades_plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Actividades_plans and only return the `id_actividad`
     * const actividades_planWithId_actividadOnly = await prisma.actividades_plan.createManyAndReturn({
     *   select: { id_actividad: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends actividades_planCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, actividades_planCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Actividades_plan.
     * @param {actividades_planDeleteArgs} args - Arguments to delete one Actividades_plan.
     * @example
     * // Delete one Actividades_plan
     * const Actividades_plan = await prisma.actividades_plan.delete({
     *   where: {
     *     // ... filter to delete one Actividades_plan
     *   }
     * })
     *
     */
    delete<T extends actividades_planDeleteArgs>(args: Prisma.SelectSubset<T, actividades_planDeleteArgs<ExtArgs>>): Prisma.Prisma__actividades_planClient<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Actividades_plan.
     * @param {actividades_planUpdateArgs} args - Arguments to update one Actividades_plan.
     * @example
     * // Update one Actividades_plan
     * const actividades_plan = await prisma.actividades_plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends actividades_planUpdateArgs>(args: Prisma.SelectSubset<T, actividades_planUpdateArgs<ExtArgs>>): Prisma.Prisma__actividades_planClient<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Actividades_plans.
     * @param {actividades_planDeleteManyArgs} args - Arguments to filter Actividades_plans to delete.
     * @example
     * // Delete a few Actividades_plans
     * const { count } = await prisma.actividades_plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends actividades_planDeleteManyArgs>(args?: Prisma.SelectSubset<T, actividades_planDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Actividades_plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {actividades_planUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Actividades_plans
     * const actividades_plan = await prisma.actividades_plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends actividades_planUpdateManyArgs>(args: Prisma.SelectSubset<T, actividades_planUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Actividades_plans and returns the data updated in the database.
     * @param {actividades_planUpdateManyAndReturnArgs} args - Arguments to update many Actividades_plans.
     * @example
     * // Update many Actividades_plans
     * const actividades_plan = await prisma.actividades_plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Actividades_plans and only return the `id_actividad`
     * const actividades_planWithId_actividadOnly = await prisma.actividades_plan.updateManyAndReturn({
     *   select: { id_actividad: true },
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
    updateManyAndReturn<T extends actividades_planUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, actividades_planUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Actividades_plan.
     * @param {actividades_planUpsertArgs} args - Arguments to update or create a Actividades_plan.
     * @example
     * // Update or create a Actividades_plan
     * const actividades_plan = await prisma.actividades_plan.upsert({
     *   create: {
     *     // ... data to create a Actividades_plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Actividades_plan we want to update
     *   }
     * })
     */
    upsert<T extends actividades_planUpsertArgs>(args: Prisma.SelectSubset<T, actividades_planUpsertArgs<ExtArgs>>): Prisma.Prisma__actividades_planClient<runtime.Types.Result.GetResult<Prisma.$actividades_planPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Actividades_plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {actividades_planCountArgs} args - Arguments to filter Actividades_plans to count.
     * @example
     * // Count the number of Actividades_plans
     * const count = await prisma.actividades_plan.count({
     *   where: {
     *     // ... the filter for the Actividades_plans we want to count
     *   }
     * })
    **/
    count<T extends actividades_planCountArgs>(args?: Prisma.Subset<T, actividades_planCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Actividades_planCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Actividades_plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Actividades_planAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Actividades_planAggregateArgs>(args: Prisma.Subset<T, Actividades_planAggregateArgs>): Prisma.PrismaPromise<GetActividades_planAggregateType<T>>;
    /**
     * Group by Actividades_plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {actividades_planGroupByArgs} args - Group by arguments.
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
    groupBy<T extends actividades_planGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: actividades_planGroupByArgs['orderBy'];
    } : {
        orderBy?: actividades_planGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, actividades_planGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActividades_planGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the actividades_plan model
     */
    readonly fields: actividades_planFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for actividades_plan.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__actividades_planClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    planes_accion<T extends Prisma.planes_accionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.planes_accionDefaultArgs<ExtArgs>>): Prisma.Prisma__planes_accionClient<runtime.Types.Result.GetResult<Prisma.$planes_accionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.actividades_plan$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.actividades_plan$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    catalogo_detalle<T extends Prisma.actividades_plan$catalogo_detalleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.actividades_plan$catalogo_detalleArgs<ExtArgs>>): Prisma.Prisma__catalogo_detalleClient<runtime.Types.Result.GetResult<Prisma.$catalogo_detallePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    seguimientos<T extends Prisma.actividades_plan$seguimientosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.actividades_plan$seguimientosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$seguimientosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the actividades_plan model
 */
export interface actividades_planFieldRefs {
    readonly id_actividad: Prisma.FieldRef<"actividades_plan", 'Int'>;
    readonly id_plan: Prisma.FieldRef<"actividades_plan", 'Int'>;
    readonly descripcion: Prisma.FieldRef<"actividades_plan", 'String'>;
    readonly responsable: Prisma.FieldRef<"actividades_plan", 'Int'>;
    readonly fecha_inicio: Prisma.FieldRef<"actividades_plan", 'DateTime'>;
    readonly fecha_fin: Prisma.FieldRef<"actividades_plan", 'DateTime'>;
    readonly porcentaje: Prisma.FieldRef<"actividades_plan", 'Decimal'>;
    readonly estado: Prisma.FieldRef<"actividades_plan", 'Int'>;
    readonly created_at: Prisma.FieldRef<"actividades_plan", 'DateTime'>;
}
/**
 * actividades_plan findUnique
 */
export type actividades_planFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which actividades_plan to fetch.
     */
    where: Prisma.actividades_planWhereUniqueInput;
};
/**
 * actividades_plan findUniqueOrThrow
 */
export type actividades_planFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which actividades_plan to fetch.
     */
    where: Prisma.actividades_planWhereUniqueInput;
};
/**
 * actividades_plan findFirst
 */
export type actividades_planFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which actividades_plan to fetch.
     */
    where?: Prisma.actividades_planWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of actividades_plans to fetch.
     */
    orderBy?: Prisma.actividades_planOrderByWithRelationInput | Prisma.actividades_planOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for actividades_plans.
     */
    cursor?: Prisma.actividades_planWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` actividades_plans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` actividades_plans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of actividades_plans.
     */
    distinct?: Prisma.Actividades_planScalarFieldEnum | Prisma.Actividades_planScalarFieldEnum[];
};
/**
 * actividades_plan findFirstOrThrow
 */
export type actividades_planFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which actividades_plan to fetch.
     */
    where?: Prisma.actividades_planWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of actividades_plans to fetch.
     */
    orderBy?: Prisma.actividades_planOrderByWithRelationInput | Prisma.actividades_planOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for actividades_plans.
     */
    cursor?: Prisma.actividades_planWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` actividades_plans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` actividades_plans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of actividades_plans.
     */
    distinct?: Prisma.Actividades_planScalarFieldEnum | Prisma.Actividades_planScalarFieldEnum[];
};
/**
 * actividades_plan findMany
 */
export type actividades_planFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which actividades_plans to fetch.
     */
    where?: Prisma.actividades_planWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of actividades_plans to fetch.
     */
    orderBy?: Prisma.actividades_planOrderByWithRelationInput | Prisma.actividades_planOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing actividades_plans.
     */
    cursor?: Prisma.actividades_planWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` actividades_plans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` actividades_plans.
     */
    skip?: number;
    distinct?: Prisma.Actividades_planScalarFieldEnum | Prisma.Actividades_planScalarFieldEnum[];
};
/**
 * actividades_plan create
 */
export type actividades_planCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a actividades_plan.
     */
    data: Prisma.XOR<Prisma.actividades_planCreateInput, Prisma.actividades_planUncheckedCreateInput>;
};
/**
 * actividades_plan createMany
 */
export type actividades_planCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many actividades_plans.
     */
    data: Prisma.actividades_planCreateManyInput | Prisma.actividades_planCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * actividades_plan createManyAndReturn
 */
export type actividades_planCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the actividades_plan
     */
    select?: Prisma.actividades_planSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the actividades_plan
     */
    omit?: Prisma.actividades_planOmit<ExtArgs> | null;
    /**
     * The data used to create many actividades_plans.
     */
    data: Prisma.actividades_planCreateManyInput | Prisma.actividades_planCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.actividades_planIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * actividades_plan update
 */
export type actividades_planUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a actividades_plan.
     */
    data: Prisma.XOR<Prisma.actividades_planUpdateInput, Prisma.actividades_planUncheckedUpdateInput>;
    /**
     * Choose, which actividades_plan to update.
     */
    where: Prisma.actividades_planWhereUniqueInput;
};
/**
 * actividades_plan updateMany
 */
export type actividades_planUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update actividades_plans.
     */
    data: Prisma.XOR<Prisma.actividades_planUpdateManyMutationInput, Prisma.actividades_planUncheckedUpdateManyInput>;
    /**
     * Filter which actividades_plans to update
     */
    where?: Prisma.actividades_planWhereInput;
    /**
     * Limit how many actividades_plans to update.
     */
    limit?: number;
};
/**
 * actividades_plan updateManyAndReturn
 */
export type actividades_planUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the actividades_plan
     */
    select?: Prisma.actividades_planSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the actividades_plan
     */
    omit?: Prisma.actividades_planOmit<ExtArgs> | null;
    /**
     * The data used to update actividades_plans.
     */
    data: Prisma.XOR<Prisma.actividades_planUpdateManyMutationInput, Prisma.actividades_planUncheckedUpdateManyInput>;
    /**
     * Filter which actividades_plans to update
     */
    where?: Prisma.actividades_planWhereInput;
    /**
     * Limit how many actividades_plans to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.actividades_planIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * actividades_plan upsert
 */
export type actividades_planUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the actividades_plan to update in case it exists.
     */
    where: Prisma.actividades_planWhereUniqueInput;
    /**
     * In case the actividades_plan found by the `where` argument doesn't exist, create a new actividades_plan with this data.
     */
    create: Prisma.XOR<Prisma.actividades_planCreateInput, Prisma.actividades_planUncheckedCreateInput>;
    /**
     * In case the actividades_plan was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.actividades_planUpdateInput, Prisma.actividades_planUncheckedUpdateInput>;
};
/**
 * actividades_plan delete
 */
export type actividades_planDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which actividades_plan to delete.
     */
    where: Prisma.actividades_planWhereUniqueInput;
};
/**
 * actividades_plan deleteMany
 */
export type actividades_planDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which actividades_plans to delete
     */
    where?: Prisma.actividades_planWhereInput;
    /**
     * Limit how many actividades_plans to delete.
     */
    limit?: number;
};
/**
 * actividades_plan.usuarios
 */
export type actividades_plan$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * actividades_plan.catalogo_detalle
 */
export type actividades_plan$catalogo_detalleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * actividades_plan.seguimientos
 */
export type actividades_plan$seguimientosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.seguimientosWhereInput;
    orderBy?: Prisma.seguimientosOrderByWithRelationInput | Prisma.seguimientosOrderByWithRelationInput[];
    cursor?: Prisma.seguimientosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SeguimientosScalarFieldEnum | Prisma.SeguimientosScalarFieldEnum[];
};
/**
 * actividades_plan without action
 */
export type actividades_planDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=actividades_plan.d.ts.map