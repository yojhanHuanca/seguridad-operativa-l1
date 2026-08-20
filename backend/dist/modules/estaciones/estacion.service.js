import { EstacionRepository } from "./estacion.repository.js";
export class EstacionService {
    static async getAllEstaciones() {
        return EstacionRepository.findAll();
    }
    static async createEstacion(nombre_estacion) {
        const nombre = nombre_estacion.trim();
        if (!nombre)
            throw new Error("El nombre de la estación es obligatorio");
        const existing = await EstacionRepository.findByNombre(nombre);
        if (existing)
            throw new Error("Ya existe una estación con ese nombre");
        return EstacionRepository.create(nombre);
    }
    static async updateEstacion(id_estacion, nombre_estacion) {
        const nombre = nombre_estacion.trim();
        if (!nombre)
            throw new Error("El nombre de la estación es obligatorio");
        const existing = await EstacionRepository.findByNombre(nombre);
        if (existing && existing.id_estacion !== id_estacion) {
            throw new Error("Ya existe una estación con ese nombre");
        }
        return EstacionRepository.update(id_estacion, nombre);
    }
    static async deleteEstacion(id_estacion) {
        const usage = await EstacionRepository.countUsage(id_estacion);
        if (usage > 0) {
            throw new Error("No se puede eliminar: la estación tiene incidencias asociadas");
        }
        return EstacionRepository.remove(id_estacion);
    }
}
//# sourceMappingURL=estacion.service.js.map