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

export const datosBasicos = {
  id: '',
  idEmpresa: '',
  fechaCreacion: new Date().toISOString(),
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

export const tamanoEmpresa = {
  pequena: 'Menos de diez (10) trabajadores',
  mediana: 'Diez (10) a veinte (50) trabajadores',
  grande: 'Más de veinte (50) trabajadores',
};

export const INDICE_ALGOLIA = 'col_empresas_keralty';
