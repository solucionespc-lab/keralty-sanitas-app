import * as admin from 'firebase-admin';

import { FiltrosQuery, ResolverArgs } from '../../../backend-def';
import {
  aplicarFiltros,
  dbDataType,
  handleCustomError,
  resolvePromiseAndErrors,
} from '../../../utilidades/FuncionesGenerales';
import { EMPRESA_REF } from '../../empresas/constantes/EmpresasConst';
import { REF_PLANES } from '../constantes/ConstGenerales';

import type {
  FiltrosPlanes,
  PlanesArgs,
  PlanesType,
} from '../types/PlanesTypes';

export const consultarPlanesAccion: ResolverArgs<
  PlanesArgs,
  PlanesType[]
> = async (_, { filtros, idEmpresa }) => {
  const db = admin.firestore();
  const planesRef = db
    .collection(EMPRESA_REF)
    .doc(idEmpresa)
    .collection(REF_PLANES)
    .withConverter(dbDataType<PlanesType>());

  const parametrosFiltro: FiltrosQuery = {
    fechaInicio: ['fechaCompromiso', '>=', filtros.fechaInicio],
    fechaFin: ['fechaCompromiso', '<=', filtros.fechaFin],
  };

  const consultarPlanes = aplicarFiltros<PlanesType, FiltrosPlanes>(
    planesRef,
    filtros,
    parametrosFiltro
  );

  const [error, planes] = await resolvePromiseAndErrors(consultarPlanes.get());

  if (error) handleCustomError(error);

  return planes?.docs.map((plan) => ({
    ...plan.data(),
    idPlan: plan.id,
  }));
};
