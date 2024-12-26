export interface PlanesType {
  id: string;
  idEmpresa: string;
  idEvaluacion: string;
  fechaCompromiso: string;
  fechaEjecucion: string;
  descripcion: string;
}

export interface PlanesInputArgs {
  PlanesAccionInput: {
    idEmpresa: string;
    idPlan: string;
    fechaCompromiso: string;
    fechaEjecucion: string;
  };
}

export interface FiltrosPlanes {
  fechaInicio: string;
  fechaFin: string;
}

export interface PlanesArgs {
  filtros: FiltrosPlanes;
  idEmpresa: string;
}
