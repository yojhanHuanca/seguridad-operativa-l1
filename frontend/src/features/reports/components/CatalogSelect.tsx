import { Controller, type Control, type FieldPath } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ReportFormValues } from "../schema";
import type { CatalogItem } from "../types";

export function CatalogSelect({
  control,
  name,
  items,
  placeholder,
}: {
  control: Control<ReportFormValues>;
  name: FieldPath<ReportFormValues>;
  items: CatalogItem[];
  placeholder: string;
}) {
  const itemsMap = Object.fromEntries(items.map((i) => [String(i.id_detalle), i.nombre]));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          items={itemsMap}
          value={field.value !== undefined && field.value !== null ? String(field.value) : ""}
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
      )}
    />
  );
}
