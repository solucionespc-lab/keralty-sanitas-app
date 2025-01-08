import { guadarActas } from './resolvers/Mutations';
import { traerActa, traerActas } from './resolvers/Queries';

const ActasResolver = {
  Query: {
    getActas: traerActas,
    getActa: traerActa,
  },
  Mutation: {
    saveActa: guadarActas,
    updateActa: () => console.log('saveActas'),
  },
};

export default ActasResolver;
