export type AccionAuditoria = "crear" | "editar" | "eliminar" | "login" | "login_fallido";

export interface AuditoriaItem {
  id_auditoria: number;
  tabla_afectada: string;
  id_registro: number | null;
  accion: AccionAuditoria;
  descripcion: string | null;
  usuario: number;
  ip: string | null;
  fecha: string;
  usuarios: { nombre: string; cargo: string | null };
}
