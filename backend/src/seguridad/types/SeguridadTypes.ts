const AppOptions = {
  read: 'leer',
  write: 'escribir',
  aprove: 'aprobar',
  import: 'importar',
  export: 'exportar',
  delete: 'borrar',
  upload: 'cargarArchivos',
  exportar: 'exportarTodo',
  duplicar: 'duplicar',
  masivas: 'masivas',
  pendientes: 'pendientes',
} as const;

const CloudOptions = {
  create: 'crearUsuarios',
  calls: 'llamar',
  tokens: 'crearTokens',
  masivas: 'masivas',
  configuracion: 'configuracion',
} as const;

type AttributesRole = {
  roles: string[];
  firmas: string[];
  privilegios: string | null;
  organizacion: string;
};

export interface IamType {
  version: string;
  grupos: {
    propietario: AttributesRole;
    cliente: AttributesRole;
    soporte: AttributesRole;
  };
  modulos: {
    [key: number]: string;
  };
  acciones: {
    aplicacion: (typeof AppOptions)[keyof typeof AppOptions][];
    infraestructura: (typeof CloudOptions)[keyof typeof CloudOptions][];
  };
}

export type gruopAcc = keyof IamType['grupos'];

export interface ClaimsType {
  regional: string[];
  centro: string[];
  grupo: gruopAcc;
  rol: string;
  organizacion: string;
  permisos: string;
  firma: string;
}
