import { ArrowDownToLine } from 'lucide-react';
export function ImportacionHeader() {
  return <header className="import-heading"><div><h1>Importaciones</h1><p>Incorpora registros históricos y revisa cómo ingresarán a la plataforma.</p></div><a href="#import-history" className="import-history-link"><ArrowDownToLine size={16} /> Ver historial</a></header>;
}
