import { guardarEmpresa } from './resolvers/Mutations';
import { consultarEmpresas, consultarEmpresa } from './resolvers/Queries';

const empresaResolvers = {
  Query: {
    getEmpresas: consultarEmpresas,
    getEmpresa: consultarEmpresa,
  },
  Mutation: {
    saveEmpresa: guardarEmpresa,
  },
};

export default empresaResolvers;
