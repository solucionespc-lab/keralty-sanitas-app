import { Listas } from 'hooks/types/HookTypes';

import { calTotalPreg } from './Funciones';

import type {
  DatosPpalesAudi,
  FechasPlanFormType,
  PlanFormType,
  PreguntaAuditoria,
  StoreArgsPregunta,
  planType,
} from '../types/AutoevaluacionTypes';

/**
 *
 * @param plan Es el objeto del plan el cual se evaluará el estado
 * @returns Devuelve un String con el estado determinado, ej: "E01", "E03", etc
 */
const establecerEstado = (plan: planType) => {
  if (plan.aprobacion) {
    return 'E02';
  }

  if (plan.fechaPrimerPlazo >= plan.fechaCompromiso) {
    return 'E04';
  }

  if (plan.fechaEjecucion > plan.fechaCompromiso) {
    return 'E03';
  }

  return 'E01';
};

/**
 *
 * @param estado Es el estado actualizado del Store
 * @param variable Es el nombre de la llave del campo del Store que se quiere actualizar
 * @param dato El valor que se envío desde el control del formulario
 * @returns El Store completo con la actualización del dato
 */
export const registrarCampoBasico = (
  estado: Partial<DatosPpalesAudi>,
  variable: string,
  dato: string | boolean
) => {
  const datosAnteriores = { ...estado };
  const datoActualizado = { ...datosAnteriores, [variable]: dato };

  return { basicos: datoActualizado };
};

/**
 *
 * @param estado Es el estado anterior de las preguntas de auditoria
 * @param respuesta Es un objeto con la respuesta seleccionada por el usuario
 * @returns Devuelve un objeto con todas las preguntas diligenciadas y su total
 */
export const regCalificacionPreg = (
  codigoPregunta: string,
  estado: StoreArgsPregunta,
  respuesta: PreguntaAuditoria,
  totalPreguntas: number,
  listaCalificación: Listas
) => {
  const respuestaTotal = { ...estado, [codigoPregunta]: respuesta };
  return {
    preguntasAuditoria: respuestaTotal,
    totalAuditoria: calTotalPreg(
      respuestaTotal,
      totalPreguntas,
      listaCalificación
    ),
  };
};

/**
 *
 * @param estado Es el estado anterior de las preguntas de auditoria
 * @param observaciones Es un texto escrito por el usuario
 * @returns Devuelve un objeto con las observaciones diligenciadas
 */
export const regObsPregunta = (
  estado: StoreArgsPregunta,
  codigo: string,
  observaciones: string
) => {
  const respuestaTotal = {
    ...estado,
    [codigo]: {
      ...estado[codigo],
      observaciones,
    },
  };

  return { preguntasAuditoria: respuestaTotal };
};

/**
 *
 * @param estado Es el estado anterior de los planes registrados
 * @param plan Es un objeto con el plan diligenciado por el usuario
 * @returns Devuelve un objeto con todas los planes registrados
 */
export const regPlanPorPreg = (
  estado: { [key: string]: planType },
  plan: PlanFormType
) => {
  const pregunta = estado[plan.codigoPreg];

  const nuevoPlan = {
    ...pregunta,
    [plan.campo]: plan.dato,
  };

  return {
    planes: {
      ...estado,
      [plan.codigoPreg]: { ...nuevoPlan, estado: establecerEstado(nuevoPlan) },
    },
  };
};

/**
 *
 * @param estado Es el estado anterior de los planes registrados
 * @param fechas Es un objeto con las fechas diligenciadas por el usuario
 * @returns Devuelve un objeto con todas los planes registrados
 */
export const regFechasPlan = (
  estado: { [key: string]: planType },
  fechas: FechasPlanFormType
) => {
  const pregunta = estado[fechas.codigoPreg];

  const nuevasFechas = {
    ...pregunta,
    [fechas.tipoFecha]: fechas.fecha,
    estado: establecerEstado(pregunta),
  };

  return {
    planes: {
      ...estado,
      [fechas.codigoPreg]: {
        ...nuevasFechas,
        estado: establecerEstado(nuevasFechas),
      },
    },
  };
};
