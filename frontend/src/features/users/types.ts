/**
 * Lo que devuelve `/users/basicos`: sin correo ni teléfono, porque lo puede
 * pedir cualquier rol para llenar los selectores de responsable.
 */
export interface UserBasic {
  id_usuario: number;
  codigo_usuario: string;
  nombre: string;
  cargo: string | null;
  estado: string | null;
  es_responsable: boolean;
  id_area: number | null;
  id_rol: number | null;
  roles: { nombre_rol: string } | null;
  areas: { nombre_area: string } | null;
}

/** Padrón completo de `/users` — solo Admin. */
export interface UserListItem extends UserBasic {
  correo: string;
  telefono: string | null;
  puede_reabrir_casos: boolean;
  puede_rechazar_reportes: boolean;
}

export interface Role {
  id_rol: number;
  nombre_rol: string;
}

export interface CreateUserInput {
  nombre: string;
  correo: string;
  password: string;
  cargo?: string;
  telefono?: string;
  id_area: number;
  id_rol: number;
  es_responsable?: boolean;
  puede_reabrir_casos?: boolean;
  puede_rechazar_reportes?: boolean;
}

export interface UpdateUserInput {
  id_usuario: number;
  nombre?: string;
  correo?: string;
  cargo?: string;
  telefono?: string;
  id_area?: number;
  id_rol?: number;
  estado?: string;
  es_responsable?: boolean;
  puede_reabrir_casos?: boolean;
  puede_rechazar_reportes?: boolean;
  password?: string;
}
