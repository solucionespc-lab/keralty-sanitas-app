import { merge } from 'lodash';

import ActasSchema from '../modulos/actas/Schema';
import EvaluacionesSchema from '../modulos/autoevaluacion/Schema';
import ConfigSchema from '../modulos/configuraciones/Schema';
import CuentaSchema from '../modulos/cuentas/Schema';
import EmpresaSchema from '../modulos/empresas/Schema';
import ExcelenciaSchema from '../modulos/excelencia/Schema';
import PlanesAccionSchema from '../modulos/planes/Schema';
import TrabajadoresSchema from '../modulos/trabajadores/Schema';

import BackOfficeResolver from '../backoffice/Resolvers';
import BOUsuarioSchema from '../backoffice/UsuarioSchema';
import EvaluacionesResolvers from '../modulos/autoevaluacion/Resolver';
import InformesAutoSchema from '../modulos/autoevaluacion/SchemaInformes';
import EvaluacionesSchemaInputs from '../modulos/autoevaluacion/SchemaInputs';
import PlanesAccionSchemaInputs from '../modulos/planes/SchemaInputs';
import TrabajadoresResolver from '../modulos/trabajadores/Resolver';

import ActasResolver from '../modulos/actas/Resolvers';
import configuracionesResolvers from '../modulos/configuraciones/Resolvers';
import CuentaResolver from '../modulos/cuentas/Resolvers';
import empresaResolvers from '../modulos/empresas/Resolvers';
import ExcelenciaResolver from '../modulos/excelencia/Resolvers';
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
  ExcelenciaSchema,
  ActasSchema,
  InformesAutoSchema,
  BOUsuarioSchema,
];

export const resolvers = merge(
  configuracionesResolvers,
  empresaResolvers,
  TrabajadoresResolver,
  EvaluacionesResolvers,
  PlanesAccionResolver,
  CuentaResolver,
  ExcelenciaResolver,
  ActasResolver,
  BackOfficeResolver
);
