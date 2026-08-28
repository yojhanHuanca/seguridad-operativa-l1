import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ActivitySquare,
  ArrowRight,
  Building2,
  FileText,
  MapPin,
  Menu,
  PlayCircle,
  Route,
  Settings,
  ShieldCheck,
  TrainFront,
  Users,
  X as XIcon,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { staggerContainer, riseItem, EASE_OUT } from "@/design-system/motion/variants";
import { cn } from "@/lib/utils";
import { nombreSistema, useConfiguracionPublica } from "@/features/configuracion/hooks/useConfiguracion";

/**
 * Landing pública institucional de SIGMA L1. El acceso a los módulos se
 * realiza únicamente desde /login y el rol define el panel de destino.
 *
 * Fuentes de los datos reales de Línea 1 (26 estaciones, 34.6 km, etc.) y de
 * los enlaces oficiales del footer: sitio institucional lineauno.pe y
 * Wikipedia — ver mensaje del commit / conversación para el detalle.
 */

// `lucide-react` en esta versión no trae íconos de marcas (Facebook,
// Instagram, YouTube) — se dibujan a mano, simples, en vez de agregar un
// paquete de íconos nuevo solo para el footer.
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12s0-3.2-.4-4.7a2.9 2.9 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.9 2.9 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.9 2.9 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.9 2.9 0 0 0 2-2C22 15.2 22 12 22 12Z" />
      <path d="M10 15.2V8.8L15.8 12Z" fill="#052715" />
    </svg>
  );
}

const OFICIAL = {
  web: "https://www.lineauno.pe/",
  facebook: "https://www.facebook.com/Lineauno.pe/",
  instagram: "https://www.instagram.com/linea1oficial/",
  x: "https://x.com/Lineaunope",
  youtube: "https://www.youtube.com/user/Lineaunope",
};

/** Video real de un recorrido en Línea 1, embebido vía iframe de YouTube — nunca descargado. */
const VIDEO_YOUTUBE_ID = "rHp4REAhb4s";

interface Portal {
  label: string;
  description: string;
  icon: LucideIcon;
  publico?: boolean;
}

const PORTALES: Portal[] = [
  { label: "Reporte del trabajador", description: "Registro de condiciones y actos inseguros, con seguimiento del estado de cada reporte.", icon: FileText, publico: true },
  { label: "Seguridad Operativa", description: "Evaluación de riesgos, investigación de casos y control de planes de acción.", icon: ShieldCheck },
  { label: "Responsables de área", description: "Ejecución y seguimiento de medidas correctivas asignadas a cada área.", icon: Users },
  { label: "Monitoreo operacional", description: "Registro y análisis de eventos operativos de la Línea 1 en tiempo real.", icon: ActivitySquare },
  { label: "Administración segura", description: "Gestión controlada de usuarios, roles, áreas y parámetros del sistema.", icon: Settings },
];

const NAVEGACION_PUBLICA = [
  { href: "#plataforma", label: "Plataforma" },
  { href: "#video", label: "Línea 1" },
];

const ESTADISTICAS = [
  { value: "26", label: "Estaciones", icon: MapPin },
  { value: "11", label: "Distritos conectados", icon: Building2 },
  { value: "34.6 km", label: "Extensión del recorrido", icon: Route },
  { value: "2", label: "Terminales operativos", icon: TrainFront },
];

const FLUJO = [
  { number: "01", title: "Reportar", description: "Registro estructurado del evento o condición observada." },
  { number: "02", title: "Evaluar", description: "Clasificación, análisis de riesgo y asignación responsable." },
  { number: "03", title: "Actuar", description: "Ejecución y seguimiento de medidas correctivas." },
  { number: "04", title: "Cerrar", description: "Validación de evidencias y trazabilidad del resultado." },
];

