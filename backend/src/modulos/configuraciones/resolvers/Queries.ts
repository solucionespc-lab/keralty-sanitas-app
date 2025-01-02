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
    process.env.REALTIME_DATABASE_URL_CONFIG ?? ''
  );
  const dbListasRef = admin.database().ref('/listas');
  const dbConfig = configDb.ref('/iam');

  // TODO: Se debe implementar la configuracion para traer los datos de la empresa que se acaba de autenticar para que los datos siempre estén disponibles para toda la aplicación
  // TODO: Implementar la funcionalidad para los administradores poder consultar cualquier empresa que necesiten
  // TODO: Implementar adicionalmente para la configuración de cada empresa, aquellas que tenga la estructura de grupo organizacional, se podría consultar todas la empresa que pertenezcan a ese   código del grupo organizacional

  try {
    const configuraciones = await Promise.all([
      dbConfig.get(),
      dbListasRef.get(),
    ]);

    return {
      version: configuraciones[0].val().version,
      acciones: configuraciones[0].val().acciones,
      modulos: Object.values(configuraciones[0].val().modulos),
      sidebar_modulos: Object.values(configuraciones[0].val().sidebar_modulos),
      listas: JSON.stringify(configuraciones[1]),
    };
  } catch (err) {
    logger.error(err);
    return {
      version: '',
      acciones: {
        aplicacion: ['bloqueado'],
        infraestructura: ['bloqueado'],
      },
      sidedbar_modulos: [
        {
          titulo: 'bloqueado',
          url: '/',
        },
      ],
      modulos: [
        {
          descripcion: 'bloqueado',
          titulo: 'bloqueado',
          url: '/',
          subGrupo: 'bloqueado',
          responsable: 'bloqueado',
          imagen: 'bloqueado',
          estaActivo: true,
          llaveModulo: 'bloqueado',
        },
      ],
      listas: '{}',
    };
  }
};
