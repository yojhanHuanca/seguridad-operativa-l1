export interface UserListItem {
  id_usuario: number;
  codigo_usuario: string;
  nombre: string;
  correo: string;
  cargo: string | null;
  telefono: string | null;
  estado: string | null;
  id_area: number | null;
  id_rol: number | null;
  roles: { nombre_rol: string } | null;
  areas: { nombre_area: string } | null;
}

export interface Role {
  id_rol: number;
  nombre_rol: string;
}

export interface CreateUserInput {
  codigo_usuario: string;
  nombre: string;
  correo: string;
  password: string;
  cargo?: string;
  telefono?: string;
  id_area: number;
  id_rol: number;
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
  password?: string;
}
