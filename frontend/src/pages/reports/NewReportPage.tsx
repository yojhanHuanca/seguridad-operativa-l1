import { useEffect, useRef, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Camera, Check, ChevronLeft, ChevronRight, FileSearch, Loader2, LockKeyhole, Send, ShieldCheck, TicketCheck } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card } from "@/components/ui/card";
import { ReportanteShell } from "@/components/layout/ReportanteShell";
import { cn } from "@/lib/utils";
import { apiErrorMessage } from "@/lib/api";
import { EASE_OUT, SPRING_SNAPPY } from "@/design-system/motion/variants";
import { guardarReporteLocal } from "@/features/reports/lib/misReportesLocal";
import { reportFormSchema, REPORT_STEPS, STEP_FIELDS, type ReportFormValues, type ReportStep } from "@/features/reports/schema";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { useCreateReport } from "@/features/reports/hooks/useCreateReport";
import { TypeStep } from "./steps/TypeStep";
import { LocationStep } from "./steps/LocationStep";
import { DetailStep } from "./steps/DetailStep";
import { EvidenceStep } from "./steps/EvidenceStep";
import { ReviewStep } from "./steps/ReviewStep";

const STEP_LABELS: Record<ReportStep, string> = {
  tipo: "Tipo",
  ubicacion: "Ubicación",
  descripcion: "Descripción",
  evidencias: "Evidencias",
  envio: "Envío",
};

type Direction = "forward" | "back";

const MotionLink = motion.create(Link);

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.095, delayChildren: 0.08 } },
};

const heroRise = {
  hidden: { opacity: 0, y: 26, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.62, ease: EASE_OUT } },
};

const stepPanelVariants = {
  enter: (direction: Direction) => ({ opacity: 0, x: direction === "forward" ? 34 : -34, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
  exit: (direction: Direction) => ({ opacity: 0, x: direction === "forward" ? -22 : 22, scale: 0.99, transition: { duration: 0.2, ease: EASE_OUT } }),
};

const BENEFICIOS_REPORTE = [
  { icon: LockKeyhole, label: "Anónimo o identificado" },
  { icon: TicketCheck, label: "Código de seguimiento" },
  { icon: Camera, label: "Foto, video o PDF" },
];

function useReportMotionSettings() {
  const prefersReduced = useReducedMotion();
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const reduced = Boolean(prefersReduced);
  return {
    reduced,
    isNarrow,
    allowTilt: !reduced && !isNarrow,
  };
}

function BenefitCard({
  item,
  allowTilt,
}: {
  item: (typeof BENEFICIOS_REPORTE)[number];
  allowTilt: boolean;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 220, damping: 20, mass: 0.6 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 220, damping: 20, mass: 0.6 });

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      variants={heroRise}
      onMouseMove={(event) => {
        if (!allowTilt) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(y * -7);
        rotateY.set(x * 7);
      }}
      onMouseLeave={resetTilt}
      whileHover={allowTilt ? { y: -8, scale: 1.025 } : undefined}
      transition={SPRING_SNAPPY}
      style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformPerspective: 900 }}
      className="group relative overflow-hidden rounded-xl border border-white/16 bg-white/12 px-2.5 py-3 text-center shadow-[0_18px_48px_-32px_rgba(0,0,0,0.75)] backdrop-blur-md transition-colors hover:border-brand-200/70 hover:bg-white/18"
    >
      <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-brand-200/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <item.icon className="mx-auto h-5 w-5 text-brand-200 drop-shadow" />
      <p className="mt-2 text-[11.5px] font-medium leading-snug text-white/90">{item.label}</p>
    </motion.div>
  );
}

