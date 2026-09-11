import { Eye, Pencil } from "lucide-react";
import type { ContingenciaListItem } from "../types";

interface Props {
  eventos: ContingenciaListItem[];
  isLoading?: boolean;
  onView: (evento: ContingenciaListItem) => void;
  onEdit: (evento: ContingenciaListItem) => void;
}
export function ContingenciasTable({ eventos, isLoading, onView, onEdit }: Props) {
  if (isLoading) return <p role="status" className="py-12 text-center text-sm text-ink-quiet">Cargando registros...</p>;
  if (!eventos.length) return <p className="py-12 text-center text-sm text-ink-quiet">No se encontraron eventos.</p>;
  return <div className="max-w-full overflow-x-auto bg-white">
    <table className="w-full min-w-[1350px] text-sm">
      <caption className="sr-only">Historial de eventos de contingencia</caption>
      <thead className="border-b border-line bg-surface text-xs text-ink-soft"><tr>{["Código", "Fecha", "Hora", "Tipo de evento", "Lugar", "Lugar exacto", "Quién reporta", "Categoría", "Estado", "Registro", "Revisión", "Acciones"].map((title) => <th key={title} scope="col" className="px-3 py-3 text-left font-semibold">{title}</th>)}</tr></thead>
      <tbody>{eventos.map((evento) => <tr key={evento.id_evento} className="border-b border-line-soft align-top hover:bg-surface">
        <td className="whitespace-nowrap px-3 py-4 font-medium">{evento.codigo_evento}</td>
        <td className="whitespace-nowrap px-3 py-4">{evento.fecha}</td>
        <td className="px-3 py-4">{evento.hora_reporte ?? "-"}</td>
        <td className="px-3 py-4">{evento.tipo_evento}</td>
        <td className="px-3 py-4">{evento.lugar_evento}</td>
        <td className="px-3 py-4">{evento.lugar_exacto_evento}</td>
        <td className="px-3 py-4">{evento.quien_reporta}</td>
        <td className="px-3 py-4">{evento.persona?.categoria_paciente ?? "-"}</td>
        <td className="px-3 py-4"><span className="rounded-full bg-brand-50 px-2 py-1 text-xs text-brand-800">{evento.estado}</span></td>
        <td className="max-w-48 break-words px-3 py-4">{evento.cierre?.registro || "-"}</td>
        <td className="max-w-48 break-words px-3 py-4">{evento.cierre?.revision || "-"}</td>
        <td className="px-3 py-3"><div className="flex gap-1"><button type="button" title="Ver detalle" aria-label={"Ver detalle de " + evento.codigo_evento} onClick={() => onView(evento)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-brand-50"><Eye className="h-4 w-4" /></button><button type="button" title="Editar" aria-label={"Editar " + evento.codigo_evento} onClick={() => onEdit(evento)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-brand-50"><Pencil className="h-4 w-4" /></button></div></td>
      </tr>)}</tbody>
    </table>
  </div>;
}
