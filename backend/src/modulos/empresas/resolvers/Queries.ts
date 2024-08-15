import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend-def';
import { dbDataType } from '../../../utilidades/FuncionesGenerales';
import { EMPRESA_REF } from '../constantes/EmpresasConst';

import type { EmpresaType, FiltrosType } from '../types/EmpresasTypes';

export const consultarEmpresas: ResolverArgs<
  FiltrosType,
  EmpresaType[] | null
> = async (_, { filtros }) => {
  const empresaRef = admin
    .firestore()
    .collection(EMPRESA_REF)
    .withConverter(dbDataType<EmpresaType>());

  console.log(filtros);

  try {
    const empresas = await empresaRef.get();

    return empresas.docs.map((empresa) => empresa.data());
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const consultarEmpresa: ResolverArgs<
  { idEmpresa: string },
  EmpresaType[]
> = async (_, { idEmpresa }) => {
  const empresaRef = admin
    .firestore()
    .collection(EMPRESA_REF)
    .withConverter(dbDataType<EmpresaType>());

  try {
    const empresa = await empresaRef.where('id', '==', idEmpresa).get();

    return empresa.docs.map((empresa) => empresa.data());
  } catch (error) {
    logger.error(error);
  }

  return [];
};
