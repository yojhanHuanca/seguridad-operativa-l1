export interface UserImportRow {
  row: number;
  nombre: string;
  cargo: string;
  unidad_organizativa: string;
  correo: string;
  telefono: string;
  jefe_inmediato: string;
  id_rol: number | null;
}

export interface UserImportSheet { name: string; rows: UserImportRow[] }
export interface UserImportFile { filename: string; sheets: UserImportSheet[] }
export interface UserImportPayload {
  filename: string;
  hoja: string;
  rows: UserImportRow[];
  areas: { unidad_organizativa: string; id_area: number }[];
}
export interface UserImportPreview {
  filename: string;
  hoja: string;
  rows: (UserImportRow & { id_area: number | null; area: string | null; rol: string | null })[];
  issues: { row: number; field: string; message: string }[];
  canImport: boolean;
  resumen: { total: number; listos: number; errores: number };
}
export interface UserImportResult {
  batchId: string;
  created: number;
  credentials: { row: number; id_usuario: number; codigo_usuario: string; correo: string; password_temporal: string }[];
}

export const unitKey = (value: string) => value.normalize("NFC").trim().replace(/\s+/g, " ").toLowerCase();
