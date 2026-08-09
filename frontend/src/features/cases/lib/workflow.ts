// Máquina de estados del expediente SOP, vista desde Seguridad Operativa.
//
//   Recepción → Evaluación → [Pendiente de Información] → [Investigación]
//   → Plan de Acción → Ejecución ⇄ [Prórroga Solicitada] → Verificación
//   → Cierre ⇄ Reapertura
//
// Este módulo es la única fuente de verdad sobre "qué puede hacer SO ahora".
// El expediente deriva de aquí tanto el panel central como los botones, de modo
// que la UI no puede ofrecer un salto de etapa que el flujo no contempla.
//
// Se indexa por el nombre del estado (catálogo "Estado Hallazgo") y no por
// `Stage`, porque `Stage` colapsa "Ejecución" y "Prórroga Solicitada" en una
// sola etapa del stepper y aquí sí necesitamos distinguirlas.

/** Acciones que Seguridad Operativa puede ejecutar sobre un caso. */
export type CaseAction =
  | "aprobar"
  | "rechazar"
  | "solicitar_info"
  | "registrar_observacion"
  | "responder_info"
  | "evaluar"
  | "registrar_investigacion"
  | "crear_plan"
  | "modificar_plan"
  | "resolver_prorroga"
  | "cerrar"
  | "devolver_ejecucion"
  | "retroceder"
  | "reabrir"
  | "adjuntar_evidencia"
  | "comentar";

/** Panel central que corresponde a cada estado del expediente. */
export type CasePanel =
  | "recepcion"
  | "evaluacion"
  | "pendiente_info"
  | "investigacion"
  | "plan"
  | "ejecucion"
  | "prorroga"
  | "verificacion"
  | "cierre"
  | "rechazado";

interface EstadoSpec {
  panel: CasePanel;
  acciones: CaseAction[];
  /** Qué ocurre al completar la etapa; se muestra como ayuda en el panel. */
  siguiente: string | null;
}

// Comentar y adjuntar evidencia están disponibles en casi toda la vida del
// caso: son acciones de expediente, no de etapa. Se excluyen solo en los
// estados terminales, donde el expediente ya quedó archivado.
const BITACORA: CaseAction[] = ["adjuntar_evidencia", "comentar"];

const ESTADOS: Record<string, EstadoSpec> = {
  Recepción: {
    panel: "recepcion",
    acciones: ["aprobar", "rechazar", "solicitar_info", "registrar_observacion", ...BITACORA],
    siguiente: "Al aprobar, el caso pasa a Evaluación.",
  },
  Evaluación: {
    panel: "evaluacion",
    acciones: ["evaluar", "rechazar", "solicitar_info", "registrar_observacion", ...BITACORA],
    siguiente: "Según la decisión, el caso pasa a Investigación o directo a Plan de Acción.",
  },
  // Estado heredado de los casos sembrados antes del módulo de gestión.
  // Se atiende como una Evaluación para que esos casos no queden bloqueados.
  "En Proceso": {
    panel: "evaluacion",
    acciones: ["evaluar", "rechazar", "solicitar_info", "registrar_observacion", ...BITACORA],
    siguiente: "Según la decisión, el caso pasa a Investigación o directo a Plan de Acción.",
  },
  "Pendiente de Información": {
    panel: "pendiente_info",
    acciones: ["responder_info", ...BITACORA],
    siguiente: "Al recibir la respuesta, el caso vuelve a la etapa en la que se pausó.",
  },
  Investigación: {
    panel: "investigacion",
    acciones: ["registrar_investigacion", "retroceder", "solicitar_info", ...BITACORA],
    siguiente: "Al guardar la investigación, el caso pasa a Plan de Acción.",
  },
  "Plan de Acción": {
    panel: "plan",
    acciones: ["crear_plan", "modificar_plan", "retroceder", ...BITACORA],
    siguiente: "El plan queda pendiente de aceptación del Jefe de Área; al aceptarlo arranca la Ejecución.",
  },
  Ejecución: {
    panel: "ejecucion",
    acciones: [...BITACORA],
    siguiente: "El área ejecuta las actividades. Al terminarlas, el caso vuelve a SO para Verificación.",
  },
  "Prórroga Solicitada": {
    panel: "prorroga",
    acciones: ["resolver_prorroga", ...BITACORA],
    siguiente: "Al aprobar o rechazar la ampliación, el caso vuelve a Ejecución.",
  },
  Verificación: {
    panel: "verificacion",
    acciones: ["cerrar", "devolver_ejecucion", ...BITACORA],
    siguiente: "Al dar conforme, el caso se cierra. Si falta algo, vuelve a Ejecución con motivo.",
  },
  Cerrado: {
    panel: "cierre",
    acciones: ["reabrir", "comentar"],
    siguiente: "El expediente está archivado. Puede reabrirse con motivo; vuelve a Verificación.",
  },
  Rechazado: {
    panel: "rechazado",
    acciones: ["comentar"],
    siguiente: null,
  },
};

const FALLBACK: EstadoSpec = {
  panel: "recepcion",
  acciones: ["aprobar", "rechazar", "solicitar_info", "registrar_observacion", ...BITACORA],
  siguiente: "Al aprobar, el caso pasa a Evaluación.",
};

function spec(estado: string): EstadoSpec {
  return ESTADOS[estado] ?? FALLBACK;
}

/** Panel central que debe renderizar el expediente para este estado. */
export function panelForEstado(estado: string): CasePanel {
  return spec(estado).panel;
}

/** Acción válida para SO en este estado: `puede("Recepción", "cerrar")` → false. */
export function puede(estado: string, accion: CaseAction): boolean {
  return spec(estado).acciones.includes(accion);
}

/** Texto de ayuda sobre la transición que sigue. */
export function siguientePaso(estado: string): string | null {
  return spec(estado).siguiente;
}

/**
 * Un plan solo puede modificarse mientras el área todavía no lo aceptó:
 * modificarlo reemplaza sus actividades, y hacerlo con la ejecución en marcha
 * borraría el avance ya registrado por el Jefe de Área.
 */
export function puedeModificarPlan(estadoPlan: string | null | undefined): boolean {
  return estadoPlan === "Pendiente" || estadoPlan === "Enviado" || estadoPlan === "Rechazado";
}

/** Etiqueta legible del rol que ejecutó una acción en la bitácora. */
export const ACTOR_ROL_LABEL: Record<string, string> = {
  seguridad: "Seguridad Operativa",
  reportante: "Reportante",
  jefe: "Jefe de Área",
};
