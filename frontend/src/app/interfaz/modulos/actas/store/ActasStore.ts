import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { ActasType } from '../types/ActasTypes';
import { ACTA_INICIAL } from '../constantes/ConstGenerales';

export const useActasStore = create(
  devtools(() => ({ ...ACTA_INICIAL }), {
    name: 'actas store',
    enabled: DEV_MODE,
  })
);

export const guardarDatosActa = (campo: string, valor: string) => {
  useActasStore.setState({ [campo]: valor });
};

export function actualizarDatosActa(datos: ActasType) {
  useActasStore.setState(datos);
}
