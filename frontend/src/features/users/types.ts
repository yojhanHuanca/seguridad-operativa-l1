export interface UserListItem {
  id_usuario: number;
  codigo_usuario: string;
  nombre: string;
  correo: string;
  telefono: string | null;
  estado: string | null;
  roles: { nombre_rol: string } | null;
}
