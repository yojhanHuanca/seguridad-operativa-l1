import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { Database, Pencil, RefreshCw, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { ContingenciaShell } from "@/components/layout/ContingenciaShell";
import { MonitoristaShell } from "@/components/layout/MonitoristaShell";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";
import {
  useActualizarDatoOperativo,
  useCrearDatoOperativo,
  useDatosOperativos,
  useEliminarDatoOperativo,
  type DatoOperativo,
  type DatosOperativosInput,
} from "@/features/datos-operativos/hooks/useDatosOperativos";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { useConfiguracion } from "@/features/configuracion/hooks/useConfiguracion";
import { apiErrorMessage } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { stationNamesFromCatalog } from "@/lib/stations";

const POR_PAGINA = 25;
type CampoNumerico = "qty_carreras" | "qty_pasajeros" | "km_comercial" | "km_no_comercial" | "paradas_estacion";

interface FormularioDatosOperativos {
  fecha: string;
  qty_carreras: string;
  qty_pasajeros: string;
  km_comercial: string;
  km_no_comercial: string;
  paradas_estacion: string;
}

function fechaHoyInput() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

const ESTACIONES_LINEA_1_FALLBACK = 26;
const KM_POR_CARRERA_FALLBACK = 33.128331;

function decimalesPara(campo: CampoNumerico) {
  return campo === "km_comercial" || campo === "km_no_comercial" ? 2 : 0;
}

function convertirNumero(valor: string) {
  return Number(valor.replace(/,/g, "").trim());
}

function formatearEntradaNumerica(valor: string, decimales: number) {
  const limpio = valor.replace(/[^\d.]/g, "");
  if (limpio === "") return "";

  const terminaEnDecimal = decimales > 0 && limpio.endsWith(".");
  const [enteroOriginal = "0", ...decimalesOriginales] = limpio.split(".");
  const entero = Number(enteroOriginal || "0").toLocaleString("en-US");
  if (decimales === 0) return entero;

  const parteDecimal = decimalesOriginales.join("").slice(0, decimales);
  if (terminaEnDecimal && parteDecimal === "") return `${entero}.`;
  return parteDecimal ? `${entero}.${parteDecimal}` : entero;
}

function formularioVacio(): FormularioDatosOperativos {
  return {
    fecha: fechaHoyInput(),
    qty_carreras: "",
    qty_pasajeros: "",
    km_comercial: "",
    km_no_comercial: "0",
    paradas_estacion: "",
  };
}

function numero(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function fechaInput(fecha: string) {
  return fecha.slice(0, 10);
}

export function DatosOperativos() {
  const location = useLocation();
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [pagina, setPagina] = useState(1);
  const [formulario, setFormulario] = useState<FormularioDatosOperativos>(formularioVacio);
  const [editando, setEditando] = useState<DatoOperativo | null>(null);
  const [eliminando, setEliminando] = useState<DatoOperativo | null>(null);
  const { byName: catalogosPorNombre, isSuccess: catalogosListos } = useCatalogs();
  const { data: configuracion } = useConfiguracion();

  const estacionesCatalogo = catalogosPorNombre.get("Lugar de Incidente")?.catalogo_detalle ?? [];
  const cantidadEstaciones = catalogosListos
    ? stationNamesFromCatalog(estacionesCatalogo).length
    : ESTACIONES_LINEA_1_FALLBACK;
  const kmPorCarrera = configuracion?.operacion?.kmPorCarrera ?? KM_POR_CARRERA_FALLBACK;

  const filtros = { desde: desde || undefined, hasta: hasta || undefined, page: pagina, limit: POR_PAGINA };
  const { data, isLoading, isFetching, refetch } = useDatosOperativos(filtros);
  const crear = useCrearDatoOperativo();
  const actualizar = useActualizarDatoOperativo();
  const eliminar = useEliminarDatoOperativo();

  const totalPaginas = Math.max(1, Math.ceil((data?.total ?? 0) / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const guardando = crear.isPending || actualizar.isPending;
  const Shell = location.pathname.startsWith("/contingencias") ? ContingenciaShell : MonitoristaShell;

  useEffect(() => {
    if (editando || formulario.qty_carreras.trim() === "") return;
    const carreras = convertirNumero(formulario.qty_carreras);
    if (!Number.isFinite(carreras) || carreras < 0) return;
    const paradasEstimadas = String(Math.round(carreras * cantidadEstaciones));
    const kmComercialEstimado = formatearEntradaNumerica(String(Math.round(carreras * kmPorCarrera)), 0);
    setFormulario((actual) => ({
      ...actual,
      paradas_estacion: formatearEntradaNumerica(paradasEstimadas, 0),
      km_comercial: kmComercialEstimado,
    }));
  }, [cantidadEstaciones, editando, formulario.qty_carreras, kmPorCarrera]);

  const limpiarFormulario = () => {
    setFormulario(formularioVacio());
    setEditando(null);
  };

  const editar = (dato: DatoOperativo) => {
    setEditando(dato);
    setFormulario({
      fecha: fechaInput(dato.fecha),
      qty_carreras: formatearEntradaNumerica(String(dato.qty_carreras), 0),
      qty_pasajeros: formatearEntradaNumerica(String(dato.qty_pasajeros), 0),
      km_comercial: formatearEntradaNumerica(String(dato.km_comercial), 2),
      km_no_comercial: formatearEntradaNumerica(String(dato.km_no_comercial), 2),
      paradas_estacion: formatearEntradaNumerica(String(dato.paradas_estacion), 0),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const manejarCambioCarreras = (valor: string) => {
    const valorFormateado = formatearEntradaNumerica(valor, 0);
    const carreras = convertirNumero(valorFormateado);
    if (valorFormateado.trim() !== "" && Number.isFinite(carreras) && carreras >= 0) {
      // Las paradas se estiman por carrera; el Km comercial se registra con el valor real del día.
      const paradasEstimadas = String(Math.round(carreras * cantidadEstaciones));
      setFormulario((actual) => ({
        ...actual,
        qty_carreras: valorFormateado,
        paradas_estacion: formatearEntradaNumerica(paradasEstimadas, 0),
        km_comercial: formatearEntradaNumerica(String(Math.round(carreras * kmPorCarrera)), 0),
        km_no_comercial: actual.km_no_comercial === "" ? "0" : actual.km_no_comercial,
      }));
    } else {
      setFormulario((actual) => ({
        ...actual,
        qty_carreras: valorFormateado,
      }));
    }
  };

  const actualizarNumero = (campo: CampoNumerico, valor: string) => {
    setFormulario((actual) => ({ ...actual, [campo]: formatearEntradaNumerica(valor, decimalesPara(campo)) }));
  };

  const enviar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const kmNoComercialValor = formulario.km_no_comercial.trim() === "" ? "0" : formulario.km_no_comercial.trim();
    const camposValidar: { campo: CampoNumerico; valor: string; label: string }[] = [
      { campo: "qty_carreras", valor: formulario.qty_carreras.trim(), label: "QTY carreras" },
      { campo: "qty_pasajeros", valor: formulario.qty_pasajeros.trim(), label: "QTY pasajeros" },
      { campo: "km_comercial", valor: formulario.km_comercial.trim(), label: "Km comercial" },
      { campo: "km_no_comercial", valor: kmNoComercialValor, label: "Km no comercial" },
      { campo: "paradas_estacion", valor: formulario.paradas_estacion.trim(), label: "Paradas en estación" },
    ];

    const hayInvalido = camposValidar.some(({ valor }) => valor === "" || !Number.isFinite(convertirNumero(valor)) || convertirNumero(valor) < 0);
    if (!formulario.fecha || hayInvalido) {
      toast.error("Completa los campos con valores numéricos válidos");
      return;
    }

    const input: DatosOperativosInput = {
      fecha: formulario.fecha,
      qty_carreras: convertirNumero(formulario.qty_carreras),
      qty_pasajeros: convertirNumero(formulario.qty_pasajeros),
      km_comercial: convertirNumero(formulario.km_comercial),
      km_no_comercial: convertirNumero(kmNoComercialValor),
      paradas_estacion: convertirNumero(formulario.paradas_estacion),
    };
    const onSuccess = () => {
      toast.success(editando ? "Dato operativo actualizado" : "Dato operativo registrado");
      limpiarFormulario();
    };
    const onError = (error: unknown) => toast.error(apiErrorMessage(error, "No se pudo guardar el dato operativo"));
    if (editando) {
      actualizar.mutate({ id: editando.id_dato_operativo, input }, { onSuccess, onError });
    } else {
      crear.mutate(input, { onSuccess, onError });
    }
  };

  const confirmarEliminacion = () => {
    if (!eliminando) return;
    eliminar.mutate(eliminando.id_dato_operativo, {
      onSuccess: () => {
        toast.success("Dato operativo eliminado");
        setEliminando(null);
        if (pagina > 1 && (data?.items.length ?? 0) === 1) setPagina((actual) => actual - 1);
      },
      onError: (error) => toast.error(apiErrorMessage(error, "No se pudo eliminar el dato operativo")),
    });
  };

  return (
    <Shell>
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="max-w-2xl text-[13px] text-ink-quiet">
              Registra el histórico diario de operación que sirve como base para los indicadores.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => void refetch()} disabled={isFetching}>
            <RefreshCw className={isFetching ? "h-4 w-4 animate-spin" : "h-4 w-4"} /> Actualizar
          </Button>
        </div>

        <Card>
          <CardHeader
            title={editando ? "Editar dato operativo" : "Registrar dato operativo"}
            subtitle="Un registro por cada fecha del histórico operacional."
            icon={<Database className="h-4 w-4" />}
            action={
              <div className="flex items-center gap-2">
                <span className="hidden rounded-md border border-brand-100 bg-brand-50 px-2.5 py-1.5 text-[11.5px] font-medium text-brand-800 sm:inline-flex">
                  {kmPorCarrera} km por carrera
                </span>
                {editando && (
                  <Button variant="ghost" size="sm" onClick={limpiarFormulario}>
                    <X className="h-4 w-4" /> Cancelar
                  </Button>
                )}
              </div>
            }
          />
          <form onSubmit={enviar} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Fecha" required>
              <Input
                type="date"
                max={fechaHoyInput()}
                value={formulario.fecha}
                onChange={(event) => setFormulario((actual) => ({ ...actual, fecha: event.target.value }))}
                required
              />
            </Field>
            <Field label="QTY carreras" hint="Actualiza automáticamente las paradas estimadas" required>
              <Input
                type="text"
                inputMode="numeric"
                min="0"
                step="1"
                placeholder="Ej. 278"
                value={formulario.qty_carreras}
                onChange={(event) => manejarCambioCarreras(event.target.value)}
                required
              />
            </Field>
            <Field label="QTY pasajeros" required>
              <Input
                type="text"
                inputMode="numeric"
                min="0"
                step="1"
                placeholder="Ej. 534200"
                value={formulario.qty_pasajeros}
                onChange={(event) => actualizarNumero("qty_pasajeros", event.target.value)}
                required
              />
            </Field>
            <Field label="Km comercial" hint={`Auto: carreras × ${kmPorCarrera} km (editable si hubo variante)`} required>
              <Input
                type="text"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formulario.km_comercial}
                onChange={(event) => actualizarNumero("km_comercial", event.target.value)}
                required
              />
            </Field>
            <Field label="Km no comercial" hint="Por defecto 0 si no hubo traslados en vacío" required>
              <Input
                type="text"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="0"
                value={formulario.km_no_comercial}
                onChange={(event) => actualizarNumero("km_no_comercial", event.target.value)}
                required
              />
            </Field>
            <Field label="Paradas en estación" hint={`Auto: carreras × ${cantidadEstaciones} estaciones activas (editable si hubo variante)`} required>
              <Input
                type="text"
                inputMode="numeric"
                min="0"
                step="1"
                placeholder="0"
                value={formulario.paradas_estacion}
                onChange={(event) => actualizarNumero("paradas_estacion", event.target.value)}
                required
              />
            </Field>
            <div className="flex items-end sm:col-span-2 lg:col-span-3">
              <Button type="submit" disabled={guardando}>
                <Save className="h-4 w-4" /> {guardando ? "Guardando..." : editando ? "Guardar cambios" : "Registrar dato"}
              </Button>
            </div>
          </form>
        </Card>

        <Card padded={false}>
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line-soft px-5 py-4">
            <div>
              <h2 className="text-[15px] font-semibold text-ink">Historial de datos operativos</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">{data?.total ?? 0} registros guardados</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Field label="Desde">
                <Input type="date" value={desde} onChange={(event) => { setDesde(event.target.value); setPagina(1); }} />
              </Field>
              <Field label="Hasta">
                <Input type="date" value={hasta} onChange={(event) => { setHasta(event.target.value); setPagina(1); }} />
              </Field>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-[12.5px]">
              <thead className="bg-surface text-[11px] uppercase tracking-wide text-ink-faint">
                <tr>
                  <th className="px-5 py-3 font-semibold">Fecha</th>
                  <th className="px-4 py-3 text-right font-semibold">QTY carreras</th>
                  <th className="px-4 py-3 text-right font-semibold">QTY pasajeros</th>
                  <th className="px-4 py-3 text-right font-semibold">Km comercial</th>
                  <th className="px-4 py-3 text-right font-semibold">Km no comercial</th>
                  <th className="px-4 py-3 text-right font-semibold">Paradas en estación</th>
                  <th className="px-5 py-3 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {isLoading && <tr><td colSpan={7} className="px-5 py-10 text-center text-ink-quiet">Cargando datos...</td></tr>}
                {!isLoading && data?.items.length === 0 && <tr><td colSpan={7} className="px-5 py-10 text-center text-ink-quiet">No hay datos operativos para mostrar.</td></tr>}
                {!isLoading && data?.items.map((dato) => (
                  <tr key={dato.id_dato_operativo} className="text-ink-soft hover:bg-surface/60">
                    <td className="px-5 py-3 font-medium text-ink">{formatDate(dato.fecha)}</td>
                    <td className="px-4 py-3 text-right">{numero(dato.qty_carreras)}</td>
                    <td className="px-4 py-3 text-right">{numero(dato.qty_pasajeros)}</td>
                    <td className="px-4 py-3 text-right">{numero(dato.km_comercial)}</td>
                    <td className="px-4 py-3 text-right">{numero(dato.km_no_comercial)}</td>
                    <td className="px-4 py-3 text-right">{numero(dato.paradas_estacion)}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => editar(dato)} title="Editar dato" aria-label="Editar dato"><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setEliminando(dato)} title="Eliminar dato" aria-label="Eliminar dato"><Trash2 className="h-4 w-4 text-critical" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data && data.total > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft px-5 py-3 text-[12px] text-ink-quiet">
              <span>Mostrando {(paginaActual - 1) * POR_PAGINA + 1}–{Math.min(paginaActual * POR_PAGINA, data.total)} de {data.total}</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setPagina((actual) => Math.max(1, actual - 1))} disabled={paginaActual === 1}>Anterior</Button>
                <span>Página {paginaActual} de {totalPaginas}</span>
                <Button variant="outline" size="sm" onClick={() => setPagina((actual) => Math.min(totalPaginas, actual + 1))} disabled={paginaActual === totalPaginas}>Siguiente</Button>
              </div>
            </div>
          )}
        </Card>

        {eliminando && (
          <Card className="border-critical/30 bg-critical-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-critical-ink">¿Eliminar el registro del {formatDate(eliminando.fecha)}?</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setEliminando(null)}>Cancelar</Button>
                <Button variant="danger" size="sm" onClick={confirmarEliminacion} disabled={eliminar.isPending}><Trash2 className="h-4 w-4" /> Eliminar</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Shell>
  );
}
