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
import {
  evaluacionesMutationPolicy,
  evaluacionesQueryPolicy,
} from '../modulos/autoevaluacion/seguridad/Politicas';
import {
  backOfficeMutationsRules,
  backOfficeQueriesRules,
} from '../backoffice/seguridad/Politicas';

// Regla para negar todos los permisos solicitados por la API
const denegado = {
  '*': deny,
};

const reglas = {
  Query: merge(
    configQueriesRules,
    empresaQueryPolicy,
    trabajadoresQueries,
    evaluacionesQueryPolicy,
    backOfficeQueriesRules,
    denegado
  ),
  Mutation: merge(
    empresaMutationPolicy,
    trabajadoresMutations,
    evaluacionesMutationPolicy,
    backOfficeMutationsRules,
    denegado
  ),
};

export default reglas;
