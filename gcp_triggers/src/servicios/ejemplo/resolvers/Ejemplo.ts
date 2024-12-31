/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { clasificarPreguntasPorCiclos } from '../utilidades/Funciones';

import type { CuestionarioType } from '../types/InformesTypes';

export const ejemploTrigger = functions.firestore
  .document('col_empresas/{empresaId}/col_evaluaciones/{evaluacionId}')
  .onWrite(async (evaluacion) => {
    const documento = evaluacion.after.data();
    const db = admin.firestore();

    const informesRef = db
      .collection('col_empresas')
      .doc(documento?.idEmpresa)
      .collection('col_resultados')
      .doc(evaluacion.before.id);

    const cuestionario: CuestionarioType[] = (
      await admin.database().ref('listas/evaluaciones').get()
    ).val();

    const pregClasificadas = clasificarPreguntasPorCiclos(
      cuestionario.map((c) => c.contenido).flat()
    );

    const informe = documento?.cuestionario
      .filter((preg: { respuesta: string }) => preg.respuesta !== 'no_cumple')
      .map((doc: { codigo: string | undefined }) =>
        pregClasificadas.find((preg) => preg?.idPregunta === doc.codigo)
      );

    // @ts-ignore
    const resultado = Object.groupBy(informe, ({ estandar }) => estandar);
    await informesRef.set(resultado, { merge: true });
  });
