import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { EMPRESAS, FILTROS_EMPRESAS } from '../constantes/ConstGenerales';

import type {
  EmpresaKey,
  EmpresaType,
  ResponsableType,
} from '../types/EmpresaTypes';

export const useEmpresaStore = create(
  devtools(
    () => ({
      ...EMPRESAS,
    }),
    { enabled: DEV_MODE, name: 'Empresa Store' }
  )
);

export const useFiltrosEmpStore = create(
  devtools(
    () => ({
      ...FILTROS_EMPRESAS,
    }),
    { enabled: DEV_MODE, name: 'Filtros Store' }
  )
);

// Actions para el Store
export const guardarResponsable = (
  key: keyof ResponsableType,
  datoResponsable: string | boolean,
  index: number
) => {
  useEmpresaStore.setState((state) => {
    const nuevosRes = [...state.responsables];
    const existeRes = nuevosRes[index];
    const nuevoRes = {
      nombre: '',
      cargo: '',
      telefono: '',
      correo: '',
      usuarioActivo: true,
    };

    if (existeRes) {
      nuevosRes[index] = {
        ...existeRes,
        [key]: datoResponsable,
      };

      return {
        ...state,
        responsables: nuevosRes,
      };
    }

    return {
      ...state,
      responsables: nuevosRes.concat({
        ...nuevoRes,
        [key]: datoResponsable,
      }),
    };
  });
};

export const guardarEmpresa = (key: EmpresaKey, dato: string | boolean) => {
  useEmpresaStore.setState({ [key]: dato });
};

export const actualizarDatosEmpresa = (datos: EmpresaType) => {
  useEmpresaStore.setState(datos);
};

export const aplicarFiltro = (
  key: keyof typeof FILTROS_EMPRESAS,
  datoFiltro: string
) => {
  useFiltrosEmpStore.setState({ [key]: datoFiltro });
};

export const resetFiltro = () => {
  useFiltrosEmpStore.setState({
    ...FILTROS_EMPRESAS,
  });
};
