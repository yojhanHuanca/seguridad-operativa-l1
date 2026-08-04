import { motion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Play, CheckCircle } from "lucide-react";
import { HeroVideo } from "@/components/landing/HeroVideo";
import { heroActions } from "@/data/landing";
import { cn } from "@/lib/utils";

const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <HeroVideo />

      {/* Hero Content - Diseño profesional corporativo */}
      <div className="relative z-10 flex w-full items-center px-6 py-32 md:py-0">
        <motion.div
          className="w-full max-w-7xl mx-auto"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={heroItem} className="space-y-8">
              <motion.div
                variants={textReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#00A651]/30 bg-[#00A651]/10 px-4 py-2 text-sm font-medium text-[#00A651]"
              >
                <ShieldCheck className="size-4" />
                <span>Sistema de Seguridad Operativa</span>
              </motion.div>

              <motion.h1
                variants={textReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold leading-tight !text-white sm:text-5xl lg:text-6xl"
              >
                Plataforma Integral de
                <span className="block text-[#00A651] mt-2">Gestión de Seguridad</span>
                <span className="block text-3xl text-gray-600 mt-2 sm:text-4xl lg:text-5xl">Línea 1 Metro de Lima</span>
              </motion.h1>

              <motion.p
                variants={textReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="text-lg leading-relaxed text-gray-600 max-w-xl"
              >
                Sistema avanzado para la gestión de incidentes, investigación y seguimiento operativo con tecnología de punta y estándares internacionales de seguridad.
              </motion.p>

              <motion.div
                variants={textReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {heroActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <a
                      key={action.href}
                      href={action.href}
                      className={cn(
                        "group flex items-center gap-3 px-6 py-4 rounded-lg font-semibold transition-all",
                        action.variant === "primary"
                          ? "bg-[#00A651] text-white hover:bg-[#008c45]"
                          : "border border-gray-300 bg-white text-gray-700 hover:border-[#00A651] hover:text-[#00A651]"
                      )}
                    >
                      <Icon className="size-5" />
                      <span>{action.title}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  );
                })}
              </motion.div>

              <motion.div
                variants={textReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="size-10 rounded-full border-2 border-white bg-gradient-to-br from-[#00A651]/30 to-[#00A651]/10"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <CheckCircle className="size-4 text-[#00A651]" />
                    <span>Confianza certificada</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+500 organizaciones confían en nosotros</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00A651]/10 to-transparent blur-3xl" />
                <div className="relative space-y-4">
                  {[
                    { label: "Incidentes gestionados", value: "15,000+", icon: ShieldCheck },
                    { label: "Tiempo de respuesta", value: "< 2 min", icon: Play },
                    { label: "Satisfacción", value: "98%", icon: CheckCircle },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-[#00A651]/10 text-[#00A651]">
                          <stat.icon className="size-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}