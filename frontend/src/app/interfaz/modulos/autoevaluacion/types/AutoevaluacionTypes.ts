interface SoportesType {
  nombre: string;
  url: string;
}

interface FirmaType {
  nombre: string;
  url: string;
}

export interface EmpresaType {
  nit: string;
  nombre: string;
  tipoEmpresa: string;
  riesgo: string;
  tamano: string;
}

export interface PreguntaEvaluacionType {
  codigo: string;
  ciclo: string;
  estandar: string;
  item: string;
  criterio: string;
  modo: string;
  ponderacion: number;
  orden?: number;
  respuesta?: string;
  planes?: string[];
  soportes?: SoportesType;
}

export interface FiltrosEvaluaciones {
  idEmpresa: string;
  annio: string;
  idEvaluacion: string;
}

export interface EvaluacionesType {
  id: string;
  idEmpresa: string;
  fechaCreacion: string;
  riesgo: string;
  tamano: string;
  cuestionario: PreguntaEvaluacionType[];
  firma: FirmaType;
}

export interface EvaluacionDocArgs {
  evaluacion: EvaluacionesType;
}

export interface EvaParametros {
  filtros: FiltrosEvaluaciones;
}

export interface EvaluacionParametro {
  filtros: {
    idEmpresa: string;
    annio: string;
    idEvaluacion: string;
  };
}

export type Query = { getEvaluaciones: EvaluacionesType[] };
export type QueryEmpresa = { getEmpresa: EmpresaType };