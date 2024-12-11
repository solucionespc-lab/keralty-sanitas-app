// import { auditoriaCompleta } from '../store/AutoevaluacionStore';

import type {
  EvaluacionesType,
  PreguntaEvaluacionType,
} from '../types/AutoevaluacionTypes';

/**
 *
 * @param fechas Es un objeto con las fechas a comparar
 * @returns Devuelve la fecha más lejana del objeto de fechas diligenciadas
 */
export const establecerFechaMinEjecucion = (fechas: {
  fechaCompromiso: string;
  fechaPrimerPlazo: string;
  fechaSegundoPlazo: string;
  fechaTercerPlazo: string;
}) => {
  const fechasRegistradas = Object.values(fechas)
    .filter((fecha) => fecha !== '')
    .sort((a, b) => {
      const fechaA = new Date(a);
      const fechaB = new Date(b);

      if (fechaA > fechaB) {
        return 1;
      } else if (fechaA < fechaB) {
        return -1;
      } else {
        return 0;
      }
    });

  return fechasRegistradas[fechasRegistradas.length - 1];
};

/**
 *
 * @param numero Es el número de NIT diligenciado por el usuario
 * @returns Devuelve en formato ###-## el número de NIT de la empresa
 */
export const convNit = (numero: string) => {
  const cadena = numero?.toString().length;
  const cortarCadena = numero?.toString()?.substring(0, cadena - 1);
  const separarMiles = new Intl.NumberFormat('es-MX')
    .format(Number(cortarCadena))
    .replaceAll(',', '.');

  return cortarCadena
    ? `${separarMiles}-${numero.toString()[cadena - 1]}`
    : numero;
};

export const deshabilitarFecha = (fecha: string | undefined) => {
  if (fecha === undefined) {
    return true;
  }

  if (fecha === '') {
    return true;
  }

  return false;
};

/**
 *
 * @param datosQuery Arreglo de datos provenientes de la Query realizada al servidor
 * @returns Devuelve un arreglo de objetos con los campos correspondientes a la respuesta del servidor
 */
export const validarDatosTabla = (datosQuery: EvaluacionesType[]) => {
  return datosQuery?.map((dato) => ({
    id: dato.id,
    fecha: dato.fechaCreacion,
    idEmpresa: dato.idEmpresa,
    empresa: dato.empresa.nombre,
    puntaje: dato.puntajeTotal,
    calificacion: dato.calificacion,
  }));
};

export const resultadoAuditoria = (resultado: number): string => {
  if (resultado <= 53.5) {
    return 'Critico';
  }

  if (resultado <= 69.5) {
    return 'Moderablemente acepable';
  }

  if (resultado > 69.5) {
    return 'Aceptable';
  }

  return 'Sin_calculo';
};

export const clasificarPreguntas = (preguntas: PreguntaEvaluacionType[]) => {
  const planear = preguntas.filter((tema) => tema.ciclo === 'Planear');
  const hacer = preguntas.filter((tema) => tema.ciclo === 'Hacer');
  const verificar = preguntas.filter((tema) => tema.ciclo === 'Verificar');
  const actuar = preguntas.filter((tema) => tema.ciclo === 'Actuar');

  return {
    planear,
    hacer,
    verificar,
    actuar,
  };
};
