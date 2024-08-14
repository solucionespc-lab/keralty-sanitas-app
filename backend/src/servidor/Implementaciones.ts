import { merge } from 'lodash';

import ConfigSchema from '../modulos/configuraciones/Schema';
import { EjmeploSchema } from '../modulos/ejemplo/Schema';

import configuracionesResolvers from '../modulos/configuraciones/Resolvers';
import ejemploResolvers from '../modulos/ejemplo/Resolvers';

import root from './Root';

export const schemas = [root, EjmeploSchema, ConfigSchema];
export const resolvers = merge(ejemploResolvers, configuracionesResolvers);
