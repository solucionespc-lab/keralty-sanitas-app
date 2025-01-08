import * as admin from 'firebase-admin';

import { ResolverArgs } from '../../../backend-def';
import {
  handleCustomError,
  resolvePromiseAndErrors,
} from '../../../utilidades/FuncionesGenerales';
import { ACTAS_REF, EMPRESA_REF } from '../constantes/ConstGenerales';

import type { ActasArg } from '../types/ActasTypes';

export const guadarActas: ResolverArgs<ActasArg, string> = async (
  _,
  { ActasInput }
) => {
  const { id, idEmpresa, ...actaRest } = ActasInput;
  const db = admin.firestore();
  const actasRef = db
    .collection(EMPRESA_REF)
    .doc(idEmpresa)
    .collection(ACTAS_REF)
    .doc();

  const [error] = await resolvePromiseAndErrors(
    actasRef.set({ ...actaRest, idEmpresa }, { merge: true })
  );

  if (error) handleCustomError(error);

  return `Se ha registrado la evaluación con éxito, ${id}`;
};

export const updateExcelencia: ResolverArgs<ActasArg, string> = async (
  _,
  { ActasInput }
) => {
  const { id, idEmpresa, ...cuestionarioRest } = ActasInput;
  const db = admin.firestore();
  const excelenciaRef = db
    .collection(EMPRESA_REF)
    .doc(idEmpresa)
    .collection(ACTAS_REF)
    .doc(id);

  const [error] = await resolvePromiseAndErrors(
    excelenciaRef.update({ ...cuestionarioRest, idEmpresa })
  );

  if (error) handleCustomError(error);

  return 'Se ha actualizado la evaluación con éxito';
};
