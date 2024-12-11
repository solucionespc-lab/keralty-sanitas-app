import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { EmpresaType } from '../types/AutoevaluacionTypes';
import {
  cuestionarioInicial,
  datosBasicos,
} from '../constantes/ConstAutoevaluaciones';

export const useAutoevaluacion = create(
  devtools(
    () => ({
      ...datosBasicos,
    }),
    { enabled: DEV_MODE, name: 'Autoevaluacion' }
  )
);

export const useCuestionario = create(
  devtools(
    () => ({
      ...cuestionarioInicial,
    }),
    { enabled: DEV_MODE, name: 'Cuestionario' }
  )
);

// Funciones del STORE
export const guardarDatosEmpresa = (
  empresa: EmpresaType,
  idEmpresa: string
) => {
  useAutoevaluacion.setState({ empresa, idEmpresa });
};

export const guardarRespuesta = (
  codigo: string,
  campo: string,
  valor: string | boolean | number
) => {
  useCuestionario.setState(({ cuestionario }) => ({
    cuestionario: {
      ...cuestionario,
      [codigo]: {
        ...cuestionario[codigo],
        [campo]: valor,
      },
    },
  }));
};
