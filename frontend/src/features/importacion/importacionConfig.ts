import type { ImportacionTipo } from "./types";

export type ImportacionPanel = "admin" | "seguridad" | "monitoreo" | "contingencias";

// Mantener este mapa alineado con los permisos del servidor en
// backend/src/modules/importacion/importacion.routes.ts.
export const IMPORTACION_TIPOS_POR_PANEL: Record<ImportacionPanel, readonly ImportacionTipo[]> = {
  admin: ["datos_operativos", "casos", "monitoreo", "contingencias"],
  seguridad: ["datos_operativos", "casos"],
  monitoreo: ["datos_operativos", "monitoreo", "contingencias"],
  contingencias: ["datos_operativos", "contingencias"],
};

export const IMPORTACION_MODULOS: Record<
  ImportacionTipo,
  {
    label: string;
    description: string;
    importButton: string;
    requiredFallback: string;
    optionalFallback: string;
    detectedTitle: string;
  }
> = {
  datos_operativos: {
    label: "Datos operativos",
    description: "Carga diaria de carreras, pasajeros, kilometraje y afluencia desde una plantilla mensual.",
    importButton: "Importar datos operativos",
    requiredFallback: "Fecha, QTY carreras, QTY pasajeros, Km no comercial, Afluencia diaria",
    optionalFallback: "Km comercial, Paradas en estación",
    detectedTitle: "Registros diarios detectados",
  },
  casos: {
    label: "Casos SOP",
    description: "Carga controlada de casos SOP desde CSV, XLSX o XLSM.",
    importButton: "Importar casos",
    requiredFallback: "Código, Tipo, Estado, Fecha",
    optionalFallback:
      "Título, Estación, Reportante, Área, Riesgo, Descripción, Procedencia, Tipo SOP, Subtipo SOP, Peligro, Consecuencias, ACR, Responsable de Hallazgo, Código Plan, Descripción Plan, Estado Plan, Fecha Reprogramada, Área Plan, Responsable Plan, Observaciones Plan",
    detectedTitle: "Casos detectados",
  },
  monitoreo: {
    label: "Monitorista",
    description: "Carga eventos del panel de monitorista desde el Excel de lista de eventos.",
    importButton: "Importar monitoreo",
    requiredFallback:
      "Fecha, Hora de evento, Tipo de incidente operativo, Descripción del evento, Ubicación, Lugar de Incidente",
    optionalFallback:
      "Año, Mes, Mes_1, Sem, Día, Rango horario, Tipo de vía, Dirección de vía, Modelo MR, Nro. MR, Nro. Carrera, Personal o falla Involucrado, Tipo Causa, Posible Causa, Información adicional, Cámara monitoreada, DEMORA",
    detectedTitle: "Eventos detectados",
  },
  contingencias: {
    label: "Contingencias",
    description: "Carga registros del panel de contingencias desde la plantilla oficial de planes de contingencia.",
    importButton: "Importar contingencias",
    requiredFallback:
      "Fecha, Hora de Reporte, TIPO DE EVENTO, LUGAR DEL EVENTO, LUGAR EXACTO DEL EVENTO, Quién reporta",
    optionalFallback:
      "Categoría de paciente, Atención inicial, Atención final, Nivel inicial, Nivel final, Trasladado por, Estación partida SPAA, Medio transporte SPAA, Estación partida ambulancia, Estación llegada ambulancia, Nombre persona, DNI, Sexo, Edad, Diagnóstico presuntivo, Zona de la lesión, Observación, Registro, Revisión",
    detectedTitle: "Contingencias detectadas",
  },
};