const SOCIALES: { href: string; label: string; icon: (props: { className?: string }) => ReactNode }[] = [
  { href: OFICIAL.facebook, label: "Facebook", icon: FacebookIcon },
  { href: OFICIAL.instagram, label: "Instagram", icon: InstagramIcon },
  { href: OFICIAL.x, label: "X (Twitter)", icon: XIcon },
  { href: OFICIAL.youtube, label: "YouTube", icon: YoutubeIcon },
];

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function Navbar({ systemName }: { systemName: string }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 transition-colors duration-300", scrolled ? "bg-white/55 shadow-sm backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo size={48} withWordmark={false} />
          <span className={cn("font-display text-[16px] font-bold tracking-tight transition-colors", scrolled ? "text-ink" : "text-white")}>
            {systemName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex">
          {NAVEGACION_PUBLICA.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                scrolled ? "text-ink-soft hover:bg-surface hover:text-ink" : "text-white/85 hover:bg-white/10 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
          <Link to="/login" className={cn("ml-2 inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[13px] font-semibold transition-colors", scrolled ? "bg-brand-700 text-white hover:bg-brand-800" : "bg-white text-brand-800 hover:bg-white/90")}>
            Acceso interno <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn("grid h-9 w-9 place-items-center rounded-lg md:hidden", scrolled ? "text-ink" : "text-white")}
          aria-label="Abrir menú"
        >
          {open ? <XIcon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-4 py-3 md:hidden">
          {NAVEGACION_PUBLICA.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-ink-soft hover:bg-surface">
              {item.label}
            </a>
          ))}
          <Link to="/login" onClick={() => setOpen(false)} className="mt-2 flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 text-[13px] font-semibold text-white">Acceso interno <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      )}
    </header>
  );
}

/**
 * Fotos reales de Línea 1 (Wikimedia Commons, licencias libres — ver
 * atribución en el footer). No hay video institucional de calidad disponible
 * para usar como fondo, así que el efecto de movimiento se logra con un
 * carrusel Ken Burns: zoom lento + disolución cruzada entre fotos reales.
 */
const HERO_PHOTOS = [
  { src: "/l1-tren-2.jpg", alt: "Tren de Línea 1 llegando a la estación San Borja Sur" },
  { src: "/l1-estacion-1.jpg", alt: "Estación Villa El Salvador de Línea 1 con tren estacionado" },
  { src: "/l1-estacion-noche.jpg", alt: "Tren de Línea 1 entrando a la estación Miguel Grau" },
  { src: "/l1-tren-1.jpg", alt: "Tren de Línea 1 del Metro de Lima" },
];

function HeroBackground() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_PHOTOS.length), 6500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_PHOTOS.map((photo, i) => (
        <motion.img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          initial={false}
          animate={i === index ? { opacity: 1, scale: 1.12 } : { opacity: 0, scale: 1.04 }}
          transition={i === index ? { opacity: { duration: 1.4 }, scale: { duration: 6.5, ease: "linear" } } : { opacity: { duration: 1.4 } }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}
    </div>
  );
}

