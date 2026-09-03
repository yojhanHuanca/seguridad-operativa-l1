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

/** Resorte corto para micro-interacciones (hover/tap de botones e íconos). */
export const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 320, damping: 22 };

/** Resorte más suave, para el tilt 3D que sigue al cursor (tarjetas, video). */
export const TILT_SPRING: Transition = { type: "spring", stiffness: 220, damping: 20, mass: 0.6 };

/** Temblor horizontal breve para llamar la atención sobre un error de formulario. */
export const SHAKE_X = [0, -6, 6, -4, 4, 0];
export const SHAKE_TRANSITION: Transition = { duration: 0.4, ease: EASE_OUT };

/**
 * Línea que se "dibuja" de izquierda a derecha. Usa las mismas llaves
 * hidden/visible que `staggerContainer` para heredar el disparo del padre —
 * requiere `style={{ transformOrigin: "left" }}` en el elemento.
 */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};
