export type ImportacionRowValue = string | number | boolean | null | undefined;

export type ImportacionRow = Record<string, ImportacionRowValue>;

export interface ImportacionPayload {
  filename: string | null;
  rows: ImportacionRow[];
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
