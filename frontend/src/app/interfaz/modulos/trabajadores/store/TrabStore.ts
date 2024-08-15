import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { ISocioTrab } from '../types/TrabajadoresTypes';
import { datosSociodemograficos } from '../constantes/ConstGenerales';

export const useSociodemograficosStore = create(
  devtools(
    () => ({
      ...datosSociodemograficos,
    }),
    { enabled: DEV_MODE, name: 'Sociodemografico' }
  )
);

// Funciones para el registro en el Store
export const guardarInfoSocio = (
  valor: string | number | boolean,
  llave: string
) => {
  useSociodemograficosStore.setState(() => ({
    [llave]: valor,
  }));
};

export const actualizarInfoSocio = (datos: ISocioTrab) => {
  useSociodemograficosStore.setState(() => datos);
};

export const resetTrabajadores = () => {
  useSociodemograficosStore.setState(() => ({
    ...datosSociodemograficos,
  }));
};

export const estadoTrabajadores = () => useSociodemograficosStore.getState();
