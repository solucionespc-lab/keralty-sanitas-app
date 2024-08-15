export interface IFiltroTrabajador {
  cedula: number;
  gerencia: string;
  proceso: string;
  cargo: string;
}

export interface IFiltroInformeOcupacional {
  gerenciasDeUsuario: string[];
  gerencia?: string;
  year: number;
}

export type RedisJSON =
  | null
  | boolean
  | number
  | string
  | Date
  | RedisJSONObject;
export interface RedisJSONObject {
  [key: string]: RedisJSON;
}

export interface IRedisInput {
  key: string;
  value: RedisJSON;
}

export interface IinputTrabajador {
  idTrabajador?: string;
  cedula: number | string;
  nombre: string;
  fechaNacimiento: string;
  genero: string;
  estadoCivil: string;
  numHijos: number;
  nivelEducativo: string;
  profesion: string;
  fechaIngresoEmp: string;
  fechaRetiroEmp: string;
  historiaOcupacional?: IinputOcupacional[];
  gerencia: string;
  nombreContacto: string;
  numContacto: string;
  grupoSanguineo: string;
  rh: string;
}

export interface IinputTrabajadorImport extends IinputTrabajador {
  cargoActual: string;
  procesoActual: string;
  turnoActual: string;
  fechaIngresoCargo: string;
  fechaRetiroCargo?: string;
  correo: string;
  tipoContrato: string;
  jefeInmediato: string;
}

export interface IinputOcupacional {
  id?: string;
  idTrabajador: string;
  fechaIngresoCargo: string;
  fechaRetiroCargo: string;
  fechaIngresoEmp: string;
  fechaRetiroEmp: string;
  genero: string;
  cargo: string;
  gerencia: string;
  proceso: string;
  turno: string;
  jefeInmediato: string;
  correo: string;
  tipoContrato: string;
}

export interface Ipropiedadgenerica {
  [key: string]: number;
}

export interface IrangoTemporalGenero {
  femenino: Ipropiedadgenerica;
  masculino: Ipropiedadgenerica;
}

export interface IinformeOcupacional {
  antiguedad: IrangoTemporalGenero;
  cargo: Ipropiedadgenerica;
  proceso: Ipropiedadgenerica;
  gerencia: Ipropiedadgenerica;
  tipoContrato: Ipropiedadgenerica;
  turno: Ipropiedadgenerica;
  totalTrabajadores: number;
  tipoGerencia?: string;
  year?: number;
}

export interface IFiltroSociodemograficoYResumen {
  gerenciasDeUsuario: string[];
  gerencia?: string;
  proceso?: string;
  cargo?: string;
  turno?: string;
  year: number;
}

export interface IinformeSociodemografico {
  edad: IrangoTemporalGenero;
  estadoCivil: Ipropiedadgenerica;
  numHijos: Ipropiedadgenerica;
  nivelEducativo: Ipropiedadgenerica;
  profesion: Ipropiedadgenerica;
  totalTrabajadores: number;
  tipoGerencia?: string;
  year?: number;
}

export interface Ietiquetado {
  label: string;
  value: number;
}
export interface IinformeOcupacionalReturned {
  antiguedad: {
    masculino: Ietiquetado[];
    femenino: Ietiquetado[];
  };
  cargo: Ietiquetado[];
  proceso: Ietiquetado[];
  gerencia: Ietiquetado[];
  tipoContrato: Ietiquetado[];
  turno: Ietiquetado[];
  totalTrabajadores: number;
  tipoGerencia?: string;
  year?: number;
}

export interface IinformeSociodemograficoReturned {
  edad: {
    masculino: Ietiquetado[];
    femenino: Ietiquetado[];
  };
  estadoCivil: Ietiquetado[];
  numHijos: Ietiquetado[];
  nivelEducativo: Ietiquetado[];
  profesion: Ietiquetado[];
  tipoGerencia?: string;
  totalTrabajadores: number;
  year?: number;
}

export interface IarregoMedidas {
  edadGeneral: number[];
  antiguedadGeneral: number[];
  edadMasculino: number[];
  antiguedadMasculino: number[];
  edadFemenino: number[];
  antiguedadFemenino: number[];
}
