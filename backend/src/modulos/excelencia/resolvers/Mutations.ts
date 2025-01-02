import * as admin from 'firebase-admin';

import { ResolverArgs } from '../../../backend-def';
import {
  handleCustomError,
  resolvePromiseAndErrors,
} from '../../../utilidades/FuncionesGenerales';
import { EMPRESA_REF, EXCELENCIA_REF } from '../constantes/ConstGenerales';

import type { ExcelenciaInput } from '../types/ExcelenciaTypes';

export const saveExcelencia: ResolverArgs<ExcelenciaInput, string> = async (
  _,
  { cuestionario }
) => {
  const { id, idEmpresa, ...cuestionarioRest } = cuestionario;
  const db = admin.firestore();
  const excelenciaRef = db
    .collection(EMPRESA_REF)
    .doc(idEmpresa)
    .collection(EXCELENCIA_REF)
    .doc();

  const [error] = await resolvePromiseAndErrors(
    excelenciaRef.set({ ...cuestionarioRest, idEmpresa }, { merge: true })
  );

  if (error) handleCustomError(error);

  return `Se ha registrado la evaluación con éxito, ${id}`;
};

export const updateExcelencia: ResolverArgs<ExcelenciaInput, string> = async (
  _,
  { cuestionario }
) => {
  const { id, idEmpresa, ...cuestionarioRest } = cuestionario;
  const db = admin.firestore();
  const excelenciaRef = db
    .collection(EMPRESA_REF)
    .doc(idEmpresa)
    .collection(EXCELENCIA_REF)
    .doc(id);

  const [error] = await resolvePromiseAndErrors(
    excelenciaRef.update({ ...cuestionarioRest, idEmpresa })
  );

  if (error) handleCustomError(error);

  return 'Se ha actualizado la evaluación con éxito';
};
