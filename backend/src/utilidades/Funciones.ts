/* eslint-disable @typescript-eslint/no-explicit-any */
import { lstDias, lstMeses } from '../recursos/listas.json';

import type { IrangoTemporalGenero } from '../modulos/trabajadores/types/TrabajadorTypes';

export const sinEspacioMinusculas = (str: string) => {
  const sinAcento = str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace('.', '')
    .replace('.', '')
    .replace('.', '');
  return sinAcento.replace(/ /g, '_').toLowerCase();
};

const equivalenciaEdad: { [key: string]: string } = {
  '1 a 5': 'b',
  '6 a 10': 'c',
  '11 a 15': 'd',
  '16 a 20': 'e',
  '18 a 25': 'b',
  '26 a 35': 'c',
  '36 a 45': 'd',
  '46 a 55': 'e',
};

export const categoriaRangos = (
  limiteInferior: number,
  limiteSuperior: number,
  valor: number,
  rango: number,
  desplazamiento = 0
) => {
  if (valor === undefined || valor < 0) return 'z';
  if (valor < limiteInferior) return 'a';
  if (valor >= limiteSuperior) return 'f';

  const div = Math.ceil((valor - desplazamiento) / rango);
  const rangoI =
    (div - 1) * rango < limiteInferior
      ? limiteInferior
      : (div - 1) * rango + desplazamiento + 1;
  return equivalenciaEdad[`${rangoI} a ${desplazamiento + div * rango}`];
};

export const cuentaGenero = (objeto: any, genero: string, rango: string) => {
  const generoAux = genero ? genero.toLowerCase() : 'z';
  const objetoAux = objeto;
  let auxiliar = objeto[generoAux][rango];
  objetoAux[generoAux][rango] = auxiliar ? (auxiliar += 1) : 1;
  return objetoAux;
};

/**

Cuenta y acumula las propiedades por género en un objeto actual y lo suma al acumulador.
@param {Object} acumulador - Objeto acumulador.
@param {Object} actual - Objeto actual con las propiedades por género a acumular.
@return {Object} - Objeto acumulador actualizado con las propiedades por género sumadas.
*/
export const cuentaGeneroSumado = <T extends keyof IrangoTemporalGenero>(
  acumulador: IrangoTemporalGenero,
  actual: IrangoTemporalGenero
): IrangoTemporalGenero => {
  const result: IrangoTemporalGenero = { ...acumulador };

  Object.keys(actual).forEach((genero) => {
    const generoKey = genero as T;
    if (!result[generoKey]) {
      result[generoKey] = {};
    }

    Object.keys(actual[generoKey]).forEach((prop) => {
      const value = actual[generoKey][prop];
      if (!result[generoKey][prop]) {
        (result[generoKey as keyof IrangoTemporalGenero][prop] as number) = 0;
      }
      (result[generoKey as keyof IrangoTemporalGenero][prop] as number) +=
        value;
    });
  });

  return result;
};

/**

Suma las propiedades de dos objetos y devuelve un objeto con las propiedades sumadas.
@param {Object} acumulado - El objeto acumulado al que se le van a sumar las propiedades.
@param {Object} actual - El objeto actual que contiene las propiedades a sumar.
@return {Object} - El objeto resultado de la suma de las propiedades de los objetos acumulado y actual.
*/
export const sumarPropiedades = (
  acumulado: {
    [key: string]: number;
  },
  actual: {
    [key: string]: number;
  }
) => {
  // Se crea un nuevo objeto que contiene las propiedades del objeto acumulado.
  const resultado = { ...acumulado };
  // Se recorren las claves (propiedades) del objeto actual.
  Object.keys(actual).forEach((key) => {
    // Si la propiedad actual no existe en el objeto resultado, se crea con valor 0, si existe se suma.
    resultado[key] = (resultado[key] || 0) + actual[key];
  });
  // Se devuelve el objeto resultado.
  return resultado;
};

export const calcularYear = (fechaI: string) => {
  if (!fechaI) return 0;
  const fechaF = new Date().toISOString().slice(0, 10);
  const yearAux = Number(fechaF.slice(0, 4)) - Number(fechaI.slice(0, 4));
  if (fechaF.slice(5) < fechaI.slice(5)) return yearAux - 1;
  return yearAux;
};

export const arrayAStringConY = (array: string[]): string => {
  let result = '';

  if (array.length === 1) {
    result = array[0];
  } else if (array.length > 1) {
    result = array.slice(0, -1).join(', ') + ' y ' + array[array.length - 1];
  }

  return result;
};

export const getLocalDate = (opciones?: Intl.DateTimeFormatOptions) => {
  const options: Intl.DateTimeFormatOptions = {
    ...opciones,
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const fechaLetra = new Date().toLocaleDateString('es-CO', options);

  const fechaHora = fechaLetra.replace(',', '').split(' ');
  const fecha = fechaHora[0].split('/').reverse().join('-');
  const hora = fechaHora[1];

  const date = new Date(`${fecha}T${hora}`);
  const year = date.getFullYear();
  const mes = lstMeses[date.getMonth()];
  const mesAnterior =
    date.getMonth() === 0 ? lstMeses[11] : lstMeses[date.getMonth() - 1];
  const mesSiguiente =
    date.getMonth() === 11 ? lstMeses[0] : lstMeses[date.getMonth() + 1];
  const mesNumero = date.getMonth() + 1;
  const weekDay = lstDias[date.getDay()];
  const mesIndex = date.getMonth();
  const day = date.getDate();

  return {
    fecha,
    fechaLetra,
    hora,
    year,
    mes,
    mesAnterior,
    mesSiguiente,
    mesNumero,
    mesIndex,
    day,
    weekDay,
    date,
  };
};

export const sumarRestarFecha = (
  fecha: string,
  years: number,
  months: number,
  days: number
) => {
  const fechaObj = new Date(fecha);

  // Sumar años y lstMeses
  fechaObj.setFullYear(fechaObj.getFullYear() + years);
  fechaObj.setMonth(fechaObj.getMonth() + months);

  // Sumar días
  fechaObj.setDate(fechaObj.getDate() + days);

  // Formatear la fecha resultante
  const suma = fechaObj.toISOString().slice(0, 10);

  // Restar años y lstMeses
  fechaObj.setFullYear(fechaObj.getFullYear() - 2 * years);
  fechaObj.setMonth(fechaObj.getMonth() - 2 * months);

  // Restar días
  fechaObj.setDate(fechaObj.getDate() - 2 * days);

  // Formatear la fecha resultante
  const resta = fechaObj.toISOString().slice(0, 10);

  return { suma, resta };
};

export const firestoreDataType = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});
