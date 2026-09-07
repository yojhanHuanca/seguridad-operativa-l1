import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SHAKE_TRANSITION, SHAKE_X } from "@/design-system/motion/variants";

export function Field({
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {/* El error entra con un temblor breve además del fundido — que se note
          sin depender solo del color rojo del texto. */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", x: SHAKE_X }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ ...SHAKE_TRANSITION, height: { duration: 0.2 } }}
            className="overflow-hidden text-xs font-medium text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
