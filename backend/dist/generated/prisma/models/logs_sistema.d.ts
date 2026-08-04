import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model logs_sistema
 *
 */
export type logs_sistemaModel = runtime.Types.Result.DefaultSelection<Prisma.$logs_sistemaPayload>;
export type AggregateLogs_sistema = {
    _count: Logs_sistemaCountAggregateOutputType | null;
    _avg: Logs_sistemaAvgAggregateOutputType | null;
    _sum: Logs_sistemaSumAggregateOutputType | null;
    _min: Logs_sistemaMinAggregateOutputType | null;
    _max: Logs_sistemaMaxAggregateOutputType | null;
};
export type Logs_sistemaAvgAggregateOutputType = {
    id_log: number | null;
    usuario: number | null;
};
export type Logs_sistemaSumAggregateOutputType = {
    id_log: number | null;
    usuario: number | null;
};
export type Logs_sistemaMinAggregateOutputType = {
    id_log: number | null;
    modulo: string | null;
    nivel: string | null;
    mensaje: string | null;
    stack_trace: string | null;
    usuario: number | null;
    fecha: Date | null;
};
export type Logs_sistemaMaxAggregateOutputType = {
    id_log: number | null;
    modulo: string | null;
    nivel: string | null;
    mensaje: string | null;
    stack_trace: string | null;
    usuario: number | null;
    fecha: Date | null;
};
export type Logs_sistemaCountAggregateOutputType = {
    id_log: number;
    modulo: number;
    nivel: number;
    mensaje: number;
    stack_trace: number;
    usuario: number;
    fecha: number;
    _all: number;
};
export type Logs_sistemaAvgAggregateInputType = {
    id_log?: true;
    usuario?: true;
};
export type Logs_sistemaSumAggregateInputType = {
    id_log?: true;
    usuario?: true;
};
export type Logs_sistemaMinAggregateInputType = {
    id_log?: true;
    modulo?: true;
    nivel?: true;
    mensaje?: true;
    stack_trace?: true;
    usuario?: true;
    fecha?: true;
};
export type Logs_sistemaMaxAggregateInputType = {
    id_log?: true;
    modulo?: true;
    nivel?: true;
    mensaje?: true;
    stack_trace?: true;
    usuario?: true;
    fecha?: true;
};
export type Logs_sistemaCountAggregateInputType = {
    id_log?: true;
    modulo?: true;
    nivel?: true;
    mensaje?: true;
    stack_trace?: true;
    usuario?: true;
    fecha?: true;
    _all?: true;
};
export type Logs_sistemaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which logs_sistema to aggregate.
     */
    where?: Prisma.logs_sistemaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of logs_sistemas to fetch.
     */
    orderBy?: Prisma.logs_sistemaOrderByWithRelationInput | Prisma.logs_sistemaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.logs_sistemaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` logs_sistemas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` logs_sistemas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned logs_sistemas
    **/
    _count?: true | Logs_sistemaCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Logs_sistemaAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Logs_sistemaSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Logs_sistemaMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Logs_sistemaMaxAggregateInputType;
};
export type GetLogs_sistemaAggregateType<T extends Logs_sistemaAggregateArgs> = {
    [P in keyof T & keyof AggregateLogs_sistema]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLogs_sistema[P]> : Prisma.GetScalarType<T[P], AggregateLogs_sistema[P]>;
};
export type logs_sistemaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.logs_sistemaWhereInput;
    orderBy?: Prisma.logs_sistemaOrderByWithAggregationInput | Prisma.logs_sistemaOrderByWithAggregationInput[];
    by: Prisma.Logs_sistemaScalarFieldEnum[] | Prisma.Logs_sistemaScalarFieldEnum;
    having?: Prisma.logs_sistemaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Logs_sistemaCountAggregateInputType | true;
    _avg?: Logs_sistemaAvgAggregateInputType;
    _sum?: Logs_sistemaSumAggregateInputType;
    _min?: Logs_sistemaMinAggregateInputType;
    _max?: Logs_sistemaMaxAggregateInputType;
};
export type Logs_sistemaGroupByOutputType = {
    id_log: number;
    modulo: string | null;
    nivel: string | null;
    mensaje: string | null;
    stack_trace: string | null;
    usuario: number | null;
    fecha: Date | null;
    _count: Logs_sistemaCountAggregateOutputType | null;
    _avg: Logs_sistemaAvgAggregateOutputType | null;
    _sum: Logs_sistemaSumAggregateOutputType | null;
    _min: Logs_sistemaMinAggregateOutputType | null;
    _max: Logs_sistemaMaxAggregateOutputType | null;
};
type GetLogs_sistemaGroupByPayload<T extends logs_sistemaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Logs_sistemaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Logs_sistemaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Logs_sistemaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Logs_sistemaGroupByOutputType[P]>;
}>>;
export type logs_sistemaWhereInput = {
    AND?: Prisma.logs_sistemaWhereInput | Prisma.logs_sistemaWhereInput[];
    OR?: Prisma.logs_sistemaWhereInput[];
    NOT?: Prisma.logs_sistemaWhereInput | Prisma.logs_sistemaWhereInput[];
    id_log?: Prisma.IntFilter<"logs_sistema"> | number;
    modulo?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    nivel?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    mensaje?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    stack_trace?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    usuario?: Prisma.IntNullableFilter<"logs_sistema"> | number | null;
    fecha?: Prisma.DateTimeNullableFilter<"logs_sistema"> | Date | string | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type logs_sistemaOrderByWithRelationInput = {
    id_log?: Prisma.SortOrder;
    modulo?: Prisma.SortOrderInput | Prisma.SortOrder;
    nivel?: Prisma.SortOrderInput | Prisma.SortOrder;
    mensaje?: Prisma.SortOrderInput | Prisma.SortOrder;
    stack_trace?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type logs_sistemaWhereUniqueInput = Prisma.AtLeast<{
    id_log?: number;
    AND?: Prisma.logs_sistemaWhereInput | Prisma.logs_sistemaWhereInput[];
    OR?: Prisma.logs_sistemaWhereInput[];
    NOT?: Prisma.logs_sistemaWhereInput | Prisma.logs_sistemaWhereInput[];
    modulo?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    nivel?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    mensaje?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    stack_trace?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    usuario?: Prisma.IntNullableFilter<"logs_sistema"> | number | null;
    fecha?: Prisma.DateTimeNullableFilter<"logs_sistema"> | Date | string | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id_log">;
export type logs_sistemaOrderByWithAggregationInput = {
    id_log?: Prisma.SortOrder;
    modulo?: Prisma.SortOrderInput | Prisma.SortOrder;
    nivel?: Prisma.SortOrderInput | Prisma.SortOrder;
    mensaje?: Prisma.SortOrderInput | Prisma.SortOrder;
    stack_trace?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.logs_sistemaCountOrderByAggregateInput;
    _avg?: Prisma.logs_sistemaAvgOrderByAggregateInput;
    _max?: Prisma.logs_sistemaMaxOrderByAggregateInput;
    _min?: Prisma.logs_sistemaMinOrderByAggregateInput;
    _sum?: Prisma.logs_sistemaSumOrderByAggregateInput;
};
export type logs_sistemaScalarWhereWithAggregatesInput = {
    AND?: Prisma.logs_sistemaScalarWhereWithAggregatesInput | Prisma.logs_sistemaScalarWhereWithAggregatesInput[];
    OR?: Prisma.logs_sistemaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.logs_sistemaScalarWhereWithAggregatesInput | Prisma.logs_sistemaScalarWhereWithAggregatesInput[];
    id_log?: Prisma.IntWithAggregatesFilter<"logs_sistema"> | number;
    modulo?: Prisma.StringNullableWithAggregatesFilter<"logs_sistema"> | string | null;
    nivel?: Prisma.StringNullableWithAggregatesFilter<"logs_sistema"> | string | null;
    mensaje?: Prisma.StringNullableWithAggregatesFilter<"logs_sistema"> | string | null;
    stack_trace?: Prisma.StringNullableWithAggregatesFilter<"logs_sistema"> | string | null;
    usuario?: Prisma.IntNullableWithAggregatesFilter<"logs_sistema"> | number | null;
    fecha?: Prisma.DateTimeNullableWithAggregatesFilter<"logs_sistema"> | Date | string | null;
};
export type logs_sistemaCreateInput = {
    modulo?: string | null;
    nivel?: string | null;
    mensaje?: string | null;
    stack_trace?: string | null;
    fecha?: Date | string | null;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutLogs_sistemaInput;
};
export type logs_sistemaUncheckedCreateInput = {
    id_log?: number;
    modulo?: string | null;
    nivel?: string | null;
    mensaje?: string | null;
    stack_trace?: string | null;
    usuario?: number | null;
    fecha?: Date | string | null;
};
export type logs_sistemaUpdateInput = {
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nivel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mensaje?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    stack_trace?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuarios?: Prisma.usuariosUpdateOneWithoutLogs_sistemaNestedInput;
};
export type logs_sistemaUncheckedUpdateInput = {
    id_log?: Prisma.IntFieldUpdateOperationsInput | number;
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nivel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mensaje?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    stack_trace?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type logs_sistemaCreateManyInput = {
    id_log?: number;
    modulo?: string | null;
    nivel?: string | null;
    mensaje?: string | null;
    stack_trace?: string | null;
    usuario?: number | null;
    fecha?: Date | string | null;
};
export type logs_sistemaUpdateManyMutationInput = {
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nivel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mensaje?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    stack_trace?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type logs_sistemaUncheckedUpdateManyInput = {
    id_log?: Prisma.IntFieldUpdateOperationsInput | number;
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nivel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mensaje?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    stack_trace?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuario?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type logs_sistemaCountOrderByAggregateInput = {
    id_log?: Prisma.SortOrder;
    modulo?: Prisma.SortOrder;
    nivel?: Prisma.SortOrder;
    mensaje?: Prisma.SortOrder;
    stack_trace?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
};
export type logs_sistemaAvgOrderByAggregateInput = {
    id_log?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type logs_sistemaMaxOrderByAggregateInput = {
    id_log?: Prisma.SortOrder;
    modulo?: Prisma.SortOrder;
    nivel?: Prisma.SortOrder;
    mensaje?: Prisma.SortOrder;
    stack_trace?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
};
export type logs_sistemaMinOrderByAggregateInput = {
    id_log?: Prisma.SortOrder;
    modulo?: Prisma.SortOrder;
    nivel?: Prisma.SortOrder;
    mensaje?: Prisma.SortOrder;
    stack_trace?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
};
export type logs_sistemaSumOrderByAggregateInput = {
    id_log?: Prisma.SortOrder;
    usuario?: Prisma.SortOrder;
};
export type Logs_sistemaListRelationFilter = {
    every?: Prisma.logs_sistemaWhereInput;
    some?: Prisma.logs_sistemaWhereInput;
    none?: Prisma.logs_sistemaWhereInput;
};
export type logs_sistemaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type logs_sistemaCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.logs_sistemaCreateWithoutUsuariosInput, Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput> | Prisma.logs_sistemaCreateWithoutUsuariosInput[] | Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.logs_sistemaCreateOrConnectWithoutUsuariosInput | Prisma.logs_sistemaCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.logs_sistemaCreateManyUsuariosInputEnvelope;
    connect?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
};
export type logs_sistemaUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.logs_sistemaCreateWithoutUsuariosInput, Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput> | Prisma.logs_sistemaCreateWithoutUsuariosInput[] | Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.logs_sistemaCreateOrConnectWithoutUsuariosInput | Prisma.logs_sistemaCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.logs_sistemaCreateManyUsuariosInputEnvelope;
    connect?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
};
export type logs_sistemaUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.logs_sistemaCreateWithoutUsuariosInput, Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput> | Prisma.logs_sistemaCreateWithoutUsuariosInput[] | Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.logs_sistemaCreateOrConnectWithoutUsuariosInput | Prisma.logs_sistemaCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.logs_sistemaUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.logs_sistemaUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.logs_sistemaCreateManyUsuariosInputEnvelope;
    set?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
    disconnect?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
    delete?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
    connect?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
    update?: Prisma.logs_sistemaUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.logs_sistemaUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.logs_sistemaUpdateManyWithWhereWithoutUsuariosInput | Prisma.logs_sistemaUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.logs_sistemaScalarWhereInput | Prisma.logs_sistemaScalarWhereInput[];
};
export type logs_sistemaUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.logs_sistemaCreateWithoutUsuariosInput, Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput> | Prisma.logs_sistemaCreateWithoutUsuariosInput[] | Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.logs_sistemaCreateOrConnectWithoutUsuariosInput | Prisma.logs_sistemaCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.logs_sistemaUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.logs_sistemaUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.logs_sistemaCreateManyUsuariosInputEnvelope;
    set?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
    disconnect?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
    delete?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
    connect?: Prisma.logs_sistemaWhereUniqueInput | Prisma.logs_sistemaWhereUniqueInput[];
    update?: Prisma.logs_sistemaUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.logs_sistemaUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.logs_sistemaUpdateManyWithWhereWithoutUsuariosInput | Prisma.logs_sistemaUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.logs_sistemaScalarWhereInput | Prisma.logs_sistemaScalarWhereInput[];
};
export type logs_sistemaCreateWithoutUsuariosInput = {
    modulo?: string | null;
    nivel?: string | null;
    mensaje?: string | null;
    stack_trace?: string | null;
    fecha?: Date | string | null;
};
export type logs_sistemaUncheckedCreateWithoutUsuariosInput = {
    id_log?: number;
    modulo?: string | null;
    nivel?: string | null;
    mensaje?: string | null;
    stack_trace?: string | null;
    fecha?: Date | string | null;
};
export type logs_sistemaCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.logs_sistemaWhereUniqueInput;
    create: Prisma.XOR<Prisma.logs_sistemaCreateWithoutUsuariosInput, Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput>;
};
export type logs_sistemaCreateManyUsuariosInputEnvelope = {
    data: Prisma.logs_sistemaCreateManyUsuariosInput | Prisma.logs_sistemaCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type logs_sistemaUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.logs_sistemaWhereUniqueInput;
    update: Prisma.XOR<Prisma.logs_sistemaUpdateWithoutUsuariosInput, Prisma.logs_sistemaUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.logs_sistemaCreateWithoutUsuariosInput, Prisma.logs_sistemaUncheckedCreateWithoutUsuariosInput>;
};
export type logs_sistemaUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.logs_sistemaWhereUniqueInput;
    data: Prisma.XOR<Prisma.logs_sistemaUpdateWithoutUsuariosInput, Prisma.logs_sistemaUncheckedUpdateWithoutUsuariosInput>;
};
export type logs_sistemaUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.logs_sistemaScalarWhereInput;
    data: Prisma.XOR<Prisma.logs_sistemaUpdateManyMutationInput, Prisma.logs_sistemaUncheckedUpdateManyWithoutUsuariosInput>;
};
export type logs_sistemaScalarWhereInput = {
    AND?: Prisma.logs_sistemaScalarWhereInput | Prisma.logs_sistemaScalarWhereInput[];
    OR?: Prisma.logs_sistemaScalarWhereInput[];
    NOT?: Prisma.logs_sistemaScalarWhereInput | Prisma.logs_sistemaScalarWhereInput[];
    id_log?: Prisma.IntFilter<"logs_sistema"> | number;
    modulo?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    nivel?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    mensaje?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    stack_trace?: Prisma.StringNullableFilter<"logs_sistema"> | string | null;
    usuario?: Prisma.IntNullableFilter<"logs_sistema"> | number | null;
    fecha?: Prisma.DateTimeNullableFilter<"logs_sistema"> | Date | string | null;
};
export type logs_sistemaCreateManyUsuariosInput = {
    id_log?: number;
    modulo?: string | null;
    nivel?: string | null;
    mensaje?: string | null;
    stack_trace?: string | null;
    fecha?: Date | string | null;
};
export type logs_sistemaUpdateWithoutUsuariosInput = {
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nivel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mensaje?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    stack_trace?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type logs_sistemaUncheckedUpdateWithoutUsuariosInput = {
    id_log?: Prisma.IntFieldUpdateOperationsInput | number;
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nivel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mensaje?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    stack_trace?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type logs_sistemaUncheckedUpdateManyWithoutUsuariosInput = {
    id_log?: Prisma.IntFieldUpdateOperationsInput | number;
    modulo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nivel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mensaje?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    stack_trace?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type logs_sistemaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_log?: boolean;
    modulo?: boolean;
    nivel?: boolean;
    mensaje?: boolean;
    stack_trace?: boolean;
    usuario?: boolean;
    fecha?: boolean;
    usuarios?: boolean | Prisma.logs_sistema$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["logs_sistema"]>;
export type logs_sistemaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_log?: boolean;
    modulo?: boolean;
    nivel?: boolean;
    mensaje?: boolean;
    stack_trace?: boolean;
    usuario?: boolean;
    fecha?: boolean;
    usuarios?: boolean | Prisma.logs_sistema$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["logs_sistema"]>;
export type logs_sistemaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_log?: boolean;
    modulo?: boolean;
    nivel?: boolean;
    mensaje?: boolean;
    stack_trace?: boolean;
    usuario?: boolean;
    fecha?: boolean;
    usuarios?: boolean | Prisma.logs_sistema$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["logs_sistema"]>;
export type logs_sistemaSelectScalar = {
    id_log?: boolean;
    modulo?: boolean;
    nivel?: boolean;
    mensaje?: boolean;
    stack_trace?: boolean;
    usuario?: boolean;
    fecha?: boolean;
};
export type logs_sistemaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_log" | "modulo" | "nivel" | "mensaje" | "stack_trace" | "usuario" | "fecha", ExtArgs["result"]["logs_sistema"]>;
export type logs_sistemaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuarios?: boolean | Prisma.logs_sistema$usuariosArgs<ExtArgs>;
};
export type logs_sistemaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuarios?: boolean | Prisma.logs_sistema$usuariosArgs<ExtArgs>;
};
export type logs_sistemaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuarios?: boolean | Prisma.logs_sistema$usuariosArgs<ExtArgs>;
};
export type $logs_sistemaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "logs_sistema";
    objects: {
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_log: number;
        modulo: string | null;
        nivel: string | null;
        mensaje: string | null;
        stack_trace: string | null;
        usuario: number | null;
        fecha: Date | null;
    }, ExtArgs["result"]["logs_sistema"]>;
    composites: {};
};
export type logs_sistemaGetPayload<S extends boolean | null | undefined | logs_sistemaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload, S>;
export type logs_sistemaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<logs_sistemaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Logs_sistemaCountAggregateInputType | true;
};
export interface logs_sistemaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['logs_sistema'];
        meta: {
            name: 'logs_sistema';
        };
    };
    /**
     * Find zero or one Logs_sistema that matches the filter.
     * @param {logs_sistemaFindUniqueArgs} args - Arguments to find a Logs_sistema
     * @example
     * // Get one Logs_sistema
     * const logs_sistema = await prisma.logs_sistema.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends logs_sistemaFindUniqueArgs>(args: Prisma.SelectSubset<T, logs_sistemaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__logs_sistemaClient<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Logs_sistema that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {logs_sistemaFindUniqueOrThrowArgs} args - Arguments to find a Logs_sistema
     * @example
     * // Get one Logs_sistema
     * const logs_sistema = await prisma.logs_sistema.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends logs_sistemaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, logs_sistemaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__logs_sistemaClient<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Logs_sistema that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logs_sistemaFindFirstArgs} args - Arguments to find a Logs_sistema
     * @example
     * // Get one Logs_sistema
     * const logs_sistema = await prisma.logs_sistema.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends logs_sistemaFindFirstArgs>(args?: Prisma.SelectSubset<T, logs_sistemaFindFirstArgs<ExtArgs>>): Prisma.Prisma__logs_sistemaClient<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Logs_sistema that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logs_sistemaFindFirstOrThrowArgs} args - Arguments to find a Logs_sistema
     * @example
     * // Get one Logs_sistema
     * const logs_sistema = await prisma.logs_sistema.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends logs_sistemaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, logs_sistemaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__logs_sistemaClient<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Logs_sistemas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logs_sistemaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Logs_sistemas
     * const logs_sistemas = await prisma.logs_sistema.findMany()
     *
     * // Get first 10 Logs_sistemas
     * const logs_sistemas = await prisma.logs_sistema.findMany({ take: 10 })
     *
     * // Only select the `id_log`
     * const logs_sistemaWithId_logOnly = await prisma.logs_sistema.findMany({ select: { id_log: true } })
     *
     */
    findMany<T extends logs_sistemaFindManyArgs>(args?: Prisma.SelectSubset<T, logs_sistemaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Logs_sistema.
     * @param {logs_sistemaCreateArgs} args - Arguments to create a Logs_sistema.
     * @example
     * // Create one Logs_sistema
     * const Logs_sistema = await prisma.logs_sistema.create({
     *   data: {
     *     // ... data to create a Logs_sistema
     *   }
     * })
     *
     */
    create<T extends logs_sistemaCreateArgs>(args: Prisma.SelectSubset<T, logs_sistemaCreateArgs<ExtArgs>>): Prisma.Prisma__logs_sistemaClient<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Logs_sistemas.
     * @param {logs_sistemaCreateManyArgs} args - Arguments to create many Logs_sistemas.
     * @example
     * // Create many Logs_sistemas
     * const logs_sistema = await prisma.logs_sistema.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends logs_sistemaCreateManyArgs>(args?: Prisma.SelectSubset<T, logs_sistemaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Logs_sistemas and returns the data saved in the database.
     * @param {logs_sistemaCreateManyAndReturnArgs} args - Arguments to create many Logs_sistemas.
     * @example
     * // Create many Logs_sistemas
     * const logs_sistema = await prisma.logs_sistema.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Logs_sistemas and only return the `id_log`
     * const logs_sistemaWithId_logOnly = await prisma.logs_sistema.createManyAndReturn({
     *   select: { id_log: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends logs_sistemaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, logs_sistemaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Logs_sistema.
     * @param {logs_sistemaDeleteArgs} args - Arguments to delete one Logs_sistema.
     * @example
     * // Delete one Logs_sistema
     * const Logs_sistema = await prisma.logs_sistema.delete({
     *   where: {
     *     // ... filter to delete one Logs_sistema
     *   }
     * })
     *
     */
    delete<T extends logs_sistemaDeleteArgs>(args: Prisma.SelectSubset<T, logs_sistemaDeleteArgs<ExtArgs>>): Prisma.Prisma__logs_sistemaClient<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Logs_sistema.
     * @param {logs_sistemaUpdateArgs} args - Arguments to update one Logs_sistema.
     * @example
     * // Update one Logs_sistema
     * const logs_sistema = await prisma.logs_sistema.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends logs_sistemaUpdateArgs>(args: Prisma.SelectSubset<T, logs_sistemaUpdateArgs<ExtArgs>>): Prisma.Prisma__logs_sistemaClient<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Logs_sistemas.
     * @param {logs_sistemaDeleteManyArgs} args - Arguments to filter Logs_sistemas to delete.
     * @example
     * // Delete a few Logs_sistemas
     * const { count } = await prisma.logs_sistema.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends logs_sistemaDeleteManyArgs>(args?: Prisma.SelectSubset<T, logs_sistemaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Logs_sistemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logs_sistemaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Logs_sistemas
     * const logs_sistema = await prisma.logs_sistema.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends logs_sistemaUpdateManyArgs>(args: Prisma.SelectSubset<T, logs_sistemaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Logs_sistemas and returns the data updated in the database.
     * @param {logs_sistemaUpdateManyAndReturnArgs} args - Arguments to update many Logs_sistemas.
     * @example
     * // Update many Logs_sistemas
     * const logs_sistema = await prisma.logs_sistema.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Logs_sistemas and only return the `id_log`
     * const logs_sistemaWithId_logOnly = await prisma.logs_sistema.updateManyAndReturn({
     *   select: { id_log: true },
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
    updateManyAndReturn<T extends logs_sistemaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, logs_sistemaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Logs_sistema.
     * @param {logs_sistemaUpsertArgs} args - Arguments to update or create a Logs_sistema.
     * @example
     * // Update or create a Logs_sistema
     * const logs_sistema = await prisma.logs_sistema.upsert({
     *   create: {
     *     // ... data to create a Logs_sistema
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Logs_sistema we want to update
     *   }
     * })
     */
    upsert<T extends logs_sistemaUpsertArgs>(args: Prisma.SelectSubset<T, logs_sistemaUpsertArgs<ExtArgs>>): Prisma.Prisma__logs_sistemaClient<runtime.Types.Result.GetResult<Prisma.$logs_sistemaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Logs_sistemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logs_sistemaCountArgs} args - Arguments to filter Logs_sistemas to count.
     * @example
     * // Count the number of Logs_sistemas
     * const count = await prisma.logs_sistema.count({
     *   where: {
     *     // ... the filter for the Logs_sistemas we want to count
     *   }
     * })
    **/
    count<T extends logs_sistemaCountArgs>(args?: Prisma.Subset<T, logs_sistemaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Logs_sistemaCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Logs_sistema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Logs_sistemaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Logs_sistemaAggregateArgs>(args: Prisma.Subset<T, Logs_sistemaAggregateArgs>): Prisma.PrismaPromise<GetLogs_sistemaAggregateType<T>>;
    /**
     * Group by Logs_sistema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logs_sistemaGroupByArgs} args - Group by arguments.
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
    groupBy<T extends logs_sistemaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: logs_sistemaGroupByArgs['orderBy'];
    } : {
        orderBy?: logs_sistemaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, logs_sistemaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogs_sistemaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the logs_sistema model
     */
    readonly fields: logs_sistemaFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for logs_sistema.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__logs_sistemaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuarios<T extends Prisma.logs_sistema$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.logs_sistema$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the logs_sistema model
 */
export interface logs_sistemaFieldRefs {
    readonly id_log: Prisma.FieldRef<"logs_sistema", 'Int'>;
    readonly modulo: Prisma.FieldRef<"logs_sistema", 'String'>;
    readonly nivel: Prisma.FieldRef<"logs_sistema", 'String'>;
    readonly mensaje: Prisma.FieldRef<"logs_sistema", 'String'>;
    readonly stack_trace: Prisma.FieldRef<"logs_sistema", 'String'>;
    readonly usuario: Prisma.FieldRef<"logs_sistema", 'Int'>;
    readonly fecha: Prisma.FieldRef<"logs_sistema", 'DateTime'>;
}
/**
 * logs_sistema findUnique
 */
export type logs_sistemaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    /**
     * Filter, which logs_sistema to fetch.
     */
    where: Prisma.logs_sistemaWhereUniqueInput;
};
/**
 * logs_sistema findUniqueOrThrow
 */
export type logs_sistemaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    /**
     * Filter, which logs_sistema to fetch.
     */
    where: Prisma.logs_sistemaWhereUniqueInput;
};
/**
 * logs_sistema findFirst
 */
export type logs_sistemaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    /**
     * Filter, which logs_sistema to fetch.
     */
    where?: Prisma.logs_sistemaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of logs_sistemas to fetch.
     */
    orderBy?: Prisma.logs_sistemaOrderByWithRelationInput | Prisma.logs_sistemaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for logs_sistemas.
     */
    cursor?: Prisma.logs_sistemaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` logs_sistemas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` logs_sistemas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of logs_sistemas.
     */
    distinct?: Prisma.Logs_sistemaScalarFieldEnum | Prisma.Logs_sistemaScalarFieldEnum[];
};
/**
 * logs_sistema findFirstOrThrow
 */
export type logs_sistemaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    /**
     * Filter, which logs_sistema to fetch.
     */
    where?: Prisma.logs_sistemaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of logs_sistemas to fetch.
     */
    orderBy?: Prisma.logs_sistemaOrderByWithRelationInput | Prisma.logs_sistemaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for logs_sistemas.
     */
    cursor?: Prisma.logs_sistemaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` logs_sistemas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` logs_sistemas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of logs_sistemas.
     */
    distinct?: Prisma.Logs_sistemaScalarFieldEnum | Prisma.Logs_sistemaScalarFieldEnum[];
};
/**
 * logs_sistema findMany
 */
export type logs_sistemaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    /**
     * Filter, which logs_sistemas to fetch.
     */
    where?: Prisma.logs_sistemaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of logs_sistemas to fetch.
     */
    orderBy?: Prisma.logs_sistemaOrderByWithRelationInput | Prisma.logs_sistemaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing logs_sistemas.
     */
    cursor?: Prisma.logs_sistemaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` logs_sistemas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` logs_sistemas.
     */
    skip?: number;
    distinct?: Prisma.Logs_sistemaScalarFieldEnum | Prisma.Logs_sistemaScalarFieldEnum[];
};
/**
 * logs_sistema create
 */
export type logs_sistemaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    /**
     * The data needed to create a logs_sistema.
     */
    data?: Prisma.XOR<Prisma.logs_sistemaCreateInput, Prisma.logs_sistemaUncheckedCreateInput>;
};
/**
 * logs_sistema createMany
 */
export type logs_sistemaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many logs_sistemas.
     */
    data: Prisma.logs_sistemaCreateManyInput | Prisma.logs_sistemaCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * logs_sistema createManyAndReturn
 */
export type logs_sistemaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * The data used to create many logs_sistemas.
     */
    data: Prisma.logs_sistemaCreateManyInput | Prisma.logs_sistemaCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * logs_sistema update
 */
export type logs_sistemaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    /**
     * The data needed to update a logs_sistema.
     */
    data: Prisma.XOR<Prisma.logs_sistemaUpdateInput, Prisma.logs_sistemaUncheckedUpdateInput>;
    /**
     * Choose, which logs_sistema to update.
     */
    where: Prisma.logs_sistemaWhereUniqueInput;
};
/**
 * logs_sistema updateMany
 */
export type logs_sistemaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update logs_sistemas.
     */
    data: Prisma.XOR<Prisma.logs_sistemaUpdateManyMutationInput, Prisma.logs_sistemaUncheckedUpdateManyInput>;
    /**
     * Filter which logs_sistemas to update
     */
    where?: Prisma.logs_sistemaWhereInput;
    /**
     * Limit how many logs_sistemas to update.
     */
    limit?: number;
};
/**
 * logs_sistema updateManyAndReturn
 */
export type logs_sistemaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * The data used to update logs_sistemas.
     */
    data: Prisma.XOR<Prisma.logs_sistemaUpdateManyMutationInput, Prisma.logs_sistemaUncheckedUpdateManyInput>;
    /**
     * Filter which logs_sistemas to update
     */
    where?: Prisma.logs_sistemaWhereInput;
    /**
     * Limit how many logs_sistemas to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * logs_sistema upsert
 */
export type logs_sistemaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    /**
     * The filter to search for the logs_sistema to update in case it exists.
     */
    where: Prisma.logs_sistemaWhereUniqueInput;
    /**
     * In case the logs_sistema found by the `where` argument doesn't exist, create a new logs_sistema with this data.
     */
    create: Prisma.XOR<Prisma.logs_sistemaCreateInput, Prisma.logs_sistemaUncheckedCreateInput>;
    /**
     * In case the logs_sistema was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.logs_sistemaUpdateInput, Prisma.logs_sistemaUncheckedUpdateInput>;
};
/**
 * logs_sistema delete
 */
export type logs_sistemaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
    /**
     * Filter which logs_sistema to delete.
     */
    where: Prisma.logs_sistemaWhereUniqueInput;
};
/**
 * logs_sistema deleteMany
 */
export type logs_sistemaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which logs_sistemas to delete
     */
    where?: Prisma.logs_sistemaWhereInput;
    /**
     * Limit how many logs_sistemas to delete.
     */
    limit?: number;
};
/**
 * logs_sistema.usuarios
 */
export type logs_sistema$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * logs_sistema without action
 */
export type logs_sistemaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs_sistema
     */
    select?: Prisma.logs_sistemaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the logs_sistema
     */
    omit?: Prisma.logs_sistemaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.logs_sistemaInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=logs_sistema.d.ts.map