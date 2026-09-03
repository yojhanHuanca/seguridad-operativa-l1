import type { ReactNode } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { riseItem, staggerContainer, EASE_OUT, SPRING_SNAPPY } from "@/design-system/motion/variants";
import { nombreSistema, useConfiguracionPublica } from "@/features/configuracion/hooks/useConfiguracion";

const TONOS_INSIGNIA = {
  brand: "bg-brand-50 text-brand-700",
  danger: "bg-red-50 text-red-600",
} as const;

/**
 * Layout compartido por login, recuperar contraseña y restablecer
 * contraseña: el mismo panel de marca a la izquierda (oculto en móvil) y un
 * panel de formulario a la derecha con la cabecera común (logo, ícono,
 * nombre del sistema). Antes cada pantalla repetía esa cabecera a su manera
 * — login con el split completo, las otras dos con una tarjeta centrada — y
 * terminaban viéndose como pantallas de sistemas distintos.
 *
 * El bloque de la derecha entra con el mismo vocabulario de movimiento que
 * la landing (`staggerContainer`/`riseItem`) — los campos y botones de cada
 * página se suman a esa cadena solo con `variants={riseItem}`, sin tener que
 * armar su propio contenedor. El ícono es aparte: como el título cambia
 * entre estados (ej. "Acceso al sistema" → "El link venció"), se anima con
 * su propia entrada/salida en vez de heredar la cadena.
 */
export function AuthLayout({
  icon,
  tone = "brand",
  title,
  description,
  children,
  footer,
}: {
  icon: ReactNode;
  /** Color de la insignia del ícono: "brand" (por defecto) o "danger" para estados de error. */
  tone?: keyof typeof TONOS_INSIGNIA;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  const { data: identidad } = useConfiguracionPublica();
  const systemName = nombreSistema(identidad);

  return (
    <MotionConfig reducedMotion="user">
      <main className="grid min-h-[100svh] bg-[#0c0c0c] lg:grid-cols-[minmax(0,1.35fr)_minmax(420px,0.65fr)]">
        <section className="relative hidden min-h-[100svh] overflow-hidden lg:block">
          <motion.img
            src="/login-metro-lima.png"
            alt="Tren metropolitano circulando por un viaducto urbano de Lima"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
          <div className="relative flex h-full min-h-[100svh] max-w-[760px] flex-col justify-between p-10 xl:p-14">
            <Logo size={84} withWordmark={false} tone="light" className="[filter:drop-shadow(0_2px_10px_rgba(0,0,0,0.55))]" />
            <div className="pb-5 text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.75),0_1px_3px_rgba(0,0,0,0.6)]">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                Línea 1 · Metro de Lima
              </span>
              <h1 className="max-w-[650px] font-display text-[42px] font-bold leading-[1.08] xl:text-[52px]">
                Seguridad operativa que mantiene Lima en movimiento.
              </h1>
              <p className="mt-5 max-w-[570px] text-[14px] leading-7 text-white/72">
                Gestión centralizada de eventos, investigaciones y planes de acción para la operación segura de Línea 1.
              </p>
              <div className="mt-8 flex gap-7 border-t border-white/20 pt-5 text-[11px] text-white/65">
                <span><strong className="block text-[18px] text-white">26</strong> estaciones</span>
                <span><strong className="block text-[18px] text-white">11</strong> distritos conectados</span>
                <span><strong className="block text-[18px] text-white">24/7</strong> continuidad operativa</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-[100svh] items-center justify-center bg-white px-5 py-6 sm:px-10 lg:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full max-w-[420px]">
            {/* En escritorio el panel de marca ya tiene su propio logo grande — acá
                solo se repite en móvil, donde es la única referencia de marca visible. */}
            <motion.div variants={riseItem} className="mb-4 lg:hidden"><Logo size={38} withWordmark={false} /></motion.div>

            {/* Key por título: cuando el estado cambia (ej. formulario → "link
                venció"), el ícono sale y entra de nuevo en vez de solo cambiar de
                golpe — un pop con resorte para estados normales/de éxito, un
                fundido simple para errores (no hay nada que festejar). */}
            <AnimatePresence mode="wait">
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={tone === "danger" ? { duration: 0.22, ease: EASE_OUT } : SPRING_SNAPPY}
                className={cn("grid h-10 w-10 place-items-center rounded-lg", TONOS_INSIGNIA[tone])}
              >
                {icon}
              </motion.div>
            </AnimatePresence>

            <motion.p variants={riseItem} className="mt-3 text-[11px] font-semibold uppercase text-brand-700">{systemName}</motion.p>
            <motion.h2 variants={riseItem} className="mt-2 font-display text-[23px] font-bold text-ink sm:text-[26px]">{title}</motion.h2>
            {description && <motion.div variants={riseItem} className="mt-2 text-[13px] leading-6 text-ink-quiet">{description}</motion.div>}

            {children}

            {footer}
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}
