import * as admin from 'firebase-admin';

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
  const { id, planes, ...evaluacionRest } = evaluacion;
  const db = admin.firestore();

  const evaluacionRef = db
    .collection(REF_EMPRESAS)
    .doc(evaluacion.idEmpresa)
    .collection(REF_EVALUACIONES)
    .doc(id)
    .withConverter(dbDataType<EvaluacionesType>());

  const planesBatch = registrarPlanes(planes, evaluacionRest.idEmpresa);

  const [error] = await resolvePromiseAndErrors(
    Promise.all([
      evaluacionRef.set(evaluacionRest, { merge: true }),
      planesBatch.commit(),
    ])
  );

  if (error) handleCustomError(error);

  return 'Se guardó actualizó correctamente la evaluación';
};
