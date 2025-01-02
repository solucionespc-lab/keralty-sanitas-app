import * as admin from 'firebase-admin';

import { FiltrosQuery, ResolverArgs } from '../../../backend-def';
import {
  aplicarFiltros,
  dbDataType,
  handleCustomError,
  resolvePromiseAndErrors,
} from '../../../utilidades/FuncionesGenerales';
import { EMPRESA_REF, EXCELENCIA_REF } from '../constantes/ConstGenerales';

import type {
  EmpresaType,
  ExcelenciaType,
  FiltrosType,
} from '../types/ExcelenciaTypes';

export const traerEvaluacionesExcelencia: ResolverArgs<
  FiltrosType,
  ExcelenciaType[]
> = async (_, { filtros, idEmpresa }) => {
  const db = admin.firestore();
  const excelenciaRef = db
    .collection(EMPRESA_REF)
    .doc(idEmpresa)
    .collection(EXCELENCIA_REF)
    .withConverter(dbDataType<ExcelenciaType>());

  const consultas: FiltrosQuery = {
    fechaInicio: ['fechaCreacion', '>=', filtros.fechaInicio],
    fechaFin: ['fechaCreacion', '<=', filtros.fechaFin],
    annio: ['annio', '==', filtros.annio],
  };

  const documentos = aplicarFiltros<ExcelenciaType, FiltrosType['filtros']>(
    excelenciaRef,
    filtros,
    consultas
  );

  const [error, cuestionario] = await resolvePromiseAndErrors(documentos.get());

  if (error) handleCustomError(error);

  return cuestionario?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const traerDatosEmpresa = async (empresa: ExcelenciaType) => {
  const db = admin.firestore();

  const empresaRef = db
    .collection(EMPRESA_REF)
    .doc(empresa?.idEmpresa)
    .withConverter(dbDataType<EmpresaType>());

  const [error, empresaDoc] = await resolvePromiseAndErrors(empresaRef.get());

  console.log(error);
  if (error) handleCustomError(error);

  return { ...empresaDoc?.data(), id: empresaDoc?.id };
};
