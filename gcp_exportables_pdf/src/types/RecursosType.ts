interface GetLocalDateOuput {
  fecha: string;
  hora: string;
  year: number;
  mes: string;
  day: number;
  weekDay: string;
  date: Date;
  month: number;
}

/** Función para obtener informacion de fecha y parametro de JavaScript en formato local colombiano.
 * @param {Intl.DateTimeFormatOptions=} opciones Opcional, opciones de configuracion adicionales para la fecha local
 * @returns {{GetLocalDateOuput}} Parametro de fecha local colombiana
 * 	- fecha: Fecha en string, en el formato 'yyyy-mm-dd';
 * 	- hora: Hora en string, en el formato 'hh:mm:ss';
 * 	- year: Año en numero;
 * 	- mes: Nombre del mes actual;
 * 	- day: Número del día del mes;
 * 	- weekDay: Nombre del día de la semana;
 * 	- date: Fecha actual en formato Date de JavaScript;
 */
export type GetLocalDateFunc = (
  opciones?: Intl.DateTimeFormatOptions
) => GetLocalDateOuput;
/**
 * @param fecha Fecha en string, en el formato 'yyyy-mm-dd'
 * @returns Fecha en string, en el formato 'dd/mm/yyyy;
 */
export type FechaColombianaFunc = (fecha: string) => string;

export interface Evidencias {
  name: string;
  url: string;
}

export const dbDataType = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});
