import { AuditoriaRepository, type NuevaAuditoria } from "./auditoria.repository.js";

export class AuditoriaService {
  static async registrar(n: NuevaAuditoria) {
    return AuditoriaRepository.registrar(n);
  }

  static async list(query: { usuario?: string; tabla?: string; desde?: string; hasta?: string; page?: string; limit?: string }) {
    const usuario = Number(query.usuario);
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 30, 100);

    return AuditoriaRepository.findAll({
      ...(Number.isInteger(usuario) && usuario > 0 ? { usuario } : {}),
      ...(query.tabla ? { tabla: query.tabla } : {}),
      ...(query.desde ? { desde: query.desde } : {}),
      ...(query.hasta ? { hasta: query.hasta } : {}),
      page,
      limit,
    });
  }

  static async tablas() {
    return AuditoriaRepository.findTablasRegistradas();
  }
}
