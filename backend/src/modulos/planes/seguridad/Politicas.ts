import { allow } from 'graphql-shield';

// const modulo = access.modulos[5]; // 'auditorias'

export const PlanesAccionQueryPolicy = {
  getPlanesAccion: allow,
};

export const PlanesAccionMutationPolicy = {
  savePlanesAccion: allow,
};
