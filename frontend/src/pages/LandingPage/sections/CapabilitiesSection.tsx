import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, FileText, BarChart, Database, ArrowRight } from "lucide-react";
import { capabilities } from "@/data/landing";

const featureIcons = [Sparkles, Zap, Shield, FileText, BarChart, Database];

export function CapabilitiesSection() {
  return (
    <section id="capacidades" className="relative bg-gray-50 px-6 py-20 sm:px-8 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block rounded-full border border-[#00A651]/30 bg-[#00A651]/10 px-4 py-2 text-sm font-medium text-[#00A651]">
            Capacidades del Sistema
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Funcionalidades
            <span className="block text-[#00A651]">integrales</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            Herramientas completas para gestionar la seguridad operativa con eficiencia y precisión
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div
                key={capability.title}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#00A651]/40 hover:shadow-lg hover:-translate-y-1"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="relative z-10 p-6">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-[#00A651]/10 text-[#00A651] transition-all duration-300 group-hover:bg-[#00A651] group-hover:text-white">
                    <Icon className="size-6" />
                  </div>
                  
                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {capability.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#00A651] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    <span>Ver más</span>
                    <ArrowRight className="size-4" />
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
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-[#00A651]/10 text-[#00A651]">
              <Sparkles className="size-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Ecosistema integrado
            </h3>
            <p className="max-w-xl text-sm text-gray-600">
              Todas las funcionalidades conectadas en una plataforma unificada para máxima eficiencia operacional
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}