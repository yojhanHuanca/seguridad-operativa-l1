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
export type AccionCaso = "approve" | "reject" | "addObservation" | "updateTipo" | "evaluate" | "requestInfo" | "respondInfo" | "saveInvestigation" | "createPlan" | "updatePlan" | "acceptPlan" | "startExecution" | "completeExecution" | "reviewFinalPlan" | "requestExtension" | "reviewExtension" | "sendToVerification" | "keepPending" | "close" | "reopen" | "rollback";
export declare class TransicionInvalidaError extends Error {
}
/**
 * Corta la acción si la etapa actual no la admite.
 *
 * `estadoActual` puede venir nulo si el caso quedó sin estado por datos
 * heredados; en ese caso se deja pasar para no bloquear expedientes viejos,
 * que es preferible a dejar el sistema inoperante sobre datos que ya existen.
 */
export declare function assertTransicion(accion: AccionCaso, estadoActual: string | null | undefined): void;
//# sourceMappingURL=case.workflow.d.ts.map