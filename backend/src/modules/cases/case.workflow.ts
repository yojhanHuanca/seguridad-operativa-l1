/**
 * Máquina de estados del expediente.
 *
 * Hasta ahora la única barrera era la interfaz: el panel escondía los botones
 * que no correspondían a la etapa, pero la API aceptaba cualquier acción en
 * cualquier orden. Un doble clic, un botón "atrás" o una pestaña vieja bastaba
 * para que un caso en Plan de Acción volviera a Evaluación, o para que un caso
 * rechazado reviviera al aceptar su plan.
 *
 * Acá vive la única fuente de verdad de qué se puede hacer en cada etapa. Los
 * retrocesos legítimos existen y tienen su propia puerta: `rollback` (con
 * motivo obligatorio, que queda en la línea de tiempo) y `reopen`.
 */

export type AccionCaso =
  | "approve"
  | "reject"
  | "addObservation"
  | "updateTipo"
  | "evaluate"
  | "requestInfo"
  | "respondInfo"
  | "saveInvestigation"
  | "createPlan"
  | "updatePlan"
  | "acceptPlan"
  | "startExecution"
  | "completeExecution"
  | "reviewFinalPlan"
  | "requestExtension"
  | "reviewExtension"
  | "sendToVerification"
  | "keepPending"
  | "close"
  | "reopen"
  | "rollback";

const RECEPCION = "Recepción";
const EVALUACION = "Evaluación";
const PENDIENTE_INFO = "Pendiente de Información";
const INVESTIGACION = "Investigación";
const PLAN = "Plan de Acción";
const EJECUCION = "Ejecución";
const PRORROGA = "Prórroga Solicitada";
const VERIFICACION = "Verificación";
const CERRADO = "Cerrado";
const RECHAZADO = "Rechazado";

/** Etapas desde las que cada acción tiene sentido. */
const ORIGENES_VALIDOS: Record<AccionCaso, string[]> = {
  // --- Recepción y evaluación
  approve: [RECEPCION],
  reject: [RECEPCION, EVALUACION, PENDIENTE_INFO],
  addObservation: [RECEPCION, EVALUACION, PENDIENTE_INFO],
  updateTipo: [RECEPCION, EVALUACION, PENDIENTE_INFO],
  evaluate: [EVALUACION, PENDIENTE_INFO],
  requestInfo: [RECEPCION, EVALUACION],
  respondInfo: [PENDIENTE_INFO],

  // --- Investigación y armado del plan
  saveInvestigation: [INVESTIGACION],
  createPlan: [PLAN],
  // Corregir un plan ya enviado sigue siendo válido mientras el área no lo
  // acepte; una vez en Ejecución el plan es del área y se toca por sus propias
  // acciones (avances, prórroga, cierre de ejecución).
  updatePlan: [PLAN],

  // --- Ejecución del área
  acceptPlan: [PLAN],
  startExecution: [PLAN],
  completeExecution: [EJECUCION, PRORROGA],
  requestExtension: [EJECUCION],
  reviewExtension: [PRORROGA],

  // --- Verificación y cierre
  // La revisión final de un plan puede llegar con el caso todavía en Ejecución
  // (quedan otros planes abiertos) o ya en Verificación (era el último).
  reviewFinalPlan: [EJECUCION, PRORROGA, VERIFICACION],
  sendToVerification: [EJECUCION, PRORROGA],
  keepPending: [VERIFICACION],
  close: [VERIFICACION],

  // --- Puertas explícitas de retroceso
  reopen: [CERRADO, RECHAZADO],
  rollback: [EVALUACION, PENDIENTE_INFO, INVESTIGACION, PLAN, EJECUCION, PRORROGA, VERIFICACION],
};

/**
 * Mensaje en el idioma del usuario, no del programador: dice en qué etapa está
 * el caso y por qué la acción no aplica, que es lo que necesita ver quien lo
 * está operando.
 */
const NOMBRE_ACCION: Record<AccionCaso, string> = {
  approve: "aprobar la recepción",
  reject: "rechazar el caso",
  addObservation: "registrar una observación",
  updateTipo: "cambiar el tipo",
  evaluate: "evaluar el caso",
  requestInfo: "solicitar información",
  respondInfo: "responder la solicitud de información",
  saveInvestigation: "guardar la investigación",
  createPlan: "crear planes de acción",
  updatePlan: "modificar el plan",
  acceptPlan: "aceptar el plan",
  startExecution: "iniciar la ejecución",
  completeExecution: "cerrar la ejecución",
  reviewFinalPlan: "revisar el plan ejecutado",
  requestExtension: "solicitar una prórroga",
  reviewExtension: "resolver la prórroga",
  sendToVerification: "enviar a verificación",
  keepPending: "mantener el caso en verificación",
  close: "cerrar el caso",
  reopen: "reabrir el caso",
  rollback: "revertir la etapa",
};

export class TransicionInvalidaError extends Error {}

/**
 * Corta la acción si la etapa actual no la admite.
 *
 * `estadoActual` puede venir nulo si el caso quedó sin estado por datos
 * heredados; en ese caso se deja pasar para no bloquear expedientes viejos,
 * que es preferible a dejar el sistema inoperante sobre datos que ya existen.
 */
export function assertTransicion(accion: AccionCaso, estadoActual: string | null | undefined) {
  if (!estadoActual) return;

  const permitidos = ORIGENES_VALIDOS[accion];
  if (permitidos.includes(estadoActual)) return;

  throw new TransicionInvalidaError(
    `No se puede ${NOMBRE_ACCION[accion]}: el caso está en "${estadoActual}" y esta acción solo aplica en ${permitidos
      .map((e) => `"${e}"`)
      .join(", ")}.`
  );
}
