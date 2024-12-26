import { EmpresaType } from '../../empresas/types/EmpresasTypes';

interface SoportesType {
  nombre: string;
  url: string;
}

export interface PreguntaEvaluacionType {
  codigo: string;
  ciclo: string;
  estandar: string;
  criterio: string;
  modo: string;
  ponderacion: number;
  respuesta: string;
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
  planes: string[];
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
