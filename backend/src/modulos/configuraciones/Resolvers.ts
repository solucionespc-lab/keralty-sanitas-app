import { traerConfiguraciones } from './resolvers/Queries';

const configuracionesResolvers = {
  Query: {
    getConfiguraciones: traerConfiguraciones,
  },
};

export default configuracionesResolvers;
