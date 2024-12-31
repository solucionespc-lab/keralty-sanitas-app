export interface ContenidoType {
  ciclo: string;
  estandar: string;
  item: string;
  criterios: string;
  modo: string;
  ponderacion: number;
  planAccion: string;
  tipoEmpresa: string[];
  tamano: string[];
  riesgo: string[];
  orden: number;
}

export interface CuestionarioType {
  codigo: string;
  tipoEmpresa: string[];
  tamano: string[];
  riesgo: string[];
  contenido: ContenidoType[];
}

export interface informeType {
  idPregunta: string;
  ponderacion: number;
  estandar: string;
}
[];
