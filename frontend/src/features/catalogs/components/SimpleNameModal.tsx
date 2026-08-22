import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Modal } from "@/design-system/primitives/Modal";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";

interface SimpleNameModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fieldLabel: string;
  initialValue?: string;
  pending?: boolean;
  onSubmit: (nombre: string) => void;
}

export function SimpleNameModal({ open, onClose, title, fieldLabel, initialValue = "", pending, onSubmit }: SimpleNameModalProps) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      setValue(initialValue);
      setError(null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [open, initialValue]);

  const submit = () => {
    if (!value.trim()) {
      setError("Este campo es obligatorio.");
      return;
    }
    setError(null);
    onSubmit(value.trim());
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancelar</Button>
          <Button size="sm" onClick={submit} disabled={pending}>
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Guardar
          </Button>
        </>
      }
    >
      <Field label={fieldLabel} required>
        <Input value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
      </Field>
      {error && <p className="mt-2 text-[12.5px] text-critical">{error}</p>}
    </Modal>
  );
}
