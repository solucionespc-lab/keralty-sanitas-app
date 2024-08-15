import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { IFiltros } from '../types/TrabajadoresTypes';
import { filtros } from '../constantes/ConstGenerales';

export const useFiltrosStore = create(
  devtools(
    () => ({
      ...filtros,
    }),
    { enabled: DEV_MODE, name: 'filtros' }
  )
);

export const aplicarFiltro = (filtros: IFiltros) => {
  useFiltrosStore.setState({ ...filtros });
};

export const actualizarFiltros = (filtros: IFiltros) => {
  useFiltrosStore.setState({ ...filtros });
};

export const resetFiltros = () => {
  useFiltrosStore.setState({ ...filtros });
};

export const tituloFiltro = () => {
  const filtros = useFiltrosStore.getState();

  return {
    Cédula: filtros?.cedula,
    Género: filtros?.genero,
    'Nivel educativo': filtros?.nivelEducativo,
    Profesión: filtros?.profesion,
    Gerencia: filtros?.gerencia,
    'Proceso actual': filtros?.procesoActual,
    'Turno actual': filtros?.turnoActual,
    'Cargo actual': filtros?.cargoActual,
  };
};
