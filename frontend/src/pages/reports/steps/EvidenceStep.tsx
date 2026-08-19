import { Card } from "@/components/ui/card";
import { EvidencePicker } from "@/features/reports/components/EvidencePicker";

export function EvidenceStep({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-ink">¿Deseas adjuntar evidencias?</h2>
        <p className="text-sm text-ink-quiet">Fotografías o video. Es opcional.</p>
      </div>

      <EvidencePicker files={files} setFiles={setFiles} />
    </Card>
  );
}
