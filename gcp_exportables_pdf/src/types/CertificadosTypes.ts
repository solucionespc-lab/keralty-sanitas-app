export interface IBodyData {
  idEmpresa: string;
  idEvaluacion: string;
}

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
  empresa: EmpresaType;
  cuestionario: PreguntaEvaluacionType[];
  firma: FirmaType;
  puntajeTotal: number;
  calificacion: string;
}

export interface PDFDataType {
  marcaUrl: string;
  logoUrl: string;
  nombre: string;
  nit: string;
  diaAfiliacion: number;
  mesAfilicacion: number;
  annioAfiliacion: number;
  annioActual: number;
  puntaje: number;
  calificacion: string;
  fecha: string;
  diaExpedicion: number;
  mesExpedicion: string;
  annioExpedicion: number;
}
