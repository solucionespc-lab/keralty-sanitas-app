export interface ItemCuestionario {
  codigo: string;
  tamano: string;
  riesgo: string;
  tipoEmpresa: string[];
  contenido: {
    codigo: string;
    ciclo: string;
    estandar: string;
    item: string;
    criterios: string;
    modo: string;
    ponderacion: number;
    orden: number;
    planAccion: string;
  }[];
}

export interface ItemExcelencia {
  codigo: string;
  objetivo: string;
  dimension: number;
  contenido: {
    codigoPregunta: string;
    requisito: string;
    respuesta: number;
    observaciones: string;
    tema: string;
  }[];
}

export interface Listas {
  evaluaciones: Record<string, ItemCuestionario>;
  estandares: Record<string, string>;
  excelencia: Record<string, ItemExcelencia>;
}

export interface ListadosType {
  listas: Listas;
}
