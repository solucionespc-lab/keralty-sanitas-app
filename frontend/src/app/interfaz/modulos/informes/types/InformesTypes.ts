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

export interface PreguntaEvaluacionType {
  plan: string;
}

interface EvaluacionesType {
  cuestionario: PreguntaEvaluacionType[];
}

export type Query = { getEvaluaciones: EvaluacionesType[] };
