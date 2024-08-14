import { and } from 'graphql-shield';

import { politicas } from '../../../seguridad/Autorizaciones';

const configQueriesRules = {
  getConfiguraciones: and(politicas.estaAutenticado),
};

export { configQueriesRules };
