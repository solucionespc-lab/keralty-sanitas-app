import { actualizarEvaluacion, guardarEvaluacion } from './resolvers/Mutations';
import {
  traerDatosEmpresa,
  traerEvaluacion,
  traerEvaluaciones,
} from './resolvers/Queries';

const EvaluacionesResolvers = {
  Query: {
    getEvaluacion: traerEvaluacion,
    getEvaluaciones: traerEvaluaciones,
  },
  Mutation: {
    saveEvaluacion: guardarEvaluacion,
    updateEvaluacion: actualizarEvaluacion,
  },
  EvaluacionType: {
    empresa: traerDatosEmpresa,
  },
};

export default EvaluacionesResolvers;
