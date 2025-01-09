import * as admin from 'firebase-admin';

import { FiltrosQuery, ResolverArgs } from '../../../backend-def';
import {
  aplicarFiltros,
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
  InformesArgs,
  InformeType,
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

export const traerInforme: ResolverArgs<InformesArgs, InformeType[]> = async (
  _,
  { annio, idEmpresa }
) => {
  const db = admin.firestore();
  const informesRef = db
    .collection('col_empresas')
    .doc(idEmpresa)
    .collection('col_resultados')
    .where('annio', '==', annio)
    .withConverter(dbDataType<InformeType>());

  console.log(annio);

  const consultas: FiltrosQuery = {
    idEmpresa: ['idEmpresa', '==', idEmpresa],
    annio: ['annio', '>=', annio],
  };

  const informe = aplicarFiltros<
    InformeType,
    { annio: number; idEmpresa: string }
  >(informesRef, { annio, idEmpresa }, consultas);

  const [error, informes] = await resolvePromiseAndErrors(informe.get());

  if (error) handleCustomError(error);

  return informes?.docs.map((doc) => ({
    ...doc.data(),
    idPregunta: doc.id,
  }));
};
