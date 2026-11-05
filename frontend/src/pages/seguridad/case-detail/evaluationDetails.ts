import type { CaseDetail } from "@/features/cases/types";

/**
 * Legacy cases may not have the Evaluation fields yet. In that case, show the
 * original operational report values so Investigation and direct-to-Plan paths
 * still have the context that was actually submitted.
 */
export function getEvaluationDetails(caso: CaseDetail) {
  const evento = caso.evento_caso[0]?.eventos_operativos;
  const descripcion =
    caso.descripcion_evento?.trim() || evento?.descripcion?.trim() || caso.descripcion?.trim() || "";
  const posiblesCausas =
    caso.posibles_causas?.trim() ||
    [
      evento?.catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle?.nombre,
      evento?.catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle?.nombre,
    ]
      .filter((value): value is string => Boolean(value?.trim()))
      .join(" · ");

  return { descripcion, posiblesCausas };
}