function ReportIntroHero({ onStart }: { onStart: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced, isNarrow, allowTilt } = useReportMotionSettings();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : isNarrow ? [0, 34] : [0, 138]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : isNarrow ? [0, -8] : [0, -28]);

  return (
    <ReportanteShell immersive>
      <section ref={sectionRef} className="relative min-h-[calc(100svh-88px)] overflow-hidden bg-ink text-white">
        <motion.img
          src="/tren-linea1.png"
          alt="Tren de Línea 1 del Metro de Lima"
          style={{ y: backgroundY }}
          className="absolute -inset-y-10 inset-x-0 h-[calc(100%+80px)] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden h-24 overflow-hidden opacity-70 sm:block" aria-hidden>
          <div className="absolute bottom-9 left-0 right-0 h-px bg-white/18" />
          <div className="absolute bottom-14 left-0 right-0 h-px bg-brand-300/22" />
          <motion.div
            className="absolute bottom-14 h-px w-1/3 bg-gradient-to-r from-transparent via-brand-200 to-transparent"
            animate={reduced ? { opacity: 0.35 } : { x: ["-40%", "255%"], opacity: [0.15, 0.8, 0.15] }}
            transition={reduced ? { duration: 0 } : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroStagger}
          style={{ y: contentY }}
          className="relative mx-auto flex min-h-[calc(100svh-88px)] w-full max-w-[1200px] flex-col justify-end px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
        >
          <motion.div variants={heroRise} className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white/90 shadow-[0_10px_30px_-24px_rgba(255,255,255,0.7)] backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            Reporte seguro sin cuenta
          </motion.div>

          <div className="max-w-[620px]">
            <motion.p variants={heroRise} className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-100">Reporte ciudadano y operativo</motion.p>
            <motion.h1 variants={heroRise} className="mt-3 text-[40px] font-bold leading-[1.02] tracking-normal text-white sm:text-[56px] lg:text-[64px]">
              Reporta una condición de seguridad
            </motion.h1>
            <motion.div variants={heroRise} className="mt-5 h-1 w-28 overflow-hidden rounded-full bg-white/16">
              <motion.div
                className="h-full rounded-full bg-brand-400"
                initial={{ width: "28%" }}
                animate={reduced ? { width: "100%" } : { width: ["28%", "100%", "64%"] }}
                transition={reduced ? { duration: 0.3 } : { duration: 2.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </motion.div>
            <motion.p variants={heroRise} className="mt-5 max-w-[460px] text-[16px] leading-relaxed text-white/84 sm:text-[17px]">
              Tu reporte ayuda a prevenir incidentes en la operación. Puedes enviarlo de forma anónima o identificada.
            </motion.p>

            <motion.div variants={heroRise} className="mt-8 grid gap-3 sm:max-w-[480px] sm:grid-cols-[minmax(0,1fr)_auto]">
              <motion.div whileHover={reduced ? undefined : { scale: 1.025, y: -2 }} whileTap={reduced ? undefined : { scale: 0.98 }} transition={SPRING_SNAPPY}>
                <Button type="button" size="lg" onClick={onStart} className="h-12 w-full justify-center text-[15px] shadow-[0_18px_40px_-18px_rgba(31,157,82,0.75)]">
                  <Send className="h-4 w-4" />
                  Iniciar reporte
                </Button>
              </motion.div>
              <MotionLink
                to="/reportes/consulta"
                whileHover={reduced ? undefined : { scale: 1.025, y: -2 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={SPRING_SNAPPY}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 w-full justify-center border-white/70 bg-white/7 px-4 text-white shadow-[0_18px_38px_-26px_rgba(255,255,255,0.45)] hover:bg-white/14"
                )}
              >
                <FileSearch className="h-4 w-4" />
                Consultar reporte
              </MotionLink>
            </motion.div>

            <motion.div variants={heroStagger} className="mt-8 grid grid-cols-3 gap-2 sm:max-w-[570px]">
              {BENEFICIOS_REPORTE.map((item) => (
                <BenefitCard key={item.label} item={item} allowTilt={allowTilt} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </ReportanteShell>
  );
}

function ReportStepper({ stepIndex }: { stepIndex: number }) {
  const progress = Math.round((stepIndex / Math.max(REPORT_STEPS.length - 1, 1)) * 100);

  return (
    <motion.div variants={heroRise}>
      <Card className="p-4 shadow-[var(--shadow-card)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
            Paso {stepIndex + 1} de {REPORT_STEPS.length}
          </p>
          <p className="font-mono text-[12px] font-semibold text-brand-700">{progress}%</p>
        </div>
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-line-soft" aria-hidden>
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="h-full rounded-full bg-brand-700 shadow-[0_0_18px_rgba(31,157,82,0.35)]"
          />
        </div>
        <ol className="flex items-center gap-1" aria-label="Progreso del reporte">
          {REPORT_STEPS.map((s, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <li key={s} className="flex flex-1 items-center last:flex-none" aria-current={active ? "step" : undefined}>
                <motion.div
                  initial={false}
                  animate={active ? { scale: 1.03 } : { scale: 1 }}
                  transition={SPRING_SNAPPY}
                  className={cn(
                    "flex h-9 items-center gap-2 rounded-full px-3 text-xs font-medium transition-colors duration-300",
                    done && "bg-brand-700 text-white shadow-[0_8px_20px_-14px_rgba(15,107,62,0.8)]",
                    active && "bg-brand-50 text-brand-800 ring-1 ring-brand-300 shadow-[0_10px_26px_-20px_rgba(15,107,62,0.6)]",
                    !done && !active && "bg-secondary text-ink-quiet"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-full text-[11px] transition-all duration-300",
                      done && "bg-white/20",
                      active && "scale-110 bg-brand-700 text-white",
                      !done && !active && "bg-white text-ink-quiet"
                    )}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={done ? "done" : `step-${i}`}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={SPRING_SNAPPY}
                        className="grid place-items-center"
                      >
                        {done ? <Check className="h-3 w-3" /> : i + 1}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="hidden sm:inline">{STEP_LABELS[s]}</span>
                </motion.div>
                {i < REPORT_STEPS.length - 1 && (
                  <div className="mx-1 h-0.5 flex-1 overflow-hidden rounded-full bg-border" aria-hidden>
                    <motion.div
                      initial={false}
                      animate={{ scaleX: done ? 1 : 0 }}
                      transition={{ duration: 0.36, ease: EASE_OUT }}
                      style={{ transformOrigin: "left" }}
                      className="h-full w-full bg-brand-700"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Card>
    </motion.div>
  );
}

export function NewReportPage() {
  const navigate = useNavigate();
  const [introVisible, setIntroVisible] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("forward");
  const [files, setFiles] = useState<File[]>([]);
  const step = REPORT_STEPS[stepIndex];

  const catalogs = useCatalogs();
  const createReport = useCreateReport();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema) as Resolver<ReportFormValues>,
    defaultValues: {
      tipo_ubicacion: "estacion",
      modalidad: "anonimo",
    },
  });

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = fields.length === 0 || (await form.trigger(fields));
    if (!valid) return;
    setDirection("forward");
    setStepIndex((i) => Math.min(i + 1, REPORT_STEPS.length - 1));
  };

  const goBack = () => {
    setDirection("back");
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const onSubmit = form.handleSubmit((values) => {
    createReport.mutate(
      { values, files },
      {
        onSuccess: (result) => {
          toast.success(`Reporte ${result.codigo_sop} registrado correctamente`);
          guardarReporteLocal(result.codigo_sop);
          navigate("/reportes/consulta?codigo=" + encodeURIComponent(result.codigo_sop));
        },
        onError: (error) => {
          toast.error(apiErrorMessage(error, "No se pudo registrar el reporte"));
        },
      }
    );
  });

  const loadingCatalogs = catalogs.isLoading;

  if (introVisible) {
    return <ReportIntroHero onStart={() => setIntroVisible(false)} />;
  }

  return (
    <ReportanteShell>
      <motion.div initial="hidden" animate="visible" variants={heroStagger} className="pb-24 sm:pb-0">
        <motion.div variants={heroRise} className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Registrar incidencia</p>
          <h1 className="mt-1 text-2xl font-bold text-ink">Reporta lo que observaste</h1>
          <p className="mt-1 text-sm text-ink-quiet">
            Toma menos de un minuto. Tú solo reportas, nosotros nos encargamos del resto.
          </p>
        </motion.div>

        <ReportStepper stepIndex={stepIndex} />

        <motion.div variants={heroRise} className="mt-4">
          {loadingCatalogs ? (
            <Card className="flex items-center justify-center gap-2 p-16 text-sm text-ink-quiet">
              <Loader2 className="h-4 w-4 animate-spin" /> Cargando catálogos desde el servidor…
            </Card>
          ) : catalogs.isError ? (
            <Card className="p-8 text-center text-sm text-destructive">
              No se pudieron cargar los catálogos. Verifique que el backend esté disponible en {import.meta.env.VITE_API_URL}.
            </Card>
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={stepPanelVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {step === "tipo" && <TypeStep form={form} catalogs={catalogs.byName} />}
                {step === "ubicacion" && <LocationStep form={form} catalogs={catalogs.byName} />}
                {step === "descripcion" && <DetailStep form={form} />}
                {step === "evidencias" && <EvidenceStep files={files} setFiles={setFiles} />}
                {step === "envio" && <ReviewStep form={form} catalogs={catalogs.byName} areas={[]} files={files} />}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: EASE_OUT }}
        className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-16px_32px_-28px_rgba(15,41,26,0.45)] backdrop-blur-xl sm:static sm:z-auto sm:mt-4 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:backdrop-blur-none"
      >
        <Button type="button" variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
          <ChevronLeft className="h-4 w-4" /> Atrás
        </Button>
        {step !== "envio" ? (
          <Button type="button" onClick={goNext} disabled={loadingCatalogs}>
            Continuar <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" onClick={onSubmit} disabled={createReport.isPending}>
            {createReport.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Enviar Reporte
          </Button>
        )}
      </motion.div>
    </ReportanteShell>
  );
}
