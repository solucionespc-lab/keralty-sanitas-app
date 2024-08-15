import { merge } from 'lodash';

import ConfigSchema from '../modulos/configuraciones/Schema';
import EmpresaSchema from '../modulos/empresas/Schema';
import TrabajadoresSchema from '../modulos/trabajadores/Schema';

import TrabajadoresResolver from '../modulos/trabajadores/Resolver';

import configuracionesResolvers from '../modulos/configuraciones/Resolvers';
import empresaResolvers from '../modulos/empresas/Resolvers';

import root from './Root';

export const schemas = [root, ConfigSchema, EmpresaSchema, TrabajadoresSchema];
export const resolvers = merge(
  configuracionesResolvers,
  empresaResolvers,
  TrabajadoresResolver
);
