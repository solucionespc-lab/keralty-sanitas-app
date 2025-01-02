import { allow } from 'graphql-shield';

// import { politicas } from '../../../seguridad/excelencia';

export const excelenciaQueryPolicy = {
  getExcelencia: allow,
};

export const excelenciaMutationPolicy = {
  saveExcelencia: allow,
};
