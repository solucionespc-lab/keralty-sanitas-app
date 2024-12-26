import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { INICIAL_PLANES } from '../constantes/ConstGenerales';

import type { PlanesType } from '../types/InformesTypes';

export const usePlanesAccionEvaluaciones = create(
  devtools(
    () => ({
      ...INICIAL_PLANES,
    }),
    { enabled: DEV_MODE, name: 'Informes-planes' }
  )
);

export const actualizarPlanes = (planes: PlanesType[]) => {
  usePlanesAccionEvaluaciones.setState({ planesAccion: planes });
};

export const guardarInfoPlan = (
  campo: string,
  valor: string,
  indice: number
) => {
  usePlanesAccionEvaluaciones.setState((state) => {
    const planesActualizados = state.planesAccion.map((plan, index) => {
      if (index === indice) {
        return { ...plan, [campo]: valor };
      }
      return { ...plan };
    });

    return { planesAccion: planesActualizados };
  });
};
