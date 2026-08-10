import { AlertTriangle, Flag, HelpCircle, Lightbulb, ShieldAlert, Wrench, type LucideIcon } from "lucide-react";

/**
 * Icono por valor del catálogo "Tipo de Reporte". Vive aquí y no dentro de una
 * pantalla porque lo usan los dos formularios de registro (el wizard del
 * trabajador y el del panel de Seguridad Operativa) y deben verse igual.
 */
const TIPO_REPORTE_ICONS: Record<string, LucideIcon> = {
  Accidente: AlertTriangle,
  Incidente: Flag,
  "Condición Insegura": Wrench,
  Hallazgo: Lightbulb,
  "Acto Inseguro": ShieldAlert,
  Otro: HelpCircle,
};

export function iconoTipoReporte(nombre: string): LucideIcon {
  return TIPO_REPORTE_ICONS[nombre] ?? HelpCircle;
}
