/* eslint-disable valid-jsdoc */
import { logger } from 'firebase-functions';

import { FiltrosQuery } from '../backend-def';
import ERROR_LIST from '../recursos/Errores.json';

export const dbDataType = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

// eslint-disable-next-line valid-jsdoc
/**
 * Aplica filtros a una consulta o grupo de colecciones de Firebase Firestore.
 *
 * @param ref La referencia de la consulta o del grupo de colecciones de Firestore a la que se aplicarán los filtros.
 * @param filtros Un objeto que contiene los filtros a aplicar. Solo se tendrán en cuenta aquellos filtros
 * cuyos valores no sean cadenas vacías (`''`).
 * @param parametrosConsulta Un objeto que define cómo aplicar los filtros. Cada entrada debe incluir:
 * - `campo`: El nombre del campo en los documentos.
 * - `operador`: Un operador de comparación válido en Firestore.
 * - `valor`: El valor contra el cual se comparará.
 *
 * @returns La referencia de consulta actualizada con los filtros aplicados.
 */
export const aplicarFiltros = <T, F extends object>(
  ref: FirebaseFirestore.Query<T> | FirebaseFirestore.CollectionGroup<T>,
  filtros: F,
  parametrosConsulta: FiltrosQuery
): FirebaseFirestore.Query<T> | FirebaseFirestore.CollectionGroup<T> => {
  const parametrosDeFiltrado = Object.entries(filtros)
    .filter((filtro) => filtro[1] !== '')
    .map((filtro) => filtro[0]);

  parametrosDeFiltrado
    .filter((filtro) => filtro !== '')
    .forEach((parametro) => {
      const [campo, operador, valor] =
        parametrosConsulta[parametro as keyof typeof parametrosConsulta];

      ref = ref.where(campo, operador, valor);
    });

  return ref;
};

// eslint-disable-next-line valid-jsdoc
/**
 * Resuelve una promesa y devuelve un error personalizado o el original si no coincide.
 *
 * @template T - Tipo de valor resuelto de la promesa.
 * @param {Promise<T>} promise - La promesa a resolver.
 * @returns {Promise<[CustomErrorType | Error | undefined, T | undefined]>} Una tupla
 *   - Primer elemento es un error personalizado o el error original
 *   - Segundo elemento es el valor resuelto si no hubo error.
 * @example
 * async function example() {
 *   const [error, data] = await resolvePromiseAndErrors(fetchData(), "Ocurrió un error inesperado.");
 *   if (error) {
 *     console.error("Error:", error);
 *   } else {
 *     console.log("Datos:", data);
 *   }
 * }
 */
export async function resolvePromiseAndErrors<T>(
  promise: Promise<T>
): Promise<[Error | undefined, T | undefined]> {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error: Error) => {
      console.log(error);
      logger?.error(error);
      return [error, undefined];
    });
}

export const handleCustomError = (error: Error | undefined) => {
  for (const errorItem of ERROR_LIST) {
    if (error?.message === errorItem.name) {
      logger?.error(errorItem);
      throw new Error(errorItem.message);
    }
  }

  console.log(error);
  logger?.error(error);

  throw new Error(error?.message);
};
