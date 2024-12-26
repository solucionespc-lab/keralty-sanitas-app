import { deny } from 'graphql-shield';
import { merge } from 'lodash';

import {
  backOfficeMutationsRules,
  backOfficeQueriesRules,
} from '../backoffice/seguridad/Politicas';
import {
  evaluacionesMutationPolicy,
  evaluacionesQueryPolicy,
} from '../modulos/autoevaluacion/seguridad/Politicas';
import { configQueriesRules } from '../modulos/configuraciones/seguridad/Politicas';
import { cuentasMutationsRules } from '../modulos/cuentas/seguridad/Politicas';
import {
  empresaMutationPolicy,
  empresaQueryPolicy,
} from '../modulos/empresas/seguridad/Politicas';
import {
  PlanesAccionQueryPolicy,
  PlanesAccionMutationPolicy,
} from '../modulos/planes/seguridad/Politicas';
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
    evaluacionesQueryPolicy,
    PlanesAccionQueryPolicy,
    backOfficeQueriesRules,
    denegado
  ),
  Mutation: merge(
    empresaMutationPolicy,
    trabajadoresMutations,
    evaluacionesMutationPolicy,
    PlanesAccionMutationPolicy,
    cuentasMutationsRules,
    backOfficeMutationsRules,
    denegado
  ),
};

export default reglas;
