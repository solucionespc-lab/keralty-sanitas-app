export const REF_TRABAJADORES = 'col_trabajadores';
export const REF_HISTORIAL_OCUPACIONAL = 'col_historial_trabajadores_biod';
export const REF_INFORME_OCUPACIONAL = 'col_informe_ocupacional_biod';
export const REF_INFORME_SOCIODEMOGRAFICO = 'col_informe_sociodemografico_biod';
export const REDIS_URL = process.env.REDIS_URL ?? '';
export const EQUIVALENCIAS_GERENCIAS = [
  { id: 'cadena_de_abastecimiento', value: 'Cadena de abastecimiento' },
  { id: 'nuevos_negocios', value: 'Nuevos negocios' },
  { id: 'mercadeo', value: 'Mercadeo' },
  { id: 'mantenimiento', value: 'Mantenimiento' },
  { id: 'produccion_sostenible', value: 'Producción sostenible' },
  { id: 'cultura_organizacional', value: 'Cultura organizacional' },
  { id: 'gerente_general', value: 'Gerente general' },
  {
    id: 'implementacion_de_nuevos_negocios',
    value: 'Implementación de nuevos negocios',
  },
  { id: 'financiero', value: 'Financiero' },
];
