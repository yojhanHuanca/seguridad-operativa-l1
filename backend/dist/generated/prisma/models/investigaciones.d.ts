import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model investigaciones
 *
 */
export type investigacionesModel = runtime.Types.Result.DefaultSelection<Prisma.$investigacionesPayload>;
export type AggregateInvestigaciones = {
    _count: InvestigacionesCountAggregateOutputType | null;
    _avg: InvestigacionesAvgAggregateOutputType | null;
    _sum: InvestigacionesSumAggregateOutputType | null;
    _min: InvestigacionesMinAggregateOutputType | null;
    _max: InvestigacionesMaxAggregateOutputType | null;
};
export type InvestigacionesAvgAggregateOutputType = {
    id_investigacion: number | null;
    id_incidencia: number | null;
    id_usuario_investigador: number | null;
};
export type InvestigacionesSumAggregateOutputType = {
    id_investigacion: number | null;
    id_incidencia: number | null;
    id_usuario_investigador: number | null;
};
export type InvestigacionesMinAggregateOutputType = {
    id_investigacion: number | null;
    id_incidencia: number | null;
    causa_raiz: string | null;
    plan_accion: string | null;
    id_usuario_investigador: number | null;
    fecha_investigacion: Date | null;
};
export type InvestigacionesMaxAggregateOutputType = {
    id_investigacion: number | null;
    id_incidencia: number | null;
    causa_raiz: string | null;
    plan_accion: string | null;
    id_usuario_investigador: number | null;
    fecha_investigacion: Date | null;
};
export type InvestigacionesCountAggregateOutputType = {
    id_investigacion: number;
    id_incidencia: number;
    causa_raiz: number;
    plan_accion: number;
    id_usuario_investigador: number;
    fecha_investigacion: number;
    _all: number;
};
export type InvestigacionesAvgAggregateInputType = {
    id_investigacion?: true;
    id_incidencia?: true;
    id_usuario_investigador?: true;
};
export type InvestigacionesSumAggregateInputType = {
    id_investigacion?: true;
    id_incidencia?: true;
    id_usuario_investigador?: true;
};
export type InvestigacionesMinAggregateInputType = {
    id_investigacion?: true;
    id_incidencia?: true;
    causa_raiz?: true;
    plan_accion?: true;
    id_usuario_investigador?: true;
    fecha_investigacion?: true;
};
export type InvestigacionesMaxAggregateInputType = {
    id_investigacion?: true;
    id_incidencia?: true;
    causa_raiz?: true;
    plan_accion?: true;
    id_usuario_investigador?: true;
    fecha_investigacion?: true;
};
export type InvestigacionesCountAggregateInputType = {
    id_investigacion?: true;
    id_incidencia?: true;
    causa_raiz?: true;
    plan_accion?: true;
    id_usuario_investigador?: true;
    fecha_investigacion?: true;
    _all?: true;
};
export type InvestigacionesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which investigaciones to aggregate.
     */
    where?: Prisma.investigacionesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of investigaciones to fetch.
     */
    orderBy?: Prisma.investigacionesOrderByWithRelationInput | Prisma.investigacionesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.investigacionesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` investigaciones from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` investigaciones.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned investigaciones
    **/
    _count?: true | InvestigacionesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: InvestigacionesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: InvestigacionesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: InvestigacionesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: InvestigacionesMaxAggregateInputType;
};
export type GetInvestigacionesAggregateType<T extends InvestigacionesAggregateArgs> = {
    [P in keyof T & keyof AggregateInvestigaciones]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvestigaciones[P]> : Prisma.GetScalarType<T[P], AggregateInvestigaciones[P]>;
};
export type investigacionesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.investigacionesWhereInput;
    orderBy?: Prisma.investigacionesOrderByWithAggregationInput | Prisma.investigacionesOrderByWithAggregationInput[];
    by: Prisma.InvestigacionesScalarFieldEnum[] | Prisma.InvestigacionesScalarFieldEnum;
    having?: Prisma.investigacionesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvestigacionesCountAggregateInputType | true;
    _avg?: InvestigacionesAvgAggregateInputType;
    _sum?: InvestigacionesSumAggregateInputType;
    _min?: InvestigacionesMinAggregateInputType;
    _max?: InvestigacionesMaxAggregateInputType;
};
export type InvestigacionesGroupByOutputType = {
    id_investigacion: number;
    id_incidencia: number | null;
    causa_raiz: string;
    plan_accion: string;
    id_usuario_investigador: number | null;
    fecha_investigacion: Date | null;
    _count: InvestigacionesCountAggregateOutputType | null;
    _avg: InvestigacionesAvgAggregateOutputType | null;
    _sum: InvestigacionesSumAggregateOutputType | null;
    _min: InvestigacionesMinAggregateOutputType | null;
    _max: InvestigacionesMaxAggregateOutputType | null;
};
type GetInvestigacionesGroupByPayload<T extends investigacionesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InvestigacionesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InvestigacionesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InvestigacionesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InvestigacionesGroupByOutputType[P]>;
}>>;
export type investigacionesWhereInput = {
    AND?: Prisma.investigacionesWhereInput | Prisma.investigacionesWhereInput[];
    OR?: Prisma.investigacionesWhereInput[];
    NOT?: Prisma.investigacionesWhereInput | Prisma.investigacionesWhereInput[];
    id_investigacion?: Prisma.IntFilter<"investigaciones"> | number;
    id_incidencia?: Prisma.IntNullableFilter<"investigaciones"> | number | null;
    causa_raiz?: Prisma.StringFilter<"investigaciones"> | string;
    plan_accion?: Prisma.StringFilter<"investigaciones"> | string;
    id_usuario_investigador?: Prisma.IntNullableFilter<"investigaciones"> | number | null;
    fecha_investigacion?: Prisma.DateTimeNullableFilter<"investigaciones"> | Date | string | null;
    incidencias?: Prisma.XOR<Prisma.IncidenciasNullableScalarRelationFilter, Prisma.incidenciasWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type investigacionesOrderByWithRelationInput = {
    id_investigacion?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrderInput | Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    plan_accion?: Prisma.SortOrder;
    id_usuario_investigador?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_investigacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    incidencias?: Prisma.incidenciasOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type investigacionesWhereUniqueInput = Prisma.AtLeast<{
    id_investigacion?: number;
    id_incidencia?: number;
    AND?: Prisma.investigacionesWhereInput | Prisma.investigacionesWhereInput[];
    OR?: Prisma.investigacionesWhereInput[];
    NOT?: Prisma.investigacionesWhereInput | Prisma.investigacionesWhereInput[];
    causa_raiz?: Prisma.StringFilter<"investigaciones"> | string;
    plan_accion?: Prisma.StringFilter<"investigaciones"> | string;
    id_usuario_investigador?: Prisma.IntNullableFilter<"investigaciones"> | number | null;
    fecha_investigacion?: Prisma.DateTimeNullableFilter<"investigaciones"> | Date | string | null;
    incidencias?: Prisma.XOR<Prisma.IncidenciasNullableScalarRelationFilter, Prisma.incidenciasWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id_investigacion" | "id_incidencia">;
export type investigacionesOrderByWithAggregationInput = {
    id_investigacion?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrderInput | Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    plan_accion?: Prisma.SortOrder;
    id_usuario_investigador?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_investigacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.investigacionesCountOrderByAggregateInput;
    _avg?: Prisma.investigacionesAvgOrderByAggregateInput;
    _max?: Prisma.investigacionesMaxOrderByAggregateInput;
    _min?: Prisma.investigacionesMinOrderByAggregateInput;
    _sum?: Prisma.investigacionesSumOrderByAggregateInput;
};
export type investigacionesScalarWhereWithAggregatesInput = {
    AND?: Prisma.investigacionesScalarWhereWithAggregatesInput | Prisma.investigacionesScalarWhereWithAggregatesInput[];
    OR?: Prisma.investigacionesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.investigacionesScalarWhereWithAggregatesInput | Prisma.investigacionesScalarWhereWithAggregatesInput[];
    id_investigacion?: Prisma.IntWithAggregatesFilter<"investigaciones"> | number;
    id_incidencia?: Prisma.IntNullableWithAggregatesFilter<"investigaciones"> | number | null;
    causa_raiz?: Prisma.StringWithAggregatesFilter<"investigaciones"> | string;
    plan_accion?: Prisma.StringWithAggregatesFilter<"investigaciones"> | string;
    id_usuario_investigador?: Prisma.IntNullableWithAggregatesFilter<"investigaciones"> | number | null;
    fecha_investigacion?: Prisma.DateTimeNullableWithAggregatesFilter<"investigaciones"> | Date | string | null;
};
export type investigacionesCreateInput = {
    causa_raiz: string;
    plan_accion: string;
    fecha_investigacion?: Date | string | null;
    incidencias?: Prisma.incidenciasCreateNestedOneWithoutInvestigacionesInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutInvestigacionesInput;
};
export type investigacionesUncheckedCreateInput = {
    id_investigacion?: number;
    id_incidencia?: number | null;
    causa_raiz: string;
    plan_accion: string;
    id_usuario_investigador?: number | null;
    fecha_investigacion?: Date | string | null;
};
export type investigacionesUpdateInput = {
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    plan_accion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_investigacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    incidencias?: Prisma.incidenciasUpdateOneWithoutInvestigacionesNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutInvestigacionesNestedInput;
};
export type investigacionesUncheckedUpdateInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    id_incidencia?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    plan_accion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_usuario_investigador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_investigacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacionesCreateManyInput = {
    id_investigacion?: number;
    id_incidencia?: number | null;
    causa_raiz: string;
    plan_accion: string;
    id_usuario_investigador?: number | null;
    fecha_investigacion?: Date | string | null;
};
export type investigacionesUpdateManyMutationInput = {
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    plan_accion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_investigacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacionesUncheckedUpdateManyInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    id_incidencia?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    plan_accion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_usuario_investigador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_investigacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type InvestigacionesNullableScalarRelationFilter = {
    is?: Prisma.investigacionesWhereInput | null;
    isNot?: Prisma.investigacionesWhereInput | null;
};
export type investigacionesCountOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    plan_accion?: Prisma.SortOrder;
    id_usuario_investigador?: Prisma.SortOrder;
    fecha_investigacion?: Prisma.SortOrder;
};
export type investigacionesAvgOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    id_usuario_investigador?: Prisma.SortOrder;
};
export type investigacionesMaxOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    plan_accion?: Prisma.SortOrder;
    id_usuario_investigador?: Prisma.SortOrder;
    fecha_investigacion?: Prisma.SortOrder;
};
export type investigacionesMinOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    causa_raiz?: Prisma.SortOrder;
    plan_accion?: Prisma.SortOrder;
    id_usuario_investigador?: Prisma.SortOrder;
    fecha_investigacion?: Prisma.SortOrder;
};
export type investigacionesSumOrderByAggregateInput = {
    id_investigacion?: Prisma.SortOrder;
    id_incidencia?: Prisma.SortOrder;
    id_usuario_investigador?: Prisma.SortOrder;
};
export type InvestigacionesListRelationFilter = {
    every?: Prisma.investigacionesWhereInput;
    some?: Prisma.investigacionesWhereInput;
    none?: Prisma.investigacionesWhereInput;
};
export type investigacionesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type investigacionesCreateNestedOneWithoutIncidenciasInput = {
    create?: Prisma.XOR<Prisma.investigacionesCreateWithoutIncidenciasInput, Prisma.investigacionesUncheckedCreateWithoutIncidenciasInput>;
    connectOrCreate?: Prisma.investigacionesCreateOrConnectWithoutIncidenciasInput;
    connect?: Prisma.investigacionesWhereUniqueInput;
};
export type investigacionesUncheckedCreateNestedOneWithoutIncidenciasInput = {
    create?: Prisma.XOR<Prisma.investigacionesCreateWithoutIncidenciasInput, Prisma.investigacionesUncheckedCreateWithoutIncidenciasInput>;
    connectOrCreate?: Prisma.investigacionesCreateOrConnectWithoutIncidenciasInput;
    connect?: Prisma.investigacionesWhereUniqueInput;
};
export type investigacionesUpdateOneWithoutIncidenciasNestedInput = {
    create?: Prisma.XOR<Prisma.investigacionesCreateWithoutIncidenciasInput, Prisma.investigacionesUncheckedCreateWithoutIncidenciasInput>;
    connectOrCreate?: Prisma.investigacionesCreateOrConnectWithoutIncidenciasInput;
    upsert?: Prisma.investigacionesUpsertWithoutIncidenciasInput;
    disconnect?: Prisma.investigacionesWhereInput | boolean;
    delete?: Prisma.investigacionesWhereInput | boolean;
    connect?: Prisma.investigacionesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.investigacionesUpdateToOneWithWhereWithoutIncidenciasInput, Prisma.investigacionesUpdateWithoutIncidenciasInput>, Prisma.investigacionesUncheckedUpdateWithoutIncidenciasInput>;
};
export type investigacionesUncheckedUpdateOneWithoutIncidenciasNestedInput = {
    create?: Prisma.XOR<Prisma.investigacionesCreateWithoutIncidenciasInput, Prisma.investigacionesUncheckedCreateWithoutIncidenciasInput>;
    connectOrCreate?: Prisma.investigacionesCreateOrConnectWithoutIncidenciasInput;
    upsert?: Prisma.investigacionesUpsertWithoutIncidenciasInput;
    disconnect?: Prisma.investigacionesWhereInput | boolean;
    delete?: Prisma.investigacionesWhereInput | boolean;
    connect?: Prisma.investigacionesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.investigacionesUpdateToOneWithWhereWithoutIncidenciasInput, Prisma.investigacionesUpdateWithoutIncidenciasInput>, Prisma.investigacionesUncheckedUpdateWithoutIncidenciasInput>;
};
export type investigacionesCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.investigacionesCreateWithoutUsuariosInput, Prisma.investigacionesUncheckedCreateWithoutUsuariosInput> | Prisma.investigacionesCreateWithoutUsuariosInput[] | Prisma.investigacionesUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.investigacionesCreateOrConnectWithoutUsuariosInput | Prisma.investigacionesCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.investigacionesCreateManyUsuariosInputEnvelope;
    connect?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
};
export type investigacionesUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.investigacionesCreateWithoutUsuariosInput, Prisma.investigacionesUncheckedCreateWithoutUsuariosInput> | Prisma.investigacionesCreateWithoutUsuariosInput[] | Prisma.investigacionesUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.investigacionesCreateOrConnectWithoutUsuariosInput | Prisma.investigacionesCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.investigacionesCreateManyUsuariosInputEnvelope;
    connect?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
};
export type investigacionesUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.investigacionesCreateWithoutUsuariosInput, Prisma.investigacionesUncheckedCreateWithoutUsuariosInput> | Prisma.investigacionesCreateWithoutUsuariosInput[] | Prisma.investigacionesUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.investigacionesCreateOrConnectWithoutUsuariosInput | Prisma.investigacionesCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.investigacionesUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.investigacionesUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.investigacionesCreateManyUsuariosInputEnvelope;
    set?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
    disconnect?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
    delete?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
    connect?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
    update?: Prisma.investigacionesUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.investigacionesUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.investigacionesUpdateManyWithWhereWithoutUsuariosInput | Prisma.investigacionesUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.investigacionesScalarWhereInput | Prisma.investigacionesScalarWhereInput[];
};
export type investigacionesUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.investigacionesCreateWithoutUsuariosInput, Prisma.investigacionesUncheckedCreateWithoutUsuariosInput> | Prisma.investigacionesCreateWithoutUsuariosInput[] | Prisma.investigacionesUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.investigacionesCreateOrConnectWithoutUsuariosInput | Prisma.investigacionesCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.investigacionesUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.investigacionesUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.investigacionesCreateManyUsuariosInputEnvelope;
    set?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
    disconnect?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
    delete?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
    connect?: Prisma.investigacionesWhereUniqueInput | Prisma.investigacionesWhereUniqueInput[];
    update?: Prisma.investigacionesUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.investigacionesUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.investigacionesUpdateManyWithWhereWithoutUsuariosInput | Prisma.investigacionesUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.investigacionesScalarWhereInput | Prisma.investigacionesScalarWhereInput[];
};
export type investigacionesCreateWithoutIncidenciasInput = {
    causa_raiz: string;
    plan_accion: string;
    fecha_investigacion?: Date | string | null;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutInvestigacionesInput;
};
export type investigacionesUncheckedCreateWithoutIncidenciasInput = {
    id_investigacion?: number;
    causa_raiz: string;
    plan_accion: string;
    id_usuario_investigador?: number | null;
    fecha_investigacion?: Date | string | null;
};
export type investigacionesCreateOrConnectWithoutIncidenciasInput = {
    where: Prisma.investigacionesWhereUniqueInput;
    create: Prisma.XOR<Prisma.investigacionesCreateWithoutIncidenciasInput, Prisma.investigacionesUncheckedCreateWithoutIncidenciasInput>;
};
export type investigacionesUpsertWithoutIncidenciasInput = {
    update: Prisma.XOR<Prisma.investigacionesUpdateWithoutIncidenciasInput, Prisma.investigacionesUncheckedUpdateWithoutIncidenciasInput>;
    create: Prisma.XOR<Prisma.investigacionesCreateWithoutIncidenciasInput, Prisma.investigacionesUncheckedCreateWithoutIncidenciasInput>;
    where?: Prisma.investigacionesWhereInput;
};
export type investigacionesUpdateToOneWithWhereWithoutIncidenciasInput = {
    where?: Prisma.investigacionesWhereInput;
    data: Prisma.XOR<Prisma.investigacionesUpdateWithoutIncidenciasInput, Prisma.investigacionesUncheckedUpdateWithoutIncidenciasInput>;
};
export type investigacionesUpdateWithoutIncidenciasInput = {
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    plan_accion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_investigacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuarios?: Prisma.usuariosUpdateOneWithoutInvestigacionesNestedInput;
};
export type investigacionesUncheckedUpdateWithoutIncidenciasInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    plan_accion?: Prisma.StringFieldUpdateOperationsInput | string;
    id_usuario_investigador?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_investigacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacionesCreateWithoutUsuariosInput = {
    causa_raiz: string;
    plan_accion: string;
    fecha_investigacion?: Date | string | null;
    incidencias?: Prisma.incidenciasCreateNestedOneWithoutInvestigacionesInput;
};
export type investigacionesUncheckedCreateWithoutUsuariosInput = {
    id_investigacion?: number;
    id_incidencia?: number | null;
    causa_raiz: string;
    plan_accion: string;
    fecha_investigacion?: Date | string | null;
};
export type investigacionesCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.investigacionesWhereUniqueInput;
    create: Prisma.XOR<Prisma.investigacionesCreateWithoutUsuariosInput, Prisma.investigacionesUncheckedCreateWithoutUsuariosInput>;
};
export type investigacionesCreateManyUsuariosInputEnvelope = {
    data: Prisma.investigacionesCreateManyUsuariosInput | Prisma.investigacionesCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type investigacionesUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.investigacionesWhereUniqueInput;
    update: Prisma.XOR<Prisma.investigacionesUpdateWithoutUsuariosInput, Prisma.investigacionesUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.investigacionesCreateWithoutUsuariosInput, Prisma.investigacionesUncheckedCreateWithoutUsuariosInput>;
};
export type investigacionesUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.investigacionesWhereUniqueInput;
    data: Prisma.XOR<Prisma.investigacionesUpdateWithoutUsuariosInput, Prisma.investigacionesUncheckedUpdateWithoutUsuariosInput>;
};
export type investigacionesUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.investigacionesScalarWhereInput;
    data: Prisma.XOR<Prisma.investigacionesUpdateManyMutationInput, Prisma.investigacionesUncheckedUpdateManyWithoutUsuariosInput>;
};
export type investigacionesScalarWhereInput = {
    AND?: Prisma.investigacionesScalarWhereInput | Prisma.investigacionesScalarWhereInput[];
    OR?: Prisma.investigacionesScalarWhereInput[];
    NOT?: Prisma.investigacionesScalarWhereInput | Prisma.investigacionesScalarWhereInput[];
    id_investigacion?: Prisma.IntFilter<"investigaciones"> | number;
    id_incidencia?: Prisma.IntNullableFilter<"investigaciones"> | number | null;
    causa_raiz?: Prisma.StringFilter<"investigaciones"> | string;
    plan_accion?: Prisma.StringFilter<"investigaciones"> | string;
    id_usuario_investigador?: Prisma.IntNullableFilter<"investigaciones"> | number | null;
    fecha_investigacion?: Prisma.DateTimeNullableFilter<"investigaciones"> | Date | string | null;
};
export type investigacionesCreateManyUsuariosInput = {
    id_investigacion?: number;
    id_incidencia?: number | null;
    causa_raiz: string;
    plan_accion: string;
    fecha_investigacion?: Date | string | null;
};
export type investigacionesUpdateWithoutUsuariosInput = {
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    plan_accion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_investigacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    incidencias?: Prisma.incidenciasUpdateOneWithoutInvestigacionesNestedInput;
};
export type investigacionesUncheckedUpdateWithoutUsuariosInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    id_incidencia?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    plan_accion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_investigacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacionesUncheckedUpdateManyWithoutUsuariosInput = {
    id_investigacion?: Prisma.IntFieldUpdateOperationsInput | number;
    id_incidencia?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    causa_raiz?: Prisma.StringFieldUpdateOperationsInput | string;
    plan_accion?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_investigacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type investigacionesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_investigacion?: boolean;
    id_incidencia?: boolean;
    causa_raiz?: boolean;
    plan_accion?: boolean;
    id_usuario_investigador?: boolean;
    fecha_investigacion?: boolean;
    incidencias?: boolean | Prisma.investigaciones$incidenciasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigaciones$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["investigaciones"]>;
export type investigacionesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_investigacion?: boolean;
    id_incidencia?: boolean;
    causa_raiz?: boolean;
    plan_accion?: boolean;
    id_usuario_investigador?: boolean;
    fecha_investigacion?: boolean;
    incidencias?: boolean | Prisma.investigaciones$incidenciasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigaciones$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["investigaciones"]>;
export type investigacionesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_investigacion?: boolean;
    id_incidencia?: boolean;
    causa_raiz?: boolean;
    plan_accion?: boolean;
    id_usuario_investigador?: boolean;
    fecha_investigacion?: boolean;
    incidencias?: boolean | Prisma.investigaciones$incidenciasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigaciones$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["investigaciones"]>;
export type investigacionesSelectScalar = {
    id_investigacion?: boolean;
    id_incidencia?: boolean;
    causa_raiz?: boolean;
    plan_accion?: boolean;
    id_usuario_investigador?: boolean;
    fecha_investigacion?: boolean;
};
export type investigacionesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_investigacion" | "id_incidencia" | "causa_raiz" | "plan_accion" | "id_usuario_investigador" | "fecha_investigacion", ExtArgs["result"]["investigaciones"]>;
export type investigacionesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.investigaciones$incidenciasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigaciones$usuariosArgs<ExtArgs>;
};
export type investigacionesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.investigaciones$incidenciasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigaciones$usuariosArgs<ExtArgs>;
};
export type investigacionesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    incidencias?: boolean | Prisma.investigaciones$incidenciasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.investigaciones$usuariosArgs<ExtArgs>;
};
export type $investigacionesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "investigaciones";
    objects: {
        incidencias: Prisma.$incidenciasPayload<ExtArgs> | null;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_investigacion: number;
        id_incidencia: number | null;
        causa_raiz: string;
        plan_accion: string;
        id_usuario_investigador: number | null;
        fecha_investigacion: Date | null;
    }, ExtArgs["result"]["investigaciones"]>;
    composites: {};
};
export type investigacionesGetPayload<S extends boolean | null | undefined | investigacionesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$investigacionesPayload, S>;
export type investigacionesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<investigacionesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InvestigacionesCountAggregateInputType | true;
};
export interface investigacionesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['investigaciones'];
        meta: {
            name: 'investigaciones';
        };
    };
    /**
     * Find zero or one Investigaciones that matches the filter.
     * @param {investigacionesFindUniqueArgs} args - Arguments to find a Investigaciones
     * @example
     * // Get one Investigaciones
     * const investigaciones = await prisma.investigaciones.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends investigacionesFindUniqueArgs>(args: Prisma.SelectSubset<T, investigacionesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__investigacionesClient<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Investigaciones that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {investigacionesFindUniqueOrThrowArgs} args - Arguments to find a Investigaciones
     * @example
     * // Get one Investigaciones
     * const investigaciones = await prisma.investigaciones.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends investigacionesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, investigacionesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__investigacionesClient<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Investigaciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacionesFindFirstArgs} args - Arguments to find a Investigaciones
     * @example
     * // Get one Investigaciones
     * const investigaciones = await prisma.investigaciones.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends investigacionesFindFirstArgs>(args?: Prisma.SelectSubset<T, investigacionesFindFirstArgs<ExtArgs>>): Prisma.Prisma__investigacionesClient<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Investigaciones that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacionesFindFirstOrThrowArgs} args - Arguments to find a Investigaciones
     * @example
     * // Get one Investigaciones
     * const investigaciones = await prisma.investigaciones.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends investigacionesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, investigacionesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__investigacionesClient<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Investigaciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacionesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investigaciones
     * const investigaciones = await prisma.investigaciones.findMany()
     *
     * // Get first 10 Investigaciones
     * const investigaciones = await prisma.investigaciones.findMany({ take: 10 })
     *
     * // Only select the `id_investigacion`
     * const investigacionesWithId_investigacionOnly = await prisma.investigaciones.findMany({ select: { id_investigacion: true } })
     *
     */
    findMany<T extends investigacionesFindManyArgs>(args?: Prisma.SelectSubset<T, investigacionesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Investigaciones.
     * @param {investigacionesCreateArgs} args - Arguments to create a Investigaciones.
     * @example
     * // Create one Investigaciones
     * const Investigaciones = await prisma.investigaciones.create({
     *   data: {
     *     // ... data to create a Investigaciones
     *   }
     * })
     *
     */
    create<T extends investigacionesCreateArgs>(args: Prisma.SelectSubset<T, investigacionesCreateArgs<ExtArgs>>): Prisma.Prisma__investigacionesClient<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Investigaciones.
     * @param {investigacionesCreateManyArgs} args - Arguments to create many Investigaciones.
     * @example
     * // Create many Investigaciones
     * const investigaciones = await prisma.investigaciones.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends investigacionesCreateManyArgs>(args?: Prisma.SelectSubset<T, investigacionesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Investigaciones and returns the data saved in the database.
     * @param {investigacionesCreateManyAndReturnArgs} args - Arguments to create many Investigaciones.
     * @example
     * // Create many Investigaciones
     * const investigaciones = await prisma.investigaciones.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Investigaciones and only return the `id_investigacion`
     * const investigacionesWithId_investigacionOnly = await prisma.investigaciones.createManyAndReturn({
     *   select: { id_investigacion: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends investigacionesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, investigacionesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Investigaciones.
     * @param {investigacionesDeleteArgs} args - Arguments to delete one Investigaciones.
     * @example
     * // Delete one Investigaciones
     * const Investigaciones = await prisma.investigaciones.delete({
     *   where: {
     *     // ... filter to delete one Investigaciones
     *   }
     * })
     *
     */
    delete<T extends investigacionesDeleteArgs>(args: Prisma.SelectSubset<T, investigacionesDeleteArgs<ExtArgs>>): Prisma.Prisma__investigacionesClient<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Investigaciones.
     * @param {investigacionesUpdateArgs} args - Arguments to update one Investigaciones.
     * @example
     * // Update one Investigaciones
     * const investigaciones = await prisma.investigaciones.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends investigacionesUpdateArgs>(args: Prisma.SelectSubset<T, investigacionesUpdateArgs<ExtArgs>>): Prisma.Prisma__investigacionesClient<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Investigaciones.
     * @param {investigacionesDeleteManyArgs} args - Arguments to filter Investigaciones to delete.
     * @example
     * // Delete a few Investigaciones
     * const { count } = await prisma.investigaciones.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends investigacionesDeleteManyArgs>(args?: Prisma.SelectSubset<T, investigacionesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Investigaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacionesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investigaciones
     * const investigaciones = await prisma.investigaciones.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends investigacionesUpdateManyArgs>(args: Prisma.SelectSubset<T, investigacionesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Investigaciones and returns the data updated in the database.
     * @param {investigacionesUpdateManyAndReturnArgs} args - Arguments to update many Investigaciones.
     * @example
     * // Update many Investigaciones
     * const investigaciones = await prisma.investigaciones.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Investigaciones and only return the `id_investigacion`
     * const investigacionesWithId_investigacionOnly = await prisma.investigaciones.updateManyAndReturn({
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
    updateManyAndReturn<T extends investigacionesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, investigacionesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Investigaciones.
     * @param {investigacionesUpsertArgs} args - Arguments to update or create a Investigaciones.
     * @example
     * // Update or create a Investigaciones
     * const investigaciones = await prisma.investigaciones.upsert({
     *   create: {
     *     // ... data to create a Investigaciones
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investigaciones we want to update
     *   }
     * })
     */
    upsert<T extends investigacionesUpsertArgs>(args: Prisma.SelectSubset<T, investigacionesUpsertArgs<ExtArgs>>): Prisma.Prisma__investigacionesClient<runtime.Types.Result.GetResult<Prisma.$investigacionesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Investigaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacionesCountArgs} args - Arguments to filter Investigaciones to count.
     * @example
     * // Count the number of Investigaciones
     * const count = await prisma.investigaciones.count({
     *   where: {
     *     // ... the filter for the Investigaciones we want to count
     *   }
     * })
    **/
    count<T extends investigacionesCountArgs>(args?: Prisma.Subset<T, investigacionesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InvestigacionesCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Investigaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigacionesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InvestigacionesAggregateArgs>(args: Prisma.Subset<T, InvestigacionesAggregateArgs>): Prisma.PrismaPromise<GetInvestigacionesAggregateType<T>>;
    /**
     * Group by Investigaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investigacionesGroupByArgs} args - Group by arguments.
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
    groupBy<T extends investigacionesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: investigacionesGroupByArgs['orderBy'];
    } : {
        orderBy?: investigacionesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, investigacionesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestigacionesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the investigaciones model
     */
    readonly fields: investigacionesFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for investigaciones.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__investigacionesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    incidencias<T extends Prisma.investigaciones$incidenciasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.investigaciones$incidenciasArgs<ExtArgs>>): Prisma.Prisma__incidenciasClient<runtime.Types.Result.GetResult<Prisma.$incidenciasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.investigaciones$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.investigaciones$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the investigaciones model
 */
export interface investigacionesFieldRefs {
    readonly id_investigacion: Prisma.FieldRef<"investigaciones", 'Int'>;
    readonly id_incidencia: Prisma.FieldRef<"investigaciones", 'Int'>;
    readonly causa_raiz: Prisma.FieldRef<"investigaciones", 'String'>;
    readonly plan_accion: Prisma.FieldRef<"investigaciones", 'String'>;
    readonly id_usuario_investigador: Prisma.FieldRef<"investigaciones", 'Int'>;
    readonly fecha_investigacion: Prisma.FieldRef<"investigaciones", 'DateTime'>;
}
/**
 * investigaciones findUnique
 */
export type investigacionesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    /**
     * Filter, which investigaciones to fetch.
     */
    where: Prisma.investigacionesWhereUniqueInput;
};
/**
 * investigaciones findUniqueOrThrow
 */
export type investigacionesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    /**
     * Filter, which investigaciones to fetch.
     */
    where: Prisma.investigacionesWhereUniqueInput;
};
/**
 * investigaciones findFirst
 */
export type investigacionesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    /**
     * Filter, which investigaciones to fetch.
     */
    where?: Prisma.investigacionesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of investigaciones to fetch.
     */
    orderBy?: Prisma.investigacionesOrderByWithRelationInput | Prisma.investigacionesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for investigaciones.
     */
    cursor?: Prisma.investigacionesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` investigaciones from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` investigaciones.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of investigaciones.
     */
    distinct?: Prisma.InvestigacionesScalarFieldEnum | Prisma.InvestigacionesScalarFieldEnum[];
};
/**
 * investigaciones findFirstOrThrow
 */
export type investigacionesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    /**
     * Filter, which investigaciones to fetch.
     */
    where?: Prisma.investigacionesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of investigaciones to fetch.
     */
    orderBy?: Prisma.investigacionesOrderByWithRelationInput | Prisma.investigacionesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for investigaciones.
     */
    cursor?: Prisma.investigacionesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` investigaciones from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` investigaciones.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of investigaciones.
     */
    distinct?: Prisma.InvestigacionesScalarFieldEnum | Prisma.InvestigacionesScalarFieldEnum[];
};
/**
 * investigaciones findMany
 */
export type investigacionesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    /**
     * Filter, which investigaciones to fetch.
     */
    where?: Prisma.investigacionesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of investigaciones to fetch.
     */
    orderBy?: Prisma.investigacionesOrderByWithRelationInput | Prisma.investigacionesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing investigaciones.
     */
    cursor?: Prisma.investigacionesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` investigaciones from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` investigaciones.
     */
    skip?: number;
    distinct?: Prisma.InvestigacionesScalarFieldEnum | Prisma.InvestigacionesScalarFieldEnum[];
};
/**
 * investigaciones create
 */
export type investigacionesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    /**
     * The data needed to create a investigaciones.
     */
    data: Prisma.XOR<Prisma.investigacionesCreateInput, Prisma.investigacionesUncheckedCreateInput>;
};
/**
 * investigaciones createMany
 */
export type investigacionesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many investigaciones.
     */
    data: Prisma.investigacionesCreateManyInput | Prisma.investigacionesCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * investigaciones createManyAndReturn
 */
export type investigacionesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * The data used to create many investigaciones.
     */
    data: Prisma.investigacionesCreateManyInput | Prisma.investigacionesCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * investigaciones update
 */
export type investigacionesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    /**
     * The data needed to update a investigaciones.
     */
    data: Prisma.XOR<Prisma.investigacionesUpdateInput, Prisma.investigacionesUncheckedUpdateInput>;
    /**
     * Choose, which investigaciones to update.
     */
    where: Prisma.investigacionesWhereUniqueInput;
};
/**
 * investigaciones updateMany
 */
export type investigacionesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update investigaciones.
     */
    data: Prisma.XOR<Prisma.investigacionesUpdateManyMutationInput, Prisma.investigacionesUncheckedUpdateManyInput>;
    /**
     * Filter which investigaciones to update
     */
    where?: Prisma.investigacionesWhereInput;
    /**
     * Limit how many investigaciones to update.
     */
    limit?: number;
};
/**
 * investigaciones updateManyAndReturn
 */
