import { allow } from 'graphql-shield';

// import { politicas } from '../../../seguridad/excelencia';

export const actaQueryPolicy = {
  getActas: allow,
  getActa: allow,
};

export const actaMutationPolicy = {
  saveActa: allow,
  updateActa: allow,
};
