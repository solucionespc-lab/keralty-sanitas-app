import { merge } from 'lodash';

import EvaluacionesSchema from '../modulos/autoevaluacion/Schema';
import ConfigSchema from '../modulos/configuraciones/Schema';
import CuentaSchema from '../modulos/cuentas/Schema';
import EmpresaSchema from '../modulos/empresas/Schema';
import PlanesAccionSchema from '../modulos/planes/Schema';
import TrabajadoresSchema from '../modulos/trabajadores/Schema';

import BackOfficeResolver from '../backoffice/Resolvers';
import BOUsuarioSchema from '../backoffice/UsuarioSchema';
import EvaluacionesResolvers from '../modulos/autoevaluacion/Resolver';
import EvaluacionesSchemaInputs from '../modulos/autoevaluacion/SchemaInputs';
import PlanesAccionSchemaInputs from '../modulos/planes/SchemaInputs';
import TrabajadoresResolver from '../modulos/trabajadores/Resolver';

import configuracionesResolvers from '../modulos/configuraciones/Resolvers';
import CuentaResolver from '../modulos/cuentas/Resolvers';
import empresaResolvers from '../modulos/empresas/Resolvers';
import PlanesAccionResolver from '../modulos/planes/Resolvers';

import root from './Root';

export const schemas = [
  root,
  ConfigSchema,
  EmpresaSchema,
  TrabajadoresSchema,
  EvaluacionesSchema,
  EvaluacionesSchemaInputs,
  PlanesAccionSchema,
  PlanesAccionSchemaInputs,
  CuentaSchema,
  BOUsuarioSchema,
];

export const resolvers = merge(
  configuracionesResolvers,
  empresaResolvers,
  TrabajadoresResolver,
  EvaluacionesResolvers,
  PlanesAccionResolver,
  CuentaResolver,
  BackOfficeResolver
);
