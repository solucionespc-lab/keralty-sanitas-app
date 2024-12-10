import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { FiltrosQuery, ResolverArgs } from '../../../backend-def';
import {
  aplicarFiltros,
  dbDataType,
} from '../../../utilidades/FuncionesGenerales';
import { EMPRESA_REF } from '../constantes/EmpresasConst';

import type {
  EmpresaType,
  FiltrosArgs,
  FiltroType,
} from '../types/EmpresasTypes';

export const consultarEmpresas: ResolverArgs<
  FiltrosArgs,
  EmpresaType[]
> = async (_, { filtros }) => {
  const { idEmpresa, riesgo, tamano } = filtros;
  const empresaRef = admin
    .firestore()
    .collection(EMPRESA_REF)
    .withConverter(dbDataType<EmpresaType>());

  const consultas: FiltrosQuery = {
    empresa: ['idEmpresa', '==', idEmpresa],
    riesgo: ['riesgo', '==', riesgo],
    tamano: ['tamano', '==', tamano],
  };

  try {
    const consultaDb = aplicarFiltros<EmpresaType, FiltroType>(
      empresaRef,
      filtros,
      consultas
    );

    const empresas = await consultaDb.get();

    return empresas.docs.map((empresa) => empresa.data());
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudieron consultar las empresas solicitadas');
  }
};

export const consultarEmpresa: ResolverArgs<
  { idEmpresa: string },
  Partial<EmpresaType>
> = async (_, { idEmpresa }) => {
  const empresaRef = admin
    .firestore()
    .collection(EMPRESA_REF)
    .doc(idEmpresa)
    .withConverter(dbDataType<EmpresaType>());

  try {
    const empresa = await empresaRef.get();
    return { ...empresa.data(), id: empresa.id };
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudo consultar la empresa solicitada');
  }
};
