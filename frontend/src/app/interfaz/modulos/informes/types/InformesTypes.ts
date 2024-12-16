export interface EmpresaType {
  nit: string;
  nombre: string;
  tipoEmpresa: string;
  riesgo: string;
  tamano: string;
}

export type QueryEmpresa = { getEmpresa: EmpresaType };

export interface PlanType {
  plan: {
    ciclo: string;
    criterios: string;
    estandar: string;
    item: string;
    modo: string;
    orden: number;
    planAccion: string;
    ponderacion: number;
    respuesta: string;
  };
}
