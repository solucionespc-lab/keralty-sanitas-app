export interface IIAM {
  version: string;
  acciones: {
    aplicacion: string[];
    infraestructura: string[];
  };
  modulos: {
    [key: number]: {
      descripcion: string;
      titulo: string;
      url: string;
      subGrupo: string;
      responsable: string;
      imagen: string;
      estaActivo: boolean;
      llaveModulo: string;
    };
  };
}

export interface ConfiguracionesType {
  version: string;
  acciones: {
    [key: string]: string[];
  };
  modulos: {
    descripcion: string;
    titulo: string;
    url: string;
    subGrupo: string;
    responsable: string;
    imagen: string;
    estaActivo: boolean;
    llaveModulo: string;
  }[];
  listas: string;
}
