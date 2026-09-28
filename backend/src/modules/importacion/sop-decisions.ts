import type { DecisionSop } from './importacion.types.js';

const key = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
export const isFinished = (state: string | null) => ['cerrado', 'rechazado', 'finalizado', 'completado'].includes(key(state ?? ''));

/** Only the new, unfinished source records may receive an import decision. */
export function applySopDecision<T extends { codigo: string; estado: string | null; plans: { row: number; estado: string | null }[] }>(source: T, decision: DecisionSop, exists: boolean): T {
  if (exists || isFinished(source.estado)) throw new Error('El SOP existente o terminado está protegido.');
  if (decision.motivo.trim().length < 10) throw new Error('Indica un motivo de al menos 10 caracteres.');
  const result = { ...source, plans: source.plans.map(plan => ({ ...plan })) };
  if (decision.accion === 'planes') {
    if (!decision.planes?.length) throw new Error('Selecciona al menos un plan.');
    const seen = new Set<number>();
    for (const change of decision.planes) {
      const plan = result.plans.find(p => p.row === change.row);
      if (!plan || isFinished(plan.estado) || seen.has(change.row)) throw new Error('El plan no pertenece al SOP, está terminado o se repite.');
      seen.add(change.row);
      plan.estado = change.estado;
    }
  } else {
    if (decision.accion === 'asignar' && !result.plans.some(p => !isFinished(p.estado))) throw new Error('El SOP no tiene planes pendientes para asignar.');
    for (const plan of result.plans) if (!isFinished(plan.estado)) plan.estado = decision.accion === 'cerrar' ? 'Cerrado' : 'Enviado';
  }
  result.estado = decision.accion === 'cerrar' ? 'Cerrado'
    : result.plans.some(p => ['enejecucion', 'abierto', 'enproceso', 'aceptado'].includes(key(p.estado ?? ''))) ? 'Ejecución'
    : result.plans.some(p => !isFinished(p.estado)) ? 'Plan de Acción' : 'Verificación';
  return result;
}
