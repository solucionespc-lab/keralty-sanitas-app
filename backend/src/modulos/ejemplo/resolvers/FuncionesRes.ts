import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend-def';
import { IEjemplo } from '../types/EjemploTypes';
import * as admin from 'firebase-admin';
import { COL_EJEMPLO } from '../constantes/ConstEjemplo';
import { dbDataType } from '../../../utilidades/FuncionesGenerales';

export const ejemploResolver: ResolverArgs<IEjemplo, string> = async (
  _,
  { id }
) => {
  const collectionRef = admin
    .firestore()
    .collection(COL_EJEMPLO)
    .withConverter(dbDataType<IEjemplo>());

  collectionRef.doc().set({ id });

  return id;
};

export const ejemploQuery: ResolverArgs<never, IEjemplo[]> = async (_) => {
  const collectionRef = admin
    .firestore()
    .collection(COL_EJEMPLO)
    .withConverter(dbDataType<IEjemplo>());

  try {
    const queryData = await collectionRef.get();

    return queryData.docs.map((doc) => ({
      id: doc.data().id,
    }));
  } catch (err) {
    logger.error(err);
  }

  return [
    {
      id: '',
    },
  ];
};
