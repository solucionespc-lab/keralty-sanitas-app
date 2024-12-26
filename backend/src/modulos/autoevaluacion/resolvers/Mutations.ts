import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend-def';
import {
  dbDataType,
  handleCustomError,
  resolvePromiseAndErrors,
} from '../../../utilidades/FuncionesGenerales';
import { EmpresaType } from '../../empresas/types/EmpresasTypes';
import { REF_EMPRESAS, REF_EVALUACIONES } from '../constantes/ConstAuditorias';
import { registrarPlanes } from '../utilidades/Funciones';

import type {
  EvaluacionDocArgs,
  EvaluacionesType,
} from '../types/EvaluacionesTypes';

export const guardarEvaluacion: ResolverArgs<
  EvaluacionDocArgs,
  string
> = async (_, { evaluacion }) => {
  const { id, empresa, planes, ...evaluacionRest } = evaluacion;
  const db = admin.firestore();

  const evaluacionRef = db
    .collection(REF_EMPRESAS)
    .doc(evaluacion.idEmpresa)
    .collection(REF_EVALUACIONES)
    .doc()
    .withConverter(dbDataType<EvaluacionesType>());

  const empresaRef = db
    .collection(REF_EMPRESAS)
    .doc(evaluacion.idEmpresa)
    .withConverter(dbDataType<EmpresaType>());

  const planesBatch = registrarPlanes(planes, evaluacionRest.idEmpresa);

  const [error] = await resolvePromiseAndErrors(
    empresaRef.set(empresa, { merge: true })
  );

  const [planError] = await resolvePromiseAndErrors(
    Promise.all([
      evaluacionRef.set(evaluacionRest, { merge: true }),
      planesBatch.commit(),
    ])
  );

  if (error || planError) handleCustomError(error ?? planError);

  return `Se guardó correctamente la evaluación ${id}`;
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

    // TODO Implementar la funcionalidad para guardar las evaluaciones de manera parcial incluido los planes de acción que hayan cambiado
    return 'Se guardó correctamente la evaluación';
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudo consultar la evaluación solicitada');
  }
};
