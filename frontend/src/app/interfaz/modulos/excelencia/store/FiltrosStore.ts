import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { inicialFiltros } from '../constantes/ConstGenerales';

export const useFiltrosStore = create(
  devtools(
    () => ({
      ...inicialFiltros,
    }),
    { enabled: DEV_MODE, name: 'Filtros excelencia' }
  )
);

// Filtros Actions Store
export const guardarFiltro = (
  key: keyof typeof inicialFiltros,
  filtro: string
) => useFiltrosStore.setState({ [key]: filtro });

export const enviarFiltros = () => {
  useFiltrosStore.setState((state) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    idEmpresa: state.idEmpresa,
    annio: state.annio,
  }));
};
