import { nanoid } from 'nanoid';

export const cuestionarioInicial = {
  cuestionario: {
    [nanoid(8)]: {
      codigoPregunta: '',
      requisito: '',
      respuesta: 0,
      observaciones: '',
      tema: '',
    },
  },
};

export const datosBasicos = {
  id: '',
  idEmpresa: '',
  fechaCreacion: new Date().toISOString().split('T')[0],
  annio: new Date().getFullYear(),
  puntajeTotal: 0,
  calificacion: 'sin_calculo',
  evaluador: '',
  area: '',
  empresa: {
    nombre: '',
    riesgo: '',
  },
};

export const inicialFiltros = {
  annioAplicado: new Date().getFullYear(),
  annio: new Date().getFullYear(),
  fechaInicioAplicado: '',
  fechaInicio: '',
  fechaFinAplicado: '',
  fechaFin: '',
};

export const CONVENCION_TEMAS = {
  liderazgo: 'Liderazgo',
  proposito: 'Propósito',
  objetivos: 'Objetivos',
  sst: 'SST',
  compromiso: 'Compromiso',
};

export const LST_RESPUESTAS = [
  {
    titulo: 'Totalmente en desacuerdo',
    puntaje: 20,
  },
  {
    titulo: 'En desacuerdo',
    puntaje: 40,
  },
  {
    titulo: 'Ni de acuerdo, ni en desacuerdo',
    puntaje: 60,
  },
  {
    titulo: 'Parcialmente de acuerdo',
    puntaje: 80,
  },
  {
    titulo: 'Totalmente de acuerdo',
    puntaje: 100,
  },
  {
    titulo: 'No aplica',
    puntaje: -1,
  },
];

export const LST_DIMENSION_5 = [
  {
    titulo: 'Si',
    puntaje: 100,
  },
  {
    titulo: 'No',
    puntaje: 0,
  },
];

export const EQUIVALENCIAS_CINTURONES = {
  sin_calculo: 'Sin diligenciar',
  blanco: 'Área cinturón blanco',
  amarillo: 'Área cinturón amarillo',
  violeta: 'Área cinturón violeta',
  marron: 'Área cinturón marrón',
  negro: 'Área cinturón negro',
};
