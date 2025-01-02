import { deny } from 'graphql-shield';
import { merge } from 'lodash';

import {
  backOfficeMutationsRules,
  backOfficeQueriesRules,
} from '../backoffice/seguridad/Politicas';
import {
  actaMutationPolicy,
  actaQueryPolicy,
} from '../modulos/actas/seguridad/Politicas';
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
  excelenciaMutationPolicy,
  excelenciaQueryPolicy,
} from '../modulos/excelencia/seguridad/Politicas';
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
    excelenciaQueryPolicy,
    actaQueryPolicy,
    backOfficeQueriesRules,
    denegado
  ),
  Mutation: merge(
    empresaMutationPolicy,
    trabajadoresMutations,
    evaluacionesMutationPolicy,
    PlanesAccionMutationPolicy,
    cuentasMutationsRules,
    excelenciaMutationPolicy,
    actaMutationPolicy,
    backOfficeMutationsRules,
    denegado
  ),
};

export default reglas;
