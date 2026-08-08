import { CatalogRepository } from "./catalog.repository.js";
export class CatalogService {
    static async getAllGroups() {
        return CatalogRepository.findAllGroups();
    }
}
//# sourceMappingURL=catalog.service.js.map