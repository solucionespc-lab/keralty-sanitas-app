import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { IEmergenciaTrab } from '../types/TrabajadoresTypes';
import { datosEmergencia } from '../constantes/ConstGenerales';

export const useEmergenciaStore = create(
  devtools(
    () => ({
      ...datosEmergencia,
    }),
    { enabled: DEV_MODE, name: 'Emergencias' }
  )
);

export const guardarInfoEmergencia = (valor: string, key: string) => {
  useEmergenciaStore.setState({ [key]: valor });
};

export const actualizarInfoEme = (datos: IEmergenciaTrab) => {
  useEmergenciaStore.setState({ ...datos });
};

export const resetEmergencias = () => {
  useEmergenciaStore.setState({ ...datosEmergencia });
};

export const estadoEmergencias = () => useEmergenciaStore.getState();
