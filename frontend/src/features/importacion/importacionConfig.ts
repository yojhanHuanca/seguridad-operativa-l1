import type { ImportacionTipo } from "./types";

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
      "Fecha, Hora de Reporte, TIPO DE EVENTO, LUGAR DEL EVENTO, LUGAR EXACTO DEL EVENTO, CATEGORIA DE PACIENTE",
    optionalFallback:
      "Quién reporta, Atención inicial, Atención final, Nivel inicial, Nivel final, Trasladado por, Estación partida SPAA, Medio transporte SPAA, Estación partida ambulancia, Estación llegada ambulancia, Nombre persona, DNI, Sexo, Edad, Diagnóstico presuntivo, Zona de la lesión, Observación, Registro, Revisión",
    detectedTitle: "Contingencias detectadas",
  },
};