import type { Prisma } from "../../generated/prisma/client.js";

type Client = Pick<Prisma.TransactionClient, "planes_accion">;
const CLOSED = ["Cerrado", "Rechazado"];

const pendingActivity = (id: number): Prisma.actividades_planWhereInput => ({
  responsable: id,
  OR: [{ estado: null }, { catalogo_detalle: { nombre: { notIn: ["Completado", "Completada", "Cerrado", "Cancelado", "Finalizado"] } } }],
});

/** Closed history is never moved. Completed activities retain their original owner. */
export function pendingPlansForUser(client: Client, id: number) {
  return client.planes_accion.findMany({
    where: {
      NOT: { catalogo_detalle: { nombre: { in: CLOSED } } },
      casos_sop: { NOT: { catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: { in: CLOSED } } } },
      OR: [{ responsable: id }, { actividades_plan: { some: pendingActivity(id) } }],
    },
    select: {
      id_plan: true, id_caso: true, codigo_plan: true, id_area: true, responsable: true,
      areas: { select: { nombre_area: true } },
      catalogo_detalle: { select: { nombre: true } },
      casos_sop: { select: { codigo_sop: true } },
      actividades_plan: { where: pendingActivity(id), select: { id_actividad: true } },
    },
    orderBy: { id_plan: "asc" },
  });
}

export type AccessChange = { id_rol?: number; id_area?: number | null; estado?: string };
type Current = { roles: { nombre_rol: string } | null; id_rol: number | null; id_area: number | null; estado: string | null };

export async function assertChiefCanChangeAccess(client: Client, id: number, current: Current, data: AccessChange) {
  if (current.roles?.nombre_rol !== "Jefe de Área") return;
  const losingAccess = (data.id_rol !== undefined && data.id_rol !== current.id_rol)
    || (data.id_area !== undefined && data.id_area !== current.id_area)
    || (data.estado !== undefined && data.estado !== current.estado && data.estado !== "Activo");
  if (!losingAccess) return;
  const plans = await pendingPlansForUser(client, id);
  if (plans.length) throw new Error(`Este jefe tiene ${plans.length} plan(es) con responsabilidades pendientes. Reasigna primero sus planes y actividades desde Editar usuario > Reasignar planes pendientes. No se modificó su acceso.`);
}
