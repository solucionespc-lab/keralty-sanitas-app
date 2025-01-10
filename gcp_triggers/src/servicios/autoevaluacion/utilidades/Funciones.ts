import { EvaContenidoRT } from '../types/EvaluacionesTypes';

import type { ContenidoType } from '../types/InformesTypes';

function modelarPreguntas(preguntas: (ContenidoType[] | undefined)[]) {
  return preguntas
    .map((pregunta) =>
      pregunta?.map((preg) => ({
        idPregunta: `${preg?.ciclo ?? ''}_${preg?.orden ?? ''}`,
        ponderacion: preg?.ponderacion ?? 0,
        estandar: preg?.estandar ?? '',
      }))
    )
    .flat();
}

function estandarizarPreguntas(ciclo: ContenidoType[]) {
  const cicloModificado = Object.groupBy(ciclo, ({ estandar }) => estandar);
  return modelarPreguntas(Object.values(cicloModificado));
}

export const clasificarPreguntasPorCiclos = (preguntas: ContenidoType[]) => {
  return estandarizarPreguntas(preguntas);
};

export const ajustarResultados = (
  criterio: Record<string, { resultado: number; puntajeMaximo: number }>
) => {
  const copiaCriterio = { ...criterio };
  // para obtejer el resultado real en todos los campos, debemos hacer = 100 - resultado actual
  // eslint-disable-next-line guard-for-in
  for (const key in copiaCriterio) {
    criterio[key].resultado = 100 - criterio[key].resultado;
  }
  return copiaCriterio;
};

export const calcularPonderacion = (
  codigo: string,
  preguntas: EvaContenidoRT[]
): number => {
  const [ciclo, orden] = codigo.split('_');
  const valorPregunta = preguntas.find(
    (pregunta: EvaContenidoRT) =>
      pregunta.ciclo === ciclo && pregunta.orden === Number(orden)
  );
  return valorPregunta ? valorPregunta.ponderacion : 0;
};

export const calcularPorcentaje = (
  dimensiones: Record<string, { numerador: number; denominador: number }>
) => {
  const dimensionesCalculadas: Record<
    string,
    { resultadoObtenido: number; resultadoEsperado: number }
  > = {
    liderazgo: { resultadoObtenido: 0, resultadoEsperado: 100 },
    proposito: { resultadoObtenido: 0, resultadoEsperado: 100 },
    objetivos: { resultadoObtenido: 0, resultadoEsperado: 100 },
    sst: { resultadoObtenido: 0, resultadoEsperado: 100 },
    compromiso: { resultadoObtenido: 0, resultadoEsperado: 100 },
  };
  // Calcular el porcentaje y guardarlo en resultadoObtenido de cada dimension
  for (const tema in dimensiones) {
    // caso en que el denominador sea cero
    if (dimensiones[tema].denominador === 0) {
      dimensionesCalculadas[tema].resultadoObtenido = 0;
    } else {
      // calcular numerador con 2 decimas
      dimensionesCalculadas[tema].resultadoObtenido = Number(
        (dimensiones[tema].numerador / dimensiones[tema].denominador).toFixed(2)
      );
    }
  }
  return dimensionesCalculadas;
};
