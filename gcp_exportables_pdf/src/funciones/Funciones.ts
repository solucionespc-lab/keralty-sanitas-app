import { LST_DIAS, LST_MESES } from '../constantes/Generales';
import { FechaColombianaFunc, GetLocalDateFunc } from '../types/RecursosType';

export const getLocalDate: GetLocalDateFunc = (opciones) => {
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

  const fechaHora = fechaLetra.split(', ');
  const fecha = fechaHora[0].split('/').reverse().join('-');
  const hora = fechaHora[1];

  const date = new Date(`${fecha}T${hora}`);
  const year = date.getFullYear();
  const month = Number(
    date.getMonth() + 1 > 12 ? date.getMonth() : date.getMonth() + 1
  );
  const mes = LST_MESES[date.getMonth()];
  const weekDay = LST_DIAS[date.getDay()];
  const day = date.getDate();

  return { fecha, hora, year, mes, day, weekDay, date, month };
};

export const fechaColombiana: FechaColombianaFunc = (fecha) => {
  const fechaString = fecha ?? '';
  return fechaString.split('-').reverse().join('/');
};
