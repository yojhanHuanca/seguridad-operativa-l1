// Variantes de entrada compartidas. framer-motion ya era dependencia del
// proyecto pero solo se usaba en tres pantallas sueltas; esto centraliza el
// vocabulario de movimiento para que todas las secciones entren igual y no
// cada una a su manera.
import type { Transition, Variants } from "framer-motion";

/** Curva de salida del prototipo: arranca rápido y asienta suave. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const TRANSITION: Transition = { duration: 0.42, ease: EASE_OUT };

/**
 * Contenedor de entrada escalonada. Los hijos deben usar `riseItem`.
 * El escalonado es corto a propósito: en un tablero operativo la información
 * tiene que estar legible ya, no desfilar.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};

/** Elemento que sube al entrar. Pareja de `staggerContainer`. */
export const riseItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: TRANSITION },
};

/** Entrada de página, un punto más amplia que la de un elemento suelto. */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.34, ease: EASE_OUT } },
};
