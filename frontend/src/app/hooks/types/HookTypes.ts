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
    criterio: string;
    modo: string;
    ponderacion: number;
    orden: number;
  }[];
}

export interface Listas {
  evaluaciones: Record<string, ItemCuestionario>;
  estandares: Record<string, string>;
}

export interface ListadosType {
  listas: Listas;
}
