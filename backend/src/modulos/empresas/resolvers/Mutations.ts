import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend-def';
import { dbDataType } from '../../../utilidades/FuncionesGenerales';
import { EMPRESA_REF } from '../constantes/EmpresasConst';

import type { EmpresaInput, EmpresaType } from '../types/EmpresasTypes';

export const guardarEmpresa: ResolverArgs<EmpresaInput, string> = async (
  _,
  { empresa }
) => {
  const empresaRef = admin
    .firestore()
    .collection(EMPRESA_REF)
    .withConverter(dbDataType<EmpresaType>());

  try {
    if (empresa.id === '') {
      const idCreado = empresaRef.doc();
      await empresaRef.add({ ...empresa, id: idCreado });
      return 'Se ha guardado el empresa con éxito';
    }

    await empresaRef.add(empresa);
    return 'Se ha guardado el empresa con éxito';
  } catch (error) {
    logger.error(error);
    return 'Ocurrio un error al momento de guardar la empresa';
  }
};
