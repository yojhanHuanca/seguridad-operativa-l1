// Componentes de la capa de movimiento. Las variantes viven en ./variants y el
// contador en ./useCountUp; aquí solo van componentes para no romper el fast
// refresh de Vite.
//
// La accesibilidad se resuelve en dos niveles: <MotionProvider> desactiva las
// animaciones de transform cuando el sistema pide menos movimiento, y los
// helpers que animan por su cuenta consultan useReducedMotion. globals.css ya
// hacía lo propio con sus keyframes; esto sigue el mismo criterio.
import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { useCountUp } from "./useCountUp";

/**
 * Envuelve la app y hace que framer-motion respete la preferencia del sistema.
 * Con `reducedMotion="user"` las animaciones de transform y layout se anulan
 * solas; las de opacidad se mantienen, que es el comportamiento recomendado.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Número que cuenta al entrar. `suffix` no rompe el tabular-nums del valor. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const shown = useCountUp(value);
  return (
    <>
      {shown}
      {suffix}
    </>
  );
}
