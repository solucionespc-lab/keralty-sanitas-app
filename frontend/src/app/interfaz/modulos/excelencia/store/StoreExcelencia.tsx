import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { interpretaciones } from '../utilidades/Funciones';
import {
  cuestionarioInicial,
  datosBasicos,
} from '../constantes/ConstGenerales';

import type { EmpresaType, ItemExcelencia } from '../types/ExcelenciaTypes';

export const useExcelencia = create(
  devtools(
    () => ({
      ...datosBasicos,
    }),
    { enabled: DEV_MODE, name: 'Excelencia' }
  )
);

export const useCuestionario = create(
  devtools(
    () => ({
      ...cuestionarioInicial,
    }),
    { enabled: DEV_MODE, name: 'Cuestionario excelencia' }
  )
);

// Funciones del STORE
export const guardarDatosBasicos = (campo: string, valor: string | number) => {
  useExcelencia.setState((state) => ({
    ...state,
    empresa: {
      ...state.empresa,
      [campo]: valor,
    },
  }));

  useExcelencia.setState({ [campo]: valor });
};

export const guardarDatosEmpresa = (
  empresa: EmpresaType,
  idEmpresa: string
) => {
  useExcelencia.setState({ empresa, idEmpresa });
};

export const guardarRespuesta = (
  codigo: string,
  campo: string,
  valor: string | number
) => {
  useCuestionario.setState(({ cuestionario }) => {
    const cuestionarioUnico = { ...cuestionario[codigo] };

    return {
      cuestionario: {
        ...cuestionario,
        [codigo]: {
          ...cuestionarioUnico,
          [campo]: valor,
        },
      },
    };
  });

  const cuestionarioTotal = useCuestionario.getState().cuestionario;

  const numerador = Object.values(cuestionarioTotal).reduce(
    (acum, { respuesta }) => acum + (respuesta !== -1 ? respuesta : 0),
    0
  );
  const denominador = Object.values(cuestionarioTotal).reduce(
    (acum, { respuesta }) => acum + (respuesta !== -1 ? 100 : 0),
    0
  );

  console.log(denominador);

  const total = (numerador / denominador) * 100;

  useExcelencia.setState({
    puntajeTotal: total,
    calificacion: interpretaciones(total),
  });
};

export const guardarObservaciones = (codigo: string, valor: string) => {
  useCuestionario.setState(({ cuestionario }) => {
    const cuestionarioUnico = { ...cuestionario[codigo] };

    return {
      cuestionario: {
        ...cuestionario,
        [codigo]: {
          ...cuestionarioUnico,
          observaciones: valor,
        },
      },
    };
  });
};

export const guardarCuestionario = (cuestionario: ItemExcelencia[]): void => {
  const cuestinarioModificado = cuestionario
    .map((pregunta) => Object.values(pregunta.contenido))
    .flat();

  const trasformarAObjeto = cuestinarioModificado.reduce((acum, contenido) => {
    const id = nanoid(8);

    const pregunta = {
      [id]: {
        ...contenido,
        respuesta: 0,
        observaciones: '',
      },
    };

    return { ...acum, ...pregunta };
  }, {});

  useCuestionario.setState({ cuestionario: trasformarAObjeto });
};

export function prepararEvaluacion() {
  const { empresa, ...excelenciaRest } = useExcelencia.getState();
  const { cuestionario } = useCuestionario.getState();

  const transformarCuestionario = Object.entries(cuestionario).map(
    (pregunta) => ({ ...pregunta[1] })
  );

  console.log({
    ...excelenciaRest,
    contenido: transformarCuestionario,
  });

  return {
    ...excelenciaRest,
    contenido: transformarCuestionario,
  };
}
