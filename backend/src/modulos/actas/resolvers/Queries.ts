import * as admin from 'firebase-admin';

import { FiltrosQuery, ResolverArgs } from '../../../backend-def';
import {
  aplicarFiltros,
  dbDataType,
  handleCustomError,
  resolvePromiseAndErrors,
} from '../../../utilidades/FuncionesGenerales';
import {
  ACTAS_REF,
  REF_EMPRESAS,
  REF_PROVEEDORES,
} from '../constantes/ConstGenerales';

import type {
  ActasType,
  FiltroActa,
  FiltrosProveedorType,
  FiltrosType,
} from '../types/ActasTypes';

export const traerActas: ResolverArgs<FiltrosType, ActasType[]> = async (
  _,
  { filtros, idEmpresa }
) => {
  const db = admin.firestore();
  const excelenciaRef = db
    .collection(REF_EMPRESAS)
    .doc(idEmpresa)
    .collection(ACTAS_REF)
    .withConverter(dbDataType<ActasType>());

  const consultas: FiltrosQuery = {
    fechaInicio: ['fechaCreacion', '>=', filtros.fechaInicio],
    fechaFin: ['fechaCreacion', '<=', filtros.fechaFin],
    estado: ['estado', '==', filtros.estado],
    idProveedor: ['idProveedor', '==', filtros.idProveedor],
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

export const traerActa: ResolverArgs<FiltroActa, Partial<ActasType>> = async (
  _,
  { idActa, idEmpresa }
) => {
  const db = admin.firestore();
  const excelenciaRef = db
    .collection(REF_EMPRESAS)
    .doc(idEmpresa)
    .collection(ACTAS_REF)
    .doc(idActa)
    .withConverter(dbDataType<ActasType>());

  const [error, actas] = await resolvePromiseAndErrors(excelenciaRef.get());

  if (error) handleCustomError(error);

  return { ...actas?.data(), id: actas?.id };
};

export const traerActasProveedor: ResolverArgs<
  FiltrosProveedorType,
  ActasType[]
> = async (_, { filtros, idProveedor }) => {
  const db = admin.firestore();
  const excelenciaRef = db
    .collectionGroup(ACTAS_REF)
    .withConverter(dbDataType<ActasType>());

  const consultas: FiltrosQuery = {
    fechaInicio: ['fechaCreacion', '>=', filtros.fechaInicio],
    fechaFin: ['fechaCreacion', '<=', filtros.fechaFin],
    estado: ['estado', '==', filtros.estado],
    idProveedor: ['idProveedor', '==', idProveedor],
    idEmpresa: ['idEmpresa', '==', filtros.idEmpresa],
  };

  const documentos = aplicarFiltros<ActasType, FiltrosProveedorType['filtros']>(
    excelenciaRef,
    filtros,
    consultas
  );

  const [error, actas] = await resolvePromiseAndErrors(documentos.get());

  if (error) handleCustomError(error);

  return actas?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const traerDatosEmpresa = async (acta: ActasType) => {
  const db = admin.firestore();

  const empresaRef = db
    .collection(REF_EMPRESAS)
    .doc(acta?.idEmpresa)
    .withConverter(dbDataType<ActasType>());

  const [error, empresaDoc] = await resolvePromiseAndErrors(empresaRef.get());

  if (error) handleCustomError(error);

  return { ...empresaDoc?.data(), id: empresaDoc?.id };
};

export const traerDatosProveedor = async (acta: ActasType) => {
  const db = admin.firestore();

  const proveedorRef = db
    .collection(REF_PROVEEDORES)
    .doc(acta?.idProveedor)
    .withConverter(dbDataType<ActasType>());

  const [error, proveedorDoc] = await resolvePromiseAndErrors(
    proveedorRef.get()
  );

  if (error) handleCustomError(error);

  return { ...proveedorDoc?.data(), id: proveedorDoc?.id };
};
