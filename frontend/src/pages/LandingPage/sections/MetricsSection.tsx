import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield, Clock } from "lucide-react";
import { metrics } from "@/data/landing";

export function MetricsSection() {
  const icons = [TrendingUp, Zap, Shield, Clock];

  return (
    <section className="relative bg-gray-50 px-6 py-20 sm:px-8 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block rounded-full border border-[#00A651]/30 bg-[#00A651]/10 px-4 py-2 text-sm font-medium text-[#00A651]">
            Indicadores de Rendimiento
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Métricas que
            <span className="block text-[#00A651]">demuestran resultados</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            Indicadores clave de rendimiento que muestran la efectividad y eficiencia de nuestro sistema de seguridad operativa
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={metric.label}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#00A651]/40 hover:shadow-lg hover:-translate-y-1"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="relative z-10 p-6">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-[#00A651]/10 text-[#00A651] transition-all duration-300 group-hover:bg-[#00A651] group-hover:text-white">
                    <Icon className="size-6" />
                  </div>
                  
                  <div className="mt-4">
                    <motion.div
                      className="text-3xl font-bold text-gray-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                    >
                      {metric.value}
                      {metric.suffix}
                    </motion.div>
                    <div className="mt-1 text-sm font-semibold text-[#00A651]">
                      {metric.label}
                    </div>
                    <div className="mt-2 text-xs leading-relaxed text-gray-500">
                      {metric.description}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00A651] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-10 rounded-lg border border-[#00A651]/20 bg-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left sm:gap-8">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                <Shield className="size-5 text-[#00A651]" />
                Cobertura operativa total
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Monitoreo integral de todas las estaciones y trenes en operación con disponibilidad garantizada
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A651]">100%</div>
                <div className="text-xs text-gray-500 mt-1">Cobertura</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A651]">24h</div>
                <div className="text-xs text-gray-500 mt-1">Continuo</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}