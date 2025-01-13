import { EmpresaType, ProveedorType } from './EmpresasType';

interface AsistenteType {
  nombre: string;
  cargo: string;
  telefono: string;
}

interface ActividadesType {
  total: number;
  nombre: string;
  horas: number;
  horasInforme: number;
}

interface CompromisosType {
  descripcion: string;
  responsable: string;
  fecha: string;
}

export interface ActasType {
  id: string;
  idEmpresa: string;
  idProveedor: string;
  numeroSds: string;
  poliza: string;
  fechaEjecucion: string;
  modalidad: string;
  actividadPpal: string;
  cantidad: number;
  actividades: ActividadesType;
  compromisos: CompromisosType[];
  asistentes: AsistenteType[];
  desplazamiento: boolean;
  descDesplazamiento: string;
  evaluacionActividad: string;
  motivoIncumplimiento: string;
  responsableArl: string;
  responsableEmpresa: string;
  estado: string;
  resultado: string;
  empresa: EmpresaType;
  proveedor: ProveedorType;
}

export interface FiltrosType {
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}

export interface FiltroActa {
  idEmpresa: string;
  idActa: string;
}

export interface ActasArg {
  ActasInput: ActasType;
}

export interface CrearFormProps {
  cerrar: () => void;
  idActa: string;
}

export interface FormProveedorProps {
  cerrar: () => void;
  idActa: string;
  idEmpresa: string;
}

export type QueryActas = { getActas: ActasType[] };
export type QueryActasProveedor = { getActasProveedor: ActasType[] };

export type QueryActa = { getActa: ActasType };

export type FiltroArgType = { idEmpresa: string; filtros: FiltrosType };
export type FiltroProvArgType = { idProveedor: string; filtros: FiltrosType };
