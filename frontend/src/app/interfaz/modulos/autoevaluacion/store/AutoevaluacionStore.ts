import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { determinarPlan, resultadoAuditoria } from '../funciones/Funciones';
import {
  cuestionarioInicial,
  datosBasicos,
} from '../constantes/ConstAutoevaluaciones';

import type { ItemCuestionario } from 'hooks/types/HookTypes';
import type {
  EmpresaType,
  EvaluacionesType,
} from '../types/AutoevaluacionTypes';

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

  // se actualizala vista del tablero
  const preguntas = useCuestionario.getState();

  const totalPreguntas = Object.values(preguntas.cuestionario).length;
  const resultado = Object.values(preguntas.cuestionario).reduce(
    (acum, pregunta) => {
      if (pregunta.respuesta !== '') {
        return acum + 1;
      }
      return acum;
    },
    0
  );

  const total = Object.values(preguntas.cuestionario).reduce(
    (acum, pregunta) => {
      if (pregunta.respuesta !== 'cumple') {
        return acum + pregunta.ponderacion;
      }
      return acum;
    },
    0
  );

  console.log(resultado, totalPreguntas);

  useAutoevaluacion.setState({
    puntajeTotal: 100 - total,
    calificacion: resultadoAuditoria(100 - total),
    estado: resultado === totalPreguntas ? 'completo' : 'parcial',
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

export function actualizarEvaluacion(
  listas: ItemCuestionario['contenido'],
  peticion: EvaluacionesType | undefined
) {
  const respuestas = Object.values(listas)
    .map((preg) => {
      const {
        ciclo,
        criterios,
        estandar,
        item,
        modo,
        orden,
        planAccion,
        ponderacion,
      } = preg;
      const idCicloMod = `${ciclo}_${orden}`;

      const respuesta = peticion?.cuestionario?.find(
        (resp) => resp.codigo === idCicloMod
      );

      return {
        ...respuesta,
        ciclo,
        criterios,
        estandar,
        item,
        modo,
        orden,
        planAccion,
        ponderacion,
      };
    })
    .filter((resp) => resp.codigo !== undefined);

  const custionarioFinal = respuestas.reduce((acc, curr) => {
    const codigo = curr?.codigo ?? nanoid(8);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[codigo] = curr;
    return acc;
  }, {});

  useCuestionario.setState({ cuestionario: custionarioFinal });

  useAutoevaluacion.setState({
    id: peticion?.id ?? '',
    idEmpresa: peticion?.idEmpresa ?? '',
    fechaCreacion: peticion?.fechaCreacion ?? '',
    annio: peticion?.annio ?? 2024,
    puntajeTotal: peticion?.puntajeTotal ?? 0,
    calificacion: peticion?.calificacion ?? '',
    estado: peticion?.estado ?? 'parcial',
    empresa: {
      nit: peticion?.empresa?.nit ?? '',
      nombre: peticion?.empresa?.nombre ?? '',
      riesgo: peticion?.empresa?.riesgo ?? '',
      tamano: peticion?.empresa?.tamano ?? '',
      tipoEmpresa: peticion?.empresa?.tipoEmpresa ?? 'empresa',
    },
  });
}

export function prepararEvaluacionEditar() {
  const { empresa: _, ...autoevaluacion } = useAutoevaluacion.getState();
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
