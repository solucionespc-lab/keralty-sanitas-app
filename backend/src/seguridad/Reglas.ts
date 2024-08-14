import { deny } from 'graphql-shield';
import { merge } from 'lodash';

// Aquí se agregan las reglas que vienen de la carpeta módulos
import { configQueriesRules } from '../modulos/configuraciones/seguridad/Politicas';
import {
  ejemploMutationPolicy,
  ejemploQueryPolicy,
} from '../modulos/ejemplo/seguridad/Politicas';

// Regla para negar todos los permisos solicitados por la API
const denegado = {
  '*': deny,
};

const reglas = {
  Query: merge(ejemploQueryPolicy, configQueriesRules, denegado),
  Mutation: merge(ejemploMutationPolicy, denegado),
};

export default reglas;
