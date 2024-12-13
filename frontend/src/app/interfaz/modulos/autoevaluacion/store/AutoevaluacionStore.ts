import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { EmpresaType } from '../types/AutoevaluacionTypes';
import { resultadoAuditoria } from '../funciones/Funciones';
import {
  cuestionarioInicial,
  datosBasicos,
} from '../constantes/ConstAutoevaluaciones';

import type { ItemCuestionario } from 'hooks/types/HookTypes';

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

export const guardarDatosBasicos = (campo: string, valor: string | number) => {
  if (campo === 'tamano' || campo === 'riesgo') {
    useAutoevaluacion.setState((state) => ({
      ...state,
      empresa: {
        ...state.empresa,
        [campo]: valor,
      },
    }));
    return;
  }

  useAutoevaluacion.setState({ [campo]: valor });
};

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

  const estado = useCuestionario.getState();

  const total = Object.values(estado.cuestionario).reduce((acum, pregunta) => {
    if (pregunta.respuesta !== 'cumple') {
      return acum + pregunta.ponderacion;
    }
    return acum;
  }, 0);

  useAutoevaluacion.setState({
    puntajeTotal: 100 - total,
    calificacion: resultadoAuditoria(100 - total),
  });
};

export const guardarCuestionario = (
  cuestionario: ItemCuestionario[],
  empresa: EmpresaType
) => {
  console.log(cuestionario);
  const preguntasPorTipoEmpresa = cuestionario.filter(
    (tema) =>
      Object.values(tema.riesgo).includes(empresa.riesgo) &&
      tema.tamano === empresa.tamano &&
      Object.values(tema.tipoEmpresa).includes(empresa.tipoEmpresa)
  );

  const preguntas = Object.values(preguntasPorTipoEmpresa)
    .map((pregunta) => {
      return Object.values(pregunta.contenido);
    })
    .flat();

  const cuestionarioFinal = preguntas.reduce((acum, pregunta) => {
    const id = `${pregunta.ciclo}_${pregunta.orden}`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acum[id] = {
      ...pregunta,
      respuesta: '',
      planes: [''],
      soportes: {
        nombre: '',
        url: '',
      },
    };
    return acum;
  }, {});

  useCuestionario.setState({ cuestionario: cuestionarioFinal });
};

export function prepararEvaluacion() {
  const autoevaluacion = useAutoevaluacion.getState();
  const { cuestionario } = useCuestionario.getState();

  const cuestionarioFinal = Object.entries(cuestionario).map((pregunta) => {
    return {
      codigo: pregunta[0],
      respuesta: pregunta[1].respuesta,
      planes: pregunta[1].planes,
      soportes: pregunta[1].soportes,
    };
  });

  return { ...autoevaluacion, cuestionario: cuestionarioFinal };
}
