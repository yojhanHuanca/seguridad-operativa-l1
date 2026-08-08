import { AreaRepository } from "./area.repository.js";
export class AreaService {
    static async getAllAreas() {
        return AreaRepository.findAll();
    }
}
//# sourceMappingURL=area.service.js.map