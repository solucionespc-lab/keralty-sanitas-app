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

export interface QueryEmpType {
  getEmpresa: EmpresaType;
}

export interface QueryEmpresas {
  getEmpresas: EmpresaType[];
}

export type EmpresaKey = keyof EmpresaType;

export type pdfDatosType = {
  nombreEmpresa: string;
  year: number;
  calificacion: number;
  interpretacion: string;
};
