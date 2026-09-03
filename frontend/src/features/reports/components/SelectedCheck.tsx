import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SPRING_SNAPPY } from "@/design-system/motion/variants";

export function SelectedCheck({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.45, rotate: -35 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={SPRING_SNAPPY}
      className="absolute top-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-brand-700 text-white shadow-[0_8px_18px_-10px_rgba(15,107,62,0.95)] ring-2 ring-white"
    >
      <Check className="h-3 w-3" strokeWidth={3} />
    </motion.span>
  );
}
