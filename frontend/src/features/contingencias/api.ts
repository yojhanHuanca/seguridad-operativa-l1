import { api } from "@/lib/api";
import type {
  ContingenciaEvento,
  ContingenciaCatalogo,
  CreateContingenciaDto,
  UpdateContingenciaDto,
  ContingenciaFiltros,
  ContingenciaPageResponse,
} from "./types";

export const contingenciasApi = {
  async getCatalogos(): Promise<ContingenciaCatalogo[]> {
    const { data } = await api.get("/contingencias/catalogos");
    return data.data;
  },

  async list(filtros: ContingenciaFiltros = {}): Promise<ContingenciaPageResponse> {
    const params = new URLSearchParams();
    if (filtros.search) params.set("search", filtros.search);
    if (filtros.estado) params.set("estado", filtros.estado);
    if (filtros.desde) params.set("desde", filtros.desde);
    if (filtros.hasta) params.set("hasta", filtros.hasta);
    if (filtros.sortBy) params.set("sortBy", filtros.sortBy);
    if (filtros.sortDir) params.set("sortDir", filtros.sortDir);
    params.set("page", String(filtros.page || 1));
    params.set("limit", String(filtros.limit || 20));

    const { data } = await api.get("/contingencias", { params });
    return {
      items: data.data,
      total: data.meta?.total || 0,
    };
  },

  async getById(id: string | number): Promise<ContingenciaEvento> {
    const { data } = await api.get(`/contingencias/${id}`);
    return data.data;
  },

  async create(dto: CreateContingenciaDto): Promise<ContingenciaEvento> {
    const { data } = await api.post("/contingencias", dto);
    return data.data;
  },

  async update(id: string | number, dto: UpdateContingenciaDto): Promise<ContingenciaEvento> {
    const { data } = await api.put(`/contingencias/${id}`, dto);
    return data.data;
  },

};
