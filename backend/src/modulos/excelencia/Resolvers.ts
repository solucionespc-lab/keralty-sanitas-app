import { saveExcelencia } from './resolvers/Mutations';
import {
  traerDatosEmpresa,
  traerEvaluacionesExcelencia,
} from './resolvers/Queries';

const ExcelenciaResolver = {
  Query: {
    getExcelencia: traerEvaluacionesExcelencia,
  },
  Mutation: {
    saveExcelencia: saveExcelencia,
  },
  ExcelenciaType: {
    empresa: traerDatosEmpresa,
  },
};

export default ExcelenciaResolver;
