import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { JefeShell } from "@/components/layout/JefeShell";
import { Card } from "@/design-system/primitives/Card";
import { numeroDePlan } from "@/features/cases/lib/planLabels";
import { daysUntil } from "@/lib/format";
import type { PlanItem } from "@/features/plans/types";
import { planEnd, planWeight } from "@/features/plans/lib/planDetailFlow";
import { PlanChoiceCard } from "./PlanChoiceCard";

export function PlanSelectionContent({ codigo, plans }: { codigo: string; plans: PlanItem[] }) {
  const sortedPlans = useMemo(
    () =>
      [...plans].sort(
        (a, b) =>
          planWeight(a) - planWeight(b) ||
          daysUntil(planEnd(a)) - daysUntil(planEnd(b)) ||
          (numeroDePlan(a.codigo_plan) ?? 0) - (numeroDePlan(b.codigo_plan) ?? 0)
      ),
    [plans]
  );
  const caso = plans[0]?.casos_sop;

  return (
    <JefeShell>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link to="/jefe" className="rounded-lg p-2 hover:bg-surface-2">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <p className="text-[14px] text-ink-soft">
              Caso: <span className="font-mono">{codigo}</span>
            </p>
          </div>
        </div>
      </div>

      <Card padded={false} className="overflow-hidden border-line-soft shadow-sm">
        <div className="border-b border-line-soft bg-surface/70 px-5 py-4">
          <p className="text-[15px] font-semibold text-ink">Seleccione un plan para ver el detalle:</p>
          <p className="mt-1 line-clamp-1 break-all text-[13.5px] text-ink-quiet">{caso?.titulo?.trim() || caso?.descripcion}</p>
        </div>
        <div className="space-y-3 p-5">
          {sortedPlans.map((plan) => (
            <PlanChoiceCard key={plan.id_plan} codigo={codigo} plan={plan} />
          ))}
        </div>
      </Card>
    </JefeShell>
  );
}
