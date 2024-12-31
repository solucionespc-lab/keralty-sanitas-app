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
