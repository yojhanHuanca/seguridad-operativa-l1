import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ActivitySquare,
  ArrowRight,
  FileText,
  MapPin,
  Menu,
  PlayCircle,
  Settings,
  ShieldCheck,
  Users,
  X as XIcon,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { staggerContainer, riseItem, EASE_OUT } from "@/design-system/motion/variants";
import { cn } from "@/lib/utils";

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
}

const PORTALES: Portal[] = [
  { label: "Reporte del trabajador", description: "Registro de condiciones y actos inseguros, con seguimiento del estado de cada reporte.", icon: FileText },
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
  { value: "26", label: "Estaciones" },
  { value: "11", label: "Distritos conectados" },
  { value: "34.6 km", label: "Extensión del recorrido" },
  { value: "2", label: "Terminales operativos" },
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

function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 transition-colors duration-300", scrolled ? "bg-white/95 shadow-sm backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo size={40} withWordmark={false} />
          <span className={cn("font-display text-[16px] font-bold tracking-tight transition-colors", scrolled ? "text-ink" : "text-white")}>
            SIGMA<span className="text-brand-500"> L1</span>
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

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <img src="/tren-linea1.png" alt="Tren de Línea 1 del Metro de Lima llegando a estación" className="absolute inset-0 h-full w-full object-cover" />
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
          SIGMA <span className="text-brand-300">L1</span>
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
          className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-plate)] sm:grid-cols-4 sm:p-6"
        >
          {ESTADISTICAS.map((stat) => (
            <motion.div key={stat.label} variants={riseItem} className="px-2 py-2 text-center sm:border-l sm:border-line-soft sm:first:border-l-0">
              <p className="font-display text-[30px] font-bold tabular-nums text-brand-700 sm:text-[36px]">
                {stat.value}
              </p>
              <p className="mt-1 text-[11.5px] font-medium text-ink-quiet">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PortalesSection() {
  return (
    <section id="plataforma" className="mx-auto max-w-[1240px] scroll-mt-20 px-4 py-24 sm:px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} className="mb-10 max-w-xl">
        <motion.p variants={riseItem} className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-700">Plataforma integrada</motion.p>
        <motion.h2 variants={riseItem} className="mt-2 text-balance font-display text-[28px] font-bold tracking-tight text-ink sm:text-[34px]">
          Una operación conectada de inicio a cierre
        </motion.h2>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={staggerContainer} className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-3">
        {PORTALES.map((portal) => (
          <motion.div key={portal.label} variants={riseItem} className="group min-h-[220px] border-b border-line p-6 sm:border-r lg:p-7">
              <div className="flex h-full flex-col">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                  <portal.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-ink">{portal.label}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-quiet">{portal.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase text-brand-700">
                  Módulo integrado <ShieldCheck className="h-3.5 w-3.5" />
                </span>
              </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.7fr] lg:gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={staggerContainer}>
            <motion.p variants={riseItem} className="text-[12px] font-semibold uppercase text-brand-700">Trazabilidad operativa</motion.p>
            <motion.h2 variants={riseItem} className="mt-2 font-display text-[28px] font-bold leading-tight text-ink sm:text-[34px]">Cada evento conserva su historia completa.</motion.h2>
            <motion.p variants={riseItem} className="mt-4 text-[13.5px] leading-6 text-ink-quiet">SIGMA L1 conecta a trabajadores, monitoristas, Seguridad Operativa y responsables de área dentro de un mismo proceso verificable.</motion.p>
          </motion.div>
          <motion.ol initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {FLUJO.map((step) => (
              <motion.li key={step.number} variants={riseItem} className="min-h-[150px] bg-white p-5">
                <span className="font-mono text-[11px] font-semibold text-brand-700">{step.number}</span>
                <h3 className="mt-4 text-[16px] font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[12.5px] leading-5 text-ink-quiet">{step.description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

function AccessBand() {
  return (
    <section className="bg-brand-700 py-14 text-white">
      <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase text-white/65">Acceso protegido</p>
          <h2 className="mt-2 font-display text-[25px] font-bold">Continúa en tu espacio de trabajo.</h2>
          <p className="mt-2 text-[13px] text-white/70">El sistema abrirá automáticamente el panel correspondiente a tu rol.</p>
        </div>
        <Link to="/login" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 text-[13px] font-semibold text-brand-800 transition-colors hover:bg-brand-50">Iniciar sesión <ArrowRight className="h-4 w-4" /></Link>
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

function Footer() {
  return (
    <footer className="bg-brand-950 text-white/70">
      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size={40} withWordmark={false} tone="light" />
            <p className="mt-4 max-w-[240px] text-[12.5px] leading-relaxed text-white/60">
              Sistema Integrado de Gestión de Monitoreo y Auditoría — Seguridad Operativa de la
              Línea 1 del Metro de Lima.
            </p>
          </div>

          <div>
            <p className="text-[11.5px] font-semibold uppercase tracking-wide text-white/40">Portales</p>
            <ul className="mt-3 space-y-2">
              {PORTALES.map((portal) => (
                <li key={portal.label}>
                  <Link to="/login" className="text-[13px] text-white/70 hover:text-white">{portal.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11.5px] font-semibold uppercase tracking-wide text-white/40">Línea 1 · Metro de Lima</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={OFICIAL.web} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-white/70 hover:text-white">
                  <MapPin className="h-3.5 w-3.5" /> Sitio oficial
                </a>
              </li>
              <li className="text-[13px] text-white/50">lineauno.pe</li>
            </ul>
          </div>

          <div>
            <p className="text-[11.5px] font-semibold uppercase tracking-wide text-white/40">Síguenos</p>
            <div className="mt-3 flex items-center gap-2">
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
          <p>© {new Date().getFullYear()} SIGMA L1 · Línea 1 del Metro de Lima</p>
          <p>Proyecto interno de Seguridad Operativa</p>
        </div>
      </div>
    </footer>
  );
}

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <StatsBand />
      <PortalesSection />
      <WorkflowSection />
      <VideoSection />
      <AccessBand />
      <Footer />
    </div>
  );
}
