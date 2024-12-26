import * as admin from 'firebase-admin';

import { dbDataType } from '../../../utilidades/FuncionesGenerales';
import { REF_EMPRESAS, REF_PLANES } from '../constantes/ConstAuditorias';

import type { PlanesEvaType } from '../types/PlanesEvaTypes';

export const registrarPlanes = (planes: string[], idEmpresa: string) => {
  const planesCompletos = planes.filter((plan) => plan !== '');
  const cantLotes = Math.ceil(planes.length / 400);
  const batch = admin.firestore().batch();

  for (let i = 0; i < cantLotes; i++) {
    const inicio = i * 400;
    const fin = Math.min((i + 1) * 400, planesCompletos.length);
    const lote = planesCompletos.slice(inicio, fin);

    lote.forEach((registroPlan) => {
      const db = admin.firestore();
      const planesRef = db
        .collection(REF_EMPRESAS)
        .doc(idEmpresa)
        .collection(REF_PLANES)
        .doc()
        .withConverter(dbDataType<PlanesEvaType>());

      const planCompleto = {
        origen: 'autoevaluacion',
        fechaCompromiso: '',
        fechaEjecucion: '',
        descripcion: registroPlan,
        responsables: '',
      };

      batch.set(planesRef, { ...planCompleto }, { merge: true });
    });
  }

  return batch;
};
