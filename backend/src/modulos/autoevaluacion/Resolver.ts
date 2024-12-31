import { actualizarEvaluacion, guardarEvaluacion } from './resolvers/Mutations';
import {
  traerDatosEmpresa,
  traerEvaluacion,
  traerEvaluaciones,
  traerInforme,
} from './resolvers/Queries';

const EvaluacionesResolvers = {
  Query: {
    getEvaluacion: traerEvaluacion,
    getEvaluaciones: traerEvaluaciones,
    getInformes: traerInforme,
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
