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
      item: '',
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

// TODO la fecha de creacion debe ser por defecto la fecha actual
export const datosBasicos = {
  id: '',
  idEmpresa: '',
  fechaCreacion: new Date().toDateString().split('T')[0],
  annio: new Date().getFullYear(),
  puntajeTotal: 0,
  calificacion: '',
  firma: {
    nombre: '',
    url: '',
  },
  empresa: {
    nit: '',
    nombre: '',
    riesgo: '',
    tamano: '',
    tipoEmpresa: 'empresa',
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

export const tamanoEmpresa = {
  '10 o menos': 'pequena',
  'Entre 11 y 50': 'mediana',
  'Más de 50': 'grande',
};

export const tamanoEmpresa2 = {
  pequena: '10 o menos',
  mediana: 'Entre 11 y 50',
  grande: 'Más de 50',
};

export const INDICE_ALGOLIA = 'col_empresas_keralty';
