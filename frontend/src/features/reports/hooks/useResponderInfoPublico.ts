import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicApi, type ApiEnvelope } from "@/lib/api";

interface ResponderInfoInput {
  codigo: string;
  id_solicitud: number;
  respuesta: string;
  files: File[];
}

async function responderInfo({ codigo, id_solicitud, respuesta, files }: ResponderInfoInput) {
  const form = new FormData();
  form.append("id_solicitud", String(id_solicitud));
  form.append("respuesta", respuesta);
  for (const file of files) form.append("evidencia", file);

  const { data } = await publicApi.post<ApiEnvelope<unknown>>(
    `/reports/consulta/${encodeURIComponent(codigo)}/responder-info`,
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  if (!data.success) throw new Error(data.message);
}

/** Responder una solicitud de información sin cuenta — mismo código como llave que la consulta pública. */
export function useResponderInfoPublico(codigo: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Omit<ResponderInfoInput, "codigo">) => responderInfo({ codigo, ...input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reporte-publico", codigo] });
    },
  });
}
