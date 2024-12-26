import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { EmpresaType } from '../types/AutoevaluacionTypes';
import { determinarPlan, resultadoAuditoria } from '../funciones/Funciones';
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
          plan: determinarPlan(campo, valor, cuestionarioUnico.planAccion),
        },
      },
    };
  });

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

export const guardarCuestionario = (
  cuestionario: ItemCuestionario[],
  empresa: EmpresaType
) => {
  const preguntasPorTipoEmpresa =
    empresa.tamano === 'grande'
      ? cuestionario.filter((tema) =>
          Object.values(tema.tamano).includes('grande')
        )
      : cuestionario.filter(
          (tema) =>
            Object.values(tema.riesgo).includes(empresa.riesgo) &&
            Object.values(tema.tamano).includes(empresa.tamano) &&
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
      plan: '',
      soportes: [],
    };

    return acum;
  }, {});

  useCuestionario.setState({ cuestionario: cuestionarioFinal });
};

export function prepararEvaluacion() {
  const autoevaluacion = useAutoevaluacion.getState();
  const { cuestionario } = useCuestionario.getState();
  const planesAccion: string[] = [];

  const cuestionarioFinal = Object.entries(cuestionario).map((pregunta) => {
    const { respuesta, plan, soportes, observaciones } = pregunta[1];
    planesAccion.push(plan);

    return {
      codigo: pregunta[0],
      respuesta,
      soportes,
      observaciones,
    };
  });

  return {
    ...autoevaluacion,
    planes: planesAccion,
    cuestionario: cuestionarioFinal,
  };
}
