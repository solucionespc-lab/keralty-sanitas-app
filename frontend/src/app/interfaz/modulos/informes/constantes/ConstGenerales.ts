export const SECCIONES = ['Informe', 'Planes de acción'];

export const EMPRESA_INICIAL = {
  empresa: {
    nit: '',
    nombre: '',
    riesgo: '',
    tamano: '',
    tipoEmpresa: 'empresa',
  },
};

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

export const planes = [
  {
    ciclo: 'Planear',
    criterios:
      'Empresas de diez (10) o menos trabajadores clasificadas en riesgo I, II, III Asignar una persona que cumpla con el siguiente perfil:El diseño del Sistema de Gestión de Seguridad y Salud en el Trabajo, para empresas de menos de diez (10) trabajadores en clase de riesgo I, II, III puede ser realizado por un técnico en Seguridad y Salud en el Trabajo (SST) o en alguna de sus áreas, con licencia vigente en Seguridad y Salud en el Trabajo, que acredite mínimo un (1) año de experiencia certificada por las empresas o entidades en las que laboró en el desarrollo de actividades de Seguridad y Salud en el Trabajo y que acredite la aprobación del curso de capacitación virtual de cincuenta (50) horas.Esta actividad también podrá ser desarrollada por tecnólogos, profesionales y profesionales con posgrado en SST, que cuenten con licencia vigente en Seguridad y Salud en el Trabajo y el referido curso de capacitación virtual de cincuenta (50) horas.',
    estandar: 'recursos',
    item: 'Asignación de persona que diseña el Sistema de Gestión de SST',
    modo: 'Solicitar documento soporte de la asignación y constatar la hoja de vida con soportes, de la persona asignada.',
    orden: 1,
    planAccion:
      'Asignar una persona que cumpla con el siguiente perfil:El diseño del Sistema de Gestión de Seguridad y Salud en el Trabajo, para empresas de menos de diez (10) trabajadores en clase de riesgo I, II, III puede ser realizado por un técnico en Seguridad y Salud en el Trabajo (SST) o en alguna de sus áreas, con licencia vigente en Seguridad y Salud en el Trabajo, que acredite mínimo un (1) año de experiencia certificada por las empresas o entidades en las que laboró en el desarrollo de actividades de Seguridad y Salud en el Trabajo y que acredite la aprobación del curso de capacitación virtual de cincuenta (50) horas.Esta actividad también podrá ser desarrollada por tecnólogos, profesionales y profesionales con posgrado en SST, que cuenten con licencia vigente en Seguridad y Salud en el Trabajo y el referido curso de capacitación virtual de cincuenta (50) horas.',
    ponderacion: 0.5,
    respuesta: '',
  },
  {
    ciclo: 'Hacer',
    criterios:
      'Empresas de diez (10) o menos trabajadores clasificadas en riesgo I, II, III Asignar una persona que cumpla con el siguiente perfil:El diseño del Sistema de Gestión de Seguridad y Salud en el Trabajo, para empresas de menos de diez (10) trabajadores en clase de riesgo I, II, III puede ser realizado por un técnico en Seguridad y Salud en el Trabajo (SST) o en alguna de sus áreas, con licencia vigente en Seguridad y Salud en el Trabajo, que acredite mínimo un (1) año de experiencia certificada por las empresas o entidades en las que laboró en el desarrollo de actividades de Seguridad y Salud en el Trabajo y que acredite la aprobación del curso de capacitación virtual de cincuenta (50) horas.Esta actividad también podrá ser desarrollada por tecnólogos, profesionales y profesionales con posgrado en SST, que cuenten con licencia vigente en Seguridad y Salud en el Trabajo y el referido curso de capacitación virtual de cincuenta (50) horas.',
    estandar: 'recursos',
    item: 'Asignación de persona que diseña el Sistema de Gestión de SST',
    modo: 'Solicitar documento soporte de la asignación y constatar la hoja de vida con soportes, de la persona asignada.',
    orden: 1,
    planAccion:
      'Conformar y garantizar el funcionamiento del Comité Paritario de Seguridad y Salud en el Trabajo – COPASST.',
    ponderacion: 0.5,
    respuesta: '',
  },
  {
    ciclo: 'Hacer',
    criterios:
      'Empresas de diez (10) o menos trabajadores clasificadas en riesgo I, II, III Asignar una persona que cumpla con el siguiente perfil:El diseño del Sistema de Gestión de Seguridad y Salud en el Trabajo, para empresas de menos de diez (10) trabajadores en clase de riesgo I, II, III puede ser realizado por un técnico en Seguridad y Salud en el Trabajo (SST) o en alguna de sus áreas, con licencia vigente en Seguridad y Salud en el Trabajo, que acredite mínimo un (1) año de experiencia certificada por las empresas o entidades en las que laboró en el desarrollo de actividades de Seguridad y Salud en el Trabajo y que acredite la aprobación del curso de capacitación virtual de cincuenta (50) horas.Esta actividad también podrá ser desarrollada por tecnólogos, profesionales y profesionales con posgrado en SST, que cuenten con licencia vigente en Seguridad y Salud en el Trabajo y el referido curso de capacitación virtual de cincuenta (50) horas.',
    estandar: 'integral',
    item: 'Asignación de persona que diseña el Sistema de Gestión de SST',
    modo: 'Solicitar documento soporte de la asignación y constatar la hoja de vida con soportes, de la persona asignada.',
    orden: 1,
    planAccion:
      'Disponer de mecanismos eficaces para recibir y responder las comunicaciones internas y externas relativas a la Seguridad y Salud en el Trabajo, como por ejemplo auto reporte de condiciones de trabajo y de salud por parte de los trabajadores o contratistas.',
    ponderacion: 0.5,
    respuesta: '',
  },
];