export type investigacionesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * The data used to update investigaciones.
     */
    data: Prisma.XOR<Prisma.investigacionesUpdateManyMutationInput, Prisma.investigacionesUncheckedUpdateManyInput>;
    /**
     * Filter which investigaciones to update
     */
    where?: Prisma.investigacionesWhereInput;
    /**
     * Limit how many investigaciones to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * investigaciones upsert
 */
export type investigacionesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    /**
     * The filter to search for the investigaciones to update in case it exists.
     */
    where: Prisma.investigacionesWhereUniqueInput;
    /**
     * In case the investigaciones found by the `where` argument doesn't exist, create a new investigaciones with this data.
     */
    create: Prisma.XOR<Prisma.investigacionesCreateInput, Prisma.investigacionesUncheckedCreateInput>;
    /**
     * In case the investigaciones was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.investigacionesUpdateInput, Prisma.investigacionesUncheckedUpdateInput>;
};
/**
 * investigaciones delete
 */
export type investigacionesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
    /**
     * Filter which investigaciones to delete.
     */
    where: Prisma.investigacionesWhereUniqueInput;
};
/**
 * investigaciones deleteMany
 */
export type investigacionesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which investigaciones to delete
     */
    where?: Prisma.investigacionesWhereInput;
    /**
     * Limit how many investigaciones to delete.
     */
    limit?: number;
};
/**
 * investigaciones.incidencias
 */
export type investigaciones$incidenciasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * investigaciones.usuarios
 */
export type investigaciones$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * investigaciones without action
 */
export type investigacionesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investigaciones
     */
    select?: Prisma.investigacionesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the investigaciones
     */
    omit?: Prisma.investigacionesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.investigacionesInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=investigaciones.d.ts.map