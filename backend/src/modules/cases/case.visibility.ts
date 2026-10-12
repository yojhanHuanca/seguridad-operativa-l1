import { areaDelActor, esJefeDeArea, type Actor } from "../../utils/actor.js";

interface CasoGestionado {
  area_responsable: number | null;
  planes_accion: { responsable: number | null; id_area: number | null }[];
}

/** Shared by case details and downloads: assigning a plan also grants case visibility. */
export async function casoVisibleParaJefe(caso: CasoGestionado, actor?: Actor) {
  if (!esJefeDeArea(actor)) return true;
  const area = await areaDelActor(actor);
  return (area != null && caso.area_responsable === area)
    || caso.planes_accion.some(plan => plan.responsable === actor!.id_usuario || (area != null && plan.id_area === area));
}
