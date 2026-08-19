import { useEffect, useState } from "react";
import { Loader2, RotateCcw, Save, Trash2 } from "lucide-react";
import { Modal } from "@/design-system/primitives/Modal";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";
import type { CatalogDetalleAdmin } from "../hooks/useCatalogGroupAdmin";

interface UnitEditModalProps {
  open: boolean;
  onClose: () => void;
  item: CatalogDetalleAdmin | null;
  pending?: boolean;
  onSave: (nombre: string) => void;
  onToggleActivo: () => void;
}

/** Un solo lugar para renombrar y activar/desactivar una unidad — nada escondido, las dos acciones a la vista. */
export function UnitEditModal({ open, onClose, item, pending, onSave, onToggleActivo }: UnitEditModalProps) {
  const esNuevo = item?.id_detalle === 0;
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setValue(item?.nombre ?? "");
      setError(null);
    }
  }, [open, item]);

  const activo = item?.estado !== false;

  const guardar = () => {
    if (!value.trim()) {
      setError("Este campo es obligatorio.");
      return;
    }
    setError(null);
    onSave(value.trim());
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={esNuevo ? "Nueva unidad" : `Editar ${item?.nombre}`}
      size="sm"
      footer={
        <>
          {!esNuevo && (
            <Button variant={activo ? "outline" : "outline"} size="sm" onClick={onToggleActivo} disabled={pending}>
              {activo ? <Trash2 className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
              {activo ? "Desactivar" : "Reactivar"}
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={onClose}>Cancelar</Button>
          <Button size="sm" onClick={guardar} disabled={pending}>
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Guardar
          </Button>
        </>
      }
    >
      <Field label="Código de unidad" required>
        <Input value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
      </Field>
      {error && <p className="mt-2 text-[12.5px] text-critical">{error}</p>}
      {!esNuevo && !activo && (
        <p className="mt-3 rounded-lg bg-surface px-3 py-2 text-[12px] text-ink-quiet">
          Esta unidad está desactivada — no aparece como opción al registrar un evento nuevo.
        </p>
      )}
    </Modal>
  );
}
