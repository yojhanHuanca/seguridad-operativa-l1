const lineOneLogoUrl = "/logo.png";

type MetroBrandProps = {
  compact?: boolean;
};

export function MetroBrand({ compact = false }: MetroBrandProps) {
  return (
    <div className="flex items-center gap-3 text-gray-900">
      <img
        src={lineOneLogoUrl}
        alt="Logo Línea 1"
        className="size-20 object-contain"
      />
      {!compact && (
        <div className="leading-tight">
          <p className="text-base font-bold tracking-wide text-gray-900">LÍNEA 1</p>
          <p className="text-xs font-medium text-gray-600">Metro de Lima</p>
        </div>
      )}
    </div>
  );
}