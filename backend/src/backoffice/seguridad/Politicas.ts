import { allow } from 'graphql-shield';

const backOfficeMutationsRules = {
  saveUsuario: allow,
  updateUsuario: allow,
  volcarEmpresasDesdeExcel: allow,
};

const backOfficeQueriesRules = {
  getUsuarios: allow,
  getUsuario: allow,
};

export { backOfficeMutationsRules, backOfficeQueriesRules };
