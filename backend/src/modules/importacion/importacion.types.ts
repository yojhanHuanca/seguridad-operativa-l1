export type ImportacionCell = string | number | boolean | null | undefined;

export type ImportacionRow = Record<string, ImportacionCell>;

export interface ImportacionPayload {
  filename: string | null;
  rows: ImportacionRow[];
  hoja?: string | undefined;
  decisionesSop?: DecisionSop[] | undefined;
}

export interface DecisionSop {
  codigo: string;
  accion: "asignar" | "cerrar" | "planes";
  motivo: string;
  planes?: { row: number; estado: "Enviado" | "En Ejecución" | "Cerrado" }[] | undefined;
}

export type ImportacionIssueSeverity = "error" | "warning";

export interface ImportacionIssue {
  row: number;
  field: string;
  severity: ImportacionIssueSeverity;
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
  accion?: DecisionSop["accion"] | undefined;
  planesDetalle?: { row: number; codigo: string; area: string; responsable: string; estado: string; estadoOriginal: string; editable: boolean }[] | undefined;
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
}

export interface ImportacionResult extends ImportacionPreview {
  imported: {
    casos: number;
    eventos: number;
    planes: number;
    skipped: number;
  };
}
