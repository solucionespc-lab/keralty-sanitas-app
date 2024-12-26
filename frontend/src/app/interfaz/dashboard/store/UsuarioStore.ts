import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

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

export const actualizarDatos = (campo: string, valor: string) => {
  useUsuarioEmpresaStore.setState({ [campo]: valor });
};
