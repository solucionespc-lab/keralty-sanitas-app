import { allow } from 'graphql-shield';

// import { politicas } from '../../../seguridad/Autorizaciones';

const configQueriesRules = {
  getConfiguraciones: allow,
};

export { configQueriesRules };
