export interface MyProfile {
  id_usuario: number;
  codigo_usuario: string;
  nombre: string;
  correo: string;
  cargo: string | null;
  telefono: string | null;
  estado: string | null;
  foto_url: string | null;
  ultimo_acceso: string | null;
  fecha_ingreso: string | null;
  id_area: number | null;
  id_rol: number | null;
  roles: { nombre_rol: string } | null;
  areas: { nombre_area: string } | null;
}

export interface ActivityItem {
  label: string;
  value: number;
}
