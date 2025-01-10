// Interfaz que representa el contenido en el real time
export interface EvaContenidoRT {
  ciclo: string;
  estandar: string;
  orden: number;
  ponderacion: number;
}

export interface EvaRepuesta {
  codigo: string;
  respuesta: string;
}
