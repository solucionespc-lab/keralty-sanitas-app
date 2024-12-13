import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend-def';
import { dbDataType } from '../../../utilidades/FuncionesGenerales';
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

  try {
    const evaluacion = await evaluacionRef.get();

    return { ...evaluacion.data(), id: evaluacion.id };
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudo consultar la evaluación solicitada');
  }
};

export const traerEvaluaciones: ResolverArgs<
  EvaParametros,
  EvaluacionesType[]
> = async (_, { filtros }) => {
  // const { idEmpresa, annio } = filtros;
  const db = admin.firestore();

  const evaluacionesRef = db
    .collectionGroup(REF_EVALUACIONES)
    .withConverter(dbDataType<EvaluacionesType>());

  console.log(filtros);

  // const consultas: FiltrosQuery = {
  //   idEmpresa: ['idEmpresa', '==', idEmpresa],
  //   annio: ['annio', '==', annio],
  // };

  try {
    // const evaConsulta = aplicarFiltros<EvaluacionesType, FiltrosEvaluaciones>(
    //   evaluacionesRef,
    //   filtros,
    //   consultas
    // );

    const evaluaciones = await evaluacionesRef.get();

    return evaluaciones.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudieron consultar las evaluaciones solicitadas');
  }
};

export const traerDatosEmpresa = async (empresa: EvaluacionesType) => {
  const db = admin.firestore();

  const empresaRef = db
    .collection(REF_EMPRESAS)
    .doc(empresa?.idEmpresa)
    .withConverter(dbDataType<EmpresaType>());

  try {
    const empresa = await empresaRef.get();

    return { ...empresa.data(), id: empresa.id };
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudo consultar la empresa solicitada');
  }
};
