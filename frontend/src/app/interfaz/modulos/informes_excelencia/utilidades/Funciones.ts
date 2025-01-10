import { CICLOS } from '../constantes/ConstGenerales';

import type { ResultadoType } from '../types/InformesTypes';

export function transformarDatos(arrayEntrada: ResultadoType[]) {
  console.log(arrayEntrada);
  arrayEntrada.forEach((item) => {
    const categoria = item.estandar as keyof typeof CICLOS;
    return CICLOS[categoria].push(item.ponderacion);
  });

  const arraySalida = Object.keys(CICLOS).map((categoria) => ({
    categoria,
    datos: CICLOS[categoria as keyof typeof CICLOS],
  }));

  return arraySalida;
}