function Hero({ systemName }: { systemName: string }) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/25 to-transparent" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative mx-auto w-full max-w-[1240px] px-4 pb-20 pt-40 sm:px-6 sm:pb-28"
      >
        <motion.p variants={riseItem} className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
          Línea 1 · Metro de Lima
        </motion.p>
        <motion.h1 variants={riseItem} className="max-w-3xl font-display text-[48px] font-bold leading-none text-white sm:text-[72px]">
          {systemName}
        </motion.h1>
        <motion.p variants={riseItem} className="mt-5 max-w-xl text-[18px] font-semibold leading-relaxed text-white sm:text-[22px]">
          Seguridad operativa, en tiempo real.
        </motion.p>
        <motion.p variants={riseItem} className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/75 sm:text-[15.5px]">
          Una plataforma para reportar, evaluar y dar seguimiento a eventos operativos, desde el primer aviso hasta el cierre del plan de acción.
        </motion.p>
        <motion.div variants={riseItem} className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/login"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-500 px-6 text-[14px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(31,157,82,0.6)] transition-all hover:bg-brand-400 hover:shadow-[0_14px_36px_-8px_rgba(31,157,82,0.7)]"
          >
            Ingresar al sistema <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#video" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 text-[14px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/15">
            <PlayCircle className="h-4.5 w-4.5" /> Ver recorrido
          </a>
          {/* Pública, sin login: para quien llega desde un QR/URL a reportar directo. */}
          <Link
            to="/reportes/nuevo"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 text-[14px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            <FileText className="h-4.5 w-4.5" /> Reportar sin cuenta
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="relative -mt-16 z-10">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-plate)] sm:grid-cols-4 sm:p-7"
        >
          {ESTADISTICAS.map((stat) => (
            <motion.div key={stat.label} variants={riseItem} className="flex items-center gap-3.5 px-2 py-2 sm:border-l sm:border-line-soft sm:first:border-l-0 sm:pl-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <stat.icon className="h-5.5 w-5.5" />
              </span>
              <div>
                <p className="font-display text-[26px] font-bold leading-none tabular-nums text-ink sm:text-[32px]">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[13px] font-medium text-ink-quiet">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PortalCard({ portal, i, className }: { portal: Portal; i: number; className?: string }) {
  return (
    <motion.div variants={riseItem} className={cn("group relative overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-plate)]", className)}>
      <Link to={portal.publico ? "/reportes/nuevo" : "/login"} className="flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
            <portal.icon className="h-6 w-6" />
          </div>
          <span className="font-mono text-[12px] font-semibold text-ink-faint">0{i + 1}</span>
        </div>
        <h3 className="mt-5 text-[18px] font-semibold text-ink">{portal.label}</h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-quiet">{portal.description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-brand-700">
          {portal.publico ? "Sin cuenta" : "Módulo integrado"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

function PortalesSection() {
  const [destacado, ...resto] = PORTALES;
  return (
    <section id="plataforma" className="mx-auto max-w-[1240px] scroll-mt-20 px-4 py-24 sm:px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} className="mb-12 max-w-2xl">
        <motion.p variants={riseItem} className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-700">Plataforma integrada</motion.p>
        <motion.h2 variants={riseItem} className="mt-3 text-balance font-display text-[32px] font-bold tracking-tight text-ink sm:text-[38px]">
          Una operación conectada de inicio a cierre
        </motion.h2>
        <motion.p variants={riseItem} className="mt-3 text-[15px] leading-relaxed text-ink-quiet">
          Cinco espacios de trabajo, un mismo expediente. Cada rol entra directo a lo suyo, sin duplicar información entre áreas.
        </motion.p>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={staggerContainer} className="grid gap-4 lg:grid-cols-3">
        <PortalCard portal={destacado} i={0} className="lg:col-span-1 lg:row-span-2 lg:min-h-[420px] bg-gradient-to-br from-brand-50 to-white" />
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {resto.map((portal, i) => (
            <PortalCard key={portal.label} portal={portal} i={i + 1} className="min-h-[200px]" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ImpactSection({ systemName }: { systemName: string }) {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-[1240px] lg:grid-cols-2">
        <div className="relative min-h-[340px] overflow-hidden lg:min-h-[520px]">
          <img src="/l1-estacion-noche.jpg" alt="Tren de Línea 1 entrando a la estación Miguel Grau, de noche" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:bg-gradient-to-r" />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-14 lg:py-0"
        >
          <motion.p variants={riseItem} className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-400">Por qué existe {systemName}</motion.p>
          <motion.p variants={riseItem} className="mt-4 max-w-lg text-balance font-display text-[26px] font-semibold leading-snug text-white sm:text-[30px]">
            Cada tren que llega a la estación lleva miles de pasajeros. La seguridad operativa no puede depender de la memoria de una sola persona.
          </motion.p>
          <motion.p variants={riseItem} className="mt-5 max-w-md text-[14px] leading-relaxed text-white/60">
            {systemName} reemplaza los reportes sueltos y las hojas de cálculo por un expediente único: quién reportó, quién evaluó, qué se hizo y cuándo se cerró.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function WorkflowSection({ systemName }: { systemName: string }) {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={staggerContainer} className="mb-14 max-w-xl">
          <motion.p variants={riseItem} className="text-[13px] font-semibold uppercase text-brand-700">Trazabilidad operativa</motion.p>
          <motion.h2 variants={riseItem} className="mt-3 font-display text-[30px] font-bold leading-tight text-ink sm:text-[36px]">Cada evento conserva su historia completa.</motion.h2>
          <motion.p variants={riseItem} className="mt-4 text-[14.5px] leading-7 text-ink-quiet">{systemName} conecta a trabajadores, monitoristas, Seguridad Operativa y responsables de área dentro de un mismo proceso verificable.</motion.p>
        </motion.div>

        <motion.ol initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block" aria-hidden />
          {FLUJO.map((step) => (
            <motion.li key={step.number} variants={riseItem} className="relative">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-2 border-brand-700 bg-white font-mono text-[13px] font-bold text-brand-700">
                {step.number}
              </span>
              <h3 className="mt-5 text-[18px] font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[13.5px] leading-6 text-ink-quiet">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

const ROLES_ACCESO = ["Seguridad Operativa", "Jefe de Área", "Monitorista"];

function AccessBand() {
  return (
    <section className="bg-brand-700 py-16 text-white">
      <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wide text-white/65">Acceso protegido</p>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-tight sm:text-[32px]">Continúa en tu espacio de trabajo.</h2>
          <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/70">El sistema abrirá automáticamente el panel correspondiente a tu rol, sin pasos adicionales.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {ROLES_ACCESO.map((rol) => (
              <span key={rol} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white/85">{rol}</span>
            ))}
          </div>
        </div>
        <Link to="/login" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 text-[14px] font-semibold text-brand-800 transition-colors hover:bg-brand-50">Iniciar sesión <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section id="video" className="bg-ink py-24">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={staggerContainer} className="mb-8 text-center">
          <motion.p variants={riseItem} className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-400">Conoce Línea 1</motion.p>
          <motion.h2 variants={riseItem} className="mt-2 font-display text-[28px] font-bold tracking-tight text-white sm:text-[32px]">
            Un recorrido real por la línea
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          style={{ transformPerspective: 1400 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
        >
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_YOUTUBE_ID}?rel=0`}
              title="Recorrido en Línea 1 del Metro de Lima"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ systemName }: { systemName: string }) {
  return (
    <footer className="bg-brand-950 text-white/70">
      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size={44} withWordmark={false} tone="light" />
            <p className="mt-5 max-w-[260px] text-[13.5px] leading-relaxed text-white/60">
              {systemName} — Seguridad Operativa de la
              Línea 1 del Metro de Lima.
            </p>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-white/40">Portales</p>
            <ul className="mt-4 space-y-2.5">
              {PORTALES.map((portal) => (
                <li key={portal.label}>
                  <Link to={portal.publico ? "/reportes/nuevo" : "/login"} className="text-[14px] text-white/70 hover:text-white">{portal.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-white/40">Línea 1 · Metro de Lima</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={OFICIAL.web} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[14px] text-white/70 hover:text-white">
                  <MapPin className="h-3.5 w-3.5" /> Sitio oficial
                </a>
              </li>
              <li className="text-[13.5px] text-white/50">lineauno.pe</li>
            </ul>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-white/40">Síguenos</p>
            <div className="mt-4 flex items-center gap-2">
              {SOCIALES.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {systemName} · Línea 1 del Metro de Lima</p>
          <p>Proyecto interno de Seguridad Operativa</p>
        </div>
        <p className="mt-4 text-center text-[10.5px] leading-relaxed text-white/25 sm:text-left">
          Fotos: Cesar Miranda y Elelch (CC BY-SA 3.0), Txolo (CC BY-SA 4.0) — Wikimedia Commons.
        </p>
      </div>
    </footer>
  );
}

export function Landing() {
  const { data: identidad } = useConfiguracionPublica();
  const systemName = nombreSistema(identidad);

  return (
    <div className="min-h-screen bg-white">
      <Navbar systemName={systemName} />
      <Hero systemName={systemName} />
      <StatsBand />
      <PortalesSection />
      <ImpactSection systemName={systemName} />
      <WorkflowSection systemName={systemName} />
      <VideoSection />
      <AccessBand />
      <Footer systemName={systemName} />
    </div>
  );
}
