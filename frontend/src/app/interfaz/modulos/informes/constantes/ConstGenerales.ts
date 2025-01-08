export const SECCIONES = [
  {
    titulo: 'Informe autoevaluación',
    id: 'informe',
  },
  {
    titulo: 'Planes de acción - autoevaluación',
    id: 'planes',
  },
  {
    titulo: 'Informe de excelencia',
    id: 'excelencia',
  },
];

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
      data: [80, 85, 90, 90],
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
      data: [60, 60, 60, 60],
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
      data: [80, 80, 80, 80],
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
      data: [90, 85, 90, 80, 90, 90, 90],
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
      data: [60, 60, 60, 60, 60, 60, 60],
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
      data: [80, 80, 80, 80, 80, 80, 80],
    },
  ],
};

export const opcionesGraficaRadar = {
  legend: {
    data: ['Allocated Budget', 'Actual Spending'],
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Liderazgo', max: 100 },
      { name: 'Propósito', max: 100 },
      { name: 'Objetivos', max: 100 },
      { name: 'SST', max: 100 },
      { name: 'Compromiso', max: 100 },
    ],
  },
  series: [
    {
      name: 'Resultado',
      type: 'radar',
      data: [
        {
          value: [100, 100, 90, 100, 70],
          name: 'Dimensiones',
        },
      ],
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

export const CICLOS = {
  amenazas: [0],
  salud: [0],
  peligros: [0],
  integral: [0],
  mejoramiento: [0],
  recursos: [0],
};
