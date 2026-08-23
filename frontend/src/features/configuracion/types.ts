export interface ConfiguracionGeneral {
  sistema: {
    nombre: string;
    version: string;
  };
  numeracion: {
    prefijoExpedientes: string;
    secuenciaExpedientes: number;
    prefijoPlanes: string;
    secuenciaPlanes: number;
  };
  plazos: {
    diasMaxInvestigacion: number;
    diasResponderPlanes: number;
    diasSolicitarProrroga: number;
  };
  meta: {
    ultimaActualizacion: string | null;
  };
}

export interface ConfiguracionPublica {
  nombre: string;
  version: string;
}
