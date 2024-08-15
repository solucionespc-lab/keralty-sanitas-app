import {
  IEmergenciaTrab,
  IFiltros,
  IOcupacionalesTrab,
  ISocioTrab,
} from '../types/TrabajadoresTypes';

export const TRAB_CONSTANTES = {
  MOD_TITULO: 'Trabajadores',
};

export const datosSociodemograficos: ISocioTrab = {
  cedula: 0,
  idTrabajador: '',
  nombre: '',
  fechaNacimiento: '',
  genero: '',
  estadoCivil: '',
  numHijos: 0,
  nivelEducativo: '',
  profesion: '',
  gerencia: '',
  cargoActual: '',
  procesoActual: '',
  turnoActual: '',
  fechaIngresoEmp: '',
  fechaRetiroEmp: '9999-12-31',
  esBrigadista: false,
  temaBrigada: '',
  activo: true,
};

export const datosOcupacionales: IOcupacionalesTrab = {
  id: '',
  idTrabajador: '',
  fechaIngresoEmp: '',
  fechaRetiroEmp: '9999-12-31',
  genero: '',
  fechaIngresoCargo: '',
  fechaRetiroCargo: '',
  cargo: '',
  gerencia: '',
  proceso: '',
  turno: '',
  jefeInmediato: '',
  correo: '',
  tipoContrato: '',
};

export const datosEmergencia: IEmergenciaTrab = {
  nombreContacto: '',
  numContacto: '',
  grupoSanguineo: '',
  rh: '',
};

export const filtros: IFiltros = {
  cedula: 0,
  genero: '',
  nivelEducativo: '',
  profesion: '',
  gerencia: '',
  procesoActual: '',
  turnoActual: '',
  cargoActual: '',
};

export const direccionCarpetaImportarStorage =
  'trabajadores/plantillasImportacion/';
export const nombreDocImportarStorage = 'importarTrabajadores.xlsx';
