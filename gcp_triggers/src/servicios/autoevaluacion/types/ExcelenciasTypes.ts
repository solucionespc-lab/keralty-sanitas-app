// Interfaz que representa el contenido en el real time

export interface ExcelenciasContenidoRT {
  codigo: string;
  dimension: number;
  contenido: PreguntaExcelencias[];
}

interface PreguntaExcelencias {
  codigoPregunta: string;
  requisito: string;
  tema: string;
}

export interface ExcelenciaRespuesta {
  codigo: string;
  respuesta: number;
  tema: string;
}
