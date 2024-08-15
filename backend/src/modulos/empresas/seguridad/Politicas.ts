import { allow } from 'graphql-shield';

// import { politicas } from '../../../seguridad/Autorizaciones';

export const empresaQueryPolicy = {
  getEmpresas: allow,
  getEmpresa: allow,
};

export const empresaMutationPolicy = {
  saveEmpresa: allow,
};
