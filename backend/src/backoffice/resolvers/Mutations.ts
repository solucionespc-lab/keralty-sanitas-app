import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../backend-def';
import { USUARIOS } from '../constantes/ConstGenerales';
import { generarHash } from '../utilidades/FuncGenerales';

import type { UserInput } from '../types/UsuarioTypes';

export const guardarUsuario: ResolverArgs<UserInput, string> = async (
  _,
  { input }
) => {
  const usuarioRef = admin.firestore().collection(USUARIOS);
  const password = generarHash();

  console.log(password);

  const { customClaims, ...user } = input;

  try {
    const usuario = await admin.auth().createUser({
      displayName: input.nombre,
      email: input.email,
      emailVerified: input.emailVerified,
      password,
    });

    admin.auth().setCustomUserClaims(usuario.uid, customClaims);
    await usuarioRef
      .doc(usuario.uid)
      .set(
        { ...user, ...customClaims, fechaCreacion: new Date(), activo: true },
        { merge: true }
      );

    // await axios.post(process?.env?.BIENVENIDA_CORREO_URL ?? '', {
    //   usuario: {
    //     app: 'BIO D',
    //     usuario: input.nombre,
    //     correo: input.email,
    //     contrasena: password,
    //     enlace: APP_BIOD_URL,
    //     logo: LOGO_BIOD,
    //   },
    // });

    return 'Se creó correctamente el usuario';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error y no se guardó el usuario';
  }
};

export const actualizarUsuario: ResolverArgs<UserInput, string> = async (
  _,
  { input }
) => {
  const usuarioRef = admin.firestore().collection(USUARIOS);

  const { customClaims } = input;

  try {
    const usuario = await admin.auth().updateUser(input.uid, {
      displayName: input.nombre,
      email: input.email,
      emailVerified: input.emailVerified,
    });

    admin.auth().setCustomUserClaims(usuario.uid, customClaims);
    await usuarioRef.doc(input.uid).set(
      {
        nombre: input.nombre,
        firma: input.customClaims.firma,
        grupo: input.customClaims.grupo,
        organizacion: input.customClaims.organizacion,
        permisos: input.customClaims.permisos,
        rol: input.customClaims.rol,
      },
      { merge: true }
    );

    return 'Se actualizó correctamente el usuario';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error y no se actualizó el usuario';
  }
};
