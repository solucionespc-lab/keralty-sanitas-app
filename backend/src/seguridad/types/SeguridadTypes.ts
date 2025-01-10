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
    aplicacion: string[];
    infraestructura: string[];
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
