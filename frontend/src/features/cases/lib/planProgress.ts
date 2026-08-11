/**
 * Avance de un plan, calculado por hitos del flujo.
 *
 * Antes salía del porcentaje de las actividades, y en la práctica solo tenía
 * dos valores: 0% mientras el área trabajaba y 100% de golpe al finalizar. No
 * se veía avanzar nada.
 *
 * Ahora cada paso real del jefe mueve la barra: aceptar el plan la arranca,
 * comentar y adjuntar evidencia la empujan, y el cierre la lleva a 100%. No es
 * un requisito —el jefe puede hacer todo el mismo día y enviar— sino una señal
 * visible de que el trabajo está ocurriendo.
 *
 * Vive acá y no en cada pantalla porque el panel del Jefe de Área y el de
 * Seguridad Operativa tienen que mostrar el mismo número.
 */

/** Aporte de cada hito. Suman 75; el 100% queda reservado al cierre. */
const PESO_ACEPTADO = 25;
const PESO_COMENTARIO = 25;
const PESO_EVIDENCIA = 25;

export interface HitosPlan {
  /** El área aceptó el plan y la ejecución arrancó. */
  aceptado: boolean;
  /** El jefe envió el cierre, o SO ya lo cerró. */
  finalizado: boolean;
  /** Rechazado o cualquier estado que detenga la ejecución. */
  detenido?: boolean;
  comentarios: number;
  evidencias: number;
}

export function progresoPorHitos({
  aceptado,
  finalizado,
  detenido = false,
  comentarios,
  evidencias,
}: HitosPlan): number {
  if (finalizado) return 100;
  if (detenido || !aceptado) return 0;

  let total = PESO_ACEPTADO;
  if (comentarios > 0) total += PESO_COMENTARIO;
  if (evidencias > 0) total += PESO_EVIDENCIA;
  // Tope antes del cierre: el 100% solo lo da finalizar.
  return Math.min(total, PESO_ACEPTADO + PESO_COMENTARIO + PESO_EVIDENCIA);
}
