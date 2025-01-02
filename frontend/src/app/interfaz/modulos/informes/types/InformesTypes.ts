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

export interface ResultadoType {
  idPregunta: string;
  ponderacion: number;
  estandar: string;
}

export interface InformeType {
  amenazas: ResultadoType[];
  salud: ResultadoType[];
  peligros: ResultadoType[];
  integral: ResultadoType[];
  mejoramiento: ResultadoType[];
  recursos: ResultadoType[];
}

export type Query = { getPlanesAccion: PlanesType[] };
export type QueryInforme = { getInformes: InformeType[] };

export type MutationResponse = { savePlanesAccion: string };
