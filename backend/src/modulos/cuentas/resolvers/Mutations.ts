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
    const empresa = await empresaRef.add({
      nombre: CuentaInput.nombreEmpresa,
      nit: CuentaInput.nit,
      tipoEmpresa: 'empresa',
      riesgo: 'I',
      tamano: 'pequena',
      activo: true,
      responsables: {
        cargo: '',
        correo: CuentaInput.correo,
        nombre: CuentaInput.nombreUsuario,
        telefono: '',
        usuarioActivo: true,
      },
    });

    // Creamos el usuario según la empresa que creó
    const usuario = await admin.auth().updateUser(CuentaInput.uid, {
      displayName: CuentaInput.nombreUsuario,
      emailVerified: true,
    });

    const customClaims = {
      idEmpresa: empresa.id,
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

    return 'Se actualizaron correctamente los datos de la empresa';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error y no se actualizó el usuario';
  }
};
