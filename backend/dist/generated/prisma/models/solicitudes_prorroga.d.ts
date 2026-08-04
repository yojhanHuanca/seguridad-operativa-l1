import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model solicitudes_prorroga
 *
 */
export type solicitudes_prorrogaModel = runtime.Types.Result.DefaultSelection<Prisma.$solicitudes_prorrogaPayload>;
export type AggregateSolicitudes_prorroga = {
    _count: Solicitudes_prorrogaCountAggregateOutputType | null;
    _avg: Solicitudes_prorrogaAvgAggregateOutputType | null;
    _sum: Solicitudes_prorrogaSumAggregateOutputType | null;
    _min: Solicitudes_prorrogaMinAggregateOutputType | null;
    _max: Solicitudes_prorrogaMaxAggregateOutputType | null;
};
export type Solicitudes_prorrogaAvgAggregateOutputType = {
    id_prorroga: number | null;
    id_incidencia: number | null;
};
export type Solicitudes_prorrogaSumAggregateOutputType = {
    id_prorroga: number | null;
    id_incidencia: number | null;
};
export type Solicitudes_prorrogaMinAggregateOutputType = {
    id_prorroga: number | null;
    id_incidencia: number | null;
    motivo: string | null;
    nueva_fecha_propuesta: Date | null;
    estado_solicitud: string | null;
    fecha_solicitud: Date | null;
};
export type Solicitudes_prorrogaMaxAggregateOutputType = {
    id_prorroga: number | null;
    id_incidencia: number | null;
    motivo: string | null;
    nueva_fecha_propuesta: Date | null;
    estado_solicitud: string | null;
    fecha_solicitud: Date | null;
};
export type Solicitudes_prorrogaCountAggregateOutputType = {
    id_prorroga: number;
    id_incidencia: number;
    motivo: number;
    nueva_fecha_propuesta: number;
    estado_solicitud: number;
    fecha_solicitud: number;
    _all: number;
};
export type Solicitudes_prorrogaAvgAggregateInputType = {
    id_prorroga?: true;
    id_incidencia?: true;
};
export type Solicitudes_prorrogaSumAggregateInputType = {
    id_prorroga?: true;
    id_incidencia?: true;
};
export type Solicitudes_prorrogaMinAggregateInputType = {
    id_prorroga?: true;
    id_incidencia?: true;
    motivo?: true;
    nueva_fecha_propuesta?: true;
    estado_solicitud?: true;
    fecha_solicitud?: true;
};
export type Solicitudes_prorrogaMaxAggregateInputType = {
    id_prorroga?: true;
    id_incidencia?: true;
    motivo?: true;
    nueva_fecha_propuesta?: true;
    estado_solicitud?: true;
    fecha_solicitud?: true;
};
export type Solicitudes_prorrogaCountAggregateInputType = {
    id_prorroga?: true;
    id_incidencia?: true;
    motivo?: true;
    nueva_fecha_propuesta?: true;
    estado_solicitud?: true;
    fecha_solicitud?: true;
    _all?: true;
};
export type Solicitudes_prorrogaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which solicitudes_prorroga to aggregate.
     */
    where?: Prisma.solicitudes_prorrogaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of solicitudes_prorrogas to fetch.
     */
    orderBy?: Prisma.solicitudes_prorrogaOrderByWithRelationInput | Prisma.solicitudes_prorrogaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.solicitudes_prorrogaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` solicitudes_prorrogas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` solicitudes_prorrogas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned solicitudes_prorrogas
    **/
    _count?: true | Solicitudes_prorrogaCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Solicitudes_prorrogaAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Solicitudes_prorrogaSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Solicitudes_prorrogaMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Solicitudes_prorrogaMaxAggregateInputType;
};
export type GetSolicitudes_prorrogaAggregateType<T extends Solicitudes_prorrogaAggregateArgs> = {
    [P in keyof T & keyof AggregateSolicitudes_prorroga]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSolicitudes_prorroga[P]> : Prisma.GetScalarType<T[P], AggregateSolicitudes_prorroga[P]>;
};
export type solicitudes_prorrogaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitudes_prorrogaWhereInput;
    orderBy?: Prisma.solicitudes_prorrogaOrderByWithAggregationInput | Prisma.solicitudes_prorrogaOrderByWithAggregationInput[];
    by: Prisma.Solicitudes_prorrogaScalarFieldEnum[] | Prisma.Solicitudes_prorrogaScalarFieldEnum;
    having?: Prisma.solicitudes_prorrogaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Solicitudes_prorrogaCountAggregateInputType | true;
    _avg?: Solicitudes_prorrogaAvgAggregateInputType;
    _sum?: Solicitudes_prorrogaSumAggregateInputType;
    _min?: Solicitudes_prorrogaMinAggregateInputType;
    _max?: Solicitudes_prorrogaMaxAggregateInputType;
};
export type Solicitudes_prorrogaGroupByOutputType = {
    id_prorroga: number;
    id_incidencia: number | null;
    motivo: string;
    nueva_fecha_propuesta: Date;
    estado_solicitud: string | null;
    fecha_solicitud: Date | null;
    _count: Solicitudes_prorrogaCountAggregateOutputType | null;
    _avg: Solicitudes_prorrogaAvgAggregateOutputType | null;
    _sum: Solicitudes_prorrogaSumAggregateOutputType | null;
    _min: Solicitudes_prorrogaMinAggregateOutputType | null;
    _max: Solicitudes_prorrogaMaxAggregateOutputType | null;
};
type GetSolicitudes_prorrogaGroupByPayload<T extends solicitudes_prorrogaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Solicitudes_prorrogaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Solicitudes_prorrogaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Solicitudes_prorrogaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Solicitudes_prorrogaGroupByOutputType[P]>;
}>>;
export type solicitudes_prorrogaWhereInput = {
    AND?: Prisma.solicitudes_prorrogaWhereInput | Prisma.solicitudes_prorrogaWhereInput[];
    OR?: Prisma.solicitudes_prorrogaWhereInput[];
    NOT?: Prisma.solicitudes_prorrogaWhereInput | Prisma.solicitudes_prorrogaWhereInput[];
    id_prorroga?: Prisma.IntFilter<"solicitudes_prorroga"> | number;
    id_incidencia?: Prisma.IntNullableFilter<"solicitudes_prorroga"> | number | null;
    motivo?: Prisma.StringFilter<"solicitudes_prorroga"> | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFilter<"solicitudes_prorroga"> | Date | string;
    estado_solicitud?: Prisma.StringNullableFilter<"solicitudes_prorroga"> | string | null;
    fecha_solicitud?: Prisma.DateTimeNullableFilter<"solicitudes_prorroga"> | Date | string | null;
    incidencias?: Prisma.XOR<Prisma.IncidenciasNullableScalarRelationFilter, Prisma.incidenciasWhereInput> | null;
};
export type solicitudes_prorrogaOrderByWithRelationInput = {
    id_prorroga?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrderInput | Prisma.SortOrder;
    motivo?: Prisma.SortOrder;
    nueva_fecha_propuesta?: Prisma.SortOrder;
    estado_solicitud?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrderInput | Prisma.SortOrder;
    incidencias?: Prisma.incidenciasOrderByWithRelationInput;
};
export type solicitudes_prorrogaWhereUniqueInput = Prisma.AtLeast<{
    id_prorroga?: number;
    AND?: Prisma.solicitudes_prorrogaWhereInput | Prisma.solicitudes_prorrogaWhereInput[];
    OR?: Prisma.solicitudes_prorrogaWhereInput[];
    NOT?: Prisma.solicitudes_prorrogaWhereInput | Prisma.solicitudes_prorrogaWhereInput[];
    id_incidencia?: Prisma.IntNullableFilter<"solicitudes_prorroga"> | number | null;
    motivo?: Prisma.StringFilter<"solicitudes_prorroga"> | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFilter<"solicitudes_prorroga"> | Date | string;
    estado_solicitud?: Prisma.StringNullableFilter<"solicitudes_prorroga"> | string | null;
    fecha_solicitud?: Prisma.DateTimeNullableFilter<"solicitudes_prorroga"> | Date | string | null;
    incidencias?: Prisma.XOR<Prisma.IncidenciasNullableScalarRelationFilter, Prisma.incidenciasWhereInput> | null;
}, "id_prorroga">;
export type solicitudes_prorrogaOrderByWithAggregationInput = {
    id_prorroga?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrderInput | Prisma.SortOrder;
    motivo?: Prisma.SortOrder;
    nueva_fecha_propuesta?: Prisma.SortOrder;
    estado_solicitud?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.solicitudes_prorrogaCountOrderByAggregateInput;
    _avg?: Prisma.solicitudes_prorrogaAvgOrderByAggregateInput;
    _max?: Prisma.solicitudes_prorrogaMaxOrderByAggregateInput;
    _min?: Prisma.solicitudes_prorrogaMinOrderByAggregateInput;
    _sum?: Prisma.solicitudes_prorrogaSumOrderByAggregateInput;
};
export type solicitudes_prorrogaScalarWhereWithAggregatesInput = {
    AND?: Prisma.solicitudes_prorrogaScalarWhereWithAggregatesInput | Prisma.solicitudes_prorrogaScalarWhereWithAggregatesInput[];
    OR?: Prisma.solicitudes_prorrogaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.solicitudes_prorrogaScalarWhereWithAggregatesInput | Prisma.solicitudes_prorrogaScalarWhereWithAggregatesInput[];
    id_prorroga?: Prisma.IntWithAggregatesFilter<"solicitudes_prorroga"> | number;
    id_incidencia?: Prisma.IntNullableWithAggregatesFilter<"solicitudes_prorroga"> | number | null;
    motivo?: Prisma.StringWithAggregatesFilter<"solicitudes_prorroga"> | string;
    nueva_fecha_propuesta?: Prisma.DateTimeWithAggregatesFilter<"solicitudes_prorroga"> | Date | string;
    estado_solicitud?: Prisma.StringNullableWithAggregatesFilter<"solicitudes_prorroga"> | string | null;
    fecha_solicitud?: Prisma.DateTimeNullableWithAggregatesFilter<"solicitudes_prorroga"> | Date | string | null;
};
export type solicitudes_prorrogaCreateInput = {
    motivo: string;
    nueva_fecha_propuesta: Date | string;
    estado_solicitud?: string | null;
    fecha_solicitud?: Date | string | null;
    incidencias?: Prisma.incidenciasCreateNestedOneWithoutSolicitudes_prorrogaInput;
};
export type solicitudes_prorrogaUncheckedCreateInput = {
    id_prorroga?: number;
    id_incidencia?: number | null;
    motivo: string;
    nueva_fecha_propuesta: Date | string;
    estado_solicitud?: string | null;
    fecha_solicitud?: Date | string | null;
};
export type solicitudes_prorrogaUpdateInput = {
    motivo?: Prisma.StringFieldUpdateOperationsInput | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estado_solicitud?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    incidencias?: Prisma.incidenciasUpdateOneWithoutSolicitudes_prorrogaNestedInput;
};
export type solicitudes_prorrogaUncheckedUpdateInput = {
    id_prorroga?: Prisma.IntFieldUpdateOperationsInput | number;
    id_incidencia?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    motivo?: Prisma.StringFieldUpdateOperationsInput | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estado_solicitud?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_prorrogaCreateManyInput = {
    id_prorroga?: number;
    id_incidencia?: number | null;
    motivo: string;
    nueva_fecha_propuesta: Date | string;
    estado_solicitud?: string | null;
    fecha_solicitud?: Date | string | null;
};
export type solicitudes_prorrogaUpdateManyMutationInput = {
    motivo?: Prisma.StringFieldUpdateOperationsInput | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estado_solicitud?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_prorrogaUncheckedUpdateManyInput = {
    id_prorroga?: Prisma.IntFieldUpdateOperationsInput | number;
    id_incidencia?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    motivo?: Prisma.StringFieldUpdateOperationsInput | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estado_solicitud?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Solicitudes_prorrogaListRelationFilter = {
    every?: Prisma.solicitudes_prorrogaWhereInput;
    some?: Prisma.solicitudes_prorrogaWhereInput;
    none?: Prisma.solicitudes_prorrogaWhereInput;
};
export type solicitudes_prorrogaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type solicitudes_prorrogaCountOrderByAggregateInput = {
    id_prorroga?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    motivo?: Prisma.SortOrder;
    nueva_fecha_propuesta?: Prisma.SortOrder;
    estado_solicitud?: Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrder;
};
export type solicitudes_prorrogaAvgOrderByAggregateInput = {
    id_prorroga?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
};
export type solicitudes_prorrogaMaxOrderByAggregateInput = {
    id_prorroga?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    motivo?: Prisma.SortOrder;
    nueva_fecha_propuesta?: Prisma.SortOrder;
    estado_solicitud?: Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrder;
};
export type solicitudes_prorrogaMinOrderByAggregateInput = {
    id_prorroga?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    motivo?: Prisma.SortOrder;
    nueva_fecha_propuesta?: Prisma.SortOrder;
    estado_solicitud?: Prisma.SortOrder;
    fecha_solicitud?: Prisma.SortOrder;
};
export type solicitudes_prorrogaSumOrderByAggregateInput = {
    id_prorroga?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
};
export type solicitudes_prorrogaCreateNestedManyWithoutIncidenciasInput = {
    create?: Prisma.XOR<Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput, Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput> | Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput[] | Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput[];
    connectOrCreate?: Prisma.solicitudes_prorrogaCreateOrConnectWithoutIncidenciasInput | Prisma.solicitudes_prorrogaCreateOrConnectWithoutIncidenciasInput[];
    createMany?: Prisma.solicitudes_prorrogaCreateManyIncidenciasInputEnvelope;
    connect?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
};
export type solicitudes_prorrogaUncheckedCreateNestedManyWithoutIncidenciasInput = {
    create?: Prisma.XOR<Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput, Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput> | Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput[] | Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput[];
    connectOrCreate?: Prisma.solicitudes_prorrogaCreateOrConnectWithoutIncidenciasInput | Prisma.solicitudes_prorrogaCreateOrConnectWithoutIncidenciasInput[];
    createMany?: Prisma.solicitudes_prorrogaCreateManyIncidenciasInputEnvelope;
    connect?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
};
export type solicitudes_prorrogaUpdateManyWithoutIncidenciasNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput, Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput> | Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput[] | Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput[];
    connectOrCreate?: Prisma.solicitudes_prorrogaCreateOrConnectWithoutIncidenciasInput | Prisma.solicitudes_prorrogaCreateOrConnectWithoutIncidenciasInput[];
    upsert?: Prisma.solicitudes_prorrogaUpsertWithWhereUniqueWithoutIncidenciasInput | Prisma.solicitudes_prorrogaUpsertWithWhereUniqueWithoutIncidenciasInput[];
    createMany?: Prisma.solicitudes_prorrogaCreateManyIncidenciasInputEnvelope;
    set?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
    disconnect?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
    delete?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
    connect?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
    update?: Prisma.solicitudes_prorrogaUpdateWithWhereUniqueWithoutIncidenciasInput | Prisma.solicitudes_prorrogaUpdateWithWhereUniqueWithoutIncidenciasInput[];
    updateMany?: Prisma.solicitudes_prorrogaUpdateManyWithWhereWithoutIncidenciasInput | Prisma.solicitudes_prorrogaUpdateManyWithWhereWithoutIncidenciasInput[];
    deleteMany?: Prisma.solicitudes_prorrogaScalarWhereInput | Prisma.solicitudes_prorrogaScalarWhereInput[];
};
export type solicitudes_prorrogaUncheckedUpdateManyWithoutIncidenciasNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput, Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput> | Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput[] | Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput[];
    connectOrCreate?: Prisma.solicitudes_prorrogaCreateOrConnectWithoutIncidenciasInput | Prisma.solicitudes_prorrogaCreateOrConnectWithoutIncidenciasInput[];
    upsert?: Prisma.solicitudes_prorrogaUpsertWithWhereUniqueWithoutIncidenciasInput | Prisma.solicitudes_prorrogaUpsertWithWhereUniqueWithoutIncidenciasInput[];
    createMany?: Prisma.solicitudes_prorrogaCreateManyIncidenciasInputEnvelope;
    set?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
    disconnect?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
    delete?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
    connect?: Prisma.solicitudes_prorrogaWhereUniqueInput | Prisma.solicitudes_prorrogaWhereUniqueInput[];
    update?: Prisma.solicitudes_prorrogaUpdateWithWhereUniqueWithoutIncidenciasInput | Prisma.solicitudes_prorrogaUpdateWithWhereUniqueWithoutIncidenciasInput[];
    updateMany?: Prisma.solicitudes_prorrogaUpdateManyWithWhereWithoutIncidenciasInput | Prisma.solicitudes_prorrogaUpdateManyWithWhereWithoutIncidenciasInput[];
    deleteMany?: Prisma.solicitudes_prorrogaScalarWhereInput | Prisma.solicitudes_prorrogaScalarWhereInput[];
};
export type solicitudes_prorrogaCreateWithoutIncidenciasInput = {
    motivo: string;
    nueva_fecha_propuesta: Date | string;
    estado_solicitud?: string | null;
    fecha_solicitud?: Date | string | null;
};
export type solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput = {
    id_prorroga?: number;
    motivo: string;
    nueva_fecha_propuesta: Date | string;
    estado_solicitud?: string | null;
    fecha_solicitud?: Date | string | null;
};
export type solicitudes_prorrogaCreateOrConnectWithoutIncidenciasInput = {
    where: Prisma.solicitudes_prorrogaWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput, Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput>;
};
export type solicitudes_prorrogaCreateManyIncidenciasInputEnvelope = {
    data: Prisma.solicitudes_prorrogaCreateManyIncidenciasInput | Prisma.solicitudes_prorrogaCreateManyIncidenciasInput[];
    skipDuplicates?: boolean;
};
export type solicitudes_prorrogaUpsertWithWhereUniqueWithoutIncidenciasInput = {
    where: Prisma.solicitudes_prorrogaWhereUniqueInput;
    update: Prisma.XOR<Prisma.solicitudes_prorrogaUpdateWithoutIncidenciasInput, Prisma.solicitudes_prorrogaUncheckedUpdateWithoutIncidenciasInput>;
    create: Prisma.XOR<Prisma.solicitudes_prorrogaCreateWithoutIncidenciasInput, Prisma.solicitudes_prorrogaUncheckedCreateWithoutIncidenciasInput>;
};
export type solicitudes_prorrogaUpdateWithWhereUniqueWithoutIncidenciasInput = {
    where: Prisma.solicitudes_prorrogaWhereUniqueInput;
    data: Prisma.XOR<Prisma.solicitudes_prorrogaUpdateWithoutIncidenciasInput, Prisma.solicitudes_prorrogaUncheckedUpdateWithoutIncidenciasInput>;
};
export type solicitudes_prorrogaUpdateManyWithWhereWithoutIncidenciasInput = {
    where: Prisma.solicitudes_prorrogaScalarWhereInput;
    data: Prisma.XOR<Prisma.solicitudes_prorrogaUpdateManyMutationInput, Prisma.solicitudes_prorrogaUncheckedUpdateManyWithoutIncidenciasInput>;
};
export type solicitudes_prorrogaScalarWhereInput = {
    AND?: Prisma.solicitudes_prorrogaScalarWhereInput | Prisma.solicitudes_prorrogaScalarWhereInput[];
    OR?: Prisma.solicitudes_prorrogaScalarWhereInput[];
    NOT?: Prisma.solicitudes_prorrogaScalarWhereInput | Prisma.solicitudes_prorrogaScalarWhereInput[];
    id_prorroga?: Prisma.IntFilter<"solicitudes_prorroga"> | number;
    id_incidencia?: Prisma.IntNullableFilter<"solicitudes_prorroga"> | number | null;
    motivo?: Prisma.StringFilter<"solicitudes_prorroga"> | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFilter<"solicitudes_prorroga"> | Date | string;
    estado_solicitud?: Prisma.StringNullableFilter<"solicitudes_prorroga"> | string | null;
    fecha_solicitud?: Prisma.DateTimeNullableFilter<"solicitudes_prorroga"> | Date | string | null;
};
export type solicitudes_prorrogaCreateManyIncidenciasInput = {
    id_prorroga?: number;
    motivo: string;
    nueva_fecha_propuesta: Date | string;
    estado_solicitud?: string | null;
    fecha_solicitud?: Date | string | null;
};
export type solicitudes_prorrogaUpdateWithoutIncidenciasInput = {
    motivo?: Prisma.StringFieldUpdateOperationsInput | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estado_solicitud?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_prorrogaUncheckedUpdateWithoutIncidenciasInput = {
    id_prorroga?: Prisma.IntFieldUpdateOperationsInput | number;
    motivo?: Prisma.StringFieldUpdateOperationsInput | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estado_solicitud?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_prorrogaUncheckedUpdateManyWithoutIncidenciasInput = {
    id_prorroga?: Prisma.IntFieldUpdateOperationsInput | number;
    motivo?: Prisma.StringFieldUpdateOperationsInput | string;
    nueva_fecha_propuesta?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estado_solicitud?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_solicitud?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type solicitudes_prorrogaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_prorroga?: boolean;
    id_incidencia?: boolean;
    motivo?: boolean;
    nueva_fecha_propuesta?: boolean;
    estado_solicitud?: boolean;
    fecha_solicitud?: boolean;
    incidencias?: boolean | Prisma.solicitudes_prorroga$incidenciasArgs<ExtArgs>;
}, ExtArgs["result"]["solicitudes_prorroga"]>;
export type solicitudes_prorrogaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_prorroga?: boolean;
    id_incidencia?: boolean;
    motivo?: boolean;
    nueva_fecha_propuesta?: boolean;
    estado_solicitud?: boolean;
    fecha_solicitud?: boolean;
    incidencias?: boolean | Prisma.solicitudes_prorroga$incidenciasArgs<ExtArgs>;
}, ExtArgs["result"]["solicitudes_prorroga"]>;
export type solicitudes_prorrogaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_prorroga?: boolean;
    id_incidencia?: boolean;
    motivo?: boolean;
    nueva_fecha_propuesta?: boolean;
    estado_solicitud?: boolean;
    fecha_solicitud?: boolean;
    incidencias?: boolean | Prisma.solicitudes_prorroga$incidenciasArgs<ExtArgs>;
}, ExtArgs["result"]["solicitudes_prorroga"]>;
export type solicitudes_prorrogaSelectScalar = {
    id_prorroga?: boolean;
    id_incidencia?: boolean;
    motivo?: boolean;
    nueva_fecha_propuesta?: boolean;
    estado_solicitud?: boolean;
    fecha_solicitud?: boolean;
};
export type solicitudes_prorrogaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_prorroga" | "id_incidencia" | "motivo" | "nueva_fecha_propuesta" | "estado_solicitud" | "fecha_solicitud", ExtArgs["result"]["solicitudes_prorroga"]>;
export type solicitudes_prorrogaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.solicitudes_prorroga$incidenciasArgs<ExtArgs>;
};
export type solicitudes_prorrogaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.solicitudes_prorroga$incidenciasArgs<ExtArgs>;
};
export type solicitudes_prorrogaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.solicitudes_prorroga$incidenciasArgs<ExtArgs>;
};
export type $solicitudes_prorrogaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "solicitudes_prorroga";
    objects: {
        incidencias: Prisma.$incidenciasPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_prorroga: number;
        id_incidencia: number | null;
        motivo: string;
        nueva_fecha_propuesta: Date;
        estado_solicitud: string | null;
        fecha_solicitud: Date | null;
    }, ExtArgs["result"]["solicitudes_prorroga"]>;
    composites: {};
};
export type solicitudes_prorrogaGetPayload<S extends boolean | null | undefined | solicitudes_prorrogaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload, S>;
export type solicitudes_prorrogaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<solicitudes_prorrogaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Solicitudes_prorrogaCountAggregateInputType | true;
};
export interface solicitudes_prorrogaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['solicitudes_prorroga'];
        meta: {
            name: 'solicitudes_prorroga';
        };
    };
    /**
     * Find zero or one Solicitudes_prorroga that matches the filter.
     * @param {solicitudes_prorrogaFindUniqueArgs} args - Arguments to find a Solicitudes_prorroga
     * @example
     * // Get one Solicitudes_prorroga
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends solicitudes_prorrogaFindUniqueArgs>(args: Prisma.SelectSubset<T, solicitudes_prorrogaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__solicitudes_prorrogaClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Solicitudes_prorroga that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {solicitudes_prorrogaFindUniqueOrThrowArgs} args - Arguments to find a Solicitudes_prorroga
     * @example
     * // Get one Solicitudes_prorroga
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends solicitudes_prorrogaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, solicitudes_prorrogaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitudes_prorrogaClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Solicitudes_prorroga that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_prorrogaFindFirstArgs} args - Arguments to find a Solicitudes_prorroga
     * @example
     * // Get one Solicitudes_prorroga
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends solicitudes_prorrogaFindFirstArgs>(args?: Prisma.SelectSubset<T, solicitudes_prorrogaFindFirstArgs<ExtArgs>>): Prisma.Prisma__solicitudes_prorrogaClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Solicitudes_prorroga that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_prorrogaFindFirstOrThrowArgs} args - Arguments to find a Solicitudes_prorroga
     * @example
     * // Get one Solicitudes_prorroga
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends solicitudes_prorrogaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, solicitudes_prorrogaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitudes_prorrogaClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Solicitudes_prorrogas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_prorrogaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Solicitudes_prorrogas
     * const solicitudes_prorrogas = await prisma.solicitudes_prorroga.findMany()
     *
     * // Get first 10 Solicitudes_prorrogas
     * const solicitudes_prorrogas = await prisma.solicitudes_prorroga.findMany({ take: 10 })
     *
     * // Only select the `id_prorroga`
     * const solicitudes_prorrogaWithId_prorrogaOnly = await prisma.solicitudes_prorroga.findMany({ select: { id_prorroga: true } })
     *
     */
    findMany<T extends solicitudes_prorrogaFindManyArgs>(args?: Prisma.SelectSubset<T, solicitudes_prorrogaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Solicitudes_prorroga.
     * @param {solicitudes_prorrogaCreateArgs} args - Arguments to create a Solicitudes_prorroga.
     * @example
     * // Create one Solicitudes_prorroga
     * const Solicitudes_prorroga = await prisma.solicitudes_prorroga.create({
     *   data: {
     *     // ... data to create a Solicitudes_prorroga
     *   }
     * })
     *
     */
    create<T extends solicitudes_prorrogaCreateArgs>(args: Prisma.SelectSubset<T, solicitudes_prorrogaCreateArgs<ExtArgs>>): Prisma.Prisma__solicitudes_prorrogaClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Solicitudes_prorrogas.
     * @param {solicitudes_prorrogaCreateManyArgs} args - Arguments to create many Solicitudes_prorrogas.
     * @example
     * // Create many Solicitudes_prorrogas
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends solicitudes_prorrogaCreateManyArgs>(args?: Prisma.SelectSubset<T, solicitudes_prorrogaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Solicitudes_prorrogas and returns the data saved in the database.
     * @param {solicitudes_prorrogaCreateManyAndReturnArgs} args - Arguments to create many Solicitudes_prorrogas.
     * @example
     * // Create many Solicitudes_prorrogas
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Solicitudes_prorrogas and only return the `id_prorroga`
     * const solicitudes_prorrogaWithId_prorrogaOnly = await prisma.solicitudes_prorroga.createManyAndReturn({
     *   select: { id_prorroga: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends solicitudes_prorrogaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, solicitudes_prorrogaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Solicitudes_prorroga.
     * @param {solicitudes_prorrogaDeleteArgs} args - Arguments to delete one Solicitudes_prorroga.
     * @example
     * // Delete one Solicitudes_prorroga
     * const Solicitudes_prorroga = await prisma.solicitudes_prorroga.delete({
     *   where: {
     *     // ... filter to delete one Solicitudes_prorroga
     *   }
     * })
     *
     */
    delete<T extends solicitudes_prorrogaDeleteArgs>(args: Prisma.SelectSubset<T, solicitudes_prorrogaDeleteArgs<ExtArgs>>): Prisma.Prisma__solicitudes_prorrogaClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Solicitudes_prorroga.
     * @param {solicitudes_prorrogaUpdateArgs} args - Arguments to update one Solicitudes_prorroga.
     * @example
     * // Update one Solicitudes_prorroga
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends solicitudes_prorrogaUpdateArgs>(args: Prisma.SelectSubset<T, solicitudes_prorrogaUpdateArgs<ExtArgs>>): Prisma.Prisma__solicitudes_prorrogaClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Solicitudes_prorrogas.
     * @param {solicitudes_prorrogaDeleteManyArgs} args - Arguments to filter Solicitudes_prorrogas to delete.
     * @example
     * // Delete a few Solicitudes_prorrogas
     * const { count } = await prisma.solicitudes_prorroga.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends solicitudes_prorrogaDeleteManyArgs>(args?: Prisma.SelectSubset<T, solicitudes_prorrogaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Solicitudes_prorrogas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_prorrogaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Solicitudes_prorrogas
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends solicitudes_prorrogaUpdateManyArgs>(args: Prisma.SelectSubset<T, solicitudes_prorrogaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Solicitudes_prorrogas and returns the data updated in the database.
     * @param {solicitudes_prorrogaUpdateManyAndReturnArgs} args - Arguments to update many Solicitudes_prorrogas.
     * @example
     * // Update many Solicitudes_prorrogas
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Solicitudes_prorrogas and only return the `id_prorroga`
     * const solicitudes_prorrogaWithId_prorrogaOnly = await prisma.solicitudes_prorroga.updateManyAndReturn({
     *   select: { id_prorroga: true },
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
    updateManyAndReturn<T extends solicitudes_prorrogaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, solicitudes_prorrogaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Solicitudes_prorroga.
     * @param {solicitudes_prorrogaUpsertArgs} args - Arguments to update or create a Solicitudes_prorroga.
     * @example
     * // Update or create a Solicitudes_prorroga
     * const solicitudes_prorroga = await prisma.solicitudes_prorroga.upsert({
     *   create: {
     *     // ... data to create a Solicitudes_prorroga
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Solicitudes_prorroga we want to update
     *   }
     * })
     */
    upsert<T extends solicitudes_prorrogaUpsertArgs>(args: Prisma.SelectSubset<T, solicitudes_prorrogaUpsertArgs<ExtArgs>>): Prisma.Prisma__solicitudes_prorrogaClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_prorrogaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Solicitudes_prorrogas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_prorrogaCountArgs} args - Arguments to filter Solicitudes_prorrogas to count.
     * @example
     * // Count the number of Solicitudes_prorrogas
     * const count = await prisma.solicitudes_prorroga.count({
     *   where: {
     *     // ... the filter for the Solicitudes_prorrogas we want to count
     *   }
     * })
    **/
    count<T extends solicitudes_prorrogaCountArgs>(args?: Prisma.Subset<T, solicitudes_prorrogaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Solicitudes_prorrogaCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Solicitudes_prorroga.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Solicitudes_prorrogaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Solicitudes_prorrogaAggregateArgs>(args: Prisma.Subset<T, Solicitudes_prorrogaAggregateArgs>): Prisma.PrismaPromise<GetSolicitudes_prorrogaAggregateType<T>>;
    /**
     * Group by Solicitudes_prorroga.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {solicitudes_prorrogaGroupByArgs} args - Group by arguments.
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
    groupBy<T extends solicitudes_prorrogaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: solicitudes_prorrogaGroupByArgs['orderBy'];
    } : {
        orderBy?: solicitudes_prorrogaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, solicitudes_prorrogaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitudes_prorrogaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the solicitudes_prorroga model
     */
    readonly fields: solicitudes_prorrogaFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for solicitudes_prorroga.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__solicitudes_prorrogaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    incidencias<T extends Prisma.solicitudes_prorroga$incidenciasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitudes_prorroga$incidenciasArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the solicitudes_prorroga model
 */
export interface solicitudes_prorrogaFieldRefs {
    readonly id_prorroga: Prisma.FieldRef<"solicitudes_prorroga", 'Int'>;
    readonly id_incidencia: Prisma.FieldRef<"solicitudes_prorroga", 'Int'>;
    readonly motivo: Prisma.FieldRef<"solicitudes_prorroga", 'String'>;
    readonly nueva_fecha_propuesta: Prisma.FieldRef<"solicitudes_prorroga", 'DateTime'>;
    readonly estado_solicitud: Prisma.FieldRef<"solicitudes_prorroga", 'String'>;
    readonly fecha_solicitud: Prisma.FieldRef<"solicitudes_prorroga", 'DateTime'>;
}
/**
 * solicitudes_prorroga findUnique
 */
export type solicitudes_prorrogaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    /**
     * Filter, which solicitudes_prorroga to fetch.
     */
    where: Prisma.solicitudes_prorrogaWhereUniqueInput;
};
/**
 * solicitudes_prorroga findUniqueOrThrow
 */
export type solicitudes_prorrogaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    /**
     * Filter, which solicitudes_prorroga to fetch.
     */
    where: Prisma.solicitudes_prorrogaWhereUniqueInput;
};
/**
 * solicitudes_prorroga findFirst
 */
export type solicitudes_prorrogaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    /**
     * Filter, which solicitudes_prorroga to fetch.
     */
    where?: Prisma.solicitudes_prorrogaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of solicitudes_prorrogas to fetch.
     */
    orderBy?: Prisma.solicitudes_prorrogaOrderByWithRelationInput | Prisma.solicitudes_prorrogaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for solicitudes_prorrogas.
     */
    cursor?: Prisma.solicitudes_prorrogaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` solicitudes_prorrogas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` solicitudes_prorrogas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of solicitudes_prorrogas.
     */
    distinct?: Prisma.Solicitudes_prorrogaScalarFieldEnum | Prisma.Solicitudes_prorrogaScalarFieldEnum[];
};
/**
 * solicitudes_prorroga findFirstOrThrow
 */
export type solicitudes_prorrogaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    /**
     * Filter, which solicitudes_prorroga to fetch.
     */
    where?: Prisma.solicitudes_prorrogaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of solicitudes_prorrogas to fetch.
     */
    orderBy?: Prisma.solicitudes_prorrogaOrderByWithRelationInput | Prisma.solicitudes_prorrogaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for solicitudes_prorrogas.
     */
    cursor?: Prisma.solicitudes_prorrogaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` solicitudes_prorrogas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` solicitudes_prorrogas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of solicitudes_prorrogas.
     */
    distinct?: Prisma.Solicitudes_prorrogaScalarFieldEnum | Prisma.Solicitudes_prorrogaScalarFieldEnum[];
};
/**
 * solicitudes_prorroga findMany
 */
export type solicitudes_prorrogaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    /**
     * Filter, which solicitudes_prorrogas to fetch.
     */
    where?: Prisma.solicitudes_prorrogaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of solicitudes_prorrogas to fetch.
     */
    orderBy?: Prisma.solicitudes_prorrogaOrderByWithRelationInput | Prisma.solicitudes_prorrogaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing solicitudes_prorrogas.
     */
    cursor?: Prisma.solicitudes_prorrogaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` solicitudes_prorrogas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` solicitudes_prorrogas.
     */
    skip?: number;
    distinct?: Prisma.Solicitudes_prorrogaScalarFieldEnum | Prisma.Solicitudes_prorrogaScalarFieldEnum[];
};
/**
 * solicitudes_prorroga create
 */
export type solicitudes_prorrogaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    /**
     * The data needed to create a solicitudes_prorroga.
     */
    data: Prisma.XOR<Prisma.solicitudes_prorrogaCreateInput, Prisma.solicitudes_prorrogaUncheckedCreateInput>;
};
/**
 * solicitudes_prorroga createMany
 */
export type solicitudes_prorrogaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many solicitudes_prorrogas.
     */
    data: Prisma.solicitudes_prorrogaCreateManyInput | Prisma.solicitudes_prorrogaCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * solicitudes_prorroga createManyAndReturn
 */
export type solicitudes_prorrogaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * The data used to create many solicitudes_prorrogas.
     */
    data: Prisma.solicitudes_prorrogaCreateManyInput | Prisma.solicitudes_prorrogaCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * solicitudes_prorroga update
 */
export type solicitudes_prorrogaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    /**
     * The data needed to update a solicitudes_prorroga.
     */
    data: Prisma.XOR<Prisma.solicitudes_prorrogaUpdateInput, Prisma.solicitudes_prorrogaUncheckedUpdateInput>;
    /**
     * Choose, which solicitudes_prorroga to update.
     */
    where: Prisma.solicitudes_prorrogaWhereUniqueInput;
};
/**
 * solicitudes_prorroga updateMany
 */
export type solicitudes_prorrogaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update solicitudes_prorrogas.
     */
    data: Prisma.XOR<Prisma.solicitudes_prorrogaUpdateManyMutationInput, Prisma.solicitudes_prorrogaUncheckedUpdateManyInput>;
    /**
     * Filter which solicitudes_prorrogas to update
     */
    where?: Prisma.solicitudes_prorrogaWhereInput;
    /**
     * Limit how many solicitudes_prorrogas to update.
     */
    limit?: number;
};
/**
 * solicitudes_prorroga updateManyAndReturn
 */
export type solicitudes_prorrogaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * The data used to update solicitudes_prorrogas.
     */
    data: Prisma.XOR<Prisma.solicitudes_prorrogaUpdateManyMutationInput, Prisma.solicitudes_prorrogaUncheckedUpdateManyInput>;
    /**
     * Filter which solicitudes_prorrogas to update
     */
    where?: Prisma.solicitudes_prorrogaWhereInput;
    /**
     * Limit how many solicitudes_prorrogas to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * solicitudes_prorroga upsert
 */
export type solicitudes_prorrogaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    /**
     * The filter to search for the solicitudes_prorroga to update in case it exists.
     */
    where: Prisma.solicitudes_prorrogaWhereUniqueInput;
    /**
     * In case the solicitudes_prorroga found by the `where` argument doesn't exist, create a new solicitudes_prorroga with this data.
     */
    create: Prisma.XOR<Prisma.solicitudes_prorrogaCreateInput, Prisma.solicitudes_prorrogaUncheckedCreateInput>;
    /**
     * In case the solicitudes_prorroga was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.solicitudes_prorrogaUpdateInput, Prisma.solicitudes_prorrogaUncheckedUpdateInput>;
};
/**
 * solicitudes_prorroga delete
 */
export type solicitudes_prorrogaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
    /**
     * Filter which solicitudes_prorroga to delete.
     */
    where: Prisma.solicitudes_prorrogaWhereUniqueInput;
};
/**
 * solicitudes_prorroga deleteMany
 */
export type solicitudes_prorrogaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which solicitudes_prorrogas to delete
     */
    where?: Prisma.solicitudes_prorrogaWhereInput;
    /**
     * Limit how many solicitudes_prorrogas to delete.
     */
    limit?: number;
};
/**
 * solicitudes_prorroga.incidencias
 */
export type solicitudes_prorroga$incidenciasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * solicitudes_prorroga without action
 */
export type solicitudes_prorrogaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the solicitudes_prorroga
     */
    select?: Prisma.solicitudes_prorrogaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the solicitudes_prorroga
     */
    omit?: Prisma.solicitudes_prorrogaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.solicitudes_prorrogaInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=solicitudes_prorroga.d.ts.map