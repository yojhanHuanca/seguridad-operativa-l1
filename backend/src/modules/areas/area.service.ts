import { AreaRepository } from "./area.repository.js";

export class AreaService {
  static async getAllAreas() {
    return AreaRepository.findAll();
  }

  static async createArea(nombre_area: string) {
    const nombre = nombre_area.trim();
    if (!nombre) throw new Error("El nombre del área es obligatorio");

    const existing = await AreaRepository.findByNombre(nombre);
    if (existing) throw new Error("Ya existe un área con ese nombre");

    return AreaRepository.create(nombre);
  }

  static async updateArea(id_area: number, nombre_area: string) {
    const nombre = nombre_area.trim();
    if (!nombre) throw new Error("El nombre del área es obligatorio");

    const existing = await AreaRepository.findByNombre(nombre);
    if (existing && existing.id_area !== id_area) {
      throw new Error("Ya existe un área con ese nombre");
    }

    return AreaRepository.update(id_area, nombre);
  }

  static async deleteArea(id_area: number) {
    const usage = await AreaRepository.countUsage(id_area);
    if (usage > 0) {
      throw new Error("No se puede eliminar: el área tiene usuarios o registros asociados");
    }
    return AreaRepository.remove(id_area);
  }
}
