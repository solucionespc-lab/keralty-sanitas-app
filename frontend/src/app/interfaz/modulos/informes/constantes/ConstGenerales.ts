export const SECCIONES = ['Informe', 'Planes de acción'];

export const optionesTabla1 = {
  legend: {
    data: ['% Obtenido', 'Moderadamente aceptable', 'Aceptable'],
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#fff',
      },
    },
  },
  xAxis: [
    {
      type: 'category',
      data: ['Planear', 'Hacer', 'Verificar', 'Actuar'],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: '{value} %',
      },
    },
    {
      type: 'value',
    },
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '% Obtenido',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value: number) {
          return value;
        },
      },
      data: [92, 100, 75, 100],
    },
    {
      name: 'Aceptable',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: number) {
          return value;
        },
      },
      data: [85, 85, 85, 85],
    },
    {
      name: 'Moderadamente aceptable',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: number) {
          return value;
        },
      },
      data: [60, 60, 60, 60],
    },
  ],
};

export const opcionesGrafica2 = {
  legend: {
    data: ['% Obtenido', 'Moderablemente aceptable', 'Aceptable'],
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#fff',
      },
    },
  },
  xAxis: [
    {
      type: 'category',
      data: [
        'Recursos',
        'Gestión integral del SG SST',
        'Gestión de la salud',
        'Gestion de peligros y riesgos',
        'Gestión de amenazas',
        'Verificación del SG-SST',
        'Mejoramiento',
      ],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
    {
      type: 'value',
    },
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '% Obtenido',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value: number) {
          return value;
        },
      },
      data: [60, 53.3, 90, 76.6, 80, 50, 75],
    },
    {
      name: 'Moderablemente aceptable',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: number) {
          return value;
        },
      },
      data: [85, 85, 85, 85, 85, 85, 85],
    },
    {
      name: 'Aceptable',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: number) {
          return value;
        },
      },
      data: [60, 60, 60, 60, 60, 60, 60],
    },
  ],
};

export const inicialFiltros = {
  idEmpresa: '',
  idEmpresaAplicado: '',
  fechaInicioAplicado: '',
  fechaInicio: '',
  fechaFinAplicado: '',
  fechaFin: '',
};

export const INICIAL_PLANES = {
  planesAccion: [
    {
      idPlan: '',
      idEmpresa: '',
      fechaCompromiso: '',
      fechaEjecucion: '',
      descripcion: '',
      responsables: '',
    },
  ],
};
