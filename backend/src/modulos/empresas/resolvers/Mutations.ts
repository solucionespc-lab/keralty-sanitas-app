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
    // Verificar si ya existe una empresa con el mismo NIT
    const empresaSnapshot = await empresaRef
      .where('nit', '==', empresa.nit)
      .get();

    if (!empresaSnapshot.empty) {
      return `Ya existe una empresa registrada con el NIT: ${empresa.nit}`;
    }

    if (empresa.id === '') {
      // Crear un nuevo ID único
      const idCreado = empresaRef.doc();
      await idCreado.set({ ...empresa, id: idCreado.id });
      return 'Se ha guardado la empresa con éxito';
    }

    // Agregar empresa si ya tiene un ID
    await empresaRef.add(empresa);
    return 'Se ha guardado la empresa con éxito';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error al momento de guardar la empresa';
  }
};
