export type AccionAuditoria = "crear" | "editar" | "eliminar" | "login" | "login_fallido";

export interface AuditoriaItem {
  id_auditoria: number;
  tabla_afectada: string;
  id_registro: number | null;
  accion: AccionAuditoria;
  descripcion: string | null;
  usuario: number;
  ip: string | null;
  user_agent: string | null;
  datos_previos: Record<string, unknown> | null;
  datos_nuevos: Record<string, unknown> | null;
  fecha: string;
  usuarios: { nombre: string; cargo: string | null; codigo_usuario?: string };
}
