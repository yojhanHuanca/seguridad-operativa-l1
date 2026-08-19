import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./variants";

/**
 * Anima un número desde el valor anterior hasta el nuevo y devuelve el valor
 * intermedio ya redondeado.
 *
 * Interpola desde donde iba la animación previa y no desde cero, para que un
 * refetch de react-query que mueve un KPI de 17 a 18 anime solo esa unidad en
 * vez de recontar todo el número.
 *
 * Con `prefers-reduced-motion` el estado interno se puentea por completo y se
 * devuelve el valor tal cual: nada que animar y nada que sincronizar.
 */
export function useCountUp(value: number, duration = 0.9): number {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const actual = useRef(0);
  // En el primer render se cuenta desde cero; después, desde el valor previo.
  const yaMonto = useRef(false);

  /**
   * Sin animación posible se devuelve el número tal cual.
   *
   * El conteo depende de requestAnimationFrame y el navegador lo congela en
   * pestañas de segundo plano: sin este corte, un KPI cargado en segundo plano
   * se quedaría mostrando una cifra intermedia, que en un tablero de seguridad
   * es peor que no animar nada.
   */
  const sinAnimacion = reduce || (typeof document !== "undefined" && document.hidden);

  useEffect(() => {
    if (sinAnimacion) return;

    const desde = yaMonto.current ? actual.current : 0;
    yaMonto.current = true;

    const controls = animate(desde, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => {
        actual.current = v;
        setDisplay(v);
      },
      // Cierra en el valor exacto: si la pestaña estaba en segundo plano el
      // rAF no corre y la animación puede quedarse a medias.
      onComplete: () => {
        actual.current = value;
        setDisplay(value);
      },
    });
    return () => controls.stop();
  }, [value, duration, sinAnimacion]);

  return sinAnimacion ? value : Math.round(display);
}
