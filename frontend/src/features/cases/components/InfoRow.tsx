export function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-[10.5px] font-medium uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-0.5 text-[12.5px] text-ink">{value?.trim() ? value : "—"}</p>
    </div>
  );
}
