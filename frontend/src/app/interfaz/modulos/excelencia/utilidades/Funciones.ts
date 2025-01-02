import type { ExcelenciaType } from '../types/ExcelenciaTypes';

/**
 *
 * @param datosQuery Arreglo de datos provenientes de la Query realizada al servidor
 * @returns Devuelve un arreglo de objetos con los campos correspondientes a la respuesta del servidor
 */
export const validarDatosTabla = (datosQuery: ExcelenciaType[]) => {
  return datosQuery?.map((dato) => ({
    id: dato.id,
    fecha: dato.fechaCreacion,
    puntaje: dato.puntajeTotal,
    calificacion: dato.calificacion,
  }));
};

export function interpretaciones(resultado: number) {
  if (resultado === 0) return 'sin_calculo';
  if (resultado <= 20) return 'blanco';
  if (resultado <= 40) return 'amarillo';
  if (resultado <= 60) return 'violeta';
  if (resultado <= 80) return 'marron';
  if (resultado <= 100) return 'negro';

  return 'Sin dilienciar';
}

/**
 * Genera un array de strings con los años desde 2022 hasta el año siguiente al actual.
 *
 * @example
 * const annios = establecerAnnios();
 * annios: ['2022', '2023', '2024'] (dependiendo del año actual)
 */
export function establecerAnnios() {
  const fechaInicial = 2022;
  const fechaFinal = new Date().getFullYear() + 1;

  // Creamos un array de con los annions
  const annios = Array.from({ length: fechaFinal - fechaInicial }, (_, i) =>
    (i + fechaInicial).toString()
  );

  return annios;
}
