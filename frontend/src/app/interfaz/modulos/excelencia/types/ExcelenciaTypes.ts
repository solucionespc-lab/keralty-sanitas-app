export interface EmpresaType {
  nombre: string;
  riesgo: string;
}

export interface ContenidoType {
  codigoPregunta: string;
  tema: string;
  requisito: string;
  respuesta: number;
  observaciones: string;
}

export interface ItemExcelencia {
  codigo: string;
  objetivo: string;
  dimension: number;
  contenido: ContenidoType[];
}

export interface ExcelenciaType {
  id: string;
  idEmpresa: string;
  codigo: string;
  tema: string;
  objetivo: string;
  dimension: number;
  contenido: ContenidoType[];
  fechaCreacion: string;
  annio: number;
  puntajeTotal: number;
  calificacion: string;
  empresa: EmpresaType;
}

export interface FiltrosType {
  idEmpresa: string;
  filtros: {
    fechaInicio: string;
    fechaFin: string;
    annio: number;
  };
}

export interface CrearFormProps {
  cerrar: () => void;
}

export type DimensionPropsType = {
  tema: string;
};

export type Query = { getExcelencia: ExcelenciaType[] };
export type QueryEmpresa = { getEmpresa: EmpresaType };
