import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import * as functions from 'firebase-functions';

/**
 * Valida el contexto de una petición Express.
 *
 * @async
 * @function contextValidation
 * @param {Object} arg - Objeto con la petición Express.
 * @param {Request} arg.req - La petición Express.
 * @return {Promise<Partial<DecodedIdToken>>} Una promesa que resuelve con un token decodificado parcialmente.
 * @throws {Error} Si ocurre un error al verificar el token.
 */

export const contextValidation = async ({
  req,
}: ExpressContextFunctionArgument): Promise<Partial<DecodedIdToken>> => {
  const token = req.headers.authorization?.split(' ')[1] ?? '';
  let tokenVerificado: Partial<DecodedIdToken> = { uid: '' };

  try {
    if (process.env.NODE_ENV === 'production') {
      tokenVerificado = await admin.auth().verifyIdToken(token);
    }
  } catch (error) {
    functions.logger.error(error);
  }

  return tokenVerificado;
};
