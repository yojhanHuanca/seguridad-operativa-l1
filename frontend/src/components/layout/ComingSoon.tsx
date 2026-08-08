import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ComingSoon({
  icon: Icon,
  title,
  description,
  points,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  points?: string[];
}) {
  return (
    <div>
      <div>
        <h1 className="font-display text-[19px] font-bold tracking-[-0.01em] text-ink">{title}</h1>
        <p className="mt-0.5 max-w-xl text-[12px] text-ink-quiet">{description}</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
        <Card className="mt-4 flex flex-col items-center gap-2.5 border-dashed p-10 text-center">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-[13px] font-semibold text-ink">Módulo en construcción</p>
          <p className="max-w-md text-[12px] text-ink-quiet">Esta sección está planificada y se activará en un próximo avance del sistema.</p>
          {points && points.length > 0 && (
            <ul className="mt-1.5 space-y-1 text-left text-[12px] text-ink-soft">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
