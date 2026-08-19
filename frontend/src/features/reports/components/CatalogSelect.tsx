import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CatalogItem } from "../types";

// Genérico sobre el formulario: lo usan tanto el wizard del trabajador como el
// registro del panel de Seguridad Operativa, que no comparten el mismo schema.
export function CatalogSelect<TValues extends FieldValues>({
  control,
  name,
  items,
  placeholder,
}: {
  control: Control<TValues>;
  name: FieldPath<TValues>;
  items: CatalogItem[];
  placeholder: string;
}) {
  const itemsMap = Object.fromEntries(items.map((i) => [String(i.id_detalle), i.nombre]));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value as number | string | null | undefined;
        return (
          <Select
            items={itemsMap}
            value={value !== undefined && value !== null ? String(value) : ""}
            onValueChange={(v) => field.onChange(v ? Number(v) : undefined)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.id_detalle} value={String(item.id_detalle)}>
                  {item.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    />
  );
}
