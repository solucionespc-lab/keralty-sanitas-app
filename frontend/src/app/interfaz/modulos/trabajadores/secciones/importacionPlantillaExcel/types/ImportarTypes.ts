export interface PlantillaProps {
  prop: string;
  nonmbreColumna: string;
  mostrarDato: boolean;
  lista?: any;
  obligatorio: boolean;
  readOnly?: boolean;
  typeWord: 'string' | 'number';
  tipoControl?: 'select';
}

export interface EncabezadosPlantillaType {
  cedula: string;
  nombre: string;
  genero: string;
  estadoCivil: string;
  numHijos: string;
  nivelEducativo: string;
  profesion: string;
  fechaNacimiento: string;
  fechaIngresoEmp: string;
  fechaRetiroEmp: string;
  fechaIngresoCargo: string;
  fechaRetiroCargo: string;
  cargo: string;
  gerencia: string;
  proceso: string;
  turno: string;
  jefeInmediato: string;
  correo: string;
  tipoContrato: string;
  nombreContacto: string;
  numContacto: string;
  grupoSanguineo: string;
  rh: string;
  [key: string]: string;
}
