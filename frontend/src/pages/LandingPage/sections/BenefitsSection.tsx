import { motion } from "framer-motion";
import { Target, Clock, Shield, BarChart, CheckCircle, ArrowRight } from "lucide-react";
import { benefits } from "@/data/landing";

const benefitIcons = [Target, Clock, Shield, BarChart];

export function BenefitsSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white px-6 py-20 sm:px-8 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block rounded-full border border-[#00A651]/30 bg-[#00A651]/10 px-4 py-2 text-sm font-medium text-[#00A651]">
            Beneficios Clave
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Ventajas
            <span className="block text-[#00A651]">competitivas</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            Razones por las que nuestro sistema es la mejor opción para la gestión de seguridad operativa
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <motion.div
                key={benefit.title}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#00A651]/40 hover:shadow-lg hover:-translate-y-1"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="relative z-10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#00A651]/10 text-[#00A651] transition-all duration-300 group-hover:bg-[#00A651] group-hover:text-white">
                      <Icon className="size-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {benefit.description}
                      </p>
                      
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#00A651] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                        <span>Conocer más</span>
                        <ArrowRight className="size-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00A651] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-3"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {[
            { value: "40%", label: "Reducción de tiempo", icon: Clock },
            { value: "100%", label: "Trazabilidad", icon: CheckCircle },
            { value: "24/7", label: "Disponibilidad", icon: Shield },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-lg border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:border-[#00A651]/30 hover:bg-gray-50 hover:-translate-y-0.5"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#00A651]/10 text-[#00A651] mx-auto mb-3">
                  <Icon className="size-5" />
                </div>
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}