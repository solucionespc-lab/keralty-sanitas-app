import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';
import { logger } from 'firebase-functions';

import { USUARIOS } from '../constantes/ConstGenerales';
import { ResolverArgs } from '../../backend-def';

export const traerUsuarios = async () => {
  const db = admin.firestore();
  const usuariosRef = db.collection(USUARIOS);
  const usuariosSnapshot = await usuariosRef.get();

  const usuarios = usuariosSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return usuarios;
};

export const traerUsuario: ResolverArgs<
  { id: string },
  Partial<UserRecord>
> = async (_, params) => {
  const { id } = params;

  try {
    // Consultar usuario en auth
    const usuario = await admin.auth().getUser(id);
    return {
      ...usuario,
      nombre: usuario.displayName,
    };
  } catch (error) {
    logger.error(error);
    throw new Error(`El usuario con el id ${id} no existe`);
  }
};
