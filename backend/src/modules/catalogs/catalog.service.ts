import { CatalogRepository } from "./catalog.repository.js";

export class CatalogService {
  static async getAllGroups() {
    return CatalogRepository.findAllGroups();
  }
}
