import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend-def';
import { COL_EMPRESAS, USUARIOS } from '../constantes/ConstGenerales';

type inputType = {
  CuentaInput: {
    nombreEmpresa: string;
    correo: string;
    uid: string;
    nit: string;
    nombreUsuario: string;
  };
};

// Esta implementación es temporal mientras se establece el mejor método para autenticar los usuarios de las empresas
export const actualizarUsuario: ResolverArgs<inputType, string> = async (
  _,
  { CuentaInput }
) => {
  const usuarioRef = admin.firestore().collection(USUARIOS);
  const empresaRef = admin.firestore().collection(COL_EMPRESAS);

  try {
    // Primero verificamos con el nit, si la empresa existe, sino devolvemos error
    const buscarEmpresa = await empresaRef
      .where('nit', '==', CuentaInput.nit)
      .where('activo', '==', true)
      .get();

    if (buscarEmpresa.empty) {
      logger.error(
        `La empresa con el nit ${CuentaInput.nit} no esta habilitada`
      );
      throw new Error('La empresa no existe');
    }

    // Si la empresa existe, agregamos el usuario al array de responsables
    const idEmpresa = buscarEmpresa.docs[0].id;

    const responsablesArray = buscarEmpresa.docs[0].data().responsables;

    await empresaRef.doc(idEmpresa).update({
      responsables: [
        ...responsablesArray,
        {
          cargo: '',
          correo: CuentaInput.correo,
          nombre: CuentaInput.nombreUsuario,
          telefono: '',
          usuarioActivo: true,
        },
      ],
    });

    // Creamos el usuario según la empresa que creó
    const usuario = await admin.auth().updateUser(CuentaInput.uid, {
      displayName: CuentaInput.nombreUsuario,
      emailVerified: true,
    });

    const customClaims = {
      idEmpresa: idEmpresa,
      firma: 'yr5fS3jQTA94',
      grupo: 'propietario',
      organizacion: 'Keralty',
      permisos: '',
      rol: 'administrador',
    };

    admin.auth().setCustomUserClaims(usuario.uid, customClaims);

    await usuarioRef.doc(CuentaInput.uid).set(
      {
        nombre: CuentaInput.nombreUsuario,
        firma: 'yr5fS3jQTA94',
        grupo: 'propietario',
        organizacion: 'Keralty',
        permisos: '',
        rol: 'administrador',
      },
      { merge: true }
    );
    logger.info('Se actualizaron correctamente los datos de la empresa');
    return 'Se actualizaron correctamente los datos de la empresa';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error y no se actualizó el usuario';
  }
};
