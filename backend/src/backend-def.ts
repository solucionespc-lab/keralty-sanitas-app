import { DecodedIdToken } from 'firebase-admin/auth';
import { GraphQLResolveInfo } from 'graphql';

/**
 * Tipo de resolución para las funciones de GraphQL.
 *
 * @template A El tipo de argumentos que la función de resolución acepta.
 *
 * @param {unknown} parent - El objeto padre en la resolución de GraphQL, cuyo tipo es desconocido.
 * @param {A} Argumentos - Agrega el tipado de los argumentos de las Queries y Mutations de la función asíncrona
 * @param {R} Respuesta - Agregar el tipado del valor de retorno de las Queries y Mutations de la función asíncrona
 * @param {IContext} Contexto - Datos del Contexto creado por GraphQl y las especificaciones del Token de Firebase Auth
 * @param {GraphQLResolveInfo} Información - La información de la resolución de los eventos de GraphQL, sean Queries, Mutations o Subscriptions.
 *
 * @returns {Promise<R>} Una promesa que devuelve el tipo de datos implementado del resolver.
 */

export interface IContext {
  token: Partial<DecodedIdToken>;
  context: string;
}

export type FiltrosQuery = Record<
  string,
  [string, FirebaseFirestore.WhereFilterOp, string | number | boolean]
>;

export type ResolverArgs<A, R> = (
  parent: unknown,
  args: A,
  context: IContext,
  info: GraphQLResolveInfo
) => Promise<R | void>;
