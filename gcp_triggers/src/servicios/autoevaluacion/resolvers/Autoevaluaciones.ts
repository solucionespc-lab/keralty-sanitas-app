import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {
  COL_EMPRESAS,
  COL_RESULTADOS,
} from '../constantes/colecciones.constantes';
import { EvaContenidoRT, EvaRepuesta } from '../types/EvaluacionesTypes';
import {
  ajustarResultados,
  calcularPonderacion,
} from '../utilidades/Funciones';

export const autoevaluaciones = functions.firestore
  .document('col_empresas/{empresaId}/col_evaluaciones/{evaluacionId}')
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    const rtdb = admin.database();

    const empresaId = context.params.empresaId;
    const evaluacionId = context.params.evaluacionId;

    const afterData = change.after.data();

    if (!afterData || !afterData.cuestionario) {
      functions.logger.error('No se encontró cuestionario en la evaluación.');
      return;
    }

    const cuestionario = afterData.cuestionario;
    const year = afterData.annio;

    // Consultar las preguntas del realtime
    const preguntasRTPath = 'listas/evaluaciones/2/contenido';
    const snapshot = await rtdb.ref(preguntasRTPath).once('value');

    if (!snapshot.exists()) {
      functions.logger.error('No se encontraron preguntas en el realtime.');
      return;
    }

    const preguntas: EvaContenidoRT[] = snapshot.val();

    // Inicialiazar resultados
    const ciclos: Record<string, { resultado: number; puntajeMaximo: number }> =
      {
        Planear: { resultado: 0, puntajeMaximo: 25 },
        Hacer: { resultado: 0, puntajeMaximo: 60 },
        Verificar: { resultado: 0, puntajeMaximo: 5 },
        Actuar: { resultado: 0, puntajeMaximo: 10 },
      };
    const estandares: Record<
      string,
      { resultado: number; puntajeMaximo: number }
    > = {
      recursos: { resultado: 0, puntajeMaximo: 10 },
      integral: { resultado: 0, puntajeMaximo: 15 },
      salud: { resultado: 0, puntajeMaximo: 20 },
      perligros: { resultado: 0, puntajeMaximo: 30 },
      amenazas: { resultado: 0, puntajeMaximo: 10 },
      verificacion: { resultado: 0, puntajeMaximo: 5 },
      mejoramiento: { resultado: 0, puntajeMaximo: 10 },
    };

    // Procesar las respuestas del cuestionario
    cuestionario.forEach((respuesta: EvaRepuesta) => {
      const ponderacion = calcularPonderacion(respuesta.codigo, preguntas);
      if (respuesta.respuesta == 'cumple') {
        const [ciclo, orden] = respuesta.codigo.split('_');
        const preguntaCorrespondiente = preguntas.find(
          (pregunta: EvaContenidoRT) =>
            pregunta.ciclo === ciclo && pregunta.orden === Number(orden)
        );

        if (preguntaCorrespondiente) {
          ciclos[ciclo].resultado += ponderacion;
          const estandar = preguntaCorrespondiente.estandar;
          estandares[estandar].resultado += ponderacion;
        }
      }
    });

    const ciclosCalculados = ajustarResultados(ciclos);
    const estandaresCalculadors = ajustarResultados(estandares);

    // Guardar los resultados a la subcoleccion
    const resultados = {
      annio: year,
      autoevaluacion: {
        ciclo: ciclosCalculados,
        estandar: estandaresCalculadors,
      },
    };

    await db
      .collection(COL_EMPRESAS)
      .doc(empresaId)
      .collection(COL_RESULTADOS)
      .doc(evaluacionId)
      .set(resultados, { merge: true });

    functions.logger.log('Resultados calculados y guardados:');
  });
