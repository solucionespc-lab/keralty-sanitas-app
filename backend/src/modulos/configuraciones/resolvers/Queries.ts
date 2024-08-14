import * as admin from 'firebase-admin';
import { getDatabaseWithUrl } from 'firebase-admin/database';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend-def';

import type { IIAM, ConfiguracionesType } from '../types/ConfiguracionesTypes';

export const traerConfiguraciones: ResolverArgs<
  IIAM,
  ConfiguracionesType
> = async () => {
  const configDb = getDatabaseWithUrl(
    'http://127.0.0.1:9000/?ns=configuracion-app'
  );
  const dbListasRef = admin.database().ref('/listas');
  const dbConfig = configDb.ref('/iam');

  try {
    const configuraciones = await Promise.all([
      dbConfig.get(),
      dbListasRef.get(),
    ]);

    return {
      version: configuraciones[0].val().version,
      acciones: configuraciones[0].val().acciones,
      modulos: Object.values(configuraciones[0].val().modulos),
      listas: JSON.stringify(configuraciones[1]),
    };
  } catch (err) {
    logger.error(err);
  }

  return {
    version: '',
    acciones: {
      aplicacion: ['bloqueado'],
      infraestructura: ['bloqueado'],
    },
    modulos: [
      {
        descripcion: 'bloqueado',
        titulo: 'bloqueado',
        url: '/',
        subGrupo: 'bloqueado',
        responsable: 'bloqueado',
        imagen: 'bloqueado',
        estaActivo: false,
        llaveModulo: 'bloqueado',
      },
    ],
    listas: '{}',
  };
};
