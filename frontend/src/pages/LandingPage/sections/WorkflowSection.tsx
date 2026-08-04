import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import { workflow } from "@/data/landing";

export function WorkflowSection() {
  return (
    <section className="relative bg-white px-6 py-20 sm:px-8 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block rounded-full border border-[#00A651]/30 bg-[#00A651]/10 px-4 py-2 text-sm font-medium text-[#00A651]">
            Proceso Operativo
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Flujo de trabajo
            <span className="block text-[#00A651]">optimizado</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            Proceso estructurado que garantiza respuesta rápida, trazabilidad completa y documentación precisa
          </p>
        </motion.div>

        <div className="space-y-4">
          {workflow.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === workflow.length - 1;
            
            return (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex gap-4 items-start">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="relative flex size-10 items-center justify-center rounded-lg bg-[#00A651] text-white shadow-md">
                      <Icon className="size-5" />
                    </div>
                    {!isLast && (
                      <div className="mt-3 h-12 w-0.5 bg-gradient-to-b from-[#00A651]/50 to-transparent" />
                    )}
                  </div>

                  {/* Content card */}
                  <div className="flex-1 relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#00A651]/40 hover:shadow-md hover:-translate-y-0.5">
                    <div className="relative z-10 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-base font-bold text-[#00A651]">
                              0{index + 1}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm leading-relaxed text-gray-600">
                            {step.description}
                          </p>
                        </div>
                        
                        <ChevronRight className="size-4 text-gray-300 mt-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00A651] to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-10 rounded-lg border border-[#00A651]/20 bg-gray-50 p-6"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#00A651]/10 text-[#00A651]">
              <CheckCircle className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Ciclo completo garantizado
            </h3>
            <p className="max-w-xl text-sm text-gray-600">
              Cada etapa está conectada, documentada y trazable para garantizar la calidad y continuidad operacional
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}