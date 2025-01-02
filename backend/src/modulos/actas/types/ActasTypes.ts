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
  numeroSds: string;
  poliza: string;
  fechaEjecucion: string;
  nombreEmpresa: string;
  nit: string;
  direccion: string;
  telefono: string;
  correo: string;
  modalidad: string;
  asistentes: AsistenteType[];
  actividades: ActividadesType;
  compromisos: CompromisosType[];
  desplazamiento: boolean;
  descDesplazamiento: string;
  evaluacionActividad: string;
  motivoIncumplimiento: string;
  responsableArl: string;
  responsableEmpresa: string;
  estado: string;
}

export interface FiltrosType {
  idEmpresa: string;
  filtros: {
    fechaInicio: string;
    fechaFin: string;
    annio: string;
    estado: string;
  };
}

export interface FiltroActa {
  idEmpresa: string;
  idActa: string;
}

export interface ActasArg {
  ActasInput: ActasType;
}
