import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type MetricCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

export function MetricCounter({
  value,
  suffix = "",
  label,
  description,
}: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let frame = 0;
    const duration = 1400;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <p className="text-4xl font-semibold text-white sm:text-5xl">
        {displayValue.toLocaleString("es-PE")}{suffix}
      </p>
      <p className="mt-3 text-base font-semibold text-[#00A651]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
    </motion.div>
  );
}