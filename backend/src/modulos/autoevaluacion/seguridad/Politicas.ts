import { allow } from 'graphql-shield';

// const modulo = access.modulos[5]; // 'auditorias'

export const evaluacionesQueryPolicy = {
  getEvaluacion: allow,
  getEvaluaciones: allow,
};

export const evaluacionesMutationPolicy = {
  saveEvaluacion: allow,
};
