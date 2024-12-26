export interface EmpresaType {
  nit: string;
  nombre: string;
  tipoEmpresa: string;
  riesgo: string;
  tamano: string;
}

export type QueryEmpresa = { getEmpresa: EmpresaType };

export interface PlanesType {
  idPlan: string;
  idEmpresa: string;
  fechaCompromiso: string;
  fechaEjecucion: string;
  descripcion: string;
  responsables: string;
}

export interface PlanesInputArgs {
  planesAccionInput: {
    idEmpresa: string;
    idPlan: string;
    fechaCompromiso: string;
    fechaEjecucion: string;
  };
}

export interface FiltrosPlanes {
  fechaInicio: string;
  fechaFin: string;
}

export interface PlanesArgs {
  filtros: FiltrosPlanes;
  idEmpresa: string;
}

export type Query = { getPlanesAccion: PlanesType[] };
export type MutationResponse = { savePlanesAccion: string };
