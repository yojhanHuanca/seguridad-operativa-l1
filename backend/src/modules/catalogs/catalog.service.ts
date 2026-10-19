import { CatalogRepository } from "./catalog.repository.js";

export class CatalogService {
  static async getAllGroups() {
    return CatalogRepository.findAllGroups();
  }

  static async getGroupForAdmin(id_catalogo: number) {
    const group = await CatalogRepository.findGroupWithAllDetalle(id_catalogo);
    if (!group) throw new Error("Catálogo no encontrado");
    return group;
  }

  static async createItem(id_catalogo: number, nombre_raw: string, clasificacion_mr?: string) {
    let nombre = typeof nombre_raw === "string" ? nombre_raw.trim() : "";
    if (!nombre) throw new Error("El nombre es obligatorio");

    const existing = await CatalogRepository.findDetalleByNombre(id_catalogo, nombre);
    if (existing) throw new Error("Ya existe un valor con ese nombre en este catálogo");

    const group = await CatalogRepository.findGroup(id_catalogo);
    if (!group) throw new Error("Catálogo no encontrado");
    if (group.codigo === "NUMERO_MR") nombre = await validateUnit(id_catalogo, nombre, clasificacion_mr);
    else if (clasificacion_mr !== undefined) throw new Error("La clasificación solo corresponde a material rodante");
    if (nombre.length > 200) throw new Error("El nombre admite hasta 200 caracteres");
    return CatalogRepository.createDetalle(id_catalogo, nombre, clasificacion_mr);
  }

  static async updateItem(id_detalle: number, nombre_raw: string, clasificacion_mr?: string) {
    let nombre = typeof nombre_raw === "string" ? nombre_raw.trim() : "";
    if (!nombre) throw new Error("El nombre es obligatorio");

    const detalle = await CatalogRepository.findDetalleById(id_detalle);
    if (!detalle) throw new Error("Valor de catálogo no encontrado");

    const duplicate = await CatalogRepository.findDetalleByNombre(detalle.id_catalogo, nombre);
    if (duplicate && duplicate.id_detalle !== id_detalle) {
      throw new Error("Ya existe un valor con ese nombre en este catálogo");
    }

    const group = await CatalogRepository.findGroup(detalle.id_catalogo);
    if (group?.codigo === "NUMERO_MR" && detalle.clasificacion_mr && clasificacion_mr !== detalle.clasificacion_mr && await CatalogRepository.countUnitReferences(id_detalle) > 0) {
      throw new Error("Esta unidad tiene eventos registrados. No se puede cambiar su clasificación porque afectaría la coherencia del historial");
    }
    if (group?.codigo === "NUMERO_MR" && nombre.toUpperCase() !== "N/A") nombre = await validateUnit(detalle.id_catalogo, nombre, clasificacion_mr, id_detalle);
    else if (clasificacion_mr !== undefined) throw new Error("La clasificación solo corresponde a unidades de material rodante");
    if (nombre.length > 200) throw new Error("El nombre admite hasta 200 caracteres");
    return CatalogRepository.updateDetalle(id_detalle, nombre, clasificacion_mr);
  }

  static async setItemEstado(id_detalle: number, estado: boolean) {
    const detalle = await CatalogRepository.findDetalleById(id_detalle);
    if (!detalle) throw new Error("Valor de catálogo no encontrado");

    return CatalogRepository.setDetalleEstado(id_detalle, estado);
  }
}

function normalizeUnit(value: string) {
  const text = value.trim().toUpperCase();
  const train = text.match(/^T0*(\d+)$/);
  return train ? `T${Number(train[1])}` : text;
}
async function validateUnit(group: number, nombre: string, classification: unknown, current?: number) {
  if (!["ALSTOM", "ANSALDO", "AUXILIAR"].includes(classification as string)) throw new Error("Selecciona ALSTOM, ANSALDO o Vehículos auxiliares");
  const normalized = normalizeUnit(nombre);
  if (normalized === "N/A" || normalized.length > 200) throw new Error("El código de unidad no es válido");
  if (classification !== "AUXILIAR" && !/^T[1-9]\d{0,5}$/.test(normalized)) throw new Error("El tren debe tener un código como T1 o T45");
  const items = await CatalogRepository.listNames(group);
  if (items.some(item => item.id_detalle !== current && normalizeUnit(item.nombre) === normalized)) throw new Error("Ya existe una unidad con ese código, incluso si está desactivada");
  return normalized;
}
