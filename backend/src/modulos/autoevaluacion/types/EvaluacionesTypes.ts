import { EmpresaType } from '../../empresas/types/EmpresasTypes';

interface SoportesType {
  nombre: string;
  url: string;
}

interface FirmaType {
  nombre: string;
  url: string;
}

interface PreguntaEvaluacionType {
  codigo: string;
  ciclo: string;
  estandar: string;
  criterio: string;
  modo: string;
  ponderacion: number;
  respuesta: string;
  planes: string[];
  soportes: SoportesType;
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
  empresa: EmpresaType;
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
