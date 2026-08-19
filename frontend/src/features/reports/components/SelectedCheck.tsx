import { Check } from "lucide-react";

export function SelectedCheck({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="absolute top-2 right-2 grid h-5 w-5 animate-in place-items-center rounded-full bg-brand-700 text-white duration-200 zoom-in-50">
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}
