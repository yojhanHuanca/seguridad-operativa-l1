export type ImportacionTipo = "casos" | "monitoreo" | "contingencias" | "datos_operativos";

export type ImportacionRowValue = string | number | boolean | null | undefined;

export type ImportacionRow = Record<string, ImportacionRowValue>;

export interface ImportacionPayload {
  filename: string | null;
  rows: ImportacionRow[];
  hoja?: string;
  decisionesSop?: DecisionSop[];
  kmPorCarreraValidado?: number;
  estacionesValidadas?: number;
}

export interface ImportacionIssue {
  row: number;
  field: string;
  severity: "error" | "warning";
  message: string;
  value: string | null;
}

export interface ImportacionCasePreview {
  row: number;
  codigo: string;
  titulo: string;
  tipo: string;
  estado: string;
  estacion: string;
  area: string | null;
  riesgo: string | null;
  fecha: string;
  planes: number;
  status: "valid" | "error" | "skipped";
  editable?: boolean;
  estadoOriginal?: string;
  accion?: DecisionSop["accion"];
  planesDetalle?: { row: number; codigo: string; area: string; responsable: string; estado: string; estadoOriginal: string; editable: boolean }[];
}

export interface ImportacionResumen {
  totalFilas: number;
  casosDetectados: number;
  planesDetectados: number;
  listos: number;
  duplicados: number;
  errores: number;
  advertencias: number;
}

export interface ImportacionPreview {
  filename: string | null;
  resumen: ImportacionResumen;
  issues: ImportacionIssue[];
  cases: ImportacionCasePreview[];
  canImport: boolean;
  requiredColumns: string[];
  optionalColumns: string[];
  kmPorCarrera?: number;
  estaciones?: number;
  operativos?: { row: number; fecha: string; carreras: number | null; pasajeros: number | null; kmComercial: number | null; kmNoComercial: number | null; paradas: number | null; afluencia: number | null; kmCalculado: boolean; paradasCalculadas: boolean; status: "valid" | "error" | "skipped" }[];
}

export interface ImportacionResult extends ImportacionPreview {
  imported: {
    casos: number;
    eventos: number;
    planes: number;
    skipped: number;
  };
}

export interface ImportacionHistorialItem {
  id_importacion: number;
  modulo: ImportacionTipo;
  archivo: string;
  hoja: string | null;
  estado: string;
  filas_total: number;
  importados: number;
  duplicados: number;
  errores: number;
  created_at: string;
  completed_at: string | null;
  reverted_at: string | null;
  creador: { id_usuario: number; nombre: string };
  reversor: { id_usuario: number; nombre: string } | null;
}

export interface DecisionSop {
  codigo: string;
  accion: "asignar" | "cerrar" | "planes";
  motivo: string;
  planes?: { row: number; estado: "Enviado" | "En Ejecución" | "Cerrado" }[];
}
