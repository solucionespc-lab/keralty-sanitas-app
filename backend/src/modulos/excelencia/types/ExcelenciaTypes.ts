export interface EmpresaType {
  nit: string;
  nombre: string;
  tipoEmpresa: string;
  riesgo: string;
  tamano: string;
}

export interface ExcelenciaType {
  id: string;
  idEmpresa: string;
  codigo: string;
  tema: string;
  objetivo: string;
  dimension: number;
  contenido: {
    codigoPregunta: string;
    requisito: string;
  }[];
  fechaCreacion: string;
  annio: number;
  puntajeTotal: number;
  calificacion: string;
  empresa: EmpresaType;
}

export interface ExcelenciaInputType {
  id: string;
  idEmpresa: string;
  codigo: string;
  tema: string;
  objetivo: string;
  dimension: number;
  contenido: {
    codigoPregunta: string;
    requisito: string;
  }[];
  fechaCreacion: string;
  annio: number;
  puntajeTotal: number;
  calificacion: string;
}

export interface FiltrosType {
  idEmpresa: string;
  filtros: {
    fechaInicio: string;
    fechaFin: string;
    annio: number;
  };
}

export interface ExcelenciaInput {
  cuestionario: ExcelenciaInputType;
}
