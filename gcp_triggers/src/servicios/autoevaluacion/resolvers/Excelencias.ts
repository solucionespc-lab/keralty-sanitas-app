/* eslint-disable guard-for-in */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {
  COL_EMPRESAS,
  COL_RESULTADOS,
} from '../constantes/colecciones.constantes';
import { ExcelenciaRespuesta } from '../types/ExcelenciasTypes';
import { calcularPorcentaje } from '../utilidades/Funciones';

export const excelencias = functions.firestore
  .document('col_empresas/{empresaId}/col_excelencia/{excelenciaId}')
  .onWrite(async (change, context) => {
    const db = admin.firestore();

    const empresaId = context.params.empresaId;

    const afterData = change.after.data();

    if (!afterData || !afterData.contenido) {
      functions.logger.error(
        'No se encontró cuestionario en la evaluación excelencia.'
      );
      return;
    }

    const cuestionario: ExcelenciaRespuesta[] = afterData.contenido;
    const year = afterData.annio;

    // Inicialiazar conteo para cada dimension
    const dimensiones: Record<
      string,
      { numerador: number; denominador: number }
    > = {
      liderazgo: { numerador: 0, denominador: 0 },
      proposito: { numerador: 0, denominador: 0 },
      objetivos: { numerador: 0, denominador: 0 },
      sst: { numerador: 0, denominador: 0 },
      compromiso: { numerador: 0, denominador: 0 },
    };

    // Procesar las respuestas del cuestionario
    for (const respuesta of cuestionario) {
      const valorRespuesta = respuesta.respuesta;
      const tema = respuesta.tema;

      if (!dimensiones[tema]) {
        functions.logger.warn(
          `No se encontró el tema ${tema} para la respuesta  ${respuesta.codigo}`
        );
        // seguimos con el siguiente ciclo del for
        continue;
      }
      // Sumar valores al tema correspondiente
      dimensiones[tema].numerador += valorRespuesta;
      dimensiones[tema].denominador += 1;
    }

    const dimensionesCalculadas = calcularPorcentaje(dimensiones);
    const resultados = {
      annio: year,
      idEmpresa: empresaId,
      excelencia: dimensionesCalculadas,
    };
    // verificar si ya existe el documento en la subcolección col_resultados
    const snapshot = await db
      .collection(COL_EMPRESAS)
      .doc(empresaId)
      .collection(COL_RESULTADOS)
      .where('annio', '==', year)
      .where('idEmpresa', '==', empresaId)
      .get();

    if (snapshot.empty) {
      await db
        .collection(COL_EMPRESAS)
        .doc(empresaId)
        .collection(COL_RESULTADOS)
        .doc() // Generar un ID automático
        .set(resultados);
    } else {
      await db
        .collection(COL_EMPRESAS)
        .doc(empresaId)
        .collection(COL_RESULTADOS)
        .doc(snapshot.docs[0].id)
        .set(resultados, { merge: true });
    }

    functions.logger.log('Resultados calculados y guardados:');
  });
