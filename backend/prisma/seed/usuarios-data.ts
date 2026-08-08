// Solo se siembran las 2 personas que aparecen en los registros de EJEMPLO
// (el caso SOP 01-2024 y sus planes de acción). El CSV no trae correo,
// código de empleado, teléfono ni contraseña de nadie — codigo_usuario y
// correo aquí son una CONVENCIÓN (nombre.apellido@metrolinea1.pe) solo para
// satisfacer los campos @unique/obligatorios del esquema, NO son datos
// reales del cliente.
// CONFIRMADO con el cliente: mantener este placeholder por ahora; el
// correo/código real de cada persona se cargará más adelante cuando llegue
// el padrón oficial de RR.HH. (reemplazar aquí cuando eso ocurra).
// No se sembró el resto del padrón (~30 nombres) de la hoja BD porque no
// hay forma de asignarles área/rol/correo reales sin inventarlos.
export interface UsuarioSeed {
  codigo_usuario: string;
  nombre: string;
  correo: string;
  cargo: string;
  area: string; // debe existir en AREAS
  rol: string; // debe existir en ROLES
}

export const USUARIOS: UsuarioSeed[] = [
  {
    codigo_usuario: "HH001",
    nombre: "Hector Hinostroza",
    correo: "hector.hinostroza@metrolinea1.pe",
    cargo: "Responsable de Seguridad Operativa (RSO)",
    area: "Seguridad Operativa",
    rol: "Seguridad Operativa",
  },
  {
    codigo_usuario: "CO001",
    nombre: "Christian Oliva",
    correo: "christian.oliva@metrolinea1.pe",
    cargo: "Responsable de Plan de Acción",
    area: "Ingeniería",
    rol: "Jefe de Área",
  },
];
