import * as admin from 'firebase-admin';

import { ResolverArgs } from '../../../backend-def';
import {
  dbDataType,
  handleCustomError,
  resolvePromiseAndErrors,
} from '../../../utilidades/FuncionesGenerales';
import { EmpresaType } from '../../empresas/types/EmpresasTypes';
import { REF_EMPRESAS, REF_EVALUACIONES } from '../constantes/ConstAuditorias';

import type {
  EvaluacionesType,
  EvaluacionParametro,
  EvaParametros,
} from '../types/EvaluacionesTypes';

export const traerEvaluacion: ResolverArgs<
  EvaluacionParametro,
  Partial<EvaluacionesType>
> = async (_, { filtros }) => {
  const { idEvaluacion, idEmpresa } = filtros;
  const db = admin.firestore();

  const evaluacionRef = db
    .collection(REF_EMPRESAS)
    .doc(idEmpresa)
    .collection(REF_EVALUACIONES)
    .doc(idEvaluacion)
    .withConverter(dbDataType<EvaluacionesType>());

  const [error, evaluacion] = await resolvePromiseAndErrors(
    evaluacionRef.get()
  );

  if (error) handleCustomError(error);

  return { ...evaluacion?.data(), id: evaluacion?.id };
};

export const traerEvaluaciones: ResolverArgs<
  EvaParametros,
  EvaluacionesType[]
> = async (_, { filtros }) => {
  const db = admin.firestore();

  const evaluacionesRef = db
    .collection(REF_EMPRESAS)
    .doc(filtros.idEmpresa)
    .collection(REF_EVALUACIONES)
    .withConverter(dbDataType<EvaluacionesType>());

  const [error, evaluaciones] = await resolvePromiseAndErrors(
    evaluacionesRef.get()
  );

  if (error) handleCustomError(error);

  return evaluaciones?.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const traerDatosEmpresa = async (empresa: EvaluacionesType) => {
  const db = admin.firestore();

  const empresaRef = db
    .collection(REF_EMPRESAS)
    .doc(empresa?.idEmpresa)
    .withConverter(dbDataType<EmpresaType>());

  const [error, empresaDoc] = await resolvePromiseAndErrors(empresaRef.get());

  if (error) handleCustomError(error);

  return { ...empresaDoc?.data(), id: empresaDoc?.id };
};
