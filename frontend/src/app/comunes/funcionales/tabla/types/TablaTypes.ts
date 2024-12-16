interface Ifila {
  categoria: string;
  datos: number[];
}

interface IfilaLetra {
  categoria: string;
  datos: string[];
}

export interface ITablaProps {
  titulo?: string;
  encabezados: string[];
  contenido: Ifila[];
}

export interface ITablaLetraProps {
  titulo: string;
  encabezados: string[];
  contenido: IfilaLetra[];
}

export interface IdatosProps {
  contenido: Ifila[];
}
