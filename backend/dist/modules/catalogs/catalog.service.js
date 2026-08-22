import { CatalogRepository } from "./catalog.repository.js";
export class CatalogService {
    static async getAllGroups() {
        return CatalogRepository.findAllGroups();
    }
    static async getGroupForAdmin(id_catalogo) {
        const group = await CatalogRepository.findGroupWithAllDetalle(id_catalogo);
        if (!group)
            throw new Error("Catálogo no encontrado");
        return group;
    }
    static async createItem(id_catalogo, nombre_raw) {
        const nombre = nombre_raw.trim();
        if (!nombre)
            throw new Error("El nombre es obligatorio");
        const existing = await CatalogRepository.findDetalleByNombre(id_catalogo, nombre);
        if (existing)
            throw new Error("Ya existe un valor con ese nombre en este catálogo");
        return CatalogRepository.createDetalle(id_catalogo, nombre);
    }
    static async updateItem(id_detalle, nombre_raw) {
        const nombre = nombre_raw.trim();
        if (!nombre)
            throw new Error("El nombre es obligatorio");
        const detalle = await CatalogRepository.findDetalleById(id_detalle);
        if (!detalle)
            throw new Error("Valor de catálogo no encontrado");
        const duplicate = await CatalogRepository.findDetalleByNombre(detalle.id_catalogo, nombre);
        if (duplicate && duplicate.id_detalle !== id_detalle) {
            throw new Error("Ya existe un valor con ese nombre en este catálogo");
        }
        return CatalogRepository.updateDetalle(id_detalle, nombre);
    }
    static async setItemEstado(id_detalle, estado) {
        const detalle = await CatalogRepository.findDetalleById(id_detalle);
        if (!detalle)
            throw new Error("Valor de catálogo no encontrado");
        return CatalogRepository.setDetalleEstado(id_detalle, estado);
    }
}
//# sourceMappingURL=catalog.service.js.map