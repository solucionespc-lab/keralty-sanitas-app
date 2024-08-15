import { deny } from 'graphql-shield';
import { merge } from 'lodash';

import { configQueriesRules } from '../modulos/configuraciones/seguridad/Politicas';
import {
  empresaMutationPolicy,
  empresaQueryPolicy,
} from '../modulos/empresas/seguridad/Politicas';
import {
  trabajadoresMutations,
  trabajadoresQueries,
} from '../modulos/trabajadores/seguridad/Reglas';

// Regla para negar todos los permisos solicitados por la API
const denegado = {
  '*': deny,
};

const reglas = {
  Query: merge(
    configQueriesRules,
    empresaQueryPolicy,
    trabajadoresQueries,
    denegado
  ),
  Mutation: merge(empresaMutationPolicy, trabajadoresMutations, denegado),
};

export default reglas;
