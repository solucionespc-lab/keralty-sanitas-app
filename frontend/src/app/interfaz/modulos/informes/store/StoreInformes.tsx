import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { EMPRESA_INICIAL } from '../constantes/ConstGenerales';

export const useEmpresa = create(
  devtools(
    () => ({
      ...EMPRESA_INICIAL,
    }),
    { enabled: DEV_MODE, name: 'Informes-empresa' }
  )
);
