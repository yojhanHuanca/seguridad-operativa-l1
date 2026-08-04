import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  DatabaseZap,
  Eye,
  FileSearch,
  Gauge,
  ListChecks,
  LockKeyhole,
  Network,
  PencilLine,
  Search,
  ShieldCheck,
  Siren,
  Train,
  TrendingUp,
  UsersRound,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type LandingAction = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  variant: "primary" | "secondary";
};

export type LandingCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Metric = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Reportar Incidencia", href: "/reportar-incidencia" },
  { label: "¿Cómo funciona?", href: "#flujo" },
  { label: "Estadísticas", href: "#estadisticas" },
  { label: "Contáctanos", href: "#contacto" },
];

export const heroActions: LandingAction[] = [
  {
    title: "Reportar Incidencia",
    description: "Reporte rápido sin necesidad de registro",
    href: "/reportar-incidencia",
    icon: ShieldCheck,
    variant: "primary",
  },
  {
    title: "Acceder al Sistema",
    description: "Ingresa con tu cuenta autorizada",
    href: "/login",
    icon: LockKeyhole,
    variant: "secondary",
  },
];

export const capabilities: LandingCard[] = [
  {
    title: "Reporte inmediato",
    description: "Ingreso de eventos desde campo, estación o centro de control con prioridad operacional.",
    icon: Siren,
  },
  {
    title: "Caso trazable",
    description: "Cada incidente conserva estado, responsable, evidencia, bitácora y decisión asociada.",
    icon: ClipboardCheck,
  },
  {
    title: "Investigación guiada",
    description: "El análisis reúne causas, hallazgos y acciones con criterios consistentes de seguridad.",
    icon: FileSearch,
  },
  {
    title: "Acción verificable",
    description: "Los planes correctivos se miden por avance, plazo, impacto y cierre documentado.",
    icon: ListChecks,
  },
  {
    title: "Seguimiento ejecutivo",
    description: "Indicadores y alertas mantienen visibilidad sobre compromisos críticos.",
    icon: Gauge,
  },
  {
    title: "Memoria institucional",
    description: "La evidencia queda organizada para auditoría, aprendizaje y mejora continua.",
    icon: DatabaseZap,
  },
];

export const workflow: WorkflowStep[] = [
  {
    title: "Detectar",
    description: "Identificamos situaciones que pueden representar un riesgo.",
    icon: Eye,
  },
  {
    title: "Reportar",
    description: "Realiza tu reporte de manera rápida y sencilla.",
    icon: PencilLine,
  },
  {
    title: "Investigar",
    description: "Nuestro equipo analiza y recopila información.",
    icon: Search,
  },
  {
    title: "Plan de Acción",
    description: "Se establecen medidas correctivas y preventivas.",
    icon: ClipboardCheck,
  },
  {
    title: "Seguimiento",
    description: "Monitoreamos el avance de las acciones.",
    icon: TrendingUp,
  },
  {
    title: "Cierre",
    description: "Verificamos resultados y cerramos el caso.",
    icon: CheckCircle2,
  },
];

export const metrics: Metric[] = [
  {
    value: 26,
    label: "Estaciones",
    description: "En toda la Línea 1",
    icon: Train,
  },
  {
    value: 44,
    label: "Trenes",
    description: "En operación diaria",
    icon: Train,
  },
  {
    value: 17,
    label: "Investigadores",
    description: "Equipo especializado",
    icon: UsersRound,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Monitoreo",
    description: "Seguridad continua",
    icon: ShieldCheck,
  },
];

export const benefits: LandingCard[] = [
  {
    title: "Mayor trazabilidad",
    description: "Cada decisión queda conectada al evento, la evidencia y el responsable.",
    icon: Network,
  },
  {
    title: "Respuesta más rápida",
    description: "Prioriza incidentes y reduce tiempos entre detección, evaluación y acción.",
    icon: Clock3,
  },
  {
    title: "Control de investigaciones",
    description: "Estandariza criterios, responsables y avances para una supervisión más clara.",
    icon: ShieldCheck,
  },
  {
    title: "Indicadores ejecutivos",
    description: "Convierte el seguimiento operacional en señales accionables.",
    icon: BarChart3,
  },
];