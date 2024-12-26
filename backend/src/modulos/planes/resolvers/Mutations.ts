import * as admin from 'firebase-admin';

import { ResolverArgs } from '../../../backend-def';
import {
  dbDataType,
  resolvePromiseAndErrors,
} from '../../../utilidades/FuncionesGenerales';
import { REF_EMPRESAS, REF_PLANES } from '../constantes/ConstGenerales';

import type { PlanesInputArgs, PlanesType } from '../types/PlanesTypes';

export const guardarPlanAccion: ResolverArgs<PlanesInputArgs, string> = async (
  _,
  { PlanesAccionInput }
) => {
  const { idEmpresa, idPlan, ...planesRest } = PlanesAccionInput;
  const db = admin.firestore();

  const planesRef = db
    .collection(REF_EMPRESAS)
    .doc(idEmpresa)
    .collection(REF_PLANES)
    .doc(idPlan)
    .withConverter(dbDataType<PlanesType>());

  const [error] = await resolvePromiseAndErrors(
    planesRef.set(planesRest, {
      mergeFields: ['fechaCompromiso', 'fechaEjecucion', 'responsables'],
    })
  );

  if (error) throw new Error(error.message);

  return 'Se guardó correctamente el plan de acción';
};
