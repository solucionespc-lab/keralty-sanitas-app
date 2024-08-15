export interface IEstados {
  crear: boolean;
  editar: boolean;
  aplicaFiltro: boolean;
  importar: boolean;
  id: string;
}

export interface IFiltros {
  cedula: number;
  genero: string;
  nivelEducativo: string;
  profesion: string;
  gerencia: string;
  procesoActual: string;
  turnoActual: string;
  cargoActual: string;
}

export interface ISocioTrab {
  idTrabajador?: string;
  cedula: number;
  nombre: string;
  fechaNacimiento: string;
  genero: string;
  estadoCivil: string;
  numHijos: number;
  nivelEducativo: string;
  profesion: string;
  gerencia: string;
  cargoActual: string;
  procesoActual: string;
  turnoActual: string;
  fechaIngresoEmp: string;
  fechaRetiroEmp: string;
  esBrigadista: boolean;
  temaBrigada: string;
  activo: boolean;
}

export interface IOcupacionalesTrab {
  id: string;
  idTrabajador: string;
  fechaIngresoEmp: string;
  fechaRetiroEmp: string;
  genero: string;
  fechaIngresoCargo: string;
  fechaRetiroCargo: string;
  cargo: string;
  gerencia: string;
  proceso: string;
  turno: string;
  jefeInmediato: string;
  correo: string;
  tipoContrato: string;
}

export interface IEmergenciaTrab {
  nombreContacto: string;
  numContacto: string;
  grupoSanguineo: string;
  rh: string;
}

export type TTrabSocio = ISocioTrab;
export type TTrabEmergencia = IEmergenciaTrab;
export type TTrabOcup = {
  historiaOcupacional: IOcupacionalesTrab[];
};
export type InfoQueryTrabajadores = ISocioTrab & TTrabOcup & IEmergenciaTrab;

interface TrabSchema {
  idTrabajador: string;
  cedula: string;
  nombre: string;
  gerencia: string;
  fechaIngresoEmp: string;
}

export interface QueryTrabType {
  getTrabajador: InfoQueryTrabajadores;
}

export interface QueryTypeTrab {
  getTrabajadores: TrabSchema[];
}
