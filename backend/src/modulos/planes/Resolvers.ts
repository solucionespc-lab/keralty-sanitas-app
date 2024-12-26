import { guardarPlanAccion } from './resolvers/Mutations';
import { consultarPlanesAccion } from './resolvers/Queries';

const PlanesAccionResolver = {
  Query: {
    getPlanesAccion: consultarPlanesAccion,
  },
  Mutation: {
    savePlanesAccion: guardarPlanAccion,
  },
};

export default PlanesAccionResolver;
