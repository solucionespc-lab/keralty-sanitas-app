export interface EmpresaExcelType {
  NIT: number;
  'RAZON SOCIAL ': string;
  'FECHA AFILIACION ': number;
  'No. Asegurados': string;
}

export interface EmpresaType {
  nit: string;
  nombre: string;
  riesgo: string;
  tamano: string;
  tipoEmpresa: string;
  grupo: string;
  activo: boolean;
  fechaAfiliacion?: string;
  numeroAsegurados?: string;
  responsables?: {
    nombre: string;
    cargo: string;
    telefono: string;
    correo: string;
    usuarioActivo: boolean;
  }[];
}
