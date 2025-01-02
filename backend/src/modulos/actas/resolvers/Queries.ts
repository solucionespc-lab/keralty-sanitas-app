import * as admin from 'firebase-admin';

import { FiltrosQuery, ResolverArgs } from '../../../backend-def';
import {
  aplicarFiltros,
  dbDataType,
  handleCustomError,
  resolvePromiseAndErrors,
} from '../../../utilidades/FuncionesGenerales';
import { ACTAS_REF, EMPRESA_REF } from '../constantes/ConstGenerales';

import type { ActasType, FiltroActa, FiltrosType } from '../types/ActasTypes';

export const traerActas: ResolverArgs<FiltrosType, ActasType[]> = async (
  _,
  { filtros, idEmpresa }
) => {
  const db = admin.firestore();
  const excelenciaRef = db
    .collection(EMPRESA_REF)
    .doc(idEmpresa)
    .collection(ACTAS_REF)
    .withConverter(dbDataType<ActasType>());

  const consultas: FiltrosQuery = {
    fechaInicio: ['fechaCreacion', '>=', filtros.fechaInicio],
    fechaFin: ['fechaCreacion', '<=', filtros.fechaFin],
    annio: ['annio', '==', filtros.annio],
    estado: ['estado', '==', filtros.estado],
  };

  const documentos = aplicarFiltros<ActasType, FiltrosType['filtros']>(
    excelenciaRef,
    filtros,
    consultas
  );

  const [error, actas] = await resolvePromiseAndErrors(documentos.get());

  if (error) handleCustomError(error);

  return actas?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const traerActa: ResolverArgs<FiltroActa, ActasType> = async (
  _,
  { idActa, idEmpresa }
) => {
  const db = admin.firestore();
  const excelenciaRef = db
    .collection(EMPRESA_REF)
    .doc(idEmpresa)
    .collection(ACTAS_REF)
    .doc(idActa)
    .withConverter(dbDataType<ActasType>());

  const [error, actas] = await resolvePromiseAndErrors(excelenciaRef.get());

  if (error) handleCustomError(error);

  return actas?.data();
};
