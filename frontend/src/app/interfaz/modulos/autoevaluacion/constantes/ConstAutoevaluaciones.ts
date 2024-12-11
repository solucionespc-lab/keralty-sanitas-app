import { nanoid } from 'nanoid';

export const inicialPlan = {
  estado: 'E01',
  aprobacion: false,
  responsable: '',
  descripcion: '',
  fechaCompromiso: '',
  fechaEjecucion: '',
  fechaAsignacion: '',
  origen: 'autoevaluacion',
  idEmpresa: '',
  nombreEmpresa: '',
  nitEmpresa: '',
  fechaPrimerPlazo: '',
  fechaSegundoPlazo: '',
  fechaTercerPlazo: '',
};

export const cuestionarioInicial = {
  cuestionario: {
    [nanoid(8)]: {
      codigo: '',
      ciclo: '',
      estandar: '',
      criterio: '',
      modo: '',
      ponderacion: 1,
      respuesta: '',
      planes: [''],
      soportes: {
        nombre: '',
        url: '',
      },
    },
  },
};

export const datosBasicos = {
  id: '',
  idEmpresa: '',
  fechaCreacion: new Date(),
  annio: new Date().getFullYear(),
  puntajeTotal: 0,
  clasificacion: '',
  firma: {
    nombre: '',
    url: '',
  },
  empresa: {
    nit: '',
    nombre: '',
    riesgo: '',
    tamano: '',
    tipoEmpresa: '',
  },
};

export const inicialFiltros = {
  idEmpresa: '',
  idEmpresaAplicado: '',
  annioAplicado: 2024,
  annio: 2024,
  idEvaluacionAplicado: '',
  idEvaluacion: '',
};

export const INDICE_ALGOLIA = 'col_empresas_keralty';
