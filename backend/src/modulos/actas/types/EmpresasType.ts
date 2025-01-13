interface ResponsableType {
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
  tipoEmpresa: string;
  riesgo: string;
  tamano: string;
  responsables: ResponsableType[];
}

export interface ProveedorType {
  id?: string;
  nit: string;
  nombre: string;
}
