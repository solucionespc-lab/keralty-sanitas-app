import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend-def';
import { dbDataType } from '../../../utilidades/FuncionesGenerales';
import { REF_EMPRESAS, REF_EVALUACIONES } from '../constantes/ConstAuditorias';

import type {
  EvaluacionDocArgs,
  EvaluacionesType,
} from '../types/EvaluacionesTypes';

export const guardarEvaluacion: ResolverArgs<
  EvaluacionDocArgs,
  string
> = async (_, { evaluacion }) => {
  const db = admin.firestore();

  const evaluacionRef = db
    .collection(REF_EMPRESAS)
    .doc(evaluacion.idEmpresa)
    .collection(REF_EVALUACIONES)
    .doc()
    .withConverter(dbDataType<EvaluacionesType>());

  try {
    await evaluacionRef.set(evaluacion, { merge: true });

    // TODO Implementar la validación y registro de los planes de acción asignados
    return 'Se guardó correctamente la evaluación';
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudo consultar la evaluación solicitada');
  }
};

export const actualizarEvaluacion: ResolverArgs<
  EvaluacionDocArgs,
  string
> = async (_, { evaluacion }) => {
  const db = admin.firestore();

  const evaluacionRef = db
    .collection(REF_EMPRESAS)
    .doc(evaluacion.idEmpresa)
    .collection(REF_EVALUACIONES)
    .doc(evaluacion.id)
    .withConverter(dbDataType<EvaluacionesType>());

  try {
    await evaluacionRef.set(evaluacion, { merge: true });

    // TODO Implementar la validación y registro de los planes de acción asignados
    return 'Se guardó correctamente la evaluación';
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudo consultar la evaluación solicitada');
  }
};