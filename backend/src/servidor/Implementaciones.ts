import { merge } from 'lodash';

import EvaluacionesSchema from '../modulos/autoevaluacion/Schema';
import ConfigSchema from '../modulos/configuraciones/Schema';
import EmpresaSchema from '../modulos/empresas/Schema';
import TrabajadoresSchema from '../modulos/trabajadores/Schema';

import EvaluacionesResolvers from '../modulos/autoevaluacion/Resolver';
import EvaluacionesSchemaInputs from '../modulos/autoevaluacion/SchemaInputs';
import TrabajadoresResolver from '../modulos/trabajadores/Resolver';

import configuracionesResolvers from '../modulos/configuraciones/Resolvers';
import empresaResolvers from '../modulos/empresas/Resolvers';

import root from './Root';
import BackOfficeResolver from '../backoffice/Resolvers';
import BOUsuarioSchema from '../backoffice/UsuarioSchema';

export const schemas = [
  root,
  ConfigSchema,
  EmpresaSchema,
  TrabajadoresSchema,
  EvaluacionesSchema,
  EvaluacionesSchemaInputs,
  BOUsuarioSchema,
];

export const resolvers = merge(
  configuracionesResolvers,
  empresaResolvers,
  TrabajadoresResolver,
  EvaluacionesResolvers,
  BackOfficeResolver
);
