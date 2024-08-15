export interface ResponsableType {
  nombre: string;
  cargo: string;
  telefono: string;
  correo: string;
  usuarioActivo: boolean;
}

export interface EmpresaType {
  id?: string;
  nit: string;
  nombre: string;
  activo: boolean;
  responsables: ResponsableType[];
}

export interface FiltrosType {
  filtros: {
    nit: string;
    nombre: string;
  };
}

export interface EmpresaInput {
  empresa: EmpresaType;
}
