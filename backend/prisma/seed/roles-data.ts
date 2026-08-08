// El CSV del cliente NO trae ninguna columna de "rol" — esta lista se
// dedujo de los dos roles funcionales que sí aparecen implícitos en las
// columnas de "responsable":
//   - "Responsable de Hallazgo/Investigación/RSO"  -> Seguridad Operativa
//   - "Responsable Plan de Acción"                  -> Jefe de Área
// Se agregó "Reportante" (el trabajador que origina el hallazgo/evento, aún
// no representado como persona en este CSV) y "Admin" (ya en uso por
// backend/seed-admin.js) para no duplicar ese rol si ese script se ejecuta
// también.
// CONFIRMADO con el cliente: mantener esta propuesta como catálogo inicial
// de roles (no viene del CSV, pero se aprobó como punto de partida).
export const ROLES: string[] = ["Admin", "Seguridad Operativa", "Jefe de Área", "Reportante"];
