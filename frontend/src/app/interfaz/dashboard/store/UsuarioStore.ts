import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { EmpresaType } from '../types/ContextoTypes';

export const useUsuarioEmpresaStore = create(
  devtools(
    () => ({
      nombreEmpresa: '',
      nombreUsuario: '',
      nit: '',
    }),
    { enabled: DEV_MODE, name: 'Usuario-empresa' }
  )
);

export const actualizarEmpresa = (empresa: EmpresaType) => {
  useUsuarioEmpresaStore.setState(empresa);
};

export const actualizarDatos = (campo: string, valor: string) => {
  useUsuarioEmpresaStore.setState({ [campo]: valor });
};

export const reiniciarEmpresa = () => {
  useUsuarioEmpresaStore.setState({
    nit: '',
    nombreEmpresa: '',
  });
};
