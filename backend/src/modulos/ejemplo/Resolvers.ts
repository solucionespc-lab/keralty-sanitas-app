import { ejemploQuery, ejemploResolver } from './resolvers/FuncionesRes';

const ejemploResolvers = {
  Query: {
    getEjemplo: ejemploQuery,
  },
  Mutation: {
    saveEjemplo: ejemploResolver,
  },
};

export default ejemploResolvers;
