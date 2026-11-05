const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export function diaSemana(fecha: Date) {
  return DIAS[fecha.getUTCDay()] ?? "Domingo";
}

export function semanaDelAnio(fecha: Date) {
  const inicioAnio = Date.UTC(fecha.getUTCFullYear(), 0, 1);
  const dias = Math.floor((fecha.getTime() - inicioAnio) / 86_400_000);
  return Math.floor(dias / 7) + 1;
}

export function rangoHorarioLabel(hora: string) {
  const horaNum = Number(hora.split(":")[0]);
  const inicio = Math.floor(horaNum / 2) * 2;
  const fin = inicio + 1;
  return `${String(inicio).padStart(2, "0")}:00 - ${String(fin).padStart(2, "0")}:59`;
}
